import { TPreviewOffer } from '../../types/preview-offer';
import { FavoritesItem } from '../favorites-item';

export const FavoritesList = ({
  offers,
}: {
  offers: { [key: string]: TPreviewOffer[] };
}) => (
  <ul className="favorites__list">
    {Object.entries(offers).map(([cityName, offersByCity]) => (
      <FavoritesItem
        key={cityName}
        cityName={cityName}
        offersByCity={offersByCity}
      />
    ))}
  </ul>
);
