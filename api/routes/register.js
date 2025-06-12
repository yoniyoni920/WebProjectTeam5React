const { db } = require('../firebase');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { username, email, ...rest } = req.body;
    if (!username || !email) {
      return res.status(400).json({ error: "Username and email are required." });
    }

    const usersRef = db.ref('users');
    const snapshot = await usersRef.once("value");
    const allUsers = snapshot.val() || {};

    const isDuplicate = Object.values(allUsers).some(
      (user) => user.username === username || user.email === email
    );

    if (isDuplicate) {
      return res.status(409).json({ error: "Username or email already exists." });
    }

    const newUser = {
      username,
      email,
      ...rest,
      role: "member",
      loggedIn: false,
    };

    const newUserRef = usersRef.push();
    await newUserRef.set(newUser);

    res.status(200).json({ id: newUserRef.key, ...newUser });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: error.message });
  }
};
