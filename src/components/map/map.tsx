import cn from 'classnames';
import useMap from './use-map';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { Marker, layerGroup } from 'leaflet';
import { TPreviewOffer } from '../../types/preview-offer';
import Pin from './assets/pin.svg';
import PinActive from './assets/pin-active.svg';

type TCityMap = {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
};

export const Map = ({
  extraClassName,
  currentCity,
  points,
  selectedPoint,
}: {
  extraClassName?: string;
  currentCity: TCityMap;
  points: TPreviewOffer[];
  selectedPoint: TPreviewOffer | null;
}) => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, currentCity);

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
            selectedPoint && point.id === selectedPoint?.id
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
