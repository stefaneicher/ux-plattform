# Enterprise UX Plattform - CSS Insurance

[![CI](https://github.com/stefaneicher/ux-platform/actions/workflows/ci.yml/badge.svg)](https://github.com/stefaneicher/ux-platform/actions/workflows/ci.yml)
[![Deploy Storybook](https://github.com/stefaneicher/ux-platform/actions/workflows/deploy.yml/badge.svg)](https://github.com/stefaneicher/ux-platform/actions/workflows/deploy.yml)
[![Build and Release](https://github.com/stefaneicher/ux-platform/actions/workflows/release.yml/badge.svg)](https://github.com/stefaneicher/ux-platform/actions/workflows/release.yml)

**Full-Stack Insurance Demo Application mit DDD-Architektur**

> State-of-the-art Enterprise Insurance Platform mit Angular Frontend, NestJS Backend, Domain-Driven Design, MongoDB, und vollständiger Dokumentation (2026)

## 🎯 Übersicht

Diese Plattform ist eine vollständige Insurance Demo-Anwendung mit Domain-Driven Design und modernen Technologien:

### Kernfunktionen

- ✅ **Full-Stack Application** - Angular Frontend + NestJS Backend
- ✅ **Domain-Driven Design** - Drei Bounded Contexts (Offerten, Policen, Leistungen)
- ✅ **Reactive REST API** - RxJS für Skalierung und Backpressure-Handling
- ✅ **MongoDB Database** - NoSQL-Datenbank für flexible Datenmodelle
- ✅ **Job Queue Management** - Bull & Redis für asynchrone Verarbeitung
- ✅ **Angular Material UI** - Professional UI-Komponenten
- ✅ **Design Token System** - Konsistente Design-Tokens
- ✅ **Comprehensive Documentation** - Architektur, Business Prozesse, PlantUML Diagramme
- ✅ **WCAG AA konform** - Accessibility von Anfang an

### 🌟 Neu in Version 2.0

- 🏗️ **DDD Architecture** - Bounded Contexts für Offers, Policies, Claims
- 🔄 **Reactive Programming** - RxJS Observables durchgehend
- 🗄️ **MongoDB Integration** - Mongoose ODM mit Schemas
- ⚡ **Job Queue** - Background processing mit Bull
- 📊 **PlantUML Diagrams** - Context Map, Domain Models, Sequence Diagrams
- 📚 **Business Process Documentation** - Kompletter Insurance Workflow
- 🎨 **Professional UI** - Material Design mit Tabellen, Formularen, Navigation


## 🚀 Quick Start

### Full Application

**Prerequisites:**
- Node.js 18+
- MongoDB 4.4+ (running on localhost:27017)
- Redis 6+ (optional, for job queue)

**Backend Setup:**
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Start backend (development mode)
npm run start:dev
```

Backend runs on: `http://localhost:3000`

**Frontend Setup:**
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start frontend (development mode)
npm start
```

Frontend runs on: `http://localhost:4200`

### Design System Only

**Online Demo:**
- **🌐 Live Demo**: [https://stefaneicher.github.io/ux-platform/demo.html](https://stefaneicher.github.io/ux-platform/demo.html)
- **📚 Dokumentation**: [https://stefaneicher.github.io/ux-platform/](https://stefaneicher.github.io/ux-platform/)

**Local Build:**
```bash
# Repository klonen
git clone https://github.com/stefaneicher/ux-platform.git
cd ux-platform

# Dependencies installieren
npm install

# Design System bauen
npm run build
```

## 📦 Projekt-Struktur

```
ux-platform/
├── backend/                         # NestJS Backend API
│   ├── src/
│   │   ├── main.ts                  # Application entry point
│   │   ├── app.module.ts            # Root module
│   │   ├── offers/                  # Offers bounded context
│   │   │   ├── offer.schema.ts      # Domain model
│   │   │   ├── offers.service.ts    # Business logic
│   │   │   ├── offers.controller.ts # REST endpoints
│   │   │   └── offers.module.ts     # Module definition
│   │   ├── policies/                # Policies bounded context
│   │   └── claims/                  # Claims bounded context
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── frontend/                        # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── offers/              # Offers feature module
│   │   │   ├── policies/            # Policies feature module
│   │   │   ├── claims/              # Claims feature module
│   │   │   ├── app.component.ts     # Root component
│   │   │   └── app.module.ts        # Root module
│   │   ├── environments/            # Environment configs
│   │   ├── index.html
│   │   └── main.ts
│   ├── angular.json
│   ├── package.json
│   └── README.md
│
├── docs/
│   ├── ARCHITECTURE.md              # Complete architecture documentation
│   ├── diagrams/                    # PlantUML diagrams
│   │   ├── context-map.puml         # DDD context map
│   │   ├── domain-model-*.puml      # Domain models
│   │   └── business-process.puml    # Business process flow
│   ├── ux-playbook/                 # UX documentation
│   ├── deployment.md
│   └── quick-start.md
│
├── libs/
│   └── design-tokens/
│       └── tokens.json              # Design Token definitions
│
├── scripts/
│   ├── build-tokens.js              # Token generator
│   └── build-storybook.js           # Documentation generator
│
└── package.json                     # Root package for design system
```


## 🏗️ Architektur

### System Architecture

```
┌─────────────────────────────────────────────────┐
│            Angular Frontend (Port 4200)         │
│  ┌──────────┬──────────┬──────────┐             │
│  │ Offers   │ Policies │ Claims   │             │
│  │ Module   │ Module   │ Module   │             │
│  └──────────┴──────────┴──────────┘             │
│         │         │         │                    │
│         └─────────┴─────────┘                    │
│                   │                              │
│              HTTP/REST                           │
└───────────────────┼───────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────┐
│         NestJS Backend (Port 3000)              │
│  ┌──────────────────────────────────┐           │
│  │       API Controllers            │           │
│  └──────────────────────────────────┘           │
│  ┌──────────┬──────────┬──────────┐             │
│  │ Offers   │ Policies │ Claims   │             │
│  │ Service  │ Service  │ Service  │             │
│  └──────────┴──────────┴──────────┘             │
│         │         │         │                    │
│         └─────────┴─────────┘                    │
│                   │                              │
└───────────────────┼───────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────┐
│              MongoDB Database                   │
│  ┌──────────┬──────────┬──────────┐             │
│  │ Offers   │ Policies │ Claims   │             │
│  │Collection│Collection│Collection│             │
│  └──────────┴──────────┴──────────┘             │
└─────────────────────────────────────────────────┘

                    +
┌─────────────────────────────────────────────────┐
│         Bull Job Queue (Redis)                  │
│  - Premium calculations                         │
│  - Payment processing                           │
│  - Email notifications                          │
└─────────────────────────────────────────────────┘
```

### Domain-Driven Design (DDD)

**Three Bounded Contexts:**

1. **Offers Context (Offerten)**
   - Calculate insurance premiums
   - Manage offer lifecycle
   - Risk assessment

2. **Policies Context (Policen)**
   - Create policies from offers
   - Policy activation and lifecycle
   - Beneficiary management

3. **Claims Context (Leistungen)**
   - Process insurance claims
   - Review workflow
   - Payment and billing

See [Complete Architecture Documentation](./docs/ARCHITECTURE.md) for details.

## 📚 Umfassende Dokumentation

### UX Playbook

Vollständiger Leitfaden für die Entwicklung konsistenter Enterprise-Anwendungen:

📖 **[UX Playbook öffnen](./docs/ux-playbook/README.md)**

**Inhalte:**
- Design-Prinzipien (Konsistenz, Accessibility First, Progressive Disclosure)
- Design Tokens (Farben, Typografie, Spacing, Elevation, Motion)
- Komponenten-Architektur (3-Layer-System)
- Navigation Patterns (App Shell, Breadcrumbs, Tabs, Command Palette)
- Seiten-Blueprints (Dashboard, Liste, Detail, Form, Wizard, Search, Admin)
- UX-Patterns (Formulare, Tabellen, Feedback, Loading States)
- Accessibility Guidelines (WCAG AA, Keyboard Nav, Screen Reader)
- Responsive Design (Breakpoints, Mobile-First vs Desktop-First)
- Governance (Design System Board, Contribution Flow, Versionierung)

### Navigation Map & Site Map

Vollständige Informationsarchitektur und Navigation-Patterns:

🗺️ **[Navigation Map öffnen](./docs/ux-playbook/navigation.md)**

**Inhalte:**
- Komplette Site Map für CSS Insurance Platform
- Navigation Patterns (Global, Primary, Secondary, Tertiary)
- User Flows (Offerte erstellen, Schaden erfassen, Kunde bearbeiten)
- Mobile Navigation (Bottom Nav, Swipe Gestures)
- Accessibility in Navigation (Keyboard, Screen Reader, Skip Links)
- Angular Routing-Strategien

### Komponenten-Katalog

Vollständige Referenz aller verfügbaren Komponenten mit Code-Beispielen:

🧩 **[Komponenten-Katalog öffnen](./docs/ux-playbook/components.md)**

**Inhalte:**
- Layer 1: Angular Material Foundation
- Layer 2: CSS Design System Wrapper (Button, Form, Table, Dialog, etc.)
- Layer 3: Business Components (Customer Card, Policy Header, Claim Timeline)
- Code-Beispiele für alle Komponenten
- Best Practices & Do's/Don'ts

## 🎨 Design Tokens

### Verwendung

#### CSS (Browser)

```css
/* Import tokens */
@import 'dist/tokens.css';

/* Use in your styles */
.my-button {
  background-color: var(--color-primary);
  padding: var(--spacing-4);
  border-radius: var(--radius-base);
  box-shadow: var(--elevation-2);
}
```

#### TypeScript/JavaScript

```typescript
import { tokens } from './dist/tokens';

// Use tokens in your code
const primaryColor = tokens.color.primary;
const spacing = tokens.spacing[4];
```

### Token-Kategorien

- **Farben**: Brand, Semantisch (Success, Warning, Error, Info), Neutral (Grau-Skala)
- **Typografie**: Font Family, Sizes (xs bis 4xl), Weights, Line Heights
- **Spacing**: 8pt Grid System (0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16)
- **Border Radius**: none, sm, base, md, lg, xl, 2xl, full
- **Elevation**: 5 Stufen von Schatten (Material Design inspiriert)
- **Z-Index**: Definierte Scale für Layering (dropdown, modal, tooltip, etc.)
- **Motion**: Duration (fast, base, slow) und Easing (standard, decelerate, accelerate)

## ♿ Accessibility

Alle Komponenten erfüllen **WCAG AA Standards** mit:

- ✅ **Keyboard Navigation** - Vollständig per Tastatur bedienbar (Tab, Shift+Tab, Enter, Escape, Arrow Keys)
- ✅ **Screen Reader Kompatibilität** - ARIA Labels, Semantic HTML, Live Regions
- ✅ **Kontrast-Konformität** - Min. 4.5:1 für normalen Text, 3:1 für großen Text
- ✅ **Focus Management** - Sichtbare Focus States, logische Tab-Reihenfolge
- ✅ **Motion Reduction Support** - Respekt für `prefers-reduced-motion`
- ✅ **Automated Testing** - Accessibility Checks in CI/CD Pipeline


## 🚢 Deployment

### 🚀 Schnell-Deploy Buttons

Deployen Sie die Anwendung mit einem Klick:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/stefaneicher/ux-platform)

**Neu hier?** → Siehe [WHERE_TO_DEPLOY.md](./WHERE_TO_DEPLOY.md) für alle Optionen und Empfehlungen!

### 📍 Deployment Optionen

| Option | Schwierigkeit | Kosten | Ideal für |
|--------|---------------|--------|-----------|
| **Railway** | ⭐ Sehr einfach | $0-50/M | Anfänger, MVP |
| **Render** | ⭐ Sehr einfach | $0-60/M | Kleine Projekte |
| **DigitalOcean** | ⭐⭐ Einfach | $30-100/M | Startups |
| **AWS/Azure** | ⭐⭐⭐ Komplex | $50-150+/M | Enterprise |
| **Docker Compose** | ⭐⭐ Mittel | $0 (lokal) | Entwicklung |
| **Hetzner VPS** | ⭐⭐ Mittel | €4-50/M | DSGVO, Budget |

**Detaillierte Guides:**
- 🎯 **[WHERE_TO_DEPLOY.md](./WHERE_TO_DEPLOY.md)** - Wo kann ich deployen? (Empfehlungen)
- 📖 **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Vollständiger Deployment Guide
- 💰 **[HOSTING_COMPARISON.md](./HOSTING_COMPARISON.md)** - Kosten & Feature-Vergleich
- ⚡ **[QUICKSTART_DEPLOYMENT.md](./QUICKSTART_DEPLOYMENT.md)** - Schnellstart

### Vollständige Anwendung (Frontend + Backend + DB)

**🚀 Quick Start mit Docker Compose:**

```bash
# Einfachstes Deployment mit einem Befehl
docker compose up -d

# Oder verwenden Sie das interaktive Script
./deploy.sh
```

Die Anwendung ist verfügbar unter:
- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:3000
- **MongoDB**: localhost:27017
- **Redis**: localhost:6379

### Design System (GitHub Pages)

Das Repository ist bereits für automatisches Deployment zu GitHub Pages konfiguriert:

1. **Push zu `main` Branch** triggert automatisch das Deployment
2. **GitHub Pages URL**: [https://stefaneicher.github.io/ux-platform/](https://stefaneicher.github.io/ux-platform/)
3. **Demo-App URL**: [https://stefaneicher.github.io/ux-platform/demo.html](https://stefaneicher.github.io/ux-platform/demo.html)

Siehe auch [Design System Deployment Guide](./docs/deployment.md) für weitere Optionen.

## 🤝 Contributing

Beiträge sind willkommen! Bitte lies unseren [Contributing Guide](./CONTRIBUTING.md) für Details zu:

- Development Workflow
- Code Style & Conventions
- Commit Messages (Conventional Commits)
- Pull Request Process
- Testing Requirements

### Design System Contribution Flow

1. **Request**: GitHub Issue mit Proposal
2. **Design**: Figma Mockup + Specifications
3. **Review**: Design System Board Review
4. **Development**: Implementation + Storybook
5. **Release**: Semantic Versioning (Major.Minor.Patch)

## 🔧 Technologie-Stack

### Backend
- **Framework**: NestJS (Node.js + TypeScript)
- **Database**: MongoDB with Mongoose ODM
- **Reactive Programming**: RxJS
- **Job Queue**: Bull (Redis-based)
- **Validation**: class-validator, class-transformer

### Frontend
- **Framework**: Angular 17
- **UI Library**: Angular Material
- **State Management**: RxJS BehaviorSubjects
- **Styling**: CSS + Material Theme
- **Icons**: Material Icons

### Design System
- **Design Tokens**: JSON-based, CSS Custom Properties
- **Fonts**: Roboto
- **Build**: Node.js Scripts

### DevOps
- **CI/CD**: GitHub Actions
- **Deployment**: 
  - GitHub Pages (Design System/Storybook)
  - Render.com (Production - Docker-based)
  - GitHub Container Registry (Docker Images)
- **Containerization**: Docker + docker-compose
- **Monitoring**: Logging framework-ready
- **Release Management**: Automated via GitHub Releases

## 🚀 Deployment & Releases

### Production Deployment (Render.com)

**Quick Start:**

```bash
# 1. Erstelle ein Release auf GitHub
gh release create v1.0.0 \
  --title "Version 1.0.0 - Initial Release" \
  --notes "Production release"

# 2. GitHub Actions baut automatisch Docker Images
# 3. Images werden zu ghcr.io gepusht
# 4. Render.com deployed automatisch

# Verify deployment
curl https://your-app.onrender.com/health
```

**Docker Images:**
- Frontend: `ghcr.io/stefaneicher/ux-plattform-frontend:latest`
- Backend: `ghcr.io/stefaneicher/ux-plattform-backend:latest`

**Dokumentation:**
- 📖 [Release Guide](./RELEASE_GUIDE.md) - Wie man Releases erstellt
- 📖 [Deployment Guide](./DEPLOYMENT_GUIDE.md) - Deployment Optionen
- 📖 [Changelog](./CHANGELOG.md) - Version History

### Lokale Entwicklung mit Docker

```bash
# Komplette Application starten
docker-compose up -d

# Services verfügbar auf:
# Frontend: http://localhost:4200
# Backend: http://localhost:3000
# MongoDB: localhost:27017
# Redis: localhost:6379
```

## 📈 Roadmap

### Version 2.1 (Q2 2026)
- [ ] User Authentication (JWT)
- [ ] Role-Based Access Control (RBAC)
- [ ] Document Upload for Claims
- [ ] Email Notifications
- [ ] PDF Report Generation

### Version 2.2 (Q3 2026)
- [ ] Payment Gateway Integration
- [ ] Advanced Analytics Dashboard
- [ ] Real-time Notifications (WebSocket)
- [ ] Audit Logging
- [ ] Performance Monitoring

### Version 3.0 (Q4 2026)
- [ ] Microservices Architecture
- [ ] Machine Learning Risk Assessment
- [ ] Fraud Detection System
- [ ] Mobile Apps (iOS/Android)
- [ ] Multi-language Support (i18n)

## 📊 Metriken

### Application Statistics
- **Bounded Contexts**: 3 (Offers, Policies, Claims)
- **API Endpoints**: 25+ REST endpoints
- **Database Collections**: 3 MongoDB collections
- **Frontend Modules**: 3 feature modules
- **Components**: 10+ Angular components
- **Design Tokens**: 150+ defined tokens
- **Documentation**: 20,000+ words
- **PlantUML Diagrams**: 7 architecture diagrams

### Code Statistics
- **Backend**: ~5,000 lines TypeScript
- **Frontend**: ~3,000 lines TypeScript/HTML/CSS
- **Configuration**: ~1,000 lines JSON/YAML

## 🆘 Support

### Ressourcen

- **📖 Dokumentation**: [UX Playbook](./docs/ux-playbook/README.md)
- **🐛 Issues**: [GitHub Issues](https://github.com/stefaneicher/ux-platform/issues)
- **💬 Diskussionen**: [GitHub Discussions](https://github.com/stefaneicher/ux-platform/discussions)
- **📧 Email**: ux-platform@css-insurance.ch

### Häufige Fragen

**F: Kann ich das Design System in einer React-App nutzen?**
A: Ja! Die Design Tokens (CSS Variables) funktionieren mit jedem Framework. Layer 2 und 3 Komponenten sind aktuell Angular-spezifisch, können aber adaptiert werden.

**F: Wie aktualisiere ich auf eine neue Version?**
A: Siehe [Upgrade Guide](./docs/upgrade-guide.md) für Version-spezifische Migrationsanleitungen.

**F: Sind die Komponenten Production-ready?**
A: Die Design Tokens und Dokumentation sind production-ready. Komponenten-Implementierungen sind als Blueprints zu verstehen und sollten für spezifische Use Cases angepasst werden.

## 📄 Lizenz

Dieses Projekt ist unter der [MIT License](./LICENSE) lizenziert.

```
MIT License

Copyright (c) 2026 CSS Insurance

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 🙏 Credits & Acknowledgments

### Team

- **UX Design**: CSS Insurance UX Team
- **Frontend Architecture**: Enterprise Architecture Team
- **Development**: Contributing Developers

### Inspirationen & Referenzen

- **Material Design**: Google's Material Design System
- **Design Tokens**: W3C Design Tokens Community Group
- **Accessibility**: W3C WCAG 2.1 Guidelines
- **Component Architecture**: Atomic Design Methodology

---

**Version**: 1.0.0  
**Letzte Aktualisierung**: 12. Februar 2026  
**Status**: ✅ Production Ready (Tokens & Dokumentation)

Built with ❤️ für CSS Insurance by GitHub Copilot
