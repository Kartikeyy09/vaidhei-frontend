// ✅ FILE: src/admin/components/adminSlices/Settings/SettingsAPI.js

import {SETTINGS_URL,USER_URL } from "../../../authURL/URL";

// Helper function to get token
const getAuthToken = () => localStorage.getItem('token');

// 1. Fetch all settings (Public or Protected - depends on your backend)
export const fetchSettingsAPI = async () => {
  const response = await fetch(SETTINGS_URL);
  if (!response.ok) throw new Error('Failed to fetch settings.');
  return response.json();
};

// 2. Update settings (Protected)
export const updateSettingsAPI = async (settingsData) => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token not found.");
  
  const response = await fetch(SETTINGS_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(settingsData),
  });

  // ✅ Safer error handling: prevents crashing if error response is not JSON
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      throw new Error('Failed to update settings. Server returned an invalid response.');
    }
    throw new Error(errorData.message || 'Failed to update settings.');
  }
  return response.json();
};

// 3. Change Admin Password (Protected)
export const changePasswordAPI = async (passwordData) => {
    const token = getAuthToken();
    if (!token) throw new Error("Authentication token not found.");
    
    const response = await fetch(`${USER_URL}/change-password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(passwordData),
    });

    // ✅ Safer error handling for this call too
    if (!response.ok) {
        let errorData;
        try {
            errorData = await response.json();
        } catch(e) {
            throw new Error('Failed to change password. Server returned an invalid response.');
        }
        throw new Error(errorData.message || 'Failed to change password.');
    }
    return response.json();
};