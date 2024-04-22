import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const';

export const HeaderNoAuthUser = () => (
  <li className="header__nav-item user">
    <Link
      className="header__nav-link header__nav-link--profile"
      to={AppRoutes.Login}
    >
      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
      <span className="header__login">Sign in</span>
    </Link>
  </li>
);
