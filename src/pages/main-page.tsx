import { useState } from 'react';
import cn from 'classnames';
import { CardList } from '../components/card-list';
import { LocationsTabs } from '../components/locations-tabs';
import { Map } from '../components/map';
import { SortingList } from '../components/sorting-list';
import { MainEmpty } from '../components/main-empty';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../store/hooks';
import { SortOption } from '../const';
import { offersSelectors } from '../store/slices/offers';

const MainPage = () => {
  const [currentSort, setSort] = useState(SortOption.Popular);
  const currentCity = useAppSelector(offersSelectors.selectCity);
  const offers = useAppSelector(offersSelectors.offers);
  const isOffersEmpty = offers.length < 1;
  const currentOffers = offers.filter(
    (offer) => offer.city.name === currentCity
  );

  let sortedOffers = currentOffers;

  switch (currentSort) {
    case SortOption.HighToLow:
      sortedOffers = [...currentOffers].sort((a, b) => b.price - a.price);
      break;
    case SortOption.LowToHigh:
      sortedOffers = [...currentOffers].sort((a, b) => a.price - b.price);
      break;
    case SortOption.TopRated:
      sortedOffers = [...currentOffers].sort((a, b) => b.rating - a.rating);
      break;
  }

  return (
    <main className="page__main page__main--index">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <h1 className="visually-hidden">Cities</h1>
      <LocationsTabs />
      <div className="cities">
        <div
          className={cn(
            'cities__places-container container',
            isOffersEmpty && 'cities__places-container--empty'
          )}
        >
          {!isOffersEmpty ? (
            <>
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {sortedOffers.length} places to stay in {currentCity}
                </b>
                <SortingList current={currentSort} setter={setSort} />
                <CardList offers={sortedOffers} />
              </section>
              <div className="cities__right-section">
                <Map extraClassName="cities__map" points={sortedOffers} />
              </div>
            </>
          ) : (
            <MainEmpty />
          )}
        </div>
      </div>
    </main>
  );
};

export default MainPage;
