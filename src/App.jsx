import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/User/Login/Login";
import Register from "./components/User/Register/Register";
import ForgotPassword from "./components/User/ForgotPassword/ForgotPassword";
import Dashboard from "./components/Dashboard/Dashboard";
import Logo from './assets/logo.svg';
import "./index.css";

function App() {
  return (
    <div className="backgroundBody">
      <div className="contentContainer">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
