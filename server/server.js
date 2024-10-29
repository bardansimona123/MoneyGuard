// server/server.js
import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken"; // pentru token-uri

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = "mysecretkey"; // Cheie secretă pentru token-uri

app.use(cors());
app.use(bodyParser.json());

const usersFilePath = "./users.json";

// Funcție pentru a încărca utilizatorii din fișier
async function loadUsers() {
  try {
    const data = await fs.readFile(usersFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Funcție pentru a salva utilizatorii în fișier
async function saveUsers(users) {
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
}

// Înregistrare
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  let users = await loadUsers();

  // Verifică dacă utilizatorul există deja
  if (users.find((user) => user.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Adaugă noul utilizator
  const newUser = { email, password };
  users.push(newUser);
  await saveUsers(users);

  res.json({ message: "User registered successfully" });
});

// Logare
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const users = await loadUsers();

  // Verifică dacă există un utilizator cu acest email și parolă
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Creează un token de autentificare
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ message: "Login successful", token });
});

// Obține informații despre utilizator
app.get("/api/user-info", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ user: { email: decoded.email } });
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
});

// Pornire server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
