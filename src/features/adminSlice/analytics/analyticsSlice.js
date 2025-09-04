import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchInquiriesForAnalyticsAPI } from './analyticsAPI';

const COLORS = {
  increase: '#22c55e', // green-500
  decrease: '#ef4444', // red-500
  neutral: '#94a3b8', // slate-400
};

// The helper function to transform data is correct and needs no changes.
const transformInquiriesForFullWeek = (inquiries = []) => {
  if (!inquiries) return [];
  const countsByDate = new Map();
  inquiries.forEach(inquiry => {
    const dateStr = inquiry.createdAt || inquiry.date;
    if (!dateStr) return;
    const date = new Date(dateStr);
    const formattedDate = date.toISOString().split('T')[0];
    countsByDate.set(formattedDate, (countsByDate.get(formattedDate) || 0) + 1);
  });
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    last7Days.push(d.toISOString().split('T')[0]);
  }
  let previousDayCount = -1;
  const chartData = last7Days.map(dateStr => {
    const currentDayCount = countsByDate.get(dateStr) || 0;
    let color = COLORS.neutral;
    if (previousDayCount !== -1) {
      if (currentDayCount > previousDayCount) color = COLORS.increase;
      if (currentDayCount < previousDayCount) color = COLORS.decrease;
    }
    previousDayCount = currentDayCount;
    const displayName = new Date(dateStr + 'T12:00:00Z').toLocaleDateString('en-US', { weekday: 'short' });
    return {
      name: displayName,
      fullDate: new Date(dateStr + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      inquiries: currentDayCount,
      color: color,
    };
  });
  return chartData;
};

// ⭐ FIX #1: Add `rawInquiries` to the initial state.
const initialState = {
  chartData: [],
  rawInquiries: [], // This was missing! Initialize it as an empty array.
  status: 'idle',
  error: null,
};

export const fetchAnalyticsDataAsync = createAsyncThunk(
  'analytics/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const inquiries = await fetchInquiriesForAnalyticsAPI();
      return inquiries;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalyticsDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAnalyticsDataAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // ⭐ FIX #2: Store the raw inquiry data from the payload.
        state.rawInquiries = action.payload || []; // The `|| []` is a safety check.
        state.chartData = transformInquiriesForFullWeek(action.payload);
      })
      .addCase(fetchAnalyticsDataAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const selectAnalytics = (state) => state.analytics;
export default analyticsSlice.reducer;  