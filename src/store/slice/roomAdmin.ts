import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import { Room } from "../../Types";


export const fetchAllRooms = createAsyncThunk<
  Room[], // Kiểu dữ liệu trả về (danh sách Room)
  { page: number; _limit: number }, // Kiểu của payload
  { rejectValue: string } // Kiểu dữ liệu lỗi
>(
  "rooms/fetchAllRooms",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/rooms?page=${payload.page}&limit=${payload._limit}`);
      return response.data; // Trả về danh sách Room
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch rooms");
    }
  }
);


interface RoomState {
  rooms: Room[];
  loading: boolean;
}

const initialValue: RoomState = {
  rooms: [],
  loading: false,
};

export const RoomAllSlice = createSlice({
  name: "RoomSlice",
  initialState: initialValue,
  reducers: {
    setRooms(state, action: PayloadAction<Room[]>) {
      state.rooms = action.payload;
      state.loading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllRooms.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllRooms.fulfilled, (state, action) => {
      state.loading = false;
      state.rooms = action.payload;
    });
    builder.addCase(fetchAllRooms.rejected, (state, action) => {
      state.loading = false;
      console.error("Fetching rooms rejected. Error:", action.error.message);
    });
  },
});

export const { setRooms, setLoading } = RoomAllSlice.actions;
export default RoomAllSlice.reducer;
