// ✅ FILE: src/features/adminSlice/auth/loginSlice.js (COMPLETE - ONLY AUTH LOGIC)

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminLoginAPI, logoutAPI } from './loginAPI';
// ❌ CRITICAL CHANGE: Profile-related thunks yahan se hata diye gaye hain.
// import { getProfileAsync, updateProfileAsync } from '../profile/profileSlice'; 

// --- Initial State Setup ---
// Safely parse user data from localStorage for session persistence.
let user = null;
try {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    user = JSON.parse(storedUser);
  }
} catch (error){
  // console.error("Could not parse user data from localStorage:", error);
  user = null; // Reset on parsing error
}

const token = localStorage.getItem('token');

// The initial state of this 'auth' slice.
const initialState = {
  user: user || null,
  token: token || null,
  isAuthenticated: !!(user && token),
  loading: false, // This loading state is ONLY for the login/logout process.
  error: null,
};


// --- Async Thunks (Authentication Only) ---

// Handles the user login process.
export const adminLoginAsync = createAsyncThunk(
  'auth/login',
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

// Handles the user logout process.
export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutAPI();
    } catch (error) {
      console.error("Logout API call failed, proceeding with client-side logout:", error);
    } finally {
      // Always clear localStorage, even if the API call fails.
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }
);


// --- The Slice Definition ---

export const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Synchronous action to clear login-specific errors from the UI.
    resetLoginState: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  // This section now ONLY handles authentication thunks.
  extraReducers: (builder) => {
    builder
      // --- Login Reducers ---
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
      // --- Logout Reducer ---
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      });
      
      // ❌ CRITICAL CHANGE: Profile-related listeners yahan se hata diye gaye hain.
  },
});

// --- Exports ---
export const { resetLoginState } = loginSlice.actions;

// Selector to get the auth state. The slice name in the store must be 'auth'.
export const selectLogin = (state) => state.auth;

export default loginSlice.reducer;