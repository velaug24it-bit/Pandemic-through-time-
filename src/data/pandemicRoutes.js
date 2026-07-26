/**
 * pandemicRoutes.js
 * Mock data for disease transmission visualization:
 *  - Air travel routes between major hubs
 *  - Sea shipping routes
 *  - Active outbreak hotspots
 *  - Pandemic spread arcs (historical + present)
 */
import { latLonToVec3 } from './countries';

// ── City hubs (lat, lon) ──────────────────────────────────────────────────
export const CITIES = {
  nyc:     { name: 'New York',     lat: 40.71, lon: -74.01 },
  lon:     { name: 'London',       lat: 51.51, lon: -0.13  },
  par:     { name: 'Paris',        lat: 48.86, lon: 2.35   },
  ber:     { name: 'Berlin',       lat: 52.52, lon: 13.41  },
  mos:     { name: 'Moscow',       lat: 55.75, lon: 37.62  },
  dub:     { name: 'Dubai',        lat: 25.20, lon: 55.27  },
  del:     { name: 'Delhi',        lat: 28.61, lon: 77.21  },
  mum:     { name: 'Mumbai',       lat: 19.08, lon: 72.88  },
  bkk:     { name: 'Bangkok',      lat: 13.75, lon: 100.50 },
  sha:     { name: 'Shanghai',     lat: 31.23, lon: 121.47 },
  bei:     { name: 'Beijing',      lat: 39.91, lon: 116.39 },
  tky:     { name: 'Tokyo',        lat: 35.68, lon: 139.69 },
  sin:     { name: 'Singapore',    lat: 1.35,  lon: 103.82 },
  jkt:     { name: 'Jakarta',      lat: -6.21, lon: 106.85 },
  syd:     { name: 'Sydney',       lat: -33.87,lon: 151.21 },
  sao:     { name: 'São Paulo',    lat: -23.55,lon: -46.63 },
  lag:     { name: 'Lagos',        lat: 6.52,  lon: 3.38   },
  nrb:     { name: 'Nairobi',      lat: -1.29, lon: 36.82  },
  cai:     { name: 'Cairo',        lat: 30.05, lon: 31.24  },
  mex:     { name: 'Mexico City',  lat: 19.43, lon: -99.13 },
  lax:     { name: 'Los Angeles',  lat: 34.05, lon: -118.24},
  chi:     { name: 'Chicago',      lat: 41.88, lon: -87.63 },
  bue:     { name: 'Buenos Aires', lat: -34.61,lon: -58.38 },
  mad:     { name: 'Madrid',       lat: 40.42, lon: -3.70  },
  rom:     { name: 'Rome',         lat: 41.90, lon: 12.50  },
};

// ── Air travel routes (major pandemic spread vectors) ────────────────────
export const AIR_ROUTES = [
  { from: 'nyc', to: 'lon', color: '#00c8ff', type: 'air' },
  { from: 'nyc', to: 'par', color: '#00c8ff', type: 'air' },
  { from: 'nyc', to: 'mex', color: '#00c8ff', type: 'air' },
  { from: 'nyc', to: 'sao', color: '#00c8ff', type: 'air' },
  { from: 'lon', to: 'dub', color: '#00c8ff', type: 'air' },
  { from: 'lon', to: 'del', color: '#00c8ff', type: 'air' },
  { from: 'lon', to: 'cai', color: '#00c8ff', type: 'air' },
  { from: 'dub', to: 'del', color: '#00c8ff', type: 'air' },
  { from: 'dub', to: 'bkk', color: '#00c8ff', type: 'air' },
  { from: 'del', to: 'sha', color: '#00c8ff', type: 'air' },
  { from: 'del', to: 'sin', color: '#00c8ff', type: 'air' },
  { from: 'sha', to: 'tky', color: '#00c8ff', type: 'air' },
  { from: 'sha', to: 'nyc', color: '#00c8ff', type: 'air' },
  { from: 'sin', to: 'syd', color: '#00c8ff', type: 'air' },
  { from: 'sin', to: 'jkt', color: '#00c8ff', type: 'air' },
  { from: 'lag', to: 'lon', color: '#00c8ff', type: 'air' },
  { from: 'lag', to: 'par', color: '#00c8ff', type: 'air' },
  { from: 'nrb', to: 'dub', color: '#00c8ff', type: 'air' },
];

