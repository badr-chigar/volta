import React from 'react';
import { statutLabel } from '../fleet.js';

function Bat({ v }) {
  const col = v < 20 ? '#e23b4e' : v < 50 ? '#e08a00' : '#16a34a';
  return (
    <div className="bat">
      <div className="bat-bar"><span style={{ width: v + '%', background: col }} /></div>
      <span className="bat-v">{v}%</span>
    </div>
  );
}

export default function Vehicules({ fleet }) {
  return (
    <table>
      <thead><tr><th>ID</th><th>Modèle</th><th>Conducteur</th><th>Statut</th><th>Batterie</th><th>Vitesse</th><th>Kilométrage</th></tr></thead>
      <tbody>
        {fleet.vehicles.map(v => (
          <tr key={v.id}>
            <td><b>{v.id}</b></td>
            <td>{v.modele}</td>
            <td>{v.conducteur}</td>
            <td><span className={'tag s-' + v.statut}>{statutLabel(v.statut)}</span></td>
            <td><Bat v={v.batterie} /></td>
            <td>{v.vitesse} km/h</td>
            <td>{v.km.toLocaleString('fr-FR')} km</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
