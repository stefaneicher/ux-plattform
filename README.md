# CSS Insurance Enterprise UX Platform

Welcome to the CSS Insurance Enterprise UX Platform - a comprehensive design system and UX architecture for building modern, accessible enterprise applications.

## 🎯 Purpose

This platform provides everything needed to build consistent, accessible, and scalable applications for CSS Insurance:

- **Design Tokens**: Platform-agnostic design variables
- **Design System**: Comprehensive component library
- **UX Architecture**: Navigation and layout patterns
- **Business Patterns**: Insurance-specific UX patterns
- **Accessibility**: Built-in WCAG AA compliance
- **Integration**: Design-to-code pipeline

## 🚀 Quick Start for Developers

### For CSS Developers

If you're working with CSS, start here:

1. **Review Design Tokens**: Check `/design-tokens/` for colors, typography, spacing
2. **Import CSS Variables**: Use `design-tokens/tokens.css` in your project
3. **Component Styles**: Reference `/design-system/components/` for component styling
4. **Layouts**: Use `/ux-architecture/layouts/` for page templates

### For Angular Developers

1. Import design tokens: `@css-insurance/design-tokens`
2. Use component library: `@css-insurance/ui-core`
3. Follow architecture guidelines in `/ux-architecture/`

## 📁 Repository Structure

```
ux-platform/
├── design-tokens/          # Platform-agnostic design variables
│   ├── tokens.json         # Source of truth for design tokens
│   ├── tokens.css          # CSS custom properties
│   └── tokens.ts           # TypeScript definitions
├── design-system/          # Complete design system
│   ├── foundations/        # Core design principles
│   └── components/         # Component specifications
├── ux-architecture/        # App structure and layouts
│   ├── navigation/         # Navigation patterns
│   └── layouts/            # Page layout templates
├── business-patterns/      # Insurance-specific UX patterns
├── accessibility/          # Accessibility guidelines and automation
├── pipeline/               # Design-to-code workflow
├── telemetry/              # UX analytics and monitoring
├── governance/             # Team structure and processes
└── reference-implementation/ # Angular example apps

```

## 📖 Documentation

- [Design Tokens Guide](./design-tokens/README.md)
- [Design System Overview](./design-system/README.md)
- [UX Architecture](./ux-architecture/README.md)
- [Business Patterns](./business-patterns/README.md)
- [Accessibility Guide](./accessibility/README.md)
- [Getting Started](./docs/getting-started.md)

## 🎨 Using the Design System

### Import CSS Tokens

```html
<link rel="stylesheet" href="design-tokens/tokens.css">
```

### Use CSS Variables in Your Styles

```css
.my-component {
  color: var(--color-text-primary);
  background: var(--color-surface-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  font-family: var(--font-family-base);
  font-size: var(--font-size-md);
}
```

### Button Example

```css
.button-primary {
  background: var(--color-primary-500);
  color: var(--color-text-on-primary);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
  font-weight: var(--font-weight-semibold);
  transition: background var(--duration-fast) var(--easing-standard);
}

.button-primary:hover {
  background: var(--color-primary-600);
}
```

## 🏗️ Building New Applications

When starting a new application:

1. **Bootstrap from templates**: Use reference implementations
2. **Import design tokens**: Always use CSS variables
3. **Follow layouts**: Use predefined layout templates
4. **Reuse components**: 80% of UI from existing components
5. **Test accessibility**: Use provided automation tools

## 🎯 Target Applications

This platform is designed for:

- **Customer Portal**: Self-service applications
- **Advisor Portal**: Internal tools for advisors
- **Back Office**: Administrative applications
- **Mobile Apps**: Responsive mobile experiences

## ♿ Accessibility

All components and patterns meet WCAG 2.1 AA standards:

- Keyboard navigation support
- Screen reader compatible
- Sufficient color contrast
- Motion reduction support

## 📊 Success Metrics

Platform effectiveness:

- ✅ New app bootstrap < 1 week
- ✅ 80% UI from reusable components
- ✅ Automatic accessibility compliance
- ✅ Minimal design-code drift

## 🤝 Contributing

See [GOVERNANCE.md](./governance/GOVERNANCE.md) for:

- Roles and responsibilities
- Component RFC process
- Design review process
- Breaking change approval

## 📞 Support

- **Design System Team**: design-system@css-insurance.ch
- **UX Architecture**: ux-architecture@css-insurance.ch
- **Documentation**: [Internal Wiki](https://wiki.css-insurance.ch/ux-platform)

## 📄 License

Internal use only - CSS Insurance AG

---

**Version**: 1.0.0 (2026)
**Last Updated**: January 2026
