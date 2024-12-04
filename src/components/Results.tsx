import React from 'react';
import { Activity } from 'lucide-react';
import type { BodyShapeResult } from '../types';
import { RecommendationCard } from './RecommendationCard';

interface Props {
  result: BodyShapeResult;
}

export function Results({ result }: Props) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4">
          <Activity className="h-8 w-8 text-indigo-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Your Body Shape Analysis</h2>
            <p className="text-gray-600">Shape: {result.shape}</p>
            <p className="text-gray-600">WHR: {result.whr.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">AI Recommendations</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {result.recommendations.map((recommendation) => (
            <RecommendationCard
              key={recommendation.id}
              recommendation={recommendation}
            />
          ))}
        </div>
      </div>
    </div>
  );
}