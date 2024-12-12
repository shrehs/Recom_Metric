import type { CameraCalibration } from './types';
import Stats from 'stats.js';

const stats = new Stats();
stats.dom.style.display = 'none'; // Hide by default
stats.dom.style.position = 'absolute';
stats.dom.style.right = '0';
stats.dom.style.top = '0';
document.body.appendChild(stats.dom);

let calibration: CameraCalibration | null = null;
let isMonitoring = false;

export function getCalibration(): CameraCalibration {
  if (!calibration) {
    // Default calibration values based on common webcam parameters
    calibration = {
      focalLength: 920, // typical focal length for webcams
      principalPoint: { x: 320, y: 240, z: 0 },
      pixelRatio: 0.2645833333
    };
  }
  return calibration;
}

export function updateCalibration(width: number, height: number) {
  const aspectRatio = width / height;
  calibration = {
    focalLength: width * 1.2, // Approximate focal length based on frame size
    principalPoint: { x: width / 2, y: height / 2, z: 0 },
    pixelRatio: 0.2645833333 * (640 / width) // Scale based on reference resolution
  };
}

export function startPerformanceMonitoring() {
  if (isMonitoring) return;
  
  isMonitoring = true;
  stats.dom.style.display = 'block';
  
  function animate() {
    if (!isMonitoring) return;
    
    stats.begin();
    // Measurement calculations will happen here
    stats.end();
    requestAnimationFrame(animate);
  }
  animate();
}

export function stopPerformanceMonitoring() {
  isMonitoring = false;
  stats.dom.style.display = 'none';
}