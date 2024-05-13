import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { TPreviewOffer } from '../../types/preview-offer';
import { FavoriteButton } from '../favorite-button';
import { PremiumBadge } from '../premium-badge';
import { Price } from '../price/price';
import { Rating } from '../rating';
import { AppRoutes } from '../../const';
import { useLayoutState } from './use-layout-state';

type TCard = {
  offer: TPreviewOffer;
  onCardHover: (offer: TPreviewOffer | null) => void;
};

export const Card = ({ offer, onCardHover }: TCard) => {
  const { pathname } = useLocation();
  const { cardClassName, cardInfoClassName, previewSize } =
    useLayoutState(pathname);

  return (
    <Link
      to={`${AppRoutes.Offer}/${offer.id}`}
      className={`${cardClassName}__card place-card`}
      onMouseOver={() => onCardHover(offer)}
      onMouseLeave={() => onCardHover(null)}
    >
      {offer.isFavorite && <PremiumBadge extraClassName="place-card__mark" />}
      <div
        className={`${cardClassName}__image-wrapper place-card__image-wrapper`}
      >
        <div>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={previewSize.width}
            height={previewSize.height}
            alt="Place image"
          />
        </div>
      </div>
      <div className={cn(cardInfoClassName, 'place-card__info')}>
        <div className="place-card__price-wrapper">
          <Price bemBlock="place-card" price={offer.price} />
          <FavoriteButton blockBem="place-card" width={18} height={19} />
        </div>
        <Rating bemBlock="place-card" rating={offer.rating} isOnlyStars />
        <h2 className="place-card__name">
          <p>{offer.title}</p>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </Link>
  );
};
