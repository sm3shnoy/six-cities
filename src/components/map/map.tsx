import cn from 'classnames';
import useMap from './use-map';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { Marker, layerGroup } from 'leaflet';
import { TPreviewOffer } from '../../types/preview-offer';
import Pin from './assets/pin.svg';
import PinActive from './assets/pin-active.svg';
import { CITIES } from '../../const';
import { useAppSelector } from '../../store/hooks';
import { offersSelectors } from '../../store/slices/offers';

const DEFAULT_PIN = leaflet.icon({
  iconUrl: Pin,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const ACTIVE_PIN = leaflet.icon({
  iconUrl: PinActive,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

export const Map = ({
  extraClassName,
  points,
}: {
  extraClassName?: string;
  points: TPreviewOffer[];
}) => {
  const currentCity = useAppSelector(offersSelectors.selectCity);
  const mapRef = useRef(null);
  const cityInfo =
    CITIES.find((city) => city.name === currentCity) || CITIES[0];
  const map = useMap(mapRef, cityInfo);
  const selectedPoint = useAppSelector(offersSelectors.activeId);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        });

        marker
          .setIcon(
            selectedPoint && point.id === selectedPoint
              ? ACTIVE_PIN
              : DEFAULT_PIN
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);

  return <section className={cn(extraClassName, 'map')} ref={mapRef}></section>;
};
