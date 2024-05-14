import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { FavoriteButton } from '../components/favorite-button';
import { Gallery } from '../components/gallery';
import { PremiumBadge } from '../components/premium-badge';
import { Price } from '../components/price/price';
import { Rating } from '../components/rating';
import { TOffer } from '../types/offer';
import NotFoundPage from './not-found-page';
import { ReviewForm } from '../components/review-form';
import { ReviewsList } from '../components/reviews-list';
import { Map } from '../components/map';
import { InsideList } from '../components/inside-list';
import { CITIES, FEATURES } from '../const';
import { CardList } from '../components/card-list';
import { TPreviewOffer } from '../types/preview-offer';

const api = async (id?: string) => {
  try {
    const response = await fetch(
      `https://15.design.htmlacademy.pro/six-cities/offers/${id}`
    ).then((res) => res.json() as Promise<TOffer>);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    if (response.errorType) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore-next-line
      throw new Error(response.message as string);
    }

    return response;
  } catch (err) {
    if (err instanceof Error) {
      toast('Данные по запрашиваемому предложению не найдены!');
    }
  }
};

export const OfferPage = ({ offers }: { offers: TPreviewOffer[] }) => {
  const { id } = useParams();
  const [offer, setOffer] = useState<TOffer>();
  const [selectedPoint, setSelectedPoint] = useState<TPreviewOffer | null>(
    null
  );

  useEffect(() => {
    api(id).then((res) => {
      setOffer(res);
    });
  }, [id, offer, setOffer]);

  return offer ? (
    <main className="page__main page__main--offer">
      <Helmet>
        <title>{offer.title}</title>
      </Helmet>
      <section className="offer">
        <Gallery />
        <div className="offer__container container">
          <div className="offer__wrapper">
            <PremiumBadge extraClassName="offer__mark" />
            <div className="offer__name-wrapper">
              <h1 className="offer__name">{offer.title}</h1>
              <FavoriteButton blockBem="offer" width={31} height={33} />
            </div>
            <Rating bemBlock="offer" rating={offer.rating} />
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {offer.type}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {offer.bedrooms} Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
                Max {offer.maxAdults} adults
              </li>
            </ul>
            <Price bemBlock="offer" price={offer.price} />
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <InsideList features={FEATURES} />
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                  <img
                    className="offer__avatar user__avatar"
                    src={offer.host.avatarUrl}
                    width={74}
                    height={74}
                    alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">{offer.host.name}</span>
                {offer.host.isPro && (
                  <span className="offer__user-status">Pro</span>
                )}
              </div>
              <div className="offer__description">
                <p className="offer__text">{offer.description}</p>
              </div>
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">
                Reviews · <span className="reviews__amount">1</span>
              </h2>
              <ReviewsList />
              <ReviewForm />
            </section>
          </div>
        </div>
        <Map
          extraClassName="offer__map"
          points={offers}
          currentCity={CITIES[0]}
          selectedPoint={selectedPoint}
        />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">
            Other places in the neighbourhood
          </h2>
          <CardList
            offers={offers.slice(0, 3)}
            pointHoverHandler={setSelectedPoint}
          />
        </section>
      </div>
    </main>
  ) : (
    <NotFoundPage />
  );
};
