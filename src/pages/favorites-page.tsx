import { Helmet } from 'react-helmet-async';
import { FavoritesList } from '../components/favorites-list';
import { getFavoriteOffersByCity } from '../utils';
import { useAppSelector } from '../store/hooks';
import { offersSelectors } from '../store/slices/offers';

export const FavoritesPage = () => {
  const offers = useAppSelector(offersSelectors.offers);
  const offersByCity = getFavoriteOffersByCity(offers);

  return offersByCity ? (
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
