# Testdaten für CSS Insurance Platform

Dieses Verzeichnis enthält Testdaten, die aus der `demo.html` extrahiert wurden.

## 📁 Dateien

- **offers.json** - 6 Beispiel-Offerten
- **policies.json** - 5 Beispiel-Policen
- **claims.json** - 6 Beispiel-Schadenmeldungen

## 🚀 Verwendung

### Option 1: Import über REST API (Empfohlen)

Verwendet das Node.js-Script, um Daten über die REST API einzuspielen:

```bash
# Im Backend-Verzeichnis
cd backend/src/seeds

# Abhängigkeiten installieren (falls noch nicht geschehen)
cd ../.. && npm install

# Backend muss laufen!
npm start

# In einem neuen Terminal:
node src/seeds/seed-data.js
```

Mit benutzerdefinierter API-URL:

```bash
node src/seeds/seed-data.js --api-url=http://localhost:3000/api
```

**Vorteile:**
- ✅ Verwendet die Business-Logik des Backends
- ✅ Validierung wird durchgeführt
- ✅ Funktioniert auch mit entfernten APIs
- ✅ Keine MongoDB-Tools erforderlich

### Option 2: Direkter MongoDB Import

Verwendet `mongoimport`, um Daten direkt in die Datenbank zu laden:

#### Windows (PowerShell):

```powershell
cd backend\src\seeds
.\import-to-mongodb.ps1

# Mit benutzerdefinierter URI:
.\import-to-mongodb.ps1 -MongoUri "mongodb://localhost:27017/insurance"
```

#### Linux/Mac (Bash):

```bash
cd backend/src/seeds
chmod +x import-to-mongodb.sh
./import-to-mongodb.sh

# Mit benutzerdefinierter URI:
./import-to-mongodb.sh mongodb://localhost:27017/insurance
```

**Voraussetzungen:**
- MongoDB muss laufen
- `mongoimport` muss installiert sein
  - Download: https://www.mongodb.com/try/download/database-tools

**Vorteile:**
- ✅ Sehr schnell
- ✅ Backend muss nicht laufen
- ❌ Umgeht Business-Logik und Validierung

### Option 3: MongoDB Compass

1. Öffne MongoDB Compass
2. Verbinde dich mit deiner Datenbank
3. Wähle die Collection aus (z.B. `offers`)
4. Klicke auf "Add Data" → "Import JSON or CSV file"
5. Wähle die entsprechende JSON-Datei
6. Wiederhole für alle Collections

## 📊 Datenübersicht

### Offerten (offers.json)
- 6 Offerten in verschiedenen Status (DRAFT, UNDER_REVIEW, ACCEPTED)
- Verschiedene Versicherungstypen: Hausrat, Auto, Gebäude, Leben
- Prämien von CHF 12.50 bis CHF 189.00

### Policen (policies.json)
- 5 aktive/ausstehende Policen
- Verschiedene Zahlungsintervalle (MONTHLY, QUARTERLY)
- Status: ACTIVE, PENDING
- Laufzeiten von 1-5 Jahren

### Schadenmeldungen (claims.json)
- 6 Schadensfälle in verschiedenen Status
- Schadentypen: Wasserschaden, Einbruch, Unfall, Brand, etc.
- Beträge von CHF 3.200 bis CHF 25.000
- Alle Status-Varianten abgedeckt: SUBMITTED, UNDER_REVIEW, APPROVED, PAID, REJECTED, CLOSED

## 🔧 Anpassungen

Die JSON-Dateien können direkt bearbeitet werden, um die Testdaten anzupassen:

```json
{
  "customerName": "Ihr Firmenname",
  "insuranceType": "Ihr Produkttyp",
  "coverageAmount": 100000,
  ...
}
```

Nach Änderungen einfach das entsprechende Import-Script erneut ausführen.

## 🧹 Daten löschen

### Über MongoDB Shell:

```javascript
use insurance
db.offers.deleteMany({})
db.policies.deleteMany({})
db.claims.deleteMany({})
```

### Über MongoDB Compass:

1. Öffne die Collection
2. Klicke auf "Options" → "Delete Collection"
3. Bestätige

## 🔍 Daten prüfen

### Über REST API:

```bash
# Offerten abrufen
curl http://localhost:3000/api/offers

# Policen abrufen
curl http://localhost:3000/api/policies

# Schadenmeldungen abrufen
curl http://localhost:3000/api/claims
```

### Über MongoDB Shell:

```javascript
use insurance
db.offers.find().pretty()
db.policies.find().pretty()
db.claims.find().pretty()
```

## 📝 Hinweise

- Die `customerId`-Felder sind Dummy-Werte (CUST-001, CUST-002, etc.)
- Die `policyId`-Referenzen in Claims müssen evtl. angepasst werden, wenn Policies mit anderen IDs erstellt werden
- Datumsfelder sind im ISO-Format (2026-02-13T00:00:00.000Z)
- Alle Beträge sind in CHF

## 🐛 Troubleshooting

### "API not reachable"
→ Stelle sicher, dass das Backend läuft (`npm start` im backend-Verzeichnis)

### "mongoimport not found"
→ Installiere MongoDB Database Tools: https://www.mongodb.com/try/download/database-tools

### "Connection refused"
→ Stelle sicher, dass MongoDB läuft

### "Validation failed"
→ Überprüfe, ob die Datenstruktur mit den Schemas übereinstimmt

## 📚 Weitere Informationen

- Backend-API-Dokumentation: `backend/OPENAPI_GUIDE.md`
- Schema-Definitionen: `backend/src/*/dto/*.dto.ts`

