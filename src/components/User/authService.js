import axios from "axios";

const API_URL = "https://671fb877e7a5792f052f531b.mockapi.io/users";

// Înregistrare utilizator - Fără localStorage
export const register = async (name, email, password) => {
  try {
    const token = `mockToken-${Math.random().toString(36).substr(2)}`; // Token generat
    const response = await axios.post(API_URL, {
      username: name,
      email,
      password,
      token,
    });
    // În loc să stocăm în localStorage, returnăm datele utilizatorului pentru a fi folosite după autentificare
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

// Autentificare utilizator - Folosește MockAPI
export const login = async (email, password) => {
  try {
    const response = await axios.get(API_URL);
    const user = response.data.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      return user; // Returnăm datele utilizatorului pentru verificări ulterioare
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

// Logout utilizator - opțional
export const logout = () => {
  // Fără `localStorage`, funcția de logout va fi goală sau doar va elimina un eventual token local
};
