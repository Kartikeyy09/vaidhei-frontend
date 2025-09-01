import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

// Import the selector from your loginSlice
import { selectLogin } from '../features/adminSlice/auth/loginSlice'; // ⚠️ Adjust this path according to your file structure

/**
 * This component acts as a gatekeeper for protected routes.
 * It checks if the user is authenticated based on the Redux store state.
 */
const ProtectedRoute = () => {
  // Get the authentication state from the Redux store
  const { isAuthenticated } = useSelector(selectLogin);
  const location = useLocation();

  if (!isAuthenticated) {
    // If the user is not authenticated, redirect them to the login page.
    // The `state={{ from: location }}` saves the current path,
    // allowing the user to be redirected back to it after a successful login.
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If the user is authenticated, render the requested child route (<Outlet />).
  return <Outlet />;
};

export default ProtectedRoute;