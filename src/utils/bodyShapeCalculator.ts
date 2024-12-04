export function calculateBodyShape(waist: number, hip: number): {
  shape: string;
  whr: number;
} {
  const whr = waist / hip;
  const shape = whr < 0.8 ? 'Pear' : whr < 0.85 ? 'Hourglass' : 'Apple';
  
  return { shape, whr };
}