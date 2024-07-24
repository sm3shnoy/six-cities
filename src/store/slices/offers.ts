import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CITIES, CityName, RequestStatus } from '../../const';
import { TPreviewOffer } from '../../types/preview-offer';
import { fetchOffersAction } from '../thunks/offers';

export type OffersState = {
  currentCity: CityName;
  activeId?: TPreviewOffer['id'];
  offers: TPreviewOffer[];
  status: RequestStatus;
};

const initialState: OffersState = {
  currentCity: CITIES[0].name,
  activeId: undefined,
  offers: [],
  status: RequestStatus.Idle,
};

function success(state: OffersState, action: PayloadAction<TPreviewOffer[]>) {
  state.status = RequestStatus.Success;
  state.offers = action.payload;
}

function loading(state: OffersState) {
  state.status = RequestStatus.Loading;
}

function failed(state: OffersState) {
  state.status = RequestStatus.Failed;
}

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<CityName>) => {
      state.currentCity = action.payload;
    },
    setActiveId: (
      state,
      action: PayloadAction<TPreviewOffer['id'] | undefined>
    ) => {
      state.activeId = action.payload;
    },
    updateOffers: (state, action: PayloadAction<string>) => {
      state.offers = state.offers.map((offer) =>
        offer.id === action.payload
          ? { ...offer, isFavorite: !offer.isFavorite }
          : offer
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.fulfilled, success)
      .addCase(fetchOffersAction.pending, loading)
      .addCase(fetchOffersAction.rejected, failed);
  },
  selectors: {
    activeId: (state) => state.activeId,
    selectCity: (state) => state.currentCity,
    offers: (state) => state.offers,
    status: (state) => state.status,
  },
});

const offersActions = { ...offersSlice.actions, fetchOffersAction };
const offersSelectors = offersSlice.selectors;

export { offersActions, offersSelectors, offersSlice };
