import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login"); // Redirecționează utilizatorul la pagina de login
  };

  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <p>
        This is your main panel. Here you can view and manage your transactions,
        profile, and other information.
      </p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
