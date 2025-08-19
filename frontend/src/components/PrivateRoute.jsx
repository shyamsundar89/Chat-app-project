// components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

// PrivateRoute component checks if the user is authenticated
const PrivateRoute = ({ element }) => {
  // Check if the user is authenticated (assuming token is in localStorage)
  const isAuthenticated = localStorage.getItem("token");

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // If authenticated, allow access to the route
  return element;
};

export default PrivateRoute;
