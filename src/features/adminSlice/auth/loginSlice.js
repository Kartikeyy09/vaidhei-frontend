// FILE: src/admin/components/adminSlices/auth/loginSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminLoginAPI, logoutAPI, updateProfileAPI } from './loginAPI'; 

// --- Initial State Setup ---
// Safely parse user data from localStorage
let user = null;
try {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    user = JSON.parse(storedUser);
  }
} catch (error) {
  console.error("Could not parse user data from localStorage:", error);
  user = null; // Reset on error
}

const token = localStorage.getItem('token');

const initialState = {
  user: user || null,
  token: token || null,
  isAuthenticated: !!(user && token),
  loading: false,
  error: null,
};


// --- Async Thunks ---

// 🔹 Login Thunk
export const adminLoginAsync = createAsyncThunk(
  'admin/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await adminLoginAPI(credentials);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🔹 Logout Thunk
export const logoutAsync = createAsyncThunk(
  'admin/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutAPI();
    } catch (error) {
      console.error("Logout API call failed, proceeding with client-side logout:", error);
    } finally {
      // Always clear localStorage, even if API fails
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }
);

// 🔹 Update Profile Thunk
export const updateProfileAsync = createAsyncThunk(
  'admin/updateProfile',
  async (profileFormData, { rejectWithValue }) => {
    try {
      const data = await updateProfileAPI(profileFormData);
      // Update localStorage with the new user data from the response
      localStorage.setItem('user', JSON.stringify(data.user));
      return data.user; // Return only the user object to the reducer
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// --- The Slice Definition ---

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    // Action to manually clear errors from the UI
    resetLoginState: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Login
      .addCase(adminLoginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLoginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(adminLoginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })

      // 🔹 Logout
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      })

      // 🔹 Update Profile
      .addCase(updateProfileAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileAsync.fulfilled, (state, action) => {
        state.loading = false;
        // Update the user in the Redux state with the new data
        state.user = action.payload;
      })
      .addCase(updateProfileAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


// --- Exports ---
export const { resetLoginState } = loginSlice.actions;
export const selectLogin = (state) => state.login;
export default loginSlice.reducer;