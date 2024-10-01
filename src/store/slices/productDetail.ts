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


export const fetchProductDetail = createAsyncThunk(
  "productDetailSlice/fetchProductDetail",
  async (id: string, thunkAPI) => {
    try {
      const response: Product = await axiosClient.get(`/products/${id}`);
      return response;  
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message); 
    }
  }
);

interface ProductByCategoryState {
    productDetail: Product | null
    loading: boolean;
  }
  
  const initialState: ProductByCategoryState = {
    productDetail: null,
    loading: false,
  };
  
  export const productDetailSlice = createSlice({
    name: "productDetailSlice",
    initialState,
    reducers: {
      setProductDetail(state, action: PayloadAction<Product | null>) {
        state.productDetail = action.payload;
      },
      setLoading(state, action: PayloadAction<boolean>) {
        state.loading = action.payload;
      },
    },
  extraReducers: (builder) => {
    // Khi đang fetch, set loading = true
    builder.addCase(fetchProductDetail.pending, (state) => {
      state.loading = true;
    });
    // Khi fetch thành công, cập nhật danh sách sản phẩm
    builder.addCase(fetchProductDetail.fulfilled, (state, action: PayloadAction<Product>) => {
      state.productDetail = action.payload;
      state.loading = false;
    });
    // Khi fetch thất bại, cập nhật lỗi và tắt loading
    builder.addCase(fetchProductDetail.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default productDetailSlice.reducer;
