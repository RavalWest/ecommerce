import { combineReducers } from "redux";
import { store } from "./store";
import cart from "./slices/cart";

const rootReducer = combineReducers({ cart });

export type RootState = ReturnType<typeof store.getState>;

export default rootReducer;
