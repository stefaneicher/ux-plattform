# Enterprise UX Platform

[![CI](https://github.com/stefaneicher/ux-platform/actions/workflows/ci.yml/badge.svg)](https://github.com/stefaneicher/ux-platform/actions/workflows/ci.yml)
[![Deploy Storybook](https://github.com/stefaneicher/ux-platform/actions/workflows/deploy.yml/badge.svg)](https://github.com/stefaneicher/ux-platform/actions/workflows/deploy.yml)

State-of-the-art Enterprise UX / Design / Dev Platform for CSS Insurance (2026)

## 🎯 Overview

This platform provides a comprehensive enterprise-grade UX solution including:

- **Design Token System** - Platform-agnostic design tokens for colors, typography, spacing, etc.
- **Enterprise Design System** - Reusable UI components for web and mobile
- **App UX Architecture** - Navigation patterns and layout templates
- **Business UX Pattern Library** - Insurance-specific patterns (Claims, Contracts, Customer 360)
- **Accessibility Automation** - WCAG AA compliance by default
- **Design → Code Pipeline** - Automated sync from design to development
- **UX Telemetry Integration** - Analytics and monitoring

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Build the platform
npm run build

# Run tests
npm test

# Run linter
npm run lint
```

## 📦 Project Structure

```
apps/
  customer-portal/     # Customer-facing applications
  advisor-portal/      # Internal advisor tools

libs/
  design-tokens/       # Design token definitions
  ui-core/            # Core UI components
  ui-business/        # Business-specific components
  app-shell/          # Application shell and layouts
  ux-patterns/        # Reusable UX patterns
```

## 🏗️ Architecture

This platform is built for:
- Regulated Enterprise environments
- Multi-product portfolios
- Web + Mobile + Internal Tools
- Long lifecycle applications

## ♿ Accessibility

All components meet WCAG AA standards with:
- Keyboard navigation support
- Screen reader compatibility
- Motion reduction support
- Automated accessibility testing

## 📚 Documentation

- [Design Tokens](./docs/design-tokens.md)
- [Component Library](./docs/components.md)
- [UX Patterns](./docs/ux-patterns.md)
- [Accessibility Guidelines](./docs/accessibility.md)

## 🤝 Contributing

Please see our [Contributing Guide](./CONTRIBUTING.md) for details on our development process and how to submit changes.

## 📄 License

MIT
