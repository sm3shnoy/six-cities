import cn from 'classnames';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../header';
import { Footer } from '../footer';
import { getLayoutState } from './helpers';
import { AppRoutes } from '../../const';

export const Layout = () => {
  const { pathname } = useLocation();
  const {
    classMainPage,
    shouldRenderFooter,
    activeLogoClassName,
    shouldRenderUser,
  } = getLayoutState(pathname as AppRoutes);

  return (
    <div className={cn('page', classMainPage)}>
      <Header
        shouldRenderUser={shouldRenderUser}
        activeLogoClassName={activeLogoClassName}
      />
      <Outlet />
      {shouldRenderFooter && <Footer />}
    </div>
  );
};
