import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Camera, AlertCircle } from 'lucide-react';
import { useBodyKeypoints } from '../hooks/useBodyKeypoints';

interface Props {
  onMeasurementsDetected: (measurements: { waist: number; hip: number }) => void;
}

export function CameraView({ onMeasurementsDetected }: Props) {
  const webcamRef = useRef<Webcam>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { detectKeypoints, isProcessing } = useBodyKeypoints();

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      setHasPermission(true);
      setError(null);
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasPermission(false);
      setError('Camera access denied. Please enable camera access to use this feature.');
    }
  };

  const handleCapture = async () => {
    if (!webcamRef.current) return;
    setError(null);
    try {
      const measurements = await detectKeypoints(webcamRef.current);
      if (measurements) {
        onMeasurementsDetected(measurements);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred.');
    }
  };

  if (hasPermission === null) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-600">Requesting camera permission...</p>
      </div>
    );
  }

  if (hasPermission === false) {
    return (
      <div className="text-center p-4 bg-red-50 rounded-lg">
        <AlertCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Webcam
          ref={webcamRef}
          className="w-full rounded-lg"
          mirrored
          screenshotFormat="image/jpeg"
        />
        <button
          onClick={handleCapture}
          disabled={isProcessing}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Camera className="w-5 h-5" />
          <span>{isProcessing ? 'Processing...' : 'Capture'}</span>
        </button>
      </div>
      
      {isProcessing && (
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-yellow-600">Detecting keypoints... Please hold still.</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      )}
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-blue-600 text-sm mb-2">For best results:</p>
        <ul className="list-disc ml-5">
          <li>Stand 6-8 feet from the camera</li>
          <li>Ensure your full body is visible</li>
          <li>Stand in a well-lit area</li>
          <li>Wear fitted clothing</li>
        </ul>
      </div>
    </div>
  );
}
