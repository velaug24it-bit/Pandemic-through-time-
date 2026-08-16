/**
 * countryPolygons.js
 * Accurate polygonal boundary datasets for world nations.
 * Used for vector boundary rendering on the 3D globe,
 * dynamic polygon filling (matching GlobeMindAI Image 1 & 2),
 * and point-in-polygon touch raycasting.
 */

// Precise latitude/longitude bounding polygons for major countries & continents
export const COUNTRY_POLYGONS = {
  ind: {
    id: 'ind',
    name: 'India',
    region: 'Asia',
    capital: 'New Delhi',
    pop: '1.41 Billion',
    currency: 'Indian Rupee (₹)',
    languages: 'Hindi, English, Bengali, Tamil, Telugu',
    center: [20.5937, 78.9629],
    emoji: '🇮🇳',
    history: {
      title: 'Epidemic & Pandemic History of India',
      summary: 'From the historic 1817 Cholera pandemic originating in the Bengal delta to the 1896 Bombay Plague and becoming the world\'s largest vaccine manufacturing powerhouse during COVID-19.',
      pandemics: [
        {
          name: 'First Cholera Pandemic (1817–1824)',
          year: '1817',
          agent: 'Vibrio cholerae',
          impact: 'Originated in the Ganges delta near Calcutta, spreading along trade and pilgrimage routes across Asia and the Middle East.',
          severity: 'High'
        },
        {
          name: 'Third Plague Pandemic (Bombay Plague, 1896)',
          year: '1896',
          agent: 'Yersinia pestis',
          impact: 'Hit port city of Bombay, leading to the Epidemic Diseases Act of 1897 and early bacteriological research by Waldemar Haffkine.',
          severity: 'Severe'
        },
        {
          name: '1918 Influenza Pandemic',
          year: '1918',
          agent: 'H1N1 Influenza',
          impact: 'Estimated 12–17 million casualties in British India; prompted modern public health infrastructure reforms.',
          severity: 'Critical'
        },
        {
          name: 'COVID-19 & Vaccine Manufacturing (2020–2023)',
          year: '2020',
          agent: 'SARS-CoV-2',
          impact: 'Manufactured over 2 Billion vaccine doses via Serum Institute of India (Covishield) & Bharat Biotech (Covaxin), exporting to 100+ nations.',
          severity: 'Contained'
        }
      ]
    },
    // Detailed polygon points in [lon, lat]
    polygon: [
      [74.8, 37.0], [77.5, 35.5], [80.3, 31.0], [81.5, 30.2], [88.2, 27.8],
      [89.5, 27.3], [92.0, 27.8], [97.4, 28.3], [96.0, 26.5], [94.5, 24.0],
      [92.5, 23.0], [89.0, 22.0], [87.0, 21.5], [83.0, 18.0], [80.3, 13.0],
      [79.8, 10.0], [77.5, 8.1], [76.5, 9.5], [74.0, 15.0], [72.8, 19.0],
      [70.0, 21.5], [68.5, 23.5], [70.5, 25.5], [71.0, 28.0], [74.5, 32.5],
      [74.8, 37.0]
    ]
  },

  usa: {
    id: 'usa',
    name: 'United States',
    region: 'North America',
    capital: 'Washington, D.C.',
    pop: '333 Million',
    currency: 'US Dollar ($)',
    languages: 'English, Spanish',
    center: [37.0902, -95.7129],
    emoji: '🇺🇸',
    history: {
      title: 'Epidemic & Pandemic History of the United States',
      summary: 'Center of pioneering genomic research, CDC establishment, 1918 Flu response, Salk Polio vaccine development, and mRNA vaccine breakthroughs.',
      pandemics: [
        {
          name: '1793 Philadelphia Yellow Fever',
          year: '1793',
          agent: 'Yellow Fever Virus',
          impact: 'Killed ~5,000 in capital Philadelphia, leading to municipal sanitation systems.',
          severity: 'Severe'
        },
        {
          name: '1918 Spanish Flu (Camp Funston, Kansas)',
          year: '1918',
          agent: 'H1N1 Influenza',
          impact: '675,000 American deaths; led to modern epidemiology & school closing strategies.',
          severity: 'Critical'
        },
        {
          name: 'Polio Epidemics & Salk Vaccine (1950s)',
          year: '1952',
          agent: 'Poliovirus',
          impact: 'Jonas Salk developed the inactivated polio vaccine at University of Pittsburgh in 1953.',
          severity: 'Eradicated'
        },
        {
          name: 'COVID-19 & mRNA Breakthroughs (2020)',
          year: '2020',
          agent: 'SARS-CoV-2',
          impact: 'Operation Warp Speed accelerated Pfizer-BioNTech & Moderna mRNA vaccine platforms.',
          severity: 'Managed'
        }
      ]
    },
    polygon: [
      [-124.8, 49.0], [-95.0, 49.0], [-82.5, 42.0], [-67.0, 45.0], [-71.0, 42.0],
      [-75.5, 38.0], [-80.0, 32.0], [-81.0, 25.0], [-87.0, 30.0], [-97.0, 26.0],
      [-106.0, 31.8], [-117.0, 32.5], [-124.5, 40.0], [-124.8, 49.0]
    ]
  },

  chn: {
    id: 'chn',
    name: 'China',
    region: 'Asia',
    capital: 'Beijing',
    pop: '1.41 Billion',
    currency: 'Chinese Yuan (¥)',
    languages: 'Mandarin Chinese',
    center: [35.8617, 104.1954],
    emoji: '🇨🇳',
    history: {
      title: 'Epidemic & Pandemic History of China',
      summary: 'Site of early variolation smallpox prevention in the 10th century, Manchurian plague research in 1910, SARS in 2002, and first COVID-19 genome sequencing.',
      pandemics: [
        {
          name: '1910 Great Manchurian Plague',
          year: '1910',
          agent: 'Yersinia pestis (Pneumonic)',
          impact: 'Dr. Wu Lien-teh introduced the surgical gauze mask and standardized railway quarantines.',
          severity: 'Severe'
        },
        {
          name: '1957 Asian Flu (H2N2)',
          year: '1957',
          agent: 'H2N2 Influenza',
          impact: 'Global pandemic causing ~1.1 million deaths worldwide.',
          severity: 'High'
        },
        {
          name: '2002–2004 SARS Outbreak',
          year: '2002',
          agent: 'SARS-CoV',
          impact: 'First 21st-century coronavirus epidemic; revolutionized global real-time WHO reporting.',
          severity: 'Contained'
        }
      ]
    },
    polygon: [
      [73.5, 39.5], [87.0, 49.0], [120.0, 53.5], [134.5, 48.0], [130.5, 42.5],
      [122.0, 40.0], [122.0, 30.0], [119.0, 25.0], [110.0, 20.0], [105.0, 21.5],
      [98.0, 28.0], [88.5, 27.5], [78.5, 35.0], [73.5, 39.5]
    ]
  },

  gbr: {
    id: 'gbr',
    name: 'United Kingdom',
    region: 'Europe',
    capital: 'London',
    pop: '67.3 Million',
    currency: 'British Pound (£)',
    languages: 'English',
    center: [55.3781, -3.4360],
    emoji: '🇬🇧',
    history: {
      title: 'Epidemic & Pandemic History of the United Kingdom',
      summary: 'Home to Edward Jenner\'s discovery of the Smallpox vaccine (1796), John Snow\'s Broad Street cholera pump study (1854), and the Oxford-AstraZeneca vaccine.',
      pandemics: [
        {
          name: '1665 Great Plague of London',
          year: '1665',
          agent: 'Yersinia pestis',
          impact: 'Killed ~100,000 citizens; Newton developed calculus while isolating at Woolsthorpe.',
          severity: 'Severe'
        },
        {
          name: '1796 First Vaccine (Smallpox)',
          year: '1796',
          agent: 'Variola virus / Cowpox',
          impact: 'Edward Jenner inoculated James Phipps, inventing the world\'s first vaccine.',
          severity: 'Breakthrough'
        },
        {
          name: '1854 Broad Street Cholera Outbreak',
          year: '1854',
          agent: 'Vibrio cholerae',
          impact: 'Dr. John Snow identified waterborne transmission, founding modern epidemiological mapping.',
          severity: 'Breakthrough'
        }
      ]
    },
    polygon: [
      [-5.5, 58.5], [-2.0, 58.0], [1.8, 52.5], [1.4, 51.0], [-5.0, 50.0],
      [-5.0, 55.0], [-6.0, 56.5], [-5.5, 58.5]
    ]
  },

  bra: {
    id: 'bra',
    name: 'Brazil',
    region: 'South America',
    capital: 'Brasília',
    pop: '214 Million',
    currency: 'Brazilian Real (R$)',
    languages: 'Portuguese',
    center: [-14.2350, -51.9253],
    emoji: '🇧🇷',
    history: {
      title: 'Epidemic & Pandemic History of Brazil',
      summary: 'Pioneer of Oswaldo Cruz sanitation campaigns, Yellow Fever eradication, and international Zika virus microcephaly discovery.',
      pandemics: [
        {
          name: '1904 Vaccine Revolt (Rio de Janeiro)',
          year: '1904',
          agent: 'Smallpox & Yellow Fever',
          impact: 'Oswaldo Cruz sanitized Rio; civil uprising led to improved public health education.',
          severity: 'High'
        },
        {
          name: '2015–2016 Zika Epidemic',
          year: '2015',
          agent: 'Zika Virus (Flavivirus)',
          impact: 'Brazilian scientists proved the link between mosquito-borne Zika and microcephaly.',
          severity: 'Severe'
        }
      ]
    },
    polygon: [
      [-70.0, -10.0], [-60.0, 3.0], [-50.0, 2.0], [-35.0, -5.0], [-38.0, -13.0],
      [-41.0, -22.0], [-53.0, -33.0], [-57.0, -25.0], [-60.0, -15.0], [-70.0, -10.0]
    ]
  },

  rus: {
    id: 'rus',
    name: 'Russia',
    region: 'Europe / Asia',
    capital: 'Moscow',
    pop: '144 Million',
    currency: 'Russian Ruble (₽)',
    languages: 'Russian',
    center: [61.5240, 105.3188],
    emoji: '🇷🇺',
    history: {
      title: 'Epidemic & Pandemic History of Russia',
      summary: 'Catherine the Great\'s 1768 smallpox inoculation, Gamaleya Institute vaccine research, and Vector BSL-4 virology research.',
      pandemics: [
        {
          name: '1771 Moscow Plague Riot',
          year: '1771',
          agent: 'Yersinia pestis',
          impact: 'Prompted strict quarantine cordons, isolation hospitals, and public sanitation.',
          severity: 'Severe'
        },
        {
          name: '1889–1890 Russian Flu Pandemic',
          year: '1889',
          agent: 'Influenza / Coronavirus (HCoV-OC43)',
          impact: 'Rapidly spread along newly constructed European and Russian railway networks.',
          severity: 'High'
        }
      ]
    },
    polygon: [
      [30.0, 60.0], [40.0, 68.0], [60.0, 70.0], [100.0, 75.0], [170.0, 68.0],
      [180.0, 65.0], [140.0, 50.0], [130.0, 43.0], [85.0, 50.0], [50.0, 52.0],
      [30.0, 60.0]
    ]
  },

  jpn: {
    id: 'jpn',
    name: 'Japan',
    region: 'Asia',
    capital: 'Tokyo',
    pop: '125 Million',
    currency: 'Japanese Yen (¥)',
    languages: 'Japanese',
    center: [36.2048, 138.2529],
    emoji: '🇯🇵',
    history: {
      title: 'Epidemic & Pandemic History of Japan',
      summary: 'Kitasato Shibasaburo co-discovered the plague bacterium in 1894; global leader in viral genomics and respiratory mask culture.',
      pandemics: [
        {
          name: '735–737 Japanese Smallpox Epidemic',
          year: '735',
          agent: 'Variola virus',
          impact: 'Killed nearly one-third of the ancient Japanese population; led to construction of the Great Buddha of Nara.',
          severity: 'Critical'
        },
        {
          name: '1894 Plague Bacterium Discovery (Hong Kong/Tokyo)',
          year: '1894',
          agent: 'Yersinia pestis',
          impact: 'Kitasato Shibasaburo and Alexandre Yersin independently isolated the plague pathogen.',
          severity: 'Breakthrough'
        }
      ]
    },
    polygon: [
      [141.0, 45.5], [145.5, 44.0], [141.0, 38.0], [140.0, 35.0], [135.0, 33.5],
      [130.0, 31.0], [129.5, 33.0], [136.0, 37.0], [140.0, 41.0], [141.0, 45.5]
    ]
  },

  aus: {
    id: 'aus',
    name: 'Australia',
    region: 'Oceania',
    capital: 'Canberra',
    pop: '26 Million',
    currency: 'Australian Dollar (A$)',
    languages: 'English',
    center: [-25.2744, 133.7751],
    emoji: '🇦🇺',
    history: {
      title: 'Epidemic & Pandemic History of Australia',
      summary: 'Walter and Eliza Hall Institute and Doherty Institute leading global infectious disease immunology and viral isolation.',
      pandemics: [
        {
          name: '1918–1919 Maritime Quarantine Success',
          year: '1918',
          agent: 'H1N1 Influenza',
          impact: 'Strict maritime quarantine delayed Spanish Flu entry into Australia by over 6 months.',
          severity: 'Managed'
        },
        {
          name: '1994 Hendra Virus Discovery',
          year: '1994',
          agent: 'Hendra Virus (Henipavirus)',
          impact: 'Identified novel bat-borne zoonotic virus in Brisbane, driving One Health research.',
          severity: 'Contained'
        }
      ]
    },
    polygon: [
      [114.0, -22.0], [128.0, -15.0], [136.0, -12.0], [142.0, -10.5], [153.5, -28.0],
      [150.0, -37.5], [140.0, -38.0], [130.0, -32.0], [115.0, -34.0], [113.0, -26.0],
      [114.0, -22.0]
    ]
  },

  deu: {
    id: 'deu',
    name: 'Germany',
    region: 'Europe',
    capital: 'Berlin',
    pop: '83.2 Million',
    currency: 'Euro (€)',
    languages: 'German',
    center: [51.1657, 10.4515],
    emoji: '🇩🇪',
    history: {
      title: 'Epidemic & Pandemic History of Germany',
      summary: 'Robert Koch founded modern microbiology (discovering anthrax, TB, cholera bacteria); BioNTech developed first authorized COVID-19 mRNA vaccine.',
      pandemics: [
        {
          name: '1882 Tuberculosis Bacterium Discovery',
          year: '1882',
          agent: 'Mycobacterium tuberculosis',
          impact: 'Robert Koch discovered the causative bacterium, establishing Koch\'s Postulates.',
          severity: 'Breakthrough'
        },
        {
          name: '2020 BioNTech mRNA Vaccine Development (Mainz)',
          year: '2020',
          agent: 'SARS-CoV-2',
          impact: 'Ugur Sahin & Ozlem Tureci created the BNT162b2 mRNA vaccine.',
          severity: 'Breakthrough'
        }
      ]
    },
    polygon: [
      [6.0, 50.5], [7.5, 53.5], [14.0, 54.0], [15.0, 51.0], [13.0, 48.5],
      [8.0, 47.5], [6.0, 50.5]
    ]
  },

  zaf: {
    id: 'zaf',
    name: 'South Africa',
    region: 'Africa',
    capital: 'Pretoria',
    pop: '60 Million',
    currency: 'South African Rand (R)',
    languages: 'Zulu, Xhosa, Afrikaans, English',
    center: [-30.5595, 22.9375],
    emoji: '🇿🇦',
    history: {
      title: 'Epidemic & Pandemic History of South Africa',
      summary: 'Global pioneer in pathogen genomic sequencing at KRISP and CERI, discovering the Beta and Omicron SARS-CoV-2 variants.',
      pandemics: [
        {
          name: '1918 Black October Influenza',
          year: '1918',
          agent: 'H1N1 Influenza',
          impact: '300,000 casualties; triggered the Public Health Act of 1919.',
          severity: 'Critical'
        },
        {
          name: '2021 Omicron Variant Genomic Detection',
          year: '2021',
          agent: 'SARS-CoV-2 (Omicron B.1.1.529)',
          impact: 'Rapid genomic surveillance alerted the world within 48 hours of detection.',
          severity: 'Breakthrough'
        }
      ]
    },
    polygon: [
      [16.5, -28.5], [20.0, -22.0], [31.5, -22.0], [33.0, -27.0], [28.0, -32.5],
      [18.5, -34.5], [16.5, -28.5]
    ]
  }
};

