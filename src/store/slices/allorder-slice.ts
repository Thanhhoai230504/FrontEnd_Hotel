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
    products: { productId: string; quantity: number; userId: number; img: string,name: string ,size: string }[];
    totalAmount: number;
    createdAt: number;
    id: string;
    createdAtBrowse?: string;
    status?: string;
    appprovedCount?: number
    isViewed?: boolean
}

export interface OrdersState {
    orders: Order[];
    loading: boolean;
    approvedCount: number
}

const initialState: OrdersState = {
    orders: [],
    loading: false,
    approvedCount: 0
};

export const fetchAllOrders : any = createAsyncThunk(
    "orders/fetchAllOrders",
    async (payload: { page: number; _limit: number }, thunkAPI) => {
        try {
            const response = await axiosClient.get(`/Orders?_page=${payload.page}&_limit=${payload._limit}`);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const ordersAllSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        updateApprovedCount: (state) => {
            state.approvedCount = state.orders.filter((order) => order.isViewed === false).length;    
          },
          resetApprovedCount: (state) => {
            state.orders = state.orders.map((order) => ({
                ...order,
                isViewed: true, 
            }));
            state.approvedCount = 0;
        }  
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllOrders.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAllOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
            state.orders = action.payload;
            state.loading = false;
            state.approvedCount = state.orders.filter((order) => order.isViewed === false).length;
        });
        builder.addCase(fetchAllOrders.rejected, (state) => {
            state.loading = false;
        });
    },
});

export default ordersAllSlice.reducer ;

export const { updateApprovedCount,resetApprovedCount } = ordersAllSlice.actions;
