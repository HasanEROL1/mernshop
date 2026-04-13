
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cartService from '../../utils/cartService';
import { logout } from './authSlice';


// sepeti getir

const fetchCart = createAsyncThunk("cart/fetchCart", async (_, thunkAPI) => {
  try {
    const data = await cartService.getCart()
    return data.cart
  } catch (error) {
    const message = error.response?.data?.message || error.message
    return thunkAPI.rejectWithValue(message)
  }
})
// sepete ekle

const addToCart = createAsyncThunk("cart/addToCart", async ({ productId, qty }, thunkAPI) => {
  try {
    const data = await cartService.addToCart(productId, qty)
    return data.cart
  } catch (error) {
    const message = error.response?.data?.message || error.message
    return thunkAPI.rejectWithValue(message)
  }
})

// sepetten sil

const removeFromCart = createAsyncThunk("cart/removeFromCart", async (productId, thunkAPI) => {
  try {
    const data = await cartService.removeFromCart(productId)
    return data.cart
  } catch (error) {
    const message = error.response?.data?.message || error.message
    return thunkAPI.rejectWithValue(message)
  }
})

// adet güncelle
const updateCartItem = createAsyncThunk("cart/updateCartItem", async ({ productId, qty }, thunkAPI) => {
  try {
    const data = await cartService.updateCartItem(productId, qty)
    return data.cart
  } catch (error) {
    const message = error.response?.data?.message || error.message
    return thunkAPI.rejectWithValue(message)
  }
})

// sepeti temizle
const clearCart = createAsyncThunk("cart/clearCart", async (_, thunkAPI) => {
  try {
    const data = await cartService.clearCart()
    return data.cart
  } catch (error) {
    const message = error.response?.data?.message || error.message
    return thunkAPI.rejectWithValue(message)
  }

})

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchCart
      .addCase(fetchCart.pending, (state) => { state.loading = true })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false
        state.cartItems = action.payload?.items || []
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // addToCart
      .addCase(addToCart.pending, (state) => { state.loading = true })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false
        state.cartItems = action.payload?.items || []
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // removeFromCart
      .addCase(removeFromCart.pending, (state) => { state.loading = true })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false
        state.cartItems = action.payload?.items || []
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload

      })

      // updateCartItem
      .addCase(updateCartItem.pending, (state) => { state.loading = true })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false
        state.cartItems = action.payload?.items || []
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload

      })

      //clearCart
      .addCase(clearCart.pending, (state) => { state.loading = true })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false
        state.cartItems = []
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(logout.fulfilled, (state) => {
        state.cartItems = [];
      })
  }
})

export { fetchCart, addToCart, removeFromCart, updateCartItem, clearCart, logout }

export default cartSlice.reducer


