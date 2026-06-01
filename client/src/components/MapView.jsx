import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

const COLORS = { en_course: '#16a34a', en_charge: '#3b6ef5', hors_ligne: '#94a3b8' };

function dot(color) {
  return L.divIcon({
    className: 'veh-marker',
    html: `<span style="background:${color}"></span>`,
    iconSize: [16, 16],
  });
}
const stationIcon = L.divIcon({
  className: 'st-marker',
  html: '<span>⚡</span>',
  iconSize: [22, 22],
});

export default function MapView({ vehicles, stations }) {
  const ref = useRef(null);
  const map = useRef(null);
  const markers = useRef({});

  useEffect(() => {
    map.current = L.map(ref.current, { zoomControl: true }).setView([33.575, -7.62], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 19,
    }).addTo(map.current);
    return () => map.current && map.current.remove();
  }, []);

  // bornes (statiques)
  useEffect(() => {
    if (!map.current) return;
    stations.forEach(st => {
      L.marker([st.lat, st.lng], { icon: stationIcon })
        .addTo(map.current)
        .bindPopup(`<b>${st.nom}</b><br/>${st.puissance} kW · ${st.bornes - st.occupees}/${st.bornes} libres`);
    });
  }, [stations.length]);

  // véhicules (mis à jour en direct)
  useEffect(() => {
    if (!map.current) return;
    vehicles.forEach(v => {
      const pos = [v.lat, v.lng];
      const color = COLORS[v.statut] || '#64748b';
      if (markers.current[v.id]) {
        markers.current[v.id].setLatLng(pos).setIcon(dot(color));
      } else {
        markers.current[v.id] = L.marker(pos, { icon: dot(color) })
          .addTo(map.current)
          .bindPopup(`<b>${v.id}</b> · ${v.modele}<br/>Batterie ${v.batterie}% · ${v.vitesse} km/h`);
      }
    });
  }, [vehicles]);

  return <div ref={ref} className="map" />;
}
