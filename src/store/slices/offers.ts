import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CITIES, CityName } from '../../const';
import { TPreviewOffer } from '../../types/preview-offer';

type OffersState = {
  currentCity: CityName;
  activeId?: TPreviewOffer['id'];
};

const initialState: OffersState = {
  currentCity: CITIES[0].name,
  activeId: undefined,
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
  },
  selectors: {
    activeId: (state) => state.activeId,
    selectCity: (state) => state.currentCity,
  },
});

const offersActions = offersSlice.actions;
const offersSelectors = offersSlice.selectors;

export { offersActions, offersSelectors, offersSlice };
