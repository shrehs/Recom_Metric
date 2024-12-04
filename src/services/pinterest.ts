/* import { AIRecommendation } from '../types';

const PINTEREST_API_KEY = import.meta.env.VITE_PINTEREST_API_KEY;
const PINTEREST_API_URL = 'https://api.pinterest.com/v5';

export async function fetchOutfitSuggestions(bodyShape: string): Promise<AIRecommendation[]> {
  try {
    const response = await fetch(`${PINTEREST_API_URL}/search/pins`, {
      headers: {
        'Authorization': `Bearer ${PINTEREST_API_KEY}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Pinterest data');
    }

    const data = await response.json();
    
    // Transform Pinterest pins into recommendations
    return data.items.slice(0, 3).map((pin: any, index: number) => ({
      id: `pinterest-${index}`,
      category: 'fashion',
      title: 'Outfit Suggestion',
      description: pin.description || 'Stylish outfit recommendation based on your body shape',
      confidence: 85 + Math.floor(Math.random() * 10),
      imageUrl: pin.image?.url,
    }));
  } catch (error) {
    console.error('Pinterest API error:', error);
    return [];
  }
} */