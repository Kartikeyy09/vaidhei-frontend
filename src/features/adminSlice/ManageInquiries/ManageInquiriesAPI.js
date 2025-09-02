// ✅ FILE: src/admin/components/adminSlices/ManageInquiries/ManageInquiriesAPI.
import {INQUIRY_URL} from '../../../authURL/URL';

const API_URL = `${INQUIRY_URL}`;

const getAuthToken = () => localStorage.getItem('token');

// 1. Fetch all inquiries (Protected for Admin)
export const fetchInquiriesAPI = async () => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token not found.");
  
  const response = await fetch(API_URL, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch inquiries.');
  return response.json();
};

// 2. Fetch a single inquiry by ID (Protected for Admin)
// Note: This also marks it as "Read" on the backend
export const fetchInquiryByIdAPI = async (id) => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token not found.");

  const response = await fetch(`${API_URL}/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch inquiry details.');
  return response.json();
};

// 3. Delete an inquiry (Protected for Admin)
export const deleteInquiryAPI = async (id) => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token not found.");

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to delete inquiry.');
  }
  return id;
};

// 4. Create an inquiry (Public - for users on the main website)
// This might live in a different API file (e.g., `src/features/contact/contactAPI.js`)
// but for simplicity, we'll keep it here.
export const createInquiryAPI = async (inquiryData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryData)
    });
    const data = await response.json();
    if(!response.ok) throw new Error(data.message || 'Failed to submit inquiry.');
    return data;
}