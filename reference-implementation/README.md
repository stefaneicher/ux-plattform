# Reference Implementation

Angular-based reference implementations demonstrating how to use the CSS Insurance UX Platform.

## 🎯 Purpose

This directory contains example Angular applications and libraries that demonstrate:
- Proper use of design tokens
- Component implementation patterns
- App architecture patterns
- Business pattern implementations
- Accessibility best practices

## 📁 Structure

```
reference-implementation/
├── apps/                        # Example applications
│   ├── customer-portal/        # Customer self-service portal
│   ├── advisor-portal/         # Internal advisor tools
│   └── README.md
└── libs/                        # Shared libraries
    ├── design-tokens/          # Token integration
    ├── ui-core/                # Core component library
    ├── ui-business/            # Business components
    ├── app-shell/              # App shell components
    └── ux-patterns/            # Pattern implementations
```

## 🚀 Quick Start

### Prerequisites

```bash
# Install Node.js (v18+)
# Install Angular CLI
npm install -g @angular/cli
```

### Setup

```bash
# Install dependencies
npm install

# Start customer portal
npm run start:customer

# Start advisor portal
npm run start:advisor
```

## 📦 Libraries

### @css-insurance/design-tokens
Design token integration for Angular.

**Installation:**
```bash
npm install @css-insurance/design-tokens
```

**Usage:**
```typescript
import { tokens } from '@css-insurance/design-tokens';

export class MyComponent {
  primaryColor = tokens.color.brand.primary[500];
}
```

```scss
@import '@css-insurance/design-tokens/tokens.css';

.my-component {
  color: var(--color-text-primary);
}
```

### @css-insurance/ui-core
Core UI component library.

**Components:**
- Button
- Input
- Select
- Modal
- Tabs
- Table
- Toast
- Tooltip

**Usage:**
```typescript
import { ButtonModule } from '@css-insurance/ui-core';

@NgModule({
  imports: [ButtonModule]
})
export class AppModule {}
```

```html
<css-button variant="primary" (click)="handleClick()">
  Save Changes
</css-button>
```

### @css-insurance/ui-business
Insurance-specific business components.

**Components:**
- PolicyCard
- ClaimWizard
- CoverageComparison
- DocumentUpload
- CaseTimeline

### @css-insurance/app-shell
Application shell components.

**Components:**
- AppHeader
- AppNav
- AppSidebar
- AppFooter

### @css-insurance/ux-patterns
Reusable UX pattern implementations.

**Patterns:**
- Customer360View
- DataWorkspace
- DetailSidebar
- DashboardLayout

## 📚 Example Applications

### Customer Portal

Self-service portal for CSS Insurance customers.

**Features:**
- Policy overview
- Claim submission
- Document management
- Profile settings

**Structure:**
```
customer-portal/
├── src/
│   ├── app/
│   │   ├── features/
│   │   │   ├── dashboard/
│   │   │   ├── policies/
│   │   │   ├── claims/
│   │   │   └── documents/
│   │   ├── shared/
│   │   └── app.component.ts
│   ├── assets/
│   └── styles/
│       └── main.scss
└── README.md
```

### Advisor Portal

Internal tools for insurance advisors.

**Features:**
- Customer 360 view
- Policy management
- Offer creation
- Case handling

## 🎨 Styling Approach

### Using Design Tokens

```scss
// Import tokens
@import '@css-insurance/design-tokens/tokens.css';

// Use CSS variables
.my-component {
  // Colors
  color: var(--color-text-primary);
  background: var(--color-surface-primary);
  
  // Spacing
  padding: var(--spacing-md);
  margin: var(--spacing-lg) 0;
  
  // Typography
  font-family: var(--font-family-base);
  font-size: var(--font-size-md);
  
  // Border & Shadows
  border-radius: var(--radius-md);
  box-shadow: var(--elevation-md);
  
  // Transitions
  transition: all var(--duration-fast) var(--easing-standard);
}
```

### Component Styles

