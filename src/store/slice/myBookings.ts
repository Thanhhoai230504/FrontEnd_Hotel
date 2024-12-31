import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";


export const fetchMyBookings: any = createAsyncThunk(
  "myBookingSlice/fetchMyBookings",
  async (_, thunkAPI) => {
    try {
      const response: any = await axiosClient.get('/bookings/my-bookings');
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

interface RoomDetailState {
  bookings: any[];  
  loading: boolean;
}

const initialValue: RoomDetailState = {
  bookings: [],
  loading: false,
};

export const myBookingSlice = createSlice({
  name: "myBookingSlice",
  initialState: initialValue,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMyBookings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMyBookings.fulfilled, (state, action) => {
      state.loading = false;
      state.bookings = action.payload; 
    });
    builder.addCase(fetchMyBookings.rejected, (state, action) => {
      state.loading = false;
      console.error("Fetching room detail rejected. Error:", action.error.message);
    });
  },
});

export const {} = myBookingSlice.actions; 
export default myBookingSlice.reducer; 
