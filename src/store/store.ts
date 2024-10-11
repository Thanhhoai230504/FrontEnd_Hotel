import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user-slice";
import productSlice from "./slices/product-slice";
import categoriesReducer from "./slices/categories-slice"; 
import { useDispatch } from "react-redux";
import CartSlice  from "./slices/carts-slice";
import  productDetailSlice  from "./slices/productDetail";
import  AllProductSlice  from "./slices/allProduct";
import  ordersAllSlice  from "./slices/allorder-slice";
import userAllSlice  from "./slices/allUsers-slice";
import  OrderUserSlice  from "./slices/orderUser-slice";
import productSearchSlice from "./slices/productSearch-slice";
import  ProductCarouselSlice  from "./slices/productsCarousel-slice";
import  ProductHomelSlice  from "./slices/productHome-slice";
import userProfileSlice from "./slices/userProfile-slice";
import userAllProfileSlice  from "./slices/allUserProfile-slice";


const store = configureStore({
  reducer: {
    userState: userSlice,
    productState: productSlice,
    categoriesState: categoriesReducer, 
    cartsState:CartSlice,
    productDetailState: productDetailSlice,
    allProductState: AllProductSlice,
    allOrderState:ordersAllSlice,
    allUserState:userAllSlice,
    orderUserState: OrderUserSlice,
    productSearchState: productSearchSlice,
    productCarouselState: ProductCarouselSlice,
    productHomeState: ProductHomelSlice,
    userProfileState:userProfileSlice,
    userAllProfileState:userAllProfileSlice
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export store
export default store;
export const useAppDispatch = () => useDispatch<AppDispatch>();

