/**
 * UI.JS — TravelWise24
 * All DOM rendering, card generation, and UI updates
 */

const UI = (() => {

  // ============================
  // GREETING
  // ============================

  function updateGreeting() {
    const hour = new Date().getHours();
    const city = State.get('locationDisplay');
    let main, sub, tag;

    if (hour >= 5 && hour < 12) {
      main = 'Good morning ☀️';
      sub = 'Start your day with a trip in mind.';
    } else if (hour >= 12 && hour < 17) {
      main = 'Good afternoon 👋';
      sub = 'Where are you escaping to?';
    } else if (hour >= 17 && hour < 21) {
      main = 'Good evening 🌆';
      sub = 'Long shift? Let\'s plan something good.';
    } else {
      main = 'Still up? 🌙';
      sub = 'The best trips are planned at night.';
    }

    // Dynamic day-of-week messages
    const day = new Date().getDay();
    if (day === 5) sub = 'It\'s Friday — what\'s the plan? 🎉';
    if (day === 6) sub = 'It\'s Saturday — make it count.';
    if (day === 0) sub = 'Sunday — a good day to plan next weekend.';

    tag = `TRAVELWISE24 · ${city.toUpperCase()}`;

    document.getElementById('greetingTag').textContent = tag;
    document.getElementById('greetingMain').textContent = main;
    document.getElementById('greetingSub').textContent = sub;
  }

  // ============================
  // GOING HOME MODE
  // ============================

  function renderGoingHome() {
    const airport = State.get('airport');
    const routes = API.getRoutes(airport);
    const city = State.get('locationDisplay');
    const content = document.getElementById('contentSection');

    let html = `
      <div class="section-header">
        <h2 class="section-title">Going <em>Home</em></h2>
        <span class="section-link" onclick="UI.renderGoingHome()">↻ Refresh</span>
      </div>
      <div class="info-banner">
        ✈️ Routes from <strong>${city}</strong>. Prices are estimated ranges — check live fares for exact prices. Always book early for Africa routes.
      </div>
      <div class="route-cards">
    `;

    routes.forEach(route => {
      const saved = State.isSaved(route.id);
      const flightLink = API.getSkyscannerLink(route.from, route.to);
      const tagsHtml = route.tags.map(t => `<span class="route-tag">${t}</span>`).join('');

      html += `
        <div class="route-card">
          <div class="route-top">
            <div class="route-cities">
              <span class="route-city-name">${route.fromCity}</span>
              <span class="route-arrow">→</span>
              <span class="route-city-name">${route.toCity}</span>
            </div>
            <div class="route-flag">${route.flag}</div>
          </div>
          <div class="route-meta">
            ${tagsHtml}
            <span class="route-tag">✈ ${route.duration}</span>
            <span class="route-tag">${route.airlines.split(',')[0].trim()}</span>
          </div>
          <div class="route-price">
            <span class="route-price-amount">${route.estimatedPrice}</span>
            <span class="route-price-label">Estimated return</span>
          </div>
          <div class="route-tip">💡 ${route.tip}</div>
          <div class="route-meta" style="margin-top:0.2rem;">
            <span class="route-tag">🕐 ${route.bestTime}</span>
          </div>
          <div class="route-actions" style="margin-top:0.8rem;">
            <a class="btn-primary" href="${flightLink}" target="_blank" rel="noopener">
              ✈️ Search Flights
            </a>
            <button class="btn-secondary ${saved ? 'saved' : ''}" onclick="UI.toggleSave('${route.id}', this)" data-trip='${JSON.stringify({ id: route.id, type: 'route', title: route.fromCity + ' → ' + route.toCity, desc: route.estimatedPrice })}'>
              ${saved ? '♥ Saved' : '♡ Save'}
            </button>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    html += wisePromptHTML('Got questions about going home?', 'Ask Wise about visas, best timing, airlines, or anything else.');

    content.innerHTML = html;
  }

  // ============================
  // WEEKEND ESCAPE MODE
  // ============================

  function renderWeekendEscape() {
    const airport = State.get('airport');
    const city = State.get('locationDisplay');
    const escapes = API.getEscapes(airport);
    const content = document.getElementById('contentSection');

    let html = `
      <div class="section-header">
        <h2 class="section-title">Weekend <em>Escape</em></h2>
        <span class="section-link" onclick="UI.renderWeekendEscape()">↻ Refresh</span>
      </div>
      <div class="info-banner">
        🌍 Affordable getaways from <strong>${city}</strong>. Prices shown are flight estimates — check live for exact fares.
      </div>
      <div class="escape-cards">
    `;

    escapes.forEach(dest => {
      const flightLink = API.getSkyscannerLink(airport, dest.iata);
      const hotelLink = API.getBookingLink(dest.city);
      const actLink = API.getGetYourGuideLink(dest.city);
      const saved = State.isSaved(dest.id);
      const tagsHtml = dest.tags.map(t => `<span class="escape-tag">${t}</span>`).join('');

      html += `
        <div class="escape-card">
          <div class="escape-card-header">
            <div class="escape-destination">
              <span class="escape-flag">${dest.flag}</span>
              <div>
                <div class="escape-city">${dest.city}</div>
                <div class="escape-country">${dest.country}</div>
              </div>
            </div>
            <div class="escape-weather">
              <div class="escape-temp">${dest.weather.icon} ${dest.weather.temp}</div>
              <div class="escape-condition">Typical</div>
            </div>
          </div>
          <div class="escape-card-body">
            <div class="escape-pricing">
              <div class="price-item">
                <span class="price-icon">✈️</span>
                <span class="price-val">From ${dest.priceFrom}</span>
                <span class="price-type">return</span>
              </div>
              <div class="price-item">
                <span class="price-icon">🏨</span>
                <span class="price-val">${dest.hotelFrom}</span>
                <span class="price-type">hotel</span>
              </div>
              <div class="price-item">
                <span class="price-icon">⏱</span>
                <span class="price-val">${dest.flightDuration}</span>
                <span class="price-type">flight</span>
              </div>
            </div>
            <div class="escape-tags">${tagsHtml}</div>
            <div class="route-tip">💡 ${dest.highlight}</div>
            <div class="escape-actions" style="margin-top:0.8rem;">
              <a class="btn-flight" href="${flightLink}" target="_blank" rel="noopener">✈️ Flights</a>
              <a class="btn-hotel" href="${hotelLink}" target="_blank" rel="noopener">🏨 Hotels</a>
              <a class="btn-things" href="${actLink}" target="_blank" rel="noopener">🎯 Things To Do</a>
              <button class="btn-secondary ${saved ? 'saved' : ''}" onclick="UI.toggleSave('${dest.id}', this)" data-trip='${JSON.stringify({ id: dest.id, type: 'escape', title: dest.city + ', ' + dest.country, desc: 'From ' + dest.priceFrom })}' style="padding:0.55rem;">
                ${saved ? '♥' : '♡'}
              </button>
            </div>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    html += wisePromptHTML('Not sure where to go?', 'Tell Wise your mood, budget, and dates — get a personalised pick.');

    content.innerHTML = html;
  }

  // ============================
  // WEEKEND VIBES MODE
  // ============================

  function renderWeekendVibes(selectedCategory) {
    const city = State.get('location');
    const cat = selectedCategory || State.get('vibesCategory') || 'afrobeats';
    const content = document.getElementById('contentSection');

    const categories = [
      { id: 'afrobeats', icon: '🎵', name: 'Afrobeats & Clubs', desc: 'Dance the night away' },
      { id: 'restaurants', icon: '🍽️', name: 'Restaurants', desc: 'African & world food' },
      { id: 'bars', icon: '🍺', name: 'Pubs & Bars', desc: 'Good drinks, good vibes' },
      { id: 'activities', icon: '🎯', name: 'Activities', desc: 'Fun things to do' }
    ];

    const venues = API.getVibes(cat, city);
    const cityDisplay = State.get('locationDisplay');

    const catsHtml = categories.map(c => `
      <div class="vibes-cat-card ${c.id === cat ? 'active' : ''}" onclick="UI.renderWeekendVibes('${c.id}')">
        <span class="vibes-cat-icon">${c.icon}</span>
        <span class="vibes-cat-name">${c.name}</span>
        <span class="vibes-cat-desc">${c.desc}</span>
      </div>
    `).join('');

    const venuesHtml = venues.map(v => {
      const mapsLink = API.getGoogleMapsLink(v.mapQuery, cityDisplay);
      return `
        <div class="venue-card">
          <div class="venue-top">
            <span class="venue-name">${v.name}</span>
            <span class="venue-type">${v.type}</span>
          </div>
          <div class="venue-address">📍 ${v.address}</div>
          <div class="venue-actions">
            <a class="btn-maps" href="${mapsLink}" target="_blank" rel="noopener">📍 Open in Maps</a>
            <button class="btn-venue-save" onclick="UI.toggleSave('${v.id}', this)" data-trip='${JSON.stringify({ id: v.id, type: 'venue', title: v.name, desc: v.type + ' · ' + cityDisplay })}'>♡ Save</button>
          </div>
        </div>
      `;
    }).join('');

    const html = `
      <div class="section-header">
        <h2 class="section-title">Weekend <em>Vibes</em></h2>
        <span class="section-link">${cityDisplay}</span>
      </div>
      <div class="info-banner">
        🎉 Handpicked spots in <strong>${cityDisplay}</strong>. Tap "Open in Maps" to navigate and check opening hours.
      </div>
      <div class="vibes-categories">${catsHtml}</div>
      <div class="section-header" style="margin-bottom:0.8rem;">
        <h3 style="font-size:0.85rem;color:var(--muted);font-weight:300;">Showing in ${cityDisplay}</h3>
      </div>
      <div class="venue-cards">${venuesHtml}</div>
      ${wisePromptHTML('Need more suggestions?', 'Ask Wise for personalised nightlife, food, or activity picks for tonight.')}
    `;

    State.set('vibesCategory', cat);
    content.innerHTML = html;
  }

  // ============================
  // HELPERS
  // ============================

  function wisePromptHTML(title, subtitle) {
    return `
      <div class="wise-prompt" onclick="App.openWise()">
        <div class="wise-prompt-icon">✈️</div>
        <div class="wise-prompt-text">
          <strong>${title}</strong>
          <span>${subtitle}</span>
        </div>
        <span class="wise-prompt-arrow">→</span>
      </div>
    `;
  }

  function toggleSave(id, btn) {
    const tripData = JSON.parse(btn.getAttribute('data-trip'));
    const justSaved = State.saveTrip(tripData);
    btn.textContent = justSaved ? (btn.textContent.includes('Save') ? '♥ Saved' : '♥') : (btn.textContent.includes('Save') ? '♡ Save' : '♡');
    btn.classList.toggle('saved', justSaved);
  }

  function showMode(mode) {
    // Update tabs
    document.querySelectorAll('.mode-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.mode === mode);
    });
    document.querySelectorAll('.nav-item[data-mode]').forEach(item => {
      item.classList.toggle('active', item.dataset.mode === mode);
    });

    // Render appropriate content
    if (mode === 'going-home') renderGoingHome();
    else if (mode === 'weekend-escape') renderWeekendEscape();
    else if (mode === 'weekend-vibes') renderWeekendVibes();

    State.set('currentMode', mode);
  }

  function updateLocationUI() {
    document.getElementById('locationFlag').textContent = State.get('locationFlag');
    document.getElementById('locationName').textContent = State.get('locationDisplay');
  }

  return {
    updateGreeting,
    renderGoingHome,
    renderWeekendEscape,
    renderWeekendVibes,
    showMode,
    updateLocationUI,
    toggleSave,
    wisePromptHTML
  };

})();