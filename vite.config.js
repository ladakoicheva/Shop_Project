import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // (или плагин для vue/svelte и т.д.)
// import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    react(),
  
  ],
});