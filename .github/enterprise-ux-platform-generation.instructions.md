# Enterprise UX Platform Generation Instructions
# Target: State-of-the-Art Enterprise UX / Design / Dev Platform (2026)

## 🎯 Goal

Generate a full enterprise-grade UX platform for the css Insurance including:

- Design Token System
- Enterprise Design System
- App UX Architecture (Navigation + Layout)
- Business UX Pattern Library
- Accessibility Automation
- Design → Code Pipeline
- Telemetry / UX Analytics Integration

Target Organization Type:
- Regulated Enterprise
- Multi-product
- Web + Mobile + Internal Tools
- Long lifecycle applications

---

## 🧱 1. Design Token Platform

Generate:

### Token Categories
- Colors (semantic + brand)
- Typography scale
- Spacing scale
- Radius
- Elevation
- Motion durations + easing
- Z-Index layers

### Requirements
- Platform agnostic
- JSON token export
- CSS variable mapping
- Angular / Web mapping
- Versionable

Output:
- tokens.json
- tokens.css
- tokens.ts

---

## 🎨 2. Enterprise Design System

Generate:

### Foundations
- Color usage rules
- Typography rules
- Layout grid
- Responsive breakpoints
- Accessibility defaults

### Components
Core:
- Button
- Input
- Select
- Modal
- Tabs
- Table
- Toast
- Tooltip

Enterprise:
- Data Table Advanced
- Filter Bar
- Stepper Wizard
- Timeline
- Document Viewer

Output:
- Figma component spec (conceptual)
- Storybook structure
- Angular component structure

---

## 🧭 3. App UX Architecture Layer

Generate:

### App Shell
- Global Header
- Product Navigation
- Context Navigation
- Workspace Layout
- Footer / Status Bar

### Navigation Rules
Define:
- When to use Top Navigation
- When to use Side Navigation
- When to use Context Tabs
- Deep Linking Rules

### Layout Templates
- Dashboard Layout
- Data Workspace Layout
- Wizard Flow Layout
- Detail + Sidebar Layout

Output:
- Layout Architecture Spec
- Angular Layout Shell Example

---

## 🏥 4. Business UX Pattern Library (Insurance Example)

Generate patterns for:

### Customer
- Contract Overview
- Coverage Comparison
- Document Upload

### Case Handling
- Claim Submission Flow
- Case Timeline View
- Status Tracking Pattern

### Advisor Tools
- Customer 360 View
- Offer Wizard Pattern

Output:
- UX Pattern Specs
- Wireframe Level Descriptions
- Component Composition Rules

---

## ♿ 5. Accessibility Automation

Generate:

### Standards
- WCAG AA default
- Keyboard navigation required
- Screen reader labeling rules
- Motion reduction support

### Automation
- Linting rules
- Component accessibility test templates
- CI accessibility checks

Output:
- Accessibility checklist
- Automation strategy
- Example test specs

---

## ⚙️ 6. Design → Code Pipeline

Generate:

### Sync Model
- Token → CSS → Angular mapping
- Design version → Component version mapping
- Breaking change strategy

### Toolchain Concept
- Design tool → Token Export → Repo → Build → Storybook → Release

Output:
- Pipeline architecture diagram (text description)
- Repo folder structure
- Versioning strategy

---

## 📊 7. UX Telemetry Integration

Generate:

### Metrics
- Task completion rate
- Error frequency
- Drop-off points
- Feature usage

### Integration
- Event tracking model
- Privacy compliant tracking strategy
- Dashboard concept

Output:
- Event taxonomy example
- Tracking architecture
- KPI list

---

## 🏗 8. Governance Model

Generate:

### Roles
- Design Authority
- UX Architecture Owner
- Component Maintainers
- Accessibility Owner

### Processes
- Component RFC process
- Design Review process
- Breaking Change Approval

Output:
- Governance RACI
- Change workflow

---

## 💻 9. Angular Reference Implementation (Optional but Preferred)

Generate:

### Structure
apps/
customer-portal/
advisor-portal/

libs/
design-tokens/
ui-core/
ui-business/
app-shell/
ux-patterns/

### Include
- Layout Shell Example
- Token usage example
- Sample Business Pattern UI

---

## 📦 Output Format

Prefer:
- Markdown documentation
- Architecture diagrams (text form)
- Example code snippets
- Folder structures
- JSON token examples

Avoid:
- Marketing text
- Generic theory
- Non-actionable content

---

## 🧠 Quality Rules

Must be:
- Enterprise realistic
- Scalable to 10+ apps
- Accessibility first
- Dev integratable
- Versionable
- Automatable

---

## 🚀 Success Criteria

Platform is usable when:
- New app can be bootstrapped < 1 week
- 80% UI from reusable components
- Accessibility mostly automatic
- Design ↔ Code drift minimal
