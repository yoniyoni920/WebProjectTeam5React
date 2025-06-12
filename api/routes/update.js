const { db } = require('../firebase');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const { name } = req.query;
  try {
    const usersRef = db.ref("users");
    const snapshot = await usersRef.once("value");
    const allUsers = snapshot.val() || {};

    let updated = false;
    for (const [key, user] of Object.entries(allUsers)) {
      if (user.name === name) {
        await usersRef.child(key).update(req.body);
        updated = true;
      }
    }

    if (!updated) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User(s) updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
