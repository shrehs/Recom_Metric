import { useState } from 'react';
import type Webcam from 'react-webcam';
import { captureImage, detectPose, calculateMeasurements } from '../utils/camera';

export function useBodyKeypoints() {
  const [isProcessing, setIsProcessing] = useState(false);

  const detectKeypoints = async (webcam: Webcam) => {
    setIsProcessing(true);
    
    try {
      const imageElement = await captureImage(webcam);
      if (!imageElement) {
        throw new Error('Failed to capture image. Please try again.');
      }

      const poses = await detectPose(imageElement);
      return calculateMeasurements(poses[0].keypoints);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('An unexpected error occurred during pose detection.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    detectKeypoints,
    isProcessing
  };
}