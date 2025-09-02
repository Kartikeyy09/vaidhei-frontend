// ✅ FILE: src/admin/components/adminSlices/Dashboard/DashboardAPI.js
import { DASHBOARD_URL} from '../../../authURL/URL';

const API_URL = `${DASHBOARD_URL}`;;

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