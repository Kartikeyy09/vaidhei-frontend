// FILE: src/features/auth/authAPI.js
// import {ADMIN_LOGIN_URL} from "../../../../auth/URL"

// const API_URL = "https://vaidhei-backend.onrender.com/api/auth";

const API_URL = "http://localhost:3000/api/auth";

// 🔹 Login User
export const adminLoginAPI = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to login.');
  }
  return data;
};

// 🔹 Signup User
export const signupAPI = async (userData) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to sign up.');
  }
  return data; // Returns { message, user }
};

// 🔹 Logout User
export const logoutAPI = async () => {
  // Note: Backend clears the httpOnly cookie.
  // We don't need to send a token here as the browser will send the cookie.
  const response = await fetch(`${API_URL}/logout`, {
    method: 'POST',
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Logout failed.');
  }
  return data;
};