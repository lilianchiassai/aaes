import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Inline the (small) CSS bundle into <head> as a <style> tag so it no longer
// blocks the initial render with a separate network request. Saves the ~150ms
// render-blocking round-trip flagged by Lighthouse.
function inlineCss(): Plugin {
  return {
    name: 'inline-css',
    enforce: 'post',
    apply: 'build',
    transformIndexHtml(html, ctx) {
      if (!ctx.bundle) return html
      let out = html
      for (const [fileName, chunk] of Object.entries(ctx.bundle)) {
        if (!fileName.endsWith('.css') || chunk.type !== 'asset') continue
        const css = chunk.source.toString()
        // Drop the <link rel="stylesheet"> pointing at this file...
        const escaped = fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const linkRe = new RegExp(
          `<link[^>]*rel="stylesheet"[^>]*href="[^"]*${escaped}"[^>]*>`,
        )
        out = out.replace(linkRe, `<style>${css}</style>`)
        // ...and don't emit the now-unused asset file.
        delete ctx.bundle[fileName]
      }
      return out
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // Repo is served at https://lilianchiassai.github.io/aaes/
  base: '/aaes/',
  plugins: [react(), tailwindcss(), inlineCss()],
})
