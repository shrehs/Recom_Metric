import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import * as poseDetection from '@tensorflow-models/pose-detection';
import { Point3D } from './types';

let detector: poseDetection.PoseDetector | null = null;
let modelLoaded = false;

export async function initializePoseDetector() {
  if (modelLoaded) return detector;

  try {
    await tf.ready();
    await tf.setBackend('webgl');
    console.log('TensorFlow.js initialized with WebGL backend');

    detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      {
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
        enableSmoothing: true,
        minPoseScore: 0.25
      }
    );
    
    modelLoaded = true;
    console.log('Pose detector initialized successfully');
    return detector;
  } catch (error) {
    console.error('Failed to initialize pose detector:', error);
    throw new Error('Could not initialize pose detection. Please check your connection and try again.');
  }
}

export async function detectPoseKeypoints(imageElement: HTMLImageElement): Promise<poseDetection.Pose[]> {
  const det = await initializePoseDetector();
  if (!det) {
    throw new Error('Pose detector not initialized');
  }

  try {
    const poses = await det.estimatePoses(imageElement, {
      maxPoses: 1,
      flipHorizontal: false
    });

    if (poses.length === 0) {
      throw new Error('No pose detected. Please ensure your full body is visible in the frame.');
    }

    // Validate keypoint confidence scores
    const requiredKeypoints = ['left_hip', 'right_hip', 'left_shoulder', 'right_shoulder'];
    const lowConfidencePoints = poses[0].keypoints
      .filter(kp => requiredKeypoints.includes(kp.name || ''))
      .filter(kp => (kp.score || 0) < 0.5);

    if (lowConfidencePoints.length > 0) {
      throw new Error('Low confidence in pose detection. Please ensure good lighting and clear visibility.');
    }

    return poses;
  } catch (error) {
    console.error('Pose detection failed:', error);
    throw error instanceof Error ? error : new Error('Failed to detect pose. Please try again.');
  }
}

export function calculate3DCoordinates(keypoint: poseDetection.Keypoint): Point3D {
  // Estimate Z coordinate based on keypoint score
  const z = keypoint.score ? keypoint.score * 100 : 0;
  
  return {
    x: keypoint.x,
    y: keypoint.y,
    z,
    score: keypoint.score
  };
}

export function getDistance(point1: Point3D, point2: Point3D): number {
  return Math.sqrt(
    Math.pow(point1.x - point2.x, 2) +
    Math.pow(point1.y - point2.y, 2) +
    Math.pow(point1.z - point2.z, 2)
  );
}