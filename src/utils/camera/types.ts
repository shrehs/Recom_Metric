export interface Point3D {
  x: number;
  y: number;
  z: number;
  score?: number;
}

export interface BodyMeasurement {
  value: number;
  confidence: number;
}

export interface Measurements {
  waist: BodyMeasurement;
  hip: BodyMeasurement;
  shoulderWidth: BodyMeasurement;
}

export interface CameraCalibration {
  focalLength: number;
  principalPoint: Point3D;
  pixelRatio: number;
}