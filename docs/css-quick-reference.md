# CSS Developer Quick Reference

Quick reference guide for CSS developers using the CSS Insurance UX Platform.

## 🚀 Getting Started in 5 Minutes

### 1. Import Design Tokens

```html
<link rel="stylesheet" href="path/to/design-tokens/tokens.css">
```

### 2. Use CSS Variables

```css
.my-element {
  color: var(--color-text-primary);
  background: var(--color-surface-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
}
```

### 3. Build Components

```html
<button class="btn btn-primary">Click Me</button>
```

## 🎨 Design Tokens Cheat Sheet

### Colors

```css
/* Brand */
--color-primary-500       /* #2990ff - Main brand color */
--color-secondary-500     /* #1a9aff - Secondary color */

/* Semantic */
--color-success-500       /* #10b981 - Success/positive */
--color-warning-500       /* #f59e0b - Warning/caution */
--color-error-500         /* #ef4444 - Error/danger */
--color-info-500          /* #3b82f6 - Information */

/* Text */
--color-text-primary      /* Main text color */
--color-text-secondary    /* Muted text */
--color-text-link         /* Link color */
--color-text-on-primary   /* Text on colored backgrounds */

/* Surfaces */
--color-surface-primary   /* Main background (white) */
--color-surface-secondary /* Subtle background */
--color-surface-tertiary  /* More prominent background */

/* Borders */
--color-border-default    /* Standard border */
--color-border-strong     /* Emphasized border */
--color-border-subtle     /* Subtle border */
```

### Spacing (8px grid)

```css
--spacing-xs    /* 4px */
--spacing-sm    /* 8px */
--spacing-md    /* 16px - Base spacing */
--spacing-lg    /* 24px */
--spacing-xl    /* 32px */
--spacing-2xl   /* 48px */
--spacing-3xl   /* 64px */
--spacing-4xl   /* 96px */
```

### Typography

```css
/* Font Families */
--font-family-base        /* Inter - Body text */
--font-family-heading     /* Inter - Headings */
--font-family-monospace   /* Fira Code - Code */

/* Font Sizes */
--font-size-xs     /* 12px */
--font-size-sm     /* 14px */
--font-size-md     /* 16px - Base */
--font-size-lg     /* 18px */
--font-size-xl     /* 20px */
--font-size-2xl    /* 24px */
--font-size-3xl    /* 30px */
--font-size-4xl    /* 36px */
--font-size-5xl    /* 48px */

/* Font Weights */
--font-weight-normal      /* 400 */
--font-weight-medium      /* 500 */
--font-weight-semibold    /* 600 */
--font-weight-bold        /* 700 */

/* Line Heights */
--line-height-tight       /* 1.25 - Headings */
--line-height-normal      /* 1.5 - Body */
--line-height-relaxed     /* 1.75 - Reading */
```

### Border Radius

```css
--radius-sm      /* 4px */
--radius-md      /* 8px */
--radius-lg      /* 12px */
--radius-xl      /* 16px */
--radius-full    /* 9999px - Circular */
```

### Shadows

```css
--elevation-xs     /* Very subtle */
--elevation-sm     /* Small */
--elevation-md     /* Medium - Default for cards */
--elevation-lg     /* Large */
--elevation-xl     /* Extra large */
--elevation-2xl    /* Dramatic - Modals */
```

### Motion

```css
/* Durations */
--duration-fast      /* 150ms - Default */
--duration-normal    /* 250ms */
--duration-slow      /* 350ms */

/* Easing */
--easing-standard    /* cubic-bezier(0.4, 0, 0.2, 1) */
--easing-enter       /* cubic-bezier(0, 0, 0.2, 1) */
--easing-exit        /* cubic-bezier(0.4, 0, 1, 1) */
```

## 🧩 Component Patterns

### Button

```html
<button class="btn btn-primary">Primary Action</button>
<button class="btn btn-secondary">Secondary Action</button>
<button class="btn btn-tertiary">Tertiary Action</button>
<button class="btn btn-destructive">Delete</button>
```

```css
.btn {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
  font-weight: var(--font-weight-semibold);
  border: none;
  cursor: pointer;
  min-height: 44px;
  transition: all var(--duration-fast) var(--easing-standard);
}

.btn-primary {
  background: var(--color-primary-500);
  color: var(--color-text-on-primary);
}

.btn-primary:hover {
  background: var(--color-primary-600);
}

.btn-primary:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
```

### Input

```html
<div class="input-group">
  <label for="email">Email Address</label>
  <input type="email" id="email" class="input" placeholder="you@example.com">
</div>
```

```css
.input-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.input-group label {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.input {
  padding: var(--spacing-sm);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-md);
  transition: border-color var(--duration-fast) var(--easing-standard);
}

.input:focus {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
  border-color: var(--color-primary-500);
}
```

