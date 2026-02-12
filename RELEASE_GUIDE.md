# Release und Deployment Guide

Dieses Dokument beschreibt den Release- und Deployment-Prozess für die UX Platform mit GitHub Releases und automatischem Render.com Deployment.

## 📦 Release-Prozess

### Übersicht

Die Platform nutzt einen automatisierten Release-Prozess:

1. **GitHub Release erstellen** → Löst automatisch Docker Image Build aus
2. **Docker Images** → Werden zu GitHub Container Registry (ghcr.io) gepusht
3. **Render.com** → Zieht automatisch die neuesten Images und deployt

### Workflow

```
Code ändern → Testen → Release erstellen → Docker Build → Render Deploy
```

## 🚀 Release erstellen

### Option 1: GitHub UI (Empfohlen)

1. Gehe zu: https://github.com/stefaneicher/ux-plattform/releases
2. Klicke auf **"Draft a new release"**
3. Wähle oder erstelle einen Tag (z.B. `v1.0.0`, `v1.1.0`)
4. Gib einen **Release-Titel** ein (z.B. "Version 1.0.0 - Initial Release")
5. Beschreibe die Änderungen im **Release-Notizen** Bereich:
   ```markdown
   ## What's Changed
   - Feature: Neue Funktionalität X hinzugefügt
   - Fix: Bug Y behoben
   - Improvement: Performance-Optimierung Z
   
   ## Docker Images
   - Frontend: ghcr.io/stefaneicher/ux-plattform-frontend:v1.0.0
   - Backend: ghcr.io/stefaneicher/ux-plattform-backend:v1.0.0
   ```
6. Klicke auf **"Publish release"**

### Option 2: GitHub CLI

```bash
# Release mit Tag erstellen
gh release create v1.0.0 \
  --title "Version 1.0.0" \
  --notes "Release notes hier einfügen"

# Pre-Release erstellen
gh release create v1.0.0-beta \
  --title "Version 1.0.0 Beta" \
  --notes "Beta release" \
  --prerelease
```

### Option 3: Git Tags

```bash
# Tag lokal erstellen
git tag -a v1.0.0 -m "Release version 1.0.0"

# Tag pushen
git push origin v1.0.0

# Danach manuell Release auf GitHub erstellen
```

## 🐳 Docker Images

### Automatischer Build

Bei jedem Release werden automatisch Docker Images gebaut und gepusht:

**Frontend Image:**
```
ghcr.io/stefaneicher/ux-plattform-frontend:v1.0.0
ghcr.io/stefaneicher/ux-plattform-frontend:latest
```

**Backend Image:**
```
ghcr.io/stefaneicher/ux-plattform-backend:v1.0.0
ghcr.io/stefaneicher/ux-plattform-backend:latest
```

### Manueller Build (für Entwicklung)

```bash
# Frontend lokal bauen
docker build -t ux-plattform-frontend:dev ./frontend

# Backend lokal bauen
docker build -t ux-plattform-backend:dev ./backend

# Lokal testen
docker-compose up
```

### Image Pull

```bash
# Öffentliche Images pullen (wenn öffentlich gemacht)
docker pull ghcr.io/stefaneicher/ux-plattform-frontend:latest
docker pull ghcr.io/stefaneicher/ux-plattform-backend:latest

# Mit spezifischer Version
docker pull ghcr.io/stefaneicher/ux-plattform-frontend:v1.0.0
```

## ☁️ Render.com Deployment

### Automatisches Deployment

Render.com ist konfiguriert, um automatisch die neuesten Docker Images zu verwenden:

1. **Release wird erstellt** → GitHub Actions baut Images
2. **Images werden gepusht** → Zu ghcr.io
3. **Render wird benachrichtigt** → Via Deploy Hook (optional)
4. **Render pullt Images** → Neueste Version wird deployed

### Render.com Konfiguration

Die `render.yaml` definiert die Services:

```yaml
services:
  - type: web
    name: ux-platform-frontend
    runtime: image
    image:
      url: ghcr.io/stefaneicher/ux-plattform-frontend:latest
    
  - type: web
    name: ux-platform-backend
    runtime: image
    image:
      url: ghcr.io/stefaneicher/ux-plattform-backend:latest
```

### Manuelles Deployment auf Render

Falls automatisches Deployment nicht funktioniert:

1. Gehe zu: https://dashboard.render.com
2. Wähle dein Service aus
3. Klicke auf **"Manual Deploy"** → **"Deploy latest commit"**
4. Render pullt die neuesten Images und deployt

