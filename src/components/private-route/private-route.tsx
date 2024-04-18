import { PropsWithChildren } from 'react';
import { AppRoutes } from '../../const';
import { Location, Navigate, useLocation } from 'react-router-dom';

type TPrivateRouteProps = {
  isOnlyUnAuth?: boolean;
} & PropsWithChildren;

type FromState = {
  from?: Location;
};

const hasAccess = true;

export const PrivateRoute = ({
  children,
  isOnlyUnAuth,
}: TPrivateRouteProps) => {
  const location = useLocation() as Location<FromState>;

  if (isOnlyUnAuth && hasAccess) {
    const from = location.state?.from || { pathname: AppRoutes.Main };

    return <Navigate to={from} />;
  }

  if (!isOnlyUnAuth && !hasAccess) {
    return <Navigate to={AppRoutes.Login} state={{ from: location }} />;
  }

  return children;
};
