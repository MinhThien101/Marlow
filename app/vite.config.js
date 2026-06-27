import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dev-only middleware so /api/scrape-brand works under `vite` exactly like the
// Netlify function does in production.
function apiDevServer() {
  return {
    name: 'marlow-api-dev',
    configureServer(server) {
      server.middlewares.use('/api/scrape-brand', async (req, res) => {
        let body = ''
        for await (const chunk of req) body += chunk
        let url
        try { url = body ? JSON.parse(body).url : undefined } catch { url = undefined }
        if (!url && req.url) {
          const q = new URL(req.url, 'http://localhost').searchParams
          url = q.get('url') || undefined
        }
        try {
          const { scrapeBrand } = await server.ssrLoadModule('/src/lib/scrapeCore.js')
          const result = await scrapeBrand(url)
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(result))
        } catch (e) {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: false, error: 'Dev scrape failed: ' + e.message }))
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), apiDevServer()],
  server: { port: 5173 },
  build: {
    rollupOptions: {
      output: {
        // Split big, rarely-changing dependencies into their own chunks so they
        // cache across deploys and don't bloat the main app chunk.
        manualChunks: {
          react: ['react', 'react-dom'],
          supabase: ['@supabase/supabase-js'],
        },
      },
    },
  },
})
