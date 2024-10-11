import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient"; 
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


export const fetchProductSearch: any = createAsyncThunk(
  "productSearchSlice/fetchProductSearch",
  async (payload: { name: string }, thunkAPI) => {
    try {
      const response: Product = await axiosClient.get(`/products?price_gte=200&name_like=${payload.name}`);
      return response;  
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message); 
    }
  }
);

interface ProductByCategoryState {
    productSearch: Product[] | null;  
    loading: boolean;
  }
  
  const initialState: ProductByCategoryState = {
    productSearch: null,
    loading: false,
  };
  
  export const productSearchSlice = createSlice({
    name: "productSearchSlice",
    initialState,
    reducers: {
    },
  extraReducers: (builder) => {
    // Khi đang fetch, set loading = true
    builder.addCase(fetchProductSearch.pending, (state) => {
      state.loading = true;
    });
    // Khi fetch thành công, cập nhật danh sách sản phẩm
    builder.addCase(fetchProductSearch.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.productSearch = action.payload;
        state.loading = false;
      });
    // Khi fetch thất bại, cập nhật lỗi và tắt loading
    builder.addCase(fetchProductSearch.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default productSearchSlice.reducer;
