const express = require("express");
const router = express.Router();
const Todo = require("/models/Todo");

// ✅ 1. Get all tasks
router.get("/todos", async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

// ✅ 2. Create a new task
router.post("/todos", async (req, res) => {
    const newTodo = new Todo({ task: req.body.task });
    await newTodo.save();
    res.json(newTodo);
});

// ✅ 3. Update a task (mark as completed)
router.put("/todos/:id", async (req, res) => {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { completed: req.body.completed }, { new: true });
    res.json(updatedTodo);
});

// ✅ 4. Delete a task
router.delete("/todos/:id", async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
});

module.exports = router;