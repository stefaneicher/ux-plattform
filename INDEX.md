# Platform Index - Your Navigation Guide

Welcome to the CSS Insurance UX Platform! This index helps you find exactly what you need.

## 🎯 Start Here

### New to the Platform?
1. 📖 **[README.md](./README.md)** - Platform overview and purpose
2. 🚀 **[Getting Started Guide](./docs/getting-started.md)** - Step-by-step setup
3. 🎨 **[Live Demo](./docs/demo.html)** - Open in browser to see components
4. ⚡ **[CSS Quick Reference](./docs/css-quick-reference.md)** - Quick lookup guide

### Experienced Developer?
Jump directly to:
- 🎨 **[Design Tokens](./design-tokens/README.md)** - Colors, spacing, typography
- 🧩 **[Component Library](./design-system/README.md)** - All components
- 🏗️ **[UX Architecture](./ux-architecture/README.md)** - Layouts and navigation

## 📚 Complete Documentation

### Foundation

#### Design Tokens
The foundation of the design system - colors, spacing, typography, and more.

- **[Design Tokens Overview](./design-tokens/README.md)** - Complete token documentation
- **[tokens.css](./design-tokens/tokens.css)** - CSS custom properties (IMPORT THIS!)
- **[tokens.json](./design-tokens/tokens.json)** - Source of truth
- **[tokens.ts](./design-tokens/tokens.ts)** - TypeScript definitions

**Key Sections:**
- Color palette and usage
- Typography scale
- Spacing system (8px grid)
- Border radius values
- Shadow elevations
- Motion timing and easing

#### Design System
Complete component library with usage guidelines.

- **[Design System Overview](./design-system/README.md)** - Component library introduction
- **[Button Component](./design-system/components/core/button.md)** - Detailed button specs
- **[Core Components](./design-system/components/core/)** - Essential UI components
- **[Enterprise Components](./design-system/components/enterprise/)** - Advanced components
- **[Foundations](./design-system/foundations/)** - Design principles

**Core Components:**
- Button (primary, secondary, tertiary, destructive)
- Input (text fields, validation)
- Select (dropdowns)
- Modal (dialogs, overlays)
- Tabs (navigation)
- Table (data display)
- Toast (notifications)
- Tooltip (contextual help)

### UX Architecture
Structural patterns for building applications.

- **[UX Architecture Overview](./ux-architecture/README.md)** - Architecture guide
- **[Navigation Patterns](./ux-architecture/navigation/)** - Top nav, side nav, tabs
- **[Layout Templates](./ux-architecture/layouts/)** - Dashboard, workspace, detail views

**Key Patterns:**
- App shell (header, navigation, footer)
- Dashboard layout
- Data workspace layout
- Detail + sidebar layout
- Wizard flow layout

### Business Patterns
Insurance-specific UX patterns.

- **[Business Patterns Overview](./business-patterns/README.md)** - Insurance UX patterns

**Customer Patterns:**
- Contract overview
- Coverage comparison
- Document upload

**Case Handling:**
- Claim submission flow
- Case timeline view
- Status tracking

**Advisor Tools:**
- Customer 360 view
- Offer wizard pattern

### Accessibility
Guidelines and tools for building accessible applications.

- **[Accessibility Guide](./accessibility/README.md)** - Complete accessibility documentation

**Topics:**
- WCAG 2.1 AA requirements
- Keyboard navigation
- Screen reader support
- Color contrast
- Focus indicators
- Testing tools and automation

### Governance
Team structure and processes.

- **[Governance Model](./governance/GOVERNANCE.md)** - Roles, processes, and standards

**Topics:**
- Roles and responsibilities (RACI matrix)
- Component RFC process
- Design review process
- Breaking change approval
- Release process

### Pipeline
Design-to-code workflow.

- **[Pipeline Architecture](./pipeline/README.md)** - Design-to-code automation

**Topics:**
- Token export from Figma
- Build and release process
- Versioning strategy
- CI/CD automation
- Quality gates

### Telemetry
UX analytics and monitoring.

- **[Telemetry Guide](./telemetry/README.md)** - Analytics and metrics

**Topics:**
- Event tracking
- Performance monitoring
- User journey analytics
- Privacy compliance (GDPR)
- Dashboard and KPIs

### Reference Implementation
Angular examples and libraries.

- **[Reference Implementation](./reference-implementation/README.md)** - Angular examples

**Includes:**
- Example applications (customer portal, advisor portal)
- Shared libraries (tokens, components, patterns)
- Implementation patterns
- Best practices

## 🔍 Find What You Need

### "I want to..."

