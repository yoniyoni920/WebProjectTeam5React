const { db } = require('../firebase');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, score, correctAnswers, attempts,difficultyLevel, timestamp } = req.body;
  if (!username) return res.status(400).json({ message: "Username is required" });

  try {
    const userScoresRef = db.ref(`user-scores/${username}`);
    await userScoresRef.push({ score, correctAnswers, attempts,difficultyLevel, timestamp });

    res.status(200).json({ message: "Score saved" });
  } catch (e) {
    res.status(500).json({ message: "Error saving score", error: e.message });
  }
};
