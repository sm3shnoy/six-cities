import { useMatch } from 'react-router-dom';
import { AppRoutes } from '../../const';

export const useLayoutState = (pathname: string) => {
  const patternPathOffer = useMatch(AppRoutes.OfferId);
  let cardListClassName = '';

  switch (pathname) {
    case AppRoutes.Favorites:
      cardListClassName = 'favorites__places';
      break;
    case AppRoutes.Main:
      cardListClassName = 'cities__places-list places__list tabs__content';
      break;
    case patternPathOffer?.pathname:
      cardListClassName = 'near-places__list places__list';
  }

  return {
    cardListClassName,
  };
};
