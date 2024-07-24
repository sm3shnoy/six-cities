import { THost } from './host';

export type TReviews = {
  id: string;
  date: string;
  user: THost;
  comment: string;
  rating: number;
};
