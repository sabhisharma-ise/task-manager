# Task Management API

This is a simple task management API built using `Node.js` and `Express.js`. It allows users to manage tasks with functionality such as adding, updating, retrieving, deleting, and marking tasks as completed.

## Features
- Create, retrieve, update, and delete tasks.
- Mark tasks as completed.
- JSON-formatted responses with indentation for readability.

## Prerequisites
Ensure you have the following installed:

- Node.js (v16 or higher recommended)
- npm (comes with Node.js)
- Curl (for testing API requests)

## Installation and Setup
Follow these steps to set up the application locally:

1. Clone the repository:

    ```bash
    git clone https://github.com/sabhisharma-ise/task-manager.git
    cd task-manager
    ```

2. Install dependencies:

    ```bash
    npm i
    ```

3. Run the server:

    ```bash
    node index.js
    ```

The server will start at http://localhost:3000.

## API Endpoints
Below is a list of all available endpoints:

### 1. Create a new task
    
POST `/tasks`

Example:

```bash
curl -X POST -H "Content-Type: application/json" \
-d '{"title": "Learn Node.js", "description": "Understand basics of Node.js", "due_date": "2024-12-01"}' \
http://localhost:3000/tasks
```

### 2. Retrieve all tasks

GET `/tasks`

Example:
```bash
curl http://localhost:3000/tasks
```

### 3. Retrieve a task by ID

GET `/tasks/:id`

Example:
```bash
curl http://localhost:3000/tasks/1
```


### 4. Update a task by ID

PUT `/tasks/:id`

Example:

```bash
curl -X PUT -H "Content-Type: application/json" \
-d '{"title": "Learn Express.js", "description": "Master middleware and routing", "due_date": "2024-12-15", "status": "in-progress"}' \
http://localhost:3000/tasks/1
```

### 5. Mark a task as complete
    
PATCH `/tasks/:id/complete`

Example:

```bash
curl -X PATCH http://localhost:3000/tasks/1/complete
```

### 6. Delete a task by ID

DELETE `/tasks/:id`

Example:

```bash
curl -X DELETE http://localhost:3000/tasks/1
```