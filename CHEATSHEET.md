# CSS Developer Cheatsheet 📋

**Print this page and keep it at your desk!**

## Essential CSS Variables

### Colors - Most Used

```css
/* Text */
--color-text-primary         /* Main text #111827 */
--color-text-secondary       /* Muted text #4b5563 */
--color-text-link            /* Links #0070f0 */

/* Backgrounds */
--color-surface-primary      /* White #ffffff */
--color-surface-secondary    /* Light gray #f9fafb */

/* Brand */
--color-primary-500          /* CSS Blue #2990ff */
--color-primary-600          /* Darker blue (hover) */

/* States */
--color-success-500          /* Green #10b981 */
--color-warning-500          /* Orange #f59e0b */
--color-error-500            /* Red #ef4444 */

/* Borders */
--color-border-default       /* Gray #e5e7eb */
```

### Spacing - 8px Grid

```css
--spacing-xs     /* 4px */
--spacing-sm     /* 8px */
--spacing-md     /* 16px ← BASE */
--spacing-lg     /* 24px */
--spacing-xl     /* 32px */
--spacing-2xl    /* 48px */
```

### Typography

```css
--font-family-base           /* Inter */
--font-size-md               /* 16px ← BASE */
--font-weight-semibold       /* 600 */
--line-height-normal         /* 1.5 */
```

### Other Common

```css
--radius-sm                  /* 4px */
--radius-md                  /* 8px */
--elevation-md               /* Card shadow */
--duration-fast              /* 150ms */
--easing-standard            /* Smooth transition */
```

## Component Blueprints

### Button

```css
.btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
  font-weight: var(--font-weight-semibold);
  min-height: 44px;
  cursor: pointer;
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

```css
.input {
  padding: var(--spacing-sm);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-md);
}

.input:focus {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
```

### Card

```css
.card {
  background: var(--color-surface-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--elevation-md);
}
```

## Layouts

### Container

```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}
```

### Grid (12 columns)

```css
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--spacing-lg);
}

.col-6 { grid-column: span 6; }
```

### Flex

```css
.flex-row {
  display: flex;
  gap: var(--spacing-md);
}
```

## Accessibility Rules

```css
/* ✅ Always show focus */
:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* ✅ Minimum touch target */
.interactive {
  min-height: 44px;
  min-width: 44px;
}

/* ✅ Respect motion preference */
@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; }
}
```

## Responsive Breakpoints

```css
/* Mobile first! */

@media (min-width: 768px) {
  /* Tablet */
}

@media (min-width: 1024px) {
  /* Desktop */
}
```

## Common Patterns

### Centered Content

```css
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Truncate Text

```css
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

### Badge

```css
.badge {
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.badge-success {
  background: var(--color-success-50);
  color: var(--color-success-700);
}
```

## Quick Checklist

Before committing code:

- [ ] Using CSS variables (no hardcoded values)
- [ ] Focus indicators visible
- [ ] Touch targets ≥ 44px
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Semantic HTML (`<button>` not `<div>`)
- [ ] ARIA labels where needed

## File to Import

```html
<link rel="stylesheet" href="design-tokens/tokens.css">
```

## Quick Links

- Demo: `docs/demo.html`
- Full Ref: `docs/css-quick-reference.md`
- Tokens: `design-tokens/README.md`
- Components: `design-system/README.md`

---

**CSS Insurance UX Platform v1.0.0**  
Keep this handy while coding! 🚀
