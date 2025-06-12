const { db } = require('../firebase');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    try {
      const contactRef = db.ref('contacts').push();
      await contactRef.set({
        name,
        email,
        message,
        submittedAt: new Date().toISOString()
      });

      res.status(200).json({ success: true, message: "Message received." });
    } catch (error) {
      console.error("Contact error:", error);
      res.status(500).json({ error: error.message });
    }

  } else if (req.method === 'GET') {
    try {
      const contactsRef = db.ref("contacts");
      const snapshot = await contactsRef.once("value");
      const contactsData = snapshot.val();

      if (!contactsData) return res.status(200).json([]);
      const messages = Object.entries(contactsData).map(([id, msg]) => ({ _id: id, ...msg }));

      res.status(200).json(messages);
    } catch (error) {
      console.error("Failed to retrieve contacts:", error);
      res.status(500).json({ error: "Failed to fetch contact messages." });
    }
  } else {
    res.status(405).end();
  }
};
