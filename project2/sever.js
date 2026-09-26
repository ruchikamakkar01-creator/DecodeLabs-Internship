const express = require("express");
const app = express();

app.use(express.json());

// storing tasks in an array for now instead of a real database
let tasks = [
  { id: 1, title: "Learn Express basics", completed: false },
  { id: 2, title: "Build first API endpoint", completed: true },
];
let nextId = 3;

app.get("/", (req, res) => {
  res.send("Task API is running");
});

// GET request - just returns all the tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// GET request for one task by id
app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});

// POST request - adds a new task
app.post("/tasks", (req, res) => {
  const title = req.body.title;
  const completed = req.body.completed;

  // basic validation - don't add a task without a title
  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "title is required" });
  }

  const newTask = {
    id: nextId,
    title: title,
    completed: completed ? true : false,
  };

  nextId = nextId + 1;
  tasks.push(newTask);

  res.status(201).json(newTask);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});
