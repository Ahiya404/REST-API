import { useEffect, useState } from "react";
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState(""); // State for new todo input

  useEffect(() => {
    // Fetch todos from the backend when the component mounts
    axios.get("http://localhost:5000/todos")
      .then(response => {
        setTodos(response.data); // Set the response data as todos
      })
      .catch(error => {
        console.error("Error fetching todos:", error); // Handle errors
      });
  }, []); // Empty dependency array makes this run once on mount

  // Handle adding a new todo
  const handleAddTodo = async () => {
    if (newTodo.trim() === "") {
      alert("Todo cannot be empty");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/todos", {
        task: newTodo
      });
      setTodos([...todos, response.data]); // Update the todos list with the new todo
      setNewTodo(""); // Clear the input field
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Handle deleting a todo
  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id)); // Remove the deleted todo from the list
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div>
      <h1>Your Todos</h1>

      {/* Input form to add a new todo */}
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)} // Update the newTodo state
        placeholder="Add a new todo"
      />
      <button onClick={handleAddTodo}>Add Todo</button>

      <ul>
        {todos.length > 0 ? (
          todos.map(todo => (
            <li key={todo._id}>
              {todo.task} {/* Display task */}
              <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button> {/* Delete button */}
            </li>
          ))
        ) : (
          <li>No todos available.</li> // Display a message if no todos
        )}
      </ul>
    </div>
  );
};

export default TodoList;
