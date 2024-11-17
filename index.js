const express = require('express');
const app = express();

app.use(express.json());    

app.set("json spaces", 2);  // Formatting the JSON response, by adding spaces/indentation of 2 units

// In-memory data store
const tasks = []
let taskIdCounter = 1;     // Counter for assigning unique IDs

// Utility function for finding a task by ID
function findTaskById(id) {
    return tasks.find((task) => task.id === id);
}

// GET /tasks: Retrieve all tasks
app.get("/tasks", (req, res)=>{
    res.status(200).json(tasks);
})

// GET /tasks/:id: Retrieve a specific task by ID
app.get("/tasks/:id", (req, res)=>{
    const task = findTaskById(parseInt(req.params.id));

    if (!task) {
        return res.status(404).send({ error: "Task not found" });
    }
    res.status(200).json(task);
})

// POST /tasks: Create a new task
app.post("/tasks", (req, res)=>{
    const { title, description, due_date } = req.body;

    if (!title || !description || !due_date) {
        return res.status(400).json({ error: "All fields are required: title, description, due_date" });
    }

    const newTask = {
        id: taskIdCounter++,
        title,
        description,
        due_date,
        status: "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT /tasks/:id: Update an existing task
app.put("/tasks/:id", (req, res)=>{
    const task = findTaskById(parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    const { title, description, due_date, status } = req.body;

    if (!title || !description || !due_date || !status) {
        return res.status(400).json({ error: "All fields are required: title, description, due_date, status" });
    }

    task.title = title;
    task.description = description;
    task.due_date = due_date;
    task.status = status;
    task.updated_at = new Date().toISOString();

    res.status(200).json(task);
});

// DELETE /tasks/:id: Delete a task
app.delete("/tasks/:id", (req, res)=>{
    const taskIndex = tasks.findIndex((task) => task.id == parseInt(req.params.id));
    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
    }

    tasks.splice(taskIndex, 1); // At position taskIndex, remove 1 item
    res.status(200).json({ message: "Task deleted successfully" });
});

// PATCH /tasks/:id/complete: Mark a task as complete
app.patch("/tasks/:id/complete", (req, res)=>{
    const task = findTaskById(parseInt(req.params.id));

    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    task.status = "completed";
    task.updated_at = new Date().toISOString();
    res.status(200).json(task);
});

// Start the server
const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});