// ── Sea routes (shipping, longer spread) ────────────────────────────────
export const SEA_ROUTES = [
  { from: 'sha', to: 'syd',  color: '#00e5ff', type: 'sea' },
  { from: 'sin', to: 'dub',  color: '#00e5ff', type: 'sea' },
  { from: 'lon', to: 'nyc',  color: '#00e5ff', type: 'sea' },
  { from: 'sao', to: 'lag',  color: '#00e5ff', type: 'sea' },
  { from: 'nyc', to: 'mad',  color: '#00e5ff', type: 'sea' },
  { from: 'rom', to: 'cai',  color: '#00e5ff', type: 'sea' },
  { from: 'mum', to: 'dub',  color: '#00e5ff', type: 'sea' },
];

// ── Active outbreak hotspots ─────────────────────────────────────────────
export const OUTBREAK_HOTSPOTS = [
  { city: 'del',  severity: 'critical', pathogen: 'Novel Flu H5N2',   reported: '2.1M cases' },
  { city: 'lag',  severity: 'critical', pathogen: 'Ebola Variant',     reported: '45K cases'  },
  { city: 'jkt',  severity: 'high',     pathogen: 'Dengue Outbreak',   reported: '890K cases' },
  { city: 'cai',  severity: 'high',     pathogen: 'Cholera Wave',      reported: '120K cases' },
  { city: 'sha',  severity: 'medium',   pathogen: 'COVID-26 Variant',  reported: '3.4M cases' },
  { city: 'sao',  severity: 'medium',   pathogen: 'Yellow Fever',      reported: '220K cases' },
  { city: 'nrb',  severity: 'high',     pathogen: 'Monkeypox+',        reported: '67K cases'  },
  { city: 'bkk',  severity: 'medium',   pathogen: 'MERS-CoV-2',       reported: '150K cases' },
  { city: 'mos',  severity: 'low',      pathogen: 'RSV Wave',          reported: '800K cases' },
  { city: 'nyc',  severity: 'low',      pathogen: 'Influenza A',       reported: '1.1M cases' },
  { city: 'mex',  severity: 'medium',   pathogen: 'Zika Resurgence',   reported: '95K cases'  },
  { city: 'bue',  severity: 'low',      pathogen: 'Leptospirosis',     reported: '32K cases'  },
];

// ── Spread arcs (active transmission routes, animated) ──────────────────
export const SPREAD_ROUTES = [
  { from: 'sha', to: 'tky',  color: '#ff3860', speed: 0.8  },
  { from: 'sha', to: 'nyc',  color: '#ff3860', speed: 0.5  },
  { from: 'del', to: 'dub',  color: '#ff6600', speed: 0.7  },
  { from: 'del', to: 'lon',  color: '#ff6600', speed: 0.55 },
  { from: 'lag', to: 'par',  color: '#ff3860', speed: 0.65 },
  { from: 'lag', to: 'nyc',  color: '#ff3860', speed: 0.6  },
  { from: 'jkt', to: 'sin',  color: '#ff6600', speed: 0.9  },
  { from: 'cai', to: 'mos',  color: '#ff6600', speed: 0.6  },
];

/** Build a route as 3D arc points between two city keys */
export function buildArcPoints(fromKey, toKey, radius = 2.05, segments = 48, arcHeight = 0.4) {
  const a = CITIES[fromKey];
  const b = CITIES[toKey];
  if (!a || !b) return [];

  const [ax, ay, az] = latLonToVec3(a.lat, a.lon, radius);
  const [bx, by, bz] = latLonToVec3(b.lat, b.lon, radius);

  const points = [];
  for (let i = 0; i <= segments; i++) {
    const t  = i / segments;
    // Spherical lerp
    const px = ax + (bx - ax) * t;
    const py = ay + (by - ay) * t;
    const pz = az + (bz - az) * t;
    // Lift above surface
    const len  = Math.sqrt(px*px + py*py + pz*pz);
    const lift = radius + arcHeight * Math.sin(t * Math.PI);
    points.push([px/len*lift, py/len*lift, pz/len*lift]);
  }
  return points;
}
