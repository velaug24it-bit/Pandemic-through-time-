/**
 * PersonalDashboardModal.jsx
 * Personal Dashboard & Local Leaderboard Modal for Phase 8 (Module 8).
 * Displays stats for Missions Completed, Total Score, Accuracy %, Achievements Showcase, and Local Leaderboard.
 */
import { motion, AnimatePresence } from 'framer-motion';
import { CHALLENGE_ACHIEVEMENTS } from '../../utils/constants';

const LEADERBOARD_LOCAL = [
  { rank: 1, name: 'Commander Director (You)', score: 980, accuracy: '98%', status: 'PLATINUM' },
  { rank: 2, name: 'Dr. Sarah Lin (WHO)',     score: 940, accuracy: '95%', status: 'GOLD' },
  { rank: 3, name: 'Dr. Marcus Vance (CDC)',  score: 910, accuracy: '92%', status: 'GOLD' },
  { rank: 4, name: 'Elena Rostova (ECDC)',    score: 870, accuracy: '88%', status: 'SILVER' },
  { rank: 5, name: 'Kenji Sato (NIID)',       score: 840, accuracy: '85%', status: 'SILVER' },
];

export default function PersonalDashboardModal({
  visible,
  userName = 'Commander Director',
  onUpdateUserName,
  completedCount = 0,
  totalScore = 980,
  quizAccuracy = 95,
  onClose,
}) {
  if (!visible) return null;

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 940,
        background: 'rgba(0,4,12,0.85)', backdropFilter: 'blur(16px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          style={{
            width: '100%', maxWidth: '720px',
            background: 'rgba(2,10,25,0.96)', border: '1px solid rgba(0,200,255,0.4)',
            borderRadius: 16, padding: '1.5rem', boxShadow: '0 0 40px rgba(0,200,255,0.3)',
            color: '#fff', position: 'relative', maxHeight: '88vh', overflowY: 'auto',
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 14, right: 14, background: 'rgba(255,255,255,0.1)',
              border: 'none', borderRadius: '50%', width: 28, height: 28, color: '#fff',
              cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.9rem',
            }}
          >
            ✕
          </button>

          {/* Header */}
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#00c8ff', letterSpacing: '0.2em' }}>
            GLOBAL HEALTH COMMANDER PROFILE
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', margin: '4px 0 1rem' }}>
            <span style={{ fontSize: '1.6rem' }}>👤</span>
            <input
              type="text"
              value={userName}
              onChange={(e) => onUpdateUserName?.(e.target.value)}
              style={{
                background: 'rgba(0,12,28,0.9)', border: '1px solid #00c8ff', borderRadius: 8,
                padding: '0.35rem 0.8rem', color: '#fff', fontFamily: 'var(--font-display)', fontSize: '1.2rem',
                fontWeight: 800, width: '100%', maxWidth: '320px',
              }}
            />
          </div>

          {/* Key Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.2rem' }}>
            <div style={{ background: 'rgba(0,255,157,0.06)', border: '1px solid rgba(0,255,157,0.2)', borderRadius: 8, padding: '0.6rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: 'rgba(255,255,255,0.5)' }}>MISSIONS CLEARED</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: '#00ff9d', marginTop: 2 }}>
                {completedCount} / 7
              </div>
            </div>

            <div style={{ background: 'rgba(0,200,255,0.06)', border: '1px solid rgba(0,200,255,0.2)', borderRadius: 8, padding: '0.6rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: 'rgba(255,255,255,0.5)' }}>TOTAL SCORE</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: '#00c8ff', marginTop: 2 }}>
                {totalScore} PTS
              </div>
            </div>

            <div style={{ background: 'rgba(123,47,247,0.06)', border: '1px solid rgba(123,47,247,0.2)', borderRadius: 8, padding: '0.6rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: 'rgba(255,255,255,0.5)' }}>QUIZ ACCURACY</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: '#7b2ff7', marginTop: 2 }}>
                {quizAccuracy}%
              </div>
            </div>

            <div style={{ background: 'rgba(255,183,0,0.06)', border: '1px solid rgba(255,183,0,0.2)', borderRadius: 8, padding: '0.6rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: 'rgba(255,255,255,0.5)' }}>BADGES UNLOCKED</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: '#ffb700', marginTop: 2 }}>
                5 / 5
              </div>
            </div>
          </div>

          {/* Achievements Showcase (Module 7) */}
          <div style={{ background: 'rgba(0,200,255,0.03)', border: '1px solid rgba(0,200,255,0.15)', borderRadius: 10, padding: '0.8rem', marginBottom: '1.2rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: '#00c8ff', letterSpacing: '0.15em', marginBottom: '0.6rem' }}>
              🏆 ACHIEVEMENTS SHOWCASE (5 BADGES)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.4rem' }}>
              {CHALLENGE_ACHIEVEMENTS.map(a => (
                <div key={a.id} style={{ background: 'rgba(0,255,157,0.08)', border: '1px solid rgba(0,255,157,0.2)', borderRadius: 8, padding: '0.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.4rem' }}>{a.icon}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: '#00ff9d', fontWeight: 700, marginTop: 4 }}>{a.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Local Leaderboard Table (Module 1) */}
          <div style={{ background: 'rgba(0,200,255,0.03)', border: '1px solid rgba(0,200,255,0.15)', borderRadius: 10, padding: '0.8rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: '#00c8ff', letterSpacing: '0.15em', marginBottom: '0.6rem' }}>
              📊 LOCAL COMMANDER LEADERBOARD
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {LEADERBOARD_LOCAL.map(entry => (
                <div
                  key={entry.rank}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '0.4rem 0.6rem', background: entry.rank === 1 ? 'rgba(0,255,157,0.12)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${entry.rank === 1 ? '#00ff9d' : 'rgba(255,255,255,0.08)'}`, borderRadius: 6,
                    fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
                  }}
                >
                  <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                    <span style={{ color: '#00ff9d', fontWeight: 700 }}>#{entry.rank}</span>
                    <span style={{ color: '#fff' }}>{entry.name}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', color: 'rgba(255,255,255,0.7)' }}>
                    <span>ACC: {entry.accuracy}</span>
                    <span style={{ color: '#00c8ff', fontWeight: 700 }}>{entry.score} PTS</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
