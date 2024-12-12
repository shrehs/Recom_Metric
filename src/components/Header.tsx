import React from 'react';
import { Ruler } from 'lucide-react';

export function Header() {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center mb-6">
        <Ruler className="h-12 w-12 text-rose-500" />
      </div>
      <h1 className="text-5xl font-bold text-gray-900 mb-4 font-playfair">
        Welcome to Your Personalized Measurements
      </h1>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 font-playfair">
        RECOM Metric - AI Body Shape Calculator
      </h2>
      <p className="text-lg text-gray-600 font-roboto max-w-2xl mx-auto">
        Get personalized fashion and health recommendations based on your measurements using advanced AI technology.
      </p>
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg max-w-2xl mx-auto">
        <p className="text-sm text-yellow-800">
          NOTE: The measurements provided are estimations based on pose detection and should not be considered medical assessments. 
          They are for general guidance only and may not account for factors such as posture, body conditions, or illnesses.
        </p>
      </div>
    </div>
  );
}