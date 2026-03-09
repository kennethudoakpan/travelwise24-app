/**
 * STATE.JS — TravelWise24
 * User preferences, memory, and persistence
 */

const State = (() => {

  const STORAGE_KEY = 'tw24_user';

  const defaults = {
    location: 'dublin',
    airport: 'DUB',
    locationFlag: '🇮🇪',
    locationDisplay: 'Dublin',
    budget: 300,
    homeCity: 'lagos',
    homeCountry: 'Nigeria',
    currentMode: 'going-home',
    savedTrips: [],
    vibesCategory: 'afrobeats',
    wiseConversation: [],
    installDismissed: false,
    name: '',
    onboarded: false
  };

  // Load from localStorage or use defaults
  let data = (() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...defaults, ...JSON.parse(stored) } : { ...defaults };
    } catch {
      return { ...defaults };
    }
  })();

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('State: Could not save to localStorage', e);
    }
  }

  function get(key) {
    return key ? data[key] : { ...data };
  }

  function set(key, value) {
    data[key] = value;
    save();
  }

  function saveTrip(trip) {
    const existing = data.savedTrips.findIndex(t => t.id === trip.id);
    if (existing >= 0) {
      data.savedTrips.splice(existing, 1); // toggle off
    } else {
      data.savedTrips.unshift({ ...trip, savedAt: Date.now() });
    }
    save();
    return existing < 0; // returns true if just saved
  }

  function isSaved(tripId) {
    return data.savedTrips.some(t => t.id === tripId);
  }

  function setLocation(city, airport, flag, display) {
    data.location = city;
    data.airport = airport;
    data.locationFlag = flag;
    data.locationDisplay = display;
    save();
  }

  function addWiseMessage(role, content) {
    data.wiseConversation.push({ role, content });
    // Keep last 20 messages only
    if (data.wiseConversation.length > 20) {
      data.wiseConversation = data.wiseConversation.slice(-20);
    }
    save();
  }

  function clearWiseConversation() {
    data.wiseConversation = [];
    save();
  }

  return { get, set, save, saveTrip, isSaved, setLocation, addWiseMessage, clearWiseConversation };

})();



