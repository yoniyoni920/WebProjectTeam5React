const { db } = require('../firebase');
module.exports = async (req, res) => {
  console.log("Received login request");

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let body = req.body;

  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (err) {
      console.error("Invalid JSON:", err);
      return res.status(400).json({ error: "Invalid JSON" });
    }
  }

  const { username, password } = body || {};
  if (!username || !password) {
    console.log("Missing credentials");
    return res.status(400).json({ error: "Username and password required" });
  }

  try {
    console.log("Connecting to Firebase...");
    const usersRef = db.ref("users");
    const snapshot = await usersRef.once("value");
    console.log("Fetched users from Firebase");

    const allUsers = snapshot.val() || {};

    const foundUserEntry = Object.entries(allUsers).find(
      ([_, user]) => user.username === username && user.password === password
    );

    if (foundUserEntry) {
      const [userKey, foundUser] = foundUserEntry;
      await usersRef.child(userKey).update({ loggedIn: true });
      console.log("Login successful");
      return res.status(200).json({ success: true, message: "Login successful", user: foundUser });
    } else {
      console.log("Invalid credentials");
      return res.status(401).json({ success: false, message: "Invalid username or password" });
    }

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
