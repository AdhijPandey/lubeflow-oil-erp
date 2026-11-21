
import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import HomePage from "../modules/landing/HomePage";
import LoginPage from "../modules/auth/LoginPage";
import Dashboard from "../modules/dashboard/Dashboard";

// Check whether user is logged in
const isAuthenticated = () => {
  return (
    localStorage.getItem("lubeflow_auth") === "true" ||
    sessionStorage.getItem("lubeflow_auth") === "true"
  );
};

// Protected Route
const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>

      {/* HOME PAGE */}
      <Route path="/" element={<HomePage />} />

      {/* LOGIN PAGE */}
      <Route
        path="/login"
        element={
          isAuthenticated()
            ? <Navigate to="/dashboard" replace />
            : <LoginPage />
        }
      />

      {/* PROTECTED DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* INVALID ROUTES */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
};

export default AppRoutes;
