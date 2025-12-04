// ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Simple guard: if no token in localStorage -> redirect to /admin-signin
 * Usage: wrap protected routes under <Route element={<ProtectedRoute/>}> ... </Route>
 */
export default function ProtectedRoute({ redirectPath = "/admin-signin" }) {
  const token = localStorage.getItem("authToken");

  if (!token) {
    // no token -> redirect to signin
    return <Navigate to={redirectPath} replace />;
  }

  // token exists -> render nested routes
  return <Outlet />;
}
