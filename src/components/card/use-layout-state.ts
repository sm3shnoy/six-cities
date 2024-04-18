import { useMatch } from 'react-router-dom';
import { AppRoutes } from '../../const';

export const useLayoutState = (pathname: string) => {
  const offerPathPattern = useMatch(AppRoutes.OfferId);

  let cardClassName = '';
  let cardInfoClassName = '';

  switch (pathname) {
    case offerPathPattern?.pathname:
      cardClassName = 'near-places';
      break;
    case AppRoutes.Favorites:
      cardClassName = 'favorites';
      cardInfoClassName = 'favorites__image-wrapper';
      break;
    case AppRoutes.Main:
      cardClassName = 'cities';
      break;
  }

  return { cardClassName, cardInfoClassName };
};
