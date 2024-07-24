import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TOffer } from '../../types/offer';
import { RequestStatus } from '../../const';
import { TPreviewOffer } from '../../types/preview-offer';
import { fetchNearByAction, fetchOfferAction } from '../thunks/offers';

type OfferState = {
  offer: TOffer | null;
  status: RequestStatus;
  nearBy: TPreviewOffer[];
};

const initialState: OfferState = {
  offer: null,
  status: RequestStatus.Idle,
  nearBy: [],
};

function success(state: OfferState, action: PayloadAction<TOffer>) {
  state.offer = action.payload;
  state.status = RequestStatus.Success;
}

function loading(state: OfferState) {
  state.status = RequestStatus.Loading;
}

function failed(state: OfferState) {
  state.status = RequestStatus.Failed;
}

export const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    clear: (state) => {
      state.offer = null;
      state.nearBy = [];
    },
    updateOffer: (state, action: PayloadAction<string>) => {
      state.offer =
        state.offer?.id === action.payload
          ? { ...state.offer, isFavorite: !state.offer?.isFavorite }
          : state.offer;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchOfferAction.fulfilled, success)
      .addCase(fetchOfferAction.pending, loading)
      .addCase(fetchOfferAction.rejected, failed)
      .addCase(fetchNearByAction.fulfilled, (state, action) => {
        state.nearBy = action.payload;
      }),
  selectors: {
    offer: (state) => state.offer,
    status: (state) => state.status,
    nearBy: (state) => state.nearBy,
  },
});

export const offerActions = {
  ...offerSlice.actions,
  fetchNearByAction,
  fetchOfferAction,
};
export const offerSelectors = offerSlice.selectors;
