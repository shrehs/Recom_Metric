export interface BodyMeasurements {
  height: number;
  weight: number;
  waist: number;
  hip: number;
}

export interface AIRecommendation {
  id: string;
  category: 'fashion' | 'health';
  title: string;
  description: string;
  confidence: number;
  imageUrl?: string;
}

export interface BodyShapeResult {
  shape: string;
  whr: number;
  recommendations: AIRecommendation[];
}