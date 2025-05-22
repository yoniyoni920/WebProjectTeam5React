const express = require('express');
const usersRouter = express.Router();
const admin = require('firebase-admin');
const db = admin.database();
const usersRef = db.ref('users');




// POST: Register a new user
usersRouter.post("/register", async (req, res) => {
    try {
        console.log("Received new user:", req.body);
        const newUserRef = usersRef.push(); // generates unique ID
        await newUserRef.set(req.body);
        res.status(200).send({ id: newUserRef.key, ...req.body });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).send({ error: error.message });
    }
});



usersRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
   
  try {
    const snapshot = await usersRef.once('value');
    const allUsers = snapshot.val() || {};

    const foundUser = Object.values(allUsers).find(
      user => user.username === username && user.password === password
    );

    if (foundUser) {
      res.status(200).send({  success: true,message: "Login successful", user: foundUser });
    } else {
      res.status(401).send({  success: false,message: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({ error: error.message });
  }
});
// PUT: Update all user details by name
usersRouter.post("/update/:name", async (req, res) => {
    try {
        const snapshot = await usersRef.once('value');
        const allUsers = snapshot.val() || {};
        let updated = false;

        for (const [key, user] of Object.entries(allUsers)) {
            if (user.name === req.params.name) {
                await usersRef.child(key).update(req.body);
                updated = true;
            }
        }

        if (!updated) return res.status(404).send({ message: "User not found" });
        res.status(200).send({ message: "User(s) updated successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


module.exports = usersRouter;
