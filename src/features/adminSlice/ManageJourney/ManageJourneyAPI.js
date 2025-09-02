// ✅ FILE: src/admin/components/adminSlices/ManageJourney/ManageJourneyAPI.js
import {JOURNEY_URL} from '../../../authURL/URL';
const API_URL = `${JOURNEY_URL}`;

const getAuthToken = () => localStorage.getItem('token');

export const fetchMilestonesAPI = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch milestones.');
  return response.json();
};

export const addMilestoneAPI = async (milestoneFormData) => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token not found.");
  
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: milestoneFormData,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to add milestone.');
  return data;
};

export const updateMilestoneAPI = async (id, milestoneFormData) => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token not found.");
  
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${token}` },
    body: milestoneFormData,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to update milestone.');
  return data;
};

export const deleteMilestoneAPI = async (id) => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token not found.");

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to delete milestone.');
  }
  return id;
};