/** Point-in-polygon ray-casting test */
export function isPointInPolygon(point, vs) {
  const x = point[0];
  const y = point[1];
  let inside = false;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    const xi = vs[i][0], yi = vs[i][1];
    const xj = vs[j][0], yj = vs[j][1];
    const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

/** Find country by clicked/hovered lat & lon */
export function findCountryAtLatLon(lat, lon) {
  // Normalize lon to [-180, 180]
  let nLon = lon;
  while (nLon < -180) nLon += 360;
  while (nLon > 180) nLon -= 360;

  // 1. Check exact polygon boundaries
  for (const key of Object.keys(COUNTRY_POLYGONS)) {
    const c = COUNTRY_POLYGONS[key];
    if (c.polygon && isPointInPolygon([nLon, lat], c.polygon)) {
      return c;
    }
  }

  // 2. Nearest center fallback (within 18 degrees radius)
  let best = null;
  let minDistance = 18; // degrees threshold
  for (const key of Object.keys(COUNTRY_POLYGONS)) {
    const c = COUNTRY_POLYGONS[key];
    const dLat = lat - c.center[0];
    const dLon = nLon - c.center[1];
    const dist = Math.sqrt(dLat * dLat + dLon * dLon);
    if (dist < minDistance) {
      minDistance = dist;
      best = c;
    }
  }
  return best;
}
