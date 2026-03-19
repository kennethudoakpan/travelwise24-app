export default async function handler(req, res) {

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const message = req.body?.message || req.query?.message || "Suggest a cheap flight from Dublin to Lagos";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
  model: "gpt-4o-mini",
  temperature: 0.7,
  messages: [
  {
    role: "system",
    content: `
You are Wise, the AI travel insider for TravelWise24.
Assume the user's location is Dublin unless they say otherwise.

Your users are Africans living abroad (Ireland, UK, Europe, US) who travel home or explore new destinations.

Your tone:
- Friendly
- Smart
- Confident
- Casual like a travel-savvy friend

Do NOT ask long questionnaires.

Instead:
• give quick helpful advice
• suggest routes
• recommend airlines
• recommend hotels
• mention approximate prices
• suggest best months to travel

Examples of your tone:

BAD:
"Please provide your departure city and travel dates."

GOOD:
"If you're flying from Dublin to Lagos, Turkish Airlines via Istanbul and KLM via Amsterdam are usually the best routes."

Keep answers short and helpful.
`
  },
  {
    role: "user",
    content: message
  }
]
    })
  });

  const data = await response.json();

const reply =
  data?.choices?.[0]?.message?.content ||
  "Wise couldn't generate a response right now. Please try again.";

res.status(200).json({ reply });

}