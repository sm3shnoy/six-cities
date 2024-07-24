import cn from 'classnames';
import { toast } from 'react-toastify';
import { getToken } from '../../services/token';
import { useAppDispatch } from '../../store/hooks';
import { favoritesActions } from '../../store/slices/favorites';
import { offersActions } from '../../store/slices/offers';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../const';
import { offerActions } from '../../store/slices/offer';

type TFavoriteButtonProps = {
  blockBem: string;
  width?: number;
  height?: number;
  offerId: string;
  isFavorite: boolean;
};

export const FavoriteButton = ({
  blockBem,
  width = 18,
  height = 19,
  offerId,
  isFavorite,
}: TFavoriteButtonProps) => {
  const dispatch = useAppDispatch();
  const navigateToLogin = useNavigate();
  const token = getToken();

  const bookmarkLabel = `${isFavorite ? 'In' : 'To'} bookmarks`;
  const buttonClass = `${blockBem}__bookmark-button`;
  const favoriteClass = cn('button', buttonClass, {
    [`${buttonClass}--active`]: isFavorite,
  });

  const favoriteChangeHandler = () => {
    if (!token) {
      toast('Гости не могут добавить в избранное!');
      return navigateToLogin(AppRoutes.Login);
    }

    dispatch(offersActions.updateOffers(offerId));
    dispatch(offerActions.updateOffer(offerId));
    dispatch(
      favoritesActions.changeFavoriteStatusAction({
        offerId,
        status: Number(!isFavorite),
      })
    );
  };

  return (
    <button
      className={favoriteClass}
      type="button"
      onClick={favoriteChangeHandler}
    >
      <svg
        className={`${blockBem}__bookmark-icon`}
        width={width}
        height={height}
      >
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">{bookmarkLabel}</span>
    </button>
  );
};
