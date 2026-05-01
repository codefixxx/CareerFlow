import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),visualizer({
      open: true,          // auto-open report
      gzipSize: true,
      brotliSize: true,
      filename: 'stats.html'
    }),tailwindcss(),],
})

