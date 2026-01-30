# Button Component

Buttons trigger actions and enable user interactions throughout the application.

## Overview

The button component is the primary way users trigger actions in the interface. It provides clear visual feedback and supports various styles to indicate different action priorities.

## Anatomy

A button consists of:
1. **Container**: The button background and border
2. **Label**: Text describing the action
3. **Icon** (optional): Visual indicator
4. **Loading Indicator** (optional): Shows processing state

## Variants

### Primary Button
Used for the main action on a page or in a dialog.

```html
<button class="btn btn-primary">
  Save Changes
</button>
```

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  
  font-family: var(--font-family-base);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-normal);
  
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
  border: none;
  
  cursor: pointer;
  user-select: none;
  
  transition: all var(--duration-fast) var(--easing-standard);
  
  /* Accessibility: Minimum touch target */
  min-height: 44px;
  min-width: 44px;
}

.btn-primary {
  background: var(--color-primary-500);
  color: var(--color-text-on-primary);
}

.btn-primary:hover:not(:disabled) {
  background: var(--color-primary-600);
  box-shadow: var(--elevation-sm);
}

.btn-primary:active:not(:disabled) {
  background: var(--color-primary-700);
  transform: translateY(1px);
}

.btn-primary:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

.btn-primary:disabled {
  background: var(--color-neutral-300);
  color: var(--color-text-disabled);
  cursor: not-allowed;
  opacity: 0.6;
}
```

### Secondary Button
Used for secondary actions.

```html
<button class="btn btn-secondary">
  Cancel
</button>
```

```css
.btn-secondary {
  background: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-default);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--color-surface-secondary);
  border-color: var(--color-border-strong);
}

.btn-secondary:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

.btn-secondary:disabled {
  color: var(--color-text-disabled);
  border-color: var(--color-border-subtle);
  cursor: not-allowed;
}
```

### Tertiary Button
Used for less prominent actions (text button).

```html
<button class="btn btn-tertiary">
  Learn More
</button>
```

```css
.btn-tertiary {
  background: transparent;
  color: var(--color-primary-500);
  border: none;
  padding: var(--spacing-xs) var(--spacing-sm);
}

.btn-tertiary:hover:not(:disabled) {
  background: var(--color-primary-50);
  color: var(--color-primary-600);
}

.btn-tertiary:disabled {
  color: var(--color-text-disabled);
  cursor: not-allowed;
}
```

### Destructive Button
Used for destructive actions (delete, remove).

```html
<button class="btn btn-destructive">
  Delete Account
</button>
```

```css
.btn-destructive {
  background: var(--color-error-500);
  color: var(--color-text-on-primary);
}

.btn-destructive:hover:not(:disabled) {
  background: var(--color-error-700);
  box-shadow: var(--elevation-sm);
}

.btn-destructive:focus-visible {
  outline: 2px solid var(--color-error-500);
  outline-offset: 2px;
}
```

## Sizes

### Small
For compact spaces.

```html
<button class="btn btn-primary btn-sm">
  Small Button
