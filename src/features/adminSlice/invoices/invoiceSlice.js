// src/features/invoices/invoiceSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import invoiceAPI from './invoiceAPI';

const initialState = {
  items: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

// --- Thunks ---
export const fetchInvoicesAsync = createAsyncThunk(
  'invoices/fetchInvoices',
  async () => {
    const response = await invoiceAPI.fetchInvoices();
    // ✅ normalize _id to id
    return response.map(inv => ({ ...inv, id: inv._id || inv.id }));
  }
);

export const addInvoiceAsync = createAsyncThunk(
  'invoices/addInvoice',
  async (invoiceData) => {
    const response = await invoiceAPI.createInvoice(invoiceData);
    return { ...response, id: response._id || response.id };
  }
);

export const updateInvoiceAsync = createAsyncThunk(
  'invoices/updateInvoice',
  async ({ id, invoiceData }) => {
    const response = await invoiceAPI.updateInvoice(id, invoiceData);
    return { ...response, id: response._id || response.id };
  }
);

export const deleteInvoiceAsync = createAsyncThunk(
  'invoices/deleteInvoice',
  async (id) => {
    await invoiceAPI.deleteInvoice(id);
    return id;
  }
);

// --- Slice ---
export const invoiceSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchInvoicesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInvoicesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchInvoicesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // add
      .addCase(addInvoiceAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // update
      .addCase(updateInvoiceAsync.fulfilled, (state, action) => {
        const updatedInvoice = action.payload;
        const index = state.items.findIndex(
          (invoice) => invoice.id === updatedInvoice.id
        );
        if (index !== -1) {
          state.items[index] = updatedInvoice;
        }
      })

      // delete
      .addCase(deleteInvoiceAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((invoice) => invoice.id !== action.payload);
      });
  },
});

// --- Selectors ---
export const selectAllInvoices = (state) => state.invoices.items;
export const getInvoicesStatus = (state) => state.invoices.status;
export const getInvoicesError = (state) => state.invoices.error;

export default invoiceSlice.reducer;
