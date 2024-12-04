import React from 'react';

export function Header() {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        RECOM Metric
      </h1>
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        AI Body Shape Calculator 
      </h2>
      <p className="text-lg text-gray-600">
        Get personalized fashion and health recommendations based on your measurements
      </p>
      <p>
      NOTE: The measurements provided are estimations based on pose detection and should not be considered medical assessments. They are for general guidance only and may not account for factors such as posture, body conditions, or illnesses.
      </p>
    </div>
  );
}