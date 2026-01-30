# Getting Started with CSS Insurance UX Platform

Welcome! This guide will help you get started with the CSS Insurance UX Platform, whether you're a CSS developer, Angular developer, or designer.

## 🎯 What is the UX Platform?

The CSS Insurance UX Platform is a complete design system and architecture framework for building modern, accessible enterprise applications. It provides:

- **Design Tokens**: Reusable design variables (colors, spacing, typography)
- **Component Library**: Pre-built, accessible UI components
- **UX Architecture**: Navigation and layout patterns
- **Business Patterns**: Insurance-specific UX patterns
- **Tools & Automation**: Design-to-code pipeline, accessibility testing

## 🚀 Quick Start for CSS Developers

If you're working with CSS and HTML, follow these steps:

### Step 1: Import Design Tokens

Add this to your HTML `<head>`:

```html
<link rel="stylesheet" href="path/to/design-tokens/tokens.css">
```

Or import in your CSS:

```css
@import 'path/to/design-tokens/tokens.css';
```

### Step 2: Use CSS Variables

Now you can use design tokens in your styles:

```css
.my-component {
  /* Colors */
  color: var(--color-text-primary);
  background: var(--color-surface-primary);
  
  /* Spacing */
  padding: var(--spacing-md);
  margin: var(--spacing-lg) 0;
  
  /* Typography */
  font-family: var(--font-family-base);
  font-size: var(--font-size-md);
  
  /* Border & Radius */
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  
  /* Shadows */
  box-shadow: var(--elevation-md);
  
  /* Transitions */
  transition: all var(--duration-fast) var(--easing-standard);
}
```

### Step 3: Build Components

Use the component specifications to build consistent UI:

```html
<!-- Primary Button -->
<button class="btn btn-primary">
  Save Changes
</button>

<!-- Input Field -->
<div class="input-group">
  <label for="email">Email Address</label>
  <input 
    type="email" 
    id="email" 
    class="input"
    placeholder="you@example.com"
  >
</div>

<!-- Card -->
<div class="card">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</div>
```

### Step 4: Apply Component Styles

Reference the [Design System Components](../design-system/components/) for detailed styling:

```css
/* Button styles */
.btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
  font-weight: var(--font-weight-semibold);
  min-height: 44px; /* Accessibility */
}

.btn-primary {
  background: var(--color-primary-500);
  color: var(--color-text-on-primary);
}

/* Input styles */
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

/* Card styles */
.card {
  background: var(--color-surface-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--elevation-md);
}
```

## 📱 Example: Simple Page Layout

Here's a complete example:

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Insurance Portal</title>
  <link rel="stylesheet" href="design-tokens/tokens.css">
  <link rel="stylesheet" href="styles/main.css">
</head>
<body>
  <!-- Header -->
  <header class="header">
    <div class="container">
      <img src="logo.svg" alt="CSS Insurance" class="logo">
      <nav class="nav">
        <a href="#" class="nav-link">Dashboard</a>
        <a href="#" class="nav-link">Policies</a>
        <a href="#" class="nav-link">Claims</a>
      </nav>
    </div>
  </header>

  <!-- Main Content -->
  <main class="main">
    <div class="container">
      <!-- Page Header -->
      <div class="page-header">
        <h1>Welcome Back</h1>
        <p class="text-secondary">Manage your insurance policies</p>
      </div>

      <!-- Content Cards -->
      <div class="grid">
        <div class="card">
          <h3>Active Policies</h3>
          <p class="stat">3</p>
          <button class="btn btn-tertiary">View All</button>
        </div>

        <div class="card">
          <h3>Open Claims</h3>
          <p class="stat">1</p>
          <button class="btn btn-tertiary">View Details</button>
        </div>

        <div class="card">
          <h3>Documents</h3>
          <p class="stat">12</p>
          <button class="btn btn-tertiary">Browse</button>
        </div>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <p>&copy; 2026 CSS Insurance AG</p>
    </div>
  </footer>
</body>
</html>
```

```css
/* main.css */

/* Layout */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

/* Header */
.header {
  background: var(--color-surface-primary);
  border-bottom: 1px solid var(--color-border-default);
  padding: var(--spacing-md) 0;
}

.header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  height: 32px;
}

.nav {
  display: flex;
  gap: var(--spacing-lg);
}

.nav-link {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  transition: color var(--duration-fast) var(--easing-standard);
}

.nav-link:hover {
  color: var(--color-primary-500);
}

/* Main Content */
.main {
  padding: var(--spacing-2xl) 0;
  min-height: calc(100vh - 200px);
}

.page-header {
  margin-bottom: var(--spacing-2xl);
}

.text-secondary {
  color: var(--color-text-secondary);
  margin-top: var(--spacing-xs);
}

/* Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
}

/* Card */
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

.card h3 {
  margin-bottom: var(--spacing-sm);
}

.stat {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-500);
  margin: var(--spacing-md) 0;
}

