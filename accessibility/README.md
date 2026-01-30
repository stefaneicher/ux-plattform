# Accessibility

CSS Insurance is committed to building accessible applications that everyone can use. All components and patterns meet WCAG 2.1 AA standards.

## 🎯 Accessibility Standards

We follow **WCAG 2.1 Level AA** compliance for all applications:

- ✅ Perceivable: Information is available to all senses
- ✅ Operable: Interface works with keyboard and mouse
- ✅ Understandable: Content and interface are clear
- ✅ Robust: Works with assistive technologies

## 📋 Core Requirements

### 1. Keyboard Navigation

All interactive elements must be keyboard accessible:

```css
/* Ensure visible focus indicators */
:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* Never remove outlines without replacement */
button:focus {
  outline: 2px solid var(--color-primary-500);
}
```

**Required keyboard support:**
- `Tab`: Move between interactive elements
- `Shift + Tab`: Move backwards
- `Enter` or `Space`: Activate buttons/links
- `Escape`: Close dialogs/menus
- Arrow keys: Navigate within components (tabs, menus)

### 2. Color Contrast

Maintain sufficient color contrast ratios:

**Text:**
- Normal text: ≥ 4.5:1
- Large text (18pt+): ≥ 3:1

**UI Components:**
- Interactive elements: ≥ 3:1
- Borders and icons: ≥ 3:1

```css
/* ✅ Good - Sufficient contrast */
.text {
  color: var(--color-text-primary); /* #111827 on white = 16.7:1 */
}

.button-primary {
  background: var(--color-primary-500); /* Contrast verified */
  color: var(--color-text-on-primary);
}

/* ❌ Bad - Insufficient contrast */
.text-gray {
  color: #d1d5db; /* Too light on white background */
}
```

### 3. Text Alternatives

Provide text alternatives for non-text content:

```html
<!-- Images -->
<img src="policy.jpg" alt="Health insurance policy document">

<!-- Decorative images -->
<img src="decoration.svg" alt="" role="presentation">

<!-- Icon buttons -->
<button aria-label="Close dialog">
  <svg aria-hidden="true" focusable="false">
    <use href="#icon-close"></use>
  </svg>
</button>

<!-- Complex graphics -->
<img src="chart.png" alt="Bar chart showing policy growth">
<details>
  <summary>Chart data</summary>
  <!-- Tabular representation of chart data -->
</details>
```

### 4. Semantic HTML

Use proper HTML elements:

```html
<!-- ✅ Good -->
<button type="button">Click Me</button>
<a href="/page">Go to Page</a>
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>

<!-- ❌ Bad -->
<div onclick="handleClick()">Click Me</div>
<span onclick="navigate()">Go to Page</span>
<div class="navigation">
  <div><span>Home</span></div>
</div>
```

### 5. ARIA Attributes

Use ARIA when semantic HTML isn't sufficient:

```html
<!-- Roles -->
<div role="alert">Important notification</div>
<div role="tablist">
  <button role="tab" aria-selected="true">Tab 1</button>
  <button role="tab" aria-selected="false">Tab 2</button>
</div>

<!-- States -->
<button aria-expanded="false" aria-controls="menu">
  Menu
</button>

<!-- Labels -->
<input type="search" aria-label="Search policies">

<!-- Live regions -->
<div role="status" aria-live="polite">
  3 results found
</div>
```

### 6. Touch Targets

Ensure adequate touch target sizes:

```css
/* Minimum 44x44 pixels for touch targets */
.btn {
  min-height: 44px;
  min-width: 44px;
  padding: var(--spacing-sm) var(--spacing-md);
}

/* Add spacing between adjacent targets */
.button-group {
  display: flex;
  gap: var(--spacing-sm); /* At least 8px */
}
```

### 7. Motion Reduction

Respect user's motion preferences:

```css
/* Animations */
.animated {
  transition: transform var(--duration-fast) var(--easing-standard);
}

/* Disable for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  .animated {
    transition: none;
    animation: none;
  }
}
```

## 🧪 Testing Checklist

### Manual Testing

- [ ] **Keyboard only**: Can you complete all tasks using only keyboard?
- [ ] **Screen reader**: Does content make sense with screen reader?
- [ ] **Zoom**: Does page work at 200% zoom?
- [ ] **Color blindness**: Is information conveyed without relying on color?
- [ ] **Focus indicators**: Are focus indicators always visible?

### Automated Testing

Use these tools for automated checks:

```bash
# Install accessibility testing tools
npm install --save-dev @axe-core/playwright
npm install --save-dev pa11y
```

#### Axe-core Integration

```javascript
import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from '@axe-core/playwright';

test('should not have accessibility violations', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await injectAxe(page);
  await checkA11y(page);
});
```

