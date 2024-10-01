import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

export interface Order {
    email: string;
    firstName: string;
    lastName: string;
    company: string;
    address: string;
    aptSuite: string;
    city: string;
    country: string;
    postalCode: string;
    telephone: string;
    discountCode: string;
    products: { productId: string; quantity: number; userId: number }[];
    totalAmount: number;
    createdAt: number;
    id: string;
}

export interface OrdersState {
    orders: Order[];
    loading: boolean;
}

const initialState: OrdersState = {
    orders: [],
    loading: false,
};

export const fetchAllOrders : any = createAsyncThunk(
    "orders/fetchAllOrders",
    async (payload: { page: number; _limit: number }, thunkAPI) => {
        try {
            const response = await axiosClient.get(`/Orders?page=${payload.page}&_limit=${payload._limit}`);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const ordersAllSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
            state.orders = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchAllOrders.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAllOrders.rejected, (state) => {
            state.loading = false;
        });
    },
});

export default ordersAllSlice.reducer;
