import { ChangeEvent, FormEvent, useState } from 'react';
import { RatingInput } from '../rating-input';
import { RATING } from '../rating-input/const';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { reviewsActions, reviewsSelectors } from '../../store/slices/reviews';
import { useParams } from 'react-router-dom';
import { RequestStatus } from '../../const';
import { Spinner } from '../spinner';
import { toast } from 'react-toastify';

export const ReviewForm = () => {
  const [formData, setFormData] = useState({ rating: 0, comment: '' });
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const status = useAppSelector(reviewsSelectors.status);
  const isDisabled = formData.comment.length < 50;

  const formSubmitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(
      reviewsActions.postReviewAction({
        offerId: id as string,
        body: { comment: formData.comment, rating: formData.rating },
      })
    );

    if (status === RequestStatus.Loading) {
      return <Spinner />;
    }

    if (status === RequestStatus.Success) {
      setFormData({ rating: 0, comment: '' });
      toast('Ваш комментарий успешно отправлен!');
    }

    if (status === RequestStatus.Failed) {
      toast('Ваш комментарий не отправлен!');
    }
  };

  const ratingChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      rating: Number(target.value),
    }));
  };

  const onCommentChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      comment: target.value,
    }));
  };

  return (
    <form
      className="reviews__form form"
      onSubmit={formSubmitHandler}
      action="#"
      method="post"
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {RATING.map((item) => (
          <RatingInput
            key={item.value}
            title={item.title}
            value={item.value}
            onRatingChange={ratingChangeHandler}
            checked={item.value === formData.rating}
          />
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.comment}
        onChange={onCommentChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
