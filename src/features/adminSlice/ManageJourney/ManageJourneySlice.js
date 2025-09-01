// ✅ FILE: src/admin/components/adminSlices/ManageJourney/ManageJourneySlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMilestonesAPI, addMilestoneAPI, updateMilestoneAPI, deleteMilestoneAPI } from './ManageJourneyAPI';

const initialState = { data: [], loading: false, error: null };

export const fetchMilestonesAsync = createAsyncThunk('journey/fetchAll', async (_, { rejectWithValue }) => {
  try { return await fetchMilestonesAPI(); } catch (error) { return rejectWithValue(error.message); }
});
export const addMilestoneAsync = createAsyncThunk('journey/add', async (formData, { rejectWithValue }) => {
  try { return await addMilestoneAPI(formData); } catch (error) { return rejectWithValue(error.message); }
});
export const updateMilestoneAsync = createAsyncThunk('journey/update', async ({ id, updatedData }, { rejectWithValue }) => {
  try { return await updateMilestoneAPI(id, updatedData); } catch (error) { return rejectWithValue(error.message); }
});
export const deleteMilestoneAsync = createAsyncThunk('journey/delete', async (id, { rejectWithValue }) => {
  try { return await deleteMilestoneAPI(id); } catch (error) { return rejectWithValue(error.message); }
});

const manageJourneySlice = createSlice({
  name: 'manageJourney',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMilestonesAsync.fulfilled, (state, action) => { state.data = action.payload; })
      .addCase(addMilestoneAsync.fulfilled, (state, action) => { state.data.push(action.payload); state.data.sort((a, b) => a.order - b.order); })
      .addCase(updateMilestoneAsync.fulfilled, (state, action) => {
        const index = state.data.findIndex(item => item._id === action.payload._id);
        if (index !== -1) state.data[index] = action.payload;
        state.data.sort((a, b) => a.order - b.order);
      })
      .addCase(deleteMilestoneAsync.fulfilled, (state, action) => {
        state.data = state.data.filter(item => item._id !== action.payload);
      })
      .addMatcher(action => action.type.endsWith('/pending'), state => { state.loading = true; state.error = null; })
      .addMatcher(action => action.type.endsWith('/rejected'), (state, action) => { state.loading = false; state.error = action.payload; })
      .addMatcher(action => action.type.endsWith('/fulfilled'), state => { state.loading = false; });
  },
});

export const selectManageJourney = (state) => state.manageJourney;
export default manageJourneySlice.reducer;