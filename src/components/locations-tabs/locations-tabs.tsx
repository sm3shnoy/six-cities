import { MouseEvent, useState } from 'react';
import cn from 'classnames';
import { CITIES } from './const';

export const LocationsTabs = () => {
  const [activeCity, setActiveCity] = useState('Paris');

  const onCityChange = (evt: MouseEvent<HTMLElement>) => {
    const target = evt.target as HTMLElement;

    if (target.closest('.locations__item')?.tagName === 'LI') {
      setActiveCity(target.textContent as string);
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
                  activeCity === city.name && 'tabs__item--active'
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
