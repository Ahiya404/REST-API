const mongoose = require("mongoose");

// Define the Schema for a Todo
const todoSchema = new mongoose.Schema({
  task: { type: String, required: true },  // The task description
  completed: { type: Boolean, default: false },  // Status of the task
  createdAt: { type: Date, default: Date.now }  // Creation timestamp
});

// Create a model for Todo
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
