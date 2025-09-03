import { ADMIN_LOGIN_URL } from "../../../authURL/URL";

const API_URL = `${ADMIN_LOGIN_URL}`;

// 🔹 Login User
export const adminLoginAPI = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to login.');
  return data;
};

// 🔹 Signup User
export const signupAPI = async (userData) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    body: userData,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to sign up.');
  return data;
};

// 🔹 Logout User
export const logoutAPI = async () => {
  const response = await fetch(`${API_URL}/logout`, {
    method: 'POST',
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Logout failed.');
  return data;
};