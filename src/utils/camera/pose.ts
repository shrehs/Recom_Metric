import * as poseDetection from '@tensorflow-models/pose-detection';
import { initializeDetector } from './initialization';

export async function detectPose(imageElement: HTMLImageElement) {
  try {
    const det = await initializeDetector();
    const poses = await det.estimatePoses(imageElement, {
      maxPoses: 1,
      flipHorizontal: false
    });
    
    if (poses.length === 0) {
      throw new Error('No pose detected. Please ensure your full body is visible in the frame.');
    }
    
    return poses;
  } catch (error) {
    throw new Error('Failed to detect pose. Please try standing further from the camera with your full body visible.');
  }
}