# Navigation Map & Informationsarchitektur

## Site Map - Insurance Enterprise Platform

```
📱 Insurance Platform
│
├── 🏠 Dashboard
│   ├── KPIs & Metriken
│   ├── Zuletzt geöffnet
│   ├── Benachrichtigungen
│   └── Quick Actions
│
├── 👥 Kunden
│   ├── Übersicht (Liste)
│   │   ├── Suche & Filter
│   │   ├── Saved Views
│   │   └── Export
│   │
│   └── Kunde (Detail)
│       ├── Tab: Übersicht
│       ├── Tab: Stammdaten
│       ├── Tab: Verträge
│       ├── Tab: Schäden
│       ├── Tab: Dokumente
│       └── Tab: Historie
│
├── 📄 Offerten / Anträge
│   ├── Übersicht (Liste)
│   │   ├── Filter: Status (Offen, In Bearbeitung, Abgeschlossen)
│   │   └── Suche
│   │
│   ├── Neue Offerte (Wizard)
│   │   ├── Schritt 1: Kunde & Produktauswahl
│   │   ├── Schritt 2: Risikoprüfung
│   │   ├── Schritt 3: Prämienberechnung
│   │   ├── Schritt 4: Dokumente
│   │   └── Schritt 5: Review & Abschluss
│   │
│   └── Offerte (Detail)
│       ├── Tab: Übersicht
│       ├── Tab: Positionen
│       ├── Tab: Dokumente
│       └── Tab: Historie
│
├── 📋 Verträge / Policen
│   ├── Übersicht (Liste)
│   │   ├── Filter: Status, Produkttyp
│   │   └── Ablaufdatum
│   │
│   └── Vertrag (Detail)
│       ├── Tab: Übersicht
│       ├── Tab: Versicherungsnehmer
│       ├── Tab: Deckungen
│       ├── Tab: Prämien & Zahlungen
│       ├── Tab: Schäden
│       ├── Tab: Dokumente
│       └── Tab: Historie
│
├── ⚠️ Schäden / Leistungen
│   ├── Übersicht (Liste)
│   │   ├── Filter: Status, Schadendatum
│   │   └── Priorität
│   │
│   ├── Neuer Schaden (Form)
│   │   ├── Schadenart
│   │   ├── Beschreibung
│   │   ├── Beteiligte
│   │   └── Dokumente
│   │
│   └── Schaden (Detail)
│       ├── Tab: Übersicht
│       ├── Tab: Schadendetails
│       ├── Tab: Regulierung
│       ├── Tab: Kommunikation
│       ├── Tab: Dokumente
│       └── Tab: Timeline
│
├── 📁 Dokumente
│   ├── Dokumenten-Bibliothek
│   │   ├── Ordner-Struktur (Tree)
│   │   ├── Suche & Filter
│   │   └── Facetten (Typ, Datum, Tags)
│   │
│   ├── Dokument-Upload
│   │   ├── Drag & Drop
│   │   ├── Bulk Upload
│   │   └── Metadaten
│   │
│   └── Dokument (Viewer)
│       ├── Preview
│       ├── Versionen
│       ├── Freigaben
│       └── Download / Share
│
├── 💬 Kommunikation
│   ├── E-Mails
│   ├── Notizen
│   ├── Anrufe
│   └── Aufgaben
│
├── 📊 Reporting
│   ├── Standard-Reports
│   │   ├── Umsatzreport
│   │   ├── Schadenquoten
│   │   └── Vertragsbestand
│   │
│   ├── Custom Reports
│   │   └── Report Builder
│   │
│   └── Dashboards
│       ├── Management Dashboard
│       └── Team Dashboard
│
└── ⚙️ Administration
    ├── Tab: Benutzer
    │   ├── Benutzer-Liste
    │   └── Neuer Benutzer
    │
    ├── Tab: Rollen & Rechte
    │   ├── Rollen-Übersicht
    │   └── Permissions Matrix
    │
    ├── Tab: Einstellungen
    │   ├── Systemkonfiguration
    │   └── Feature Flags
    │
    └── Tab: Audit Log
        └── Aktivitäts-Historie
```

---

## Navigation Patterns

### 1. Global Navigation (Top Bar)

```
┌─────────────────────────────────────────────────────┐
│ [≡] Insurance Platform  [🔍 Global Search...]  [🔔][?][👤] │
└─────────────────────────────────────────────────────┘
```

**Komponenten**:
- **Hamburger Menu** (Mobile): Öffnet Side Nav
- **Logo**: Zurück zum Dashboard
- **Global Search** (Strg+K): Schnellsuche über alle Entitäten
- **Notifications**: Benachrichtigungen & To-dos
- **Help**: Hilfe & Support
- **Profile**: Benutzerprofil & Logout

### 2. Side Navigation

