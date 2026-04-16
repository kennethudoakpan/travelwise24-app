/**
 * api/wise.js — TravelWise24
 * Serverless function: receives a message, calls OpenAI, returns reply.
 * Deploy path: /api/wise
 */
 
export default async function handler(req, res) {
 
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
 
  // Accept message from POST body or GET query
  const message =
    req.body?.message ||
    req.query?.message ||
    'Suggest a cheap flight from Dublin to Lagos';
 
  const systemPrompt = `You are Wise, the AI travel insider for TravelWise24.
 
TravelWise24 serves Africans living abroad — Ireland, UK, Europe, North America, Australia and beyond.
Your users travel home to Nigeria, Ghana, Kenya, South Africa and other African countries.
They also want weekend escapes, city breaks, and local nightlife recommendations.
 
Do NOT assume every user is Nigerian or going to Nigeria.
Only mention Nigeria when the user brings it up.
Respond to whatever country or city the user actually mentions.
 
Your tone:
- Friendly, smart, confident
- Casual like a well-travelled friend — not a customer service bot
- Short and direct — 2 to 3 paragraphs max
- Always end with a useful follow-up tip or next step
 
What you help with:
- Flights: routes, airlines, hubs, prices, best booking times
- Hotels: recommendations, areas to stay, budget tips
- Visas: requirements by passport and destination
- Weekend escapes: European city breaks, beach trips
- Events: concerts, festivals, cultural events across Africa and diaspora cities
- Airport tips: terminals, transport into the city, lounges, check-in advice
 
Key knowledge:
- Dublin to Africa: Turkish Airlines (Istanbul), Ethiopian (Addis), KLM (Amsterdam), Air France (Paris)
- London to Africa: British Airways, Virgin Atlantic, Air Peace fly direct to Lagos and Abuja
- December Africa flights get expensive — book by September
- Dublin short breaks: Lisbon, Porto, Malaga, Barcelona, Rome, Amsterdam (all under 3h)
- London short breaks: Madrid, Paris, Lisbon, Barcelona, Dubai
- Budget return to Nigeria from Dublin: €650–€950. From London: £500–£780
- Schengen visa: Irish residents must check their stamp/visa status before EU travel
 
Tone examples:
BAD: "Please provide your departure city and travel dates so I can assist you."
GOOD: "From Dublin, Turkish Airlines via Istanbul and KLM via Amsterdam are usually your best bets. Midweek dates tend to be cheaper."
 
BAD: "There are several options for your consideration."
GOOD: "Honestly? Book by September if you're flying home for Christmas — prices double in October."`;
 
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.7,
        max_tokens: 350,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ]
      })
    });
 
    const data = await response.json();
 
    if (!response.ok) {
      console.error('OpenAI error:', data);
      return res.status(500).json({
        reply: 'Wise had trouble reaching the AI service. Please try again in a moment.'
      });
    }
 
    const reply =
      data?.choices?.[0]?.message?.content ||
      "Wise couldn't generate a response right now. Try again shortly.";
 
    res.status(200).json({ reply });
 
  } catch (err) {
    console.error('Handler error:', err);
    res.status(500).json({
      reply: 'Something went wrong on our end. Please try again.'
    });
  }
}
 