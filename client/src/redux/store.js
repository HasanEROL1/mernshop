import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import authReducer from './slices/authSlice';
import adminReducer from './slices/adminSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    user: authReducer,
    admin: adminReducer
  },
});
export default store;
