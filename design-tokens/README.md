# Design Tokens

Design tokens are the foundation of the CSS Insurance UX Platform. They provide platform-agnostic design variables that ensure consistency across all applications.

## 📁 Files

- **`tokens.json`** - Source of truth for all design tokens
- **`tokens.css`** - CSS custom properties (CSS variables)
- **`tokens.ts`** - TypeScript definitions and values

## 🎨 Token Categories

### Colors

#### Brand Colors
- **Primary**: Main CSS Insurance brand color (#2990ff)
- **Secondary**: Supporting brand color

Each brand color has a scale from 50 (lightest) to 900 (darkest).

#### Semantic Colors
- **Success**: Green tones for positive actions (#10b981)
- **Warning**: Orange tones for warnings (#f59e0b)
- **Error**: Red tones for errors (#ef4444)
- **Info**: Blue tones for information (#3b82f6)

#### Neutral Colors
Gray scale from white (0) to black (1000).

#### Text Colors
- `primary`: Default text color
- `secondary`: Muted text
- `tertiary`: Even more muted
- `disabled`: Disabled state text
- `on-primary`: Text on primary colored backgrounds
- `link`: Link text color

#### Surface Colors
- `primary`: Main background (white)
- `secondary`: Subtle background
- `tertiary`: More prominent background
- `overlay`: Modal/dialog overlays

#### Border Colors
- `default`: Standard borders
- `strong`: Emphasized borders
- `subtle`: Subtle borders

### Typography

#### Font Families
- **base**: Inter (for body text)
- **heading**: Inter (for headings)
- **monospace**: Fira Code (for code)

#### Font Sizes
Scale from xs (12px) to 5xl (48px):
- `xs`: 0.75rem (12px)
- `sm`: 0.875rem (14px)
- `md`: 1rem (16px) - **base size**
- `lg`: 1.125rem (18px)
- `xl`: 1.25rem (20px)
- `2xl`: 1.5rem (24px)
- `3xl`: 1.875rem (30px)
- `4xl`: 2.25rem (36px)
- `5xl`: 3rem (48px)

#### Font Weights
- `normal`: 400
- `medium`: 500
- `semibold`: 600
- `bold`: 700

#### Line Heights
- `tight`: 1.25 (for headings)
- `normal`: 1.5 (default)
- `relaxed`: 1.75 (for reading)

### Spacing

8-point grid system from 4px to 96px:
- `xs`: 0.25rem (4px)
- `sm`: 0.5rem (8px)
- `md`: 1rem (16px) - **base spacing**
- `lg`: 1.5rem (24px)
- `xl`: 2rem (32px)
- `2xl`: 3rem (48px)
- `3xl`: 4rem (64px)
- `4xl`: 6rem (96px)

### Border Radius

- `none`: 0
- `sm`: 0.25rem (4px)
- `md`: 0.5rem (8px)
- `lg`: 0.75rem (12px)
- `xl`: 1rem (16px)
- `full`: 9999px (circular)

### Elevation (Shadows)

From subtle to dramatic:
- `none`: No shadow
- `xs`: Very subtle
- `sm`: Small
- `md`: Medium (default for cards)
- `lg`: Large
- `xl`: Extra large
- `2xl`: Dramatic (for modals)

### Motion

#### Durations
- `instant`: 50ms
- `fast`: 150ms (default)
- `normal`: 250ms
- `slow`: 350ms
- `slower`: 500ms

#### Easing Functions
- `standard`: cubic-bezier(0.4, 0, 0.2, 1)
- `enter`: cubic-bezier(0, 0, 0.2, 1)
- `exit`: cubic-bezier(0.4, 0, 1, 1)
- `linear`: linear

### Z-Index Layers

Organized stacking order:
- `dropdown`: 1000
- `sticky`: 1020
- `fixed`: 1030
- `modal-backdrop`: 1040
- `modal`: 1050
- `popover`: 1060
- `tooltip`: 1070

### Breakpoints

Responsive design breakpoints:
- `mobile`: 320px
- `tablet`: 768px
- `desktop`: 1024px
- `wide`: 1280px
- `ultra`: 1920px

## 🚀 Usage

### In CSS

```css
/* Import the tokens */
@import 'design-tokens/tokens.css';

/* Use CSS variables */
.my-component {
  color: var(--color-text-primary);
  background: var(--color-surface-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  box-shadow: var(--elevation-md);
  transition: all var(--duration-fast) var(--easing-standard);
}

.primary-button {
  background: var(--color-primary-500);
  color: var(--color-text-on-primary);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
  font-weight: var(--font-weight-semibold);
}

.primary-button:hover {
  background: var(--color-primary-600);
}
```

### In TypeScript/Angular

```typescript
import { tokens } from '@css-insurance/design-tokens';

// Access token values
const primaryColor = tokens.color.brand.primary[500];
const spacing = tokens.spacing.md;
const borderRadius = tokens.radius.md;
```

### In HTML

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="design-tokens/tokens.css">
  <style>
    .card {
      background: var(--color-surface-primary);
      border: 1px solid var(--color-border-default);
      border-radius: var(--radius-lg);
      padding: var(--spacing-lg);
      box-shadow: var(--elevation-md);
    }
  </style>
</head>
<body>
  <div class="card">
    <h2>Welcome to CSS Insurance</h2>
    <p>Using design tokens for consistent styling</p>
  </div>
</body>
</html>
```

## ✅ Best Practices

1. **Always use tokens instead of hardcoded values**
   ```css
   /* ❌ Bad */
   color: #111827;
   padding: 16px;
   
   /* ✅ Good */
   color: var(--color-text-primary);
   padding: var(--spacing-md);
   ```

2. **Use semantic color names**
   ```css
   /* ❌ Bad */
   background: var(--color-neutral-100);
   
   /* ✅ Good */
   background: var(--color-surface-tertiary);
   ```

3. **Maintain the spacing scale**
   ```css
   /* ❌ Bad */
   margin: 12px; /* not in scale */
   
   /* ✅ Good */
   margin: var(--spacing-sm); /* 8px */
   margin: var(--spacing-md); /* 16px */
   ```

4. **Use motion tokens for transitions**
   ```css
   /* ✅ Good */
   transition: opacity var(--duration-fast) var(--easing-standard);
   ```

## 🔄 Versioning

Design tokens follow semantic versioning:
- **Major**: Breaking changes (e.g., removing tokens)
- **Minor**: New tokens added
- **Patch**: Value adjustments

Current version: **1.0.0**

## 📦 Integration

### Package Installation (Future)

```bash
npm install @css-insurance/design-tokens
```

### Direct Import (Current)

Copy the design-tokens directory to your project and import as needed.

## 🎯 Platform Support

These tokens work across:
- ✅ Web (CSS)
- ✅ Angular (TypeScript)
- ✅ React (TypeScript/CSS)
- ✅ Vue (CSS)
- ✅ Mobile (convert to native formats)

## 🔗 Related Documentation

- [Design System Components](../design-system/README.md)
- [UX Architecture](../ux-architecture/README.md)
- [Getting Started Guide](../docs/getting-started.md)
