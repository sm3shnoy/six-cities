import { createAppAsyncThunk } from '../hooks';
import { APIRoutes } from '../../const';
import { User } from '../../types/user';
import { AxiosInstance } from 'axios';
import { removeToken, setToken } from '../../services/token';
import { TLoginData } from '../../types/login';

export const checkAuthAction = createAppAsyncThunk<
  User,
  undefined,
  { extra: AxiosInstance }
>('user/checkAuth', async (_arg, { extra: api }) => {
  const response = await api.get<User>(APIRoutes.Login);

  return response.data;
});

export const authAction = createAppAsyncThunk<
  User,
  TLoginData,
  { extra: AxiosInstance }
>('user/login', async (body, { extra: api }) => {
  const { data } = await api.post<User>(APIRoutes.Login, body);
  setToken(data.token);

  return data;
});

export const logoutAction = createAppAsyncThunk<
  unknown,
  undefined,
  { extra: AxiosInstance }
>('user/logout', async (_arg, { extra: api }) => {
  await api.delete(APIRoutes.Logout);

  removeToken();
});
