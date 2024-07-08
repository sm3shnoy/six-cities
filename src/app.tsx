import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/main-page';
import { AppRoutes } from './const';
import NotFoundPage from './pages/not-found-page';
import { FavoritesPage } from './pages/favorites-page';
import { Login } from './pages/login-page';
import { OfferPage } from './pages/offer-page';
import { Layout } from './components/layout';
import { PrivateRoute } from './components/private-route/private-route';

const App = () => (
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

export default App;
