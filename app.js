// EventPro - Hauptanwendung mit Supabase Integration

// Warten bis DOM geladen ist
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Smooth Scrolling für Navigation
    setupSmoothScrolling();

    // Kontaktformular Setup
    setupContactForm();

    // Mobile Navigation (optional für zukünftige Erweiterung)
    setupMobileNav();
}

// Smooth Scrolling für Navigationslinks
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mobile Navigation Toggle
function setupMobileNav() {
    // Für zukünftige mobile Navigation
    // Wird aktiviert, wenn ein Hamburger-Menu hinzugefügt wird
}

// Kontaktformular mit Supabase Integration
function setupContactForm() {
    const form = document.querySelector('.contact-form');

    if (!form) {
        console.error('Kontaktformular nicht gefunden');
        return;
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Button während des Sendens deaktivieren
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Wird gesendet...';

        // Formulardaten sammeln
        const formData = {
            name: form.querySelector('input[type="text"]').value,
            email: form.querySelector('input[type="email"]').value,
            phone: form.querySelector('input[type="tel"]').value,
            event_type: form.querySelector('select').value,
            message: form.querySelector('textarea').value,
            created_at: new Date().toISOString()
        };

        try {
            // Daten in Supabase speichern
            const { data, error } = await supabase
                .from('contact_requests')
                .insert([formData]);

            if (error) {
                throw error;
            }

            // Erfolg anzeigen
            showSuccessMessage('Vielen Dank! Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns in Kürze bei Ihnen.');

            // Formular zurücksetzen
            form.reset();

        } catch (error) {
            console.error('Fehler beim Speichern:', error);

            // Benutzerfreundliche Fehlermeldung
            if (error.message.includes('Failed to fetch')) {
                showErrorMessage('Bitte überprüfen Sie Ihre Supabase-Konfiguration in supabase-config.js');
            } else {
                showErrorMessage('Es gab ein Problem beim Senden Ihrer Anfrage. Bitte versuchen Sie es später erneut.');
            }
        } finally {
            // Button wieder aktivieren
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}

// Erfolgsmeldung anzeigen
function showSuccessMessage(message) {
    showNotification(message, 'success');
}

// Fehlermeldung anzeigen
function showErrorMessage(message) {
    showNotification(message, 'error');
}

// Allgemeine Benachrichtigungsfunktion
function showNotification(message, type = 'info') {
    // Entferne alte Notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Erstelle neue Notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Füge zur Seite hinzu
    document.body.appendChild(notification);

    // Animation einblenden
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Nach 5 Sekunden automatisch ausblenden
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Optionale Funktionen für erweiterte Features

// Event-Liste aus Supabase laden (für zukünftige Erweiterung)
async function loadEvents() {
    try {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return data;
    } catch (error) {
        console.error('Fehler beim Laden der Events:', error);
        return [];
    }
}

// Event-Details abrufen
async function getEventById(eventId) {
    try {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .eq('id', eventId)
            .single();

        if (error) throw error;

        return data;
    } catch (error) {
        console.error('Fehler beim Laden des Events:', error);
        return null;
    }
}

// Statistiken aktualisieren (für Dashboard)
async function updateStats() {
    try {
        const { count, error } = await supabase
            .from('contact_requests')
            .select('*', { count: 'exact', head: true });

        if (error) throw error;

        // Statistiken können hier auf der Seite aktualisiert werden
        console.log('Anzahl Kontaktanfragen:', count);

    } catch (error) {
        console.error('Fehler beim Laden der Statistiken:', error);
    }
}
