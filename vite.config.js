// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === "production" ? "/MoneyGuard/" : "/", // Aplică base doar în producție
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000", // sau portul backend-ului tău local
        changeOrigin: true,
      },
    },
  },
}));
