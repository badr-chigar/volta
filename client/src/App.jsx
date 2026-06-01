import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Carte from './pages/Carte.jsx';
import Vehicules from './pages/Vehicules.jsx';
import Stations from './pages/Stations.jsx';
import { useFleet } from './fleet.js';

export default function App() {
  const fleet = useFleet();
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout connected={fleet.connected} />}>
          <Route path="/" element={<Dashboard fleet={fleet} />} />
          <Route path="/carte" element={<Carte fleet={fleet} />} />
          <Route path="/vehicules" element={<Vehicules fleet={fleet} />} />
          <Route path="/stations" element={<Stations fleet={fleet} />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
