import * as poseDetection from '@tensorflow-models/pose-detection';
import { Point3D, Measurements } from './types';
import { calculate3DCoordinates, getDistance } from './poseDetection';

const MIN_CONFIDENCE = 0.5;
const PIXEL_TO_CM = 0.2645833333;

class MeasurementBuffer {
  private values: number[] = [];
  private maxSize = 5;

  add(value: number) {
    this.values.push(value);
    if (this.values.length > this.maxSize) {
      this.values.shift();
    }
  }

  getAverage(): number {
    if (this.values.length === 0) return 0;
    return this.values.reduce((a, b) => a + b) / this.values.length;
  }

  getConfidence(): number {
    if (this.values.length < 3) return 0;
    const avg = this.getAverage();
    const variance = this.values.reduce((sum, val) => 
      sum + Math.pow(val - avg, 2), 0) / this.values.length;
    return Math.min(1, Math.max(0, 1 - Math.sqrt(variance) / avg));
  }
}

export function calculateBodyMeasurements(keypoints: poseDetection.Keypoint[]): Measurements {
  // Convert 2D keypoints to 3D points
  const points3D = keypoints.reduce((acc, kp) => {
    if (kp.name) {
      acc[kp.name] = calculate3DCoordinates(kp);
    }
    return acc;
  }, {} as Record<string, Point3D>);

  // Validate required keypoints
  const requiredPoints = ['left_hip', 'right_hip', 'left_shoulder', 'right_shoulder'];
  for (const pointName of requiredPoints) {
    if (!points3D[pointName] || (points3D[pointName].score || 0) < MIN_CONFIDENCE) {
      throw new Error(`Could not detect ${pointName.replace('_', ' ')} with sufficient confidence`);
    }
  }

  // Calculate measurements using 3D distances
  const shoulderWidth = getDistance(points3D.left_shoulder, points3D.right_shoulder);
  const hipWidth = getDistance(points3D.left_hip, points3D.right_hip);

  // Use shoulder width as reference to estimate actual measurements
  const shoulderWidthCm = shoulderWidth * PIXEL_TO_CM;
  const hipWidthCm = hipWidth * PIXEL_TO_CM;
  
  // Estimate waist based on hip measurement and typical body proportions
  const waistWidthCm = hipWidthCm * 0.75;

  // Create measurement buffers for smoothing
  const waistBuffer = new MeasurementBuffer();
  const hipBuffer = new MeasurementBuffer();

  waistBuffer.add(waistWidthCm);
  hipBuffer.add(hipWidthCm);

  return {
    waist: {
      value: waistBuffer.getAverage(),
      confidence: waistBuffer.getConfidence()
    },
    hip: {
      value: hipBuffer.getAverage(),
      confidence: hipBuffer.getConfidence()
    },
    shoulderWidth: {
      value: shoulderWidthCm,
      confidence: Math.min(
        points3D.left_shoulder.score || 0,
        points3D.right_shoulder.score || 0
      )
    }
  };
}