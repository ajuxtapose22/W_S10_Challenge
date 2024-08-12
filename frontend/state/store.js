import { configureStore } from '@reduxjs/toolkit';
import { pizzaApi } from './createApi';
import pizzaFormReducer from './pizzaFomSlice';

export const store = configureStore({
  reducer: {
    pizzaForm: pizzaFormReducer,
    [pizzaApi.reducerPath]: pizzaApi.reducer,
  },
  middleware: getDefault => getDefault().concat(
    pizzaApi.middleware,
  )
});
