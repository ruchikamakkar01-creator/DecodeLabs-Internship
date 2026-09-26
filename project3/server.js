const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
app.use(express.json());

// connection details for your local MySQL - change these to match your setup
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

let db;

async function startServer() {
  db = await mysql.createConnection(dbConfig);

  await db.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT FALSE
    )
  `);

  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
}

app.get("/", (req, res) => {
  res.send("Task API is running");
});

// READ - get all tasks
app.get("/tasks", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM tasks");
  res.json(rows);
});

// READ - get one task
app.get("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  const [rows] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);

  if (rows.length === 0) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(rows[0]);
});

// CREATE - add a new task
app.post("/tasks", async (req, res) => {
  const title = req.body.title;
  const completed = req.body.completed ? true : false;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "title is required" });
  }

  const [result] = await db.query(
    "INSERT INTO tasks (title, completed) VALUES (?, ?)",
    [title.trim(), completed],
  );

  const [rows] = await db.query("SELECT * FROM tasks WHERE id = ?", [
    result.insertId,
  ]);

  res.status(201).json(rows[0]);
});

// UPDATE - edit an existing task
app.put("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const completed = req.body.completed ? true : false;

  const [existing] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);
  if (existing.length === 0) {
    return res.status(404).json({ error: "Task not found" });
  }

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "title is required" });
  }

  await db.query("UPDATE tasks SET title = ?, completed = ? WHERE id = ?", [
    title.trim(),
    completed,
    id,
  ]);

  const [rows] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);
  res.json(rows[0]);
});

// DELETE - remove a task
app.delete("/tasks/:id", async (req, res) => {
  const id = req.params.id;

  const [existing] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);
  if (existing.length === 0) {
    return res.status(404).json({ error: "Task not found" });
  }

  await db.query("DELETE FROM tasks WHERE id = ?", [id]);
  res.status(204).send();
});

startServer();
