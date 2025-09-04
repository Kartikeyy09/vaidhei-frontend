import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // ensures correct paths for Vercel deployment
  server: {
    port: 5173,
  },
});
