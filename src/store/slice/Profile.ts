import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import { User } from "../../Types";


export const fetchProfiles: any = createAsyncThunk(
  "profiles/fetchProfiles",
  async (_, thunkAPI) => {
    try {
      const response: any = await axiosClient.get("/users/profile");
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

interface ProfileState {
  profiles: User[]; 
  loading: boolean;
}

const initialValue: ProfileState = {
  profiles: [], 
  loading: false,
};

export const ProfileSlice = createSlice({
  name: "ProfileSlice",
  initialState: initialValue,
  reducers: {
  
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfiles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProfiles.fulfilled, (state, action) => {
      state.loading = false; 
      state.profiles = action.payload; 
    });
    builder.addCase(fetchProfiles.rejected, (state, action) => {
      state.loading = false;
      console.error("Fetching profiles rejected. Error:", action.error.message);
    });
  },
});


export default ProfileSlice.reducer;
