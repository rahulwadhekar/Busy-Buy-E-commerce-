import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  products: [],
  isProductsLoaded: false,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setIsProductsLoaded(state, action) {
      state.isProductsLoaded = action.payload;
    },
  },
});

export const { setProducts, setIsProductsLoaded } = productSlice.actions;



export const productReducer = productSlice.reducer;
export const productSelector = (state) => state.products;

