import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";  // Import axios client
export type Product = {
  id: string; 
  name: string;
  price: number;
  description: string;
  image: string;
  brand: string;
  quantity: number;
  sold: number;
  color?: string; 
  popularityScore: number;
  condition: string;
  size: string;
};


export const fetchAllProduct: any = createAsyncThunk  (
    "AllProductSlice/fetchAllProduct", 
    async (payload: { page: number; _limit: number }, thunkAPI) => {
      try {
        const response = await axiosClient.get( `/products?_page=${payload.page}&_limit=${payload._limit}`);
        return response; 
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

interface ProductByCategoryState {
    allProduct: Product[] | null; 
    loading: boolean;
}
  
const initialState: ProductByCategoryState = {
    allProduct: [], 
    loading: false,
};
  
  export const AllProductSlice = createSlice({
    name: "AllProductSlice",
    initialState,
    reducers: {
      setProductDetail(state, action) {
        state.allProduct = action.payload;
      },
      setLoading(state, action: PayloadAction<boolean>) {
        state.loading = action.payload;
      },
    },
  extraReducers: (builder) => {

    builder.addCase(fetchAllProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchAllProduct.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.allProduct = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchAllProduct.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default  AllProductSlice.reducer;
