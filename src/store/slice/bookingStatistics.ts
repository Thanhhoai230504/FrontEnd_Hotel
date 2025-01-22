import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import { BookingStatistics } from "../../Types";

export const fetchBookingStatistics = createAsyncThunk(
  "BookingStatistics/fetchBookingStatistics",
  async (_, thunkAPI) => {
    try {
      const response = await axiosClient.get("bookings/statistics");
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

interface BookingStatisticsState {
  BookingStatistics: BookingStatistics | null;
  loading: boolean;
  error: string | null;
}

const initialState: BookingStatisticsState = {
  BookingStatistics: null,
  loading: false,
  error: null
};

export const bookingStatisticsSlice = createSlice({
  name: "bookingStatistics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingStatistics.fulfilled, (state, action: PayloadAction<BookingStatistics>) => {
        state.loading = false;
        state.BookingStatistics = action.payload;
        state.error = null;
      })
      .addCase(fetchBookingStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bookingStatisticsSlice.reducer;