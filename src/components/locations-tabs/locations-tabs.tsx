import { MouseEvent } from 'react';
import cn from 'classnames';
import { CITIES, CityName } from '../../const';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { offersActions, offersSelectors } from '../../store/slices/offers';

export const LocationsTabs = () => {
  const currentCity = useAppSelector(offersSelectors.selectCity);
  const dispatch = useAppDispatch();

  const onCityChange = (evt: MouseEvent<HTMLElement>) => {
    const target = evt.target as HTMLElement;

    if (target.closest('.locations__item')?.tagName === 'LI') {
      dispatch(offersActions.changeCity(target.textContent as CityName));
    }
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list" onClick={onCityChange}>
          {CITIES.map((city) => (
            <li className="locations__item" key={city.id}>
              <a
                className={cn(
                  'locations__item-link tabs__item',
                  currentCity === city.name && 'tabs__item--active'
                )}
                href="#"
              >
                <span>{city.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
