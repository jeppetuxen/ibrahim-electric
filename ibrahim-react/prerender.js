import puppeteer from 'puppeteer';
import { createServer } from 'vite';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const routes = [
  '/',
  '/tour',
  '/singles',
  '/singles/shuffle-corn',
  '/singles/fast-fire',
  '/singles/cheyenne',
  '/singles/flambino',
  '/contact'
];

async function prerender() {
  console.log('🚀 Starting pre-rendering...');

  // Start a preview server
  const server = await createServer({
    root: path.join(__dirname, 'dist'),
    server: { port: 4173 }
  });

  await server.listen();
  console.log('✅ Preview server started on http://localhost:4173');

  // Launch Puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  console.log('✅ Browser launched');

  for (const route of routes) {
    try {
      console.log(`📄 Pre-rendering ${route}...`);

      const page = await browser.newPage();

      // Navigate to the route
      await page.goto(`http://localhost:4173${route}`, {
        waitUntil: 'networkidle0'
      });

      // Wait a bit for React to hydrate and meta tags to be set
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get the rendered HTML
      let html = await page.content();

      // Replace localhost URLs with production domain
      html = html.replace(/http:\/\/localhost:4173/g, 'https://ibrahimelectric.com');

      // Determine file path
      let filePath;
      if (route === '/') {
        filePath = path.join(__dirname, 'dist', 'index.html');
      } else {
        const routePath = path.join(__dirname, 'dist', route);
        await fs.mkdir(routePath, { recursive: true });
        filePath = path.join(routePath, 'index.html');
      }

      // Save the HTML
      await fs.writeFile(filePath, html);
      console.log(`✅ Saved ${route} to ${filePath}`);

      await page.close();
    } catch (error) {
      console.error(`❌ Error pre-rendering ${route}:`, error.message);
    }
  }

  await browser.close();
  await server.close();

  console.log('✅ Pre-rendering complete!');
}

prerender().catch(error => {
  console.error('❌ Pre-rendering failed:', error);
  process.exit(1);
});
