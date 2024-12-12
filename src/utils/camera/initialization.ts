import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import * as poseDetection from '@tensorflow-models/pose-detection';

let detector: poseDetection.PoseDetector | null = null;

export async function initializeDetector() {
  try {
    await tf.ready();
    await tf.setBackend('webgl');
    
    if (!detector) {
      detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet,
        { modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER }
      );
    }
    return detector;
  } catch (error) {
    console.error('Failed to initialize pose detector:', error);
    throw new Error('Could not initialize pose detection. Please check your connection or configuration.');
  }
}