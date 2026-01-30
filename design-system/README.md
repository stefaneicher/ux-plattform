# Design System

The CSS Insurance Design System is a comprehensive library of reusable components, patterns, and guidelines for building consistent enterprise applications.

## 🎯 Overview

This design system provides:
- **Foundations**: Core design principles (color, typography, spacing)
- **Core Components**: Essential UI components (buttons, inputs, modals)
- **Enterprise Components**: Advanced business components (data tables, wizards)
- **Documentation**: Usage guidelines and best practices
- **Accessibility**: WCAG AA compliance built-in

## 📁 Structure

```
design-system/
├── foundations/           # Design foundations
│   ├── colors.md         # Color usage guidelines
│   ├── typography.md     # Typography rules
│   ├── spacing.md        # Spacing and layout
│   └── accessibility.md  # Accessibility defaults
├── components/
│   ├── core/             # Core components
│   │   ├── button.md
│   │   ├── input.md
│   │   ├── select.md
│   │   ├── modal.md
│   │   ├── tabs.md
│   │   ├── table.md
│   │   ├── toast.md
│   │   └── tooltip.md
│   └── enterprise/       # Enterprise components
│       ├── data-table-advanced.md
│       ├── filter-bar.md
│       ├── stepper-wizard.md
│       ├── timeline.md
│       └── document-viewer.md
└── README.md (this file)
```

## 🚀 Quick Start for CSS Developers

### 1. Import Design Tokens

```html
<link rel="stylesheet" href="../design-tokens/tokens.css">
```

### 2. Use Base Styles

The design tokens provide base typography and color styles automatically.

### 3. Build Components

Reference component specifications in the `components/` directory to build consistent UI elements.

### Example: Primary Button

```html
<button class="btn btn-primary">
  Click Me
</button>
```

```css
.btn {
  /* Base button styles */
  font-family: var(--font-family-base);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-normal);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
  border: none;
  cursor: pointer;
  transition: all var(--duration-fast) var(--easing-standard);
  
  /* Ensure accessibility */
  min-height: 44px; /* Touch target size */
  min-width: 44px;
}

.btn-primary {
  background: var(--color-primary-500);
  color: var(--color-text-on-primary);
}

.btn-primary:hover {
  background: var(--color-primary-600);
  box-shadow: var(--elevation-sm);
}

.btn-primary:focus {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

.btn-primary:disabled {
  background: var(--color-neutral-300);
  color: var(--color-text-disabled);
  cursor: not-allowed;
}
```

## 🎨 Core Principles

### 1. Consistency
All components use the same design tokens, ensuring visual consistency across the platform.

### 2. Accessibility First
Every component meets WCAG 2.1 AA standards:
- Keyboard navigation
- Screen reader support
- Sufficient color contrast
- Focus indicators

### 3. Responsive
Components adapt to all screen sizes:
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)

### 4. Scalable
Built to support 10+ applications with minimal customization.

## 📦 Component Categories

### Core Components

Essential UI building blocks used in every application:

- **Button** - Actions and navigation
- **Input** - Text input fields
- **Select** - Dropdown selections
- **Modal** - Dialog overlays
- **Tabs** - Content organization
- **Table** - Data display
- **Toast** - Notifications
- **Tooltip** - Contextual help

### Enterprise Components

Advanced components for complex business scenarios:

- **Data Table Advanced** - Sorting, filtering, pagination
- **Filter Bar** - Complex search and filtering
- **Stepper Wizard** - Multi-step processes
- **Timeline** - Event visualization
- **Document Viewer** - Document preview and interaction

## 📚 Using Components

Each component has its own documentation page with:

1. **Overview** - What the component does
2. **Anatomy** - Component structure
3. **Variants** - Different styles and sizes
4. **States** - Interactive states (hover, focus, disabled)
5. **Accessibility** - Keyboard and screen reader support
6. **Code Example** - HTML and CSS implementation
7. **Best Practices** - When and how to use

### Example: Using the Button Component

See [components/core/button.md](./components/core/button.md) for:
- Primary, secondary, and tertiary variants
- Sizes (small, medium, large)
- Icon buttons
- Loading states
- Accessibility requirements

## 🎯 Design Principles

### Visual Hierarchy
Use size, weight, and color to establish importance:
- Primary actions use `--color-primary-500`
- Secondary actions use neutral colors
- Destructive actions use `--color-error-500`

### Spacing
Follow the 8px grid system:
- Component internal padding: `--spacing-sm` to `--spacing-md`
- Between elements: `--spacing-md`
- Section spacing: `--spacing-lg` to `--spacing-xl`

### Typography
- Headings: Use heading font family with tight line height
- Body: Use base font family with normal line height
- Labels: Use semibold weight for emphasis

### Color
- Use semantic colors for meaning (success, warning, error)
- Maintain color contrast ratios (AA standard)
- Use neutral colors for backgrounds and borders

## 🔧 Customization

### Theme Customization
Override CSS custom properties for brand customization:

```css
:root {
  /* Override primary brand color */
  --color-primary-500: #your-brand-color;
  --color-primary-600: #your-brand-color-dark;
}
```

### Component Customization
Extend base components with additional classes:

```css
.btn-special {
  /* Extends .btn with custom styles */
  background-image: linear-gradient(to right, var(--color-primary-500), var(--color-secondary-500));
}
```

## ♿ Accessibility

All components include:

### Keyboard Navigation
- Tab order follows logical flow
- Arrow keys for complex components
- Enter/Space for activation
- Escape to close overlays

### Screen Reader Support
- Proper ARIA labels
- Role attributes
- State announcements
- Focus management

### Visual Accessibility
- Color contrast ≥ 4.5:1 for text
- Color contrast ≥ 3:1 for UI components
- Focus indicators visible
- No content only in color

### Motion
- Respects `prefers-reduced-motion`
- Optional animations
- No auto-playing content

## 📐 Grid System

### Layout Grid
12-column responsive grid:

```css
.container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--spacing-md);
  padding: 0 var(--spacing-md);
  max-width: 1280px;
  margin: 0 auto;
}

.col-6 {
  grid-column: span 6;
}

@media (max-width: 768px) {
  .col-6 {
    grid-column: span 12; /* Full width on mobile */
  }
}
```

### Breakpoints
Responsive design breakpoints from design tokens:

```css
/* Mobile-first approach */
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1280px) { /* Wide */ }
```

## 🧪 Component Status

| Component | Status | Documentation |
|-----------|--------|---------------|
| Button | ✅ Spec Ready | [View](components/core/button.md) |
| Input | ✅ Spec Ready | [View](components/core/input.md) |
| Select | ✅ Spec Ready | [View](components/core/select.md) |
| Modal | ✅ Spec Ready | [View](components/core/modal.md) |
| Tabs | ✅ Spec Ready | [View](components/core/tabs.md) |
| Table | ✅ Spec Ready | [View](components/core/table.md) |
| Toast | ✅ Spec Ready | [View](components/core/toast.md) |
| Tooltip | ✅ Spec Ready | [View](components/core/tooltip.md) |

## 📖 Further Reading

- [Foundations Documentation](./foundations/)
- [Component Library](./components/)
- [Design Tokens](../design-tokens/README.md)
- [UX Architecture](../ux-architecture/README.md)

## 🤝 Contributing

See [Governance Model](../governance/GOVERNANCE.md) for:
- Component RFC process
- Design review requirements
- Breaking change approval

## 📞 Support

Questions? Contact the Design System Team:
- Email: design-system@css-insurance.ch
- Slack: #design-system
