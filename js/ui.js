/**
 * UI.JS — TravelWise24
 * All DOM rendering, card generation, and UI updates.
 */
 
const UI = (() => {
 
  // ============================
  // GREETING
  // ============================
 
  function updateGreeting() {
    const hour = new Date().getHours();
    const city = State.get('locationDisplay');
    let main, sub;
 
    if (hour >= 5 && hour < 12)       { main = 'Good morning ☀️';  sub = 'Start your day with a trip in mind.'; }
    else if (hour >= 12 && hour < 17) { main = 'Good afternoon 👋'; sub = 'Where are you escaping to?'; }
    else if (hour >= 17 && hour < 21) { main = 'Good evening 🌆';   sub = "Long shift? Let's plan something good."; }
    else                              { main = 'Still up? 🌙';       sub = 'The best trips are planned at night.'; }
 
    const day = new Date().getDay();
    if (day === 5) sub = "It's Friday — what's the plan? 🎉";
    if (day === 6) sub = "It's Saturday — make it count.";
    if (day === 0) sub = 'Sunday — a good day to plan next weekend.';
 
    document.getElementById('greetingTag').textContent  = `TRAVELWISE24 · ${city.toUpperCase()}`;
    document.getElementById('greetingMain').textContent = main;
    document.getElementById('greetingSub').textContent  = sub;
  }
 
  // ============================
  // GOING HOME MODE
  // ============================
 
  function renderGoingHome() {
    const airport = State.get('airport');
    const routes  = API.getRoutes(airport);
    const city    = State.get('locationDisplay');
    const content = document.getElementById('contentSection');
    const guide   = API.getAirportGuide(airport);
 
    let html = `
      <div class="section-header">
        <h2 class="section-title">Going <em>Home</em></h2>
        <span class="section-link" onclick="UI.renderGoingHome()">↻ Refresh</span>
      </div>
      <div class="info-banner">
        ✈️ Routes from <strong>${city}</strong>. Prices are estimated ranges — check live fares for exact prices.
      </div>
    `;
 
    if (guide) {
      html += `
        <button class="airport-guide-banner" onclick="UI.renderAirportGuide('${airport}')">
          ${guide.flag} <strong>${guide.name} Guide</strong>
          <span>Transport, lounges &amp; tips →</span>
        </button>
      `;
    }
 
    html += `<div class="route-cards">`;
 
    routes.forEach(route => {
      const saved      = State.isSaved(route.id);
      const flightLink = API.getFlightLink(route.from, route.to);
      const tagsHtml   = route.tags.map(t => `<span class="route-tag">${t}</span>`).join('');
 
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
            <a class="btn-primary" href="${flightLink}" target="_blank" rel="noopener">✈️ Search Flights</a>
            <button class="btn-secondary ${saved ? 'saved' : ''}"
              onclick="UI.toggleSave('${route.id}', this)"
              data-trip='${JSON.stringify({ id: route.id, type: 'route', title: route.fromCity + ' → ' + route.toCity, desc: route.estimatedPrice })}'>
              ${saved ? '♥ Saved' : '♡ Save'}
            </button>
          </div>
          <button class="btn-ask-wise" onclick="Wise.sendChip('Tell me about flying from ${route.fromCity} to ${route.toCity} — best airlines, price and timing'); App.openWise()">
            Ask Wise about this route
          </button>
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
    const city    = State.get('locationDisplay');
    const escapes = API.getEscapes(airport);
    const content = document.getElementById('contentSection');
 
    let html = `
      <div class="section-header">
        <h2 class="section-title">Weekend <em>Escape</em></h2>
        <span class="section-link" onclick="UI.renderWeekendEscape()">↻ Refresh</span>
      </div>
      <div class="info-banner">
        🌍 Affordable getaways from <strong>${city}</strong>. Prices are flight estimates — check live for exact fares.
      </div>
      <div class="escape-cards">
    `;
 
    escapes.forEach(dest => {
      const flightLink = API.getFlightLink(airport, dest.iata);
      const hotelLink  = API.getHotelLink(dest.city);
      const actLink    = API.getTripLink();
      const saved      = State.isSaved(dest.id);
      const tagsHtml   = dest.tags.map(t => `<span class="escape-tag">${t}</span>`).join('');
 
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
              <div class="price-item"><span class="price-icon">✈️</span><span class="price-val">From ${dest.priceFrom}</span><span class="price-type">return</span></div>
              <div class="price-item"><span class="price-icon">🏨</span><span class="price-val">${dest.hotelFrom}</span><span class="price-type">hotel</span></div>
              <div class="price-item"><span class="price-icon">⏱</span><span class="price-val">${dest.flightDuration}</span><span class="price-type">flight</span></div>
            </div>
            <div class="escape-tags">${tagsHtml}</div>
            <div class="route-tip">💡 ${dest.highlight}</div>
            <div class="escape-actions" style="margin-top:0.8rem;">
              <a class="btn-flight" href="${flightLink}" target="_blank" rel="noopener">✈️ Flights</a>
              <a class="btn-hotel"  href="${hotelLink}"  target="_blank" rel="noopener">🏨 Hotels</a>
              <a class="btn-things" href="${actLink}"    target="_blank" rel="noopener">🎯 Things To Do</a>
              <button class="btn-secondary ${saved ? 'saved' : ''}"
                onclick="UI.toggleSave('${dest.id}', this)"
                data-trip='${JSON.stringify({ id: dest.id, type: 'escape', title: dest.city + ', ' + dest.country, desc: 'From ' + dest.priceFrom })}'
                style="padding:0.55rem;">
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
    const city    = State.get('location');
    const cat     = selectedCategory || State.get('vibesCategory') || 'afrobeats';
    const content = document.getElementById('contentSection');
 
    const categories = [
      { id: 'afrobeats',   icon: '🎵', name: 'Afrobeats & Clubs', desc: 'Dance the night away' },
      { id: 'restaurants', icon: '🍽️', name: 'Restaurants',       desc: 'African & world food' },
      { id: 'bars',        icon: '🍺', name: 'Pubs & Bars',        desc: 'Good drinks, good vibes' },
      { id: 'activities',  icon: '🎯', name: 'Activities',         desc: 'Fun things to do' }
    ];
 
    const venues      = API.getVibes(cat, city);
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
            <button class="btn-venue-save" onclick="UI.toggleSave('${v.id}', this)"
              data-trip='${JSON.stringify({ id: v.id, type: 'venue', title: v.name, desc: v.type + ' · ' + cityDisplay })}'>♡ Save</button>
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
  // EVENTS MODE
  // ============================
 
  function renderEvents(selectedCountry) {
    const content = document.getElementById('contentSection');
    const country = selectedCountry || 'all';
 
    const countries = [
      { id: 'all',            label: 'All Events',   flag: '🌍' },
      { id: 'Ireland',        label: 'Ireland',      flag: '🇮🇪' },
      { id: 'United Kingdom', label: 'UK',           flag: '🇬🇧' },
      { id: 'Nigeria',        label: 'Nigeria',      flag: '🇳🇬' },
      { id: 'South Africa',   label: 'South Africa', flag: '🇿🇦' },
      { id: 'Egypt',          label: 'Egypt',        flag: '🇪🇬' },
      { id: 'Australia',      label: 'Australia',    flag: '🇦🇺' },
      { id: 'Canada',         label: 'Canada',       flag: '🇨🇦' },
      { id: 'USA',            label: 'USA',          flag: '🇺🇸' },
    ];
 
    const events = API.getEvents(country);
 
    const filtersHtml = countries.map(c => `
      <button class="event-filter ${c.id === country ? 'active' : ''}" onclick="UI.renderEvents('${c.id}')">
        ${c.flag} ${c.label}
      </button>
    `).join('');
 
    const eventsHtml = events.length === 0
      ? `<div class="empty-state"><div class="empty-icon">🎟️</div><h3>No events yet</h3><p>Check back soon or ask Wise about events in this country.</p></div>`
      : events.map(ev => {
          const dateStr = new Date(ev.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
          return `
            <div class="event-card">
              <div class="event-card-top">
                <div class="event-icon">${ev.icon}</div>
                <div class="event-meta-right">
                  <span class="event-category">${ev.category}</span>
                  <span class="event-country">${ev.flag} ${ev.city}</span>
                </div>
              </div>
              <h3 class="event-title">${ev.title}</h3>
              <p class="event-desc">${ev.desc}</p>
              <div class="event-details">
                <span class="event-detail">📅 ${dateStr}</span>
                <span class="event-detail">📍 ${ev.venue}</span>
                <span class="event-detail">🎟️ ${ev.price}</span>
              </div>
              <div class="event-actions">
                <a class="btn-primary" href="${ev.ticketUrl}" target="_blank" rel="noopener">🎟️ Get Tickets</a>
                <button class="btn-secondary" onclick="Wise.sendChip('Tell me about ${ev.title} in ${ev.city} — is it worth attending and what should I know?'); App.openWise()">Ask Wise</button>
              </div>
            </div>
          `;
        }).join('');
 
    content.innerHTML = `
      <div class="section-header">
        <h2 class="section-title">Live <em>Events</em></h2>
        <span class="section-link" onclick="UI.renderEvents('all')">View all</span>
      </div>
      <div class="info-banner">
        🎟️ Events across Africa, Europe and the diaspora. Tap <strong>Get Tickets</strong> to book or <strong>Ask Wise</strong> for info.
      </div>
      <div class="event-filters">${filtersHtml}</div>
      <div class="event-cards">${eventsHtml}</div>
      ${wisePromptHTML('Planning to attend an event?', 'Ask Wise about travel, accommodation, and how to get there.')}
      <div class="event-promo-card">
        <div class="event-promo-icon">📣</div>
        <div class="event-promo-text">
          <strong>Are you an event organiser?</strong>
          <span>Get your event listed on TravelWise24 and reach thousands of diaspora travellers.</span>
        </div>
        <button class="event-promo-btn" onclick="Wise.sendChip('I want to list my event on TravelWise24 — how do I get started?'); App.openWise()">List Your Event</button>
      </div>
    `;
  }
 
  // ============================
  // AIRPORT GUIDE
  // ============================
 
  function renderAirportGuide(airportCode) {
    const content = document.getElementById('contentSection');
    const guide   = API.getAirportGuide(airportCode);
 
    if (!guide) {
      content.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">✈️</div>
          <h3>Airport guide coming soon</h3>
          <p>We're adding more airports. Ask Wise for tips in the meantime.</p>
        </div>
      `;
      return;
    }
 
    const transportHtml = guide.transport.map(t => `
      <div class="airport-transport-item">
        <span class="airport-transport-icon">${t.icon}</span>
        <div class="airport-transport-info">
          <strong>${t.name}</strong>
          <span>${t.desc}</span>
        </div>
      </div>
    `).join('');
 
    const loungesHtml = guide.lounges.map(l => `<span class="airport-lounge-tag">${l}</span>`).join('');
    const tipsHtml    = guide.tips.map(t => `<li class="airport-tip">💡 ${t}</li>`).join('');
 
    content.innerHTML = `
      <div class="section-header">
        <h2 class="section-title">${guide.flag} ${guide.name}</h2>
        <span class="section-link" onclick="UI.renderGoingHome()">← Back</span>
      </div>
 
      <div class="airport-section">
        <p class="airport-section-label">🏗️ Terminals</p>
        <p class="airport-section-value">${guide.terminals}</p>
      </div>
 
      <div class="airport-section">
        <p class="airport-section-label">🚗 Getting to the city</p>
        <div class="airport-transport-list">${transportHtml}</div>
      </div>
 
      <div class="airport-section">
        <p class="airport-section-label">🛋️ Airport lounges</p>
        <div class="airport-lounges">${loungesHtml}</div>
      </div>
 
      <div class="airport-section">
        <p class="airport-section-label">📋 Tips for this airport</p>
        <ul class="airport-tips-list">${tipsHtml}</ul>
      </div>
 
      <button class="wise-ask-airport-btn" onclick="Wise.sendChip('${guide.wiseChip}'); App.openWise()">
        ✈️ Ask Wise about ${guide.name}
      </button>
 
      ${wisePromptHTML('Have a specific question?', 'Wise knows check-in times, fast-track security, lounge access and more.')}
    `;
  }
 
  // ============================
  // HERO HELPERS
  // ============================
 
  function openHeroFlight() {
    const section = document.getElementById('flightWidget');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      section.classList.add('highlight');
      setTimeout(() => section.classList.remove('highlight'), 2000);
    }
  }
 
  function openHeroHotel() {
    const airport  = State.get('airport');
    const routes   = API.getRoutes(airport);
    const topRoute = routes[0];
    if (topRoute) window.open(API.getHotelLink(topRoute.toCity), '_blank', 'noopener');
  }
 
  // ============================
  // SHARED HELPERS
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
    const tripData  = JSON.parse(btn.getAttribute('data-trip'));
    const justSaved = State.saveTrip(tripData);
    btn.textContent = justSaved
      ? (btn.textContent.includes('Save') ? '♥ Saved' : '♥')
      : (btn.textContent.includes('Save') ? '♡ Save' : '♡');
    btn.classList.toggle('saved', justSaved);
  }
 
  function showMode(mode) {
    document.querySelectorAll('.mode-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.mode === mode);
    });
    document.querySelectorAll('.nav-item[data-mode]').forEach(item => {
      item.classList.toggle('active', item.dataset.mode === mode);
    });
 
    if      (mode === 'going-home')     renderGoingHome();
    else if (mode === 'weekend-escape') renderWeekendEscape();
    else if (mode === 'weekend-vibes')  renderWeekendVibes();
    else if (mode === 'events')         renderEvents();
 
    State.set('currentMode', mode);
  }
 
  function updateLocationUI() {
    document.getElementById('locationFlag').textContent = State.get('locationFlag');
    document.getElementById('locationName').textContent = State.get('locationDisplay');
  }
 
  return {
    updateGreeting, renderGoingHome, renderWeekendEscape, renderWeekendVibes,
    renderEvents, renderAirportGuide,
    showMode, updateLocationUI, toggleSave, wisePromptHTML,
    openHeroFlight, openHeroHotel
  };
 
})();