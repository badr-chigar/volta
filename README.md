# VOLTA — Plateforme de mobilité urbaine intelligente

Supervision en **temps réel** d'une flotte de véhicules électriques et de bornes de recharge : carte interactive, tableaux de bord temps réel et visualisation de données. Frontend **React (Vite)** + backend **Node.js / Express** avec **WebSocket** et cartographie **Leaflet**.

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Socket](https://img.shields.io/badge/WebSocket-010101?style=flat&logo=socketdotio&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=flat&logo=leaflet&logoColor=white)

🌐 **Démo live** : [badr-chigar.vercel.app/volta.html](https://badr-chigar.vercel.app/volta.html) · 👤 **Portfolio** : [badr-chigar.vercel.app](https://badr-chigar.vercel.app)

> Projet personnel de Badr Chigar — Ingénieur d'État en Informatique (EMSI Casablanca), développeur Full Stack Java/Spring & React.

## ✨ Fonctionnalités

- **Temps réel** : positions, vitesse et batterie des véhicules poussées par WebSocket (mise à jour toutes les 2 s).
- **Carte interactive Leaflet** : marqueurs des véhicules et bornes, mise à jour live.
- **Tableaux de bord** : KPIs (véhicules actifs, autonomie moyenne, bornes libres) + graphique temps réel.
- **Flotte** : liste des véhicules avec statut (en course, en charge, hors-ligne) et niveau de batterie.
- **Bornes de recharge** : disponibilité, puissance, occupation.

## 🛠️ Stack

| Couche | Technologies |
|---|---|
| Frontend | React 18, Vite, React Router, Leaflet, Recharts |
| Backend | Node.js, Express, WebSocket (ws) |
| Données | Simulateur de télémétrie temps réel |

## 🗂️ Architecture

```
volta/
├── server/                  API REST + serveur WebSocket (simulateur de flotte)
│   ├── index.js
│   └── fleet.js             modèle de la flotte + simulation
└── client/                  SPA React (Vite)
    └── src/
        ├── pages/           Dashboard, Carte, Vehicules, Stations
        └── components/      Layout, MapView (Leaflet), LiveChart
```

## 🚀 Démarrage

**Backend (port 4001)**
```bash
cd server && npm install && npm start
```

**Frontend (port 5173)**
```bash
cd client && npm install && npm run dev
```
Ouvre `http://localhost:5173` — la carte et les dashboards se mettent à jour en direct.

## 📄 Licence

MIT © Badr Chigar
