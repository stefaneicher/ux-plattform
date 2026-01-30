# UX Architecture

The UX Architecture layer defines the structural patterns for building CSS Insurance applications. It provides navigation patterns, layout templates, and app shell components.

## 🎯 Overview

Consistent application structure across all CSS Insurance products:
- **App Shell**: Global header, navigation, footer
- **Navigation Patterns**: When and how to navigate
- **Layout Templates**: Standard page layouts
- **Responsive Strategy**: Mobile, tablet, desktop support

## 📁 Structure

```
ux-architecture/
├── navigation/          # Navigation patterns
│   ├── top-nav.md      # Top navigation bar
│   ├── side-nav.md     # Side navigation
│   └── tabs.md         # Context tabs
├── layouts/             # Page layout templates
│   ├── dashboard.md    # Dashboard layout
│   ├── data-workspace.md # Data-heavy pages
│   ├── detail-sidebar.md # Detail with sidebar
│   └── wizard.md       # Multi-step flow
└── README.md (this file)
```

## 🏗️ App Shell

The app shell provides the consistent frame for all applications.

### Global Header

```html
<header class="app-header">
  <div class="app-header-content">
    <!-- Logo -->
    <div class="app-header-logo">
      <img src="logo.svg" alt="CSS Insurance" height="32">
    </div>
    
    <!-- Product Navigation -->
    <nav class="app-header-nav">
      <a href="/dashboard" class="app-header-link active">Dashboard</a>
      <a href="/policies" class="app-header-link">Policies</a>
      <a href="/claims" class="app-header-link">Claims</a>
      <a href="/documents" class="app-header-link">Documents</a>
    </nav>
    
    <!-- User Menu -->
    <div class="app-header-user">
      <button class="app-header-user-button" aria-label="User menu">
        <img src="avatar.jpg" alt="" class="avatar">
        <span>John Doe</span>
      </button>
    </div>
  </div>
</header>
```

```css
.app-header {
  background: var(--color-surface-primary);
  border-bottom: 1px solid var(--color-border-default);
  height: 64px;
  position: sticky;
  top: 0;
  z-index: var(--z-index-sticky);
}

.app-header-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  height: 100%;
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.app-header-logo {
  flex-shrink: 0;
}

.app-header-nav {
  display: flex;
  gap: var(--spacing-md);
  flex: 1;
}

.app-header-link {
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 var(--spacing-sm);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  border-bottom: 3px solid transparent;
  transition: all var(--duration-fast) var(--easing-standard);
}

.app-header-link:hover {
  color: var(--color-text-primary);
  border-bottom-color: var(--color-primary-200);
}

.app-header-link.active {
  color: var(--color-primary-500);
  border-bottom-color: var(--color-primary-500);
}

.app-header-user {
  margin-left: auto;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
}
```

## 📐 Layout Templates

### Dashboard Layout

For overview pages with multiple widgets.

```html
<div class="layout-dashboard">
  <!-- Page Header -->
  <div class="page-header">
    <h1>Dashboard</h1>
    <p class="page-description">Overview of your policies and claims</p>
  </div>
  
  <!-- Dashboard Grid -->
  <div class="dashboard-grid">
    <!-- Stat Cards -->
    <div class="stat-card">
      <h3>Active Policies</h3>
      <p class="stat-value">3</p>
    </div>
    
    <div class="stat-card">
      <h3>Open Claims</h3>
      <p class="stat-value">1</p>
    </div>
    
    <div class="stat-card">
      <h3>Documents</h3>
      <p class="stat-value">12</p>
    </div>
    
    <!-- Main Content Area -->
    <div class="dashboard-main">
      <div class="card">
        <h2>Recent Activity</h2>
        <!-- Activity list -->
      </div>
    </div>
    
    <!-- Sidebar -->
    <div class="dashboard-sidebar">
      <div class="card">
        <h3>Quick Actions</h3>
        <!-- Quick actions -->
      </div>
    </div>
  </div>
</div>
```

