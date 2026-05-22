import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'orderApp',
      filename: 'remoteEntry.js',
      exposes: { './OrderPage': './src/OrderPage.tsx' },
      shared: {
        react: { singleton: true, requiredVersion: '^18.2.0', import: false },
        'react-dom': { singleton: true, requiredVersion: '^18.2.0', import: false },
      },
    }),
  ],
  server: { port: 3004, cors: true },
  preview: { port: 3004, cors: true },
  build: { target: 'esnext', minify: false, cssCodeSplit: false },
});
