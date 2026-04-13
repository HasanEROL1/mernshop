import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminService from "../../utils/adminService";

// tüm ürünleri getir
const fetchAdminProducts = createAsyncThunk(
  'admin/fetchAll', async (page = 1, thunkAPI) => {
    try {
      const data = await AdminService.getAdminProducts(page)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
)

// yeni ürün oluştur

const createNewproduct = createAsyncThunk(
  'admin/create',
  async (productData, thunkAPI) => {
    try {
      const data = await AdminService.createAdminProduct(productData)
      return data.product

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
)

// ürün sil
const deleteProduct = createAsyncThunk(
  'admin/delete', async (id, thunkAPI) => {
    try {
      await AdminService.deleteAdminProduct(id)
      return id
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
)

// ürün güncelle
const updateProduct = createAsyncThunk(
  'admin/updateProduct', async ({ id, productData }, thunkAPI) => {
    try {
      const data = await AdminService.updateAdminProduct(id, productData)
      return data.product
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }

  }

)


const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    products: [],
    product: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
    productsCount: 0,
    resultPerPage: 12

  },
  reducers: {
    resetAdminState: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
      state.product = {}

    },

  },
  extraReducers: (builder) => {
    builder
      // ürünleri listele
      .addCase(fetchAdminProducts.pending, (state) => { state.isLoading = true })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload.products
        state.productsCount = action.payload.productsCount
        state.resultPerPage = action.payload.resultPerPage;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // ürün ekle
      .addCase(createNewproduct.pending, (state) => { state.isLoading = true })
      .addCase(createNewproduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.products.push(action.payload)
        state.message = "Ürün başarıyla eklendi"
      })
      .addCase(createNewproduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // ürün sil
      .addCase(deleteProduct.pending, (state) => { state.isLoading = true })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = state.products.filter((p) => p._id !== action.payload)
        state.message = "Ürün Silindi"
        state.productsCount -= 1
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })


      // ürünü güncelle
      .addCase(updateProduct.pending, (state) => { state.isLoading = true })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        const index = state.products.findIndex((p) => p._id === action.payload._id)
        if (index !== -1) {
          state.products[index] = action.payload
          state.message = "Ürün başarıyla güncellendi"
        }

      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})
export const { resetAdminState } = adminSlice.actions
export { fetchAdminProducts, createNewproduct, deleteProduct, updateProduct }
export default adminSlice.reducer
