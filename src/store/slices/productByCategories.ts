import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";  // Import axios client

export type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    brand: string;
    categoryId: string;
    // các thuộc tính khác...
};

// Async thunk để lấy sản phẩm theo categoryId
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (categoryId: string, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/products?categoryId=${categoryId}`);
      return response.data;  // Trả về danh sách sản phẩm
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message); // Trả về lỗi nếu xảy ra
    }
  }
);

// Slice để quản lý trạng thái sản phẩm
interface ProductByCategoryState {
    productsByCategory: any[];
    loading: boolean;
  }
  
  const initialState: ProductByCategoryState = {
    productsByCategory: [],
    loading: false,
  };
  
  export const productCategoriesSlice = createSlice({
    name: "productCategories",
    initialState,
    reducers: {
      setProductsByCategory(state, action: PayloadAction<any[]>) {
        state.productsByCategory = action.payload;
      },
      setLoading(state, action: PayloadAction<boolean>) {
        state.loading = action.payload;
      },
    },
  extraReducers: (builder) => {
    // Khi đang fetch, set loading = true
    builder.addCase(fetchProductsByCategory.pending, (state) => {
      state.loading = true;
    });
    // Khi fetch thành công, cập nhật danh sách sản phẩm
    builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
      state.productsByCategory = action.payload;
      state.loading = false;
    });
    // Khi fetch thất bại, cập nhật lỗi và tắt loading
    builder.addCase(fetchProductsByCategory.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default productCategoriesSlice.reducer;
