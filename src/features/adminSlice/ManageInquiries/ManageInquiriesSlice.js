// src/admin/components/adminSlices/ManageInquiries/ManageInquiriesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchInquiriesAPI, fetchInquiryByIdAPI, deleteInquiryAPI, createInquiryAPI } from './ManageInquiriesAPI';

const initialState = { data: [], selectedInquiry: null, loading: false, error: null, success: null };

// --- Async Thunks ---
export const fetchInquiriesAsync = createAsyncThunk('inquiries/fetchAll', async (_, { rejectWithValue }) => {
  try { return await fetchInquiriesAPI(); } catch (error) { return rejectWithValue(error.message); }
});

export const createInquiryAsync = createAsyncThunk('inquiries/create', async (inquiry, { rejectWithValue }) => {
  try { return await createInquiryAPI(inquiry); } catch (error) { return rejectWithValue(error.message); }
});

// Existing thunks...
export const fetchInquiryByIdAsync = createAsyncThunk('inquiries/fetchById', async (id, { rejectWithValue }) => {
  try { return await fetchInquiryByIdAPI(id); } catch (error) { return rejectWithValue(error.message); }
});

export const deleteInquiryAsync = createAsyncThunk('inquiries/delete', async (id, { rejectWithValue }) => {
  try { return await deleteInquiryAPI(id); } catch (error) { return rejectWithValue(error.message); }
});

// --- Slice ---
const manageInquiriesSlice = createSlice({
  name: 'manageInquiries',
  initialState,
  reducers: {
    clearSelectedInquiry: (state) => { state.selectedInquiry = null; state.success = null; },
    clearSuccess: (state) => { state.success = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInquiriesAsync.fulfilled, (state, action) => { state.data = action.payload; })
      .addCase(createInquiryAsync.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.success = "Inquiry submitted successfully!";
      })
      .addCase(fetchInquiryByIdAsync.fulfilled, (state, action) => {
        state.selectedInquiry = action.payload;
        const index = state.data.findIndex(i => i._id === action.payload._id);
        if (index !== -1) state.data[index].status = "Read";
      })
      .addCase(deleteInquiryAsync.fulfilled, (state, action) => {
        state.data = state.data.filter(item => item._id !== action.payload);
      })
      .addMatcher(action => action.type.endsWith('/pending'), state => { state.loading = true; state.error = null; })
      .addMatcher(action => action.type.endsWith('/rejected'), (state, action) => { state.loading = false; state.error = action.payload; })
      .addMatcher(action => action.type.endsWith('/fulfilled'), state => { state.loading = false; });
  },
});

export const { clearSelectedInquiry, clearSuccess } = manageInquiriesSlice.actions;
export const selectManageInquiries = (state) => state.manageInquiries;
export default manageInquiriesSlice.reducer;
