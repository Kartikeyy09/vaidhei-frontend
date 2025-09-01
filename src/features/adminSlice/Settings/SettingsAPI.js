// ✅ FILE: src/admin/components/adminSlices/Settings/SettingsAPI.js
const API_URL_SETTINGS = "http://localhost:3000/api/settings";
const API_URL_USERS = "http://localhost:3000/api/users";

const getAuthToken = () => localStorage.getItem('token');

export const fetchSettingsAPI = async () => {
  const response = await fetch(API_URL_SETTINGS);
  if (!response.ok) throw new Error('Failed to fetch settings.');
  return response.json();
};

export const updateSettingsAPI = async (settingsData) => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token not found.");
  
  const response = await fetch(API_URL_SETTINGS, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(settingsData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to update settings.');
  return data;
};

export const changePasswordAPI = async (passwordData) => {
    const token = getAuthToken();
    if (!token) throw new Error("Authentication token not found.");
    
    const response = await fetch(`${API_URL_USERS}/change-password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(passwordData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to change password.');
    return data;
};