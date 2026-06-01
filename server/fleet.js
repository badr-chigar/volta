// Modèle de flotte VOLTA + simulateur de télémétrie temps réel.
// Casablanca approx. : lat 33.57, lng -7.59

const STATUTS = ['en_course', 'en_charge', 'hors_ligne'];

function rnd(min, max) { return Math.random() * (max - min) + min; }

export const stations = [
  { id: 'ST-01', nom: 'Borne Maârif',        lat: 33.585, lng: -7.632, puissance: 22, bornes: 6, occupees: 2 },
  { id: 'ST-02', nom: 'Borne Sidi Maarouf',  lat: 33.535, lng: -7.640, puissance: 50, bornes: 4, occupees: 4 },
  { id: 'ST-03', nom: 'Borne Anfa',          lat: 33.595, lng: -7.660, puissance: 22, bornes: 8, occupees: 3 },
  { id: 'ST-04', nom: 'Borne Ain Diab',      lat: 33.605, lng: -7.690, puissance: 150, bornes: 3, occupees: 1 },
  { id: 'ST-05', nom: 'Borne Gare Casa-Port',lat: 33.600, lng: -7.610, puissance: 50, bornes: 6, occupees: 5 },
];

export const vehicles = Array.from({ length: 12 }, (_, i) => ({
  id: 'VLT-' + String(i + 1).padStart(3, '0'),
  modele: ['e-Berlingo', 'Zoe', 'e-208', 'Kangoo ZE'][i % 4],
  lat: 33.57 + rnd(-0.04, 0.04),
  lng: -7.60 + rnd(-0.05, 0.05),
  batterie: Math.round(rnd(20, 100)),
  vitesse: 0,
  statut: STATUTS[i % 3],
  conducteur: ['A. Bennani', 'S. Idrissi', 'M. Alaoui', 'K. Tazi', 'R. Fassi', 'N. Saidi'][i % 6],
  km: Math.round(rnd(5000, 80000)),
}));

// Fait évoluer l'état d'un cran (appelé périodiquement)
export function tick() {
  for (const v of vehicles) {
    if (v.statut === 'en_course') {
      v.lat += rnd(-0.0015, 0.0015);
      v.lng += rnd(-0.0015, 0.0015);
      v.vitesse = Math.round(rnd(15, 70));
      v.batterie = Math.max(0, v.batterie - rnd(0, 0.8));
      v.km += rnd(0, 0.4);
      if (v.batterie < 8) v.statut = 'en_charge';
    } else if (v.statut === 'en_charge') {
      v.vitesse = 0;
      v.batterie = Math.min(100, v.batterie + rnd(0.5, 1.5));
      if (v.batterie > 95) v.statut = 'en_course';
    } else {
      v.vitesse = 0;
      if (Math.random() < 0.05) v.statut = 'en_course';
    }
    v.batterie = Math.round(v.batterie);
    v.km = Math.round(v.km);
  }
  return vehicles;
}

export function stats() {
  const actifs = vehicles.filter(v => v.statut === 'en_course').length;
  const enCharge = vehicles.filter(v => v.statut === 'en_charge').length;
  const horsLigne = vehicles.filter(v => v.statut === 'hors_ligne').length;
  const autonomie = Math.round(vehicles.reduce((s, v) => s + v.batterie, 0) / vehicles.length);
  const bornesLibres = stations.reduce((s, st) => s + (st.bornes - st.occupees), 0);
  return { total: vehicles.length, actifs, enCharge, horsLigne, autonomie, bornesLibres };
}
