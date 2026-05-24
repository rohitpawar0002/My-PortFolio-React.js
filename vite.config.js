import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  /** `npm run dev` only: forward chat function to a live Netlify deploy (avoids CORS from localhost). */
  const chatProxy = env.VITE_CHAT_PROXY || 'https://rohitt-portfolio-react.netlify.app'

  return {
    plugins: [react(), tailwindcss()],
    // base:'/My-PortFolio-React.js',
    server: {
      // Dev only: path without ".netlify" is more reliable with Vite's proxy; forwards to your live function.
      proxy: {
        '/api/chat': {
          target: chatProxy,
          changeOrigin: true,
          secure: true,
          /** Avoid proxy 502 when Gemini/Netlify is slow (ms). */
          timeout: 120_000,
          proxyTimeout: 120_000,
          rewrite: (path) =>
            path.replace(/^\/api\/chat$/, '/.netlify/functions/chat'),
        },
      },
    },
  }
})
