import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "../../utils/Productservice";

// tüm ürünler
const getAllProducts = createAsyncThunk("products/getAll", async (_, thunkAPI) => {
  try {
    const data = await productService.getProducts();
    return data.products;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// filtrelenmiş ürünler
const getFilteredProducts = createAsyncThunk("products/getFiltered", async (filters, thunkAPI) => {
  try {
    const data = await productService.getFilteredProducts(filters);
    return data
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// ürün detayı
const getProductDetail = createAsyncThunk("products/getDetail", async (id, thunkAPI) => {
  try {
    const data = await productService.getproductDetail(id);
    return data.product;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
  productsCount: 0,
  resultPerPage: 12
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.product = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  detay
      .addCase(getProductDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // filtrelenmiş ürünler
      .addCase(getFilteredProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFilteredProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.productsCount = action.payload.productsCount;
        state.resultPerPage = action.payload.resultPerPage;
      })
      .addCase(getFilteredProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { clearProduct } = productSlice.actions;
export { getAllProducts, getProductDetail, getFilteredProducts };

export default productSlice.reducer;
