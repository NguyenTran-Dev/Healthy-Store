import { configureStore } from '@reduxjs/toolkit';
import authReducer  from '../reducer/authSlice';
import productReducer  from '../reducer/productSlice';

const rootReducer = {
  auth: authReducer,
  product: productReducer,
}
const store = configureStore({
  reducer: rootReducer
});
export default store;
