import { ChangeEvent } from 'react';

type TRatingInputProps = {
  title: string;
  value: number;
  onRatingChange: (target: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
};

export const RatingInput = ({
  title,
  value,
  onRatingChange,
  checked,
}: TRatingInputProps) => (
  <>
    <input
      className="form__rating-input visually-hidden"
      name="rating"
      value={value}
      id={`${value}-stars`}
      type="radio"
      onChange={onRatingChange}
      checked={checked}
    />
    <label
      htmlFor={`${value}-stars`}
      className="reviews__rating-label form__rating-label"
      title={title}
    >
      <svg className="form__star-image" width={37} height={33}>
        <use xlinkHref="#icon-star" />
      </svg>
    </label>
  </>
);
