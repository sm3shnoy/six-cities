import { TReviews } from '../../types/reviews';
import { ReviewsItem } from '../reviews-item';

export const ReviewsList = ({ reviews }: { reviews: TReviews[] }) => (
  <ul className="reviews__list">
    {reviews.map((review) => (
      <ReviewsItem key={review.id} review={review} />
    ))}
  </ul>
);
