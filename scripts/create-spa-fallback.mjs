import { copyFileSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(here, '..', 'dist')
const source = resolve(distDir, 'index.html')
const destination = resolve(distDir, '404.html')

if (!existsSync(source)) {
  console.warn('[spa-fallback] dist/index.html not found; skipping 404.html creation')
  process.exit(0)
}

copyFileSync(source, destination)
console.log('[spa-fallback] Copied dist/index.html -> dist/404.html')
