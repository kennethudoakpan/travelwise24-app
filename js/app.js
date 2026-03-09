/**
 * APP.JS — TravelWise24
 * Main controller. Bootstraps the app, wires up all events,
 * handles mode switching, location, and PWA install prompt.
 */

const App = (() => {

  let deferredInstallPrompt = null;
  let wiseOpen = false;

  // ============================
  // INIT
  // ============================

  function init() {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').catch(() => {});
    }

    // Render initial UI
    UI.updateGreeting();
    UI.updateLocationUI();

    // Show last used mode
    const savedMode = State.get('currentMode') || 'going-home';
    UI.showMode(savedMode);

    // Set up all event listeners
    bindEvents();

    // Check for URL params (PWA shortcut support)
    handleURLParams();

    // Wise welcome
    Wise.renderWelcome();

    // Update greeting every minute
    setInterval(UI.updateGreeting, 60000);
  }

  // ============================
  // EVENT BINDING
  // ============================

  function bindEvents() {

    // Mode tabs
    document.querySelectorAll('.mode-tab').forEach(tab => {
      tab.addEventListener('click', () => UI.showMode(tab.dataset.mode));
    });

    // Bottom nav
    document.querySelectorAll('.nav-item[data-mode]').forEach(item => {
      item.addEventListener('click', () => UI.showMode(item.dataset.mode));
    });

    // Wise open/close
    document.getElementById('wiseNavBtn').addEventListener('click', openWise);
    document.getElementById('wiseClose').addEventListener('click', closeWise);
    document.getElementById('overlay').addEventListener('click', closeWise);

    // Wise input
    document.getElementById('wiseSend').addEventListener('click', () => {
      const val = document.getElementById('wiseInput').value.trim();
      if (val) {
        Wise.send(val);
        document.getElementById('wiseInput').value = '';
        Wise.autoResize(document.getElementById('wiseInput'));
      }
    });

    document.getElementById('wiseInput').addEventListener('keydown', Wise.handleKey);
    document.getElementById('wiseInput').addEventListener('input', () => {
      Wise.autoResize(document.getElementById('wiseInput'));
    });

    document.getElementById('wiseMic').addEventListener('click', Wise.toggleMic);

    // Location toggle
    document.getElementById('locationToggle').addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('locationDropdown').classList.toggle('hidden');
    });

    document.querySelectorAll('.dropdown-option').forEach(opt => {
      opt.addEventListener('click', () => {
        const city = opt.dataset.city;
        const airport = opt.dataset.airport;
        const flag = opt.dataset.flag;
        const display = opt.textContent.trim().split(' ').slice(1).join(' ');

        State.setLocation(city, airport, flag, display);
        UI.updateLocationUI();
        UI.updateGreeting();

        // Update active state
        document.querySelectorAll('.dropdown-option').forEach(o => o.classList.remove('active'));
        opt.classList.add('active');

        document.getElementById('locationDropdown').classList.add('hidden');

        // Re-render current mode with new location
        UI.showMode(State.get('currentMode'));
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#locationToggle') && !e.target.closest('#locationDropdown')) {
        document.getElementById('locationDropdown').classList.add('hidden');
      }
    });

    // Saved button
    document.getElementById('savedBtn').addEventListener('click', showSaved);
    document.getElementById('savedNavBtn').addEventListener('click', showSaved);

    // PWA install
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredInstallPrompt = e;
      if (!State.get('installDismissed')) {
        setTimeout(() => {
          document.getElementById('installBanner').classList.remove('hidden');
        }, 3000);
      }
    });

    document.getElementById('installBtn').addEventListener('click', async () => {
      if (!deferredInstallPrompt) return;
      deferredInstallPrompt.prompt();
      const { outcome } = await deferredInstallPrompt.userChoice;
      if (outcome === 'accepted') {
        document.getElementById('installBanner').classList.add('hidden');
      }
      deferredInstallPrompt = null;
    });

    document.getElementById('installDismiss').addEventListener('click', () => {
      document.getElementById('installBanner').classList.add('hidden');
      State.set('installDismissed', true);
    });
  }

  // ============================
  // WISE PANEL
  // ============================

  function openWise() {
    document.getElementById('wisePanel').classList.remove('hidden');
    document.getElementById('overlay').classList.remove('hidden');
    wiseOpen = true;
    setTimeout(() => {
      document.getElementById('wiseInput').focus();
      const msgs = document.getElementById('wiseMessages');
      msgs.scrollTop = msgs.scrollHeight;
    }, 300);
  }

  function closeWise() {
    document.getElementById('wisePanel').classList.add('hidden');
    document.getElementById('overlay').classList.add('hidden');
    wiseOpen = false;
  }

  // ============================
  // SAVED TRIPS
  // ============================

  function showSaved() {
    const saved = State.get('savedTrips');
    const content = document.getElementById('contentSection');

    // Update tabs
    document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(t => t.classList.remove('active'));

    if (saved.length === 0) {
      content.innerHTML = `
        <div class="section-header">
          <h2 class="section-title">Saved <em>Trips</em></h2>
        </div>
        <div class="empty-state">
          <div class="empty-icon">♡</div>
          <h3>Nothing saved yet</h3>
          <p>Tap the heart icon on any flight route, destination, or venue to save it here.</p>
        </div>
      `;
      return;
    }

    let html = `
      <div class="section-header">
        <h2 class="section-title">Saved <em>Trips</em></h2>
        <span class="section-link" onclick="App.clearSaved()">Clear all</span>
      </div>
      <div class="route-cards">
    `;

    saved.forEach(trip => {
      html += `
        <div class="route-card">
          <div class="route-top">
            <div class="route-city-name">${trip.title}</div>
            <span class="route-tag">${trip.type}</span>
          </div>
          <div style="font-size:0.82rem;color:var(--muted);margin:0.4rem 0;">${trip.desc}</div>
          <div class="route-actions">
            <button class="btn-secondary" onclick="App.removeSaved('${trip.id}')">✕ Remove</button>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    content.innerHTML = html;
  }

  function clearSaved() {
    State.set('savedTrips', []);
    showSaved();
  }

  function removeSaved(id) {
    const trips = State.get('savedTrips').filter(t => t.id !== id);
    State.set('savedTrips', trips);
    showSaved();
  }

  // ============================
  // URL PARAMS (PWA shortcuts)
  // ============================

  function handleURLParams() {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');
    const openWiseParam = params.get('wise');

    if (mode) UI.showMode(mode);
    if (openWiseParam === 'open') setTimeout(openWise, 500);
  }

  // Run on DOM ready
  document.addEventListener('DOMContentLoaded', init);

  return { openWise, closeWise, showSaved, clearSaved, removeSaved };

})();