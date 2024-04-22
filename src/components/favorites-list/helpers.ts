import { TPreviewOffer } from '../../types/preview-offer';

export const getOfferByCity = (offers: TPreviewOffer[]) =>
  offers.reduce<{ [key: string]: TPreviewOffer[] }>((acc, current) => {
    if (!current.isFavorite) {
      return acc;
    }

    const cityName = current.city.name;

    if (!(cityName in acc)) {
      acc[cityName] = [];
    }

    acc[cityName].push(current);

    return acc;
  }, {});
