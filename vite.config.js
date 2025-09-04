import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  preview: {
    host: true, // allow all hosts
    allowedHosts: ["vaidhei-frontend.onrender.com"], // add your render domain
  },
});
