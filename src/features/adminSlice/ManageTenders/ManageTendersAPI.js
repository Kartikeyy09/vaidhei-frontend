import {TENDER_URL} from '../../../authURL/URL';



const API_URL = `${TENDER_URL}`;

const getAuthToken = () => localStorage.getItem('token');

export const fetchTendersAPI = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch tenders.');
  return response.json();
};

export const addTenderAPI = async (tenderFormData) => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token not found.");
  
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: tenderFormData,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to add tender.');
  return data;
};

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

export const deleteTenderAPI = async (id) => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token not found.");

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to delete tender.');
  }
  return id;
};