import { useState } from 'react';
import type { BodyMeasurements, BodyShapeResult } from '../types';
import { calculateBodyShape } from '../utils/bodyShapeCalculator';
import { generateHealthRecommendations } from '../utils/healthRecommendations';
import { fetchOutfitSuggestions } from '../services/pinterest';

export function useBodyMeasurements() {
  const [result, setResult] = useState<BodyShapeResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (measurements: BodyMeasurements) => {
    setLoading(true);
    
    try {
      // Calculate body shape
      const { shape, whr } = calculateBodyShape(measurements.waist, measurements.hip);
      
      // Fetch outfit suggestions
      const outfitSuggestions = await fetchOutfitSuggestions(shape);
      
      // Generate health recommendations
      const healthRecommendations = generateHealthRecommendations(whr);
      
      setResult({
        shape,
        whr,
        recommendations: [
          ...outfitSuggestions,
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