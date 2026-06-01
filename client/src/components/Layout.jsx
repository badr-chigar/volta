import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const links = [
  ['/', 'Tableau de bord'],
  ['/carte', 'Carte de la flotte'],
  ['/vehicules', 'Véhicules'],
  ['/stations', 'Bornes de recharge'],
];
const META = {
  '/': ['Tableau de bord', 'Supervision temps réel de la flotte'],
  '/carte': ['Carte de la flotte', 'Positions en direct (Leaflet)'],
  '/vehicules': ['Véhicules', 'État et batterie de chaque véhicule'],
  '/stations': ['Bornes de recharge', 'Disponibilité et occupation'],
};

export default function Layout({ connected }) {
  const loc = useLocation();
  const [title, sub] = META[loc.pathname] || ['VOLTA', ''];
  return (
    <div className="app">
      <aside className="side">
        <div className="brand">VOLTA<span>⚡</span></div>
        <div className="sub">Smart Mobility</div>
        <div className="lab">SUPERVISION</div>
        <nav>
          {links.map(([to, l]) => (
            <NavLink key={to} to={to} end className={({ isActive }) => isActive ? 'active' : ''}>{l}</NavLink>
          ))}
        </nav>
        <div className="side-foot">
          <span className={'dot ' + (connected ? 'on' : 'off')} />
          {connected ? 'Temps réel connecté' : 'Hors ligne'}
        </div>
      </aside>
      <div className="main">
        <header className="topbar">
          <div className="tt"><h1>{title}</h1><div className="sub">{sub}</div></div>
          <span className={'live ' + (connected ? 'on' : '')}>{connected ? '● LIVE' : 'OFFLINE'}</span>
        </header>
        <div className="content"><Outlet /></div>
      </div>
    </div>
  );
}