#### ...use colors in my CSS
→ [Design Tokens - Colors](./design-tokens/README.md#colors)
→ [CSS Quick Reference - Colors](./docs/css-quick-reference.md#colors)

#### ...style a button
→ [Button Component](./design-system/components/core/button.md)
→ [CSS Quick Reference - Buttons](./docs/css-quick-reference.md#button)

#### ...create a form
→ [Design System Components](./design-system/README.md)
→ [Getting Started - Forms](./docs/getting-started.md#building-a-form)

#### ...build a page layout
→ [UX Architecture - Layouts](./ux-architecture/README.md#layout-templates)
→ [Getting Started - Page Layout](./docs/getting-started.md#example-simple-page-layout)

#### ...implement an insurance pattern
→ [Business Patterns](./business-patterns/README.md)

#### ...ensure accessibility
→ [Accessibility Guide](./accessibility/README.md)
→ [Accessibility Checklist](./accessibility/README.md#testing-checklist)

#### ...see working examples
→ [Live Demo](./docs/demo.html)
→ [Reference Implementation](./reference-implementation/README.md)

#### ...understand the workflow
→ [Pipeline Architecture](./pipeline/README.md)
→ [Governance Model](./governance/GOVERNANCE.md)

#### ...track user behavior
→ [Telemetry Guide](./telemetry/README.md)

## 📖 Learning Paths

### Path 1: CSS Developer (Frontend)
Perfect if you're building UI with HTML/CSS:

1. Start: [Getting Started Guide](./docs/getting-started.md)
2. Learn: [CSS Quick Reference](./docs/css-quick-reference.md)
3. Practice: Open [Demo Page](./docs/demo.html) in browser
4. Build: [Design Tokens](./design-tokens/README.md) + [Components](./design-system/README.md)
5. Master: [Accessibility](./accessibility/README.md)

### Path 2: Angular Developer
Perfect if you're building Angular applications:

1. Start: [Reference Implementation](./reference-implementation/README.md)
2. Setup: Import design tokens package
3. Build: Use component library
4. Structure: Follow [UX Architecture](./ux-architecture/README.md)
5. Test: Implement accessibility tests

### Path 3: UX Designer
Perfect if you're designing interfaces:

1. Understand: [Design System](./design-system/README.md)
2. Learn: [Design Tokens](./design-tokens/README.md)
3. Apply: [Business Patterns](./business-patterns/README.md)
4. Consider: [Accessibility](./accessibility/README.md)
5. Sync: [Pipeline](./pipeline/README.md)

### Path 4: Product Owner / Manager
Perfect if you're managing projects:

1. Overview: [README.md](./README.md)
2. Governance: [Governance Model](./governance/GOVERNANCE.md)
3. Metrics: [Telemetry Guide](./telemetry/README.md)
4. Quality: [Accessibility](./accessibility/README.md)
5. Process: [Pipeline](./pipeline/README.md)

## 🎓 Key Concepts

### Design Tokens
Platform-agnostic design variables. Instead of hardcoding `#2990ff`, use `var(--color-primary-500)`.

**Why?** 
- Consistency across applications
- Easy theme changes
- Single source of truth

### Component-Driven Design
Build UIs from reusable components. A button is a button everywhere.

**Why?**
- Faster development
- Consistent user experience
- Easier maintenance

### Accessibility First
Every component meets WCAG 2.1 AA standards from the start.

**Why?**
- Legal compliance
- Better for everyone
- Reduced remediation costs

### Mobile-First Responsive
Design for mobile, enhance for desktop.

**Why?**
- Mobile-first users
- Progressive enhancement
- Better performance

## 📞 Getting Help

### Quick Help
- 💬 Slack: `#design-system-support`
- 📧 Email: design-system@css-insurance.ch

### Documentation Issues
Found something unclear? Help us improve!
- Open an issue
- Suggest improvements
- Contribute documentation

### Technical Support
- Design System Team
- Office Hours: Weekly (see Slack)
- Email: dev-support@css-insurance.ch

## 🔄 Stay Updated

### What's New
- Check release notes
- Subscribe to `#design-system-updates`
- Review changelog

### Contributing
- See [Governance](./governance/GOVERNANCE.md)
- Submit RFCs for new components
- Participate in design reviews

## ✨ Pro Tips

1. **Bookmark this page** - Your central navigation hub
2. **Start with demo.html** - See it working immediately
3. **Use CSS variables** - Always use design tokens
4. **Check accessibility** - Test with keyboard and screen reader
5. **Follow patterns** - Reuse existing solutions
6. **Ask questions** - The team is here to help!

---

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Status**: ✅ Complete and ready for use

**Happy building! 🎉**
