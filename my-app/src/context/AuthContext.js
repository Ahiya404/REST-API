// src/context/AuthContext.js
import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Create the context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component that wraps children components
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if user is authenticated on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      axios
        .get("/api/auth/verify", { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          setUser(response.data.user);
        })
        .catch(() => {
          setUser(null);
        });
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    console.log("check")
    localStorage.setItem("authToken", userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
