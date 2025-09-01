// FILE: src/admin/components/adminSlices/ManageServices/ManageServicesSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchServicesAPI,
  addServiceAPI,
  updateServiceAPI,
  deleteServiceAPI
} from './ManageServicesAPI';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

// Async Thunks (No changes here)
export const fetchManageServicesAsync = createAsyncThunk(
  'manageServices/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchServicesAPI();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addServiceAsync = createAsyncThunk(
  'manageServices/add',
  async (serviceFormData, { rejectWithValue }) => {
    try {
      return await addServiceAPI(serviceFormData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateServiceAsync = createAsyncThunk(
  'manageServices/update',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      return await updateServiceAPI(id, updatedData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteServiceAsync = createAsyncThunk(
  'manageServices/delete',
  async (id, { rejectWithValue }) => {
    try {
      return await deleteServiceAPI(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const manageServicesSlice = createSlice({
  name: 'manageServices',
  initialState,
  reducers: {},
  // ✅ CORRECTED ORDER IN extraReducers
  extraReducers: (builder) => {
    builder
      // 1. Handle all specific 'fulfilled' cases FIRST
      .addCase(fetchManageServicesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addServiceAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data.unshift(action.payload); // Add new service to the top
      })
      .addCase(updateServiceAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteServiceAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(item => item._id !== action.payload);
      })

      // 2. Handle all generic cases using 'addMatcher' LAST
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const selectManageServices = (state) => state.manageServices;
export default manageServicesSlice.reducer;