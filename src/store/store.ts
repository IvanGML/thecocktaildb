import { configureStore } from '@reduxjs/toolkit';
import { cocktailApi } from '../services/api.ts';

const store = configureStore({
  reducer: {
    [cocktailApi.reducerPath]: cocktailApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cocktailApi.middleware),
} as never);

export default store;
