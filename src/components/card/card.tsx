import { TPreviewOffer } from '../../types/preview-offer';
import { FavoriteButton } from '../favorite-button';
import { PremiumBadge } from '../premium-badge';
import { Price } from '../price/price';
import { Rating } from '../rating';

type TCard = {
  offer: TPreviewOffer;
};

export const Card = ({ offer }: TCard) => (
  <article className="cities__card place-card">
    {offer.isFavorite && <PremiumBadge extraClassName="place-card__mark" />}
    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#">
        <img
          className="place-card__image"
          src={offer.previewImage}
          width={260}
          height={200}
          alt="Place image"
        />
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <Price bemBlock="place-card" price={120} />
        <FavoriteButton blockBem="place-card" width={18} height={19} />
      </div>
      <Rating bemBlock="place-card" rating={offer.rating} isOnlyStars />
      <h2 className="place-card__name">
        <a href="#">{offer.title}</a>
      </h2>
      <p className="place-card__type">{offer.type}</p>
    </div>
  </article>
);
