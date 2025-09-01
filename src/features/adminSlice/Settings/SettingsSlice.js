// ✅ FILE: src/admin/components/adminSlices/Settings/SettingsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSettingsAPI, updateSettingsAPI, changePasswordAPI } from './SettingsAPI';

const initialState = { data: { general: {}, social: {} }, status: 'idle', error: null, passwordChangeStatus: 'idle', passwordChangeError: null };

export const fetchSettingsAsync = createAsyncThunk(/* ... */);
export const updateSettingsAsync = createAsyncThunk('settings/update', async (settingsData, { rejectWithValue }) => {
  try { return await updateSettingsAPI(settingsData); } catch (error) { return rejectWithValue(error.message); }
});
export const changePasswordAsync = createAsyncThunk('settings/changePassword', async (passwordData, { rejectWithValue }) => {
    try { return await changePasswordAPI(passwordData); } catch (error) { return rejectWithValue(error.message); }
});

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: { /* ... */ },
  extraReducers: (builder) => {
    builder
      // Settings Fetch/Update
      .addCase(fetchSettingsAsync.fulfilled, (state, action) => { state.data = action.payload; })
      .addCase(updateSettingsAsync.pending, state => { state.status = 'loading'; })
      .addCase(updateSettingsAsync.fulfilled, (state, action) => { state.status = 'succeeded'; state.data = action.payload.settings; })
      .addCase(updateSettingsAsync.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; })
      // Password Change
      .addCase(changePasswordAsync.pending, state => { state.passwordChangeStatus = 'loading'; })
      .addCase(changePasswordAsync.fulfilled, state => { state.passwordChangeStatus = 'succeeded'; })
      .addCase(changePasswordAsync.rejected, (state, action) => { state.passwordChangeStatus = 'failed'; state.passwordChangeError = action.payload; });
  }
});
export const selectSettings = (state) => state.settings;
export default settingsSlice.reducer;