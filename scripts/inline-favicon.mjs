/**
 * Browsers (notably Chrome) do not load external URLs in <image> when the SVG
 * is used as a favicon, so /profile-photo.png would never appear. This script
 * inlines the PNG as a data URL in public/favicon-photo.svg.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const pngPath = path.join(root, 'public', 'profile-photo.png')
const svgPath = path.join(root, 'public', 'favicon-photo.svg')
const defaultFaviconPath = path.join(root, 'public', 'favicon.svg')

// Positive = shift the image down in the viewBox so the face sits a little lower in the circle.
const FAVICON_FACE_NUDGE_Y = 3.5

function svgWithEmbeddedPhoto(dataUrl) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs>
    <clipPath id="favicon-avatar-clip">
      <circle cx="16" cy="16" r="16" />
    </clipPath>
  </defs>
  <circle cx="16" cy="16" r="16" fill="#1a1428" />
  <g clip-path="url(#favicon-avatar-clip)">
    <image
      href="${dataUrl}"
      x="0" y="0" width="32" height="32"
      transform="translate(0, ${FAVICON_FACE_NUDGE_Y})"
      preserveAspectRatio="xMidYMid slice"
    />
  </g>
</svg>
`
}

if (!fs.existsSync(pngPath)) {
  if (fs.existsSync(defaultFaviconPath)) {
    fs.copyFileSync(defaultFaviconPath, svgPath)
    console.log(
      '[inline-favicon] public/profile-photo.png not found; tab icon uses public/favicon.svg. Add the PNG and run: node scripts/inline-favicon.mjs',
    )
  } else {
    console.warn('[inline-favicon] Missing public/profile-photo.png and public/favicon.svg')
  }
  process.exit(0)
}

const b64 = fs.readFileSync(pngPath).toString('base64')
const dataUrl = `data:image/png;base64,${b64}`
fs.writeFileSync(svgPath, svgWithEmbeddedPhoto(dataUrl), 'utf8')
console.log('[inline-favicon] Wrote public/favicon-photo.svg with embedded profile photo (circular).')
