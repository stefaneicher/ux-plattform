# Quick Start Guide

Get started with the Enterprise UX Platform in minutes!

## 📋 Prerequisites

- Node.js 18.x or 20.x
- npm 9.x or higher
- Git

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/stefaneicher/ux-platform.git
cd ux-platform
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build the Platform

```bash
npm run build
```

This will:
- Generate design tokens as CSS variables (`dist/tokens.css`)
- Generate TypeScript token definitions (`dist/tokens.ts`)
- Build the Storybook documentation site (`dist/storybook/`)

### 4. View the Output

```bash
# View generated tokens
cat dist/tokens.css

# Open Storybook in browser
open dist/storybook/index.html
```

## 🎨 Using Design Tokens

### In CSS

```html
<!-- Include the tokens CSS -->
<link rel="stylesheet" href="dist/tokens.css">

<style>
  .button-primary {
    background-color: var(--color-brand-primary);
    color: white;
    padding: var(--spacing-4);
    border-radius: var(--borderRadius-md);
    font-weight: var(--typography-fontWeight-semibold);
  }
</style>
```

### In JavaScript/TypeScript

```typescript
import { designTokens } from './dist/tokens';

// Access token values
const primaryColor = designTokens.color.brand.primary.value;
console.log(primaryColor); // "#0066CC"
```

### In Angular

```typescript
// component.scss
.button {
  background-color: var(--color-brand-primary);
  padding: var(--spacing-4);
}

// component.ts
import { designTokens } from '@enterprise-ux/platform/dist/tokens';
```

## 🔧 Development Workflow

### Run Tests

```bash
npm test
```

### Run Linter

```bash
npm run lint
```

### Build Individual Parts

```bash
# Build only tokens
npm run build:tokens

# Build only Storybook
npm run build:storybook
```

## 📚 Project Structure

```
ux-platform/
├── .github/
│   ├── workflows/          # GitHub Actions workflows
│   │   ├── ci.yml         # Continuous Integration
│   │   ├── deploy.yml     # Deployment to GitHub Pages
│   │   ├── codeql.yml     # Security analysis
│   │   └── dependency-review.yml
│   └── dependabot.yml     # Automated dependency updates
├── docs/
│   ├── github-actions.md  # Workflows documentation
│   ├── deployment.md      # Deployment guide
│   └── quick-start.md     # This file
├── libs/
│   └── design-tokens/
│       └── tokens.json    # Design token definitions
├── scripts/
│   ├── build-tokens.js    # Token build script
│   └── build-storybook.js # Storybook build script
├── dist/                  # Build output (generated)
│   ├── tokens.css        # CSS variables
│   ├── tokens.ts         # TypeScript definitions
│   └── storybook/        # Static Storybook site
├── package.json          # Project configuration
├── README.md            # Project overview
├── CONTRIBUTING.md      # Contribution guidelines
└── LICENSE             # MIT License
```

## 🎯 Common Tasks

### Add New Design Token

1. **Edit tokens file:**
   ```bash
   vim libs/design-tokens/tokens.json
   ```

2. **Add your token:**
   ```json
   {
     "color": {
       "brand": {
         "tertiary": {
           "value": "#FF9800",
           "type": "color",
           "description": "Tertiary brand color"
         }
       }
     }
   }
   ```

3. **Rebuild:**
   ```bash
   npm run build:tokens
   ```

4. **Use in CSS:**
   ```css
   .element {
     color: var(--color-brand-tertiary);
   }
   ```

### Modify Storybook

1. **Edit build script:**
   ```bash
   vim scripts/build-storybook.js
   ```

2. **Rebuild:**
   ```bash
   npm run build:storybook
   ```

3. **View changes:**
   ```bash
   open dist/storybook/index.html
   ```

### Create New Component

1. **Create component directory:**
   ```bash
   mkdir -p libs/ui-core/components/button
   ```

2. **Add component files:**
   ```bash
   touch libs/ui-core/components/button/button.component.ts
   touch libs/ui-core/components/button/button.component.scss
   touch libs/ui-core/components/button/button.component.html
   ```

3. **Use design tokens in component:**
   ```scss
   .button {
     background: var(--color-brand-primary);
     padding: var(--spacing-3) var(--spacing-6);
     border-radius: var(--borderRadius-base);
   }
   ```

## 🔄 Git Workflow

### Create Feature Branch

```bash
git checkout -b feature/my-new-feature
```

### Make Changes

```bash
# Edit files
vim libs/design-tokens/tokens.json

# Test locally
npm run build
npm test
npm run lint
```

### Commit and Push

```bash
git add .
git commit -m "feat(tokens): add new brand color"
git push origin feature/my-new-feature
```

### Create Pull Request

1. Go to: https://github.com/stefaneicher/ux-platform/pulls
2. Click "New pull request"
3. Select your branch
4. Fill in description
5. Submit for review

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Build entire platform (tokens + Storybook) |
| `npm run build:tokens` | Build design tokens only |
| `npm run build:storybook` | Build Storybook site only |
| `npm test` | Run test suite |
| `npm run lint` | Run code linter |
| `npm run deploy` | Prepare for deployment |

## 🌐 View Documentation Online

- **Storybook:** https://stefaneicher.github.io/ux-platform/
- **Repository:** https://github.com/stefaneicher/ux-platform
- **Actions:** https://github.com/stefaneicher/ux-platform/actions

## 🆘 Troubleshooting

### Build Fails

```bash
# Clean and rebuild
rm -rf node_modules package-lock.json dist/
npm install
npm run build
```

### Token Changes Not Reflected

```bash
# Force rebuild tokens
rm -rf dist/
npm run build:tokens
```

### Dependencies Out of Date

```bash
# Update dependencies
npm update
npm audit fix
```

## 📖 Next Steps

- **Read the full README:** [README.md](../README.md)
- **Learn about workflows:** [docs/github-actions.md](./github-actions.md)
- **Deployment guide:** [docs/deployment.md](./deployment.md)
- **Contributing:** [CONTRIBUTING.md](../CONTRIBUTING.md)

## 💡 Tips

1. **Use CSS Variables:** All design tokens are available as CSS custom properties
2. **Type Safety:** Import TypeScript definitions for type-safe token access
3. **Hot Reload:** Use a local server for development (e.g., `python -m http.server 8000`)
4. **Git Hooks:** Consider adding pre-commit hooks for linting
5. **VS Code:** Install extensions for better DX (ESLint, Prettier, etc.)

## 🤝 Getting Help

- **Documentation:** Check the docs folder
- **Issues:** https://github.com/stefaneicher/ux-platform/issues
- **Discussions:** https://github.com/stefaneicher/ux-platform/discussions
- **Maintainer:** @stefaneicher

---

**Welcome to the Enterprise UX Platform! 🎉**
