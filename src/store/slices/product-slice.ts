
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

export type Product = {
  id: string; // Change this to string if necessary
  name: string;
  price: number;
  description: string;
  image: string;
  brand: string;
  quantity: number;
  sold: number;
  color?: string; // Optional
  popularityScore: number;
  condition: string;
  size: string;
  categoryId: string;
  productId: string;
};

export const fetchProducts: any = createAsyncThunk(
  "products/fetchProducts",
  async (payload: { page: number; _limit: number; categoryId?: string, id?: string }, thunkAPI) => {
    try {
      const response: Product[] = await axiosClient.get(
        `/products?price_gte=200&_page=${payload.page}&_limit=${payload._limit}${payload.categoryId ? `&categoryId=${payload.categoryId}` : ''}`
      );
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export interface CartItem {
  productId: string;
  quantity: number;
  size: string;
  userId: string;
  id: string;
  product: Product;
}

export interface ProductState {
  products: Product[];
  cart: CartItem[];
  loading: boolean; // Ensure to add loading to the state interface
  currentProductId: string | null;
}

const initialValue: ProductState = {
  products: [], 
  cart: [],
  currentProductId: null,
  loading: false,
};

export const ProductSlice = createSlice({
  name: "ProductSlice",
  initialState: initialValue,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      state.loading = false; 
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload; // Set loading state
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false; 
      state.products = action.payload; 
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      console.error("Fetching products rejected. Error:", action.error.message);
    });
  },
});

export const { setProducts, setLoading } = ProductSlice.actions;
export default ProductSlice.reducer;
