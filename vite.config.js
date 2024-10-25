import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/MoneyGuard/", // numele repo-ului tău GitHub
  plugins: [react()],
});
