import { TPreviewOffer } from '../../types/preview-offer';
import { CardList } from '../card-list';

export const FavoritesItem = ({
  cityName,
  offersByCity,
}: {
  cityName: string;
  offersByCity: TPreviewOffer[];
}) => (
  <li className="favorites__locations-items">
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <a className="locations__item-link" href="#">
          <span>{cityName}</span>
        </a>
      </div>
    </div>
    <CardList offers={offersByCity} />
  </li>
);
