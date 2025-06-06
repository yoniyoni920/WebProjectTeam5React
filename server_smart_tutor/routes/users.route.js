const express = require('express');
const usersRouter = express.Router();
const admin = require('firebase-admin');
const db = admin.database();
const usersRef = db.ref('users');




// POST: Register a new user
usersRouter.post("/register", async (req, res) => {
  try {
    const { username, email, ...rest } = req.body;

    if (!username || !email) {
      return res.status(400).send({ error: "Username and email are required." });
    }

    // Fetch all users
    const snapshot = await usersRef.once("value");
    const allUsers = snapshot.val() || {};

    // Check for duplicates
    const isDuplicate = Object.values(allUsers).some(
      (user) => user.username === username || user.email === email
    );

    if (isDuplicate) {
      return res.status(409).send({ error: "Username or email already exists." });
    }

    // Add default fields
    const newUser = {
      username,
      email,
      ...rest,
      role: "member",
      loggedIn: false,
    };

    const newUserRef = usersRef.push();
    await newUserRef.set(newUser);

    res.status(200).send({ id: newUserRef.key, ...newUser });

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
        const userKey = Object.entries(allUsers).find(
        ([_, user]) => user.username === username && user.password === password
         )?.[0];
    // Mark the user as logged in
    if (userKey) {
      await usersRef.child(userKey).update({ loggedIn: true });
    }
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
// POST: Log out a user (sets loggedIn: false)
usersRouter.post("/logout", async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).send({ message: "Username is required" });
  }

  try {
    const snapshot = await usersRef.once('value');
    const allUsers = snapshot.val() || {};

    const userEntry = Object.entries(allUsers).find(
      ([, user]) => user.username === username
    );

    if (userEntry) {
      const [userKey] = userEntry;
      await usersRef.child(userKey).update({ loggedIn: false });
      return res.status(200).send({ message: "User logged out successfully" });
    } else {
      return res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).send({ error: error.message });
  }
});
usersRouter.get("/loggedinusers", async (req, res) => {
  console.log("Received request to /loggedinusers");
  try {
    const snapshot = await usersRef.once("value");
    const allUsers = snapshot.val() || {};
    const loggedInUsers = Object.values(allUsers).filter(user => user.loggedIn === true);
    console.log("Logged in users being returned:", loggedInUsers); 
    res.status(200).send(loggedInUsers);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
  
  
});


module.exports = usersRouter;
