# 📚 OpenAPI/Swagger Dokumentation

## ✅ Was wurde hinzugefügt?

Das Backend verfügt jetzt über **vollständige OpenAPI/Swagger Dokumentation**!

---

## 🚀 Schnellstart

### Backend starten
```bash
cd backend
npm install
npm run start:dev
```

### Swagger UI öffnen
Öffne deinen Browser und navigiere zu:

**http://localhost:3000/api-docs**

---

## 📋 Features

### ✨ Vollständig dokumentierte API
- ✅ **Claims API** - Schadensfälle verwalten
- ✅ **Policies API** - Versicherungspolicen verwalten
- ✅ **Offers API** - Angebote und Prämienberechnung
- ✅ **Health Check** - Systemstatus prüfen

### 🎯 Interaktive Dokumentation
- **"Try it out"** - Teste alle Endpunkte direkt im Browser
- **Request/Response Beispiele** - Sieh dir Beispieldaten an
- **Schema Definitionen** - Vollständige Datenmodelle
- **Validierungsregeln** - Alle Feldanforderungen

### 🌍 Deutsche Beschreibungen
- Alle Endpunkte sind auf Deutsch beschrieben
- Verständliche Beispiele mit realistischen Daten
- Klare Fehlermeldungen

---

## 📖 API Übersicht

### Claims (Schadensfälle)

| Methode | Endpoint | Beschreibung |
|---------|----------|--------------|
| POST | `/api/claims` | Neuen Schadensfall erstellen |
| GET | `/api/claims` | Alle Schadensfälle abrufen (mit Filter) |
| GET | `/api/claims/:id` | Schadensfall nach ID |
| GET | `/api/claims/number/:claimNumber` | Schadensfall nach Nummer |
| POST | `/api/claims/:id/review/start` | Prüfung starten |
| POST | `/api/claims/:id/review` | Schadensfall genehmigen/ablehnen |
| POST | `/api/claims/:id/pay` | Als bezahlt markieren |
| GET | `/api/claims/policy/:policyId/billing` | Abrechnung berechnen |
| PATCH | `/api/claims/:id/status` | Status aktualisieren |
| DELETE | `/api/claims/:id` | Schadensfall löschen |

### Policies (Versicherungspolicen)

| Methode | Endpoint | Beschreibung |
|---------|----------|--------------|
| POST | `/api/policies` | Neue Police erstellen |
| GET | `/api/policies` | Alle Policen abrufen (mit Filter) |
| GET | `/api/policies/:id` | Police nach ID |
| GET | `/api/policies/number/:policyNumber` | Police nach Nummer |
| POST | `/api/policies/:id/activate` | Police aktivieren |
| PATCH | `/api/policies/:id/status` | Status aktualisieren |
| POST | `/api/policies/:id/cancel` | Police kündigen |
| DELETE | `/api/policies/:id` | Police löschen |

### Offers (Angebote)

| Methode | Endpoint | Beschreibung |
|---------|----------|--------------|
| POST | `/api/offers/calculate` | Prämie berechnen (ohne Angebot) |
| POST | `/api/offers` | Neues Angebot erstellen |
| GET | `/api/offers` | Alle Angebote abrufen |
| GET | `/api/offers/:id` | Angebot nach ID |
| POST | `/api/offers/:id/calculate` | Prämie für Angebot berechnen |
| PATCH | `/api/offers/:id/status` | Status aktualisieren |
| DELETE | `/api/offers/:id` | Angebot löschen |

### Health Check

| Methode | Endpoint | Beschreibung |
|---------|----------|--------------|
| GET | `/health` | Systemstatus prüfen |
| GET | `/` | API Informationen |

---

## 🎨 Swagger UI nutzen

### 1. Endpunkt auswählen
Klicke auf einen beliebigen Endpunkt in der Swagger UI.

### 2. "Try it out" aktivieren
Klicke auf den **"Try it out"** Button.

### 3. Parameter eingeben
Fülle die Request Body / Query Parameter aus.

