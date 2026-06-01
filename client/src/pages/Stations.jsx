import React from 'react';

export default function Stations({ fleet }) {
  return (
    <div className="grid-st">
      {fleet.stations.map(st => {
        const libres = st.bornes - st.occupees;
        const taux = Math.round((st.occupees / st.bornes) * 100);
        return (
          <div className="st-card" key={st.id}>
            <div className="st-head">
              <h3>{st.nom}</h3>
              <span className="tag">{st.puissance} kW</span>
            </div>
            <div className="st-gauge"><span style={{ width: taux + '%' }} /></div>
            <div className="st-row">
              <span>{st.occupees}/{st.bornes} occupées</span>
              <span className={libres > 0 ? 'ok' : 'full'}>{libres > 0 ? libres + ' libre(s)' : 'Complet'}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
