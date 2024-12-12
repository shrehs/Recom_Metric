import * as poseDetection from '@tensorflow-models/pose-detection';
import { Point3D } from './types';
import { getCalibration } from './calibration';

export function calculate3DCoordinates(keypoint: poseDetection.Keypoint): Point3D {
  const calibration = getCalibration();
  const { x, y, score } = keypoint;
  
  // Convert 2D coordinates to 3D using perspective projection
  const z = calibration.focalLength / (1 + Math.abs(x - calibration.principalPoint.x) / calibration.principalPoint.x);
  
  return {
    x: (x - calibration.principalPoint.x) * z / calibration.focalLength,
    y: (y - calibration.principalPoint.y) * z / calibration.focalLength,
    z,
    score
  };
}

export function calculate3DDistance(point1: Point3D, point2: Point3D): number {
  return Math.sqrt(
    Math.pow(point1.x - point2.x, 2) +
    Math.pow(point1.y - point2.y, 2) +
    Math.pow(point1.z - point2.z, 2)
  );
}