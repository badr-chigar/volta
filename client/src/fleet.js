import { useEffect, useRef, useState } from 'react';

const LABELS = { en_course: 'En course', en_charge: 'En charge', hors_ligne: 'Hors ligne' };
export const statutLabel = (s) => LABELS[s] || s;

// Hook : connexion WebSocket à la télémétrie temps réel, repli sur polling REST.
export function useFleet() {
  const [vehicles, setVehicles] = useState([]);
  const [stations, setStations] = useState([]);
  const [stats, setStats] = useState(null);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef(null);

  useEffect(() => {
    // état initial via REST
    fetch('/api/vehicles').then(r => r.json()).then(setVehicles).catch(() => {});
    fetch('/api/stations').then(r => r.json()).then(setStations).catch(() => {});
    fetch('/api/stats').then(r => r.json()).then(setStats).catch(() => {});

    const proto = location.protocol === 'https:' ? 'wss' : 'ws';
    let ws;
    try {
      ws = new WebSocket(`${proto}://${location.host}/ws`);
      wsRef.current = ws;
      ws.onopen = () => setConnected(true);
      ws.onclose = () => setConnected(false);
      ws.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.vehicles) setVehicles(msg.vehicles);
        if (msg.stations) setStations(msg.stations);
        if (msg.stats) setStats(msg.stats);
      };
    } catch { /* ws indisponible */ }

    return () => ws && ws.close();
  }, []);

  return { vehicles, stations, stats, connected };
}
