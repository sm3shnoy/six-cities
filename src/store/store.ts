import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { offersSlice } from './slices/offers';
import { createApi } from '../services/api';
import { userSlice } from './slices/user';
import { offerSlice } from './slices/offer';
import { reviewsSlice } from './slices/reviews';
import { favoritesSlice } from './slices/favorites';

const reducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [offerSlice.name]: offerSlice.reducer,
  [reviewsSlice.name]: reviewsSlice.reducer,
  [favoritesSlice.name]: favoritesSlice.reducer,
});

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: createApi(),
      },
    }),
  reducer,
});
