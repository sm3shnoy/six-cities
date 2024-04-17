import { AppRoutes } from '../../const';

export const getLayoutState = (pathname: AppRoutes) => {
  let classMainPage = '';
  let shouldRenderFooter = false;
  let shouldRenderUser = true;
  let activeLogoClassName = '';

  switch (pathname) {
    case AppRoutes.Main:
      classMainPage = 'page--gray page--main';
      activeLogoClassName = 'header__logo-link--active';
      break;
    case AppRoutes.Login:
      shouldRenderUser = false;
      classMainPage = 'page--gray page--login';
      break;
    case AppRoutes.Favorites:
      classMainPage = 'page--favorites-empty';
      shouldRenderFooter = true;
      break;
  }

  return {
    classMainPage,
    shouldRenderFooter,
    activeLogoClassName,
    shouldRenderUser,
  };
};
