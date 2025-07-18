import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";
import { Loading } from "./loading";

export const  ProtectedRoute = ({ children }) => {
  const location = useLocation();

  // Use react-query to check authentication status
  const { isLoading, error } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:8000/users/me", {
        withCredentials: true, // Send HttpOnly cookie
      });
      return response.data;
    },
    retry: false, // Do not retry on failure
  });

  if (isLoading) {
    return <Loading/>; // Show loading state
  }

  if (error) {
    // Redirect to login if authentication fails
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render the protected component if authenticated
  return children;
};