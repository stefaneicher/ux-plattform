# Quick Start - Deployment

Schnellstart-Anleitung für das Deployment der UX Platform (Frontend + Backend + Datenbank).

## 🚀 Lokales Deployment (Docker Compose)

Die einfachste Methode für lokales Deployment oder Entwicklung:

```bash
# Alle Services starten
docker compose up -d

# Status prüfen
docker compose ps

# Anwendung nutzen
# Frontend: http://localhost:4200
# Backend:  http://localhost:3000
# MongoDB:  localhost:27017
# Redis:    localhost:6379
```

### Interaktives Deployment-Script

```bash
# Script ausführen
./deploy.sh

# Folgen Sie dem Menü:
# 1) Deployment starten (alle Services)
# 2) Nur Backend starten
# 3) Nur Frontend starten
# 4) Alle Services stoppen
# 5) Logs anzeigen
# 6) Status prüfen
# 7) Cleanup
```

## ☁️ Cloud Deployment

### Schnell-Empfehlungen

| Projekt-Typ | Empfehlung | Grund |
|-------------|------------|-------|
| MVP/POC | Railway, Render | Kostenlos starten |
| Startup | DigitalOcean | Preis/Leistung |
| Enterprise | AWS, Azure | Skalierung |
| Budget | VPS (Hetzner) | €10/Monat |

### Detaillierte Anleitungen

Siehe vollständige Deployment Guides:

1. **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Schritt-für-Schritt Anleitungen
   - Docker & Docker Compose
   - AWS, Azure, Google Cloud
   - Heroku, Railway, Render
   - VPS/Bare Metal
   - Kubernetes

2. **[HOSTING_COMPARISON.md](./HOSTING_COMPARISON.md)** - Hosting Vergleich
   - Kosten-Übersicht
   - Feature-Vergleich
   - Empfehlungen nach Use Case
   - Skalierungs-Roadmap

## 🐳 Docker Images

### Backend bauen

```bash
cd backend
docker build -t ux-platform-backend .
docker run -p 3000:3000 \
  -e MONGODB_URI=mongodb://host:27017/insurance \
  ux-platform-backend
```

### Frontend bauen

```bash
cd frontend
docker build -t ux-platform-frontend .
docker run -p 4200:80 ux-platform-frontend
```

## ☸️ Kubernetes

Für Enterprise Production Deployments:

```bash
# Namespace erstellen
kubectl apply -f k8s/namespace.yaml

# Alle Services deployen
kubectl apply -f k8s/

# Status prüfen
kubectl get pods -n ux-platform
```

Siehe [k8s/README.md](./k8s/README.md) für Details.

## 📊 Wichtige URLs nach Deployment

- **Frontend**: Port 4200 (Docker) oder Port 80 (Production)
- **Backend API**: Port 3000
- **Health Check**: `/health` (Backend)
- **API Endpoints**: `/api/*` (Backend)

## 🔧 Environment Konfiguration

### Backend (.env)

```bash
PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb://mongodb:27017/insurance
REDIS_HOST=redis
REDIS_PORT=6379
CORS_ORIGIN=https://your-frontend-domain.com
```

### Frontend (environment.prod.ts)

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-backend-api.com'
};
```

## 🆘 Troubleshooting

### Container startet nicht

```bash
docker compose logs backend
docker compose logs frontend
```

### Port bereits belegt

```bash
# Ändere Ports in docker-compose.yml
# z.B. "8080:80" statt "4200:80"
```

### Verbindung zu MongoDB fehlschlägt

```bash
# Prüfe ob MongoDB läuft
docker compose ps mongodb

# Logs anschauen
docker compose logs mongodb
```

## 📚 Weitere Ressourcen

- **Vollständiger Guide**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Hosting Vergleich**: [HOSTING_COMPARISON.md](./HOSTING_COMPARISON.md)
- **Kubernetes**: [k8s/README.md](./k8s/README.md)
- **Haupt-README**: [README.md](./README.md)

---

**Quick Start erfolgreich?** Siehe [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) für Production Deployment!
