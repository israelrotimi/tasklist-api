const express = require("express");
const router = express.Router();
const db = require("../db/db")

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
