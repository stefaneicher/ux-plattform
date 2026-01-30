# UX Telemetry & Analytics

Measure and improve user experience through data-driven insights while respecting privacy.

## 🎯 Overview

UX telemetry helps us:
- Understand how users interact with applications
- Identify pain points and friction
- Measure task completion and success rates
- Make data-driven design decisions
- Monitor performance and errors

## 📊 Metrics Categories

### 1. Task Completion Metrics

Measure how effectively users complete key tasks:

```javascript
// Track task start
analytics.trackEvent('task_start', {
  task_name: 'submit_claim',
  task_id: 'claim_123',
  user_type: 'customer'
});

// Track task completion
analytics.trackEvent('task_complete', {
  task_name: 'submit_claim',
  task_id: 'claim_123',
  duration_ms: 45000,
  success: true
});

// Track task abandonment
analytics.trackEvent('task_abandon', {
  task_name: 'submit_claim',
  task_id: 'claim_123',
  step: 'document_upload',
  duration_ms: 30000
});
```

**Key Metrics:**
- Task completion rate
- Time to complete
- Drop-off points
- Error rate during task

### 2. User Journey Metrics

Track user paths through the application:

```javascript
// Track page view
analytics.trackPageView({
  page_name: 'policy_details',
  page_category: 'policies',
  policy_type: 'health'
});

// Track navigation
analytics.trackEvent('navigation', {
  from: 'dashboard',
  to: 'policies',
  method: 'top_nav'
});
```

**Key Metrics:**
- Most visited pages
- Common user flows
- Entry and exit pages
- Navigation patterns

### 3. Feature Usage Metrics

Understand which features are used:

```javascript
// Track feature usage
analytics.trackEvent('feature_use', {
  feature_name: 'policy_comparison',
  context: 'customer_portal',
  interaction_type: 'view'
});

// Track component interactions
analytics.trackEvent('component_interact', {
  component: 'filter_bar',
  action: 'apply_filter',
  filter_type: 'status'
});
```

**Key Metrics:**
- Feature adoption rate
- Feature usage frequency
- Most/least used features
- Component interaction patterns

### 4. Error & Support Metrics

Track issues and support needs:

```javascript
// Track errors
analytics.trackError({
  error_type: 'validation',
  error_message: 'Invalid email format',
  field: 'email',
  page: 'registration'
});

// Track help interactions
analytics.trackEvent('help_access', {
  help_type: 'tooltip',
  topic: 'coverage_explanation',
  context: 'policy_comparison'
});
```

**Key Metrics:**
- Error frequency by type
- Most confusing areas
- Help content usage
- Support ticket correlation

### 5. Performance Metrics

Monitor application performance:

```javascript
// Track performance
analytics.trackPerformance({
  metric: 'page_load',
  page: 'dashboard',
  duration_ms: 1200,
  device_type: 'desktop'
});

// Track Core Web Vitals
analytics.trackWebVitals({
  lcp: 1800,  // Largest Contentful Paint
  fid: 50,    // First Input Delay
  cls: 0.05   // Cumulative Layout Shift
});
```

**Key Metrics:**
- Page load times
- Time to interactive
- Core Web Vitals
- API response times

## 🏗️ Event Taxonomy

### Standard Event Structure

```typescript
interface AnalyticsEvent {
  // Required fields
  event_name: string;
  timestamp: number;
  user_id?: string;  // Anonymized
  session_id: string;
  
  // Context
  application: string;
  page: string;
  device_type: 'mobile' | 'tablet' | 'desktop';
  
  // Custom properties
  properties?: Record<string, any>;
}
```

### Event Categories

#### User Actions
- `button_click`
- `link_click`
- `form_submit`
- `search_query`
- `filter_apply`
- `sort_apply`

#### Navigation
- `page_view`
- `navigation`
- `modal_open`
- `modal_close`
- `tab_change`

#### Task Flow
- `task_start`
- `task_complete`
- `task_abandon`
- `step_complete`

#### Errors
- `error_display`
- `validation_error`
- `api_error`
- `timeout_error`

### Event Examples

```javascript
// Button click
{
  event_name: 'button_click',
  button_text: 'Submit Claim',
  button_type: 'primary',
  context: 'claim_form'
}

// Search
{
  event_name: 'search_query',
  query_length: 15,
  results_count: 8,
  search_type: 'policies'
}

// Form submission
{
  event_name: 'form_submit',
  form_name: 'claim_submission',
  form_step: 3,
  time_spent_ms: 45000,
  success: true
}
```

## 🔒 Privacy Compliance

### GDPR Requirements

✅ **User Consent**
- Obtain explicit consent before tracking
- Provide opt-out mechanism
- Clear privacy policy

✅ **Data Minimization**
- Only collect necessary data
- No personal identifiable information (PII)
- Anonymize user identifiers

✅ **Data Retention**
- Define retention periods
- Automatic data deletion
- Right to be forgotten

### Implementation

```javascript
// Check consent before tracking
if (userConsent.hasAnalyticsConsent()) {
  analytics.trackEvent('page_view', {
    page: 'dashboard'
  });
}

// Anonymize user ID
const anonymousUserId = hashUserId(realUserId);

// Don't track sensitive data
// ❌ Bad
analytics.trackEvent('form_submit', {
  email: 'user@example.com',  // PII!
  ssn: '123-45-6789'          // Sensitive!
});

// ✅ Good
analytics.trackEvent('form_submit', {
  field_count: 5,
  form_type: 'contact'
});
```

## 📈 Dashboard & Reporting

### Key Performance Indicators (KPIs)

