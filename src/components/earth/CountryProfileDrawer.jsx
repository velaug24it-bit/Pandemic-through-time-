/**
 * CountryProfileDrawer.jsx
 * Modern Country Glass Card matching Image 2.
 * Displays:
 *  - Country Flag, Name, Region/Continent
 *  - Capital City, Population, Currency, Official Languages
 *  - Healthcare Index & Preparedness Indicators
 *  - Primary Action Button: "🔬 EXPLORE PANDEMICS & NATION HISTORY ▶"
 */
import { motion, AnimatePresence } from 'framer-motion';
import { COUNTRY_POLYGONS } from '../../data/countryPolygons';
import { RISK_COLORS } from '../../data/countries';

export default function CountryProfileDrawer({ country, onClose, onOpenNationHistory }) {
  if (!country) return null;

  const polygonData = COUNTRY_POLYGONS[country.id] || country;
  const capital = polygonData.capital || 'Capital Hub';
  const pop = polygonData.pop || country.pop || '100M';
  const currency = polygonData.currency || 'National Currency';
  const languages = polygonData.languages || 'Official Language';
  const riskColor = RISK_COLORS[country.risk] || '#c084fc';

  return (
    <AnimatePresence>
      <motion.div
        className="mobile-bottom-sheet"
        initial={{ opacity: 0, x: 340, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 340, scale: 0.95 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 64,
          right: 20,
          width: 'clamp(300px, 26vw, 360px)',
          zIndex: 650,
          background: 'rgba(3, 10, 26, 0.92)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(192, 132, 252, 0.5)',
          borderRadius: 16,
          padding: '1.2rem',
          boxShadow: '0 8px 40px rgba(0, 0, 0, 0.7), 0 0 30px rgba(192, 132, 252, 0.25)',
          color: '#ffffff',
          maxHeight: 'calc(100vh - 90px)',
          overflowY: 'auto',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            borderRadius: '50%',
            width: 26,
            height: 26,
            color: '#fff',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ✕
        </button>

        {/* Country Header (Matching Image 2) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '2rem', filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.4))' }}>
            {country.emoji}
          </span>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '0.05em'
            }}>
              {country.name}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5rem',
              color: '#c084fc',
              marginTop: 2,
              fontWeight: 600,
            }}>
              {country.region || polygonData.region} · LAT: {country.lat?.toFixed(1) || country.center?.[0]}° | LON: {country.lon?.toFixed(1) || country.center?.[1]}°
            </div>
          </div>
        </div>

        {/* Data Rows (Matching Image 2 Style) */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 10,
          padding: '0.6rem 0.8rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          marginBottom: '1rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', color: 'rgba(255,255,255,0.5)' }}>
              🏛️ Capital
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', fontWeight: 800, color: '#ffffff' }}>
              {capital}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', color: 'rgba(255,255,255,0.5)' }}>
              👥 Population
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', fontWeight: 800, color: '#38bdf8' }}>
              {pop}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', color: 'rgba(255,255,255,0.5)' }}>
              💵 Currency
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', fontWeight: 800, color: '#00ff9d' }}>
              {currency}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', color: 'rgba(255,255,255,0.5)' }}>
              🗣️ Languages
            </span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 600, color: '#f3e8ff', textAlign: 'right' }}>
              {languages}
            </span>
          </div>
        </div>

        {/* Primary Action Button (Matching Image 2 Glowing Button) */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onOpenNationHistory?.(country)}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #7b2ff7, #c084fc)',
            border: '1px solid #f3e8ff',
            borderRadius: 10,
            padding: '0.65rem 0.8rem',
            color: '#ffffff',
            fontFamily: 'var(--font-display)',
            fontSize: '0.65rem',
            fontWeight: 900,
            letterSpacing: '0.1em',
            cursor: 'pointer',
            boxShadow: '0 0 25px rgba(192, 132, 252, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
          }}
        >
          <span>🔬 EXPLORE PANDEMICS & HISTORY</span>
          <span>▶</span>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}
