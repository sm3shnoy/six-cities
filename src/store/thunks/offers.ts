import { createAsyncThunk } from '@reduxjs/toolkit';
import { TPreviewOffer } from '../../types/preview-offer';
import { AxiosInstance } from 'axios';
import { APIRoutes } from '../../const';

export const fetchOffersAction = createAsyncThunk<
  TPreviewOffer[],
  undefined,
  { extra: AxiosInstance }
>('data/offers', async (_arg, { extra: api }) => {
  const { data } = await api.get<TPreviewOffer[]>(APIRoutes.Offers);

  return data;
});
