type TFavoriteButtonProps = {
  blockBem: string;
  width?: number;
  height?: number;
};

export const FavoriteButton = ({
  blockBem,
  width = 18,
  height = 19,
}: TFavoriteButtonProps) => (
  <button className={`${blockBem}__bookmark-button button`} type="button">
    <svg className={`${blockBem}__bookmark-icon`} width={width} height={height}>
      <use xlinkHref="#icon-bookmark" />
    </svg>
    <span className="visually-hidden">To bookmarks</span>
  </button>
);
