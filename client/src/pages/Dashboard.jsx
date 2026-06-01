import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { statutLabel } from '../fleet.js';

export default function Dashboard({ fleet }) {
  const { stats, vehicles } = fleet;
  const [serie, setSerie] = useState([]);

  // historique de l'autonomie moyenne pour le graphique temps réel
  useEffect(() => {
    if (!stats) return;
    setSerie(s => [...s.slice(-19), { t: new Date().toLocaleTimeString('fr-FR').slice(0, 8), autonomie: stats.autonomie, actifs: stats.actifs }]);
  }, [stats]);

  if (!stats) return <div className="muted">Connexion à la flotte…</div>;
  const cards = [
    ['Véhicules actifs', stats.actifs + ' / ' + stats.total, 'accent'],
    ['Autonomie moyenne', stats.autonomie + ' %', stats.autonomie < 30 ? 'warn' : 'ok'],
    ['En charge', stats.enCharge, 'purple'],
    ['Bornes libres', stats.bornesLibres, 'ok'],
  ];
  return (
    <div>
      <div className="kpis">
        {cards.map(([l, v, c]) => (
          <div key={l} className={'kpi ' + c}><div className="kpi-v">{v}</div><div className="kpi-l">{l}</div></div>
        ))}
      </div>

      <div className="panel">
        <h2>Autonomie moyenne de la flotte <span className="muted">(temps réel)</span></h2>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={serie}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e6e9f1" />
            <XAxis dataKey="t" tick={{ fontSize: 11, fill: '#7a869c' }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#7a869c' }} />
            <Tooltip />
            <Line type="monotone" dataKey="autonomie" stroke="#16a34a" strokeWidth={2.5} dot={false} isAnimationActive={false} />
            <Line type="monotone" dataKey="actifs" stroke="#3b6ef5" strokeWidth={2} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h2>Activité récente</h2>
      <table>
        <thead><tr><th>Véhicule</th><th>Statut</th><th>Batterie</th><th>Vitesse</th></tr></thead>
        <tbody>
          {vehicles.slice(0, 6).map(v => (
            <tr key={v.id}>
              <td>{v.id} · {v.modele}</td>
              <td><span className={'tag s-' + v.statut}>{statutLabel(v.statut)}</span></td>
              <td>{v.batterie}%</td>
              <td>{v.vitesse} km/h</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
