# Business UX Patterns

Insurance-specific UX patterns for common business scenarios at CSS Insurance.

## 🎯 Overview

This library provides proven UX patterns for insurance business processes:
- **Customer Patterns**: Self-service interactions
- **Case Handling**: Claim and case management
- **Advisor Tools**: Internal advisor interfaces
- **Document Management**: Document viewing and upload

## 📁 Pattern Categories

### Customer Patterns

#### Contract Overview
Display customer's insurance policies at a glance.

```html
<div class="contract-overview">
  <div class="contract-card">
    <div class="contract-header">
      <h3>Health Insurance</h3>
      <span class="badge badge-success">Active</span>
    </div>
    
    <div class="contract-details">
      <dl class="detail-list">
        <dt>Policy Number</dt>
        <dd>POL-123456</dd>
        
        <dt>Coverage</dt>
        <dd>Basic + Hospital</dd>
        
        <dt>Premium</dt>
        <dd>CHF 385.50 / month</dd>
        
        <dt>Valid Until</dt>
        <dd>31.12.2026</dd>
      </dl>
    </div>
    
    <div class="contract-actions">
      <button class="btn btn-tertiary">View Details</button>
      <button class="btn btn-tertiary">Documents</button>
    </div>
  </div>
</div>
```

```css
.contract-card {
  background: var(--color-surface-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
}

.contract-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

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

.detail-list {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: var(--spacing-sm) var(--spacing-md);
  margin: var(--spacing-md) 0;
}

.detail-list dt {
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
}

.detail-list dd {
  color: var(--color-text-primary);
}

.contract-actions {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-border-subtle);
}
```

#### Coverage Comparison
Help customers compare insurance coverage options.

```html
<div class="coverage-comparison">
  <table class="comparison-table">
    <thead>
      <tr>
        <th>Coverage</th>
        <th>Basic</th>
        <th>Standard</th>
        <th>Premium</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Hospital Stay</td>
        <td><span class="check">✓</span></td>
        <td><span class="check">✓</span></td>
        <td><span class="check">✓</span></td>
      </tr>
      <tr>
        <td>Private Room</td>
        <td><span class="cross">✗</span></td>
        <td><span class="check">✓</span></td>
        <td><span class="check">✓</span></td>
      </tr>
      <tr>
        <td>Dental</td>
        <td><span class="cross">✗</span></td>
        <td><span class="cross">✗</span></td>
        <td><span class="check">✓</span></td>
      </tr>
      <tr>
        <td>Price/Month</td>
        <td><strong>CHF 285</strong></td>
        <td><strong>CHF 385</strong></td>
        <td><strong>CHF 485</strong></td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td></td>
        <td><button class="btn btn-secondary btn-sm">Select</button></td>
        <td><button class="btn btn-primary btn-sm">Select</button></td>
        <td><button class="btn btn-secondary btn-sm">Select</button></td>
      </tr>
    </tfoot>
  </table>
</div>
```

#### Document Upload
Allow customers to upload documents securely.

```html
<div class="document-upload">
  <div class="upload-area" role="button" tabindex="0">
    <svg class="upload-icon" aria-hidden="true">
      <!-- Upload icon -->
    </svg>
    <p class="upload-text">
      <strong>Click to upload</strong> or drag and drop
    </p>
    <p class="upload-hint">
      PDF, JPG or PNG (max. 10MB)
    </p>
    <input type="file" id="file-upload" class="upload-input" hidden>
  </div>
  
  <div class="upload-list">
    <div class="upload-item">
      <svg class="file-icon"><!-- File icon --></svg>
      <div class="upload-item-info">
        <p class="upload-item-name">medical-report.pdf</p>
        <p class="upload-item-size">2.4 MB</p>
      </div>
      <button class="btn-icon" aria-label="Remove file">
        <svg><!-- Remove icon --></svg>
      </button>
    </div>
  </div>
</div>
```

### Case Handling Patterns

#### Claim Submission Flow
Multi-step wizard for submitting insurance claims.

**Steps:**
1. Incident Information
2. Document Upload
3. Bank Details
4. Review & Submit

