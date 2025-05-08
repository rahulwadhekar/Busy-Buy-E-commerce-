// cartReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  isProductsLoaded: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems(state, action) {
      state.cart = action.payload;
    },
    setIsProductsLoaded(state, action) {
      state.isProductsLoaded = action.payload;
    },
  },
});

export const { setCartItems, setIsProductsLoaded } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
export const cartSelector = (state) => state.cart;
