import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

interface Booking {
  _id: string;
  user: any;
  room: any;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

interface BookingState {
  loading: boolean;
  allBookings: Booking[];
  error: string | null;
}

const initialState: BookingState = {
  loading: false,
  allBookings: [],
  error: null
};

export const fetchAllBookings = createAsyncThunk<
  Booking[], // Kiểu dữ liệu trả về (danh sách Room)
  { page: number; _limit: number }, // Kiểu của payload
  { rejectValue: string } // Kiểu dữ liệu lỗi
>(
  "booking/fetchAllBookings",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/bookings?page=${payload.page}&limit=${payload._limit}`);
      console.log("Response Data:", response.data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBookings.fulfilled, (state, action: PayloadAction<Booking[]>) => {
        state.loading = false;
        state.allBookings = action.payload;
        state.error = null;
      })
      .addCase(fetchAllBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = bookingSlice.actions;
export default bookingSlice.reducer;

// Selectors
export const selectAllBookings = (state: { booking: BookingState }) => state.booking.allBookings;
export const selectBookingLoading = (state: { booking: BookingState }) => state.booking.loading;
export const selectBookingError = (state: { booking: BookingState }) => state.booking.error;