#### Desktop View
```
┌──────────────────────┐
│ HAUPTMENÜ            │
│ 🏠 Dashboard         │ ← Active
│ 👥 Kunden            │
│ 📄 Offerten          │
│ 📋 Verträge          │
│ ⚠️ Schäden           │
│                      │
│ VERWALTUNG           │
│ 📁 Dokumente         │
│ 📊 Reporting         │
│ ⚙️ Administration    │
└──────────────────────┘
```

#### Mobile View (Drawer)
```
┌──────────────────────┐
│ [×] Menü schließen   │
│────────────────────  │
│ HAUPTMENÜ            │
│ 🏠 Dashboard         │
│ 👥 Kunden            │
│ 📄 Offerten          │
│ 📋 Verträge          │
│ ⚠️ Schäden           │
│                      │
│ VERWALTUNG           │
│ 📁 Dokumente         │
│ 📊 Reporting         │
│ ⚙️ Administration    │
│                      │
│ ─────────────────    │
│ 👤 Max Mustermann    │
│ 🚪 Abmelden          │
└──────────────────────┘
```

### 3. Breadcrumb Navigation

Hierarchische Navigation - immer wenn tiefer als Level 1:

```
Home > Kunden > Müller AG > Verträge > Police 123456
  ↑      ↑         ↑          ↑             ↑
Level 0  Level 1  Level 2    Level 3      Level 4
```

**Regel**: Alle Levels klickbar (außer aktuelle Seite)

### 4. Tab Navigation

Für Detail-Seiten mit verschiedenen Aspekten:

```
Kunde: Müller AG (#12345)
┌──────────┬──────────┬─────────┬──────────┬─────────┐
│ Übersicht│ Verträge │ Schäden │ Dokumente│ Historie│
└──────────┴──────────┴─────────┴──────────┴─────────┘
      ↑ Aktiv
```

**Best Practices**:
- Max. 5-7 Tabs sichtbar
- Bei mehr: Overflow Menu (»)
- Aktiver Tab visuell hervorgehoben
- Lazy Loading von Tab-Content

### 5. Command Palette (Advanced)

Keyboard-driven Navigation für Power User:

```
┌─────────────────────────────────────────┐
│ 🔍 Suche... (Strg+K)                    │
├─────────────────────────────────────────┤
│ > Kunde: Müller AG                      │
│ > Vertrag: Police 123456                │
│ > Schaden: SHD-2026-001                 │
│ > Dokument: Antrag_Müller.pdf           │
│                                         │
│ Quick Actions:                          │
│ → Neuer Kunde                           │
│ → Neue Offerte                          │
│ → Neuer Schaden                         │
└─────────────────────────────────────────┘
```

**Shortcuts**:
- `Strg+K`: Command Palette öffnen
- `Strg+G`: Gehe zu...
- `Strg+N`: Neu (Context-abhängig)

---

## User Flows

### Flow 1: Neue Offerte erstellen

```
Dashboard
  ↓ Click "Neue Offerte"
Offerten > Neue Offerte (Wizard)
  ↓ Schritt 1: Kunde auswählen/anlegen
  ↓ Schritt 2: Produkt & Risiko
  ↓ Schritt 3: Prämie berechnen
  ↓ Schritt 4: Dokumente hochladen
  ↓ Schritt 5: Review & Absenden
Offerten > Offerte Detail (neu erstellt)
  ↓ Success Message
Dashboard (mit Benachrichtigung)
```

### Flow 2: Schaden erfassen

```
Dashboard / Kunde Detail
  ↓ Click "Neuer Schaden"
Schäden > Neuer Schaden (Form)
  ↓ Kunde & Vertrag auswählen
  ↓ Schadenart & Beschreibung
  ↓ Beteiligte & Zeugen
  ↓ Fotos/Dokumente hochladen
  ↓ Speichern
Schäden > Schaden Detail (neu erstellt)
  ↓ Automatische Benachrichtigung
Dashboard (mit To-do)
```

### Flow 3: Kunde suchen und bearbeiten

```
Dashboard
  ↓ Global Search oder Side Nav "Kunden"
Kunden > Liste
  ↓ Suche "Müller"
  ↓ Filter: Status = Aktiv
  ↓ Click "Müller AG"
Kunden > Kunde Detail
  ↓ Tab "Stammdaten"
  ↓ Click "Bearbeiten"
Kunden > Kunde bearbeiten (Edit Mode)
  ↓ Änderungen vornehmen
  ↓ Speichern
Kunden > Kunde Detail (aktualisiert)
  ↓ Success Message
```

---

## Navigation States

### Active State
Visuell hervorgehoben:
- **Side Nav**: Background-Color + Icon-Color
- **Tabs**: Border-bottom + Color
- **Breadcrumbs**: Nicht klickbar

### Hover State
Feedback beim Überfahren:
- **Side Nav**: Background-Color leicht dunkler
- **Buttons**: Elevation erhöhen
- **Links**: Underline

### Disabled State
Nicht verfügbar/zugänglich:
- **Opacity**: 0.4
- **Cursor**: not-allowed
- **Tooltip**: Grund für Deaktivierung

