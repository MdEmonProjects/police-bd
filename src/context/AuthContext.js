import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    navigate("/profile"); // Redirect on successful login
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    navigate("/"); // Redirect to home on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
