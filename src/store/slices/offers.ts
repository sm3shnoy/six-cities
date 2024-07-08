import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CITIES, CityName } from '../../const';
import { TPreviewOffer } from '../../types/preview-offer';

export type OffersState = {
  currentCity: CityName;
  activeId?: TPreviewOffer['id'];
  offers: TPreviewOffer[];
};

const initialState: OffersState = {
  currentCity: CITIES[0].name,
  activeId: undefined,
  offers: [],
};

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
    loadOffers: (state, action: PayloadAction<TPreviewOffer[]>) => {
      state.offers = action.payload;
    },
  },
  selectors: {
    activeId: (state) => state.activeId,
    selectCity: (state) => state.currentCity,
    offers: (state) => state.offers,
  },
});

const offersActions = offersSlice.actions;
const offersSelectors = offersSlice.selectors;

export { offersActions, offersSelectors, offersSlice };
