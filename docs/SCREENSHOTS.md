# Screenshots Guide

This document explains how to add screenshots to the documentation.

## Required Screenshots

The README references the following screenshots that should be placed in `./docs/images/`:

1. **home.png** - Screenshot of the Home page
2. **about.png** - Screenshot of the About page  
3. **mobile.png** - Screenshot of mobile/responsive view

## How to Capture Screenshots

### Option 1: Using Browser DevTools

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:5173 in your browser

3. For desktop screenshots:
   - Navigate to the desired page (Home or About)
   - Take a screenshot (use browser extensions or OS screenshot tools)
   - Save as `home.png` or `about.png` in `./docs/images/`

4. For mobile screenshot:
   - Open DevTools (F12 or Cmd+Option+I on Mac)
   - Click the device toolbar icon (or Cmd+Shift+M on Mac)
   - Select a mobile device (e.g., iPhone 12 Pro)
   - Take a screenshot
   - Save as `mobile.png` in `./docs/images/`

### Option 2: Using Screenshot Tools

**macOS:**
- `Cmd + Shift + 4` - Select area to capture
- `Cmd + Shift + 4, then Space` - Capture window

**Windows:**
- `Win + Shift + S` - Snipping tool
- Or use Snip & Sketch app

**Linux:**
- `gnome-screenshot` or `flameshot`

### Option 3: Using Browser Extensions

- **Awesome Screenshot** (Chrome/Firefox)
- **Fireshot** (Chrome/Firefox)
- **Nimbus Screenshot** (Chrome/Firefox)

## Recommended Screenshot Settings

- **Format**: PNG (for better quality)
- **Desktop width**: 1200-1400px wide
- **Mobile width**: 375px (iPhone) or 360px (Android)
- **Include**: Browser chrome optional, focus on the app content

## File Naming Convention

Use lowercase with hyphens for consistency:
- `home.png` - Home page screenshot
- `about.png` - About page screenshot
- `mobile.png` - Mobile responsive view
- `header-active.png` - (Optional) Active navigation state
- `footer.png` - (Optional) Footer component

## Image Optimization (Optional)

To reduce file size, you can optimize images:

```bash
# Using ImageOptim (macOS)
# Drag and drop images to the app

# Using TinyPNG
# Visit https://tinypng.com and upload images

# Using command line (install first)
npm install -g imagemin-cli
imagemin docs/images/*.png --out-dir=docs/images
```

## Adding New Screenshots

1. Place the image in `./docs/images/`
2. Reference it in README.md:
   ```markdown
   ![Description](./docs/images/filename.png)
   ```

## Current Status

- [ ] home.png
- [ ] about.png  
- [ ] mobile.png

Once these screenshots are added, the README will display them automatically.