# Design to Code Pipeline

The design-to-code pipeline ensures smooth synchronization between design and implementation, minimizing drift and maintaining consistency.

## 🎯 Overview

Our pipeline automates the flow from design tools to production code:

```
Design Tool → Token Export → Repository → Build → Storybook → Release
     ↓            ↓             ↓          ↓         ↓          ↓
   Figma      tokens.json    Git Repo   Package  Component  Production
                                                    Catalog
```

## 🔄 Pipeline Stages

### 1. Design (Figma)

**Tools**: Figma + Design Tokens Plugin

**Process:**
1. Designers create/update components in Figma
2. Design tokens defined in Figma
3. Components follow design system guidelines
4. Design review and approval

**Output**: Figma component library

### 2. Token Export

**Tools**: Figma Tokens Plugin → Style Dictionary

**Process:**
1. Export design tokens from Figma to JSON
2. Transform tokens using Style Dictionary
3. Generate platform-specific formats (CSS, TypeScript, iOS, Android)

**Input**: Figma design tokens
**Output**: 
- `tokens.json` (source)
- `tokens.css` (CSS variables)
- `tokens.ts` (TypeScript)
- `tokens.swift` (iOS - future)
- `tokens.xml` (Android - future)

#### Style Dictionary Configuration

```javascript
// build-tokens.js
const StyleDictionary = require('style-dictionary');

module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables'
      }]
    },
    ts: {
      transformGroup: 'js',
      buildPath: 'dist/ts/',
      files: [{
        destination: 'tokens.ts',
        format: 'javascript/es6'
      }]
    }
  }
};
```

### 3. Repository Integration

**Tools**: Git + GitHub

**Process:**
1. Tokens committed to repository
2. Pull request created
3. Automated tests run
4. Component Maintainer review
5. Merge to main branch

**Checks:**
- Linting passes
- Token schema validation
- No breaking changes (or properly documented)
- Accessibility standards met

### 4. Build & Package

**Tools**: npm/yarn + Build scripts

**Process:**
1. Install dependencies
2. Build components
3. Generate documentation
4. Run tests
5. Create package

**Output**: `@css-insurance/design-tokens` package

### 5. Component Catalog (Storybook)

**Tools**: Storybook

**Process:**
1. Build Storybook
2. Deploy to hosting
3. Generate component documentation
4. Visual regression tests

**URL**: https://storybook.css-insurance.ch

**Features:**
- Interactive component playground
- Design token documentation
- Accessibility tests
- Usage examples
- Code snippets

### 6. Release & Distribution

**Tools**: npm + Semantic Release

**Process:**
1. Version bump (semantic versioning)
2. Generate changelog
3. Publish to npm registry
4. Tag git release
5. Notify consuming applications

## 📦 Repository Structure

```
ux-platform/
├── design-tokens/
│   ├── tokens.json          # Source tokens from Figma
│   ├── tokens.css           # Generated CSS
│   ├── tokens.ts            # Generated TypeScript
│   └── build-tokens.js      # Build script
├── design-system/
│   └── components/
│       ├── button/
│       │   ├── button.html
│       │   ├── button.css
│       │   ├── button.stories.ts
│       │   └── button.test.ts
│       └── ...
├── docs/                    # Documentation
├── .github/
│   └── workflows/
│       ├── ci.yml          # Continuous integration
│       ├── deploy-storybook.yml
│       └── release.yml     # Automated releases
└── package.json
```

## 🔄 Versioning Strategy

### Design Token Versions

Follow semantic versioning:

```json
{
  "name": "@css-insurance/design-tokens",
  "version": "1.2.3"
}
```

**Version bumps:**
- **MAJOR** (1.x.x): Breaking changes (removing tokens, renaming)
- **MINOR** (x.2.x): New tokens added
- **PATCH** (x.x.3): Token value adjustments

### Component Versions

Separate versioning for component library:

```json
{
  "name": "@css-insurance/ui-components",
  "version": "2.1.0"
}
```

