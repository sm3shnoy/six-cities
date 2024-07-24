import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, RequestStatus } from '../../const';
import { User } from '../../types/user';
import { authAction, checkAuthAction, logoutAction } from '../thunks/user';

type UserState = {
  info: User | null;
  requestStatus: RequestStatus;
  status: AuthorizationStatus;
};

const initialState: UserState = {
  info: null,
  requestStatus: RequestStatus.Idle,
  status: AuthorizationStatus.Unknown,
};

function proccessSuccess(state: UserState, action: PayloadAction<User>) {
  state.info = action.payload;
  state.requestStatus = RequestStatus.Success;
  state.status = AuthorizationStatus.Auth;
}

function proccessFailed(state: UserState) {
  state.requestStatus = RequestStatus.Failed;
  state.status = AuthorizationStatus.NoAuth;
}

function proccessLoading(state: UserState) {
  state.requestStatus = RequestStatus.Loading;
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.fulfilled, proccessSuccess)
      .addCase(checkAuthAction.rejected, proccessFailed)
      .addCase(checkAuthAction.pending, proccessLoading)
      .addCase(authAction.fulfilled, proccessSuccess)
      .addCase(authAction.rejected, proccessFailed)
      .addCase(authAction.pending, proccessLoading)
      .addCase(logoutAction.fulfilled, (state: UserState) => {
        state.info = null;
        state.status = AuthorizationStatus.NoAuth;
      });
  },
  selectors: {
    userStatus: (state) => state.status,
    requestStatus: (state) => state.requestStatus,
  },
});

export const userSelectors = userSlice.selectors;
export const userActions = { checkAuthAction, logoutAction, authAction };
