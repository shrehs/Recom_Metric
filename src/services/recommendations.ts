import { AIRecommendation } from '../types';

export function getFashionRecommendations(bodyShape: string): AIRecommendation[] {
  const recommendations: AIRecommendation[] = [
    {
      id: 'fashion-1',
      category: 'fashion',
      title: 'Classic Style for Your Shape',
      description: `Recommended styles for ${bodyShape} body shape: Focus on pieces that enhance your natural proportions.`,
      confidence: 90,
      imageUrl: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 'fashion-2',
      category: 'fashion',
      title: 'Seasonal Trends',
      description: 'Current fashion trends that complement your body shape perfectly.',
      confidence: 85,
      imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ];

  return recommendations;
}