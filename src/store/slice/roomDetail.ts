import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import { Room } from "../../Types";

// Fetch room details by ID
export const fetchRoomDetail: any = createAsyncThunk(
  "rooms/fetchRoomDetail",
  async (roomId: string, thunkAPI) => {
    try {
      const response: Room = await axiosClient.get(`/rooms/${roomId}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

interface RoomDetailState {
  rooms: Room[]; // Danh sách các phòng
  room: Room | null; // Chi tiết phòng
  loading: boolean;
}

const initialValue: RoomDetailState = {
  rooms: [],
  room: null, // Mặc định không có phòng nào được chọn
  loading: false,
};

export const RoomDetailSlice = createSlice({
  name: "RoomDetailSlice",
  initialState: initialValue,
  reducers: {
    setRoomDetail(state, action: PayloadAction<Room>) {
      state.room = action.payload; // Cập nhật chi tiết phòng
      state.loading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoomDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRoomDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.room = action.payload; 
    });
    builder.addCase(fetchRoomDetail.rejected, (state, action) => {
      state.loading = false;
      console.error("Fetching room detail rejected. Error:", action.error.message);
    });
  },
});

export const { setRoomDetail, setLoading } = RoomDetailSlice.actions;
export default RoomDetailSlice.reducer;
