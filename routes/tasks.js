const express = require("express");
const router = express.Router();
const db = require("../db/db")

// Create a new task for a user
app.post("/tasks", async (req, res) => {
  const { title, description, user_id } = req.body;
  try {
    const userExists = await db.query("SELECT id FROM users WHERE id = ?", [user_id]);
    if (userExists.length === 0) return res.status(400).json({ error: "User not found" });

    const result = await db.query(
      "INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)",
      [title, description, user_id]
    );
    res.json({ id: result.insertId, title, description, user_id });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});
// Get all tasks with user details
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await db.query(`
      SELECT tasks.id, tasks.title, tasks.description, tasks.created_at,
             users.id AS user_id, users.name AS user_name, users.email AS user_email
      FROM tasks
      JOIN users ON tasks.user_id = users.id
    `);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});



// Read all blog posts
router.get("/", (req, res) => {
  const query = `SELECT * FROM blogs`;
  db.all(query, [], (err, rows) => {
    if (err){
      return res.status(500).send(err.message);
    }
    res.send(rows);
  });
});

// Create a new blog post
router.post("/", (req, res) => {
  const { title, content } = req.body;
  const query = `INSERT INTO blogs (title, content) VALUES (?, ?)`;
  db.run(query, [title, content], function(err) {
      if (err){
        return res.status(500).send(err.message);
      }
      res.status(201).send({id: this.lastID});
  })
});

// Get a single blog post by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM blogs WHERE id = ?`;
  db.get(query, [id], (err, row) => {
    if (err){
      return res.status(500).send(err.message);
    }
    if (!row) {
      return res.status(404).send("Blog post not found");
    }
    res.send(row);
  });
});

// Update blog post by id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const query = `UPDATE blogs SET title = ?, content = ? WHERE id = ?`;
  db.run(query, [title, content, id], (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    if (this.changes === 0) {
      return res.status(404).send("Blog post not found");
    }
  res.send(`blog ${id} updated successfully`)
  });
});

// Delete a blog post by id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM blogs WHERE id = ?`;
  db.run(query, [id], (err) => {
    if(err){
      return res.status(500).send(err.message);
    }
    if(this.changes === 0){
      return res.status(404).send("Blog post not found");
    }
    res.send(`deleted blog ${id}`)
  });
});

module.exports = router;
