// FILE: src/admin/components/adminSlices/auth/loginSlice.js (Updated)

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// ✅ IMPORT the logout API function as well
import { adminLoginAPI, logoutAPI } from './loginAPI'; 

const user = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');

const initialState = {
  user: user || null,
  token: token || null,
  isAuthenticated: !!user,
  loading: false,
  error: null,
};

// Login Thunk (No changes here)
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

// ✅ ADD THE LOGOUT ASYNC THUNK
export const logoutAsync = createAsyncThunk(
  'admin/logout', // Action ka unique naam
  async (_, { rejectWithValue }) => {
    try {
      await logoutAPI(); // Logout API ko call karo
      // Client-side se user data saaf karo
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } catch (error) {
      // Agar API fail bhi ho jaye, tab bhi client-side se logout kar do
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return rejectWithValue(error.message);
    }
  }
);

export const loginSlice = createSlice({
  name: 'login', 
  initialState,
  reducers: {
    resetLoginState: (state) => {
        state.loading = false;
        state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases (No change)
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
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })

      // ✅ ADD LOGOUT CASES
      .addCase(logoutAsync.pending, (state) => {
        state.loading = true; // Optional: show a spinner on logout
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        // State ko puri tarah se reset kar do
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        // Agar logout fail bhi ho, tab bhi client par logout kar do
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload; // Error message ko store kar sakte hain
      });
  },
});

export const { resetLoginState } = loginSlice.actions;
export const selectLogin = (state) => state.login;
export default loginSlice.reducer;