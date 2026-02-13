# Lokale Entwicklung (ohne Docker)

Anleitung zum Starten der UX Platform in IntelliJ IDEA mit lokaler MongoDB und Redis Installation.

## 📋 Voraussetzungen

### System-Anforderungen
- **Node.js** 18+ ([nodejs.org](https://nodejs.org))
- **npm** 9+ (kommt mit Node.js)
- **MongoDB** 4.4+ (lokal installiert)
- **Redis** 6+ (lokal installiert, optional für Job Queue)
- **IntelliJ IDEA** oder WebStorm

---

## 🔧 1. MongoDB & Redis starten

### 🐳 Option A: Docker (empfohlen - einfachste)

Starte nur die Datenbanken in Docker, die Anwendung läuft lokal in IntelliJ.

**Voraussetzung:** Docker muss installiert sein

**Im Projekt-Root ausführen:**
```bash
# Nur MongoDB & Redis starten (nicht Backend/Frontend)
docker-compose up -d mongodb redis

# Status prüfen
docker-compose ps

# Logs anschauen
docker-compose logs mongodb
docker-compose logs redis
```

**Services sind erreichbar unter:**
- MongoDB: `localhost:27017`
- Redis: `localhost:6379`

**Datenbanken stoppen:**
```bash
docker-compose stop mongodb redis
```

**Datenbanken + Volumes löschen:**
```bash
docker-compose down -v
```

---

### Lokale Installation (Alternative zu Docker)

#### Windows - Option A: Chocolatey
```bash
# Chocolatey installieren (PowerShell als Admin)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# MongoDB installieren
choco install mongodb-community

# Redis installieren
choco install redis-64
```

#### Windows - Option B: Manuelle Installation
1. **MongoDB Community**: https://www.mongodb.com/try/download/community
2. **Redis**: https://github.com/microsoftarchive/redis/releases (oder WSL-Variante)

#### Windows - Option C: WSL
```bash
# In WSL Terminal
sudo apt update
sudo apt install -y mongodb redis-server
```

#### macOS
```bash
# Mit Homebrew
brew install mongodb-community redis

# Services starten
brew services start mongodb-community
brew services start redis
```

#### Linux (Ubuntu/Debian)
```bash
# MongoDB
curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -sc)/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org

# Redis
sudo apt install -y redis-server
```

---

## ✅ 2. Installation prüfen

```bash
# Node.js & npm
node --version    # v18.0.0 oder höher
npm --version     # 9.0.0 oder höher

# MongoDB
mongod --version

# Redis
redis-cli --version
```

---

## 🚀 3. Projekt-Dependencies installieren

**Im Projekt-Root (`C:\Users\stefa\IdeaProjects\ux-platform`):**

```bash
# Backend dependencies
cd backend
npm install
cd ..

# Frontend dependencies
cd frontend
npm install
cd ..
```

---

## 🎯 4. Services starten (IntelliJ)

### Option A: Über Terminal-Tabs (einfachste)

**Terminal 1 - MongoDB starten:**
```bash
mongod
```
⏳ Warten bis: `Listening on 127.0.0.1:27017`

**Terminal 2 - Redis starten:**
```bash
redis-server
```
⏳ Warten bis: `Ready to accept connections`

**Terminal 3 - Backend starten:**
```bash
cd backend
npm run start:dev
```
⏳ Warten bis: `NestFactory bootstrapped successfully on port 3000`

**Terminal 4 - Frontend starten:**
```bash
cd frontend
npm start
```
⏳ Warten bis: `Application bundle generation complete`

---

### Option B: IntelliJ Run-Konfigurationen (empfohlen)

#### Backend Run-Konfiguration

1. **Run → Edit Configurations**
2. **+ → Node.js**
3. Folgende Einstellungen:

| Setting | Wert |
|---------|------|
| **Name** | `Backend - Dev` |
| **Node interpreter** | `<default>` oder Node-Installation |
| **Package manager** | `npm` |
| **JavaScript file** | `C:\Users\stefa\IdeaProjects\ux-platform\backend\node_modules\ts-node\dist\bin.js` |
| **Application parameters** | `src/main.ts` |
| **Working directory** | `C:\Users\stefa\IdeaProjects\ux-platform\backend` |
| **Environment variables** | (siehe unten) |

**Environment Variables für Backend:**
```
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/insurance
REDIS_HOST=localhost
REDIS_PORT=6379
CORS_ORIGIN=http://localhost:4200
```

4. **Apply → OK**

#### Frontend Run-Konfiguration

1. **Run → Edit Configurations**
2. **+ → npm**
3. Folgende Einstellungen:

| Setting | Wert |
|---------|------|
| **Name** | `Frontend - Dev` |
| **Scripts** | `start` |
| **Working directory** | `C:\Users\stefa\IdeaProjects\ux-platform\frontend` |

4. **Apply → OK**

#### Compound Configuration (alles zusammen)

1. **Run → Edit Configurations**
2. **+ → Compound**
3. **Name:** `Full Stack - Dev`
4. **Configurations hinzufügen:**
   - ☑️ `Backend - Dev`
   - ☑️ `Frontend - Dev`
5. **Apply → OK**

**Jetzt kannst du mit einem Klick alles starten:** `Run → Run 'Full Stack - Dev'`

---

## 🌐 5. Anwendung testen

Wenn alles läuft, öffne dein Browser:

| Service | URL | Status |
|---------|-----|--------|
| **Frontend** | http://localhost:4200 | Hauptanwendung |
| **Backend Health** | http://localhost:3000/health | Sollte `200 OK` zurückgeben |
| **MongoDB** | localhost:27017 | Datenbank läuft |
| **Redis** | localhost:6379 | Cache läuft |

### Backend Health Check im Terminal
```bash
curl http://localhost:3000/health
```

Sollte zurückgeben:
```json
{"status":"ok"}
```

---

## 📁 6. Environment-Konfiguration

### Backend: `.env` (optional)

Im `backend/` Ordner erstellen:

```bash
# backend/.env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/insurance
REDIS_HOST=localhost
REDIS_PORT=6379
CORS_ORIGIN=http://localhost:4200,http://localhost:3000
```

### Frontend: `environment.ts`

Datei: `frontend/src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

---

## 🐛 7. Troubleshooting

### Docker: MongoDB startet nicht

```bash
# Logs anschauen
docker-compose logs mongodb

# Container neu starten
docker-compose restart mongodb

# Volumes löschen und neu starten
docker-compose down -v
docker-compose up -d mongodb redis
```

### Docker: Redis Verbindungsfehler

```bash
# Prüfe ob Redis läuft
docker-compose ps redis

# Container neu starten
docker-compose restart redis

# Logs anschauen
docker-compose logs redis
```

### Lokal: MongoDB startet nicht / Port 27017 belegt

```bash
# Prüfe ob MongoDB läuft
netstat -an | findstr 27017

# Falls anderer Prozess läuft, in docker-compose.yml anpassen
# oder den anderen Prozess beenden
```

**Lösung:** Anderen MongoDB-Prozess beenden oder anderen Port nutzen.

### Lokal: Redis verbindungsfehler

```bash
# Prüfe ob Redis läuft
redis-cli ping
# Sollte "PONG" zurückgeben
```

**Falls nicht vorhanden:**
```bash
# Windows
redis-server

# WSL/Linux
redis-server

# macOS
brew services start redis
```

### Frontend lädt nicht / Backend-Verbindung fehlgeschlagen

1. Prüfe Backend Health: http://localhost:3000/health
2. Prüfe CORS-Konfiguration in `docker-compose.yml`:
   ```
   CORS_ORIGIN=http://localhost:4200
   ```
3. Öffne Browser Console (F12) und schau Netzwerk-Fehler

### Port 3000 oder 4200 bereits belegt

```bash
# Windows
netstat -ano | findstr :3000
netstat -ano | findstr :4200

# Linux/macOS
lsof -i :3000
lsof -i :4200
```

**Lösung:** 
- Anderen Prozess beenden, oder
- In `docker-compose.yml` andere Ports nutzen (z.B. `8080:3000`)

---

## 🔄 8. Häufige Aufgaben

### Dependencies aktualisieren
```bash
# Backend
cd backend && npm update

# Frontend
cd frontend && npm update
```

### Backend neu bauen
```bash
cd backend
npm run build
```

### Frontend Production Build
```bash
cd frontend
npm run build
```

### Tests laufen
```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test
```

### Database löschen und neu initialisieren
```bash
# Alle Daten in MongoDB löschen
mongosh
# In der mongosh shell:
> use insurance
> db.dropDatabase()
> exit
```

### Redis Cache löschen
```bash
redis-cli FLUSHALL
```

---

## 🎨 9. Development Tools

### MongoDB GUI (optional)

**MongoDB Compass** (offizielle GUI):
```bash
# Installieren
choco install mongodb-compass  # Windows
brew install mongodb-compass   # macOS
```

Verbinde zu: `mongodb://localhost:27017`

### Redis CLI

```bash
# Redis-CLI starten
redis-cli

# Kommandos
> PING              # Verbindung testen
> KEYS *            # Alle Keys anzeigen
> GET keyname       # Value anzeigen
> DEL keyname       # Key löschen
> FLUSHALL          # Alle Daten löschen
```

---

## 📊 10. Architektur-Übersicht (lokal)

```
┌─────────────────────────────────────────────────────────┐
│                    Browser                              │
│              http://localhost:4200                      │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│            Angular Frontend (npm start)                 │
│                   Port 4200                             │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP Requests
                     │ (localhost:3000)
┌────────────────────▼────────────────────────────────────┐
│            NestJS Backend (npm run start:dev)           │
│                   Port 3000                             │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
┌───────▼──┐  ┌──────▼───┐  ┌────▼──────┐
│ MongoDB  │  │  Redis   │  │  Externa  │
│ :27017   │  │  :6379   │  │   APIs    │
└──────────┘  └──────────┘  └───────────┘
```

---

## 📚 Weitere Ressourcen

- **[README.md](./README.md)** - Projekt-Übersicht
- **[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - Technische Architektur
- **[QUICKSTART_DEPLOYMENT.md](./QUICKSTART_DEPLOYMENT.md)** - Docker Deployment
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Cloud Deployment
- **Backend README**: [backend/README.md](./backend/README.md)
- **Frontend README**: [frontend/README.md](./frontend/README.md)

---

## ✨ Quick Commands

```bash
# === OPTION A: Docker für DB + IntelliJ für App ===

# Nur MongoDB & Redis starten (Docker)
docker-compose up -d mongodb redis

# Status prüfen
docker-compose ps

# Logs anschauen
docker-compose logs -f mongodb
docker-compose logs -f redis

# Stoppen
docker-compose stop mongodb redis

# Alles aufräumen
docker-compose down -v

---

# === OPTION B: Alles lokal ===

# Alles schnell starten (in separaten Terminals)
mongod & redis-server & (cd backend && npm run start:dev) & (cd frontend && npm start)

# Backend nur
cd backend && npm run start:dev

# Frontend nur
cd frontend && npm start

# Backend bauen
cd backend && npm run build

# Tests
npm test

# Datenbank prüfen
mongosh
redis-cli

# Logs anschauen
curl http://localhost:3000/health
```

---

**💡 Tipp:** Speichere diese Datei in deinem Editor als Cheat Sheet! Bei Fragen schau hier nach oder öffne die Dokumentation.

