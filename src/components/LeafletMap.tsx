import { useEffect, useRef } from 'react';

export default function LeafletMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: any;
    import('leaflet').then((L) => {
      import('leaflet/dist/leaflet.css');
      if (!mapRef.current) return;
      map = L.map(mapRef.current).setView([48.0735, 7.723], 15);
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; OpenStreetMap &copy; CARTO',
        }
      ).addTo(map);
      const icon = L.divIcon({
        html: '<div style="width:14px;height:14px;background:#c8ff00;border-radius:50%;box-shadow:0 0 10px rgba(200,255,0,0.5)"></div>',
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
