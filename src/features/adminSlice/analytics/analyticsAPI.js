// You will need to create a new 'analytics' folder inside 'adminSlice'

// IMPORTANT: Replace this with the actual URL to fetch ALL inquiries
import { INQUIRY_URL } from '../../../authURL/URL'; 

const API_URL = `${INQUIRY_URL}`;

const getAuthToken = () => localStorage.getItem('token');

/**
 * Fetches the list of all inquiries from the backend.
 * This raw data will be processed in the analyticsSlice to generate chart data.
 */
export const fetchInquiriesForAnalyticsAPI = async () => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("Authentication token not found.");
  }
  
  const response = await fetch(API_URL, {
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' 
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Failed to fetch inquiries for analytics.' }));
    throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
  }
  
  return response.json();
};