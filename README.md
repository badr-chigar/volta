# VOLTA — Mobilité urbaine intelligente

> Plateforme de **supervision en temps réel** d'une flotte de véhicules électriques : positions live sur carte, état des bornes, et tableaux de bord analytiques.

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Socket.io](https://img.shields.io/badge/WebSocket-010101?style=flat&logo=socketdotio&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=flat&logo=leaflet&logoColor=white)

## 🔗 Démo & liens

- 🌐 **Démo live** : [badr-chigar.vercel.app/volta.html](https://badr-chigar.vercel.app/volta.html)
- 👤 **Portfolio** : [badr-chigar.vercel.app](https://badr-chigar.vercel.app)

## 🎯 Aperçu

VOLTA supervise une **flotte de véhicules électriques en temps réel**. Les positions et états remontent via **WebSocket**, s'affichent sur une **carte Leaflet** et alimentent des **graphiques Recharts** pour le suivi opérationnel.

## ✨ Fonctionnalités

- 🗺️ **Carte temps réel** — positions des véhicules (Leaflet)
- ⚡ **Flux live** — mises à jour poussées via WebSocket
- 📊 **Dashboards** — autonomie, trajets, bornes (Recharts)
- 🚙 **Suivi de flotte** — état, alertes, historique

## 🛠️ Stack technique

| Couche | Technologies |
|---|---|
| Front-end | React, Leaflet, Recharts |
| Back-end | Node.js, Express, WebSocket |
| Temps réel | WebSocket (push) |

## 🚀 Lancer en local

```bash
# Back-end
cd server && npm install && npm run dev

# Front-end
cd client && npm install && npm run dev
```

## 👤 Auteur

**Badr Chigar** — Ingénieur d'État Full Stack (Java/Spring & React)
[Portfolio](https://badr-chigar.vercel.app) · [LinkedIn](https://www.linkedin.com/in/badr-chigar) · [GitHub](https://github.com/badr-chigar)
