import { useMap } from '@vis.gl/react-google-maps';
import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './pulse-marker.css';

type PulseMarkerProps = {
  position: google.maps.LatLngLiteral;
  info?: React.ReactNode;
  emergency: boolean;
};

export const PulseMarker = ({ position, info, emergency }: PulseMarkerProps) => {
  const overlayRef = useRef<google.maps.OverlayView | null>(null);
  const map = useMap();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!map) return;

    const div = document.createElement('div');
    div.className = `custom-pulse-marker${emergency ? ' custom-pulse-marker--alert' : ''}`;

    const infoDiv = document.createElement('div');
    infoDiv.className = 'custom-pulse-info';
    infoDiv.style.display = 'none'; // hidden by default
    div.appendChild(infoDiv);

    if (info) {
      if (typeof info === 'string') {
        infoDiv.innerHTML = info;
      } else {
        const root = createRoot(infoDiv);
        root.render(info);
      }
    }

    div.addEventListener('mouseenter', () => {
      setHovered(true);
      infoDiv.style.display = 'block';
    });

    div.addEventListener('mouseleave', () => {
      setHovered(false);
      infoDiv.style.display = 'none';
    });

    const overlay = new google.maps.OverlayView();
    overlay.onAdd = function () {
      const panes = overlay.getPanes();
      if (panes) {
        panes.overlayMouseTarget.appendChild(div);
      }
    };

    overlay.draw = function () {
      const projection = overlay.getProjection();
      if (!projection) return;

      const point = projection.fromLatLngToDivPixel(
        new google.maps.LatLng(position)
      );
      if (point) {
        div.style.left = `${point.x}px`;
        div.style.top = `${point.y}px`;
        div.style.position = 'absolute';
        div.style.transform = 'translate(-50%, -50%)';
      }
    };

    overlay.onRemove = function () {
      div.remove();
    };

    overlay.setMap(map);
    overlayRef.current = overlay;

    return () => {
      overlay.setMap(null);
    };
  }, [map, position, info, emergency]);

  return null;
};
