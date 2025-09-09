// src/features/invoices/invoiceAPI.js
import { INVOICE_URL } from "../../../authURL/URL"; // Make sure you have INVOICE_URL exported
// Example: export const INVOICE_URL = "http://localhost:3000/api/invoices";

const API_URL = `${INVOICE_URL}`;

const getAuthToken = () => localStorage.getItem("token");

// --- Get All Invoices ---
const fetchInvoices = async () => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token not found.");

  const response = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error("Failed to fetch invoices.");
  return response.json();
};

// --- Create Invoice ---
const createInvoice = async (invoiceData) => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token not found.");

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invoiceData),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to create invoice.");
  return data;
};

// --- Update Invoice ---
const updateInvoice = async (id, invoiceData) => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token not found.");

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invoiceData),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to update invoice.");
  return data;
};

// --- Delete Invoice ---
const deleteInvoice = async (invoiceId) => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token not found.");

  const response = await fetch(`${API_URL}/${invoiceId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || "Failed to delete invoice.");
  }

  return invoiceId;
};

const invoiceAPI = {
  fetchInvoices,
  createInvoice,
  updateInvoice,
  deleteInvoice,
};

export default invoiceAPI;
