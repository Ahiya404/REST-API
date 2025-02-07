import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Correct import to use context
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth(); // Access login from AuthContext
  const navigate = useNavigate(); // Navigate after successful login

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submission triggered"); // Check if the form is submitting

    setError(null);
    setLoading(true);

    try {
      console.log("Sending login request..."); // Check if the request is being made
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      console.log("Login Response:", response.data); // Debugging: log the response from the backend

      // Call the login function to store the user data in context
      login(response.data);

      // Redirect user to the TodoList page after login
      navigate("/dashboard");
    } catch (err) {
      console.error("Error during login:", err); // Log error details for better debugging
      setError("Invalid email or password!"); // Display error message to user
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      {/* Display error message if any */}
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Email input field */}
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password input field */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Submit button */}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Link to registration page */}
      <p>
        No account? <a href="/register">Sign up</a>
      </p>
    </div>
  );
};

export default Login;
