import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";


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

export const fetchUsersProfile: any = createAsyncThunk(
  "userProfileSlice/fetchUsersProfile",
  async ( id: string , thunkAPI) => {
    try {
      const response = await axiosClient.get<User[]>(`/users?id=${id}`);
      return response; 
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

  
interface UsersState {
  usersProfile: User[];
  loading: boolean;
}

const initialState: UsersState = {
usersProfile: [],
  loading: false,
};


export const userProfileSlice: any = createSlice({
  name: "userProfileSlice",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsersProfile.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.usersProfile = action.payload; 
        console.log("Fetched users:", action.payload); 
      })
      .addCase(fetchUsersProfile.rejected, (state, action) => {
        state.loading = false;
        console.log("Fetching user rejected. Error:", action.payload);
      });
  },
});


export default userProfileSlice.reducer;
