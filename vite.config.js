import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    base: command === 'build' ? '/trip/' : '/',
    plugins: [react()],
    test: {
      reporters: ['default'],
      globals: true,
      environment: 'node',
      include: ['src/**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      watch: false,
    },
  };
});
