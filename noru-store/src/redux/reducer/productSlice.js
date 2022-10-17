import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import http from '../../services/base'

export const get_list_product = createAsyncThunk(
  'products',
  async (payload, thunkAPI) => {
    try {
      const response = await http.get('api/product')
      return await response.data
    } catch (error) {
      const message = error.response.data.message
      return await thunkAPI.rejectWithValue({ error: message })
    }
  }
)
export const get_product = createAsyncThunk(
  'product',
  async (product_id, thunkAPI) => {
    try {
      const response = await http.get(`api/product/${product_id}`)
      return await response.data
    } catch (error) {
      const message = error.response.data.message
      return await thunkAPI.rejectWithValue({ error: message })
    }
  }
)
export const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    product: null,
    message: '',
    status: 'loading',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(get_list_product.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(get_list_product.fulfilled, (state, { payload }) => {
      state.products = payload.products
      state.message = payload.message
      state.status = 'success'
    })
    builder.addCase(get_list_product.rejected, (state, action) => {
      state.status = 'error'
      state.message = action.payload.error
    })
    builder.addCase(get_product.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(get_product.fulfilled, (state, { payload }) => {
      state.product = payload.product
      state.message = payload.message
      state.status = 'success'
    })
    builder.addCase(get_product.rejected, (state, action) => {
      state.status = 'error'
      state.message = action.payload.error
    })
  },
})

// Action creators are generated for each case reducer function
export const {} = productSlice.actions

export default productSlice.reducer
