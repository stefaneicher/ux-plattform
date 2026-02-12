# MCP Konfiguration für GitHub Copilot - Kurzanleitung

## ✅ Was wurde eingerichtet?

Dieses Repository wurde erfolgreich für die Verwendung von **MCP (Model Context Protocol)** mit GitHub Copilot konfiguriert. Der Render MCP Server ermöglicht es GitHub Copilot, direkt mit Ihren Render.com Deployments zu interagieren.

## 📁 Neue Dateien

1. **`.github/copilot/mcp-servers.json`** - MCP Server Konfiguration
2. **`.github/copilot/README.md`** - Ausführliche Dokumentation (Englisch)
3. **`.env.example`** - Beispiel für Umgebungsvariablen
4. **`README.md`** - Aktualisiert mit MCP-Abschnitt

## 🚀 Wie verwende ich es?

### Schritt 1: Render API Key erhalten

1. Gehen Sie zu [Render Dashboard](https://dashboard.render.com/u/settings#api-keys)
2. Erstellen Sie einen neuen API Key
3. Kopieren Sie den Key

### Schritt 2: API Key konfigurieren

**Option A: In der Shell-Konfiguration (empfohlen)**

Fügen Sie zu Ihrer `~/.bashrc` oder `~/.zshrc` hinzu:

```bash
export RENDER_API_KEY="ihr_render_api_key_hier"
```

**Option B: In VS Code Einstellungen**

Fügen Sie zu `settings.json` hinzu:

```json
{
  "github.copilot.advanced": {
    "mcp": {
      "env": {
        "RENDER_API_KEY": "ihr_render_api_key_hier"
      }
    }
  }
}
```

**Option C: Lokale .env Datei**

```bash
# .env Datei im Projektverzeichnis erstellen
cp .env.example .env

# API Key in .env eintragen
RENDER_API_KEY=ihr_render_api_key_hier
```

### Schritt 3: VS Code neu laden

Laden Sie VS Code neu, damit die Änderungen wirksam werden.

## 💬 Beispiele für GitHub Copilot Chat

Sobald konfiguriert, können Sie GitHub Copilot Fragen zu Ihren Render Deployments stellen:

### Deployment Status abfragen
```
Zeige mir den Status meiner Render Services
```

### Logs anzeigen
```
Was sind die neuesten Logs für meinen Backend Service?
```

### Services auflisten
```
Liste alle meine Render Deployments auf
```

### Environment Variables prüfen
```
Welche Environment Variables sind für den Frontend Service konfiguriert?
```

### Deployment auslösen
```
Starte ein neues Deployment für den Backend Service
```

## 🔒 Sicherheitshinweise

⚠️ **Wichtig:**

1. ✅ Der `.env` File ist bereits in `.gitignore` - API Keys werden nicht committed
2. ✅ Verwenden Sie Read-Only Keys, wenn Sie nur Informationen abrufen möchten
3. ✅ Rotieren Sie Ihre API Keys regelmäßig
4. ✅ Teilen Sie Ihre API Keys niemals öffentlich

## 📚 Weitere Dokumentation

- **Vollständige Anleitung**: [.github/copilot/README.md](.github/copilot/README.md)
- **MCP Dokumentation**: https://modelcontextprotocol.io/
- **Render API Docs**: https://api-docs.render.com/

## 🆘 Probleme?

### MCP Server funktioniert nicht

1. **API Key prüfen**: Ist `RENDER_API_KEY` korrekt gesetzt?
2. **VS Code neu starten**: Manchmal hilft ein Neustart
3. **Copilot Status prüfen**: Ist GitHub Copilot aktiviert und verbunden?
4. **Node.js prüfen**: Der MCP Server benötigt Node.js

### Häufige Fehler

**"Cannot find module '@render/mcp-server'"**
- Das Modul wird automatisch via `npx` installiert. Internetverbindung prüfen.

**"Authentication failed"**
- Render API Key überprüfen und korrekte Berechtigungen sicherstellen.

## ✨ Was ist neu?

Diese Konfiguration ermöglicht:

- ✅ Direkte Interaktion mit Render.com über GitHub Copilot
- ✅ Service-Management ohne Browser-Wechsel
- ✅ Schneller Zugriff auf Logs und Status
- ✅ Einfaches Deployment-Management
- ✅ Sichere API-Key-Verwaltung

---

**Erstellt am**: 12. Februar 2026  
**Version**: 1.0
