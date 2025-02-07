import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Correct import
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import TodoList from "./components/TodoList";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Default Redirect to Login */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Dashboard Route */}
          <Route path="/dashboard" element={<PrivateRoute><TodoList /></PrivateRoute>} />

          {/* Catch-All Route for 404 Pages */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
