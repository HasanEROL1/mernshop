import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '../../utils/authService';

const getUserFromStorage = () => {
  try {
    const storedData = localStorage.getItem("user");

    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error("LocalStorage verisi bozuk! Temizleniyor...", error);
    localStorage.removeItem("user");
    return null;
  }
};

const savedData = getUserFromStorage()

// Register
const register = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
  try {
    const data = await authService.register(userData)
    return data
  } catch (error) {
    const message = error.response?.data?.message || error.message
    return thunkAPI.rejectWithValue(message)
  }
})

// Login
const login = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
  try {
    const data = await authService.login(userData)
    console.log("Login data:", data)
    return data
  } catch (error) {
    console.log("Login error:", error)
    const message = error.response?.data?.message || error.message
    return thunkAPI.rejectWithValue(message)
  }
})

//Logout
const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await authService.logout()
  } catch (error) {
    const message = error.response?.data?.message || error.message
    return thunkAPI.rejectWithValue(message)
  }
})

const updateUser = createAsyncThunk("auth/updateUser", async (userData, thunkAPI) => {
  try {
    const data = await authService.updateUser(userData)
    return data
  } catch (error) {
    const message = error.response?.data?.message || error.message
    return thunkAPI.rejectWithValue(message)
  }
})

const initialState = {
  user: savedData ? savedData.user : null,
  token: savedData ? savedData.token : null,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Register
      .addCase(register.pending, (state) => { state.loading = true })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.newUser
        console.log("Register payload:", action.payload)
        state.error = null
        localStorage.setItem("user", JSON.stringify(action.payload))
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      //LOGIN
      .addCase(login.pending, (state) => { state.loading = true })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.error = null
        console.log("Saving to localStorage:", action.payload);
        localStorage.setItem("user", JSON.stringify(action.payload))
        console.log("localStorage user:", localStorage.getItem("user"))

      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      //LOGOUT
      .addCase(logout.pending, (state) => { state.loading = true })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false
        state.user = null
        localStorage.removeItem("user")


      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // update user
      .addCase(updateUser.pending, (state) => { state.loading = true })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        // localStorage'ı da güncelle
        const saved = JSON.parse(localStorage.getItem("user"))
        localStorage.setItem("user", JSON.stringify({ ...saved, user: action.payload.user }))
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

  }
})

export { register, login, logout, updateUser }
export default authSlice.reducer