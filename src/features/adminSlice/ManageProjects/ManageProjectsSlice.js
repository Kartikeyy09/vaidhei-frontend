// ✅ FILE: src/admin/components/adminSlices/ManageProjects/ManageProjectsSlice.js (Confirmed Correct)

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProjectsAPI, addProjectAPI, updateProjectAPI, deleteProjectAPI } from './ManageProjectsAPI';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

// Async Thunks (No changes needed)
export const fetchProjectsAsync = createAsyncThunk('manageProjects/fetchAll', async (_, { rejectWithValue }) => {
  try { return await fetchProjectsAPI(); } catch (error) { return rejectWithValue(error.message); }
});
export const addProjectAsync = createAsyncThunk('manageProjects/add', async (formData, { rejectWithValue }) => {
  try { return await addProjectAPI(formData); } catch (error) { return rejectWithValue(error.message); }
});
export const updateProjectAsync = createAsyncThunk('manageProjects/update', async ({ id, updatedData }, { rejectWithValue }) => {
  try { return await updateProjectAPI(id, updatedData); } catch (error) { return rejectWithValue(error.message); }
});
export const deleteProjectAsync = createAsyncThunk('manageProjects/delete', async (id, { rejectWithValue }) => {
  try { return await deleteProjectAPI(id); } catch (error) { return rejectWithValue(error.message); }
});

const manageProjectsSlice = createSlice({
  name: 'manageProjects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ This will correctly add the new project object, including the 'details' field
      .addCase(addProjectAsync.fulfilled, (state, action) => { 
        state.data.unshift(action.payload); 
      })
      // ✅ This will correctly update the project with new data, including 'details'
      .addCase(updateProjectAsync.fulfilled, (state, action) => {
        const index = state.data.findIndex(item => item._id === action.payload._id);
        if (index !== -1) state.data[index] = action.payload;
      })
      // ✅ This correctly uses the ID from the payload (returned by deleteProjectAPI) to filter the state
      .addCase(deleteProjectAsync.fulfilled, (state, action) => {
        state.data = state.data.filter(item => item._id !== action.payload);
      })
      .addCase(fetchProjectsAsync.fulfilled, (state, action) => { 
        state.data = action.payload; 
      })
      .addMatcher(action => action.type.endsWith('/pending'), state => { state.loading = true; state.error = null; })
      .addMatcher(action => action.type.endsWith('/rejected'), (state, action) => { state.loading = false; state.error = action.payload; })
      .addMatcher(action => action.type.endsWith('/fulfilled'), state => { state.loading = false; });
  },
});

export const selectManageProjects = (state) => state.manageProjects;
export default manageProjectsSlice.reducer;