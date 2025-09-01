// ✅ FILE: src/admin/components/adminSlices/Dashboard/DashboardSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDashboardStatsAPI } from './DashboardAPI';

const initialState = {
  stats: {},
  recentMilestones: [],
  recentInquiries: [],
  loading: false,
  error: null,
};

export const fetchDashboardStatsAsync = createAsyncThunk('dashboard/fetchStats', async (_, { rejectWithValue }) => {
  try { return await fetchDashboardStatsAPI(); } catch (error) { return rejectWithValue(error.message); }
});

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStatsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStatsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.recentMilestones = action.payload.recentMilestones;
        state.recentInquiries = action.payload.recentInquiries;
      })
      .addCase(fetchDashboardStatsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectDashboard = (state) => state.dashboard;
export default dashboardSlice.reducer;