const { db } = require('../firebase');

module.exports = async (req, res) => {
  if (req.method !== 'DELETE') return res.status(405).end();

  const { username } = req.query;
  try {
    await db.ref(`user-scores/${username}`).remove();
    res.status(200).json({ message: "All scores deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
