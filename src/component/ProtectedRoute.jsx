import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import { useUser } from "../context/AuthContext";
import { verifyToken } from "../utils/api";
import { useState, useEffect } from "react";

const cookies = new Cookies();

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // `null` indicates loading state
  const { user } = useUser();

  useEffect(() => {
    const checkAuth = async () => {
      const token = cookies.get("TOKEN");
      if (token || user) {
        try {
          await verifyToken(token); // Validate token
          setIsAuthenticated(true); // Token valid
		//   setUser(token)
        } catch (error) {
          console.error("Token verification failed:", error);
          setIsAuthenticated(false); // Token invalid
        }
      } else {
        setIsAuthenticated(false); // No token or user
      }
    };

    checkAuth();
  }, [user]);

  // While checking auth, show a loading indicator
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // Redirect based on auth status
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
