import cn from 'classnames';
import { CardList } from '../components/card-list';
import { Header } from '../components/header';
import { LocationsTabs } from '../components/locations-tabs';
import { Map } from '../components/map';
import { SortingList } from '../components/sorting-list';
import { TPreviewOffer } from '../types/preview-offer';
import { MainEmpty } from '../components/main-empty';

const hasAccess = true;

const MainPage = ({ offers }: { offers: TPreviewOffer[] }) => {
  const isOffersEmpty = offers.length < 1;

  return (
    <div className="page page--gray page--main">
      <Header hasAccess={hasAccess} />
      <main className="page__main page__main--index">
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
                  <CardList offers={offers} />
                </section>
                <Map />
              </>
            ) : (
              <MainEmpty />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
