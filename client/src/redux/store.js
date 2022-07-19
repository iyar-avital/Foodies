import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import userSlice from "./userSlice";
import appApi from "./appApi";
import favsSlice from "./favSlice";
import cartSlice from "./cartSlice";

const reducer = combineReducers({
  user: userSlice,
  favs: favsSlice,
  cart: cartSlice,
  [appApi.reducerPath]: appApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  blackList: [appApi.reducerPath],
};

//persist our store
const persistedReducer = persistReducer(persistConfig, reducer);

//create the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, appApi.middleware],
});

export default store;
