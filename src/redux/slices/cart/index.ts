import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "redux/services/types";

interface CartItem {
  product: Product;
  count: number;
}

const initialState: { items: CartItem[]; show: boolean } = {
  items: [],
  show: false,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      state.items.push({ product: action.payload, count: 1 });
    },
    toggleCart: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    },
    addQuantity: (state, action: PayloadAction<Product["id"]>) => {
      const newState = { ...state };
      const updatedItemIndex = newState.items.findIndex(
        ({ product }) => product.id === action.payload
      );
      newState.items[updatedItemIndex].count++;
      state = newState;
    },
    reduceQuantity: (state, action: PayloadAction<Product["id"]>) => {
      const newState = { ...state };
      const updatedItemIndex = newState.items.findIndex(
        ({ product }) => product.id === action.payload
      );
      if (newState.items[updatedItemIndex].count > 1) {
        newState.items[updatedItemIndex].count--;
      } else {
        newState.items.splice(updatedItemIndex, 1);
      }
      state = newState;
    },
    removeFromCart: (state, action: PayloadAction<Product["id"]>) => {
      const newState = { ...state };
      const updatedItemIndex = newState.items.findIndex(
        ({ product }) => product.id === action.payload
      );
      newState.items.splice(updatedItemIndex, 1);
      state = newState;
    },
  },
});

export const { addToCart, toggleCart, addQuantity, reduceQuantity, removeFromCart } =
  counterSlice.actions;

export default counterSlice.reducer;
