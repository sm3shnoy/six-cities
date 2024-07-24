import { PropsWithChildren } from 'react';
import { AppRoutes } from '../../const';
import { Location, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';

type TPrivateRouteProps = {
  isOnlyUnAuth?: boolean;
} & PropsWithChildren;

type FromState = {
  from?: Location;
};

export const PrivateRoute = ({
  children,
  isOnlyUnAuth,
}: TPrivateRouteProps) => {
  const location = useLocation() as Location<FromState>;
  const isAuth = useAuth();

  if (isOnlyUnAuth && isAuth) {
    const from = location.state?.from || { pathname: AppRoutes.Main };

    return <Navigate to={from} />;
  }

  if (!isOnlyUnAuth && !isAuth) {
    return <Navigate to={AppRoutes.Login} state={{ from: location }} />;
  }

  return children;
};
