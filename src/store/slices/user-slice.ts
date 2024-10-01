import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

// Define the User type
export type User = {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const fetchUser = createAsyncThunk(
  "userSlice/fetchUser",
  async (id: string, thunkAPI) => {
    try {
      const response: User = await axiosClient.get("/users");
      return response; 
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message); 
    }
  }
);
// Define the initial state
const initialState = {
  users: [] as User[],
  loading: false,
  loggedInUser: null as User | null,
};

// Create the user slice
export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loggedInUser = action.payload;
    },
    logout: (state) => {
      state.loggedInUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedInUser = action.payload; 
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        console.log("Fetching user rejected. Error:", action.payload);
      });
  },
});

// Export actions and reducer
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
