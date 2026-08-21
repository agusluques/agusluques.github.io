import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The repo is a GitHub user page (agusluques.github.io), so the site is served
// from the domain root. Keep base at '/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    target: 'es2020'
  }
});
