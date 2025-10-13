#!/bin/bash

# PicSel Chrome Extension Build Script

set -e

echo "🚀 Building PicSel Chrome Extension..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist

# Build with Vite
echo "📦 Building with Vite..."
pnpm build

# Copy manifest and assets
echo "📋 Copying manifest and assets..."
cp src/manifest.json dist/

# Create icons directory and placeholder icons
mkdir -p dist/icons
echo "🎨 Creating placeholder icons..."

# Create simple SVG icons and convert to PNG (if ImageMagick is available)
for size in 16 32 48 128; do
  cat > "dist/icons/icon-${size}.svg" << EOF
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#4f46e5"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
        fill="white" font-family="Arial, sans-serif" font-size="$((size/4))" font-weight="bold">PS</text>
</svg>
EOF
done

echo "✅ Build completed successfully!"
echo "📁 Extension files are in: dist/"
echo ""
echo "To load in Chrome:"
echo "1. Open chrome://extensions/"
echo "2. Enable 'Developer mode'"
echo "3. Click 'Load unpacked'"
echo "4. Select the 'dist' folder"
