// ✅ FILE: src/admin/components/adminSlices/ManageTenders/ManageTendersSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTendersAPI, addTenderAPI, updateTenderAPI, deleteTenderAPI } from './ManageTendersAPI';

const initialState = { data: [], loading: false, error: null };

export const fetchTendersAsync = createAsyncThunk('tenders/fetchAll', async (_, { rejectWithValue }) => {
  try { return await fetchTendersAPI(); } catch (error) { return rejectWithValue(error.message); }
});
export const addTenderAsync = createAsyncThunk('tenders/add', async (formData, { rejectWithValue }) => {
  try { return await addTenderAPI(formData); } catch (error) { return rejectWithValue(error.message); }
});
export const updateTenderAsync = createAsyncThunk('tenders/update', async ({ id, updatedData }, { rejectWithValue }) => {
  try { return await updateTenderAPI(id, updatedData); } catch (error) { return rejectWithValue(error.message); }
});
export const deleteTenderAsync = createAsyncThunk('tenders/delete', async (id, { rejectWithValue }) => {
  try { return await deleteTenderAPI(id); } catch (error) { return rejectWithValue(error.message); }
});

const manageTendersSlice = createSlice({
  name: 'manageTenders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTendersAsync.fulfilled, (state, action) => { state.data = action.payload; })
      .addCase(addTenderAsync.fulfilled, (state, action) => { state.data.unshift(action.payload); })
      .addCase(updateTenderAsync.fulfilled, (state, action) => {
        const index = state.data.findIndex(item => item._id === action.payload._id);
        if (index !== -1) state.data[index] = action.payload;
      })
      .addCase(deleteTenderAsync.fulfilled, (state, action) => {
        state.data = state.data.filter(item => item._id !== action.payload);
      })
      .addMatcher(action => action.type.endsWith('/pending'), state => { state.loading = true; state.error = null; })
      .addMatcher(action => action.type.endsWith('/rejected'), (state, action) => { state.loading = false; state.error = action.payload; })
      .addMatcher(action => action.type.endsWith('/fulfilled'), state => { state.loading = false; });
  },
});

export const selectManageTenders = (state) => state.manageTenders;
export default manageTendersSlice.reducer;