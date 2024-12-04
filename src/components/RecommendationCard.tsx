import React from 'react';
import { Sparkles } from 'lucide-react';
import type { AIRecommendation } from '../types';

interface Props {
  recommendation: AIRecommendation;
}

export function RecommendationCard({ recommendation }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{recommendation.title}</h3>
          {recommendation.imageUrl && (
            <img 
              src={recommendation.imageUrl} 
              alt={recommendation.title}
              className="w-full h-48 object-cover rounded-md my-3"
            />
          )}
          <p className="mt-2 text-gray-600">{recommendation.description}</p>
        </div>
        <Sparkles className="h-6 w-6 text-indigo-500 flex-shrink-0" />
      </div>
      <div className="mt-4 flex items-center">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full"
            style={{ width: `${recommendation.confidence}%` }}
          />
        </div>
        <span className="ml-2 text-sm text-gray-600">{recommendation.confidence}% confidence</span>
      </div>
    </div>
  );
}