// FILE: src/features/auth/authAPI.js

import { ADMIN_LOGIN_URL } from "../../../authURL/URL";

const API_URL = `${ADMIN_LOGIN_URL}`;

// Helper function to get token from localStorage
const getAuthToken = () => localStorage.getItem('token');

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

// 🔹 Signup User (Included for completeness, if you need it)
export const signupAPI = async (userData) => {
  // Note: Signup with FormData if avatar is a file
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    // Headers are not set for FormData, browser does it.
    body: userData,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to sign up.');
  }
  return data;
};

// 🔹 Logout User
export const logoutAPI = async () => {
  const response = await fetch(`${API_URL}/logout`, {
    method: 'POST',
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Logout failed.');
  }
  return data;
};

// 🔹 Update User Profile (Handles files and text)
export const updateProfileAPI = async (profileFormData) => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("Authentication token not found. Please log in again.");
  }

  const response = await fetch(`${API_URL}/profile`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      // ❗ IMPORTANT: Do NOT set 'Content-Type'. 
      // The browser automatically sets it for FormData.
    },
    body: profileFormData, // Send the FormData object directly
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update profile.');
  }
  return data; // Expected to return { message, user }
};