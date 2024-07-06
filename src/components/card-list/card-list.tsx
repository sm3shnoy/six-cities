import { useLocation } from 'react-router-dom';
import { TPreviewOffer } from '../../types/preview-offer';
import { Card } from '../card';
import { useLayoutState } from './use-layout-state';

export const CardList = ({ offers }: { offers: TPreviewOffer[] }) => {
  const { pathname } = useLocation();
  const { cardListClassName } = useLayoutState(pathname);

  return (
    <div className={cardListClassName}>
      {offers.map((offer) => (
        <Card offer={offer} key={offer.id} />
      ))}
    </div>
  );
};
