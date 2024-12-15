import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true, // Automatically open the report in the browser after build
      gzipSize: true, // Include gzip size in the report
      brotliSize: true, // Include Brotli size in the report
      template: 'treemap', // Use 'treemap', 'sunburst', or 'network' views
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    chunkSizeWarningLimit: 2000, // Adjust the limit as needed
    rollupOptions: {
      output: {
        manualChunks: {
          tensorflow: [
            '@tensorflow/tfjs',
            '@tensorflow/tfjs-backend-webgl',
            '@tensorflow/tfjs-converter',
            '@tensorflow/tfjs-core',
          ],
          vendor: ['react', 'react-dom'], // Example of splitting vendor code
        },
      },
    },
  },
});