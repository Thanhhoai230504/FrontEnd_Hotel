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


export const fetchProductCarousel: any = createAsyncThunk  (
    "ProductCarouselSlice/fetchProductCarousel", 
    async (payload: {  _limit: number }, thunkAPI) => {
      try {
        const response = await axiosClient.get(`/products?price_gte=200&_limit=${payload._limit}`);
        return response; 
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

interface ProductByCategoryState {
    ProductCarousel: Product[] | null; 
    loading: boolean;
}
  
const initialState: ProductByCategoryState = {
    ProductCarousel: [], 
    loading: false,
};
  
  export const ProductCarouselSlice = createSlice({
    name: "ProductCarouselSlice",
    initialState,
    reducers: {
      setProductDetail(state, action) {
        state.ProductCarousel = action.payload;
      },
      setLoading(state, action: PayloadAction<boolean>) {
        state.loading = action.payload;
      },
    },
  extraReducers: (builder) => {

    builder.addCase(fetchProductCarousel.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchProductCarousel.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.ProductCarousel = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchProductCarousel.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default  ProductCarouselSlice.reducer;
