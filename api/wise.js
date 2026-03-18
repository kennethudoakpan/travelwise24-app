export default async function handler(req, res) {

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const message = req.query.message || "Suggest a cheap flight from Dublin to Lagos";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are Wise, an expert AI travel assistant helping diaspora travellers find flights, visa info and cheap trips."
        },
        {
          role: "user",
          content: message
        }
      ]
    })
  });

  const data = await response.json();

  res.status(200).json({
    reply: data.choices[0].message.content
  });

}