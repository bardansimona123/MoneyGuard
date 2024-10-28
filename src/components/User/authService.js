// src/services/authService.js
import axios from "axios";

const API_URL = "https://671fb877e7a5792f052f531b.mockapi.io/users"; // Înlocuiește cu URL-ul tău exact

// Autentificare utilizator
export const login = async (email, password) => {
  const response = await axios.get(`${API_URL}`, {
    params: { email, password },
  });

  const user = response.data[0]; // Căutăm primul utilizator care corespunde
  if (user && user.password === password) {
    localStorage.setItem("token", user.token);
    localStorage.setItem("userId", user.id);
    return user;
  } else {
    throw new Error("Invalid credentials");
  }
};

// Înregistrare utilizator
export const register = async (name, email, password) => {
  const token = `mockToken-${Math.random().toString(36).substr(2)}`;
  const response = await axios.post(`${API_URL}`, {
    username: name,
    email,
    password,
    token,
  });
  localStorage.setItem("token", token);
  return response.data;
};

// Logout utilizator
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
};

// Obține token-ul curent
export const getToken = () => localStorage.getItem("token");
