import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import * as poseDetection from '@tensorflow-models/pose-detection';

let detector: poseDetection.PoseDetector | null = null;

export async function initializeDetector() {
  try {
    await tf.ready(); // Ensure TensorFlow.js is ready
    await tf.setBackend('webgl'); // Use WebGL backend
    console.log('TensorFlow.js and backend ready.');

    if (!detector) {
      detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet,
        { modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER }
      );
      console.log('Pose detector initialized.');
    }
    return detector;
  } catch (error) {
    console.error('Failed to initialize pose detector:', error);
    throw new Error('Could not initialize pose detection. Please check your connection or configuration.');
  }
}

export async function captureImage(webcam: Webcam): Promise<HTMLImageElement | null> {
  const image = webcam.getScreenshot();
  if (!image) {
    throw new Error('Failed to capture image from webcam');
  }

  return new Promise((resolve, reject) => {
    const imageElement = new Image();
    imageElement.onload = () => resolve(imageElement);
    imageElement.onerror = () => reject(new Error('Failed to load captured image'));
    imageElement.src = image;
  });
}

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

export function calculateMeasurements(keypoints: poseDetection.Keypoint[]) {
  // Find required keypoints
  const leftHip = keypoints.find(kp => kp.name === 'left_hip');
  const rightHip = keypoints.find(kp => kp.name === 'right_hip');
  const leftShoulder = keypoints.find(kp => kp.name === 'left_shoulder');
  const rightShoulder = keypoints.find(kp => kp.name === 'right_shoulder');

  if (!leftHip || !rightHip || !leftShoulder || !rightShoulder) {
    throw new Error('Could not detect all required body points. Please ensure your full body is visible and try again.');
  }

  // Check confidence scores
  const minConfidence = 0.5;
  if ([leftHip, rightHip, leftShoulder, rightShoulder].some(kp => kp.score! < minConfidence)) {
    throw new Error('Low confidence in measurements. Please ensure good lighting and try again.');
  }

  const pixelToCm = 0.2645833333;
  
  // Calculate measurements using shoulder width as a reference
  const shoulderWidth = Math.abs(leftShoulder.x - rightShoulder.x);
  const hipWidth = Math.abs(leftHip.x - rightHip.x);
  
  // Use shoulder width as a reference to estimate waist (typically 75% of hip width)
  const estimatedWaistWidth = hipWidth * 0.75;
  
  const waist = estimatedWaistWidth * pixelToCm;
  const hip = hipWidth * pixelToCm;

  // Validate measurements
  if (waist <= 0 || hip <= 0) {
    throw new Error('Invalid measurements detected. Please try again.');
  }

  return { waist, hip };
}