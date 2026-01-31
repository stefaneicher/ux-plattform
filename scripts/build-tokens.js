#!/usr/bin/env node

/**
 * Build Design Tokens
 * Converts tokens.json to CSS and TypeScript formats
 */

const fs = require('fs');
const path = require('path');

const TOKENS_PATH = path.join(__dirname, '../libs/design-tokens/tokens.json');
const CSS_OUTPUT = path.join(__dirname, '../dist/tokens.css');
const TS_OUTPUT = path.join(__dirname, '../dist/tokens.ts');

console.log('🎨 Building design tokens...');

// Read tokens
const tokens = JSON.parse(fs.readFileSync(TOKENS_PATH, 'utf8'));

// Generate CSS variables
function generateCSS(tokens, prefix = '') {
  let css = ':root {\n';
  
  function traverse(obj, path = []) {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = [...path, key];
      
      if (value && typeof value === 'object') {
        if (value.value !== undefined) {
          // This is a token
          const varName = `--${currentPath.join('-')}`;
          css += `  ${varName}: ${value.value};\n`;
        } else {
          // Traverse deeper
          traverse(value, currentPath);
        }
      }
    }
  }
  
  traverse(tokens);
  css += '}\n';
  return css;
}

// Generate TypeScript
function generateTS(tokens) {
  return `/**
 * Design Tokens
 * Auto-generated from tokens.json
 * Do not edit manually
 */

export const designTokens = ${JSON.stringify(tokens, null, 2)};

export type DesignTokens = typeof designTokens;
`;
}

// Ensure output directory exists
const distDir = path.dirname(CSS_OUTPUT);
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Write files
fs.writeFileSync(CSS_OUTPUT, generateCSS(tokens));
fs.writeFileSync(TS_OUTPUT, generateTS(tokens));

console.log('✅ CSS variables generated:', CSS_OUTPUT);
console.log('✅ TypeScript tokens generated:', TS_OUTPUT);
console.log('🎉 Design tokens built successfully!');
