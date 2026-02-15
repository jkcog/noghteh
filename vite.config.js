import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/noghteh/',
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
