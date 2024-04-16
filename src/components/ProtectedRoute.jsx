import React from 'react';
import { Navigate } from 'react-router-dom';
 
export default function ProtectedRoute({ children }) {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn"); 
 
  return isLoggedIn ? children : <Navigate to="/login" />;
}