```typescript
// component.scss
@import '@css-insurance/design-tokens/tokens.css';

:host {
  display: block;
}

.policy-card {
  background: var(--color-surface-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  
  &:hover {
    box-shadow: var(--elevation-lg);
  }
}

.policy-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
}

.policy-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}
```

## 🏗️ Application Architecture

### Recommended Structure

```
app/
├── core/                    # Singleton services
│   ├── auth/
│   ├── api/
│   └── state/
├── shared/                  # Shared across features
│   ├── components/
│   ├── directives/
│   ├── pipes/
│   └── utils/
├── features/                # Feature modules
│   ├── dashboard/
│   │   ├── dashboard.module.ts
│   │   ├── dashboard.component.ts
│   │   └── dashboard.component.scss
│   ├── policies/
│   └── claims/
└── app.component.ts
```

### Lazy Loading

```typescript
// app-routing.module.ts
const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module')
      .then(m => m.DashboardModule)
  },
  {
    path: 'policies',
    loadChildren: () => import('./features/policies/policies.module')
      .then(m => m.PoliciesModule)
  }
];
```

## ♿ Accessibility

All example applications demonstrate:
- Keyboard navigation
- Screen reader support
- ARIA attributes
- Focus management
- Color contrast compliance

### Example

```typescript
@Component({
  template: `
    <button 
      [attr.aria-label]="ariaLabel"
      [attr.aria-busy]="loading"
      (click)="handleClick()"
    >
      <span *ngIf="loading" class="spinner" aria-hidden="true"></span>
      {{ label }}
    </button>
  `
})
export class AccessibleButtonComponent {
  @Input() label: string;
  @Input() ariaLabel: string;
  @Input() loading = false;
  
  handleClick() {
    // Implementation
  }
}
```

## 🧪 Testing

### Unit Tests

```typescript
describe('PolicyCardComponent', () => {
  it('should display policy information', () => {
    const fixture = TestBed.createComponent(PolicyCardComponent);
    fixture.componentInstance.policy = mockPolicy;
    fixture.detectChanges();
    
    const element = fixture.nativeElement;
    expect(element.querySelector('.policy-title').textContent)
      .toBe('Health Insurance');
  });
});
```

### Accessibility Tests

```typescript
import { axe } from 'jest-axe';

it('should not have accessibility violations', async () => {
  const fixture = TestBed.createComponent(PolicyCardComponent);
  fixture.detectChanges();
  
  const results = await axe(fixture.nativeElement);
  expect(results).toHaveNoViolations();
});
```

## 📖 Best Practices

### Component Development

1. **Use Design Tokens**: Always use CSS variables
2. **Semantic HTML**: Use proper HTML elements
3. **Accessibility**: Include ARIA attributes
4. **Responsive**: Design mobile-first
5. **Performance**: Lazy load features

### Code Style

```typescript
// ✅ Good
@Component({
  selector: 'css-policy-card',  // Prefixed
  templateUrl: './policy-card.component.html',
  styleUrls: ['./policy-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PolicyCardComponent {
  @Input() policy: Policy;
  @Output() select = new EventEmitter<Policy>();
}
```

## 🚀 Deployment

### Build for Production

```bash
# Build customer portal
npm run build:customer -- --configuration production

# Build advisor portal
npm run build:advisor -- --configuration production
```

### Environment Configuration

```typescript
// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.css-insurance.ch',
  analyticsKey: 'ANALYTICS_KEY'
};
```

## 📞 Support

Questions about reference implementations?
- **Email**: dev-support@css-insurance.ch
- **Slack**: #angular-support
- **Documentation**: [Angular Guide](https://wiki.css-insurance.ch/angular)

## 🔗 Related Documentation

- [Design Tokens](../design-tokens/README.md)
- [Design System](../design-system/README.md)
- [UX Architecture](../ux-architecture/README.md)
- [Getting Started](../docs/getting-started.md)

---

**Note**: These are reference implementations. Adapt patterns to your specific application needs while maintaining design system consistency.
