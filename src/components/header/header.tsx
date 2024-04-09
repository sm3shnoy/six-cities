import { HeaderAuthUser } from '../header-auth-user';
import { HeaderLogo } from '../header-logo';
import { HeaderNoAuthUser } from '../header-noauth-user';

export const Header = ({ hasAccess }: { hasAccess: boolean }) => (
  <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <HeaderLogo />
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            {hasAccess && <HeaderAuthUser />}
            {!hasAccess && <HeaderNoAuthUser />}
          </ul>
        </nav>
      </div>
    </div>
  </header>
);
