const { db } = require('../firebase');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let body = req.body;

  // Handle body parsing fallback for raw requests
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (err) {
      return res.status(400).json({ error: "Invalid JSON" });
    }
  }

  const { username, password } = body || {};

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  try {
    const usersRef = db.ref("users");
    const snapshot = await usersRef.once("value");
    const allUsers = snapshot.val() || {};

    const foundUserEntry = Object.entries(allUsers).find(
      ([_, user]) => user.username === username && user.password === password
    );

    if (foundUserEntry) {
      const [userKey, foundUser] = foundUserEntry;

      await usersRef.child(userKey).update({ loggedIn: true });

      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: foundUser
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password"
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
