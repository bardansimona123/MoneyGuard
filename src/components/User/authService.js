import axios from "axios";

const API_URL =
  "https://cors-anywhere.herokuapp.com/https://api.jsonbin.io/v3/b/671ff97aad19ca34f8c01e2e";
const MASTER_KEY =
  "$2a$10$UL1M1GzfgYYwn5l9vksKJuWdBUVfSVoa0maU3yjE6WI6yp8b.b6iy";

// Înregistrare utilizator
export const register = async (name, email, password) => {
  try {
    const token = `mockToken-${Math.random().toString(36).substr(2)}`;
    const newUser = {
      username: name,
      email,
      password,
      token,
    };

    const response = await axios.get(API_URL, {
      headers: {
        "X-Master-Key": MASTER_KEY,
      },
    });
    const users = response.data.record.users;

    users.push(newUser);

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

    return newUser;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

// Autentificare utilizator
export const login = async (email, password) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        "X-Master-Key": MASTER_KEY,
      },
    });

    const users = response.data.record.users;
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      return user;
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

// Logout utilizator
export const logout = () => {
  localStorage.removeItem("authToken");
};
