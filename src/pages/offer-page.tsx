import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FavoriteButton } from '../components/favorite-button';
import { Gallery } from '../components/gallery';
import { PremiumBadge } from '../components/premium-badge';
import { Price } from '../components/price/price';
import { Rating } from '../components/rating';
import NotFoundPage from './not-found-page';
import { ReviewForm } from '../components/review-form';
import { ReviewsList } from '../components/reviews-list';
import { Map } from '../components/map';
import { InsideList } from '../components/inside-list';
import { FEATURES, RequestStatus } from '../const';
import { CardList } from '../components/card-list';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { offerActions, offerSelectors } from '../store/slices/offer';
import { Spinner } from '../components/spinner';
import { reviewsActions, reviewsSelectors } from '../store/slices/reviews';
import { useAuth } from '../hooks/use-auth';

export const OfferPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const offer = useAppSelector(offerSelectors.offer);
  const status = useAppSelector(offerSelectors.status);
  const nearby = useAppSelector(offerSelectors.nearBy);
  const reviews = useAppSelector(reviewsSelectors.reviews);

  const isAuth = useAuth();

  useEffect(() => {
    Promise.all([
      dispatch(offerActions.fetchOfferAction(id as string)),
      dispatch(offerActions.fetchNearByAction(id as string)),
      dispatch(reviewsActions.fetchReviewsAction(id as string)),
    ]);
  }, [dispatch, id]);

  if (status === RequestStatus.Loading) {
    return <Spinner />;
  }

  if (status === RequestStatus.Failed || !offer) {
    return <NotFoundPage />;
  }

  return (
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
              <FavoriteButton
                blockBem="offer"
                width={31}
                height={33}
                offerId={offer.id}
                isFavorite={offer.isFavorite}
              />
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
                Reviews ·{' '}
                <span className="reviews__amount">{reviews.length}</span>
              </h2>
              <ReviewsList reviews={reviews} />
              {isAuth ? (
                <ReviewForm />
              ) : (
                <div>
                  <hr />
                  <p className="offer__text">
                    You must be logged in to leave a review.
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>
        <Map extraClassName="offer__map" points={nearby} />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">
            Other places in the neighbourhood
          </h2>
          <CardList offers={nearby} />
        </section>
      </div>
    </main>
  );
};
