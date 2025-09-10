// ✅ FILE: features/adminSlice/auth/passwordResetSlice.js (CORRECTED)

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// CAMBIO: He limpiado un poco la ruta de importación para que sea más estándar
import { EMAIL_URL } from '../../../authURL/URL';

// La URL base para las llamadas a la API de autenticación/email
const API_URL = `${EMAIL_URL}`; // Asumimos que EMAIL_URL es http://localhost:4000/api

// ... (sendResetLinkAsync ahora usa API_URL)
export const sendResetLinkAsync = createAsyncThunk(
  'passwordReset/sendLink',
  async ({ email }, { rejectWithValue }) => {
    try {
      // CAMBIO: Se usa la variable API_URL para construir la URL completa
      const response = await axios.post(`${API_URL}/forgot-password`, { email });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send reset link');
    }
  }
);

// ✅ resetPasswordAsync ahora usa API_URL
export const resetPasswordAsync = createAsyncThunk(
  'passwordReset/reset',
  async ({ token, password }, { rejectWithValue }) => {
    try {
      // CAMBIO: Se usa la variable API_URL para construir la URL completa
      const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to reset password');
    }
  }
);

const initialState = {
  loading: false,
  successMessage: null,
  error: null,
};

const passwordResetSlice = createSlice({
  name: 'passwordReset',
  initialState,
  reducers: {
    resetPasswordState: (state) => {
      state.loading = false;
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Reducers para sendResetLinkAsync
      .addCase(sendResetLinkAsync.pending, (state) => {
        state.loading = true;
        state.successMessage = null;
        state.error = null;
      })
      .addCase(sendResetLinkAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(sendResetLinkAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Reducers para resetPasswordAsync
      .addCase(resetPasswordAsync.pending, (state) => {
        state.loading = true;
        state.successMessage = null;
        state.error = null;
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPasswordState } = passwordResetSlice.actions;
export default passwordResetSlice.reducer;