// ✅ FILE: src/admin/components/adminSlices/ManageTestimonials/ManageTestimonialsAPI.js

const API_URL = "http://localhost:3000/api/testimonials";

const getAuthToken = () => localStorage.getItem('token');

export const fetchTestimonialsAPI = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch testimonials.');
  return response.json();
};

export const addTestimonialAPI = async (testimonialFormData) => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token not found.");
  
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: testimonialFormData,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to add testimonial.');
  return data;
};

export const updateTestimonialAPI = async (id, testimonialFormData) => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token not found.");
  
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${token}` },
    body: testimonialFormData,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to update testimonial.');
  return data;
};

export const deleteTestimonialAPI = async (id) => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token not found.");

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to delete testimonial.');
  }
  return id;
};