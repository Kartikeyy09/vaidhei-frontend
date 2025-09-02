// ✅ FILE: src/admin/components/adminSlices/ManageGallery/ManageGalleryAPI.js
import {GALLERY_URL} from '../../../authURL/URL';

const API_URL = `${GALLERY_URL}`;

const getAuthToken = () => localStorage.getItem('token');

export const fetchGalleryAPI = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch gallery items.');
  return response.json();
};

export const addGalleryItemAPI = async (itemFormData) => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token not found.");
  
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: itemFormData,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to add gallery item.');
  return data;
};

export const updateGalleryItemAPI = async (id, itemFormData) => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token not found.");
  
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${token}` },
    body: itemFormData,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to update gallery item.');
  return data;
};

export const deleteGalleryItemAPI = async (id) => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token not found.");

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to delete gallery item.');
  }
  return id;
};