**Beispiel - Neuen Schadensfall erstellen:**
```json
{
  "policyId": "507f1f77bcf86cd799439011",
  "policyNumber": "POL-2024-001234",
  "customerId": "507f1f77bcf86cd799439012",
  "customerName": "Max Mustermann",
  "claimType": "ACCIDENT",
  "claimAmount": 5000,
  "incidentDate": "2024-01-15T10:30:00Z",
  "description": "Autounfall auf der Autobahn A1"
}
```

### 4. Execute drücken
Klicke auf **"Execute"** und erhalte die Response.

---

## 🛠️ Für Entwickler

### Swagger Konfiguration

Die Swagger-Konfiguration befindet sich in `src/main.ts`:

```typescript
const config = new DocumentBuilder()
  .setTitle('Insurance Platform API')
  .setDescription('REST API für die CSS Insurance Demo Plattform')
  .setVersion('1.0')
  .addTag('claims', 'Schadensfälle verwalten')
  .addTag('policies', 'Versicherungspolicen verwalten')
  .addTag('offers', 'Versicherungsangebote verwalten')
  .addTag('health', 'Health Check Endpoint')
  .build();
```

### Controller Decorators

**Beispiel:**
```typescript
@ApiTags('claims')
@Controller('claims')
export class ClaimsController {
  
  @Post()
  @ApiOperation({ 
    summary: 'Neuen Schadensfall erstellen',
    description: 'Erstellt einen neuen Schadensfall...'
  })
  @ApiResponse({ status: 201, description: 'Erfolgreich erstellt' })
  @ApiResponse({ status: 400, description: 'Ungültige Daten' })
  @ApiBody({ type: CreateClaimDto })
  create(@Body() dto: CreateClaimDto) {
    // ...
  }
}
```

### DTO Decorators

**Beispiel:**
```typescript
export class CreateClaimDto {
  @ApiProperty({ 
    description: 'ID der zugehörigen Police',
    example: '507f1f77bcf86cd799439011'
  })
  @IsString()
  policyId: string;

  @ApiProperty({ 
    description: 'Schadenshöhe in CHF',
    example: 5000,
    minimum: 0
  })
  @IsNumber()
  @Min(0)
  claimAmount: number;
}
```

### Verfügbare Decorators

| Decorator | Verwendung |
|-----------|------------|
| `@ApiTags()` | Gruppiert Endpunkte |
| `@ApiOperation()` | Beschreibt Endpunkt |
| `@ApiResponse()` | Definiert Response |
| `@ApiParam()` | Path Parameter |
| `@ApiQuery()` | Query Parameter |
| `@ApiBody()` | Request Body Schema |
| `@ApiProperty()` | Pflichtfeld in DTO |
| `@ApiPropertyOptional()` | Optionales Feld in DTO |

---

## 📦 Installierte Pakete

```json
{
  "@nestjs/swagger": "^7.0.0",
  "swagger-ui-express": "^5.0.0"
}
```

---

## 🔧 Anpassungen

### Titel ändern
In `src/main.ts`:
```typescript
.setTitle('Dein Titel')
```

### Beschreibung ändern
```typescript
.setDescription('Deine Beschreibung')
```

### Server-URLs hinzufügen
```typescript
.addServer('https://api.staging.com', 'Staging')
.addServer('https://api.production.com', 'Production')
```

### Tags anpassen
```typescript
.addTag('myTag', 'Meine Beschreibung')
```

### UI-Theme anpassen
In `src/main.ts`:
```typescript
SwaggerModule.setup('api-docs', app, document, {
  customSiteTitle: 'Meine API Docs',
  customfavIcon: 'https://example.com/favicon.ico',
  customCss: '.swagger-ui .topbar { background-color: #000 }',
});
```

---

## 🌐 URLs

### Lokale Entwicklung
- **Backend API**: http://localhost:3000/api
- **Swagger UI**: http://localhost:3000/api-docs
- **Swagger JSON**: http://localhost:3000/api-docs-json
- **Health Check**: http://localhost:3000/health

### Production
URLs müssen in `src/main.ts` konfiguriert werden:
```typescript
.addServer('https://your-api.com', 'Production')
```

