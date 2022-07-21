import { createSlice } from "@reduxjs/toolkit";
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart_ar: [],
    totalPrice: 0,
    store_short_id: "",
    showCart: false,
  },
  reducers: {
    removeItemCart: (state, { payload }) => {
      state.cart_ar = state.cart_ar.filter((item) => item._id != payload);
      state.totalPrice = totalPrice(state.cart_ar);
    },

    reduceOneCart: (state, { payload }) => {
      let index = state.cart_ar.findIndex((item) => item._id == payload);
      let qty = state.cart_ar[index].qty;
      state.cart_ar[index].qty = qty > 1 ? qty - 1 : 1; //qty must be positive
      state.totalPrice = totalPrice(state.cart_ar);
    },

    addCart: (state, { payload }) => {
      let index = state.cart_ar.findIndex((item) => item._id == payload._id);
      //if obj not found, index = -1
      if (index >= 0) {
        //item already exist
        state.cart_ar[index].qty++;
      }
      //item not found
      else {
        // verify that the new item belongs to the same store
        if (state.store_short_id === "" || state.store_short_id === payload.store_short_id) {
          state.cart_ar = [...state.cart_ar, { ...payload, qty: 1 }]; //add new item
          state.store_short_id = payload.store_short_id;
        }
      }
      state.totalPrice = totalPrice(state.cart_ar);
    },
    toggleCart: (state) => {
      state.showCart = !state.showCart;
    },

    resetCart: (state) => {
      state.cart_ar = [];
      state.store_short_id = "";
      state.totalPrice = [];
    },
  },
});

const totalPrice = (ar) => {
  let sum = 0;
  ar.forEach((item) => {
    sum += item.price * item.qty;
  });
  return sum;
};
export const { addCart, removeItemCart, toggleCart, reduceOneCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
