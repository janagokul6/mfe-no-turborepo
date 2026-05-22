import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'cartApp',
      filename: 'remoteEntry.js',
      exposes: { './CartPage': './src/CartPage.tsx' },
      shared: {
        react: { singleton: true, requiredVersion: '^18.2.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
      },
    }),
  ],
  server: { port: 3003, cors: true },
  preview: { port: 3003, cors: true },
  build: { target: 'esnext', minify: false, cssCodeSplit: false },
});
