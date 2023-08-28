const express = require("express");
const app = express();
const port = 3000;
let tasks = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const newTask = req.body;
  if (newTask.id) {
    tasks.push(newTask);
    res.status(201).send(newTask);
  } else {
    res.status(404).send({ message: "ID not found" });
  }
});

app.get("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => Number(t.id) === taskId);
  if (task) {
    res.send(task);
  } else {
    res.status(404).send({ message: "Task not found" });
  }
});

app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => Number(t.id) === taskId);
  if (taskIndex !== -1) {
    const updatedTask = req.body;
    tasks[taskIndex] = updatedTask;
    res.send(updatedTask);
  } else {
    res.status(404).send({ message: "Task not found" });
  }
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => Number(t.id) === taskId);
  if (taskIndex !== -1) {
    const deletedTask = tasks.splice(taskIndex, 1)[0];
    res.send(deletedTask);
  } else {
    res.status(404).send({ message: "Task not found" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
