/**
 * countries.js
 * Mock dataset: 50 major countries with lat/lon centers,
 * population, region, pandemic risk, and future data hooks.
 *
 * lat/lon are used to position markers on the 3D globe via
 * spherical coordinate conversion.
 */

export const COUNTRIES = [
  // ── North America ──
  { id: 'usa',    name: 'United States',   lat: 37.09,  lon: -95.71, pop: '331M',  region: 'North America',   risk: 'medium',   emoji: '🇺🇸' },
  { id: 'can',    name: 'Canada',          lat: 56.13,  lon: -106.35,pop: '38M',   region: 'North America',   risk: 'low',      emoji: '🇨🇦' },
  { id: 'mex',    name: 'Mexico',          lat: 23.63,  lon: -102.55,pop: '129M',  region: 'North America',   risk: 'medium',   emoji: '🇲🇽' },

  // ── South America ──
  { id: 'bra',    name: 'Brazil',          lat: -14.24, lon: -51.93, pop: '213M',  region: 'South America',   risk: 'high',     emoji: '🇧🇷' },
  { id: 'arg',    name: 'Argentina',       lat: -38.42, lon: -63.62, pop: '45M',   region: 'South America',   risk: 'medium',   emoji: '🇦🇷' },
  { id: 'col',    name: 'Colombia',        lat: 4.57,   lon: -74.30, pop: '50M',   region: 'South America',   risk: 'medium',   emoji: '🇨🇴' },
  { id: 'per',    name: 'Peru',            lat: -9.19,  lon: -75.02, pop: '33M',   region: 'South America',   risk: 'high',     emoji: '🇵🇪' },

  // ── Europe ──
  { id: 'gbr',    name: 'United Kingdom',  lat: 55.38,  lon: -3.44,  pop: '68M',   region: 'Europe',          risk: 'low',      emoji: '🇬🇧' },
  { id: 'fra',    name: 'France',          lat: 46.23,  lon: 2.21,   pop: '67M',   region: 'Europe',          risk: 'low',      emoji: '🇫🇷' },
  { id: 'deu',    name: 'Germany',         lat: 51.17,  lon: 10.45,  pop: '83M',   region: 'Europe',          risk: 'low',      emoji: '🇩🇪' },
  { id: 'ita',    name: 'Italy',           lat: 41.87,  lon: 12.57,  pop: '60M',   region: 'Europe',          risk: 'low',      emoji: '🇮🇹' },
  { id: 'esp',    name: 'Spain',           lat: 40.46,  lon: -3.75,  pop: '47M',   region: 'Europe',          risk: 'low',      emoji: '🇪🇸' },
  { id: 'rus',    name: 'Russia',          lat: 61.52,  lon: 105.32, pop: '144M',  region: 'Europe/Asia',     risk: 'medium',   emoji: '🇷🇺' },
  { id: 'ukr',    name: 'Ukraine',         lat: 48.38,  lon: 31.17,  pop: '44M',   region: 'Europe',          risk: 'medium',   emoji: '🇺🇦' },
  { id: 'pol',    name: 'Poland',          lat: 51.92,  lon: 19.14,  pop: '38M',   region: 'Europe',          risk: 'low',      emoji: '🇵🇱' },
  { id: 'nld',    name: 'Netherlands',     lat: 52.13,  lon: 5.29,   pop: '17M',   region: 'Europe',          risk: 'low',      emoji: '🇳🇱' },
  { id: 'swe',    name: 'Sweden',          lat: 60.13,  lon: 18.64,  pop: '10M',   region: 'Europe',          risk: 'low',      emoji: '🇸🇪' },

  // ── Africa ──
  { id: 'nga',    name: 'Nigeria',         lat: 9.08,   lon: 8.68,   pop: '211M',  region: 'Africa',          risk: 'high',     emoji: '🇳🇬' },
  { id: 'zaf',    name: 'South Africa',    lat: -30.56, lon: 22.94,  pop: '60M',   region: 'Africa',          risk: 'high',     emoji: '🇿🇦' },
  { id: 'egy',    name: 'Egypt',           lat: 26.82,  lon: 30.80,  pop: '102M',  region: 'Africa',          risk: 'medium',   emoji: '🇪🇬' },
  { id: 'eth',    name: 'Ethiopia',        lat: 9.14,   lon: 40.49,  pop: '117M',  region: 'Africa',          risk: 'critical', emoji: '🇪🇹' },
  { id: 'cod',    name: 'DR Congo',        lat: -4.04,  lon: 21.76,  pop: '90M',   region: 'Africa',          risk: 'critical', emoji: '🇨🇩' },
  { id: 'ken',    name: 'Kenya',           lat: -0.02,  lon: 37.91,  pop: '54M',   region: 'Africa',          risk: 'high',     emoji: '🇰🇪' },

  // ── Middle East ──
  { id: 'sau',    name: 'Saudi Arabia',    lat: 23.89,  lon: 45.08,  pop: '35M',   region: 'Middle East',     risk: 'medium',   emoji: '🇸🇦' },
  { id: 'tur',    name: 'Turkey',          lat: 38.96,  lon: 35.24,  pop: '84M',   region: 'Middle East',     risk: 'medium',   emoji: '🇹🇷' },
  { id: 'irn',    name: 'Iran',            lat: 32.43,  lon: 53.69,  pop: '84M',   region: 'Middle East',     risk: 'high',     emoji: '🇮🇷' },
  { id: 'irq',    name: 'Iraq',            lat: 33.22,  lon: 43.68,  pop: '40M',   region: 'Middle East',     risk: 'high',     emoji: '🇮🇶' },

  // ── Asia ──
  { id: 'chn',    name: 'China',           lat: 35.86,  lon: 104.20, pop: '1.4B',  region: 'Asia',            risk: 'medium',   emoji: '🇨🇳' },
  { id: 'ind',    name: 'India',           lat: 20.59,  lon: 78.96,  pop: '1.4B',  region: 'Asia',            risk: 'high',     emoji: '🇮🇳' },
  { id: 'jpn',    name: 'Japan',           lat: 36.20,  lon: 138.25, pop: '125M',  region: 'Asia',            risk: 'low',      emoji: '🇯🇵' },
  { id: 'kor',    name: 'South Korea',     lat: 35.91,  lon: 127.77, pop: '52M',   region: 'Asia',            risk: 'low',      emoji: '🇰🇷' },
  { id: 'pak',    name: 'Pakistan',        lat: 30.38,  lon: 69.35,  pop: '220M',  region: 'Asia',            risk: 'high',     emoji: '🇵🇰' },
  { id: 'bgd',    name: 'Bangladesh',      lat: 23.68,  lon: 90.36,  pop: '165M',  region: 'Asia',            risk: 'high',     emoji: '🇧🇩' },
  { id: 'idn',    name: 'Indonesia',       lat: -0.79,  lon: 113.92, pop: '274M',  region: 'Asia',            risk: 'high',     emoji: '🇮🇩' },
  { id: 'tha',    name: 'Thailand',        lat: 15.87,  lon: 100.99, pop: '70M',   region: 'Asia',            risk: 'medium',   emoji: '🇹🇭' },
  { id: 'vnm',    name: 'Vietnam',         lat: 14.06,  lon: 108.28, pop: '97M',   region: 'Asia',            risk: 'medium',   emoji: '🇻🇳' },
  { id: 'phl',    name: 'Philippines',     lat: 12.88,  lon: 121.77, pop: '110M',  region: 'Asia',            risk: 'medium',   emoji: '🇵🇭' },
  { id: 'mys',    name: 'Malaysia',        lat: 4.21,   lon: 108.96, pop: '32M',   region: 'Asia',            risk: 'medium',   emoji: '🇲🇾' },
  { id: 'mmr',    name: 'Myanmar',         lat: 17.11,  lon: 96.96,  pop: '54M',   region: 'Asia',            risk: 'critical', emoji: '🇲🇲' },
  { id: 'kaz',    name: 'Kazakhstan',      lat: 48.02,  lon: 66.92,  pop: '19M',   region: 'Asia',            risk: 'low',      emoji: '🇰🇿' },
  { id: 'uzb',    name: 'Uzbekistan',      lat: 41.38,  lon: 64.59,  pop: '34M',   region: 'Asia',            risk: 'medium',   emoji: '🇺🇿' },

  // ── Oceania ──
  { id: 'aus',    name: 'Australia',       lat: -25.27, lon: 133.78, pop: '26M',   region: 'Oceania',         risk: 'low',      emoji: '🇦🇺' },
  { id: 'nzl',    name: 'New Zealand',     lat: -40.90, lon: 174.89, pop: '5M',    region: 'Oceania',         risk: 'low',      emoji: '🇳🇿' },
];

/** Risk level colors */
export const RISK_COLORS = {
  low:      '#00ff9d',
  medium:   '#ffb700',
  high:     '#ff6600',
  critical: '#ff3860',
};

/** Convert lat/lon to 3D cartesian coordinates on sphere of given radius */
export function latLonToVec3(lat, lon, radius = 2) {
  const phi   = (90 - lat)  * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return [
    -(radius * Math.sin(phi) * Math.cos(theta)),
     (radius * Math.cos(phi)),
     (radius * Math.sin(phi) * Math.sin(theta)),
  ];
}
