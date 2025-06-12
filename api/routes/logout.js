const { db } = require('../firebase');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const { username } = req.body;
  if (!username) return res.status(400).json({ message: "Username is required" });

  try {
    const usersRef = db.ref("users");
    const snapshot = await usersRef.once("value");
    const allUsers = snapshot.val() || {};

    const userEntry = Object.entries(allUsers).find(
      ([, user]) => user.username === username
    );

    if (userEntry) {
      const [userKey] = userEntry;
      await usersRef.child(userKey).update({ loggedIn: false });
      res.status(200).json({ message: "User logged out successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: error.message });
  }
};
