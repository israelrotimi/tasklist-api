const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const db = require("../db/db")


// Create a new user
router.post("/new", async (req, res) => {
  const { name, email,password } = req.body;
  // Check of email already exits
  try {
    const query = `SELECT * FROM users where email = ?`;
    const result = db.query(query, [email])
  })
  } catch (err) {
    console.log(err.message);
    res.status(500).send("error creating user");
  }
  if(result !== ""){
    res.status(409).send("Email already in use");
  } else {
    // Else hash password and insert result into users Table
    try {
    await password = bcrypt.hash(password, 10);
    const newQuery = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`
    await db.query(newQuery, [name, email, password])
    res.send("User created successfully");
    } catch(err){
      console.log(err.message)
      res.status(500).send("error creating user");
    }
  }
});

// Log in a user
router.post("/users", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.query(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );
    if(!user){
      return res.status(404).send("User doesn't exist");
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if(error){
        console.error("Error comparing passwords: ", err)
        return;
      }
      if(result) {
        // redirect them to /tasks
      }
      else {
        res.status(400).send("Invalid credentials");
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
