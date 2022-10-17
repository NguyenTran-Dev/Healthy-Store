import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import http from '../../services/base'

export const registerApi = createAsyncThunk(
  'register',
  async (payload, thunkAPI) => {
    try {
      const response = await http.post('api/register', {
        ...payload,
        is_admin: false,
      })
      return await response.data;
    } catch (error) {
      const message = error.response.data.message;
      return await thunkAPI.rejectWithValue({ error: message });
    }
  }
)

export const loginApi = createAsyncThunk('login', async (payload, thunkAPI) => {
  try {
    const response = await http.post('api/login', {
      ...payload,
      is_admin: false,
    })
    return await response.data;
  } catch (error) {
    const message = error.response.data.message;
    return await thunkAPI.rejectWithValue({ error: message });
  }
})
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    message: '',
    status: 'loading'
  },
  reducers: {
    register: (state, action) => {
      state.customer = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerApi.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(registerApi.fulfilled, (state, { payload }) => {
      state.message = payload.message;
      state.status = 'success'
    })
    builder.addCase(registerApi.rejected, (state, action) => {
      state.status = 'error'
      state.message = action.payload.error
    })
    builder.addCase(loginApi.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(loginApi.fulfilled, (state, { payload }) => {
      state.message = payload.message;
      state.status = 'success'
    })
    builder.addCase(loginApi.rejected, (state, action) => {
      state.status = 'error'
      state.message = action.payload.error
    })
  },
})

// Action creators are generated for each case reducer function
export const { register } = authSlice.actions

export default authSlice.reducer
