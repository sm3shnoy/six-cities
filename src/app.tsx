import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/main-page';
import { AppRoutes, RequestStatus } from './const';
import NotFoundPage from './pages/not-found-page';
import { FavoritesPage } from './pages/favorites-page';
import { Login } from './pages/login-page';
import { OfferPage } from './pages/offer-page';
import { Layout } from './components/layout';
import { PrivateRoute } from './components/private-route/private-route';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { checkAuthAction } from './store/thunks/user';
import { getToken } from './services/token';
import { offersActions } from './store/slices/offers';
import { userSelectors } from './store/slices/user';
import { Spinner } from './components/spinner';

const App = () => {
  const dispatch = useAppDispatch();
  const authLoadingStatus = useAppSelector(userSelectors.requestStatus);
  const token = getToken();

  useEffect(() => {
    dispatch(offersActions.fetchOffersAction());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(checkAuthAction());
    }
  }, [dispatch, token]);

  if (authLoadingStatus === RequestStatus.Loading) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.Main} element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route
            path={AppRoutes.Favorites}
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoutes.Login}
            element={
              <PrivateRoute isOnlyUnAuth>
                <Login />
              </PrivateRoute>
            }
          />
          <Route path={AppRoutes.OfferId} element={<OfferPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