#### Customer Portal
- Task completion rate > 85%
- Average task time < 5 minutes
- Error rate < 5%
- Page load time < 2 seconds
- Customer satisfaction > 4/5

#### Advisor Portal
- Advisor productivity (tasks/hour)
- Time to resolve customer issue
- Tool usage efficiency
- Error reduction over time

### Dashboard Concept

```
┌─────────────────────────────────────────────┐
│ UX Performance Dashboard                    │
├─────────────────────────────────────────────┤
│                                             │
│  Task Completion Rate        [█████░░] 82% │
│  Avg. Task Duration               4m 32s    │
│  Error Rate                          3.2%   │
│  Page Load Time (p95)              1.8s     │
│                                             │
├─────────────────────────────────────────────┤
│ Top Pain Points:                            │
│  1. Document upload (42% drop-off)          │
│  2. Form validation errors (15% users)      │
│  3. Slow policy search (2.5s avg)           │
├─────────────────────────────────────────────┤
│ Most Used Features:                         │
│  1. Policy overview (89% users)             │
│  2. Document download (67% users)           │
│  3. Contact form (23% users)                │
└─────────────────────────────────────────────┘
```

## 🛠️ Implementation Guide

### Setup Analytics Provider

```typescript
// analytics.ts
import Analytics from '@segment/analytics-next';

export const analytics = new Analytics({
  writeKey: process.env.ANALYTICS_KEY,
  plugins: [
    // Privacy plugin
    privacyPlugin({
      anonymizeIp: true,
      respectDoNotTrack: true
    })
  ]
});

// Initialize
analytics.load();
```

### Track Events

```typescript
// Track page views automatically
router.afterEach((to, from) => {
  analytics.page({
    name: to.name,
    path: to.path,
    referrer: from.path
  });
});

// Track button clicks
function handleSubmit() {
  analytics.track('form_submit', {
    form_name: 'claim_submission',
    step: currentStep,
    duration: Date.now() - formStartTime
  });
  
  submitForm();
}

// Track errors
function handleError(error) {
  analytics.track('error', {
    error_type: error.type,
    page: currentPage,
    severity: 'high'
  });
  
  showErrorMessage(error);
}
```

### Custom Hooks (React Example)

```typescript
// useAnalytics.ts
export function useAnalytics() {
  const trackEvent = useCallback((event, properties) => {
    if (userConsent.hasAnalyticsConsent()) {
      analytics.track(event, properties);
    }
  }, []);
  
  const trackPageView = useCallback(() => {
    if (userConsent.hasAnalyticsConsent()) {
      analytics.page();
    }
  }, []);
  
  return { trackEvent, trackPageView };
}

// Component usage
function ClaimSubmitButton() {
  const { trackEvent } = useAnalytics();
  
  const handleClick = () => {
    trackEvent('button_click', {
      button: 'submit_claim',
      context: 'claim_form'
    });
    submitClaim();
  };
  
  return <button onClick={handleClick}>Submit Claim</button>;
}
```

## 📋 Tracking Checklist

### Page-Level Tracking
- [ ] Page view events
- [ ] Entry/exit tracking
- [ ] Time on page
- [ ] Scroll depth
- [ ] Device type

### Interaction Tracking
- [ ] Button clicks
- [ ] Link clicks
- [ ] Form interactions
- [ ] Search queries
- [ ] Filter/sort actions

### Task Tracking
- [ ] Task start
- [ ] Task completion
- [ ] Task abandonment
- [ ] Step progression
- [ ] Error encounters

### Performance Tracking
- [ ] Page load time
- [ ] API response time
- [ ] Core Web Vitals
- [ ] Error rates
- [ ] Resource loading

## 🎯 Analysis & Action

### Monthly Review Process

1. **Collect Data**: Aggregate monthly metrics
2. **Identify Patterns**: Find trends and anomalies
3. **Prioritize Issues**: Rank by impact and frequency
4. **Create Action Plan**: Define improvements
5. **Implement Changes**: Update design/code
6. **Measure Impact**: Track improvement

### Example Insights → Actions

| Insight | Action |
|---------|--------|
| 40% drop-off at document upload | Improve upload UX, add drag-and-drop |
| High error rate on mobile forms | Optimize form validation for mobile |
| Slow policy search (3s avg) | Add search indexing, optimize query |
| Low feature usage for comparison tool | Add onboarding tooltip, improve visibility |

## 🔗 Integration with Design System

### Component-Level Analytics

Add tracking to design system components:

```typescript
// Button component with analytics
export function Button({ 
  children, 
  onClick, 
  analyticsEvent 
}: ButtonProps) {
  const handleClick = (e) => {
    if (analyticsEvent) {
      analytics.track('button_click', analyticsEvent);
    }
    onClick?.(e);
  };
  
  return (
    <button onClick={handleClick}>
      {children}
    </button>
  );
}

// Usage
<Button 
  onClick={handleSubmit}
  analyticsEvent={{
    button_type: 'primary',
    action: 'submit_claim',
    context: 'claim_form'
  }}
>
  Submit Claim
</Button>
```

## 📚 Resources

### Tools
- **Segment**: Customer data platform
- **Google Analytics 4**: Web analytics
- **Mixpanel**: Product analytics
- **Hotjar**: Session recordings & heatmaps

### Documentation
- [Segment Spec](https://segment.com/docs/connections/spec/)
- [GA4 Events](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [Web Vitals](https://web.dev/vitals/)

## 🤝 Support

Questions about analytics?
- **Email**: analytics@css-insurance.ch
- **Slack**: #ux-analytics
- **Dashboard**: https://analytics.css-insurance.ch

---

**Remember**: Privacy-first analytics. Always respect user consent and data protection regulations.
