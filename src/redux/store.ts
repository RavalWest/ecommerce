import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";
import rootReducer from "./reducers";
import { products } from "./services/products";

export const store = configureStore({
  reducer: {
    rootReducer,
    [products.reducerPath]: products.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(products.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
