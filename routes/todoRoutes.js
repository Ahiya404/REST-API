const express = require("express");
const Todo = require("../models/todo");  // Import the Todo model
const router = express.Router();

// Create a new Todo
router.post("/", async (req, res) => {
  try {
    const todo = new Todo(req.body);  // Create a new todo from the request body
    await todo.save();  // Save the todo to the database
    res.status(201).json(todo);  // Respond with the created todo
  } catch (err) {
    res.status(400).json({ error: err.message });  // Handle errors
  }
});

// Get all Todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();  // Fetch all todos from the database
    res.json(todos);  // Send the list of todos as a response
  } catch (err) {
    res.status(500).json({ error: err.message });  // Handle errors
  }
});

// Update a Todo by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTodo);  // Respond with the updated todo
  } catch (err) {
    res.status(400).json({ error: err.message });  // Handle errors
  }
});

// Delete a Todo by ID
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);  // Delete the todo by ID
    res.status(204).send();  // Respond with no content after deletion
  } catch (err) {
    res.status(500).json({ error: err.message });  // Handle errors
  }
});

module.exports = router;
