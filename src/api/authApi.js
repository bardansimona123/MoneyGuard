// src/api/authApi.js

// Setăm URL-ul de bază dinamic în funcție de mediul de rulare
const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://<username>.github.io/MoneyGuard/api" // Înlocuiește `<username>` cu numele tău de utilizator GitHub
    : "http://localhost:5000/api";

export const logInApi = async (credentials) => {
  const response = await fetch(`${baseURL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  return response.json();
};

export const registerApi = async (userData) => {
  const response = await fetch(`${baseURL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Registration failed");
  }
  return response.json();
};

export const fetchUserInfoApi = async () => {
  const response = await fetch(`${baseURL}/user-info`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user info");
  }
  return response.json();
};
