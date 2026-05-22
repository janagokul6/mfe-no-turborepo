import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'authApp',
      filename: 'remoteEntry.js',
      exposes: { './LoginPage': './src/LoginPage.tsx' },
      shared: {
        react: { singleton: true, requiredVersion: '^18.2.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
      },
    }),
  ],
  server: { port: 3001, cors: true },
  preview: { port: 3001, cors: true },
  build: { target: 'esnext', minify: false, cssCodeSplit: false },
});
