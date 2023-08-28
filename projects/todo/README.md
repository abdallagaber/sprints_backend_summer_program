# To-Do List Application

## Overview

The To-Do List Application is a simple task management system built using Node.js and the `http` module. This application provides basic CRUD (Create, Read, Update, Delete) functionality for managing tasks. Users can interact with the application via HTTP requests to create, retrieve, update, and delete tasks.

## Features

### 1. Create a New Task

Users can create a new task by sending a POST request to the `/tasks` endpoint. The request should include a JSON payload containing the task details, including the title and description. Upon successful creation, the server responds with the newly created task in JSON format.

Example POST request:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"title": "Task 1", "description": "Complete task 1."}' http://localhost:3000/tasks
```

### 2. Retrieve All Tasks

Users can retrieve a list of all tasks by sending a GET request to the `/tasks` endpoint. The server responds with a JSON array containing all the tasks currently stored in memory.

Example GET request:
```bash
curl http://localhost:3000/tasks
```

### 3. Retrieve a Specific Task

To retrieve a specific task, users can send a GET request to the `/tasks/:id` endpoint, where `:id` represents the unique ID of the task. If the task with the specified ID exists, the server responds with the task details in JSON format. If the task is not found, a 404 error is returned.

Example GET request for a specific task with ID 1:
```bash
curl http://localhost:3000/tasks/1
```

### 4. Update a Specific Task

Users can update a specific task by sending a PUT request to the `/tasks/:id` endpoint, providing the ID of the task to be updated and the updated task details in JSON format. If the task with the specified ID exists, the server updates its details and responds with the updated task. If the task is not found, a 404 error is returned.

Example PUT request to update task with ID 1:
```bash
curl -X PUT -H "Content-Type: application/json" -d '{"title": "Updated Task 1", "description": "Task 1 has been updated."}' http://localhost:3000/tasks/1
```

### 5. Delete a Specific Task

To delete a specific task, users can send a DELETE request to the `/tasks/:id` endpoint, where `:id` represents the ID of the task to be deleted. If the task with the specified ID exists, the server removes it from the task list and responds with the deleted task details. If the task is not found, a 404 error is returned.

Example DELETE request to delete task with ID 1:
```bash
curl -X DELETE http://localhost:3000/tasks/1
```

## Important Note

This application serves as a basic demonstration of a to-do list app with server-side functionality for managing tasks. In a production environment, it is crucial to incorporate additional features such as data persistence, user authentication, and input validation to enhance security and usability.

For further development and improvements, consider implementing these features and deploying the application to a production-ready server.
