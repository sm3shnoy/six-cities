import { useState } from 'react';
import cn from 'classnames';
import { CardList } from '../components/card-list';
import { LocationsTabs } from '../components/locations-tabs';
import { Map } from '../components/map';
import { SortingList } from '../components/sorting-list';
import { TPreviewOffer } from '../types/preview-offer';
import { MainEmpty } from '../components/main-empty';
import { Helmet } from 'react-helmet-async';
import { CITIES } from '../const';

const MainPage = ({ offers }: { offers: TPreviewOffer[] }) => {
  const [selectedPoint, setSelectedPoint] = useState<TPreviewOffer | null>(
    null
  );
  const isOffersEmpty = offers.length < 1;

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
                  {offers.length} places to stay in Amsterdam
                </b>
                <SortingList />
                <CardList
                  offers={offers}
                  pointHoverHandler={setSelectedPoint}
                />
              </section>
              <div className="cities__right-section">
                <Map
                  extraClassName="cities__map"
                  currentCity={CITIES[0]}
                  points={offers}
                  selectedPoint={selectedPoint}
                />
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
