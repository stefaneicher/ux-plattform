# Deployment Guide - Frontend & Backend Application
# Bereitstellungshandbuch - Frontend & Backend Anwendung

Diese Anleitung erklärt, wie Sie die komplette Insurance Demo-Anwendung (Frontend + Backend + Datenbank) deployen können.

> **🎯 Empfohlen für Production: [Render.com mit GitHub Releases](#option-6-rendercom-empfohlen---docker-basiert)**

## ⚡ Quick Start - Production Deployment

**Schnellster Weg zu Production:**

1. **Release erstellen:**
   ```bash
   gh release create v1.0.0 --title "Version 1.0.0" --notes "Production release"
   ```

2. **GitHub Actions baut automatisch Docker Images** und pusht zu `ghcr.io`

3. **Render.com deployt automatisch** die neuen Images

➡️ **Mehr Details:** Siehe [RELEASE_GUIDE.md](./RELEASE_GUIDE.md)

## 📋 Inhaltsverzeichnis

1. [Schnellstart mit Docker Compose](#schnellstart-mit-docker-compose)
2. [Cloud Hosting Optionen](#cloud-hosting-optionen)
   - [Option 6: Render.com (Empfohlen)](#option-6-rendercom-empfohlen---docker-basiert)
3. [Manuelle Deployment](#manuelle-deployment)
4. [Umgebungskonfiguration](#umgebungskonfiguration)
5. [Monitoring & Wartung](#monitoring--wartung)

---

## 🚀 Schnellstart mit Docker Compose

Die einfachste Methode für lokales Deployment oder Entwicklung.

### Voraussetzungen

- Docker 20.10+ 
- Docker Compose 2.0+
- Mindestens 4GB RAM verfügbar

### Deployment Schritte

```bash
# 1. Repository klonen
git clone https://github.com/stefaneicher/ux-platform.git
cd ux-platform

# 2. Container bauen und starten
docker-compose up -d

# 3. Status prüfen
docker-compose ps

# 4. Logs anschauen (optional)
docker-compose logs -f

# 5. Anwendung testen
# Frontend: http://localhost:4200
# Backend API: http://localhost:3000
# MongoDB: localhost:27017
# Redis: localhost:6379
```

### Stoppen und Entfernen

```bash
# Stoppen
docker-compose stop

# Stoppen und entfernen
docker-compose down

# Mit Daten löschen
docker-compose down -v
```

---

## ☁️ Cloud Hosting Optionen

### Option 1: AWS (Amazon Web Services)

**Empfohlene Services:**

#### Frontend (Angular)
- **AWS Amplify** - Einfachste Option, CI/CD integriert
- **AWS S3 + CloudFront** - Static hosting mit CDN
- **AWS ECS/Fargate** - Container-basiert

#### Backend (NestJS)
- **AWS ECS/Fargate** - Serverless Container
- **AWS Elastic Beanstalk** - Platform-as-a-Service
- **AWS App Runner** - Einfach Container deployen

#### Datenbank
- **AWS DocumentDB** - MongoDB-kompatibel, managed
- **AWS ElastiCache** - Redis, managed

**Geschätzte Kosten:** ~$50-150/Monat (je nach Traffic)

**Deployment mit AWS:**

```bash
# 1. Install AWS CLI
aws configure

# 2. Backend zu ECR pushen
aws ecr create-repository --repository-name ux-platform-backend
docker build -t ux-platform-backend ./backend
docker tag ux-platform-backend:latest [AWS_ACCOUNT_ID].dkr.ecr.[REGION].amazonaws.com/ux-platform-backend:latest
docker push [AWS_ACCOUNT_ID].dkr.ecr.[REGION].amazonaws.com/ux-platform-backend:latest

# 3. Frontend zu S3 deployen
cd frontend
npm run build
aws s3 sync dist/frontend s3://your-bucket-name --delete
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"

# 4. RDS/DocumentDB Setup
aws rds create-db-instance --db-instance-identifier ux-platform-db ...
```

---

### Option 2: Azure (Microsoft Azure)

**Empfohlene Services:**

#### Frontend
- **Azure Static Web Apps** - Optimal für Angular
- **Azure Storage + CDN** - Static hosting

#### Backend
- **Azure Container Apps** - Serverless Container
- **Azure App Service** - PaaS für Node.js
- **Azure Kubernetes Service (AKS)** - Für große Deployments

#### Datenbank
- **Azure Cosmos DB** - MongoDB-kompatibel API
- **Azure Cache for Redis** - Managed Redis

**Geschätzte Kosten:** ~€40-120/Monat

**Deployment mit Azure:**

```bash
# 1. Install Azure CLI
az login

# 2. Ressourcengruppe erstellen
az group create --name ux-platform-rg --location westeurope

# 3. Container Registry
az acr create --resource-group ux-platform-rg --name uxplatformcr --sku Basic
az acr build --registry uxplatformcr --image backend:latest ./backend

# 4. Frontend als Static Web App
cd frontend
npm run build
az staticwebapp create \
  --name ux-platform-frontend \
  --resource-group ux-platform-rg \
  --source dist/frontend \
  --location westeurope

# 5. Backend als Container App
az containerapp create \
  --name ux-platform-backend \
  --resource-group ux-platform-rg \
  --image uxplatformcr.azurecr.io/backend:latest \
  --target-port 3000 \
  --ingress external

# 6. Cosmos DB
az cosmosdb create \
  --name ux-platform-db \
  --resource-group ux-platform-rg \
  --kind MongoDB
```

---

### Option 3: Google Cloud Platform (GCP)

**Empfohlene Services:**

#### Frontend
- **Firebase Hosting** - Optimal für Angular
- **Google Cloud Storage + CDN**

#### Backend
- **Cloud Run** - Serverless Container
- **Google Kubernetes Engine (GKE)** - Für Produktion
- **App Engine** - PaaS

#### Datenbank
- **Cloud MongoDB Atlas** - Managed MongoDB
- **Memorystore** - Redis

**Geschätzte Kosten:** ~$40-130/Monat

**Deployment mit GCP:**

```bash
# 1. Install gcloud CLI
gcloud init

# 2. Container Registry
gcloud builds submit --tag gcr.io/PROJECT_ID/backend ./backend
gcloud builds submit --tag gcr.io/PROJECT_ID/frontend ./frontend

# 3. Backend zu Cloud Run
gcloud run deploy ux-platform-backend \
  --image gcr.io/PROJECT_ID/backend \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated

# 4. Frontend zu Firebase
cd frontend
npm run build
firebase init hosting
firebase deploy --only hosting
```

---

### Option 4: Heroku (Einfachste Option)

**Für kleine bis mittlere Projekte, sehr einfach**

**Kosten:** ~$25-75/Monat (mit Datenbank)

```bash
# 1. Install Heroku CLI
heroku login

# 2. Backend deployen
cd backend
heroku create ux-platform-backend
heroku addons:create mongolab:sandbox
heroku addons:create heroku-redis:hobby-dev
git push heroku main

# 3. Frontend deployen
cd ../frontend
heroku create ux-platform-frontend
heroku buildpacks:set heroku/nodejs
# Update package.json with "start": "node server.js"
git push heroku main
```

---

### Option 5: DigitalOcean

**Gutes Preis-Leistungs-Verhältnis**

- **App Platform** - PaaS für Frontend & Backend
- **Droplets** - VMs für manuelles Setup
- **Managed MongoDB** - Database
- **Managed Redis** - Caching

**Kosten:** ~$30-100/Monat

---

### Option 6: Render.com (Empfohlen - Docker-basiert)

**Moderne Developer-freundliche Plattform mit Docker Support**

Die UX Platform nutzt Render.com mit Docker-Containern für Production Deployment.

#### Vorteile
- ✅ Docker-basiert - Konsistente Builds
- ✅ Automatisches Deployment via GitHub Releases
- ✅ Kostenlose Tier verfügbar
- ✅ Managed MongoDB und Redis
- ✅ Auto-SSL und CDN integriert
- ✅ Einfache Skalierung

**Kosten:** $0-50/Monat (je nach Usage)

#### Setup mit GitHub Releases

**1. GitHub Container Registry Images:**
```bash
# Images werden automatisch bei jedem Release gebaut:
ghcr.io/stefaneicher/ux-plattform-frontend:latest
ghcr.io/stefaneicher/ux-plattform-backend:latest
```

**2. Render.com einrichten:**

```bash
# 1. Render Account erstellen
# https://dashboard.render.com

# 2. Blueprint verwenden (render.yaml)
# - Gehe zu: https://dashboard.render.com/blueprints
# - "New Blueprint Instance" klicken
# - Repository verbinden: stefaneicher/ux-plattform
# - render.yaml wird automatisch erkannt
# - Services werden automatisch erstellt

# 3. Umgebungsvariablen konfigurieren
# Im Render Dashboard für jeden Service:
# - CORS_ORIGIN: https://your-frontend.onrender.com
# - Weitere Variablen nach Bedarf
```

**3. Release erstellen und deployen:**

```bash
# Release erstellen (siehe RELEASE_GUIDE.md)
gh release create v1.0.0 \
  --title "Version 1.0.0" \
  --notes "Initial production release"

# GitHub Actions baut automatisch:
# - Docker Images für Frontend & Backend
# - Pusht zu ghcr.io
# - Render zieht Images und deployt
```

**4. Deployment verifizieren:**

```bash
# Health Checks
curl https://your-frontend.onrender.com/health
curl https://your-backend.onrender.com/health

# Logs in Render Dashboard prüfen
# https://dashboard.render.com → Service auswählen → Logs
```

#### Manuelles Deployment

Falls automatisches Deployment nicht funktioniert:

```bash
# Option 1: Via Render Dashboard
# - Dashboard → Service auswählen
# - "Manual Deploy" → "Deploy latest commit"

# Option 2: Via Render CLI
render services deploy ux-platform-backend
render services deploy ux-platform-frontend

# Option 3: Deploy Hook verwenden
curl -X POST "https://api.render.com/deploy/srv-xxx?key=xxx"
```

#### Railway / Fly.io Alternative

**Railway Beispiel:**
```bash
# Frontend & Backend automatisch deployen
railway login
railway init
railway up
```


---

## 🛠️ Manuelle Deployment (VPS/Bare Metal)

Für volle Kontrolle auf eigenem Server (z.B. Ubuntu 22.04).

### Server Setup

```bash
# 1. Server Updates
sudo apt update && sudo apt upgrade -y

# 2. Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# 3. Install Docker Compose
sudo apt install docker-compose-plugin -y

# 4. Repository klonen
git clone https://github.com/stefaneicher/ux-platform.git
cd ux-platform

# 5. Produktions-Konfiguration
cp backend/.env.example backend/.env
nano backend/.env  # Anpassen

# 6. Deploy
docker-compose up -d

# 7. Nginx Reverse Proxy (optional)
sudo apt install nginx -y
sudo nano /etc/nginx/sites-available/ux-platform
```

### Nginx Konfiguration (Reverse Proxy)

```nginx
# /etc/nginx/sites-available/ux-platform
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:4200;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
# Nginx aktivieren
sudo ln -s /etc/nginx/sites-available/ux-platform /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# SSL mit Let's Encrypt
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

---

## 🔧 Umgebungskonfiguration

### Backend Environment Variables

```bash
# backend/.env
PORT=3000
NODE_ENV=production

# MongoDB
MONGODB_URI=mongodb://username:password@host:27017/insurance?authSource=admin

# Redis
REDIS_HOST=your-redis-host
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password

# CORS
CORS_ORIGIN=https://your-frontend-domain.com

# Optional
JWT_SECRET=your-secret-key
API_KEY=your-api-key
```

### Frontend Environment

Erstellen Sie `frontend/src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-backend-api.com',
  // Andere Konfigurationen
};
```

---

## 📊 Monitoring & Wartung

### Health Checks

```bash
# Backend Health
curl http://localhost:3000/health

# Frontend Health  
curl http://localhost:4200/health

# MongoDB
docker exec ux-platform-mongodb mongosh --eval "db.adminCommand('ping')"

# Redis
docker exec ux-platform-redis redis-cli ping
```

### Logs anschauen

```bash
# Alle Services
docker-compose logs

# Spezifischer Service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb

# Live-Logs
docker-compose logs -f backend
```

### Backups

```bash
# MongoDB Backup
docker exec ux-platform-mongodb mongodump --out /backup

# Backup herunterladen
docker cp ux-platform-mongodb:/backup ./mongodb-backup-$(date +%Y%m%d)

# Restore
docker exec -i ux-platform-mongodb mongorestore /backup
```

### Updates

```bash
# Repository aktualisieren
git pull origin main

# Container neu bauen
docker-compose build

# Mit Downtime
docker-compose down
docker-compose up -d

# Ohne Downtime (Rolling Update)
docker-compose up -d --no-deps --build backend
docker-compose up -d --no-deps --build frontend
```

---

## 🔐 Security Checklist

- [ ] SSL/TLS Zertifikat aktiviert (HTTPS)
- [ ] Firewall konfiguriert (nur notwendige Ports offen)
- [ ] Starke MongoDB Passwörter
- [ ] Environment Variables sicher gespeichert
- [ ] CORS richtig konfiguriert
- [ ] Security Headers aktiviert
- [ ] Rate Limiting implementiert
- [ ] Regelmäßige Updates & Patches
- [ ] Backups automatisiert

---

## 📈 Skalierung

### Horizontale Skalierung

```bash
# Mehrere Backend Instanzen
docker-compose up -d --scale backend=3

# Load Balancer davor (z.B. Nginx)
upstream backend {
    server localhost:3001;
    server localhost:3002;
    server localhost:3003;
}
```

### Kubernetes Deployment

Für große Production Deployments siehe separate K8s Konfigurationen in `/k8s` Verzeichnis.

---

## 🆘 Troubleshooting

### Container startet nicht

```bash
# Logs prüfen
docker-compose logs SERVICE_NAME

# Container Status
docker-compose ps

# Container neu starten
docker-compose restart SERVICE_NAME
```

### Verbindungsprobleme

```bash
# Netzwerk prüfen
docker network ls
docker network inspect ux-platform-network

# Port Bindings prüfen
docker ps

# Firewall
sudo ufw status
```

### Performance Probleme

```bash
# Ressourcen prüfen
docker stats

# MongoDB Index prüfen
docker exec -it ux-platform-mongodb mongosh
> use insurance
> db.offers.getIndexes()
```

---

## 📞 Support & Hilfe

- **Documentation**: [docs/](./docs/)
- **Issues**: https://github.com/stefaneicher/ux-platform/issues
- **Email**: ux-platform@css-insurance.ch

---

## 🎯 Empfehlungen nach Projekt-Größe

### Kleine Projekte / POC
→ **Heroku, Railway, Render** (~$0-50/Monat)

### Mittelgroße Projekte
→ **AWS App Runner, Azure Container Apps, GCP Cloud Run** (~$50-150/Monat)

### Enterprise / Production
→ **AWS ECS+RDS, Azure AKS+CosmosDB, GCP GKE** (~$200+/Monat)

### Volle Kontrolle
→ **Eigener VPS mit Docker Compose** (~$20-100/Monat)

---

**Version**: 1.0.0  
**Letzte Aktualisierung**: Februar 2026  
**Maintainer**: @stefaneicher
