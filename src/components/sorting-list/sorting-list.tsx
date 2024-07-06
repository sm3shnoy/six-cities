import { useState } from 'react';
import cn from 'classnames';
import { SORT_OPTIONS, SortOption } from '../../const';

type TSortingListProps = {
  current: SortOption;
  setter: (option: SortOption) => void;
};

export const SortingList = ({ current, setter }: TSortingListProps) => {
  const [isOpened, setOpen] = useState(false);

  const selectedOption = SORT_OPTIONS[current];

  const onSortClick = (evt: React.MouseEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const target = evt.target as HTMLElement;

    if (target.closest('.places__sorting') && target.tagName !== 'LI') {
      setOpen((prev) => !prev);
    }
  };

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
      onClick={onSortClick}
    >
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {selectedOption}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul
        className={cn(
          'places__options places__options--custom',
          isOpened && 'places__options--opened'
        )}
      >
        {SORT_OPTIONS.map((option, index) => (
          <li
            className={cn(
              'places__option',
              selectedOption === option && 'places__option--active'
            )}
            key={option}
            tabIndex={0}
            onClick={() => {
              setOpen(false);
              setter(index);
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
};
