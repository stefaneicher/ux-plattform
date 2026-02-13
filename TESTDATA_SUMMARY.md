# Testdaten erfolgreich extrahiert! 🎉

Die Testdaten aus der `demo.html` wurden erfolgreich extrahiert und aufbereitet.

## 📦 Erstellte Dateien

### JSON-Daten:
- ✅ `backend/src/seeds/offers.json` - 6 Offerten
- ✅ `backend/src/seeds/policies.json` - 5 Policen  
- ✅ `backend/src/seeds/claims.json` - 6 Schadenmeldungen

### Import-Scripts:
- ✅ `backend/src/seeds/seed-data.js` - REST API Import (Node.js)
- ✅ `backend/src/seeds/import-to-mongodb.sh` - MongoDB Import (Linux/Mac)
- ✅ `backend/src/seeds/import-to-mongodb.ps1` - MongoDB Import (Windows)

### Dokumentation & Tools:
- ✅ `backend/src/seeds/README.md` - Ausführliche Anleitung
- ✅ `backend/src/seeds/test-api.http` - REST API Test-Requests
- ✅ npm Scripts in `backend/package.json` hinzugefügt

## 🚀 Schnellstart

### Option A: Import über REST API (empfohlen)

```bash
# 1. Backend starten (in einem Terminal)
cd backend
npm install
npm start

# 2. Daten einspielen (in einem anderen Terminal)
npm run seed
```

### Option B: Direkter MongoDB Import

**Windows:**
```powershell
cd backend\src\seeds
.\import-to-mongodb.ps1
```

**Linux/Mac:**
```bash
cd backend/src/seeds
chmod +x import-to-mongodb.sh
./import-to-mongodb.sh
```

## 📊 Was wurde extrahiert?

### Offerten (6 Stück):
- **Müller AG** - Hausrat Komfort (CHF 79.00/Mt., Status: DRAFT)
- **Schmidt GmbH** - Auto Vollkasko (CHF 129.00/Mt., Status: UNDER_REVIEW)
- **Weber & Co** - Gebäude Premium (CHF 189.00/Mt., Status: ACCEPTED)
- **Fischer KG** - Leben Basis (CHF 45.00/Mt., Status: ACCEPTED)
- **Becker Industries** - Hausrat Basis (CHF 12.50/Mt., Status: DRAFT)
- **Schneider & Partner** - Auto Teilkasko (CHF 89.00/Mt., Status: UNDER_REVIEW)

### Policen (5 Stück):
- Status: ACTIVE, PENDING
- Verschiedene Versicherungstypen
- Laufzeiten: 1-5 Jahre
- Zahlungsintervalle: MONTHLY, QUARTERLY

### Schadenmeldungen (6 Stück):
- Verschiedene Schadentypen: Wasser, Einbruch, Unfall, Brand, etc.
- Alle Status: SUBMITTED, UNDER_REVIEW, APPROVED, PAID, REJECTED, CLOSED
- Beträge: CHF 3.200 - CHF 25.000

## 📝 NPM Scripts

Die folgenden Scripts wurden zu `backend/package.json` hinzugefügt:

```bash
npm run seed       # Daten einspielen (Produktions-API)
npm run seed:dev   # Daten einspielen (Dev-API auf localhost:3000)
```

## 🔍 Daten überprüfen

### Via REST API:
```bash
curl http://localhost:3000/api/offers
curl http://localhost:3000/api/policies
curl http://localhost:3000/api/claims
```

### Via MongoDB Shell:
```javascript
use insurance
db.offers.find().pretty()
db.policies.find().pretty()
db.claims.find().pretty()
```

### Via Frontend:
Nach dem Import sollten die Daten im Frontend sichtbar sein:
- http://localhost:4200 (Angular App)

## 📚 Weitere Informationen

Siehe `backend/src/seeds/README.md` für:
- Detaillierte Anleitungen
- Troubleshooting
- Anpassungsmöglichkeiten
- Datenübersicht

## ✨ Nächste Schritte

1. **Backend starten**: `cd backend && npm start`
2. **Daten einspielen**: `npm run seed:dev`
3. **Frontend starten**: `cd frontend && npm start`
4. **Im Browser öffnen**: http://localhost:4200

Die Daten sollten dann in der Anwendung sichtbar sein!

