#!/usr/bin/env node

/**
 * Build Storybook
 * Generates a static Storybook site
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../dist/storybook');
const TOKENS_PATH = path.join(__dirname, '../dist/tokens.css');

console.log('📚 Building Storybook...');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Read CSS tokens if available
let cssTokens = '';
if (fs.existsSync(TOKENS_PATH)) {
  cssTokens = fs.readFileSync(TOKENS_PATH, 'utf8');
}

// Generate index.html with embedded styles
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Enterprise UX Platform - Storybook</title>
  <style>
    ${cssTokens}
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: var(--typography-fontFamily-base, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      line-height: var(--typography-lineHeight-normal, 1.5);
      color: var(--color-neutral-800, #212529);
      background: var(--color-neutral-50, #F8F9FA);
      padding: 2rem;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      border-radius: var(--borderRadius-lg, 0.5rem);
      box-shadow: var(--elevation-md, 0 4px 6px rgba(0, 0, 0, 0.1));
      padding: 3rem;
    }
    
    h1 {
      font-family: var(--typography-fontFamily-heading, 'Inter', sans-serif);
      font-size: var(--typography-fontSize-4xl, 2.25rem);
      font-weight: var(--typography-fontWeight-bold, 700);
      color: var(--color-brand-primary, #0066CC);
      margin-bottom: 1rem;
    }
    
    h2 {
      font-size: var(--typography-fontSize-2xl, 1.5rem);
      font-weight: var(--typography-fontWeight-semibold, 600);
      margin-top: 2rem;
      margin-bottom: 1rem;
      color: var(--color-neutral-700, #343A40);
    }
    
    p {
      margin-bottom: 1rem;
      color: var(--color-neutral-600, #495057);
    }
    
    .badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: var(--borderRadius-full, 9999px);
      font-size: var(--typography-fontSize-sm, 0.875rem);
      font-weight: var(--typography-fontWeight-medium, 500);
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
    }
    
    .badge-primary {
      background: var(--color-brand-primary, #0066CC);
      color: white;
    }
    
    .badge-success {
      background: var(--color-semantic-success, #28A745);
      color: white;
    }
    
    .badge-info {
      background: var(--color-semantic-info, #17A2B8);
      color: white;
    }
    
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }
    
    .card {
      background: var(--color-neutral-50, #F8F9FA);
      padding: 1.5rem;
      border-radius: var(--borderRadius-md, 0.375rem);
      border-left: 4px solid var(--color-brand-primary, #0066CC);
    }
    
    .card h3 {
      font-size: var(--typography-fontSize-lg, 1.125rem);
      font-weight: var(--typography-fontWeight-semibold, 600);
      margin-bottom: 0.5rem;
      color: var(--color-neutral-800, #212529);
    }
    
    .card p {
      font-size: var(--typography-fontSize-sm, 0.875rem);
      color: var(--color-neutral-600, #495057);
    }
    
    .color-swatch {
      display: inline-block;
      width: 3rem;
      height: 3rem;
      border-radius: var(--borderRadius-base, 0.25rem);
      margin-right: 1rem;
      box-shadow: var(--elevation-sm, 0 1px 2px rgba(0, 0, 0, 0.05));
    }
    
    ul {
      list-style: none;
      padding-left: 0;
    }
    
    li {
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--color-neutral-200, #DEE2E6);
    }
    
    li:last-child {
      border-bottom: none;
    }
    
    code {
      font-family: var(--typography-fontFamily-monospace, 'Courier New', monospace);
      background: var(--color-neutral-100, #E9ECEF);
      padding: 0.125rem 0.375rem;
      border-radius: var(--borderRadius-sm, 0.125rem);
      font-size: var(--typography-fontSize-sm, 0.875rem);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎨 Enterprise UX Platform</h1>
    <p><strong>State-of-the-art Design System for CSS Insurance (2026)</strong></p>
    
    <div>
      <span class="badge badge-primary">Design Tokens</span>
      <span class="badge badge-success">Components</span>
      <span class="badge badge-info">Accessible</span>
    </div>
    
    <h2>📦 What's Included</h2>
    
    <div class="grid">
      <div class="card">
        <h3>Design Tokens</h3>
        <p>Platform-agnostic design tokens for colors, typography, spacing, and more. Generated as CSS variables and TypeScript.</p>
      </div>
      
      <div class="card">
        <h3>Component Library</h3>
        <p>Reusable UI components built with accessibility and enterprise requirements in mind.</p>
      </div>
      
      <div class="card">
        <h3>UX Patterns</h3>
        <p>Insurance-specific patterns for Claims, Contracts, Customer 360, and more.</p>
      </div>
      
      <div class="card">
        <h3>Accessibility</h3>
        <p>WCAG AA compliance by default with automated testing and keyboard navigation support.</p>
      </div>
    </div>
    
    <h2>🎨 Design Tokens Preview</h2>
    
    <h3 style="margin-top: 1.5rem; font-size: var(--typography-fontSize-xl, 1.25rem);">Brand Colors</h3>
    <div style="margin: 1rem 0;">
      <span class="color-swatch" style="background: var(--color-brand-primary, #0066CC);"></span>
      <code>--color-brand-primary</code>
    </div>
    <div style="margin: 1rem 0;">
      <span class="color-swatch" style="background: var(--color-brand-secondary, #004080);"></span>
      <code>--color-brand-secondary</code>
    </div>
    <div style="margin: 1rem 0;">
      <span class="color-swatch" style="background: var(--color-brand-accent, #FF6B35);"></span>
      <code>--color-brand-accent</code>
    </div>
    
    <h3 style="margin-top: 1.5rem; font-size: var(--typography-fontSize-xl, 1.25rem);">Semantic Colors</h3>
    <div style="margin: 1rem 0;">
      <span class="color-swatch" style="background: var(--color-semantic-success, #28A745);"></span>
      <code>--color-semantic-success</code>
    </div>
    <div style="margin: 1rem 0;">
      <span class="color-swatch" style="background: var(--color-semantic-warning, #FFC107);"></span>
      <code>--color-semantic-warning</code>
    </div>
    <div style="margin: 1rem 0;">
      <span class="color-swatch" style="background: var(--color-semantic-error, #DC3545);"></span>
      <code>--color-semantic-error</code>
    </div>
    
    <h2>🚀 Getting Started</h2>
    
    <ul>
      <li>📚 <strong>View tokens:</strong> Check <code>libs/design-tokens/tokens.json</code></li>
      <li>🎨 <strong>Use CSS variables:</strong> Import <code>dist/tokens.css</code></li>
      <li>📦 <strong>TypeScript:</strong> Import from <code>dist/tokens.ts</code></li>
      <li>♿ <strong>Accessibility:</strong> All components are WCAG AA compliant</li>
    </ul>
    
    <p style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--color-neutral-200, #DEE2E6); color: var(--color-neutral-500, #6C757D); font-size: var(--typography-fontSize-sm, 0.875rem);">
      Built with ❤️ for CSS Insurance | Generated: ${new Date().toISOString()}
    </p>
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), html);

console.log('✅ Storybook generated:', OUTPUT_DIR);
console.log('🎉 Storybook built successfully!');
