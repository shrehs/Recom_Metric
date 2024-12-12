import type Webcam from 'react-webcam';

export async function captureImage(webcam: Webcam): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    try {
      const image = webcam.getScreenshot();
      if (!image) {
        reject(new Error('Failed to capture image from webcam'));
        return;
      }

      const imageElement = new Image();
      imageElement.onload = () => resolve(imageElement);
      imageElement.onerror = () => reject(new Error('Failed to load captured image'));
      imageElement.src = image;
    } catch (error) {
      reject(new Error('Failed to access camera. Please ensure camera permissions are granted.'));
    }
  });
}