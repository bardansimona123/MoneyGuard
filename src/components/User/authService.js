import axios from "axios";

const API_URL = "https://671fb877e7a5792f052f531b.mockapi.io/users";

// Autentificare utilizator
export const login = async (email, password) => {
  try {
    const response = await axios.get(API_URL); // Obține toți utilizatorii
    const user = response.data.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      localStorage.setItem("token", user.token);
      localStorage.setItem("userId", user.id);
      return user;
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

// Înregistrare utilizator
export const register = async (name, email, password) => {
  try {
    // Verifică dacă utilizatorul există deja
    const existingUsersResponse = await axios.get(API_URL, {
      params: { email },
    });
    const userExists = existingUsersResponse.data.some(
      (user) => user.email === email
    );

    if (userExists) {
      throw new Error("Email is already registered");
    }

    const token = `mockToken-${Math.random().toString(36).substr(2)}`;
    const newUser = {
      username: name,
      email,
      password,
      token,
    };

    const response = await axios.post(API_URL, newUser);
    localStorage.setItem("token", token);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

// Logout utilizator
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
};

// Obține token-ul curent
export const getToken = () => localStorage.getItem("token");