</button>
```

```css
.btn-sm {
  font-size: var(--font-size-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  min-height: 32px;
}
```

### Medium (Default)
Standard size for most use cases.

```css
/* Already defined in .btn base styles */
```

### Large
For prominent actions.

```html
<button class="btn btn-primary btn-lg">
  Large Button
</button>
```

```css
.btn-lg {
  font-size: var(--font-size-lg);
  padding: var(--spacing-md) var(--spacing-lg);
  min-height: 52px;
}
```

## Icon Buttons

### With Icon and Text

```html
<button class="btn btn-primary">
  <svg class="btn-icon" width="16" height="16" aria-hidden="true">
    <use href="#icon-save"></use>
  </svg>
  Save
</button>
```

```css
.btn-icon {
  width: 1em;
  height: 1em;
}
```

### Icon Only
For compact toolbars.

```html
<button class="btn btn-icon-only" aria-label="Close">
  <svg width="16" height="16" aria-hidden="true">
    <use href="#icon-close"></use>
  </svg>
</button>
```

```css
.btn-icon-only {
  padding: var(--spacing-sm);
  aspect-ratio: 1;
}
```

## States

### Default
Normal resting state.

### Hover
Slightly darker background, subtle elevation.

### Focus
Visible outline for keyboard navigation.

### Active
Pressed state with slight translation.

### Disabled
Reduced opacity, no interaction.

### Loading
Shows spinner, prevents interaction.

```html
<button class="btn btn-primary" disabled>
  <span class="btn-spinner" aria-hidden="true"></span>
  Loading...
</button>
```

```css
.btn-spinner {
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin var(--duration-slower) linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .btn-spinner {
    animation: none;
  }
}
```

## Accessibility

### Keyboard Support
- **Tab**: Move focus to/from button
- **Enter/Space**: Activate button
- **Escape**: (if in dialog) Close dialog

### Screen Reader Support
- Use descriptive text: "Save Changes" not "Submit"
- For icon-only buttons, provide `aria-label`
- Announce loading state: `aria-busy="true"`
- Disabled state is announced automatically

### Visual Requirements
- **Minimum size**: 44x44px touch target
- **Color contrast**: ≥ 4.5:1 for text
- **Focus indicator**: Clearly visible outline
- **No color-only meaning**: Use text/icons too

### Example with Full Accessibility

```html
<button 
  class="btn btn-primary"
  type="button"
  aria-label="Save your changes to the profile"
  aria-busy="false"
>
  <svg aria-hidden="true" focusable="false">
    <use href="#icon-save"></use>
  </svg>
  Save Changes
</button>
```

## Best Practices

### Do's ✅
- Use primary buttons for the main action
- Limit to one primary button per section
- Use descriptive action words ("Save", "Submit", "Download")
- Provide visual feedback on interaction
- Ensure sufficient color contrast
- Make buttons large enough to tap easily

### Don'ts ❌
- Don't use multiple primary buttons together
- Don't use vague labels like "OK" or "Click Here"
- Don't make buttons too small (< 44px)
- Don't rely on color alone to convey meaning
- Don't make button text too long (≤ 3 words ideal)

## Usage Guidelines

### When to Use Primary
- Submitting forms
- Confirming important actions
- Main call-to-action on page

### When to Use Secondary
- Cancel actions
- Alternative actions
- Multiple equal-priority actions

### When to Use Tertiary
- Navigation actions
- Less important actions
- Actions in dense interfaces

### When to Use Destructive
- Deleting data
- Removing items
- Irreversible actions

## Button Groups

Multiple related buttons.

```html
<div class="btn-group">
  <button class="btn btn-secondary">Day</button>
  <button class="btn btn-secondary btn-active">Week</button>
  <button class="btn btn-secondary">Month</button>
</div>
```

```css
.btn-group {
  display: inline-flex;
  gap: 2px;
  background: var(--color-surface-tertiary);
  padding: 2px;
  border-radius: var(--radius-sm);
}

.btn-group .btn {
  border-radius: calc(var(--radius-sm) - 2px);
}

.btn-group .btn-active {
  background: var(--color-surface-primary);
  box-shadow: var(--elevation-xs);
}
```

## Examples

### Form Actions
```html
<div class="form-actions">
  <button class="btn btn-primary" type="submit">
    Save Changes
  </button>
  <button class="btn btn-secondary" type="button">
    Cancel
  </button>
</div>
```

```css
.form-actions {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: flex-end;
  margin-top: var(--spacing-lg);
}
```

### Card Actions
```html
<div class="card-actions">
  <button class="btn btn-tertiary">
    Learn More
  </button>
  <button class="btn btn-primary">
    Get Started
  </button>
</div>
```

## Implementation Checklist

When implementing buttons, ensure:

- [ ] Correct variant used (primary, secondary, tertiary, destructive)
- [ ] Appropriate size for context
- [ ] Descriptive button text
- [ ] `aria-label` for icon-only buttons
- [ ] Disabled state handled properly
- [ ] Loading state implemented if needed
- [ ] Keyboard accessible
- [ ] Focus indicator visible
- [ ] Minimum 44x44px touch target
- [ ] Sufficient color contrast

## Related Components

- **Icon Button**: See icon-only variant above
- **Button Group**: For related button sets
- **Split Button**: Dropdown with primary action
- **Floating Action Button**: For primary mobile actions

## References

- [Design Tokens](../../design-tokens/README.md)
- [Accessibility Guidelines](../foundations/accessibility.md)
- [Color Usage](../foundations/colors.md)