### Card

```html
<div class="card">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
  <button class="btn btn-tertiary">Learn More</button>
</div>
```

```css
.card {
  background: var(--color-surface-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--elevation-md);
  transition: box-shadow var(--duration-fast) var(--easing-standard);
}

.card:hover {
  box-shadow: var(--elevation-lg);
}
```

### Modal

```html
<div class="modal-overlay">
  <div class="modal" role="dialog" aria-modal="true">
    <div class="modal-header">
      <h2>Modal Title</h2>
      <button class="btn-icon" aria-label="Close">×</button>
    </div>
    <div class="modal-content">
      <p>Modal content</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary">Cancel</button>
      <button class="btn btn-primary">Confirm</button>
    </div>
  </div>
</div>
```

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: var(--color-surface-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-index-modal-backdrop);
}

.modal {
  background: var(--color-surface-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--elevation-2xl);
  max-width: 600px;
  width: 90%;
  z-index: var(--z-index-modal);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border-default);
}

.modal-content {
  padding: var(--spacing-lg);
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
  padding: var(--spacing-lg);
  border-top: 1px solid var(--color-border-default);
}
```

## 📐 Layout Patterns

### Container

```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}
```

### Grid

```css
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--spacing-lg);
}

.col-6 {
  grid-column: span 6;
}

.col-4 {
  grid-column: span 4;
}

@media (max-width: 768px) {
  .col-6, .col-4 {
    grid-column: span 12;
  }
}
```

### Flexbox

```css
.flex-row {
  display: flex;
  gap: var(--spacing-md);
}

.flex-column {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

## ♿ Accessibility Essentials

### Focus Indicators

```css
:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
```

### Touch Targets

```css
.interactive {
  min-height: 44px;
  min-width: 44px;
}
```

### Reduced Motion

```css
.animated {
  transition: transform var(--duration-fast) var(--easing-standard);
}

@media (prefers-reduced-motion: reduce) {
  .animated {
    transition: none;
  }
}
```

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile first approach */

/* Tablet and up */
@media (min-width: 768px) {
  /* Styles */
}

/* Desktop and up */
@media (min-width: 1024px) {
  /* Styles */
}

/* Wide screens */
@media (min-width: 1280px) {
  /* Styles */
}
```

### Mobile-First Example

```css
.component {
  /* Mobile styles (default) */
  display: block;
  padding: var(--spacing-sm);
}

@media (min-width: 768px) {
  .component {
    /* Tablet styles */
    display: flex;
    padding: var(--spacing-md);
  }
}

@media (min-width: 1024px) {
  .component {
    /* Desktop styles */
    padding: var(--spacing-lg);
  }
}
```

## 🎯 Common Utilities

### Text Utilities

```css
.text-primary { color: var(--color-text-primary); }
.text-secondary { color: var(--color-text-secondary); }
.text-error { color: var(--color-error-500); }
.text-success { color: var(--color-success-500); }

.text-sm { font-size: var(--font-size-sm); }
.text-md { font-size: var(--font-size-md); }
.text-lg { font-size: var(--font-size-lg); }

.font-semibold { font-weight: var(--font-weight-semibold); }
.font-bold { font-weight: var(--font-weight-bold); }
```

### Spacing Utilities

```css
.p-sm { padding: var(--spacing-sm); }
.p-md { padding: var(--spacing-md); }
.p-lg { padding: var(--spacing-lg); }

.m-sm { margin: var(--spacing-sm); }
.m-md { margin: var(--spacing-md); }
.m-lg { margin: var(--spacing-lg); }

.mt-md { margin-top: var(--spacing-md); }
.mb-lg { margin-bottom: var(--spacing-lg); }
```

## 📚 Quick Links

- **Full Documentation**: [README.md](../README.md)
- **Design Tokens**: [design-tokens/README.md](../design-tokens/README.md)
- **Component Library**: [design-system/README.md](../design-system/README.md)
- **Getting Started**: [docs/getting-started.md](../docs/getting-started.md)
- **Button Component**: [design-system/components/core/button.md](../design-system/components/core/button.md)
- **Accessibility**: [accessibility/README.md](../accessibility/README.md)

## 💡 Pro Tips

1. **Always use design tokens** - Never hardcode values
2. **Mobile-first** - Start with mobile styles, add desktop enhancements
3. **Semantic HTML** - Use `<button>` not `<div onclick>`
4. **Accessible focus** - Always show focus indicators
5. **Test keyboard nav** - Tab through your interface
6. **Use rem units** - Design tokens use rem for scalability

## 🆘 Need Help?

- Check [Getting Started Guide](../docs/getting-started.md)
- Review [Component Examples](../design-system/components/)
- Ask in Slack: #design-system-support
- Email: design-system@css-insurance.ch

---

**Print this page for quick reference while coding!**
