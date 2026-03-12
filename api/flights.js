export default function handler(req, res) {

  const { from, to } = req.query;

  res.status(200).json({
    route: `${from} → ${to}`,
    airline: "Ethiopian Airlines",
    price: "€642",
    duration: "11h via Addis Ababa"
  });

}