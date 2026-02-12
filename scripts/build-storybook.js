#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const COMPANY_NAME = 'CSS Insurance';
const PLATFORM_NAME = 'Enterprise UX Platform';
const OUTPUT_DIR = path.join(__dirname, '../dist/storybook');

console.log('📚 Building Documentation Site...');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Copy demo.html to output
const demoSourcePath = path.join(__dirname, '../docs/demo.html');
if (fs.existsSync(demoSourcePath)) {
  fs.copyFileSync(demoSourcePath, path.join(OUTPUT_DIR, 'demo.html'));
  console.log('✅ Copied demo.html');
}

// Read design tokens
const tokensPath = path.join(__dirname, '../libs/design-tokens/tokens.json');
const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

// Generate comprehensive index HTML
const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${PLATFORM_NAME} - ${COMPANY_NAME}</title>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Roboto', sans-serif; line-height: 1.6; color: #333; background: #f5f5f5; }
    header { background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%); color: white; padding: 3rem 2rem; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    header h1 { font-size: 3rem; font-weight: 300; margin-bottom: 0.5rem; }
    header p { font-size: 1.3rem; opacity: 0.9; }
    .header-meta { font-size: 0.9rem; opacity: 0.8; margin-top: 1rem; }
    .container { max-width: 1200px; margin: 2rem auto; padding: 0 2rem; }
    .hero-section { background: white; border-radius: 8px; padding: 3rem 2rem; margin-bottom: 2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1); text-align: center; }
    .hero-section h2 { font-size: 2rem; font-weight: 400; margin-bottom: 1rem; color: #1976d2; }
    .hero-section p { font-size: 1.1rem; color: #666; max-width: 800px; margin: 0 auto 2rem; }
    .cta-buttons { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
    .btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 32px; border: none; border-radius: 4px; font-size: 1rem; font-weight: 500; text-decoration: none; cursor: pointer; transition: all 0.2s; text-transform: uppercase; letter-spacing: 0.5px; }
    .btn-primary { background: #1976d2; color: white; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
    .btn-primary:hover { background: #1565c0; box-shadow: 0 4px 8px rgba(0,0,0,0.3); }
    .btn-secondary { background: white; color: #1976d2; border: 2px solid #1976d2; }
    .btn-secondary:hover { background: #f5f5f5; }
    .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
    .feature-card { background: white; border-radius: 8px; padding: 2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: transform 0.2s, box-shadow 0.2s; }
    .feature-card:hover { transform: translateY(-4px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
    .feature-icon { width: 60px; height: 60px; background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; color: white; font-size: 28px; }
    .feature-card h3 { font-size: 1.3rem; font-weight: 500; margin-bottom: 0.75rem; color: #1976d2; }
    .feature-card p { color: #666; line-height: 1.6; }
    .section { background: white; border-radius: 8px; padding: 2rem; margin-bottom: 2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .section h2 { font-size: 1.8rem; font-weight: 400; margin-bottom: 1.5rem; color: #1976d2; display: flex; align-items: center; gap: 12px; }
    .token-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem; }
    .token-item { padding: 1rem; border: 1px solid #e0e0e0; border-radius: 4px; transition: box-shadow 0.2s; }
    .token-item:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .token-name { font-weight: 600; color: #1976d2; margin-bottom: 0.5rem; font-size: 0.9rem; }
    .token-value { font-family: 'Courier New', monospace; font-size: 0.85rem; color: #666; }
    .color-swatch { width: 100%; height: 60px; border-radius: 4px; margin-top: 0.5rem; border: 1px solid #e0e0e0; }
    .spacing-demo { background: #1976d2; height: 20px; border-radius: 2px; }
    footer { background: #333; color: white; text-align: center; padding: 2rem; margin-top: 4rem; }
    footer a { color: #42a5f5; text-decoration: none; }
    footer a:hover { text-decoration: underline; }
    @media (max-width: 768px) {
      header h1 { font-size: 2rem; }
      .hero-section h2 { font-size: 1.5rem; }
      .features-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <header>
    <h1>${PLATFORM_NAME}</h1>
    <p>${COMPANY_NAME}</p>
    <p>Design System mit Angular Material für Desktop & Mobile</p>
    <div class="header-meta">Version 1.0.0 | Februar 2026</div>
  </header>

  <div class="container">
    <div class="hero-section">
      <h2>Firmenweites UX Design System</h2>
      <p>Vollständige Enterprise-Lösung mit Angular Material, Design Tokens, Komponenten-Bibliothek, Navigation-Patterns und UX-Guidelines für konsistente, zugängliche und wartbare Anwendungen.</p>
      <div class="cta-buttons">
        <a href="demo.html" class="btn btn-primary">
          <span class="material-icons">visibility</span>
          Live Demo ansehen
        </a>
        <a href="https://github.com/stefaneicher/ux-platform" class="btn btn-secondary" target="_blank">
          <span class="material-icons">code</span>
          GitHub Repository
        </a>
      </div>
    </div>

    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon"><span class="material-icons">palette</span></div>
        <h3>Design Tokens</h3>
        <p>Plattform-agnostische Design-Tokens für Farben, Typografie, Spacing, Elevation und mehr - konsistent über alle Anwendungen.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon"><span class="material-icons">widgets</span></div>
        <h3>Komponenten-Bibliothek</h3>
        <p>3-Layer-Architektur mit Angular Material Basis, CSS-Wrappern und Business-spezifischen Komponenten.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon"><span class="material-icons">navigation</span></div>
        <h3>Navigation Patterns</h3>
        <p>App Shell mit Top Bar, Side Navigation, Breadcrumbs und Tabs - responsive für Desktop und Mobile.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon"><span class="material-icons">description</span></div>
        <h3>Seiten-Blueprints</h3>
        <p>Fertige Templates für Dashboard, Listen, Detail-Seiten, Formulare, Wizard und mehr.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon"><span class="material-icons">accessibility</span></div>
        <h3>WCAG AA konform</h3>
        <p>Accessibility von Anfang an - Keyboard Navigation, Screen Reader Support und Focus Management.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon"><span class="material-icons">devices</span></div>
        <h3>Responsive Design</h3>
        <p>Desktop-optimiert, Mobile-fähig - mit angepassten Layouts und Interaktionsmustern für alle Bildschirmgrößen.</p>
      </div>
    </div>

    <div class="section">
      <h2><span class="material-icons">palette</span> Design Tokens - Farben</h2>
      <div class="token-grid">
        ${Object.entries(tokens.color).map(([key, value]) => {
          return `<div class="token-item">
            <div class="token-name">color.${key}</div>
            <div class="token-value">${value}</div>
            <div class="color-swatch" style="background-color: ${value}"></div>
          </div>`;
        }).join('')}
      </div>
    </div>

    <div class="section">
      <h2><span class="material-icons">straighten</span> Design Tokens - Spacing (8pt Grid)</h2>
      <div class="token-grid">
        ${Object.entries(tokens.spacing).map(([key, value]) => {
          return `<div class="token-item">
            <div class="token-name">spacing.${key}</div>
            <div class="token-value">${value}</div>
            <div class="spacing-demo" style="width: ${value}"></div>
          </div>`;
        }).join('')}
      </div>
    </div>

    <div class="section">
      <h2><span class="material-icons">text_fields</span> Design Tokens - Typografie</h2>
      <div class="token-grid">
        ${Object.entries(tokens.typography.fontSize).map(([key, value]) => {
          return `<div class="token-item">
            <div class="token-name">typography.fontSize.${key}</div>
            <div class="token-value">${value}</div>
            <div style="font-size: ${value}; margin-top: 0.5rem;">Sample Text</div>
          </div>`;
        }).join('')}
      </div>
    </div>

    <div class="section">
      <h2><span class="material-icons">crop_square</span> Design Tokens - Border Radius</h2>
      <div class="token-grid">
        ${Object.entries(tokens.borderRadius).map(([key, value]) => {
          return `<div class="token-item">
            <div class="token-name">borderRadius.${key}</div>
            <div class="token-value">${value}</div>
            <div style="width: 60px; height: 60px; background: #1976d2; border-radius: ${value}; margin-top: 0.5rem;"></div>
          </div>`;
        }).join('')}
      </div>
    </div>

    <div class="section">
      <h2><span class="material-icons">menu_book</span> Dokumentation</h2>
      <div class="features-grid">
        <div class="feature-card">
          <h3>UX Playbook</h3>
          <p>Vollständiger Leitfaden mit Design-Prinzipien, Patterns und Best Practices.</p>
          <a href="https://github.com/stefaneicher/ux-platform/blob/main/docs/ux-playbook/README.md" target="_blank" class="btn btn-secondary" style="margin-top: 1rem;">Playbook öffnen</a>
        </div>
        <div class="feature-card">
          <h3>Navigation Map</h3>
          <p>Site Map, Navigation Patterns und User Flows für die gesamte Plattform.</p>
          <a href="https://github.com/stefaneicher/ux-platform/blob/main/docs/ux-playbook/navigation.md" target="_blank" class="btn btn-secondary" style="margin-top: 1rem;">Navigation öffnen</a>
        </div>
        <div class="feature-card">
          <h3>Komponenten-Katalog</h3>
          <p>Vollständige Referenz aller Komponenten mit Code-Beispielen.</p>
          <a href="https://github.com/stefaneicher/ux-platform/blob/main/docs/ux-playbook/components.md" target="_blank" class="btn btn-secondary" style="margin-top: 1rem;">Komponenten öffnen</a>
        </div>
      </div>
    </div>
  </div>

  <footer>
    <p>&copy; 2026 ${COMPANY_NAME}. All rights reserved.</p>
    <p>
      <a href="https://github.com/stefaneicher/ux-platform" target="_blank">GitHub</a> |
      <a href="https://github.com/stefaneicher/ux-platform/issues" target="_blank">Issues</a> |
      <a href="https://github.com/stefaneicher/ux-platform/blob/main/LICENSE" target="_blank">License</a>
    </p>
  </footer>
</body>
</html>`;

// Write index HTML
fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), html);

console.log('✅ Documentation site built successfully');
console.log(`📦 Output: ${OUTPUT_DIR}/index.html`);
console.log(`📦 Demo: ${OUTPUT_DIR}/demo.html`);
