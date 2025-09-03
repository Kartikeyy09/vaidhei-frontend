// ✅ FILE: src/features/adminSlice/ManageTenders/ManageTendersAPI.js (COMPLETE AND CONFIRMED)

import { TENDER_URL } from '../../../authURL/URL';

const API_URL = `${TENDER_URL}`;

// Helper function to get the auth token from localStorage
const getAuthToken = () => localStorage.getItem('token');

// --- Fetch all tenders ---
export const fetchTendersAPI = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch tenders.');
  return response.json();
};

// --- Add a new tender ---
// Yeh function FormData accept karta hai, isliye naye fields apne aap handle ho jayenge.
export const addTenderAPI = async (tenderFormData) => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token not found.");
  
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: tenderFormData, // FormData mein naye fields (description, features, etc.) apne aap shaamil ho jayenge.
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to add tender.');
  return data;
};

// --- Update an existing tender ---
// Yeh function bhi FormData accept karta hai.
export const updateTenderAPI = async (id, tenderFormData) => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token not found.");
  
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${token}` },
    body: tenderFormData,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to update tender.');
  return data;
};

// --- Delete a tender ---
export const deleteTenderAPI = async (id) => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token not found.");

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({ message: 'Failed to delete tender.' }));
    throw new Error(data.message);
  }
  return id; // Success par ID wapas bhejein taaki slice use filter kar sake.
};