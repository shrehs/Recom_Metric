import { useState, useEffect } from 'react';
import type Webcam from 'react-webcam';
import { captureImage } from '../utils/camera/capture';
import { detectPoseKeypoints } from '../utils/camera/poseDetection';
import { calculateBodyMeasurements } from '../utils/camera/measurements';
import { startPerformanceMonitoring, stopPerformanceMonitoring } from '../utils/camera/calibration';

export function useBodyKeypoints() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      stopPerformanceMonitoring();
    };
  }, []);

  const detectKeypoints = async (webcam: Webcam) => {
    setIsProcessing(true);
    setError(null);
    startPerformanceMonitoring();
    
    try {
      const imageElement = await captureImage(webcam);
      const poses = await detectPoseKeypoints(imageElement);
      
      if (!poses || poses.length === 0) {
        throw new Error('No pose detected. Please ensure your full body is visible.');
      }

      const measurements = calculateBodyMeasurements(poses[0].keypoints);
      
      // Validate measurements
      if (measurements.waist.value <= 0 || measurements.hip.value <= 0) {
        throw new Error('Invalid measurements detected. Please try again with better positioning.');
      }

      return {
        waist: Math.round(measurements.waist.value),
        hip: Math.round(measurements.hip.value)
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsProcessing(false);
      stopPerformanceMonitoring();
    }
  };

  return {
    detectKeypoints,
    isProcessing,
    error
  };
}