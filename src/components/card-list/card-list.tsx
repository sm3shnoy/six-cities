import { TPreviewOffer } from '../../types/preview-offer';
import { Card } from '../card';

export const CardList = ({ offers }: { offers: TPreviewOffer[] }) => (
  <div className="cities__places-list places__list tabs__content">
    {offers.map((offer) => (
      <Card offer={offer} key={offer.id} />
    ))}
  </div>
);
