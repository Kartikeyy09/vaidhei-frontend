// ✅ FILE: src/admin/components/adminSlices/ManageGallery/ManageGallerySlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGalleryAPI, addGalleryItemAPI, updateGalleryItemAPI, deleteGalleryItemAPI } from './ManageGalleryAPI';

const initialState = { data: [], loading: false, error: null };

export const fetchGalleryAsync = createAsyncThunk('gallery/fetchAll', async (_, { rejectWithValue }) => {
  try { return await fetchGalleryAPI(); } catch (error) { return rejectWithValue(error.message); }
});
export const addGalleryItemAsync = createAsyncThunk('gallery/add', async (formData, { rejectWithValue }) => {
  try { return await addGalleryItemAPI(formData); } catch (error) { return rejectWithValue(error.message); }
});
export const updateGalleryItemAsync = createAsyncThunk('gallery/update', async ({ id, updatedData }, { rejectWithValue }) => {
  try { return await updateGalleryItemAPI(id, updatedData); } catch (error) { return rejectWithValue(error.message); }
});
export const deleteGalleryItemAsync = createAsyncThunk('gallery/delete', async (id, { rejectWithValue }) => {
  try { return await deleteGalleryItemAPI(id); } catch (error) { return rejectWithValue(error.message); }
});

const manageGallerySlice = createSlice({
  name: 'manageGallery',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGalleryAsync.fulfilled, (state, action) => { state.data = action.payload; })
      .addCase(addGalleryItemAsync.fulfilled, (state, action) => { state.data.unshift(action.payload); })
      .addCase(updateGalleryItemAsync.fulfilled, (state, action) => {
        const index = state.data.findIndex(item => item._id === action.payload._id);
        if (index !== -1) state.data[index] = action.payload;
      })
      .addCase(deleteGalleryItemAsync.fulfilled, (state, action) => {
        state.data = state.data.filter(item => item._id !== action.payload);
      })
      .addMatcher(action => action.type.endsWith('/pending'), state => { state.loading = true; state.error = null; })
      .addMatcher(action => action.type.endsWith('/rejected'), (state, action) => { state.loading = false; state.error = action.payload; })
      .addMatcher(action => action.type.endsWith('/fulfilled'), state => { state.loading = false; });
  },
});

export const selectManageGallery = (state) => state.manageGallery;
export default manageGallerySlice.reducer;