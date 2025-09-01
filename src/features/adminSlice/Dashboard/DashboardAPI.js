// ✅ FILE: src/admin/components/adminSlices/Dashboard/DashboardAPI.js

const API_URL = "http://localhost:3000/api/dashboard/stats";

const getAuthToken = () => localStorage.getItem('token');

export const fetchDashboardStatsAPI = async () => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token not found.");
  
  const response = await fetch(API_URL, {
    headers: { 'Authorization': `Bearer ${token}` },
  });

  if (!response.ok) throw new Error('Failed to fetch dashboard data.');
  return response.json();
};