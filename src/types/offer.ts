import { THost } from './host';
import { TPreviewOffer } from './preview-offer';

export type TOffer = {
  description: string;
  bedrooms: number;
  goods: string[];
  host: THost;
  images: string[];
  maxAdults: number;
} & TPreviewOffer;
