import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { userActions } from '../../store/slices/user';
import { favoritesSelectors } from '../../store/slices/favorites';

export const HeaderAuthUser = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(favoritesSelectors.offers);

  const logoutClickHandler = () => {
    dispatch(userActions.logoutAction());
  };

  return (
    <>
      <li className="header__nav-item user">
        <Link
          className="header__nav-link header__nav-link--profile"
          to={AppRoutes.Favorites}
        >
          <div className="header__avatar-wrapper user__avatar-wrapper"></div>
          <span className="header__user-name user__name">
            Oliver.conner@gmail.com
          </span>
          <span className="header__favorite-count">{favorites.length}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <Link className="header__nav-link" to="#" onClick={logoutClickHandler}>
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </>
  );
};
