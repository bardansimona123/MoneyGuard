import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js"; // modelul de utilizator
import connectToDatabase from "../db.js"; // funcția de conectare

const router = express.Router();

// Conectarea la baza de date
connectToDatabase();

// Ruta de înregistrare
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verifică dacă utilizatorul există deja
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Criptează parola
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creează un nou utilizator
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Salvează utilizatorul în baza de date
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

export default router;
