import 'zone.js/node';
import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync } from 'fs';
import { join } from 'path';
import { AppServerModule } from './src/main.server';

// The Express app
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/Tamweel');
  // const distFolder = join(process.cwd(), 'dist/Tamweel');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) 
    ? 'index.original.html' 
    : 'index';

  // Our Universal express-engine
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Serve static files
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));
server.get('/google621cad0974d999b4.html', (req, res) => {
  res.sendFile(join(distFolder, 'google621cad0974d999b4.html'), {
    headers: {
      'Content-Type': 'text/html'
    }
  });
});
  // Dynamic robots.txt
  server.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send(`User-agent: *
Allow: /
Disallow: /admin/
Sitemap: ${req.protocol}://${req.get('host')}/sitemap.xml`);
  });

  // Dynamic sitemap.xml
  server.get('/sitemap.xml', (req, res) => {
    res.type('application/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${req.protocol}://${req.get('host')}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`);
  });

  // All regular routes
  server.get('*', (req, res) => {
    res.render(indexHtml, { 
      req, 
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] 
    });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
if (mainModule && mainModule.filename === __filename) {
  run();
}

export * from './src/main.server';