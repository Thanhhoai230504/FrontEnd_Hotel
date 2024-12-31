import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import { Room } from "../../Types";



export const fetchRooms: any = createAsyncThunk(
  "rooms/fetchRooms", 
  async (_, thunkAPI) => {
    try {
      const response: Room[] = await axiosClient.get( "/rooms" )
      ;
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
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

export const RoomSlice = createSlice({
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
    builder.addCase(fetchRooms.pending, (state) => { 
      state.loading = true;
    });
    builder.addCase(fetchRooms.fulfilled, (state, action) => { 
      state.loading = false; 
      state.rooms = action.payload; 
    });
    builder.addCase(fetchRooms.rejected, (state, action) => {
      state.loading = false;
      console.error("Fetching rooms rejected. Error:", action.error.message);
    });
  },
});

export const { setRooms, setLoading } = RoomSlice.actions; 
export default RoomSlice.reducer;
