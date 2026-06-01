import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { vehicles, stations, tick, stats } from './fleet.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'VOLTA API' }));
app.get('/api/vehicles', (_req, res) => res.json(vehicles));
app.get('/api/stations', (_req, res) => res.json(stations));
app.get('/api/stats', (_req, res) => res.json(stats()));

const PORT = process.env.PORT || 4001;
const server = createServer(app);

// --- WebSocket : diffusion de la télémétrie temps réel ---
const wss = new WebSocketServer({ server, path: '/ws' });

wss.on('connection', (ws) => {
  // état initial à la connexion
  ws.send(JSON.stringify({ type: 'init', vehicles, stations, stats: stats() }));
});

setInterval(() => {
  tick();
  const payload = JSON.stringify({ type: 'update', vehicles, stats: stats(), at: Date.now() });
  for (const ws of wss.clients) {
    if (ws.readyState === 1) ws.send(payload);
  }
}, 2000);

server.listen(PORT, () => console.log(`VOLTA API + WebSocket → http://localhost:${PORT} (ws://localhost:${PORT}/ws)`));
