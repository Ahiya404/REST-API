// PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Correct import for useAuth

const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); // Get user data from auth context

  if (!user) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return children; // Render children components if authenticated
};

export default PrivateRoute;
