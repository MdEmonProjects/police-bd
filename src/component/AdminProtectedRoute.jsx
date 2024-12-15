import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import { useUser } from "../context/AuthContext";
import { adminVerifyToken, verifyToken } from "../utils/api";
import { useState, useEffect } from "react";

const cookies = new Cookies();

const AdminProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Loading state
  const { user } = useUser();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await cookies.get("ADMIN_TOKEN");
      if (token) {
        try {
          const gettRes = await adminVerifyToken(token); // Now `gettRes` should have the response data
          console.log(gettRes);  // Log the response data from the API
          setIsAuthenticated(true); // Token valid
        } catch (error) {
          console.error("Token verification failed:", error);
          cookies.remove('ADMIN_TOKEN')
          cookies.remove('TOKEN')
          setIsAuthenticated(false); // Token invalid
        }
      } else if (user) {
        // Allow access if a user context exists
        setIsAuthenticated(true);
      } else {
        // cookies.remove('ADMIN_TOKEN')
        setIsAuthenticated(false); // No token or user context
      }
    };

    checkAuth();
  }, [user]);

  // Show a loading spinner or placeholder while authentication is being checked
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // Redirect to login if authentication fails
  return isAuthenticated ? <Outlet /> : <Navigate to="/login?role=admin" />;
};

export default AdminProtectedRoute;
