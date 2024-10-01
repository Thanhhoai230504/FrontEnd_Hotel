



import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import { User } from "./user-slice";


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


export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  size: string;
  product: Product;
  user: User;
}


export const fetchOrderUser: any = createAsyncThunk(
  'OrderUserSlice/fetchOrderUser', 
  async (userId: string, thunkAPI) => {
    try {
      const response: CartItem[] = await axiosClient.get(`/orders?userId=${userId}`); 
      return response; 
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data); 
    }
  }
);

export interface CartState {
oderUser: CartItem[]; 
  loading: boolean; 
}

const initialState: CartState = {
  oderUser: [], 
  loading: false,
};


export const OrderUserSlice: any = createSlice({
  name: "OrderUserSlice",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrderUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrderUser.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
      state.loading = false; 
      state.oderUser = action.payload; 
    });
    builder.addCase(fetchOrderUser.rejected, (state, action) => {
      state.loading = false; 
      console.error("Fetching carts rejected. Error:", action.error.message);
    });
  },
});

export default OrderUserSlice.reducer;
