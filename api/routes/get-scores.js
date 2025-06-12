const { db } = require('../firebase');

module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const snapshot = await db.ref(`user-scores/${username}`).once('value');
    const scores = snapshot.val() || {};
    res.status(200).json(Object.values(scores));
  } catch (error) {
    console.error("Fetch scores error:", error);
    res.status(500).json({ error: error.message });
  }
};
