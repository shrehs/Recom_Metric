import { useState } from 'react';
import type { BodyMeasurements, BodyShapeResult } from '../types';
import { calculateBodyShape } from '../utils/bodyShapeCalculator';
import { generateHealthRecommendations } from '../utils/healthRecommendations';
import { getFashionRecommendations } from '../services/recommendations';

export function useBodyMeasurements() {
  const [result, setResult] = useState<BodyShapeResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (measurements: BodyMeasurements) => {
    setLoading(true);
    
    try {
      // Calculate body shape
      const { shape, whr } = calculateBodyShape(measurements.waist, measurements.hip);
      
      // Get fashion recommendations
      const fashionRecommendations = getFashionRecommendations(shape);
      
      // Generate health recommendations
      const healthRecommendations = generateHealthRecommendations(whr);
      
      setResult({
        shape,
        whr,
        recommendations: [
          ...fashionRecommendations,
          ...healthRecommendations,
        ],
      });
    } catch (error) {
      console.error('Error processing measurements:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    result,
    loading,
    handleSubmit,
  };
}