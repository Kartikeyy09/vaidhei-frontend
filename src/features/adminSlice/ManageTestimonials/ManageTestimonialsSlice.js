// ✅ FILE: src/admin/components/adminSlices/ManageTestimonials/ManageTestimonialsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTestimonialsAPI, addTestimonialAPI, updateTestimonialAPI, deleteTestimonialAPI } from './ManageTestimonialsAPI';

const initialState = { data: [], loading: false, error: null };

export const fetchTestimonialsAsync = createAsyncThunk('testimonials/fetchAll', async (_, { rejectWithValue }) => {
  try { return await fetchTestimonialsAPI(); } catch (error) { return rejectWithValue(error.message); }
});
export const addTestimonialAsync = createAsyncThunk('testimonials/add', async (formData, { rejectWithValue }) => {
  try { return await addTestimonialAPI(formData); } catch (error) { return rejectWithValue(error.message); }
});
export const updateTestimonialAsync = createAsyncThunk('testimonials/update', async ({ id, updatedData }, { rejectWithValue }) => {
  try { return await updateTestimonialAPI(id, updatedData); } catch (error) { return rejectWithValue(error.message); }
});
export const deleteTestimonialAsync = createAsyncThunk('testimonials/delete', async (id, { rejectWithValue }) => {
  try { return await deleteTestimonialAPI(id); } catch (error) { return rejectWithValue(error.message); }
});

const manageTestimonialsSlice = createSlice({
  name: 'manageTestimonials',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonialsAsync.fulfilled, (state, action) => { state.data = action.payload; })
      .addCase(addTestimonialAsync.fulfilled, (state, action) => { state.data.unshift(action.payload); })
      .addCase(updateTestimonialAsync.fulfilled, (state, action) => {
        const index = state.data.findIndex(item => item._id === action.payload._id);
        if (index !== -1) state.data[index] = action.payload;
      })
      .addCase(deleteTestimonialAsync.fulfilled, (state, action) => {
        state.data = state.data.filter(item => item._id !== action.payload);
      })
      .addMatcher(action => action.type.endsWith('/pending'), state => { state.loading = true; state.error = null; })
      .addMatcher(action => action.type.endsWith('/rejected'), (state, action) => { state.loading = false; state.error = action.payload; })
      .addMatcher(action => action.type.endsWith('/fulfilled'), state => { state.loading = false; });
  },
});

export const selectManageTestimonials = (state) => state.manageTestimonials;
export default manageTestimonialsSlice.reducer;