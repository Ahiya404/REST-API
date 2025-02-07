import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // Auth context
import axios from "axios";
import "./TodoList.css";

const TodoList = () => {
  const { user } = useAuth(); // Get logged-in user
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Fetch todos on load
  useEffect(() => {
    if (user) {
      fetchTodos();
    }
  }, [user]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/todos", {
        headers: { Authorization: `${user.token}` },
      });
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Add a new todo
  const addTodo = async () => {
    if (!newTask.trim()) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/todos",
        { task: newTask },
        { headers: { Authorization: `Bearer${user.token}` } }
      );

      setTodos([...todos, response.data]); // Add new todo to state
      setNewTask(""); // Clear input
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Start editing a todo
  const startEdit = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  // Save edited todo
  const saveEdit = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/todos/${id}`,
        { task: editingText },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setTodos(todos.map(todo => (todo._id === id ? { ...todo, task: editingText } : todo)));
      setEditingId(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="todo-container">
      <h1>Your Todo List</h1>

      {/* Input for adding a new todo */}
      <div className="todo-input">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {/* Display todos */}
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo._id} className="todo-item">
            {editingId === todo._id ? (
              <div className="edit-mode">
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={() => saveEdit(todo._id)}>Save</button>
              </div>
            ) : (
              <>
                <span>{todo.task}</span>
                <div className="todo-buttons">
                  <button onClick={() => startEdit(todo._id, todo.task)}>Edit</button>
                  <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
