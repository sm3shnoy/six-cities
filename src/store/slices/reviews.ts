import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '../../const';
import { TReviews } from '../../types/reviews';
import { reviewsThunks } from '../thunks/reviews';

type ReviewsState = {
  reviews: TReviews[];
  status: RequestStatus;
};

const initialState: ReviewsState = {
  reviews: [],
  status: RequestStatus.Idle,
};

function fetchSuccess(state: ReviewsState, action: PayloadAction<TReviews[]>) {
  state.reviews = action.payload;
  state.status = RequestStatus.Success;
}

function fetchLoading(state: ReviewsState) {
  state.status = RequestStatus.Loading;
}

function fetchRejected(state: ReviewsState) {
  state.status = RequestStatus.Failed;
}

function postSuccess(state: ReviewsState, action: PayloadAction<TReviews>) {
  state.reviews.push(action.payload);
  state.status = RequestStatus.Success;
}

function postLoading(state: ReviewsState) {
  state.status = RequestStatus.Loading;
}

function postRejected(state: ReviewsState) {
  state.status = RequestStatus.Failed;
}

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(reviewsThunks.fetchReviewsAction.fulfilled, fetchSuccess)
      .addCase(reviewsThunks.fetchReviewsAction.pending, fetchLoading)
      .addCase(reviewsThunks.fetchReviewsAction.rejected, fetchRejected)
      .addCase(reviewsThunks.postReviewAction.fulfilled, postSuccess)
      .addCase(reviewsThunks.postReviewAction.pending, postLoading)
      .addCase(reviewsThunks.postReviewAction.rejected, postRejected),
  selectors: {
    reviews: (state) => state.reviews,
    status: (state) => state.status,
  },
});

export const reviewsActions = { ...reviewsSlice.actions, ...reviewsThunks };
export const reviewsSelectors = reviewsSlice.selectors;
