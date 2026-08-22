import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

if (fs.existsSync(distDir)) {
  const indexHtmlPath = path.join(distDir, 'index.html');
  
  if (fs.existsSync(indexHtmlPath)) {
    const indexContent = fs.readFileSync(indexHtmlPath, 'utf-8');

    // 1. Create 404.html for SPA GitHub Pages fallback
    const path404 = path.join(distDir, '404.html');
    fs.writeFileSync(path404, indexContent, 'utf-8');
    console.log('[+] Created dist/404.html');

    // 2. Create dist/lab/index.html so /lab returns direct HTTP 200 on GitHub Pages
    const labDir = path.join(distDir, 'lab');
    if (!fs.existsSync(labDir)) {
      fs.mkdirSync(labDir, { recursive: true });
    }
    const labIndexHtmlPath = path.join(labDir, 'index.html');
    fs.writeFileSync(labIndexHtmlPath, indexContent, 'utf-8');
    console.log('[+] Created dist/lab/index.html for direct /lab route');
  }
}
