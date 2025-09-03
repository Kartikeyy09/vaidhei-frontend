// ✅ FILE: src/features/adminSlice/ManageTenders/ManageTendersSlice.js (COMPLETE AND CONFIRMED)

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTendersAPI, addTenderAPI, updateTenderAPI, deleteTenderAPI } from './ManageTendersAPI';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

// --- Async Thunks ---
// In thunks mein koi badlav ki zaroorat nahi hai.

export const fetchTendersAsync = createAsyncThunk(
  'tenders/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchTendersAPI();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTenderAsync = createAsyncThunk(
  'tenders/add',
  async (formData, { rejectWithValue }) => {
    try {
      return await addTenderAPI(formData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTenderAsync = createAsyncThunk(
  'tenders/update',
  // `updatedData` yahan par poora FormData object hoga
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      return await updateTenderAPI(id, updatedData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTenderAsync = createAsyncThunk(
  'tenders/delete',
  async (id, { rejectWithValue }) => {
    try {
      return await deleteTenderAPI(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// --- Slice Definition ---
const manageTendersSlice = createSlice({
  name: 'manageTenders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fulfilled cases: Jab API call safal ho
      .addCase(fetchTendersAsync.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(addTenderAsync.fulfilled, (state, action) => {
        // action.payload mein naye fields (description, etc.) ke saath poora tender object aayega
        state.data.unshift(action.payload);
      })
      .addCase(updateTenderAsync.fulfilled, (state, action) => {
        // action.payload mein updated tender object aayega
        const index = state.data.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteTenderAsync.fulfilled, (state, action) => {
        // action.payload yahan par deleted tender ka ID hoga
        state.data = state.data.filter(item => item._id !== action.payload);
      })

      // addMatcher ka istemal karke humne boilerplate code kam kar diya hai.
      // Yeh sabhi 'pending' actions ke liye loading ko true set karega.
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      // Yeh sabhi 'rejected' actions ke liye loading ko false aur error ko set karega.
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      // Yeh sabhi 'fulfilled' actions ke liye loading ko false set karega.
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const selectManageTenders = (state) => state.manageTenders;
export default manageTendersSlice.reducer;