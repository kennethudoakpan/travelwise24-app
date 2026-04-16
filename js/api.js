/**
 * API.JS — TravelWise24
 * Data layer: routes, escapes, vibes, events, airport guides,
 * affiliate link builders.
 */
 
const API = (() => {
 
  // ============================
  // GOING HOME ROUTES
  // ============================
 
  const GOING_HOME_ROUTES = {
    DUB: [
      { id: 'dub-los', from: 'DUB', fromCity: 'Dublin', to: 'LOS', toCity: 'Lagos',    toCountry: 'Nigeria', flag: '🇳🇬', estimatedPrice: '€650 – €950',   bestTime: 'Book 8–12 weeks ahead', tip: 'Cheapest months: Feb, March, Oct. December prices spike early — book by September.', airlines: 'Ethiopian, Turkish Airlines, British Airways', duration: '~11h via hub', tags: ['Most Popular', 'Via Istanbul/Addis'] },
      { id: 'dub-abv', from: 'DUB', fromCity: 'Dublin', to: 'ABV', toCity: 'Abuja',    toCountry: 'Nigeria', flag: '🇳🇬', estimatedPrice: '€700 – €1,050',  bestTime: 'Book 10–14 weeks ahead', tip: 'Often connects via London Heathrow or Istanbul. Check both.', airlines: 'Turkish Airlines, Lufthansa, KLM', duration: '~12h via hub', tags: ['Via LHR or IST'] },
      { id: 'dub-acc', from: 'DUB', fromCity: 'Dublin', to: 'ACC', toCity: 'Accra',    toCountry: 'Ghana',   flag: '🇬🇭', estimatedPrice: '€600 – €850',   bestTime: 'Book 6–10 weeks ahead', tip: 'Good options via Amsterdam or Paris. Brussels Airlines also worth checking.', airlines: 'KLM, Air France, Brussels Airlines', duration: '~10h via hub', tags: ['Via AMS or CDG'] },
      { id: 'dub-nbo', from: 'DUB', fromCity: 'Dublin', to: 'NBO', toCity: 'Nairobi',  toCountry: 'Kenya',   flag: '🇰🇪', estimatedPrice: '€550 – €800',   bestTime: 'Book 6–8 weeks ahead',  tip: 'Great Kenyan and Ethiopian options. Often cheaper than West Africa routes.', airlines: 'Kenya Airways, Ethiopian Airlines', duration: '~10h via hub', tags: ['Good Value', 'East Africa'] }
    ],
    LHR: [
      { id: 'lhr-los', from: 'LHR', fromCity: 'London', to: 'LOS', toCity: 'Lagos',    toCountry: 'Nigeria', flag: '🇳🇬', estimatedPrice: '£500 – £780',   bestTime: 'Book 8–12 weeks ahead', tip: 'Direct flights available with British Airways and Virgin. More options than Dublin.', airlines: 'British Airways, Virgin Atlantic, Air Peace', duration: '~6.5h direct', tags: ['Direct Available', 'Most Frequent'] },
      { id: 'lhr-abv', from: 'LHR', fromCity: 'London', to: 'ABV', toCity: 'Abuja',    toCountry: 'Nigeria', flag: '🇳🇬', estimatedPrice: '£520 – £820',   bestTime: 'Book 8–10 weeks ahead', tip: 'British Airways and Air Peace both fly direct. Check both for best price.', airlines: 'British Airways, Air Peace, Ethiopian', duration: '~7h direct', tags: ['Direct Available'] },
      { id: 'lhr-acc', from: 'LHR', fromCity: 'London', to: 'ACC', toCity: 'Accra',    toCountry: 'Ghana',   flag: '🇬🇭', estimatedPrice: '£450 – £700',   bestTime: 'Book 6–10 weeks ahead', tip: 'British Airways flies direct. Good value if booked early.', airlines: 'British Airways, KLM, Air France', duration: '~6.5h direct', tags: ['Direct Available'] },
      { id: 'lhr-nbo', from: 'LHR', fromCity: 'London', to: 'NBO', toCity: 'Nairobi',  toCountry: 'Kenya',   flag: '🇰🇪', estimatedPrice: '£380 – £620',   bestTime: 'Book 4–8 weeks ahead',  tip: 'One of the best value African routes from London. Kenya Airways is excellent.', airlines: 'Kenya Airways, British Airways, Ethiopian', duration: '~8.5h direct', tags: ['Best Value', 'Direct Available'] }
    ],
    MAN: [
      { id: 'man-los', from: 'MAN', fromCity: 'Manchester', to: 'LOS', toCity: 'Lagos', toCountry: 'Nigeria', flag: '🇳🇬', estimatedPrice: '£550 – £850',   bestTime: 'Book 8–12 weeks ahead', tip: 'Usually connects via London or Amsterdam. Flying to Heathrow first can be cheaper.', airlines: 'Turkish Airlines, KLM, Ethiopian', duration: '~11h via hub', tags: ['Via Hub'] }
    ],
    BHX: [
      { id: 'bhx-los', from: 'BHX', fromCity: 'Birmingham', to: 'LOS', toCity: 'Lagos', toCountry: 'Nigeria', flag: '🇳🇬', estimatedPrice: '£570 – £880',  bestTime: 'Book 8–12 weeks ahead', tip: 'Consider driving to Heathrow for more direct options. Turkish Airlines flies via IST.', airlines: 'Turkish Airlines, KLM', duration: '~13h via hub', tags: ['Via Istanbul or AMS'] }
    ]
  };
 
  // ============================
  // WEEKEND ESCAPE DESTINATIONS
  // ============================
 
  const ESCAPE_DESTINATIONS = {
    DUB: [
      { id: 'dub-lis', city: 'Lisbon',    country: 'Portugal',     flag: '🇵🇹', iata: 'LIS', priceFrom: '€89',  hotelFrom: '€70/night', tags: ['Budget Friendly', 'Short Flight', 'Sunny'],        weather: { temp: '22°C', icon: '☀️' }, flightDuration: '2h 20m', highlight: 'Perfect for a 3-night escape. Taxis are cheap, the food is unreal.' },
      { id: 'dub-bcn', city: 'Barcelona', country: 'Spain',        flag: '🇪🇸', iata: 'BCN', priceFrom: '€79',  hotelFrom: '€85/night', tags: ['Nightlife', 'Beach', 'Culture'],                  weather: { temp: '24°C', icon: '☀️' }, flightDuration: '2h 30m', highlight: 'Great Afrobeats scene. Beach by day, clubs by night.' },
      { id: 'dub-agp', city: 'Malaga',    country: 'Spain',        flag: '🇪🇸', iata: 'AGP', priceFrom: '€65',  hotelFrom: '€60/night', tags: ['Most Affordable', 'Beach', 'Relax'],              weather: { temp: '25°C', icon: '☀️' }, flightDuration: '2h 40m', highlight: 'Best value sun escape from Dublin. Ryanair flies direct regularly.' },
      { id: 'dub-opo', city: 'Porto',     country: 'Portugal',     flag: '🇵🇹', iata: 'OPO', priceFrom: '€69',  hotelFrom: '€65/night', tags: ['Culture', 'Romantic', 'Budget'],                  weather: { temp: '20°C', icon: '🌤️' }, flightDuration: '2h 15m', highlight: 'Quieter than Lisbon, just as beautiful. Great for couples.' },
      { id: 'dub-fco', city: 'Rome',      country: 'Italy',        flag: '🇮🇹', iata: 'FCO', priceFrom: '€99',  hotelFrom: '€90/night', tags: ['Culture', 'Food', 'Experience'],                  weather: { temp: '23°C', icon: '☀️' }, flightDuration: '2h 50m', highlight: 'A weekend in Rome will change you. Go at least once.' },
      { id: 'dub-ams', city: 'Amsterdam', country: 'Netherlands',  flag: '🇳🇱', iata: 'AMS', priceFrom: '€59',  hotelFrom: '€95/night', tags: ['Afro-Community', 'Culture', 'Nightlife'],          weather: { temp: '16°C', icon: '⛅' }, flightDuration: '1h 40m', highlight: 'Large Nigerian/African community. Great food and vibes.' }
    ],
    LHR: [
      { id: 'lhr-mad', city: 'Madrid',    country: 'Spain',        flag: '🇪🇸', iata: 'MAD', priceFrom: '£49',  hotelFrom: '£75/night', tags: ['Nightlife', 'Culture', 'Affordable'],              weather: { temp: '26°C', icon: '☀️' }, flightDuration: '2h 20m', highlight: 'Incredible city. Dinner at midnight is normal here. Your vibe.' },
      { id: 'lhr-lis', city: 'Lisbon',    country: 'Portugal',     flag: '🇵🇹', iata: 'LIS', priceFrom: '£55',  hotelFrom: '£70/night', tags: ['Culture', 'Romantic', 'Sun'],                     weather: { temp: '22°C', icon: '☀️' }, flightDuration: '2h 30m', highlight: 'Short haul but feels like a real escape. Great food and warm vibes.' },
      { id: 'lhr-dxb', city: 'Dubai',     country: 'UAE',          flag: '🇦🇪', iata: 'DXB', priceFrom: '£199', hotelFrom: '£120/night', tags: ['Luxury', 'Nigerian Scene', 'Shopping'],           weather: { temp: '34°C', icon: '☀️' }, flightDuration: '6h 50m', highlight: 'Massive African community. Great food, nightlife, and shopping.' },
      { id: 'lhr-bcn', city: 'Barcelona', country: 'Spain',        flag: '🇪🇸', iata: 'BCN', priceFrom: '£59',  hotelFrom: '£85/night', tags: ['Beach', 'Nightlife', 'Popular'],                  weather: { temp: '24°C', icon: '☀️' }, flightDuration: '2h 15m', highlight: 'One of the most popular weekend escapes from London.' },
      { id: 'lhr-cdg', city: 'Paris',     country: 'France',       flag: '🇫🇷', iata: 'CDG', priceFrom: '£49',  hotelFrom: '£110/night', tags: ['Romantic', 'Classic', 'Culture'],                 weather: { temp: '18°C', icon: '🌤️' }, flightDuration: '1h 15m', highlight: 'Close, affordable to fly, and endlessly impressive. Worth it.' }
    ]
  };
 
  // ============================
  // WEEKEND VIBES
  // ============================
 
  const VIBES_DATA = {
    afrobeats: {
      dublin: [
        { id: 'v1', name: 'Opium',           type: 'Club & Bar',    address: "Adam & Eve's, Merchant's Quay, Dublin 8",  mapQuery: 'Opium+Dublin' },
        { id: 'v2', name: 'District 8',       type: 'Nightclub',     address: 'Merchants Quay, Dublin 8',                mapQuery: 'District+8+Dublin' },
        { id: 'v3', name: 'The Academy',      type: 'Live Venue',    address: '57 Middle Abbey St, Dublin 1',            mapQuery: 'The+Academy+Dublin' },
        { id: 'v4', name: 'Copper Face Jacks',type: 'Nightclub',     address: 'Jackson Court Hotel, Harcourt St',        mapQuery: 'Copper+Face+Jacks+Dublin' }
      ],
      london: [
        { id: 'v5', name: 'Fabric',           type: 'Nightclub',     address: '77a Charterhouse St, Farringdon',         mapQuery: 'Fabric+London+Nightclub' },
        { id: 'v6', name: 'XOYO',             type: 'Club',          address: '32-37 Cowper St, London EC2A',            mapQuery: 'XOYO+London' },
        { id: 'v7', name: 'Ministry of Sound',type: 'Iconic Club',   address: '103 Gaunt St, London SE1',                mapQuery: 'Ministry+of+Sound+London' },
        { id: 'v8', name: 'Jazz Cafe',         type: 'Live Music',    address: '5 Parkway, Camden, London NW1',           mapQuery: 'Jazz+Cafe+Camden+London' }
      ]
    },
    restaurants: {
      dublin: [
        { id: 'r1', name: 'Neon',             type: 'Asian Fusion',       address: '17 Camden St Lower, Dublin 2',           mapQuery: 'Neon+Dublin+Restaurant' },
        { id: 'r2', name: 'Ukiyo',            type: 'Japanese & Pan-Asian',address: 'Exchequer St, Dublin 2',                mapQuery: 'Ukiyo+Dublin' },
        { id: 'r3', name: 'Klaw Poke',        type: 'Seafood & Casual',   address: '5 Crown Alley, Temple Bar',              mapQuery: 'Klaw+Poke+Dublin' },
        { id: 'r4', name: 'Rust & Ruin',      type: 'Modern Irish',       address: 'Fade St, Dublin 2',                      mapQuery: 'Rust+and+Ruin+Dublin' }
      ],
      london: [
        { id: 'r5', name: 'Ikoyi',            type: 'West African Fine Dining', address: "1 St James's Market, London SW1Y", mapQuery: 'Ikoyi+Restaurant+London' },
        { id: 'r6', name: "Chuku's",          type: 'Nigerian Tapas',     address: '274 High Rd, Tottenham, London',         mapQuery: 'Chukus+Nigerian+Tapas+London' },
        { id: 'r7', name: 'Akoko',            type: 'West African Fine Dining', address: '21 Berners St, Fitzrovia',         mapQuery: 'Akoko+Restaurant+London' },
        { id: 'r8', name: '805 Restaurant',   type: 'Nigerian Cuisine',   address: '805 Old Kent Rd, London SE15',           mapQuery: '805+Restaurant+London+Nigerian' }
      ]
    },
    bars: {
      dublin: [
        { id: 'b1', name: 'The Long Hall',    type: 'Classic Pub',   address: "51 S Great George's St, Dublin 2",        mapQuery: 'The+Long+Hall+Dublin' },
        { id: 'b2', name: 'Against the Grain',type: 'Craft Beer Bar',address: '11 Wexford St, Dublin 2',                 mapQuery: 'Against+The+Grain+Dublin' },
        { id: 'b3', name: 'Bowes Bar',        type: 'Traditional Pub',address: '31 Fleet St, Temple Bar',                mapQuery: 'Bowes+Bar+Dublin' },
        { id: 'b4', name: 'The Bernard Shaw', type: 'Hip Bar & Terrace',address: '11/12 S Richmond St, Portobello',      mapQuery: 'Bernard+Shaw+Dublin' }
      ],
      london: [
        { id: 'b5', name: 'Callooh Callay',   type: 'Cocktail Bar',  address: '65 Rivington St, Shoreditch',             mapQuery: 'Callooh+Callay+London' },
        { id: 'b6', name: 'Nightjar',         type: 'Jazz & Cocktails',address: '129 City Rd, London EC1V',              mapQuery: 'Nightjar+Bar+London' },
        { id: 'b7', name: 'Happiness Forgets',type: 'Underground Bar',address: '8-9 Hoxton Square, London N1',           mapQuery: 'Happiness+Forgets+London' },
        { id: 'b8', name: 'The Effra Social', type: 'Community Pub', address: '38 Kellett Rd, Brixton, London',          mapQuery: 'Effra+Social+Brixton' }
      ]
    },
    activities: {
      dublin: [
        { id: 'a1', name: 'Howth Cliff Walk',         type: 'Nature Walk',   address: 'Howth Head, Dublin (DART to Howth)',  mapQuery: 'Howth+Cliff+Walk+Dublin' },
        { id: 'a2', name: 'National Gallery of Ireland',type: 'Art & Culture',address: 'Merrion Square W, Dublin 2',         mapQuery: 'National+Gallery+Ireland+Dublin' },
        { id: 'a3', name: 'Escape Rooms Dublin',      type: 'Entertainment', address: 'Various locations across Dublin',     mapQuery: 'Escape+Rooms+Dublin' },
        { id: 'a4', name: 'Croke Park Tour',          type: 'Sports & History',address: "Jones's Rd, Dublin 3",             mapQuery: 'Croke+Park+Stadium+Tour+Dublin' }
      ],
      london: [
        { id: 'a5', name: 'Sky Garden',               type: 'Free Views',    address: '20 Fenchurch St, London EC3M',       mapQuery: 'Sky+Garden+London' },
        { id: 'a6', name: 'Columbia Road Market',     type: 'Sunday Market', address: 'Columbia Rd, Bethnal Green, E2',     mapQuery: 'Columbia+Road+Flower+Market+London' },
        { id: 'a7', name: 'Tate Modern',              type: 'Art Gallery',   address: 'Bankside, London SE1 9TG',            mapQuery: 'Tate+Modern+London' },
        { id: 'a8', name: 'Brixton Market',           type: 'Afro-Caribbean Market', address: 'Electric Ave, Brixton SW9',  mapQuery: 'Brixton+Market+London' }
      ]
    }
  };
 
  // ============================
  // EVENTS DATA
  // ============================
 
  const EVENTS_DATA = [
    { id: 'ev1',  country: 'Nigeria',        city: 'Lagos',         flag: '🇳🇬', icon: '🎵', category: 'Concert',   title: 'Afrobeats Fest Lagos',                 date: '2026-05-10', venue: 'Eko Convention Centre',         desc: 'Annual Afrobeats festival featuring top Nigerian artists.',             ticketUrl: 'https://www.eventbrite.com',              price: '₦15,000' },
    { id: 'ev2',  country: 'Nigeria',        city: 'Abuja',         flag: '🇳🇬', icon: '🍽️', category: 'Festival',  title: 'Abuja Food & Culture Fair',            date: '2026-06-20', venue: 'Millennium Park, Abuja',         desc: 'Celebrating Nigerian cuisine, culture and entertainment.',              ticketUrl: 'https://www.eventbrite.com',              price: 'Free' },
    { id: 'ev3',  country: 'South Africa',   city: 'Johannesburg',  flag: '🇿🇦', icon: '🎷', category: 'Concert',   title: 'Joburg Jazz Festival',                 date: '2026-05-25', venue: 'Newtown Music Factory',          desc: 'World-class jazz artists across 3 stages in the heart of Joburg.',     ticketUrl: 'https://www.computicket.com',             price: 'R350' },
    { id: 'ev4',  country: 'South Africa',   city: 'Cape Town',     flag: '🇿🇦', icon: '🎧', category: 'Concert',   title: 'Cape Town Electronic Music Festival',  date: '2026-07-04', venue: 'Cape Town Stadium',              desc: 'International DJs and local acts for a 2-day festival.',               ticketUrl: 'https://www.computicket.com',             price: 'R500' },
    { id: 'ev5',  country: 'Egypt',          city: 'Cairo',         flag: '🇪🇬', icon: '🎬', category: 'Culture',   title: 'Cairo International Film Festival',    date: '2026-11-14', venue: 'Cairo Opera House',              desc: "One of Africa's most prestigious film festivals.",                     ticketUrl: 'https://www.ciff.org.eg',                 price: 'EGP 200' },
    { id: 'ev6',  country: 'Egypt',          city: 'Cairo',         flag: '🇪🇬', icon: '✨', category: 'Experience', title: 'Sound & Light Show — Pyramids',       date: '2026-05-01', venue: 'Giza Pyramids',                  desc: 'Nightly light show at the Pyramids of Giza. Truly unmissable.',         ticketUrl: 'https://www.soundandlight.show',          price: 'EGP 550' },
    { id: 'ev7',  country: 'Ireland',        city: 'Dublin',        flag: '🇮🇪', icon: '🎵', category: 'Club Night', title: 'Afrobeats Night at Opium',             date: '2026-05-03', venue: 'Opium, Dame Court, Dublin',      desc: "Dublin's biggest Afrobeats night. Every first Saturday of the month.", ticketUrl: 'https://www.opium.ie',                    price: '€15' },
    { id: 'ev8',  country: 'Ireland',        city: 'Dublin',        flag: '🇮🇪', icon: '🎉', category: 'Cultural',  title: 'Nigerian Independence Gala',           date: '2026-10-02', venue: 'Clayton Hotel, Burlington Rd',   desc: 'Annual Nigerian community independence gala dinner and awards.',        ticketUrl: 'https://www.eventbrite.ie',               price: '€60' },
    { id: 'ev9',  country: 'United Kingdom', city: 'London',        flag: '🇬🇧', icon: '🎵', category: 'Concert',   title: 'Afrobeats at O2 Academy Brixton',      date: '2026-06-14', venue: 'O2 Academy Brixton',             desc: 'Sold-out Afrobeats concert featuring top African artists.',             ticketUrl: 'https://www.ticketmaster.co.uk',          price: '£45' },
    { id: 'ev10', country: 'United Kingdom', city: 'London',        flag: '🇬🇧', icon: '👗', category: 'Fashion',   title: 'African Fashion Week London',          date: '2026-09-20', venue: 'Tobacco Dock, London',           desc: 'Celebrating African designers and diaspora fashion talent.',            ticketUrl: 'https://www.africanfashionweeklondon.com',price: '£30' },
    { id: 'ev11', country: 'Australia',      city: 'Sydney',        flag: '🇦🇺', icon: '🌍', category: 'Festival',  title: 'African Diaspora Festival Sydney',     date: '2026-07-26', venue: 'Darling Harbour, Sydney',        desc: 'Celebrating African culture, food, music and community in Australia.', ticketUrl: 'https://www.eventbrite.com.au',           price: 'A$20' },
    { id: 'ev12', country: 'Canada',         city: 'Toronto',       flag: '🇨🇦', icon: '🏆', category: 'Awards',    title: 'Toronto African Music Awards',         date: '2026-08-15', venue: 'Sony Centre, Toronto',           desc: 'Celebrating African music excellence in North America.',                ticketUrl: 'https://www.ticketmaster.ca',             price: 'CA$55' },
    { id: 'ev13', country: 'USA',            city: 'New York',      flag: '🇺🇸', icon: '🎵', category: 'Club Night', title: 'African Night NYC',                    date: '2026-05-17', venue: 'Webster Hall, NYC',              desc: 'The biggest African party night in New York. Afrobeats, Amapiano, Highlife.', ticketUrl: 'https://www.ticketmaster.com',      price: '$35' },
    { id: 'ev14', country: 'USA',            city: 'Atlanta',       flag: '🇺🇸', icon: '🎸', category: 'Festival',  title: 'AfroPunk Atlanta',                     date: '2026-08-29', venue: 'Centennial Olympic Park',        desc: 'Festival celebrating Black art, culture and alternative music.',        ticketUrl: 'https://www.afropunk.com',                price: '$75' },
  ];
 
  // ============================
  // AIRPORT GUIDES
  // ============================
 
  const AIRPORT_GUIDES = {
    DUB: {
      name: 'Dublin Airport', code: 'DUB', flag: '🇮🇪', city: 'Dublin',
      terminals: 'T1 (most non-EU flights) and T2 (US & major EU airlines)',
      transport: [
        { icon: '🚌', name: 'Aircoach', desc: 'City centre every 15 min — €8 one way' },
        { icon: '🚌', name: 'Dublin Bus 16 / 41', desc: 'Cheapest option into city — €3.60' },
        { icon: '🚕', name: 'Taxi', desc: '~€25–35 to city centre. Fixed metered rate.' },
      ],
      lounges: ['Aer Lingus Gold Circle Lounge (T2)', "No.1 Traveller Lounge (T1)", 'Priority Pass accepted'],
      tips: [
        'Arrive 2.5 hrs early — security can be slow for non-EU flights',
        'T2 has the best food: Five Guys, Wagamama, Costa',
        'Free WiFi throughout — no password needed',
        'Left luggage at T1 Ground Floor — €8/bag/day',
      ],
      wiseChip: 'Give me tips for flying from Dublin Airport — terminal, transport and lounges',
    },
    LHR: {
      name: 'London Heathrow', code: 'LHR', flag: '🇬🇧', city: 'London',
      terminals: 'T2, T3, T4 and T5 — always check your airline carefully',
      transport: [
        { icon: '🚇', name: 'Heathrow Express', desc: 'Paddington in 15 min — £25 (book online for cheaper)' },
        { icon: '🚇', name: 'Elizabeth Line', desc: 'Central London in 30 min — £11.80' },
        { icon: '🚕', name: 'Taxi', desc: '~£50–70 to central London. Licensed black cabs only.' },
      ],
      lounges: ['BA Galleries Lounge (T5)', 'No.1 Lounge (T3)', 'Aspire Lounge (T4)', 'Priority Pass accepted'],
      tips: [
        'T5 is exclusively British Airways — confirm your terminal first',
        'Elizabeth Line is the cheapest way into central London',
        'Flights from Nigeria/Ghana usually arrive into T3 or T4',
        'Boots and WH Smith airside for affordable food and snacks',
      ],
      wiseChip: 'Give me tips for flying from London Heathrow — terminal, transport and what to expect',
    },
    MAN: {
      name: 'Manchester Airport', code: 'MAN', flag: '🇬🇧', city: 'Manchester',
      terminals: 'T1, T2 and T3 — most long-haul departs from T1 or T2',
      transport: [
        { icon: '🚆', name: 'Train', desc: 'Manchester Piccadilly in 20 min — ~£4.40' },
        { icon: '🚌', name: 'National Express', desc: 'Coaches to multiple UK cities from the airport' },
        { icon: '🚕', name: 'Taxi', desc: '~£25 to Manchester city centre' },
      ],
      lounges: ['Escape Lounge (T1 & T2)', 'No.1 Lounge (T1)', 'Priority Pass accepted'],
      tips: [
        'The train into the city is fast and very cheap',
        'T2 has the best departure lounge facilities',
        'Book JetParks in advance if driving — on-site parking is expensive',
      ],
      wiseChip: 'Give me tips for flying from Manchester Airport — terminal, transport and lounges',
    },
    BHX: {
      name: 'Birmingham Airport', code: 'BHX', flag: '🇬🇧', city: 'Birmingham',
      terminals: 'Single integrated terminal — compact and easy to navigate',
      transport: [
        { icon: '🚆', name: 'Rail Air Link', desc: 'Free shuttle to Birmingham International station (New St in 10 min)' },
        { icon: '🚕', name: 'Taxi', desc: '~£20 to Birmingham city centre' },
      ],
      lounges: ['Aspire Lounge', 'Priority Pass accepted'],
      tips: [
        'Much less stressful than Heathrow — compact and quick',
        'Take the free Rail Air Link shuttle then the train',
        'Good Wetherspoons airside for affordable hot food',
      ],
      wiseChip: 'Give me tips for flying from Birmingham Airport',
    },
    AMS: {
      name: 'Amsterdam Schiphol', code: 'AMS', flag: '🇳🇱', city: 'Amsterdam',
      terminals: 'Single terminal building — very easy to navigate and connect',
      transport: [
        { icon: '🚆', name: 'Train', desc: 'Amsterdam Centraal in 15 min — €5.80' },
        { icon: '🚕', name: 'Taxi', desc: '~€40 to city centre' },
      ],
      lounges: ['KLM Crown Lounge', 'Aspire Lounge', 'Priority Pass accepted'],
      tips: [
        'One of the best airports in Europe — smooth and logical layout',
        'Great shopping and food options airside',
        'Security is usually quick but go early for Africa long-haul flights',
      ],
      wiseChip: 'Give me tips for connecting through Amsterdam Schiphol airport',
    },
  };
 
  // ============================
  // AFFILIATE LINK BUILDERS
  // ============================
 
  function getFlightLink(fromIata, toIata) {
    return `https://trip.tpx.lu/pdsu0GMO?keyword=${fromIata}%20to%20${toIata}&locale=en-IE&curr=EUR`;
  }
 
  function getHotelLink(city) {
    return `https://booking.tpx.lu/cH9dfczu?ss=${encodeURIComponent(city)}`;
  }
 
  function getTripLink() {
    return 'https://tpembd.com/?trs=246688&shmarker=458501';
  }
 
  function getGoogleMapsLink(query, city) {
    return `https://www.google.com/maps/search/${encodeURIComponent(query + ' ' + city)}`;
  }
 
  // ============================
  // WEATHER (OpenWeather)
  // ============================
 
  const OWM_KEY = 'YOUR_OWL_API_KEY';
 
  async function getWeather(city) {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OWM_KEY}&units=metric`);
      if (!res.ok) throw new Error('fail');
      const data = await res.json();
      return {
        temp: `${Math.round(data.main.temp)}°C`,
        condition: data.weather[0].description,
        icon: getWeatherEmoji(data.weather[0].main)
      };
    } catch {
      return { temp: '--°C', condition: 'Check forecast', icon: '🌤️' };
    }
  }
 
  function getWeatherEmoji(condition) {
    const map = { Clear: '☀️', Clouds: '⛅', Rain: '🌧️', Drizzle: '🌦️', Thunderstorm: '⛈️', Snow: '❄️', Mist: '🌫️', Haze: '🌫️' };
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
 
  function getEvents(country) {
    if (!country || country === 'all') return EVENTS_DATA;
    return EVENTS_DATA.filter(e => e.country.toLowerCase() === country.toLowerCase());
  }
 
  function getAirportGuide(airportCode) {
    return AIRPORT_GUIDES[airportCode] || null;
  }
 
  return {
    getRoutes, getEscapes, getVibes, getEvents, getAirportGuide,
    getFlightLink, getHotelLink, getTripLink, getGoogleMapsLink, getWeather
  };
 
})();