import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectLogin } from '../features/adminSlice/auth/loginSlice';

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector(selectLogin);
  const location = useLocation();

  // Check token (from localStorage or cookie)
  const token = localStorage.getItem("token"); // agar cookie use karte ho to usko yahan check karo

  if (!isAuthenticated || !token) {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
