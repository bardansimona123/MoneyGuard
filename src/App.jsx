// src/App.jsx
import React from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./features/auth/LoginForm";
import RegisterForm from "./features/auth/RegisterForm";
import Dashboard from "./features/dashboard/Dashboard";
import { useAuth } from "./hooks/useAuth";
import { logOut } from "./features/auth/authSlice";

const App = () => {
  const { isAuthenticated, user } = useAuth();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <Router>
      <div>
        {isAuthenticated && (
          <div>
            <span>Welcome, {user?.email || "User"}!</span>
            <button onClick={handleLogout}>Log Out</button>
          </div>
        )}
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
