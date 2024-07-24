import { Helmet } from 'react-helmet-async';
import { FavoritesList } from '../components/favorites-list';
import { getFavoriteOffersByCity } from '../utils';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  favoritesActions,
  favoritesSelectors,
} from '../store/slices/favorites';
import { useEffect } from 'react';
import { RequestStatus } from '../const';
import { Spinner } from '../components/spinner';

export const FavoritesPage = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(favoritesSelectors.offers);
  const status = useAppSelector(favoritesSelectors.status);
  const offersByCity = favorites && getFavoriteOffersByCity(favorites);

  useEffect(() => {
    dispatch(favoritesActions.fetchFavoritesAction());
  }, [dispatch]);

  if (status === RequestStatus.Loading) {
    return <Spinner />;
  }

  return favorites.length > 0 ? (
    <main className="page__main page__main--favorites">
      <Helmet>
        <title>Избранное</title>
      </Helmet>
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <FavoritesList offers={offersByCity} />
        </section>
      </div>
    </main>
  ) : (
    <main className="page__main page__main--favorites page__main--favorites-empty">
      <div className="page__favorites-container container">
        <section className="favorites favorites--empty">
          <h1 className="visually-hidden">Favorites (empty)</h1>
          <div className="favorites__status-wrapper">
            <b className="favorites__status">Nothing yet saved.</b>
            <p className="favorites__status-description">
              Save properties to narrow down search or plan your future trips.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};
