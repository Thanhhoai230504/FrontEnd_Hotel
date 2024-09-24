import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user-slice";
import productSlice from "./slices/product-slice";
import categoriesReducer from "./slices/categories-slice"; 
import { useDispatch } from "react-redux";
import productCategoriesReducer from "./slices/productByCategories";

const store = configureStore({
  reducer: {
    userState: userSlice,
    productState: productSlice,
    categoriesState: categoriesReducer, 
    productCategories: productCategoriesReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export store
export default store;
export const useAppDispatch = () => useDispatch<AppDispatch>();