import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import auth from '@/api/auth'
const initialState = {
  loading: false
}

export const signOut = createAsyncThunk('auth/signOut', async () => {
  const response = await auth.signOut()
  return 0
})

export const sharedExtraReducers = (builder) => {
  builder
    .addCase(signOut.pending, (state, action) => {
      state.loading = true
    })
    .addCase(signOut.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
    .addCase(signOut.fulfilled, (state, action) => {
      state.loading = false
    })
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: sharedExtraReducers,
  reducers: {}
})

export default authSlice.reducer