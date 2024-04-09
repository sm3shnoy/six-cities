type TRatingProps = {
  rating: number;
  bemBlock: string;
  isOnlyStars?: boolean;
};

export const Rating = ({ rating, bemBlock, isOnlyStars }: TRatingProps) => {
  const MAX_STARS = 5;
  const displayedRating = (100 * MAX_STARS) / rating;

  return (
    <div className={`${bemBlock}__rating rating`}>
      <div className={`${bemBlock}__stars rating__stars`}>
        <span style={{ width: `${displayedRating}%` }} />
        <span className="visually-hidden">Rating</span>
      </div>
      {!isOnlyStars && (
        <span className={`${bemBlock}__rating-value rating__value`}>4.8</span>
      )}
    </div>
  );
};