/* Footer */
.footer {
  background: var(--color-surface-secondary);
  border-top: 1px solid var(--color-border-default);
  padding: var(--spacing-lg) 0;
  text-align: center;
  color: var(--color-text-secondary);
}

/* Responsive */
@media (max-width: 768px) {
  .header .container {
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .nav {
    flex-direction: column;
    gap: var(--spacing-sm);
    text-align: center;
  }
  
  .grid {
    grid-template-columns: 1fr;
  }
}
```

## 🧭 Navigation Guide

### For CSS Developers
1. **Design Tokens** → [design-tokens/README.md](../design-tokens/README.md)
   - All available CSS variables
   - Color palette, typography, spacing
   
2. **Component Specs** → [design-system/components/](../design-system/components/)
   - Button, Input, Modal, Table, etc.
   - HTML markup and CSS styles
   
3. **Layout Patterns** → [ux-architecture/layouts/](../ux-architecture/layouts/)
   - Page layouts, grid systems
   - Responsive patterns

### For Angular Developers
1. **Design Tokens** → Import TypeScript module
2. **Component Library** → [reference-implementation/](../reference-implementation/)
3. **Architecture Guide** → [ux-architecture/](../ux-architecture/)

### For Designers
1. **Design System** → [design-system/](../design-system/)
2. **Foundations** → Colors, typography, spacing rules
3. **Business Patterns** → [business-patterns/](../business-patterns/)

## 📚 Key Resources

### Essential Documentation
- [Design Tokens](../design-tokens/README.md) - CSS variables and values
- [Design System](../design-system/README.md) - Component library
- [Button Component](../design-system/components/core/button.md) - Detailed example
- [UX Architecture](../ux-architecture/README.md) - Navigation and layouts

### Examples
- [Component Examples](../design-system/components/) - All components
- [Business Patterns](../business-patterns/) - Insurance-specific UX
- [Reference Implementation](../reference-implementation/) - Angular examples

## ✅ Best Practices

### Always Use Design Tokens
```css
/* ❌ Bad - Hardcoded values */
color: #111827;
padding: 16px;
border-radius: 8px;

/* ✅ Good - Design tokens */
color: var(--color-text-primary);
padding: var(--spacing-md);
border-radius: var(--radius-md);
```

### Follow Accessibility Guidelines
- Minimum touch target: 44x44px
- Color contrast: ≥ 4.5:1 for text
- Keyboard navigation support
- Screen reader labels

### Use Semantic HTML
```html
<!-- ✅ Good -->
<button type="button">Click Me</button>

<!-- ❌ Bad -->
<div onclick="handleClick()">Click Me</div>
```

### Responsive Design
```css
/* Mobile-first approach */
.component {
  /* Mobile styles */
  display: block;
}

@media (min-width: 768px) {
  .component {
    /* Tablet and up */
    display: flex;
  }
}
```

## 🎯 Common Tasks

### Creating a New Page
1. Use standard layout template
2. Import design tokens CSS
3. Build with existing components
4. Test responsive behavior
5. Verify accessibility

### Styling a Button
1. Start with `.btn` base class
2. Add variant class (`.btn-primary`, `.btn-secondary`)
3. Optionally add size class (`.btn-sm`, `.btn-lg`)
4. Ensure 44x44px minimum size
5. Test keyboard focus

### Building a Form
1. Use semantic HTML (`<form>`, `<label>`, `<input>`)
2. Apply input styles from design system
3. Add proper labels and error states
4. Include clear submit button
5. Test keyboard navigation

## 🔍 Finding Information

### "Where do I find...?"

**Colors** → `design-tokens/tokens.css` (color variables)

**Spacing** → `design-tokens/tokens.css` (spacing variables)

**Button styles** → `design-system/components/core/button.md`

**Form elements** → `design-system/components/core/input.md`

**Layout templates** → `ux-architecture/layouts/`

**Insurance patterns** → `business-patterns/`

## 💡 Tips for Success

1. **Start with tokens**: Always use CSS variables from design tokens
2. **Reference components**: Check component docs before creating custom styles
3. **Think responsive**: Design mobile-first
4. **Test accessibility**: Use keyboard navigation and screen readers
5. **Stay consistent**: Reuse existing patterns and components

## 🆘 Getting Help

- **Documentation**: Check relevant README files
- **Examples**: Look at reference implementations
- **Team Support**: Contact design-system@css-insurance.ch

## 🚀 Next Steps

1. ✅ Import `design-tokens/tokens.css`
2. ✅ Build your first component using tokens
3. ✅ Review component specifications
4. ✅ Build a simple page layout
5. ✅ Test accessibility
6. ✅ Explore business patterns

## 📋 Checklist for New Projects

- [ ] Design tokens CSS imported
- [ ] Base typography set up
- [ ] Responsive breakpoints defined
- [ ] Core components styled
- [ ] Accessibility tested
- [ ] Cross-browser verified
- [ ] Documentation updated

---

**Ready to build?** Start with the [Design Tokens](../design-tokens/README.md) and [Component Library](../design-system/components/)!
