const http = require("http");
const port = 3000;
let tasks = [];

const wordNotFound = (res, word) => {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: `${word} not found` }));
};

const respondAction = (res, action) => {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify(action));
};

const listAllTasks = (req, res) => {
  respondAction(res, tasks);
};
const addNewTask = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    const newTask = body === "" ? {} : JSON.parse(body);
    if (newTask.id !== undefined) {
      tasks.push(newTask);
      respondAction(res, newTask);
    } else {
      wordNotFound(res, "id in body");
    }
  });
};

const listSpecificTaskWithNumber = (req, res, taskId) => {
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    respondAction(res, task);
  } else {
    wordNotFound(res, "Task");
  }
};

const updateTask = (req, res, taskId) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    const updatedTask = body === "" ? {} : JSON.parse(body);
    const taskIndex = tasks.findIndex((t) => t.id === taskId);
    if (updatedTask.id === undefined) {
      wordNotFound(res, "id in body");
    } else if (taskIndex !== -1) {
      tasks[taskIndex] = updatedTask;
      respondAction(res, updatedTask);
    } else {
      wordNotFound(res, "Task");
    }
  });
};

const deleteTask = (req, res, taskId) => {
  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex !== -1) {
    const deletedTask = tasks.splice(taskIndex, 1)[0];
    respondAction(res, deletedTask);
  } else {
    wordNotFound(res, "Task");
  }
};

const server = http.createServer((req, res) => {
  const method = req.method;
  const path = req.url;
  if (path === "/tasks" && method == "GET") {
    listAllTasks(req, res);
  } else if (path === "/tasks" && method == "POST") {
    addNewTask(req, res);
  } else if (path.startsWith("/tasks/") && method == "GET") {
    listSpecificTaskWithNumber(req, res, parseInt(path.substring(7)));
  } else if (path.startsWith("/tasks/") && method == "PUT") {
    updateTask(req, res, parseInt(path.substring(7)));
  } else if (path.startsWith("/tasks/") && method == "DELETE") {
    deleteTask(req, res, parseInt(path.substring(7)));
  } else {
    wordNotFound(res, "Route");
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
