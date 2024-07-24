import { useAuth } from '../../hooks/use-auth';
import { HeaderAuthUser } from '../header-auth-user';
import { HeaderLogo } from '../header-logo';
import { HeaderNoAuthUser } from '../header-noauth-user';

type THeaderProps = {
  activeLogoClassName: string;
  shouldRenderUser: boolean;
};

export const Header = ({
  activeLogoClassName,
  shouldRenderUser,
}: THeaderProps) => {
  const isAuth = useAuth();

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <HeaderLogo activeLogoClassName={activeLogoClassName} />
          </div>
          {shouldRenderUser && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                {isAuth && <HeaderAuthUser />}
                {!isAuth && <HeaderNoAuthUser />}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};
