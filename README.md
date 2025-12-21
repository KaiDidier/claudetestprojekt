# EventPro - Event Management Landing Page

Eine moderne Landing Page für Event-Management mit Supabase-Integration.

## Features

- ✨ Moderne, responsive Benutzeroberfläche
- 📝 Kontaktformular mit Supabase-Datenbankanbindung
- 🎯 Smooth Scrolling Navigation
- 📱 Mobile-First Design
- 🔔 Toast-Benachrichtigungen für Benutzer-Feedback

## Technologien

- HTML5
- CSS3 (Custom Properties, Flexbox, Grid)
- Vanilla JavaScript
- Supabase (Backend as a Service)

## Setup-Anleitung

### 1. Supabase-Projekt erstellen

1. Gehe zu [supabase.com](https://supabase.com) und erstelle einen kostenlosen Account
2. Erstelle ein neues Projekt
3. Warte, bis das Projekt vollständig eingerichtet ist (ca. 2 Minuten)

### 2. Datenbank-Tabelle erstellen

Führe folgende SQL-Abfrage im Supabase SQL Editor aus (zu finden unter "SQL Editor" in der Seitenleiste):

```sql
-- Tabelle für Kontaktanfragen erstellen
CREATE TABLE contact_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    event_type TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index für bessere Performance bei Datums-Abfragen
CREATE INDEX idx_contact_requests_created_at ON contact_requests(created_at DESC);

-- RLS (Row Level Security) Policies
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Jeder darf Einträge erstellen (für Kontaktformular)
CREATE POLICY "Jeder kann Kontaktanfragen erstellen"
    ON contact_requests
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Policy: Nur authentifizierte Nutzer können lesen (für Admin-Dashboard)
CREATE POLICY "Authentifizierte Nutzer können Kontaktanfragen lesen"
    ON contact_requests
    FOR SELECT
    TO authenticated
    USING (true);
```

### 3. Supabase-Zugangsdaten konfigurieren

1. Gehe in deinem Supabase-Projekt zu **Settings** → **API**
2. Kopiere folgende Werte:
   - **Project URL** (z.B. `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon public** Key

3. Öffne die Datei `supabase-config.js` und ersetze die Platzhalter:

```javascript
const SUPABASE_URL = 'https://dein-projekt.supabase.co';
const SUPABASE_ANON_KEY = 'dein-anon-key-hier';
```

### 4. Projekt lokal testen

Da das Projekt nur aus statischen Dateien besteht, kannst du es einfach öffnen:

**Option 1: Direkt im Browser**
```bash
# Öffne index.html direkt im Browser
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

**Option 2: Mit lokalem Server (empfohlen)**
```bash
# Mit Python
python -m http.server 8000

# Mit Node.js (npx)
npx http-server

# Mit PHP
php -S localhost:8000
```

Öffne dann `http://localhost:8000` im Browser.

### 5. Kontaktformular testen

1. Öffne die Webseite
2. Scrolle zum Kontaktformular
3. Fülle alle Felder aus
4. Klicke auf "Anfrage senden"
5. Du solltest eine Erfolgsmeldung sehen

### 6. Daten in Supabase überprüfen

1. Gehe zu deinem Supabase-Projekt
2. Klicke auf **Table Editor** in der Seitenleiste
3. Wähle die Tabelle `contact_requests`
4. Du solltest deine Testeinträge sehen

## Projektstruktur

```
eventpro/
├── index.html              # Haupt-HTML-Datei
├── styles.css              # Alle CSS-Styles
├── app.js                  # Hauptanwendungs-JavaScript
├── supabase-config.js      # Supabase-Konfiguration
└── README.md               # Diese Datei
```

## Weitere Features (Optional)

### Admin-Dashboard erstellen

Wenn du die Kontaktanfragen verwalten möchtest, kannst du ein einfaches Admin-Dashboard erstellen:

1. Erstelle eine neue Datei `admin.html`
2. Nutze die Supabase-Authentication für Login
3. Verwende die bereitgestellten Funktionen in `app.js`:
   - `loadEvents()` - Lädt alle Events
   - `getEventById(id)` - Lädt ein spezifisches Event

### Events-Tabelle hinzufügen

Um tatsächliche Events zu verwalten, erstelle eine weitere Tabelle:

```sql
CREATE TABLE events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    event_type TEXT NOT NULL,
    date TIMESTAMPTZ,
    location TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Jeder kann Events lesen
CREATE POLICY "Jeder kann Events lesen"
    ON events
    FOR SELECT
    TO anon
    USING (true);
```

## Deployment

### Option 1: Netlify
1. Pushe deinen Code auf GitHub
2. Verbinde dein Repository mit Netlify
3. Deploy! (Build-Befehle nicht nötig, da statische Seite)

### Option 2: Vercel
1. Installiere Vercel CLI: `npm i -g vercel`
2. Führe aus: `vercel`
3. Folge den Anweisungen

### Option 3: GitHub Pages
1. Pushe Code auf GitHub
2. Gehe zu Repository Settings → Pages
3. Wähle Branch und Ordner
4. GitHub Pages URL wird generiert

**Wichtig:** Vergiss nicht, `supabase-config.js` mit den richtigen Produktions-Werten zu aktualisieren!

## Sicherheitshinweise

- ⚠️ Der `anon` Key ist öffentlich und kann im Frontend verwendet werden
- 🔒 Nutze Row Level Security (RLS) Policies, um Daten zu schützen
- 🔑 Für Admin-Funktionen: Nutze Supabase Authentication
- ❌ Verwende NIEMALS den `service_role` Key im Frontend!

## Support und Dokumentation

- [Supabase Dokumentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

## Lizenz

MIT

## Autor

EventPro Team
