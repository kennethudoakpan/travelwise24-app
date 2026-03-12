export default async function handler(req, res) {

  const { from, to } = req.query;

  res.status(200).json({
    message: "Flight search API working",
    from: from,
    to: to
  });

}