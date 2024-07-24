import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '../../const';
import { TPreviewOffer } from '../../types/preview-offer';
import {
  changeFavoriteStatusAction,
  fetchFavoritesAction,
} from '../thunks/favorites';
import { FavoritesStatus } from '../../types/favorites';

type FavoritesState = {
  offers: TPreviewOffer[];
  status: RequestStatus;
};

const initialState: FavoritesState = {
  offers: [],
  status: RequestStatus.Idle,
};

function success(
  state: FavoritesState,
  action: PayloadAction<TPreviewOffer[]>
) {
  state.offers = action.payload;
  state.status = RequestStatus.Success;
}

function loading(state: FavoritesState) {
  state.status = RequestStatus.Loading;
}

function failed(state: FavoritesState) {
  state.status = RequestStatus.Failed;
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchFavoritesAction.fulfilled, success)
      .addCase(fetchFavoritesAction.pending, loading)
      .addCase(fetchFavoritesAction.rejected, failed)
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        switch (action.payload.status) {
          case FavoritesStatus.Added:
            state.offers.push(action.payload.offer);
            break;
          case FavoritesStatus.Removed:
            state.offers = state.offers.filter(
              ({ id }) => id !== action.payload.offer.id
            );
            break;
        }
      }),
  selectors: {
    offers: (state) => state.offers,
    status: (state) => state.status,
  },
});

export const favoritesActions = {
  ...favoritesSlice.actions,
  changeFavoriteStatusAction,
  fetchFavoritesAction,
};
export const favoritesSelectors = favoritesSlice.selectors;
