import { AuthorizationStatus } from '../const';
import { useAppSelector } from '../store/hooks';
import { userSelectors } from '../store/slices/user';

export const useAuth = () => {
  const userStatus = useAppSelector(userSelectors.userStatus);

  return userStatus === AuthorizationStatus.Auth;
};
