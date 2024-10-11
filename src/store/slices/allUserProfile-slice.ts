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

export const fetchAllUsersProfile: any = createAsyncThunk(
    "userAllProfileSlice/fetchAllUsersProfile",
    async (payload, thunkAPI) => {
      try {
        const response = await axiosClient.get<User[]>("/users");
        return response; 
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  
interface UsersState {
  allUsersProfile: User[];
  loading: boolean;
}

const initialState: UsersState = {
    allUsersProfile: [],
  loading: false,
};


export const userAllProfileSlice: any = createSlice({
  name: "userAllProfileSlice",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsersProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsersProfile.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.allUsersProfile = action.payload; 
      })
      .addCase(fetchAllUsersProfile.rejected, (state, action) => {
        state.loading = false;
        console.log("Fetching user rejected. Error:", action.payload);
      });
  },
});


export default userAllProfileSlice.reducer;
