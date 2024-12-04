import type { AIRecommendation } from '../types';

export function generateHealthRecommendations(whr: number): AIRecommendation[] {
  const recommendations: AIRecommendation[] = [];
  
  if (whr < 0.85) {
    recommendations.push({
      id: 'health-1',
      category: 'health',
      title: 'Maintain Your Health',
      description: 'Your WHR indicates good metabolic health. Focus on maintaining through balanced nutrition and regular exercise.',
      confidence: 90,
    });
  } else {
    recommendations.push({
      id: 'health-2',
      category: 'health',
      title: 'Health Optimization',
      description: 'Consider incorporating more cardiovascular exercise and maintaining a balanced diet rich in whole foods.',
      confidence: 85,
    });
  }
  
  return recommendations;
}