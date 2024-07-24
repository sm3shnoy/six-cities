import { TReviews } from '../../types/reviews';
import { APIRoutes } from '../../const';
import { TOffer } from '../../types/offer';
import { createAppAsyncThunk } from '../hooks';

type PostCommentProps = {
  body: {
    rating: number;
    comment: string;
  };
  offerId: TOffer['id'];
};

const fetchReviewsAction = createAppAsyncThunk<TReviews[], string>(
  'comments/fetch',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<TReviews[]>(
      `${APIRoutes.Comments}/${offerId}`
    );

    return data;
  }
);

const postReviewAction = createAppAsyncThunk<TReviews, PostCommentProps>(
  'comments/post',
  async ({ body, offerId }, { extra: api }) => {
    const { data } = await api.post<TReviews>(
      `${APIRoutes.Comments}/${offerId}`,
      body
    );

    return data;
  }
);

export const reviewsThunks = { fetchReviewsAction, postReviewAction };