```html
<div class="claim-wizard">
  <!-- Progress Indicator -->
  <div class="wizard-progress">
    <div class="wizard-step active completed">
      <div class="wizard-step-number">1</div>
      <div class="wizard-step-label">Incident</div>
    </div>
    <div class="wizard-step active">
      <div class="wizard-step-number">2</div>
      <div class="wizard-step-label">Documents</div>
    </div>
    <div class="wizard-step">
      <div class="wizard-step-number">3</div>
      <div class="wizard-step-label">Bank Details</div>
    </div>
    <div class="wizard-step">
      <div class="wizard-step-number">4</div>
      <div class="wizard-step-label">Review</div>
    </div>
  </div>
  
  <!-- Step Content -->
  <div class="wizard-content">
    <h2>Upload Documents</h2>
    <p>Please upload relevant documents for your claim.</p>
    <!-- Form content -->
  </div>
  
  <!-- Actions -->
  <div class="wizard-actions">
    <button class="btn btn-secondary">← Previous</button>
    <button class="btn btn-primary">Next →</button>
  </div>
</div>
```

#### Case Timeline View
Visual timeline of case activities and status changes.

```html
<div class="case-timeline">
  <div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
      <div class="timeline-header">
        <strong>Claim Submitted</strong>
        <time>15.01.2026, 14:30</time>
      </div>
      <p>Your claim has been received and is being processed.</p>
    </div>
  </div>
  
  <div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
      <div class="timeline-header">
        <strong>Documents Reviewed</strong>
        <time>16.01.2026, 09:15</time>
      </div>
      <p>All submitted documents have been verified.</p>
    </div>
  </div>
  
  <div class="timeline-item active">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
      <div class="timeline-header">
        <strong>Assessment in Progress</strong>
        <time>17.01.2026</time>
      </div>
      <p>Your claim is currently being assessed by our team.</p>
    </div>
  </div>
</div>
```

```css
.case-timeline {
  position: relative;
  padding-left: var(--spacing-xl);
}

.case-timeline::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--color-border-default);
}

.timeline-item {
  position: relative;
  padding-bottom: var(--spacing-lg);
}

.timeline-marker {
  position: absolute;
  left: -28px;
  top: 4px;
  width: 16px;
  height: 16px;
  border-radius: var(--radius-full);
  background: var(--color-surface-primary);
  border: 2px solid var(--color-border-default);
}

.timeline-item.active .timeline-marker {
  background: var(--color-primary-500);
  border-color: var(--color-primary-500);
}

.timeline-content {
  background: var(--color-surface-secondary);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-xs);
}

.timeline-header time {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}
```

### Advisor Tools

#### Customer 360 View
Comprehensive customer information for advisors.

```html
<div class="customer-360">
  <!-- Customer Header -->
  <div class="customer-header">
    <div class="customer-avatar-large">
      JD
    </div>
    <div class="customer-info">
      <h1>John Doe</h1>
      <p class="customer-id">Customer ID: CUST-123456</p>
      <div class="customer-tags">
        <span class="tag">Premium Customer</span>
        <span class="tag">5 Years</span>
      </div>
    </div>
    <div class="customer-actions">
      <button class="btn btn-primary">Contact</button>
    </div>
  </div>
  
  <!-- Tabs for different views -->
  <div class="tabs">
    <button class="tab active">Overview</button>
    <button class="tab">Policies</button>
    <button class="tab">Claims</button>
    <button class="tab">Documents</button>
    <button class="tab">Notes</button>
  </div>
  
  <!-- Content Grid -->
  <div class="customer-grid">
    <div class="card">
      <h3>Active Policies</h3>
      <!-- Policies list -->
    </div>
    
    <div class="card">
      <h3>Recent Activity</h3>
      <!-- Activity timeline -->
    </div>
    
    <div class="card">
      <h3>Contact Information</h3>
      <!-- Contact details -->
    </div>
  </div>
</div>
```

## 🎨 Visual Patterns

### Status Indicators

```css
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.status-active {
  background: var(--color-success-50);
  color: var(--color-success-700);
}

.status-pending {
  background: var(--color-warning-50);
  color: var(--color-warning-700);
}

.status-inactive {
  background: var(--color-neutral-100);
  color: var(--color-neutral-700);
}
```

### Action Panels

```css
.action-panel {
  background: var(--color-primary-50);
  border-left: 4px solid var(--color-primary-500);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  margin: var(--spacing-lg) 0;
}

.action-panel h4 {
  margin-bottom: var(--spacing-sm);
}

.action-panel-actions {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
}
```

## ✅ Best Practices

1. **Clear Status**: Always show current status prominently
2. **Next Actions**: Make next steps obvious to users
3. **Progress Indication**: Show where users are in multi-step processes
4. **Confirmation**: Confirm destructive or important actions
5. **Error Handling**: Provide clear, actionable error messages

## 🔗 Related Documentation

- [Design System Components](../design-system/README.md)
- [UX Architecture](../ux-architecture/README.md)
- [Accessibility Guidelines](../accessibility/README.md)
