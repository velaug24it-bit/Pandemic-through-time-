/**
 * NewsTickerPanel.jsx
 * Dynamic WHO Live News Feed for Phase 6.
 * Generates live news bulletins as simulation days progress or policies are enacted:
 *  - "WHO Issues Global Level 4 Emergency Alert"
 *  - "Hospitals in Epicenter Reaching Capacity"
 *  - "Mass Vaccine Distribution Initiated Across 40 Nations"
 */
import { motion, AnimatePresence } from 'framer-motion';

export default function NewsTickerPanel({ day = 1, icuOccupancy = 0 }) {
  const getLatestHeadlines = () => {
    const headlines = [
      `DAY ${day}: WHO Emergency Operations Center activated under International Health Regulations.`,
    ];

    if (icuOccupancy > 60) {
      headlines.unshift(`DAY ${day}: ALERT — Regional hospital ICU strain exceeds ${icuOccupancy}%. Emergency triage activated.`);
    }
    if (day > 30) {
      headlines.unshift(`DAY ${day}: Global scientific consortium sequences new genetic mutations in active strain.`);
    }
    if (day > 60) {
      headlines.unshift(`DAY ${day}: Mass vaccination campaign reaching global distribution hubs.`);
    }

    return headlines.slice(0, 3);
  };

  const headlines = getLatestHeadlines();

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      style={{
        position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)',
        zIndex: 600, width: 'clamp(320px, 90vw, 820px)',
        background: 'rgba(2,10,25,0.92)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,183,0,0.3)', borderRadius: 12, padding: '0.6rem 1rem',
        boxShadow: '0 0 24px rgba(255,183,0,0.15)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: 4 }}>
        <span style={{ fontSize: '0.8rem', color: '#ffb700' }}>📡</span>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: '#ffb700', letterSpacing: '0.15em', fontWeight: 700 }}>
          WHO LIVE GLOBAL NEWS FEED
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
        {headlines.map((h, i) => (
          <div key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: i === 0 ? '#fff' : 'rgba(255,255,255,0.5)', fontWeight: i === 0 ? 600 : 400 }}>
            {h}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
