// ✅ FILE: src/features/adminSlice/profile/profileSlice.js (COMPLETE AND FINAL)

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProfileAPI, updateProfileAPI, changePasswordAPI } from './profileAPI';

// ⭐ IMPORT: Dono auth actions ko yahan import karein taaki ye slice unhe sun sake
import { adminLoginAsync, logoutAsync } from '../auth/loginSlice';

// --- Initial State ---
const initialState = {
  user: null, // Yahan poora user object store hoga
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};


// --- Async Thunks ---

// Profile data fetch karne ke liye (e.g., page refresh par)
export const getProfileAsync = createAsyncThunk(
  'profile/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getProfileAPI();
      localStorage.setItem('user', JSON.stringify(data.user)); // localStorage ko sync karein
      return data.user; // User object action ka payload banega
    } catch (error) {
      // Agar token invalid/expire ho gaya hai, to ye fail hoga. Stored data ko saaf kar dein.
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return rejectWithValue(error.message);
    }
  }
);

// Profile details (naam, email, avatar) update karne ke liye
export const updateProfileAsync = createAsyncThunk(
  'profile/updateProfile',
  async (profileFormData, { rejectWithValue }) => {
    try {
      const data = await updateProfileAPI(profileFormData);
      localStorage.setItem('user', JSON.stringify(data.user)); // localStorage ko naye data se update karein
      return data.user; // Naya user object payload banega
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// User ka password badalne ke liye
export const changePasswordAsync = createAsyncThunk(
  'profile/changePassword',
  async (passwords, { rejectWithValue }) => {
    try {
      const response = await changePasswordAPI(passwords);
      return response; // Humein bas success message chahiye
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// --- The Slice Definition ---
export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // Logout par call karne ke liye synchronous action
    clearProfile: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
    // Sirf status aur error ko reset karne ke liye (e.g., modal band karne par)
    resetProfileStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // --- GET PROFILE ---
      .addCase(getProfileAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProfileAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(getProfileAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.user = null;
        state.error = action.payload;
      })
      
      // --- UPDATE PROFILE ---
      .addCase(updateProfileAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProfileAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; // Ye sahi hai, kyonki API se poora user object wapas aata hai
      })
      .addCase(updateProfileAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // --- CHANGE PASSWORD ---
      .addCase(changePasswordAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(changePasswordAsync.fulfilled, (state) => {
        state.status = 'succeeded';
        // ✅ CRITICAL FIX: Yahan state.user ko nahi chhedna hai,
        // kyonki password change API se user data wapas nahi aata.
        // Hum sirf status ko 'succeeded' set kar rahe hain.
      })
      .addCase(changePasswordAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // --- Listen to actions from other slices ---

      // ✅ JAB LOGIN SAFAL HO: auth slice se user data lekar is slice ko update karo
      .addCase(adminLoginAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user; 
      })
      
      // ✅ JAB LOGOUT HO: auth slice ke logout action ko sunkar is slice ko reset karo
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null;
        state.status = 'idle';
        state.error = null;
      });
  },
});


// --- Exports ---
export const { clearProfile, resetProfileStatus } = profileSlice.actions;

// Poore slice ke liye selector
export const selectProfile = (state) => state.profile;

// Alag-alag state ke liye specific selectors (Best Practice)
export const selectUserProfile = (state) => state.profile.user;
export const selectProfileStatus = (state) => state.profile.status;
export const selectProfileError = (state) => state.profile.error;

export default profileSlice.reducer;