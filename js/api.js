/**
 * API.JS — TravelWise24
 * Data layer: Going Home routes, Weekend Escapes, Weekend Vibes,
 * affiliate link builders, and OpenWeather integration.
 */

const API = (() => {

  // ============================
  // GOING HOME ROUTES DATA
  // ============================

  const GOING_HOME_ROUTES = {
    DUB: [
      {
        id: 'dub-los',
        from: 'DUB', fromCity: 'Dublin',
        to: 'LOS', toCity: 'Lagos', toCountry: 'Nigeria', flag: '🇳🇬',
        estimatedPrice: '€650 – €950',
        bestTime: 'Book 8–12 weeks ahead',
        tip: 'Cheapest months: Feb, March, Oct. December prices spike early — book by September.',
        airlines: 'Ethiopian, Turkish Airlines, British Airways',
        duration: '~11h via hub',
        tags: ['Most Popular', 'Via Istanbul/Addis']
      },
      {
        id: 'dub-abv',
        from: 'DUB', fromCity: 'Dublin',
        to: 'ABV', toCity: 'Abuja', toCountry: 'Nigeria', flag: '🇳🇬',
        estimatedPrice: '€700 – €1,050',
        bestTime: 'Book 10–14 weeks ahead',
        tip: 'Often connects via London Heathrow or Istanbul. Check both.',
        airlines: 'Turkish Airlines, Lufthansa, KLM',
        duration: '~12h via hub',
        tags: ['Via LHR or IST']
      },
      {
        id: 'dub-acc',
        from: 'DUB', fromCity: 'Dublin',
        to: 'ACC', toCity: 'Accra', toCountry: 'Ghana', flag: '🇬🇭',
        estimatedPrice: '€600 – €850',
        bestTime: 'Book 6–10 weeks ahead',
        tip: 'Good options via Amsterdam or Paris. Brussels Airlines also worth checking.',
        airlines: 'KLM, Air France, Brussels Airlines',
        duration: '~10h via hub',
        tags: ['Via AMS or CDG']
      },
      {
        id: 'dub-nbo',
        from: 'DUB', fromCity: 'Dublin',
        to: 'NBO', toCity: 'Nairobi', toCountry: 'Kenya', flag: '🇰🇪',
        estimatedPrice: '€550 – €800',
        bestTime: 'Book 6–8 weeks ahead',
        tip: 'Great Kenyan and Ethiopian options. Often cheaper than West Africa routes.',
        airlines: 'Kenya Airways, Ethiopian Airlines',
        duration: '~10h via hub',
        tags: ['Good Value', 'East Africa']
      }
    ],
    LHR: [
      {
        id: 'lhr-los',
        from: 'LHR', fromCity: 'London',
        to: 'LOS', toCity: 'Lagos', toCountry: 'Nigeria', flag: '🇳🇬',
        estimatedPrice: '£500 – £780',
        bestTime: 'Book 8–12 weeks ahead',
        tip: 'Direct flights available with British Airways and Virgin. More options than Dublin.',
        airlines: 'British Airways, Virgin Atlantic, Air Peace',
        duration: '~6.5h direct',
        tags: ['Direct Available', 'Most Frequent']
      },
      {
        id: 'lhr-abv',
        from: 'LHR', fromCity: 'London',
        to: 'ABV', toCity: 'Abuja', toCountry: 'Nigeria', flag: '🇳🇬',
        estimatedPrice: '£520 – £820',
        bestTime: 'Book 8–10 weeks ahead',
        tip: 'British Airways and Air Peace both fly direct. Check both for best price.',
        airlines: 'British Airways, Air Peace, Ethiopian',
        duration: '~7h direct',
        tags: ['Direct Available']
      },
      {
        id: 'lhr-acc',
        from: 'LHR', fromCity: 'London',
        to: 'ACC', toCity: 'Accra', toCountry: 'Ghana', flag: '🇬🇭',
        estimatedPrice: '£450 – £700',
        bestTime: 'Book 6–10 weeks ahead',
        tip: 'British Airways flies direct. Good value if booked early.',
        airlines: 'British Airways, KLM, Air France',
        duration: '~6.5h direct',
        tags: ['Direct Available']
      },
      {
        id: 'lhr-nbo',
        from: 'LHR', fromCity: 'London',
        to: 'NBO', toCity: 'Nairobi', toCountry: 'Kenya', flag: '🇰🇪',
        estimatedPrice: '£380 – £620',
        bestTime: 'Book 4–8 weeks ahead',
        tip: 'One of the best value African routes from London. Kenya Airways is excellent.',
        airlines: 'Kenya Airways, British Airways, Ethiopian',
        duration: '~8.5h direct',
        tags: ['Best Value', 'Direct Available']
      }
    ],
    MAN: [
      {
        id: 'man-los',
        from: 'MAN', fromCity: 'Manchester',
        to: 'LOS', toCity: 'Lagos', toCountry: 'Nigeria', flag: '🇳🇬',
        estimatedPrice: '£550 – £850',
        bestTime: 'Book 8–12 weeks ahead',
        tip: 'Usually connects via London or Amsterdam. Flying to Heathrow first can be cheaper.',
        airlines: 'Turkish Airlines, KLM, Ethiopian',
        duration: '~11h via hub',
        tags: ['Via Hub']
      }
    ],
    BHX: [
      {
        id: 'bhx-los',
        from: 'BHX', fromCity: 'Birmingham',
        to: 'LOS', toCity: 'Lagos', toCountry: 'Nigeria', flag: '🇳🇬',
        estimatedPrice: '£570 – £880',
        bestTime: 'Book 8–12 weeks ahead',
        tip: 'Consider driving to Heathrow for more direct options. Turkish Airlines flies via IST.',
        airlines: 'Turkish Airlines, KLM',
        duration: '~13h via hub',
        tags: ['Via Istanbul or AMS']
      }
    ]
  };

  // ============================
  // WEEKEND ESCAPE DESTINATIONS
  // ============================

  const ESCAPE_DESTINATIONS = {
    DUB: [
      {
        id: 'dub-lis',
        city: 'Lisbon', country: 'Portugal', flag: '🇵🇹', iata: 'LIS',
        priceFrom: '€89', hotelFrom: '€70/night',
        vibe: 'Culture, Fado music, incredible food & nightlife',
        tags: ['Budget Friendly', 'Short Flight', 'Sunny'],
        weather: { temp: '22°C', icon: '☀️' },
        flightDuration: '2h 20m',
        highlight: 'Perfect for a 3-night escape. Taxis are cheap, the food is unreal.'
      },
      {
        id: 'dub-bcn',
        city: 'Barcelona', country: 'Spain', flag: '🇪🇸', iata: 'BCN',
        priceFrom: '€79', hotelFrom: '€85/night',
        vibe: 'Architecture, beach, incredible nightlife, Afrobeats nights',
        tags: ['Nightlife', 'Beach', 'Culture'],
        weather: { temp: '24°C', icon: '☀️' },
        flightDuration: '2h 30m',
        highlight: 'Great Afrobeats scene. Beach by day, clubs by night.'
      },
      {
        id: 'dub-agp',
        city: 'Malaga', country: 'Spain', flag: '🇪🇸', iata: 'AGP',
        priceFrom: '€65', hotelFrom: '€60/night',
        vibe: 'Sun, beaches, tapas, relaxed Spanish lifestyle',
        tags: ['Most Affordable', 'Beach', 'Relax'],
        weather: { temp: '25°C', icon: '☀️' },
        flightDuration: '2h 40m',
        highlight: 'Best value sun escape from Dublin. Ryanair flies direct regularly.'
      },
      {
        id: 'dub-opo',
        city: 'Porto', country: 'Portugal', flag: '🇵🇹', iata: 'OPO',
        priceFrom: '€69', hotelFrom: '€65/night',
        vibe: 'Wine, riverside walks, stunning architecture',
        tags: ['Culture', 'Romantic', 'Budget'],
        weather: { temp: '20°C', icon: '🌤️' },
        flightDuration: '2h 15m',
        highlight: 'Quieter than Lisbon, just as beautiful. Great for couples.'
      },
      {
        id: 'dub-fco',
        city: 'Rome', country: 'Italy', flag: '🇮🇹', iata: 'FCO',
        priceFrom: '€99', hotelFrom: '€90/night',
        vibe: 'History, incredible food, Roman culture',
        tags: ['Culture', 'Food', 'Experience'],
        weather: { temp: '23°C', icon: '☀️' },
        flightDuration: '2h 50m',
        highlight: 'A weekend in Rome will change you. Go at least once.'
      },
      {
        id: 'dub-ams',
        city: 'Amsterdam', country: 'Netherlands', flag: '🇳🇱', iata: 'AMS',
        priceFrom: '€59', hotelFrom: '€95/night',
        vibe: 'Canals, museums, great nightlife, big African community',
        tags: ['Afro-Community', 'Culture', 'Nightlife'],
        weather: { temp: '16°C', icon: '⛅' },
        flightDuration: '1h 40m',
        highlight: 'Large Nigerian/African community. Great food and vibes.'
      }
    ],
    LHR: [
      {
        id: 'lhr-mad',
        city: 'Madrid', country: 'Spain', flag: '🇪🇸', iata: 'MAD',
        priceFrom: '£49', hotelFrom: '£75/night',
        vibe: 'Culture, art, nightlife — Madrid never sleeps',
        tags: ['Nightlife', 'Culture', 'Affordable'],
        weather: { temp: '26°C', icon: '☀️' },
        flightDuration: '2h 20m',
        highlight: 'Incredible city. Dinner at midnight is normal here. Your vibe.'
      },
      {
        id: 'lhr-lis',
        city: 'Lisbon', country: 'Portugal', flag: '🇵🇹', iata: 'LIS',
        priceFrom: '£55', hotelFrom: '£70/night',
        vibe: 'Culture, Fado music, amazing food scene',
        tags: ['Culture', 'Romantic', 'Sun'],
        weather: { temp: '22°C', icon: '☀️' },
        flightDuration: '2h 30m',
        highlight: 'Short haul but feels like a real escape. Great food and warm vibes.'
      },
      {
        id: 'lhr-dxb',
        city: 'Dubai', country: 'UAE', flag: '🇦🇪', iata: 'DXB',
        priceFrom: '£199', hotelFrom: '£120/night',
        vibe: 'Luxury, malls, incredible food, massive Nigerian community',
        tags: ['Luxury', 'Nigerian Scene', 'Shopping'],
        weather: { temp: '34°C', icon: '☀️' },
        flightDuration: '6h 50m',
        highlight: 'Massive Nigerian and African community. Great food, nightlife, and shopping.'
      },
      {
        id: 'lhr-bcn',
        city: 'Barcelona', country: 'Spain', flag: '🇪🇸', iata: 'BCN',
        priceFrom: '£59', hotelFrom: '£85/night',
        vibe: 'Beach, architecture, incredible nightlife',
        tags: ['Beach', 'Nightlife', 'Popular'],
        weather: { temp: '24°C', icon: '☀️' },
        flightDuration: '2h 15m',
        highlight: 'One of the most popular weekend escapes from London.'
      },
      {
        id: 'lhr-cdg',
        city: 'Paris', country: 'France', flag: '🇫🇷', iata: 'CDG',
        priceFrom: '£49', hotelFrom: '£110/night',
        vibe: 'Fashion, food, romance — the classic European city break',
        tags: ['Romantic', 'Classic', 'Culture'],
        weather: { temp: '18°C', icon: '🌤️' },
        flightDuration: '1h 15m',
        highlight: 'Close, affordable to fly, and endlessly impressive. Worth it.'
      }
    ]
  };

  // ============================
  // WEEKEND VIBES DATA
  // ============================

  const VIBES_DATA = {
    afrobeats: {
      dublin: [
        { id: 'v1', name: 'Opium', type: 'Club & Bar', address: 'Adam & Eve\'s, Merchant\'s Quay, Dublin 8', mapQuery: 'Opium+Dublin' },
        { id: 'v2', name: 'District 8', type: 'Nightclub', address: 'Merchants Quay, Dublin 8', mapQuery: 'District+8+Dublin' },
        { id: 'v3', name: 'The Academy', type: 'Live Venue', address: '57 Middle Abbey St, Dublin 1', mapQuery: 'The+Academy+Dublin' },
        { id: 'v4', name: 'Copper Face Jacks', type: 'Nightclub', address: 'Jackson Court Hotel, Harcourt St', mapQuery: 'Copper+Face+Jacks+Dublin' }
      ],
      london: [
        { id: 'v5', name: 'Fabric', type: 'Nightclub', address: '77a Charterhouse St, Farringdon, London', mapQuery: 'Fabric+London+Nightclub' },
        { id: 'v6', name: 'XOYO', type: 'Club', address: '32-37 Cowper St, London EC2A 4AP', mapQuery: 'XOYO+London' },
        { id: 'v7', name: 'Ministry of Sound', type: 'Iconic Club', address: '103 Gaunt St, London SE1 6DP', mapQuery: 'Ministry+of+Sound+London' },
        { id: 'v8', name: 'Jazz Cafe', type: 'Live Music & Club', address: '5 Parkway, Camden, London NW1', mapQuery: 'Jazz+Cafe+Camden+London' }
      ]
    },
    restaurants: {
      dublin: [
        { id: 'r1', name: 'Neon', type: 'Asian Fusion', address: '17 Camden St Lower, Dublin 2', mapQuery: 'Neon+Dublin+Restaurant' },
        { id: 'r2', name: 'Ukiyo', type: 'Japanese & Pan-Asian', address: 'Exchequer St, Dublin 2', mapQuery: 'Ukiyo+Dublin' },
        { id: 'r3', name: 'Klaw Poke', type: 'Seafood & Casual', address: '5 Crown Alley, Temple Bar', mapQuery: 'Klaw+Poke+Dublin' },
        { id: 'r4', name: 'Rust & Ruin', type: 'Modern Irish', address: 'Fade St, Dublin 2', mapQuery: 'Rust+and+Ruin+Dublin' }
      ],
      london: [
        { id: 'r5', name: 'Ikoyi', type: 'West African Fine Dining', address: '1 St James\'s Market, London SW1Y 4AH', mapQuery: 'Ikoyi+Restaurant+London' },
        { id: 'r6', name: 'Chuku\'s', type: 'Nigerian Tapas', address: '274 High Rd, Tottenham, London', mapQuery: 'Chukus+Nigerian+Tapas+London' },
        { id: 'r7', name: 'Akoko', type: 'West African Fine Dining', address: '21 Berners St, Fitzrovia, London', mapQuery: 'Akoko+Restaurant+London' },
        { id: 'r8', name: '805 Restaurant', type: 'Nigerian Cuisine', address: '805 Old Kent Rd, London SE15', mapQuery: '805+Restaurant+London+Nigerian' }
      ]
    },
    bars: {
      dublin: [
        { id: 'b1', name: 'The Long Hall', type: 'Classic Pub', address: '51 S Great George\'s St, Dublin 2', mapQuery: 'The+Long+Hall+Dublin' },
        { id: 'b2', name: 'Against the Grain', type: 'Craft Beer Bar', address: '11 Wexford St, Dublin 2', mapQuery: 'Against+The+Grain+Dublin' },
        { id: 'b3', name: 'Bowes Bar', type: 'Traditional Pub', address: '31 Fleet St, Temple Bar', mapQuery: 'Bowes+Bar+Dublin' },
        { id: 'b4', name: 'The Bernard Shaw', type: 'Hip Bar & Terrace', address: '11/12 S Richmond St, Portobello', mapQuery: 'Bernard+Shaw+Dublin' }
      ],
      london: [
        { id: 'b5', name: 'Callooh Callay', type: 'Cocktail Bar', address: '65 Rivington St, Shoreditch', mapQuery: 'Callooh+Callay+London' },
        { id: 'b6', name: 'Nightjar', type: 'Jazz & Cocktails', address: '129 City Rd, London EC1V 1JB', mapQuery: 'Nightjar+Bar+London' },
        { id: 'b7', name: 'Happiness Forgets', type: 'Underground Bar', address: '8-9 Hoxton Square, London N1', mapQuery: 'Happiness+Forgets+London' },
        { id: 'b8', name: 'The Effra Social', type: 'Community Pub', address: '38 Kellett Rd, Brixton, London', mapQuery: 'Effra+Social+Brixton' }
      ]
    },
    activities: {
      dublin: [
        { id: 'a1', name: 'Howth Cliff Walk', type: 'Nature Walk', address: 'Howth Head, Dublin (DART to Howth)', mapQuery: 'Howth+Cliff+Walk+Dublin' },
        { id: 'a2', name: 'National Gallery of Ireland', type: 'Art & Culture', address: 'Merrion Square W, Dublin 2', mapQuery: 'National+Gallery+Ireland+Dublin' },
        { id: 'a3', name: 'Escape Rooms Dublin', type: 'Entertainment', address: 'Various locations across Dublin', mapQuery: 'Escape+Rooms+Dublin' },
        { id: 'a4', name: 'Croke Park Tour', type: 'Sports & History', address: 'Jones\'s Rd, Dublin 3', mapQuery: 'Croke+Park+Stadium+Tour+Dublin' }
      ],
      london: [
        { id: 'a5', name: 'Sky Garden', type: 'Free Views & Garden', address: '20 Fenchurch St, London EC3M 8AF', mapQuery: 'Sky+Garden+London' },
        { id: 'a6', name: 'Columbia Road Market', type: 'Sunday Market', address: 'Columbia Rd, Bethnal Green, E2', mapQuery: 'Columbia+Road+Flower+Market+London' },
        { id: 'a7', name: 'Tate Modern', type: 'Art Gallery', address: 'Bankside, London SE1 9TG', mapQuery: 'Tate+Modern+London' },
        { id: 'a8', name: 'Brixton Market', type: 'Afro-Caribbean Market', address: 'Electric Ave, Brixton, London SW9', mapQuery: 'Brixton+Market+London' }
      ]
    }
  };

  // ============================
  // AFFILIATE LINK BUILDERS
  // ============================

  function getSkyscannerLink(fromIata, toIata) {
    const from = fromIata.toLowerCase();
    const to = toIata.toLowerCase();
    // Skyscanner affiliate redirect format
    return `https://www.skyscanner.net/transport/flights/${from}/${to}/?adultsv2=1&cabinclass=economy&rtn=1&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false`;
  }

  function getBookingLink(city) {
    return `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(city)}&checkin_monthday=&checkout_monthday=&group_adults=2&no_rooms=1&group_children=0`;
  }

  function getGetYourGuideLink(city) {
    return `https://www.getyourguide.com/s/?q=${encodeURIComponent(city)}&searchSource=2`;
  }

  function getGoogleMapsLink(query, city) {
    return `https://www.google.com/maps/search/${encodeURIComponent(query + ' ' + city)}`;
  }

  // ============================
  // WEATHER (OpenWeather free tier)
  // NOTE: Replace 'YOUR_OWL_API_KEY' with your free OpenWeather API key
  // Get one free at: https://openweathermap.org/api
  // ============================

  const OWM_KEY = 'YOUR_OWL_API_KEY'; // Replace this

  async function getWeather(city) {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OWM_KEY}&units=metric`
      );
      if (!res.ok) throw new Error('Weather fetch failed');
      const data = await res.json();
      return {
        temp: `${Math.round(data.main.temp)}°C`,
        condition: data.weather[0].description,
        icon: getWeatherEmoji(data.weather[0].main)
      };
    } catch {
      // Return placeholder if API not set up yet
      return { temp: '--°C', condition: 'Check forecast', icon: '🌤️' };
    }
  }

  function getWeatherEmoji(condition) {
    const map = {
      Clear: '☀️', Clouds: '⛅', Rain: '🌧️', Drizzle: '🌦️',
      Thunderstorm: '⛈️', Snow: '❄️', Mist: '🌫️', Haze: '🌫️'
    };
    return map[condition] || '🌤️';
  }

  // ============================
  // PUBLIC API
  // ============================

  function getRoutes(airport) {
    return GOING_HOME_ROUTES[airport] || GOING_HOME_ROUTES['DUB'];
  }

  function getEscapes(airport) {
    return ESCAPE_DESTINATIONS[airport] || ESCAPE_DESTINATIONS['DUB'];
  }

  function getVibes(category, city) {
    const catData = VIBES_DATA[category];
    if (!catData) return [];
    return catData[city] || catData['dublin'];
  }

  return {
    getRoutes,
    getEscapes,
    getVibes,
    getSkyscannerLink,
    getBookingLink,
    getGetYourGuideLink,
    getGoogleMapsLink,
    getWeather
  };

})();