#### Pa11y Testing

```bash
# Test a single page
pa11y http://localhost:3000

# Test with specific standard
pa11y --standard WCAG2AA http://localhost:3000
```

## 📝 Component Accessibility Requirements

### Buttons

```html
<button 
  type="button"
  aria-label="Descriptive label for icon-only buttons"
  aria-busy="true|false"
  disabled
>
  Button Text
</button>
```

**Requirements:**
- Focusable with keyboard
- Visible focus indicator
- Clear disabled state
- Minimum 44x44px

### Forms

```html
<form>
  <div class="form-field">
    <label for="email">
      Email Address
      <span aria-label="required">*</span>
    </label>
    <input 
      type="email" 
      id="email"
      name="email"
      required
      aria-required="true"
      aria-invalid="false"
      aria-describedby="email-error"
    >
    <span id="email-error" class="error" role="alert">
      Please enter a valid email
    </span>
  </div>
</form>
```

**Requirements:**
- Labels associated with inputs
- Required fields indicated
- Error messages announced
- Logical tab order

### Modals

```html
<div 
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  <h2 id="dialog-title">Confirm Action</h2>
  <p id="dialog-description">Are you sure you want to proceed?</p>
  
  <div class="dialog-actions">
    <button type="button">Cancel</button>
    <button type="button">Confirm</button>
  </div>
</div>
```

**Requirements:**
- Focus trapped within modal
- Focus returns to trigger on close
- Escapable with Esc key
- Backdrop prevents background interaction

### Data Tables

```html
<table>
  <caption>Insurance Policies</caption>
  <thead>
    <tr>
      <th scope="col">Policy Number</th>
      <th scope="col">Type</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>POL-123456</td>
      <td>Health</td>
      <td>Active</td>
    </tr>
  </tbody>
</table>
```

**Requirements:**
- Use `<caption>` for table title
- Use `<th>` with `scope` attribute
- Provide summary for complex tables
- Make sortable/filterable keyboard accessible

## 🚫 Common Mistakes to Avoid

### 1. Div/Span as Buttons
```html
<!-- ❌ Bad -->
<div class="button" onclick="submit()">Submit</div>

<!-- ✅ Good -->
<button type="button" onclick="submit()">Submit</button>
```

### 2. Missing Alt Text
```html
<!-- ❌ Bad -->
<img src="important-info.jpg">

<!-- ✅ Good -->
<img src="important-info.jpg" alt="Coverage comparison chart">
```

### 3. Color-Only Information
```css
/* ❌ Bad - Color only */
.error { color: red; }

/* ✅ Good - Color + icon + text */
.error {
  color: var(--color-error-500);
}
.error::before {
  content: '⚠️ ';
}
```

### 4. Removing Focus Outlines
```css
/* ❌ Bad */
*:focus {
  outline: none;
}

/* ✅ Good */
:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
```

### 5. Auto-playing Content
```html
<!-- ❌ Bad -->
<video src="video.mp4" autoplay></video>

<!-- ✅ Good -->
<video src="video.mp4" controls>
  <track kind="captions" src="captions.vtt">
</video>
```

## 🛠️ Accessibility Automation

### Linting Rules

Add ESLint accessibility plugin:

```bash
npm install --save-dev eslint-plugin-jsx-a11y
```

```json
{
  "extends": ["plugin:jsx-a11y/recommended"],
  "plugins": ["jsx-a11y"]
}
```

### CI Checks

Add accessibility checks to CI pipeline:

```yaml
# .github/workflows/accessibility.yml
name: Accessibility Tests

on: [push, pull_request]

jobs:
  a11y:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: npm ci
      - name: Run accessibility tests
        run: npm run test:a11y
```

## 📚 Resources

### Standards
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

### Testing Tools
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [NVDA Screen Reader](https://www.nvaccess.org/) (Windows)
- [VoiceOver](https://www.apple.com/accessibility/voiceover/) (Mac/iOS)

### Learning
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

## 🎯 Success Criteria

An accessible component/page:

- ✅ Passes automated tests (axe, WAVE)
- ✅ Keyboard navigable
- ✅ Screen reader friendly
- ✅ Meets color contrast requirements
- ✅ Has proper ARIA labels
- ✅ Respects user preferences (motion, contrast)
- ✅ Works at 200% zoom
- ✅ Touch targets ≥ 44px

## 🤝 Getting Help

Questions about accessibility?
- Email: accessibility@css-insurance.ch
- Slack: #accessibility
- Documentation: [Internal Wiki](https://wiki.css-insurance.ch/accessibility)

---

**Remember**: Accessibility is not optional. It's a requirement for all CSS Insurance applications.
