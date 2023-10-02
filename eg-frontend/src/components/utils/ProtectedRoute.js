// src/components/ProtectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../authContext";

function ProtectedRoute() {
  const { accessToken } = useAuth();

  return accessToken ? <Outlet /> : <Navigate to="/signIn" />;
}

export default ProtectedRoute;
