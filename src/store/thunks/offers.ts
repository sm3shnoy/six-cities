import { TPreviewOffer } from '../../types/preview-offer';
import { AxiosInstance } from 'axios';
import { APIRoutes } from '../../const';
import { createAppAsyncThunk } from '../hooks';
import { TOffer } from '../../types/offer';

export const fetchOffersAction = createAppAsyncThunk<
  TPreviewOffer[],
  undefined,
  { extra: AxiosInstance }
>('data/offers', async (_arg, { extra: api }) => {
  const { data } = await api.get<TPreviewOffer[]>(APIRoutes.Offers);

  return data;
});

export const fetchOfferAction = createAppAsyncThunk<
  TOffer,
  string,
  { extra: AxiosInstance }
>('data/offer', async (offerId, { extra: api }) => {
  const { data } = await api.get<TOffer>(`${APIRoutes.Offers}/${offerId}`);

  return data;
});

export const fetchNearByAction = createAppAsyncThunk<TPreviewOffer[], string>(
  'data/nearBy',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<TPreviewOffer[]>(
      `${APIRoutes.Offers}/${offerId}/nearby`
    );

    return data;
  }
);
