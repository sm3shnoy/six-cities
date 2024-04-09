import { TCity } from './city';
import { TLocation } from './location';

export type TPreviewOffer = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  city: TCity;
  location: TLocation;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
};