### Loading State
Während Daten geladen werden:
- **Skeleton**: Platzhalter-Animation
- **Spinner**: Nur bei längeren Operationen
- **Progress Bar**: Bei mehrstufigen Prozessen

---

## Mobile Navigation Patterns

### Bottom Navigation (optional)

Für häufigste Aktionen auf Mobile:

```
┌─────────────────────────────────────┐
│                                     │
│         Content Area                │
│                                     │
└─────────────────────────────────────┘
┌─────┬─────┬─────┬─────┬─────┐
│ 🏠  │ 👥  │  +  │ 🔔  │ 👤  │
│ Home│Kunden│Neu │Inbox│Profil│
└─────┴─────┴─────┴─────┴─────┘
```

### Swipe Gestures

- **Swipe Left/Right**: Zwischen Tabs wechseln
- **Swipe Down**: Seite aktualisieren (Pull to Refresh)
- **Swipe Up**: Mehr Details anzeigen

---

## Accessibility in Navigation

### Keyboard Navigation

1. **Tab**: Nächstes Element
2. **Shift+Tab**: Vorheriges Element
3. **Enter/Space**: Aktivieren
4. **Escape**: Schließen (Drawer, Modal)
5. **Arrow Keys**: In Side Nav/Menüs

### Screen Reader

```html
<nav aria-label="Hauptnavigation">
  <a href="/dashboard" aria-current="page">Dashboard</a>
  <a href="/customers">Kunden</a>
  <a href="/offers">Offerten</a>
</nav>

<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/customers">Kunden</a></li>
    <li aria-current="page">Müller AG</li>
  </ol>
</nav>
```

### Skip Links

```html
<a href="#main-content" class="sr-only sr-only-focusable">
  Zum Hauptinhalt springen
</a>
```

---

## Routing Strategie (Angular)

### URL-Struktur

```
Basis-URL: https://app.css-insurance.ch

/                           → Dashboard
/customers                  → Kunden-Liste
/customers/:id              → Kunde Detail
/customers/:id/contracts    → Verträge des Kunden
/customers/new              → Neuer Kunde

/offers                     → Offerten-Liste
/offers/new                 → Neue Offerte (Wizard)
/offers/:id                 → Offerte Detail
/offers/:id/edit            → Offerte bearbeiten

/contracts                  → Verträge-Liste
/contracts/:id              → Vertrag Detail

/claims                     → Schäden-Liste
/claims/new                 → Neuer Schaden
/claims/:id                 → Schaden Detail

/documents                  → Dokumenten-Bibliothek
/documents/:id              → Dokument Detail

/reporting                  → Reporting Dashboard
/reporting/:reportType      → Spezifischer Report

/admin                      → Administration
/admin/users                → Benutzerverwaltung
/admin/roles                → Rollen & Rechte
/admin/settings             → Einstellungen
/admin/audit                → Audit Log
```

### Route Guards

```typescript
// Authentication
{ path: 'admin', canActivate: [AuthGuard] }

// Permissions
{ path: 'admin', canActivate: [PermissionGuard] }

// Dirty Form
{ path: 'customers/new', canDeactivate: [FormGuard] }
```

---

## Best Practices

### ✅ Do's

1. **Konsistente Navigation**: Gleiche Patterns überall
2. **Breadcrumbs bei Hierarchie**: Immer wenn > 2 Levels tief
3. **Active States**: Klar zeigen, wo User ist
4. **Mobile: Drawer**: Overlay statt persistent
5. **Keyboard**: Alle Nav-Elemente erreichbar
6. **Loading States**: Skeleton während Navigation

### ❌ Don'ts

1. **Zu tiefe Hierarchien**: Max. 4-5 Levels
2. **Zu viele Tabs**: Max. 7, sonst überdenken
3. **Navigation verstecken**: Side Nav immer zugänglich
4. **Inkonsistente Patterns**: Nicht mischen
5. **Fehlende Breadcrumbs**: Bei tiefen Strukturen Pflicht
6. **Keine Loading States**: User braucht Feedback

---

## Zusammenfassung

### Navigation Layers

1. **Global** (Top Bar): Logo, Search, Notifications, Profile
2. **Primary** (Side Nav): Module/Bereiche
3. **Secondary** (Breadcrumbs, Tabs): Context-Navigation
4. **Tertiary** (Links, Buttons): In-Page Navigation

### Key Takeaways

- 📱 **Responsive**: Desktop persistent, Mobile drawer
- ⌨️ **Keyboard**: Vollständig navigierbar
- 🔍 **Search**: Global + Advanced
- 🍞 **Breadcrumbs**: Bei Hierarchie Pflicht
- 📑 **Tabs**: Max. 5-7, für Detail-Bereiche
- ♿ **Accessibility**: ARIA Labels, Skip Links, Focus Management

---

**Version**: 1.0.0  
**Letzte Aktualisierung**: 12. Februar 2026
