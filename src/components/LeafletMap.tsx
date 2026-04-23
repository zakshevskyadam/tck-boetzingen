import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

export default function LeafletMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: any;
    import('leaflet').then((L) => {
      if (!mapRef.current) return;

      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

      const darkTiles = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
      const lightTiles = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

      map = L.map(mapRef.current).setView([48.0735, 7.723], 15);
      L.tileLayer(isDark ? darkTiles : lightTiles, {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
      }).addTo(map);

      const markerColor = isDark ? '#c8ff00' : '#3d7a00';
      const icon = L.divIcon({
        html: `<div style="width:14px;height:14px;background:${markerColor};border-radius:50%;box-shadow:0 0 10px ${markerColor}80"></div>`,
        className: '',
        iconSize: [14, 14],
      });
      L.marker([48.0735, 7.723], { icon }).addTo(map);
    });
    return () => {
      if (map) map.remove();
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ height: '400px', width: '100%', borderRadius: '4px' }}
    />
  );
}
