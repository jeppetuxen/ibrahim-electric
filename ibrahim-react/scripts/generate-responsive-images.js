/**
 * Generate responsive image sizes
 *
 * This script creates multiple sizes of large images for responsive loading:
 * - Small (400px): Mobile devices
 * - Medium (800px): Tablets
 * - Large (1200px): Desktop
 * - XL (1600px): Large screens
 *
 * Also converts to WebP for better compression
 */

import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SIZES = {
  small: 400,
  medium: 800,
  large: 1200,
  xlarge: 1600
};

const QUALITY = {
  jpeg: 80,
  webp: 80
};

// Images to optimize (the really large ones)
const LARGE_IMAGES = [
  'public/images/press/press-1.jpg',
  'public/images/press/press-2.jpg',
  'public/images/press/press-3.jpg',
  'public/images/press/press-4.jpg',
  'public/images/press/press-5.jpg',
  'public/images/press/press-6.jpg',
  'public/images/press/press-7.jpg',
  'public/images/front/press-4.jpg',
  'public/images/front/Ibreahim+Electric+505.jpg',
  'public/images/Ibreahim+Electric+505.jpg',
  'public/images/fast-fire-cover.png',
  'public/images/front/fast-fire-cover.png',
  'public/images/albums/rumours-from-outer-space.jpg',
];

async function generateResponsiveImages() {
  const projectRoot = path.join(__dirname, '..');

  console.log('🖼️  Generating responsive images...\n');

  for (const imagePath of LARGE_IMAGES) {
    const fullPath = path.join(projectRoot, imagePath);

    try {
      // Check if file exists
      await fs.access(fullPath);

      const stats = await fs.stat(fullPath);
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);

      console.log(`📸 Processing: ${imagePath} (${sizeMB}MB)`);

      const dir = path.dirname(fullPath);
      const ext = path.extname(fullPath);
      const name = path.basename(fullPath, ext);

      // Create responsive directory if it doesn't exist
      const responsiveDir = path.join(dir, 'responsive');
      await fs.mkdir(responsiveDir, { recursive: true });

      // Generate each size
      for (const [sizeName, width] of Object.entries(SIZES)) {
        // JPEG version
        const jpegPath = path.join(responsiveDir, `${name}-${sizeName}.jpg`);
        await sharp(fullPath)
          .resize(width, null, { withoutEnlargement: true })
          .jpeg({ quality: QUALITY.jpeg, progressive: true })
          .toFile(jpegPath);

        // WebP version (better compression)
        const webpPath = path.join(responsiveDir, `${name}-${sizeName}.webp`);
        await sharp(fullPath)
          .resize(width, null, { withoutEnlargement: true })
          .webp({ quality: QUALITY.webp })
          .toFile(webpPath);

        const jpegStats = await fs.stat(jpegPath);
        const webpStats = await fs.stat(webpPath);
        console.log(`  ✓ ${sizeName} (${width}px): ${(jpegStats.size / 1024).toFixed(0)}KB JPEG, ${(webpStats.size / 1024).toFixed(0)}KB WebP`);
      }

      console.log('');
    } catch (error) {
      console.error(`  ✗ Error processing ${imagePath}:`, error.message);
    }
  }

  console.log('✅ Responsive images generated successfully!\n');
  console.log('💡 Images are saved in responsive/ subdirectories');
  console.log('💡 Use the ResponsiveImage component to load them automatically');
}

generateResponsiveImages().catch(console.error);
