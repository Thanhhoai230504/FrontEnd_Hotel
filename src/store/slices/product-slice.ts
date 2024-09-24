
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

export type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    brand: string;
    quantity: number;
    sold: number;
    color: string;
    popularityScore: number;
    condition: string;
    size: string;
};

export const fetchProducts: any = createAsyncThunk(
  "products/fetchProducts",
  async (payload: { page: number; _limit: number }, thunkAPI) => {
    try {
      const response: Product[] = await axiosClient.get(
        `/products?_page=${payload.page}&_limit=${payload._limit}`
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
      state.loading = false; // Stop loading when products are set
    },
    selectProduct(state, action: PayloadAction<string | null>) {
      state.currentProductId = action.payload; // Set the selected product ID
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload; // Set loading state
    },
    // Add a product to the cart
    addCart(state, action: PayloadAction<{ productId: string; size: string }>) {
      const existingCartItem = state.cart.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.size === action.payload.size
      );

      if (existingCartItem) {
        // If product is already in the cart, increase the quantity
        existingCartItem.quantity += 1;
      } else {
        // Otherwise, add the product to the cart
        state.cart.push({
          productId: action.payload.productId,
          quantity: 1,
          size: action.payload.size,
        });
      }
    },
    // Handle the buy action
    buy(state, action: PayloadAction<{ productId: string; size: string }>) {
      const product = state.products.find(
        (p) => String(p.id) === action.payload.productId // Chuyển đổi p.id thành chuỗi
      );
    
      if (product && product.quantity > 0) {
        // Giảm số lượng sản phẩm trong kho
        product.quantity -= 1;
        product.sold += 1; // Tăng số lượng sản phẩm đã bán
      }
    }
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true; // Set loading to true while fetching
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false; // Stop loading when fetch is successful
      state.products = action.payload; // Set the fetched products
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false; // Stop loading on failure
      console.error("Fetching products rejected. Error:", action.error.message);
    });
  },
});

export const { setProducts, selectProduct, setLoading, addCart, buy } = ProductSlice.actions;
export default ProductSlice.reducer;
