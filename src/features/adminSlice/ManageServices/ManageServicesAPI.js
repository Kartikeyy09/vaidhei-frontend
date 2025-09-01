// FILE: src/admin/components/adminSlices/ManageServices/ManageServicesAPI.js

// const API_URL = "https://vaidhei-backend.onrender.com/api/services";
const API_URL = "http://localhost:3000/api/services";

// Helper function to get the token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// 1. Fetch all services (Public - no token needed)
export const fetchServicesAPI = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch services.');
  }
  return response.json();
};

// 2. Add a new service (Protected - needs token)
export const addServiceAPI = async (serviceFormData) => {
  const token = getAuthToken();
  // ✅ ADDED: Check if token exists before making the API call.
  if (!token) {
    throw new Error("Authentication token not found. Please log in again.");
  }
  
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: serviceFormData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to add service.');
  }
  return data;
};

// 3. Update a service (Protected - needs token)
export const updateServiceAPI = async (id, serviceFormData) => {
  const token = getAuthToken();
  // ✅ ADDED: Check if token exists before making the API call.
  if (!token) {
    throw new Error("Authentication token not found. Please log in again.");
  }
  
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: serviceFormData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update service.');
  }
  return data;
};

// 4. Delete a service (Protected - needs token)
export const deleteServiceAPI = async (id) => {
  const token = getAuthToken();
  // ✅ ADDED: Check if token exists before making the API call.
  if (!token) {
    throw new Error("Authentication token not found. Please log in again.");
  }

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to delete service.');
  }
  return id;
};