---

## 📝 OpenAPI JSON exportieren

Die OpenAPI Spezifikation ist verfügbar unter:

**http://localhost:3000/api-docs-json**

Du kannst diese JSON-Datei verwenden für:
- **Postman** - API Collections generieren
- **Code Generatoren** - Client SDKs generieren
- **Testing Tools** - Automatisierte Tests
- **API Gateways** - Import in Kong, AWS API Gateway, etc.

---

## 🧪 Testing mit Swagger

### Manuelles Testing
1. Öffne http://localhost:3000/api-docs
2. Wähle einen Endpunkt
3. Klicke "Try it out"
4. Fülle die Felder aus
5. Klicke "Execute"
6. Überprüfe die Response

### Automated Testing
Exportiere die OpenAPI JSON und verwende Tools wie:
- **Postman** - Collections generieren
- **Newman** - CLI Testing
- **Dredd** - API Contract Testing
- **Pact** - Consumer-Driven Contract Testing

---

## ✨ Best Practices

### 1. Beschreibungen auf Deutsch
✅ **Gut:**
```typescript
@ApiOperation({ 
  summary: 'Schadensfall erstellen',
  description: 'Erstellt einen neuen Schadensfall für eine Police'
})
```

❌ **Schlecht:**
```typescript
@ApiOperation({ summary: 'Create claim' })
```

### 2. Realistische Beispiele
✅ **Gut:**
```typescript
@ApiProperty({ 
  example: 'Max Mustermann',
  description: 'Name des Kunden'
})
```

❌ **Schlecht:**
```typescript
@ApiProperty({ example: 'string' })
```

### 3. Validation Rules dokumentieren
✅ **Gut:**
```typescript
@ApiProperty({ 
  minimum: 0,
  maximum: 1000000,
  description: 'Schadenshöhe in CHF'
})
@IsNumber()
@Min(0)
@Max(1000000)
amount: number;
```

### 4. Response Status Codes
✅ **Gut:**
```typescript
@ApiResponse({ status: 201, description: 'Erfolgreich erstellt' })
@ApiResponse({ status: 400, description: 'Ungültige Daten' })
@ApiResponse({ status: 404, description: 'Nicht gefunden' })
```

---

## 🆘 Troubleshooting

### Swagger UI lädt nicht
```bash
# 1. Dependencies prüfen
npm install

# 2. Backend neu starten
npm run start:dev

# 3. Browser Cache leeren
Ctrl+Shift+R (Hard Reload)
```

### Änderungen werden nicht angezeigt
```bash
# 1. Backend neu builden
npm run build

# 2. Dev Server neu starten
npm run start:dev

# 3. Browser aktualisieren
F5
```

### TypeScript Fehler
```bash
# 1. Type Declarations prüfen
npm install --save-dev @types/node

# 2. tsconfig.json prüfen
# Stelle sicher dass "experimentalDecorators": true

# 3. IDE neu laden
# VS Code: Ctrl+Shift+P -> "Reload Window"
# IntelliJ: File -> Invalidate Caches / Restart
```

---

## 📚 Weitere Ressourcen

### Dokumentation
- [NestJS OpenAPI Docs](https://docs.nestjs.com/openapi/introduction)
- [Swagger UI Docs](https://swagger.io/tools/swagger-ui/)
- [OpenAPI Specification](https://swagger.io/specification/)

### Tools
- [Swagger Editor](https://editor.swagger.io/) - OpenAPI online bearbeiten
- [Postman](https://www.postman.com/) - API Testing
- [Insomnia](https://insomnia.rest/) - REST Client
- [Stoplight](https://stoplight.io/) - API Design

---

## 🎉 Fertig!

Das Backend hat jetzt eine **professionelle, interaktive API-Dokumentation**!

### Nächste Schritte:
1. ✅ Backend starten: `npm run start:dev`
2. ✅ Swagger UI öffnen: http://localhost:3000/api-docs
3. ✅ API testen mit "Try it out"
4. ✅ OpenAPI JSON exportieren für Tools

**Viel Erfolg beim Entwickeln! 🚀**