### Sync Model

**Token Version → Component Version Mapping:**

```
Design Tokens v1.x → Components v2.x (compatible)
Design Tokens v2.x → Components v3.x (requires update)
```

### Breaking Change Strategy

1. **Deprecation Phase** (3 months):
   - Mark old tokens as deprecated
   - Add deprecation warnings
   - Provide migration guide

2. **Parallel Support** (3 months):
   - Old tokens still work
   - New tokens available
   - Applications migrate gradually

3. **Removal** (after 6 months):
   - Old tokens removed
   - Major version bump
   - Clear migration documentation

## 🛠️ Automation

### CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Build tokens
        run: npm run build:tokens
      
      - name: Test
        run: npm test
      
      - name: Accessibility tests
        run: npm run test:a11y
      
      - name: Build Storybook
        run: npm run build:storybook
```

### Automated Token Updates

```yaml
# .github/workflows/token-sync.yml
name: Token Sync

on:
  schedule:
    - cron: '0 9 * * 1' # Monday mornings
  workflow_dispatch: # Manual trigger

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Fetch tokens from Figma
        run: npm run fetch:tokens
        env:
          FIGMA_TOKEN: ${{ secrets.FIGMA_TOKEN }}
      
      - name: Build tokens
        run: npm run build:tokens
      
      - name: Create PR
        uses: peter-evans/create-pull-request@v5
        with:
          title: 'chore: sync design tokens from Figma'
          body: 'Automated token sync from Figma'
          branch: 'token-sync'
```

### Automated Releases

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Semantic Release
        run: npx semantic-release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## 📊 Quality Gates

Every change must pass:

### 1. Automated Tests
- ✅ Unit tests
- ✅ Integration tests
- ✅ Visual regression tests
- ✅ Accessibility tests

### 2. Linting
- ✅ ESLint (JavaScript/TypeScript)
- ✅ Stylelint (CSS)
- ✅ Prettier (formatting)

### 3. Accessibility
- ✅ axe-core tests
- ✅ Color contrast checks
- ✅ Keyboard navigation tests

### 4. Documentation
- ✅ Component docs updated
- ✅ CHANGELOG updated
- ✅ Migration guide (if breaking)

### 5. Review
- ✅ Component Maintainer approval
- ✅ Design Authority approval (for major changes)

## 🔍 Token Audit Trail

Track token changes:

```json
{
  "color": {
    "primary": {
      "500": {
        "value": "#2990ff",
        "history": [
          {
            "value": "#0070f0",
            "date": "2025-12-01",
            "author": "designer@css.ch",
            "reason": "Brand refresh"
          }
        ]
      }
    }
  }
}
```

## 📈 Metrics & Monitoring

### Pipeline Health
- Build success rate
- Average build time
- Deployment frequency
- Time to production

### Design-Code Drift
- Token usage compliance
- Component consistency score
- Design review turnaround time

### Adoption
- Applications using latest tokens
- Component library usage %
- Custom implementations vs. reuse

## 🚀 Getting Started

### For Designers

1. Use Figma Design Tokens plugin
2. Follow token naming conventions
3. Export tokens regularly
4. Sync with development team

### For Developers

1. Import design tokens package:
   ```bash
   npm install @css-insurance/design-tokens
   ```

2. Use in your code:
   ```css
   @import '@css-insurance/design-tokens/tokens.css';
   ```

3. Subscribe to update notifications

## 🎯 Success Criteria

Pipeline is successful when:
- ✅ Design changes reach production < 1 week
- ✅ Zero manual token copying
- ✅ < 5% design-code drift
- ✅ 100% automated testing
- ✅ Clear audit trail

## 📞 Support

Pipeline issues?
- **Slack**: #design-system-pipeline
- **Email**: devops@css-insurance.ch
- **Documentation**: [Pipeline Wiki](https://wiki.css-insurance.ch/pipeline)

---

**Last Updated**: January 2026
