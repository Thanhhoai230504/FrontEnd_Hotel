
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

export type Categories = {
    id: number;
    name: string;
};

export const fetchCategories: any = createAsyncThunk(
  "categories/fetchCategories",
  async (payload:Categories, thunkAPI) => {
    try {
      const response:any[] = await axiosClient.get("/categories");
      return response;
    } catch (error: any) {
      return error;
    }
  }
);
const initialValue = {
Categories: [] as Categories[],
  loading: false,
};

export const CategoriesSlice = createSlice({
  name: "CategoriesSlice",
  initialState: initialValue,
  reducers: {
    add: (state, action) => {
      
    },
  },
  
  
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.Categories = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      console.log("Fetching users rejected. Error:", action.error.message);
      
    });
  },
});
export const { add } = CategoriesSlice.actions;
export default CategoriesSlice.reducer;


