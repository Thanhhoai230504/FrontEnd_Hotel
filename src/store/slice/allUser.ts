import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import { User } from "../../Types";


interface UserState {
  loading: boolean;
  allUsers: User[];
  error: string | null;
}

const initialState: UserState = {
  loading: false,
  allUsers: [],
  error: null
};

export const fetchAllUsers = createAsyncThunk<
  User[], // Kiểu dữ liệu trả về (danh sách Room)
  { page: number; _limit: number }, // Kiểu của payload
  { rejectValue: string } // Kiểu dữ liệu lỗi
>(
  "user/fetchAllUsers",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/users?page=${payload.page}&limit=${payload._limit}`);
      return response.data;

    //   console.log("response.data",response.data);
      
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.allUsers = action.payload;
        state.error = null;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;


