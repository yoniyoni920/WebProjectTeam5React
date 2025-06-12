const { db } = require('../firebase');

module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const usersRef = db.ref("users");
    const snapshot = await usersRef.once("value");
    const allUsers = snapshot.val() || {};
    const loggedInUsers = Object.values(allUsers).filter(user => user.loggedIn === true);

    res.status(200).json(loggedInUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
