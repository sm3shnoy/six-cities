import dateformat from 'dateformat';
import { TReviews } from '../../types/reviews';
import { Rating } from '../rating';

export const ReviewsItem = ({ review }: { review: TReviews }) => {
  const { date, user, comment, rating } = review;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width={54}
            height={54}
            alt={user.name}
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <Rating rating={rating} bemBlock="reviews" isOnlyStars />
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime="2019-04-24">
          {dateformat(date, 'mmmm yyyy')}
        </time>
      </div>
    </li>
  );
};
