import React from 'react';
import MapView from '../components/MapView.jsx';

export default function Carte({ fleet }) {
  return (
    <div className="carte-wrap">
      <div className="legend">
        <span><i className="d en_course" /> En course</span>
        <span><i className="d en_charge" /> En charge</span>
        <span><i className="d hors_ligne" /> Hors ligne</span>
        <span><i className="d st" /> Borne</span>
      </div>
      <MapView vehicles={fleet.vehicles} stations={fleet.stations} />
    </div>
  );
}
