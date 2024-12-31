

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import { Room } from "../../Types";
import dayjs from 'dayjs';

export const fetchRoomSearch = createAsyncThunk(
  "roomSearch/fetchRoomSearch",
  async (searchData: { 
    checkInDate: any, 
    checkOutDate: any, 
    adults: number, 
    minPrice: number,  
    maxPrice: number 
  }, thunkAPI) => {
    try {
      const { checkInDate, checkOutDate, adults, minPrice, maxPrice } = searchData;
      
      // Convert dates to strings safely
      const formattedCheckIn = checkInDate ? dayjs(checkInDate.$d || checkInDate).format('MM-DD-YYYY') : '';
      const formattedCheckOut = checkOutDate ? dayjs(checkOutDate.$d || checkOutDate).format('MM-DD-YYYY') : '';
      
      const response = await axiosClient.get(
        `/rooms/available?checkIn=${encodeURIComponent(formattedCheckIn)}&checkOut=${encodeURIComponent(formattedCheckOut)}&capacity=${adults}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      );
      

      // Check if response.data exists and has the expected structure
      if (!response.data) {
        return thunkAPI.rejectWithValue('No data received from server');
      }

      // If your API returns a success flag, check it
      if (response.data.success === false) {
        return thunkAPI.rejectWithValue(response.data.message || 'Operation failed');
      }

      // Return the actual rooms data
      // Adjust this based on your actual API response structure
      const rooms = response.data.rooms || response.data;
      return Array.isArray(rooms) ? rooms : [];

    } catch (error: any) {
      console.error('API Error:', error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'An error occurred while fetching rooms'
      );
    }
  }
);

interface RoomState {
  roomSearch: Room[];
  loading: boolean;
  error: string | null;
}

const initialValue: RoomState = {
  roomSearch: [],
  loading: false,
  error: null
};

export const RoomSearchSlice = createSlice({
  name: "RoomSearchSlice",
  initialState: initialValue,
  reducers: {
    setRoomSearch(state, action: PayloadAction<Room[]>) {
      state.roomSearch = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoomSearch.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchRoomSearch.fulfilled, (state, action) => {   
      state.loading = false;
      state.roomSearch = action.payload;
      state.error = null;
    });
    builder.addCase(fetchRoomSearch.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || 'An error occurred';
    });
  },
});

export const { setRoomSearch, setLoading, clearError } = RoomSearchSlice.actions;
export default RoomSearchSlice.reducer;