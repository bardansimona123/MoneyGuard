// src/services/authService.js
import axios from "axios";

const API_URL =
  "https://cors.bridged.cc/https://api.jsonbin.io/v3/b/671ff97aad19ca34f8c01e2e";
const MASTER_KEY =
  "$2a$10$UL1M1GzfgYYwn5l9vksKJuWdBUVfSVoa0maU3yjE6WI6yp8b.b6iy";

// Înregistrare utilizator
export const register = async (name, email, password) => {
  try {
    console.log("Attempting to register...");
    const token = `mockToken-${Math.random().toString(36).substr(2)}`;
    const newUser = {
      username: name,
      email,
      password,
      token,
    };

    console.log("Fetching existing users...");
    const response = await axios.get(API_URL, {
      headers: {
        "X-Master-Key": MASTER_KEY,
      },
    });
    const users = response.data.record.users || [];
    console.log("Existing users:", users);

    users.push(newUser);

    console.log("Updating user list...");
    await axios.put(
      API_URL,
      { users },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": MASTER_KEY,
        },
      }
    );

    console.log("User registered successfully:", newUser);
    return newUser;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

// Autentificare utilizator
export const login = async (email, password) => {
  try {
    console.log("Attempting to log in...");
    const response = await axios.get(API_URL, {
      headers: {
        "X-Master-Key": MASTER_KEY,
      },
    });

    const users = response.data.record.users || [];
    console.log("Fetched users:", users);
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      console.log("Login successful for user:", user);
      return user;
    } else {
      console.warn("Invalid credentials for email:", email);
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

// Logout utilizator
export const logout = () => {
  console.log("Logging out...");
  localStorage.removeItem("authToken");
};
