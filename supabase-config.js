// Supabase Konfiguration
// WICHTIG: Ersetze diese Werte mit deinen eigenen Supabase-Zugangsdaten
// Du findest diese in deinem Supabase Dashboard unter Settings > API

const SUPABASE_URL = 'DEINE_SUPABASE_URL_HIER'; // z.B. https://xxxxxxxxxxxxx.supabase.co
const SUPABASE_ANON_KEY = 'DEIN_SUPABASE_ANON_KEY_HIER'; // Dein anon/public key

// Supabase Client initialisieren
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
