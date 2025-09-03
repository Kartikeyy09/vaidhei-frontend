// ✅ FILE: src/features/adminSlice/profile/profileAPI.js (COMPLETE AND FINAL)

import { PROFILE_API_URL } from "../../../authURL/URL"; // Ensure this is defined in your URL file

const API_URL = `${PROFILE_API_URL}`;

// Helper function to get the authentication token from localStorage
const getAuthToken = () => localStorage.getItem('token');

// 🔹 Fetch Current User Profile
export const getProfileAPI = async () => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token not found.");

  const response = await fetch(API_URL, { // Corresponds to: GET /api/profile
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to fetch profile.');
  if (!data.user) throw new Error("Server response did not include user data.");
  return data;
};

// 🔹 Update User Profile
export const updateProfileAPI = async (profileFormData) => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token not found.");

  const response = await fetch(API_URL, { // Corresponds to: PUT /api/profile
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${token}` },
    body: profileFormData,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to update profile.');
  if (!data.user) throw new Error("Server response did not include user data after update.");
  return data;
};

// 🔹 Change User Password
export const changePasswordAPI = async (passwords) => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token not found.");

  const response = await fetch(`${API_URL}/change-password`, { // Corresponds to: PUT /api/profile/change-password
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(passwords),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to change password.');
  return data;
};