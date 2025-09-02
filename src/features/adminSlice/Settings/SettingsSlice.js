// ✅ FILE: src/admin/components/adminSlices/Settings/SettingsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSettingsAPI, updateSettingsAPI, changePasswordAPI } from './SettingsAPI';

const initialState = { 
  data: { general: {}, social: {} }, 
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  passwordChangeStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  passwordChangeError: null 
};

// ✅ 1. Completed fetchSettingsAsync thunk
export const fetchSettingsAsync = createAsyncThunk(
  'settings/fetch',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchSettingsAPI();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateSettingsAsync = createAsyncThunk('settings/update', async (settingsData, { rejectWithValue }) => {
  try { return await updateSettingsAPI(settingsData); } catch (error) { return rejectWithValue(error.message); }
});

export const changePasswordAsync = createAsyncThunk('settings/changePassword', async (passwordData, { rejectWithValue }) => {
    try { return await changePasswordAPI(passwordData); } catch (error) { return rejectWithValue(error.message); }
});

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  // ✅ 2. Added a new reducer for better UX
  reducers: {
    // This action can be dispatched from the UI to reset the password form state
    resetPasswordStatus: (state) => {
        state.passwordChangeStatus = 'idle';
        state.passwordChangeError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // --- Handle specific 'fulfilled' cases first ---
      .addCase(fetchSettingsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(updateSettingsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.settings; 
      })
      .addCase(changePasswordAsync.fulfilled, (state) => {
        state.passwordChangeStatus = 'succeeded';
        state.passwordChangeError = null; // Clear previous errors on success
      })

      // ✅ 3. Use `addMatcher` to handle generic 'pending' and 'rejected' cases
      // This runs for ANY action that ends in '/pending'
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          // Differentiate between general settings and password change
          if (action.type.startsWith('settings/changePassword')) {
            state.passwordChangeStatus = 'loading';
            state.passwordChangeError = null;
          } else {
            state.status = 'loading';
            state.error = null;
          }
        }
      )
      // This runs for ANY action that ends in '/rejected'
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
           if (action.type.startsWith('settings/changePassword')) {
            state.passwordChangeStatus = 'failed';
            state.passwordChangeError = action.payload;
          } else {
            state.status = 'failed';
            state.error = action.payload;
          }
        }
      );
  }
});

export const { resetPasswordStatus } = settingsSlice.actions; // ✅ Export the new action
export const selectSettings = (state) => state.settings;
export default settingsSlice.reducer;