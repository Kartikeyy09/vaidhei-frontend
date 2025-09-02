// ✅ FILE: src/admin/components/adminSlices/ManageProjects/ManageProjectsAPI.js (Updated)
import {PROJECT_URL} from '../../../authURL/URL';


const API_URL = `${PROJECT_URL}`;

// Helper function to get the token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// 1. Fetch all projects (No changes)
export const fetchProjectsAPI = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch projects.');
  return response.json();
};

// 2. Add a new project (No changes, logic is correct)
// Note: The calling component is responsible for creating the FormData correctly
export const addProjectAPI = async (projectFormData) => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token not found. Please log in again.");
  
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: projectFormData,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to add project.');
  return data;
};

// 3. Update a project (No changes, logic is correct)
// Note: The calling component is responsible for creating the FormData correctly
export const updateProjectAPI = async (id, projectFormData) => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token not found. Please log in again.");
  
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${token}` },
    body: projectFormData,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to update project.');
  return data;
};

// 4. Delete a project (✅ Cleaned up and made more robust)
export const deleteProjectAPI = async (id) => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token not found. Please log in again.");

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });

  // If the request fails, throw an error with the server message
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Failed to delete project.' }));
    throw new Error(errorData.message);
  }

  // On success, return the original ID to update the Redux state
  // The backend now also returns the ID, which we could use, but this is simpler and effective.
  return id;
};