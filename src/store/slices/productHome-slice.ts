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


export const fetchProductHome: any = createAsyncThunk  (
    "ProductCarouselSlice/fetchProductHome", 
    async (payload: {  _limit: number }, thunkAPI) => {
      try {
        const response = await axiosClient.get(`/products?popularityScore_gte=99`);
        return response; 
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

interface ProductByCategoryState {
    ProductHome: Product[] | null; 
    loading: boolean;
}
  
const initialState: ProductByCategoryState = {
    ProductHome: [], 
    loading: false,
};
  
  export const ProductHomelSlice = createSlice({
    name: "ProductHomelSlice",
    initialState,
    reducers: {
      setProductDetail(state, action) {
        state.ProductHome = action.payload;
      },
      setLoading(state, action: PayloadAction<boolean>) {
        state.loading = action.payload;
      },
    },
  extraReducers: (builder) => {

    builder.addCase(fetchProductHome.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchProductHome.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.ProductHome = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchProductHome.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default  ProductHomelSlice.reducer;
