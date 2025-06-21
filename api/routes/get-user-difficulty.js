const { db } = require('../firebase');

module.exports = async (req, res) => {
  if (req.method !== 'GET') 
    return res.status(405).json({ error: 'Method not allowed' });

  const { username } = req.query;
  if (!username) 
    return res.status(400).json({ error: 'Username is required' });

  try {
    const snapshot = await db.ref(`user-scores/${username}`).once('value');
    const data = snapshot.val();

    // Defensive check: no data or not an object
    if (!data || typeof data !== 'object') {
      return res.status(200).json({ difficulty: 'Easy' }); // fallback for new users
    }

    const keys = Object.keys(data);
    if (keys.length === 0) {
      return res.status(200).json({ difficulty: 'Easy' }); // fallback if empty
    }

    const lastKey = keys.sort().reverse()[0];
    const lastEntry = data[lastKey];

    // Fallback if difficultyLevel missing
    const difficulty = lastEntry?.difficultyLevel || 'Easy';

    return res.status(200).json({ difficulty });
  } catch (error) {
    console.error("Fetch difficulty error:", error);
    res.status(500).json({ error: error.message });
  }
};
