import { configureStore } from '@reduxjs/toolkit';
import { offersSlice } from './slices/offers';
import { createApi } from '../services/api';

export const store = configureStore({
  reducer: { [offersSlice.name]: offersSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: createApi(),
      },
    }),
});
