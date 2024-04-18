import cn from 'classnames';
import { AppRoutes } from '../../const';
import { Link } from 'react-router-dom';

export const HeaderLogo = ({
  activeLogoClassName,
}: {
  activeLogoClassName: string;
}) =>
  activeLogoClassName ? (
    <a className={cn('header__logo-link', activeLogoClassName)}>
      <img
        className="header__logo"
        src="img/logo.svg"
        alt="6 cities logo"
        width={81}
        height={41}
      />
    </a>
  ) : (
    <Link
      className={cn('header__logo-link', activeLogoClassName)}
      to={AppRoutes.Main}
    >
      <img
        className="header__logo"
        src="img/logo.svg"
        alt="6 cities logo"
        width={81}
        height={41}
      />
    </Link>
  );
