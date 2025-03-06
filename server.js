const express = require("express");
const cors = require("cors");
require("dotenv").config();

comst db require("./db/db");
const userRouter = require("./routes/users");
const taskRouter = require("./routes/tasks");

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

// Create tables (if they don't exist)
const createTables = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        user_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log("Tables ready");
  } catch (err) {
    console.error("Error creating tables:", err);
  }
};

app.get("/", (req, res) => {
  res.send("send post request to '/users/new' endpoint to login");
});
// app.use("/users", userRouter);
// app.use("/tasks", taskRouter);

app.listen(port, () => {
  createTables();
  console.log(`server listening on port: ${port}`);
})
