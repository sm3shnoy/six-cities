import { APIRoutes } from '../../const';
import { FavoritesStatus } from '../../types/favorites';
import { TPreviewOffer } from '../../types/preview-offer';
import { createAppAsyncThunk } from '../hooks';

type ChangeProps = {
  offerId: string;
  status: FavoritesStatus;
};

type ChangeResponse = {
  offer: TPreviewOffer;
  status: FavoritesStatus;
};

export const fetchFavoritesAction = createAppAsyncThunk<TPreviewOffer[], void>(
  'favorites/fetchAll',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TPreviewOffer[]>(APIRoutes.Favorites);

    return data;
  }
);

export const changeFavoriteStatusAction = createAppAsyncThunk<
  ChangeResponse,
  ChangeProps
>('favorites/change', async ({ offerId, status }, { extra: api }) => {
  const { data } = await api.post<TPreviewOffer>(
    `${APIRoutes.Favorites}/${offerId}/${status}`
  );

  return { offer: data, status };
});