### Deploy Hooks (Optional)

Für automatische Benachrichtigungen an Render:

1. Erstelle Deploy Hook in Render Dashboard
2. Füge den Hook als Secret hinzu:
   ```bash
   gh secret set RENDER_DEPLOY_HOOK_URL --body "https://api.render.com/deploy/..."
   ```
3. GitHub Actions triggert automatisch das Deployment

## 📋 Semantic Versioning

Wir folgen [Semantic Versioning](https://semver.org/):

### Format: `MAJOR.MINOR.PATCH`

- **MAJOR** (1.0.0): Breaking Changes, API-Änderungen
- **MINOR** (0.1.0): Neue Features, rückwärtskompatibel
- **PATCH** (0.0.1): Bug Fixes, kleinere Änderungen

### Beispiele

```bash
v1.0.0    # Erste Production-Version
v1.1.0    # Neues Feature hinzugefügt
v1.1.1    # Bug Fix
v1.2.0    # Weiteres Feature
v2.0.0    # Breaking Change
```

### Pre-Release Tags

```bash
v1.0.0-alpha    # Alpha Version
v1.0.0-beta     # Beta Version
v1.0.0-rc.1     # Release Candidate 1
```

## 🔄 Release Checklist

Vor jedem Release:

- [ ] Alle Tests laufen durch (`npm test`)
- [ ] Code ist gelintet (`npm run lint`)
- [ ] Dokumentation ist aktuell
- [ ] CHANGELOG.md ist aktualisiert
- [ ] Version in package.json ist aktualisiert
- [ ] Alle PRs sind gemerged
- [ ] Security Checks sind bestanden

Nach dem Release:

- [ ] GitHub Actions Build ist erfolgreich
- [ ] Docker Images sind verfügbar auf ghcr.io
- [ ] Render.com Deployment ist erfolgreich
- [ ] Smoke Tests auf Production durchgeführt
- [ ] Monitoring prüfen

## 🔍 Monitoring & Verification

### GitHub Actions prüfen

```bash
# Release Workflow Status
gh run list --workflow=release.yml

# Logs anschauen
gh run view <run-id> --log
```

### Docker Images prüfen

```bash
# Verfügbare Tags anzeigen
gh api /user/packages/container/ux-plattform-frontend/versions

# Image Details
docker inspect ghcr.io/stefaneicher/ux-plattform-frontend:latest
```

### Render.com Status

```bash
# Render CLI (falls installiert)
render services list

# Via Dashboard
# https://dashboard.render.com
```

## 🐛 Troubleshooting

### Build schlägt fehl

```bash
# GitHub Actions Logs prüfen
gh run view --log

# Lokal reproduzieren
docker build -t test ./frontend
docker build -t test ./backend
```

### Images können nicht gepullt werden

**Problem:** `Error: unauthorized: authentication required`

**Lösung:**
1. Container Registry auf "Public" setzen
2. Oder: GitHub Token mit `read:packages` Berechtigung verwenden

```bash
# Mit Token authentifizieren
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin
```

### Render Deployment schlägt fehl

**Mögliche Ursachen:**
1. Image ist nicht öffentlich → In GitHub Packages Settings auf public setzen
2. Falsche Image URL in render.yaml
3. Render hat keine Berechtigung → Deploy Key hinzufügen

## 📚 Weiterführende Links

- [GitHub Releases Dokumentation](https://docs.github.com/en/repositories/releasing-projects-on-github)
- [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [Render Docker Deployments](https://render.com/docs/docker)
- [Semantic Versioning](https://semver.org/)

## 🎯 Beispiel-Workflow

Kompletter Workflow von Code-Änderung bis Production:

```bash
# 1. Feature entwickeln
git checkout -b feature/new-feature
# ... Code ändern ...
git add .
git commit -m "feat: Add new feature"
git push origin feature/new-feature

# 2. Pull Request erstellen und mergen
gh pr create --title "New Feature" --body "Description"
gh pr merge --squash

# 3. Release erstellen
git checkout main
git pull
gh release create v1.1.0 \
  --title "Version 1.1.0 - New Feature" \
  --notes "Added new feature X"

# 4. Automatisch passiert:
# - GitHub Actions baut Docker Images
# - Images werden zu ghcr.io gepusht
# - Render.com deployed automatisch

# 5. Verify
curl https://your-app.render.com/health
```

---

**Version**: 1.0.0  
**Letzte Aktualisierung**: Februar 2026  
**Maintainer**: @stefaneicher