```css
.layout-dashboard {
  padding: var(--spacing-xl);
  max-width: 1920px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: var(--spacing-xl);
}

.page-description {
  color: var(--color-text-secondary);
  margin-top: var(--spacing-xs);
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--spacing-lg);
}

.stat-card {
  grid-column: span 4;
  background: var(--color-surface-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
}

.stat-value {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-500);
  margin-top: var(--spacing-sm);
}

.dashboard-main {
  grid-column: span 8;
}

.dashboard-sidebar {
  grid-column: span 4;
}

/* Responsive */
@media (max-width: 1024px) {
  .stat-card {
    grid-column: span 12;
  }
  
  .dashboard-main {
    grid-column: span 12;
  }
  
  .dashboard-sidebar {
    grid-column: span 12;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .stat-card {
    grid-column: span 6;
  }
}
```

### Data Workspace Layout

For data-heavy pages with tables and filters.

```html
<div class="layout-data-workspace">
  <!-- Toolbar -->
  <div class="workspace-toolbar">
    <h1>Policies</h1>
    <div class="toolbar-actions">
      <button class="btn btn-secondary">
        <svg><!-- Filter icon --></svg>
        Filters
      </button>
      <button class="btn btn-primary">
        <svg><!-- Add icon --></svg>
        New Policy
      </button>
    </div>
  </div>
  
  <!-- Filter Bar (optional) -->
  <div class="workspace-filters">
    <!-- Filters -->
  </div>
  
  <!-- Data Table -->
  <div class="workspace-content">
    <table class="data-table">
      <!-- Table content -->
    </table>
  </div>
</div>
```

### Detail + Sidebar Layout

For viewing detailed information with related content.

```html
<div class="layout-detail-sidebar">
  <!-- Main Content -->
  <div class="detail-main">
    <div class="detail-header">
      <button class="btn btn-tertiary">← Back</button>
      <h1>Policy Details</h1>
    </div>
    
    <div class="detail-content">
      <!-- Detailed information -->
    </div>
  </div>
  
  <!-- Sidebar -->
  <aside class="detail-sidebar">
    <div class="card">
      <h3>Status</h3>
      <!-- Status information -->
    </div>
    
    <div class="card">
      <h3>Related Documents</h3>
      <!-- Documents list -->
    </div>
  </aside>
</div>
```

```css
.layout-detail-sidebar {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: var(--spacing-xl);
  padding: var(--spacing-xl);
  max-width: 1920px;
  margin: 0 auto;
}

.detail-main {
  min-width: 0; /* Allow flex items to shrink */
}

.detail-sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

@media (max-width: 1024px) {
  .layout-detail-sidebar {
    grid-template-columns: 1fr;
  }
}
```

## 🧭 Navigation Rules

### Top Navigation
**Use for:**
- Global product navigation
- 3-7 main sections
- Always visible navigation

**Example:** Dashboard, Policies, Claims, Documents

### Side Navigation
**Use for:**
- Deep navigation hierarchies
- 8+ navigation items
- Contextual navigation within a section

**Example:** Settings with multiple subsections

### Context Tabs
**Use for:**
- Switching between views of the same data
- 2-5 related views
- Within a page context

**Example:** Policy Overview, Coverage, Documents, History

## 📱 Responsive Strategy

### Mobile (< 768px)
- Hamburger menu for navigation
- Single column layouts
- Stacked cards
- Full-width forms

### Tablet (768px - 1024px)
- Collapsible side navigation
- 2-column layouts
- Optimized touch targets

### Desktop (> 1024px)
- Full navigation visible
- Multi-column layouts
- Dense information display

## ✅ Best Practices

### Layout
- Use consistent max-width (1280px - 1920px)
- Maintain consistent spacing between sections
- Keep content readable (optimal line length: 60-80 characters)

### Navigation
- Show current location clearly
- Provide breadcrumbs for deep hierarchies
- Keep navigation consistent across pages

### Responsive
- Design mobile-first
- Test at breakpoints: 320px, 768px, 1024px, 1280px
- Ensure touch targets ≥ 44px on mobile

## 🔗 Related Documentation

- [Navigation Components](../design-system/components/)
- [Layout Examples](./layouts/)
- [Business Patterns](../business-patterns/)
