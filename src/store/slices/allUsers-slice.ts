import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

// Define the User type
export type User = {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  confirmPassword: string;
  marketingConsent: boolean;
  profilingConsent: boolean;
  createdAt: number;
  updatedAt: number;
  deletedAt: number;
};

export const fetchAllUsers: any = createAsyncThunk(
    "userAllSlice/fetchAllUsers",
    async (payload: { page: number; _limit: number }, thunkAPI) => {
      try {
        const response = await axiosClient.get<User[]>(`/users?_page=${payload.page}&_limit=${payload._limit}`);
        return response; 
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  
interface UsersState {
  allUsers: User[];
  loading: boolean;
}

const initialState: UsersState = {
    allUsers: [],
  loading: false,
};


export const userAllSlice: any = createSlice({
  name: "userAllSlice",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.allUsers = action.payload; 
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        console.log("Fetching user rejected. Error:", action.payload);
      });
  },
});


export default userAllSlice.reducer;
