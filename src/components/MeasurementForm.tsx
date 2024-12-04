import React, { useState } from 'react';
import { Ruler, Scale, ArrowRight } from 'lucide-react';
import type { BodyMeasurements } from '../types';
import { CameraView } from './CameraView';

interface Props {
  onSubmit: (measurements: BodyMeasurements) => void;
}

export function MeasurementForm({ onSubmit }: Props) {
  const [measurements, setMeasurements] = useState<BodyMeasurements>({
    height: 0,
    weight: 0,
    waist: 0,
    hip: 0,
  });
  const [useCamera, setUseCamera] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(measurements);
  };

  const handleCameraMeasurements = (cameraMeasurements: { waist: number; hip: number }) => {
    setMeasurements(prev => ({
      ...prev,
      waist: cameraMeasurements.waist,
      hip: cameraMeasurements.hip,
    }));
    setUseCamera(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Ruler className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              value={measurements.height || ''}
              onChange={(e) => setMeasurements(prev => ({ ...prev, height: Number(e.target.value) }))}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="170"
              required
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Scale className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              value={measurements.weight || ''}
              onChange={(e) => setMeasurements(prev => ({ ...prev, weight: Number(e.target.value) }))}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="65"
              required
            />
          </div>
        </div>

        {!useCamera ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">Waist (cm)</label>
                <input
                  type="number"
                  value={measurements.waist || ''}
                  onChange={(e) => setMeasurements(prev => ({ ...prev, waist: Number(e.target.value) }))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="75"
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">Hip (cm)</label>
                <input
                  type="number"
                  value={measurements.hip || ''}
                  onChange={(e) => setMeasurements(prev => ({ ...prev, hip: Number(e.target.value) }))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="100"
                  required
                />
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => setUseCamera(true)}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Use Camera
            </button>
          </>
        ) : (
          <CameraView onMeasurementsDetected={handleCameraMeasurements} />
        )}
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Calculate <ArrowRight className="ml-2 h-5 w-5" />
      </button>
    </form>
  );
}