# UX Playbook: CSS Insurance Design System

## Inhaltsverzeichnis

1. [Einleitung](#einleitung)
2. [Design-Prinzipien](#design-prinzipien)
3. [Design Tokens](#design-tokens)
4. [Komponenten-Architektur](#komponenten-architektur)
5. [Navigations-Patterns](#navigations-patterns)
6. [Seiten-Blueprints](#seiten-blueprints)
7. [UX-Patterns](#ux-patterns)
8. [Accessibility](#accessibility)
9. [Responsive Design](#responsive-design)
10. [Governance](#governance)

---

## Einleitung

Dieses UX Playbook definiert die Standards für die firmenweite UI-Landschaft von CSS Insurance. Es basiert auf **Angular Material** und bietet ein konsistentes, zugängliches und wartbares Design System für alle Unternehmensanwendungen.

### Zielgruppe

- **UX Designer**: Für konsistente Designentscheidungen
- **Frontend-Entwickler**: Für technische Implementierung
- **Product Owner**: Für Planungsgrundlagen
- **QA**: Für Testkriterien

### Technologie-Stack

- **Framework**: Angular 15+
- **UI Library**: Angular Material
- **Design System**: CSS Insurance Design System Layer
- **Styling**: CSS Custom Properties + SCSS
- **Icons**: Material Icons
- **Fonts**: Roboto

---

## Design-Prinzipien

### 1. Konsistenz vor Innovation
Einheitliche Patterns über alle Anwendungen hinweg schaffen Vertrautheit und Effizienz.

### 2. Accessibility First
WCAG AA als Mindeststandard - nicht als nachträglicher Zusatz.

### 3. Mobile-fähig, Desktop-optimiert
Responsive Design mit Fokus auf Desktop-Produktivität, aber mobile Nutzbarkeit gewährleistet.

### 4. Progressive Disclosure
Komplexität schrittweise aufzeigen - nicht alles auf einmal.

### 5. Feedback & Transparenz
User immer über Systemzustand informieren (Loading, Success, Error).

---

## Design Tokens

Design Tokens sind die atomaren Design-Entscheidungen, ausgedrückt als CSS Custom Properties.

### Farben

#### Brand Colors
```css
--color-primary: #0066CC;
--color-primary-light: #3399FF;
--color-primary-dark: #004080;
--color-secondary: #004080;
--color-accent: #FF6B35;
```

#### Semantic Colors
```css
--color-success: #28A745;  /* Erfolgsaktionen */
--color-warning: #FFC107;  /* Warnungen */
--color-error: #DC3545;    /* Fehler */
--color-info: #17A2B8;     /* Informationen */
```

#### Neutral Colors
Grau-Skala von 50 (sehr hell) bis 900 (sehr dunkel):
```css
--color-gray-50: #F8F9FA;
--color-gray-100: #E9ECEF;
/* ... */
--color-gray-900: #000000;
```

### Typografie

#### Font Stack
```css
--font-family-primary: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

#### Font Sizes (8pt Grid)
```css
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */
--font-size-4xl: 2.25rem;   /* 36px */
```

### Spacing (8pt Grid System)

```css
--spacing-0: 0;
--spacing-1: 0.25rem;  /* 4px */
--spacing-2: 0.5rem;   /* 8px */
--spacing-3: 0.75rem;  /* 12px */
--spacing-4: 1rem;     /* 16px */
--spacing-5: 1.25rem;  /* 20px */
--spacing-6: 1.5rem;   /* 24px */
--spacing-8: 2rem;     /* 32px */
--spacing-10: 2.5rem;  /* 40px */
--spacing-12: 3rem;    /* 48px */
--spacing-16: 4rem;    /* 64px */
```

**Regel**: Immer Vielfache von 4px verwenden!

### Border Radius

```css
--radius-none: 0;
--radius-sm: 0.125rem;  /* 2px */
--radius-base: 0.25rem; /* 4px - Standard */
--radius-md: 0.375rem;  /* 6px */
--radius-lg: 0.5rem;    /* 8px */
--radius-xl: 0.75rem;   /* 12px */
--radius-2xl: 1rem;     /* 16px */
--radius-full: 9999px;  /* Kreis */
```

### Elevation (Schatten)

Material Design inspiriert, 5 Stufen:

```css
--elevation-0: none;
--elevation-1: 0 1px 3px rgba(0, 0, 0, 0.12);
--elevation-2: 0 3px 6px rgba(0, 0, 0, 0.16);  /* Standard für Cards */
--elevation-3: 0 10px 20px rgba(0, 0, 0, 0.19); /* Hover States */
--elevation-4: 0 14px 28px rgba(0, 0, 0, 0.25); /* Modals */
--elevation-5: 0 19px 38px rgba(0, 0, 0, 0.30); /* Dropdowns */
```

### Z-Index Scale

```css
--z-index-dropdown: 1000;
--z-index-sticky: 1020;
--z-index-fixed: 1030;
--z-index-modal-backdrop: 1040;
--z-index-modal: 1050;
--z-index-popover: 1060;
--z-index-tooltip: 1070;
```

**Regel**: Keine Magic Numbers - immer aus der Scale verwenden!

### Motion

```css
--duration-fast: 150ms;    /* Quick feedback */
--duration-base: 250ms;    /* Standard transitions */
--duration-slow: 350ms;    /* Complex animations */

--easing-standard: cubic-bezier(0.4, 0.0, 0.2, 1);
--easing-decelerate: cubic-bezier(0.0, 0.0, 0.2, 1);
--easing-accelerate: cubic-bezier(0.4, 0.0, 1, 1);
```

---

## Komponenten-Architektur

### 3-Layer-Architektur

#### Layer 1: Foundation (Angular Material)
Basis-Komponenten direkt von Material:
- Buttons, Icons, Badges
- Form Controls (Input, Select, Checkbox, Radio)
- Layout (Grid, Flexbox)
- Navigation (Toolbar, Sidenav, Tabs)
- Data (Table, Paginator, Sort)
- Overlays (Dialog, Snackbar, Bottom Sheet)

#### Layer 2: CSS Design System Components
Wrapper/standardisierte Versionen:
- `css-button` - Branded Material Button
- `css-form-field` - Standardized Input
- `css-table` - Enterprise Table
- `css-dialog` - Branded Dialog
- `css-card` - Standardized Card

**Regel**: Apps nutzen primär Layer 2, nicht direkt Material!

#### Layer 3: Business Components
Domänen-spezifisch:
- `customer-card` - Kunden-Kurzansicht
- `policy-header` - Versicherungs-Header
- `claim-timeline` - Schaden-Historie
- `document-viewer` - Dokumenten-Vorschau

---

## Navigations-Patterns

### App Shell Struktur

```
┌─────────────────────────────────────────┐
│ Top Bar (Sticky)                        │
│ Logo | Global Search | Notifications    │
└─────────────────────────────────────────┘
┌────────┬────────────────────────────────┐
│        │ Page Header                    │
│        │ Breadcrumb | Title | Actions   │
│ Side   ├────────────────────────────────┤
│ Nav    │                                │
│        │ Content Area                   │
│        │                                │
│        │                                │
└────────┴────────────────────────────────┘
```

### Top Bar (Primary Navigation)

**Desktop (≥1024px)**:
- Sticky position
- Logo links
- Global Search zentral (optional)
- Utilities rechts: Notifications, Help, Profile

**Mobile (<1024px)**:
- Hamburger Menu
- Logo
- Nur wichtigste Icons

### Side Navigation

**Navigation Levels**:
1. **Level 1** (Primär): Module/Bereiche
   - Dashboard
   - Kunden
   - Offerten/Anträge
   - Verträge/Policen
   - Schäden/Leistungen
   - Dokumente
   - Reporting
   - Administration

2. **Level 2** (Sekundär): Context-abhängig via Tabs oder Subroutes

**Desktop**:
- 260px breit
- Collapsible auf 64px (nur Icons)
- Icons + Labels

**Mobile**:
- Overlay Drawer
- Volle Breite

### Breadcrumbs

Immer bei hierarchischen Strukturen:
```
Home > Kunden > Müller AG > Verträge > Police 12345
```

### Tabs

Für Unterbereiche auf **Detail-Seiten**:
```
Kunde: Müller AG
[Übersicht] [Verträge] [Schäden] [Dokumente] [Historie]
```

**Regel**: Max. 5-7 Tabs, sonst Overflow-Menu

---

## Seiten-Blueprints

### 1. Dashboard / Cockpit

**Zweck**: Überblick, KPIs, Shortcuts

**Komponenten**:
- KPI Cards (Grid 3-4 Spalten)
- "Zuletzt geöffnet" Liste
- Benachrichtigungen/To-dos
- Quick Actions

**Layout**:
```
┌─────────┬─────────┬─────────┐
│ KPI 1   │ KPI 2   │ KPI 3   │
├─────────┴─────────┴─────────┤
│ Recent Items Table          │
├─────────────────────────────┤
│ To-dos & Notifications      │
└─────────────────────────────┘
```

### 2. Liste (Data Grid)

**Zweck**: Übersicht, Suche, Bulk Actions

**Komponenten**:
- Page Header mit Titel + "Neu" Button
- Filter Bar (Search, Status, Date Range)
- Data Table (Sort, Pagination)
- Row Actions (3-dot menu)

**Features**:
- Saved Views ("Meine Filter")
- Column Chooser
- Export (CSV, PDF)
- Bulk Selection

**Mobile**: Card-Liste statt Tabelle

### 3. Detail-Seite (Entity)

**Zweck**: Vollständige Information einer Entität

**Struktur**:
```
┌─────────────────────────────────────┐
│ Entity Header                       │
│ Name/ID | Status | Edit | Delete    │
├─────────────────────────┬───────────┤
│ [Tab 1] [Tab 2] [Tab 3] │           │
├─────────────────────────┤ Sidebar   │
│                         │ (Desktop) │
│ Tab Content             │           │
│                         │ Timeline  │
│                         │ Tasks     │
└─────────────────────────┴───────────┘
```

**Tabs**:
- Übersicht / Stammdaten
- Beziehungen / Verknüpfungen
- Dokumente
- Historie / Audit Trail

**Sidebar (nur Desktop)**: Kontextinfos, Tasks, Timeline

### 4. Create / Edit Form

**Zweck**: Daten erfassen/ändern

**Best Practices**:
- Sectioned Form (Cards oder Accordion)
- Inline Validation (sofort, bei Blur)
- Error Summary oben (bei Submit)
- Pflichtfelder klar markiert (*)
- Sticky Action Bar (Save, Cancel)

**States**:
- **View Mode**: Readonly, "Edit" Button prominent
- **Edit Mode**: Felder aktiv, "Save"/"Cancel"
- **Dirty State**: Warnung beim Verlassen

**Mobile**: Action Bar unten (Bottom Sheet Style)

### 5. Wizard / Stepper

**Zweck**: Komplexe mehrstufige Prozesse (Offerte, Antrag)

**Material Stepper**:
- Horizontal (Desktop, max 5 Steps)
- Vertical (Mobile oder > 5 Steps)

**Features**:
- Fortschritt speichern ("Resume später")
- Zurück-Navigation erlaubt
- "Review & Submit" als letzter Step

**Schritte**:
1. Basis-Informationen
2. Details
3. Dokumente
4. Review & Bestätigen

### 6. Suche / Document Library

**Zweck**: Finden von Dokumenten/Informationen

**Layout**:
```
┌────────────┬────────────────────────┐
│            │ Search Results         │
│ Facets /   ├────────────────────────┤
│ Filters    │ [Document Card]        │
│            │ [Document Card]        │
│            │ [Document Card]        │
│            │                        │
└────────────┴────────────────────────┘
```

**Desktop**: Facets links, Results rechts
**Mobile**: Filters als Bottom Sheet

**Features**:
- Global Search (schnell, Top Bar)
- Advanced Search (detailliert, Filter)
- Preview Panel (Desktop)
- Full-screen Preview (Mobile)

### 7. Admin / Settings

**Zweck**: System-Konfiguration, Rollen & Rechte

**Tabs**:
- Benutzer
- Rollen & Rechte
- System-Einstellungen
- Feature Flags
- Audit Logs

**Security**: Permissions-basierte Zugriffskontrolle

---

## UX-Patterns

### Formulare

#### Validierung
- **Inline**: Bei Blur, sofort
- **Error Summary**: Oben, bei Submit
- **Fehlermeldungen**: Konkret + Lösungsweg
  - ❌ "Ungültige Eingabe"
  - ✅ "Bitte AHV-Nummer im Format 756.XXXX.XXXX.XX eingeben"

#### Abhängige Felder
```typescript
// Beispiel: Feld aktivieren basierend auf Auswahl
if (age >= 18) {
  enable('drivingLicense');
} else {
  disable('drivingLicense');
}
```

#### Autosave vs. Explizites Speichern

**Autosave**:
- Bei einfachen Formularen
- Mit Undo-Funktion
- Visual Feedback ("Gespeichert")

**Explizit (Save Button)**:
- Bei kritischen Daten
- Mit Dirty-State Warning
- Confirmation bei Breaking Changes

### Tabellen / Listen

#### Filter & Search
- Search: Volltextsuche, prominent
- Filters: Status, Zeitraum, Kategorie
- Saved Filters: "Meine Ansichten"

#### Row Actions
- Primary Action: Direkt klickbar (ganze Row)
- Secondary: 3-Dot Menu
- Bulk Actions: Nur wenn sinnvoll (Checkbox Select)

#### Empty State
Immer mit Next Best Action:
```
┌─────────────────────────────────────┐
│         [Illustration]              │
│                                     │
│   Noch keine Kunden vorhanden       │
│                                     │
│   [+ Ersten Kunden anlegen]         │
└─────────────────────────────────────┘
```

### Feedback & Status

#### Success
```typescript
showSnackbar('Kunde erfolgreich gespeichert', 'success');
```
- Grün
- 3-5 Sekunden
- Auto-dismiss

#### Error
- Inline (bei Feld)
- Error Summary (bei Submit)
- Dialog (bei kritischen Fehlern)

#### Loading
**Präferenz**: Skeleton Loader > Spinner

```html
<!-- Skeleton -->
<div class="skeleton skeleton-text"></div>
<div class="skeleton skeleton-avatar"></div>

<!-- Nur wenn nötig: Spinner -->
<mat-spinner></mat-spinner>
```

#### Confirm (Destructive Actions)
```typescript
const dialogRef = dialog.open(ConfirmDialog, {
  data: {
    title: 'Kunde wirklich löschen?',
    message: 'Diese Aktion kann nicht rückgängig gemacht werden.',
    confirm: 'Löschen',
    cancel: 'Abbrechen'
  }
});
```

Bei sehr kritisch: "Type to confirm" (Name eingeben)

---

## Accessibility

### WCAG AA als Minimum

#### Kontrast
- Normal Text: min. 4.5:1
- Large Text (≥18pt): min. 3:1
- UI Components: min. 3:1

**Tool**: Contrast Checker in DevTools

#### Keyboard Navigation
- **Tab**: Nächstes Element
- **Shift+Tab**: Vorheriges Element
- **Enter/Space**: Aktivieren
- **Escape**: Modal schließen
- **Arrow Keys**: In Listen/Menüs

**Regel**: Alles muss per Keyboard erreichbar sein!

#### Focus States
```css
*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

Niemals `outline: none` ohne Alternative!

#### Screen Reader
- `aria-label` für Icon Buttons
- `aria-describedby` für Hilfe-Texte
- `aria-live` für dynamische Inhalte
- Semantic HTML (`<button>`, `<nav>`, `<main>`)

#### Forms
```html
<label for="email">E-Mail *</label>
<input 
  id="email" 
  type="email" 
  required
  aria-describedby="email-help"
  aria-invalid="false"
>
<span id="email-help">Format: name@example.com</span>
<span class="error" role="alert">Bitte gültige E-Mail eingeben</span>
```

### Motion Reduction

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Responsive Design

### Breakpoints

```scss
$breakpoint-mobile: 600px;
$breakpoint-tablet: 1024px;
$breakpoint-desktop: 1440px;
```

**Strategie**: Desktop-first (Fachanwendung), aber mobile nutzbar

### Anpassungen

#### Mobile (<600px)
- Side Nav: Overlay Drawer
- Tabelle → Card List
- Filter: Bottom Sheet
- Actions: Bottom App Bar

#### Tablet (600-1023px)
- Side Nav: Collapsible
- Tabelle: Weniger Spalten
- 2-Spalten Grid → 1 Spalte

#### Desktop (≥1024px)
- Full Feature Set
- Side Nav: Persistent
- Rechte Sidebar (optional)
- Multi-Spalten Grids

---

## Governance

### Design System Board
**Mitglieder**: UX Lead, Frontend Architect, Product Owner

**Aufgaben**:
- Pattern-Entscheidungen
- Breaking Changes genehmigen
- Roadmap pflegen

### Contribution Flow

1. **Request**: GitHub Issue mit Proposal
2. **Design**: Figma Mockup + Specs
3. **Review**: Design System Board
4. **Develop**: Implementation + Storybook
5. **Release**: Versionierung (SemVer)

### Versionierung

**Semantic Versioning**:
- **Major** (1.0.0): Breaking Changes
- **Minor** (0.1.0): Neue Features (backwards compatible)
- **Patch** (0.0.1): Bugfixes

### Deprecation Policy

1. **Ankündigung**: 2 Releases vorher
2. **Warning**: Console Warnings in deprecated Components
3. **Removal**: Frühestens nach 6 Monaten

### Figma + Storybook als Single Source of Truth

- **Figma**: Design Authority
- **Storybook**: Code Authority
- **Sync**: Beide müssen identisch sein!

### Golden Path Examples

Referenz-Implementierungen für:
- Liste + Filter
- Detail + Tabs
- Create/Edit Form
- Wizard

**Regel**: Bei Unsicherheit → Golden Path kopieren!

---

## Zusammenfassung

Dieses Playbook ist ein **Living Document** und wird kontinuierlich erweitert.

### Key Takeaways

1. ✅ **Design Tokens nutzen** (keine Magic Numbers!)
2. ✅ **CSS Wrapper-Komponenten** bevorzugen (nicht raw Material)
3. ✅ **8pt Grid** immer einhalten
4. ✅ **WCAG AA** von Anfang an
5. ✅ **Mobile-fähig**, Desktop-optimiert
6. ✅ **Skeleton > Spinner**
7. ✅ **Empty States** mit CTA
8. ✅ **Feedback** immer (Success, Error, Loading)
9. ✅ **Breadcrumbs** bei Hierarchie
10. ✅ **Golden Paths** als Basis verwenden

### Support

- **Storybook**: https://stefaneicher.github.io/ux-platform/
- **Figma**: [Link zu Figma Library]
- **Slack**: #design-system
- **Email**: ux-platform@css-insurance.ch

---

**Version**: 1.0.0  
**Letzte Aktualisierung**: 12. Februar 2026  
**Autor**: CSS Insurance UX Team
