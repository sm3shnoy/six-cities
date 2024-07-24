import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { TPreviewOffer } from '../../types/preview-offer';
import { FavoriteButton } from '../favorite-button';
import { PremiumBadge } from '../premium-badge';
import { Price } from '../price/price';
import { Rating } from '../rating';
import { AppRoutes } from '../../const';
import { useLayoutState } from './use-layout-state';
import { useAppDispatch } from '../../store/hooks';
import { offersActions } from '../../store/slices/offers';

type TCard = {
  offer: TPreviewOffer;
};

export const Card = ({ offer }: TCard) => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { cardClassName, cardInfoClassName, previewSize } =
    useLayoutState(pathname);

  return (
    <div
      className={`${cardClassName}__card place-card`}
      onMouseOver={() => dispatch(offersActions.setActiveId(offer.id))}
      onMouseLeave={() => dispatch(offersActions.setActiveId(undefined))}
    >
      {offer.isPremium && <PremiumBadge extraClassName="place-card__mark" />}
      <div
        className={`${cardClassName}__image-wrapper place-card__image-wrapper`}
      >
        <Link to={`${AppRoutes.Offer}/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={previewSize.width}
            height={previewSize.height}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={cn(cardInfoClassName, 'place-card__info')}>
        <div className="place-card__price-wrapper">
          <Price bemBlock="place-card" price={offer.price} />
          <FavoriteButton
            blockBem="place-card"
            width={18}
            height={19}
            offerId={offer.id}
            isFavorite={offer.isFavorite}
          />
        </div>
        <Rating bemBlock="place-card" rating={offer.rating} isOnlyStars />
        <h2 className="place-card__name">
          <p>{offer.title}</p>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </div>
  );
};
