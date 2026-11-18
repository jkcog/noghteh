import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/noghteh/',
  test: {
    globals: true,
    environment: 'jsdom',
    // Newer Node versions ship their own localStorage, which shadows jsdom's.
    // Disable it so tests use the jsdom one (flag is ignored by Node < 22.4).
    poolOptions: {
      forks: { execArgv: ['--no-experimental-webstorage'] },
      threads: { execArgv: ['--no-experimental-webstorage'] },
    },
  },
});
