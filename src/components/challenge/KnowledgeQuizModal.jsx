/**
 * KnowledgeQuizModal.jsx
 * Interactive Educational Knowledge Quiz for Phase 8 (Module 6).
 * Features:
 *  - Interactive questions covering Human Body, Viruses, Vaccines, and Pandemic History
 *  - Immediate explanations displayed after each answer selection
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CHALLENGE_QUIZZES } from '../../utils/constants';

export default function KnowledgeQuizModal({ visible, onFinishQuiz, onClose }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);

  if (!visible) return null;

  const q = CHALLENGE_QUIZZES[currentIdx] || CHALLENGE_QUIZZES[0];

  const handleSelectOption = (index) => {
    if (selectedOpt !== null) return; // Prevent re-selecting
    setSelectedOpt(index);
    if (index === q.correct) {
      setScore(s => s + 25);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx < CHALLENGE_QUIZZES.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedOpt(null);
    } else {
      onFinishQuiz?.(score + (selectedOpt === q.correct ? 25 : 0));
    }
  };

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 940,
        background: 'rgba(0,4,12,0.88)', backdropFilter: 'blur(18px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          style={{
            width: '100%', maxWidth: '660px',
            background: 'rgba(2,10,25,0.96)', border: '1px solid rgba(0,255,157,0.4)',
            borderRadius: 16, padding: '1.5rem', boxShadow: '0 0 40px rgba(0,255,157,0.3)',
            color: '#fff', position: 'relative',
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

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#00ff9d', letterSpacing: '0.2em' }}>
            CRISIS KNOWLEDGE CHALLENGE · QUESTION {currentIdx + 1} OF {CHALLENGE_QUIZZES.length}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, margin: '6px 0 1rem', lineHeight: 1.4 }}>
            {q.question}
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1rem' }}>
            {q.options.map((optText, idx) => {
              const isSelected = selectedOpt === idx;
              const isCorrect = idx === q.correct;
              let bg = 'rgba(255,255,255,0.03)';
              let border = 'rgba(255,255,255,0.1)';

              if (selectedOpt !== null) {
                if (isCorrect) { bg = 'rgba(0,255,157,0.2)'; border = '#00ff9d'; }
                else if (isSelected) { bg = 'rgba(255,56,96,0.2)'; border = '#ff3860'; }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  style={{
                    textAlign: 'left', padding: '0.6rem 0.8rem',
                    background: bg, border: `1px solid ${border}`,
                    borderRadius: 8, color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
                    cursor: selectedOpt === null ? 'pointer' : 'default', transition: 'all 0.2s',
                  }}
                >
                  {optText}
                </button>
              );
            })}
          </div>

          {/* Immediate Educational Explanation */}
          {selectedOpt !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'rgba(0,200,255,0.06)', border: '1px solid rgba(0,200,255,0.25)',
                borderRadius: 10, padding: '0.8rem', marginBottom: '1rem',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: '#00c8ff', letterSpacing: '0.15em', marginBottom: 4 }}>
                💡 EPIDEMIOLOGICAL EXPLANATION
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#fff', lineHeight: 1.5 }}>
                {q.explanation}
              </div>
            </motion.div>
          )}

          {/* Next Button */}
          {selectedOpt !== null && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={handleNextQuestion}
                style={{
                  background: 'linear-gradient(135deg, rgba(0,255,157,0.4), rgba(0,200,255,0.4))',
                  border: '1px solid #00ff9d', borderRadius: 8, padding: '0.55rem 1.4rem',
                  color: '#fff', fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 800,
                  cursor: 'pointer', letterSpacing: '0.12em',
                }}
              >
                {currentIdx < CHALLENGE_QUIZZES.length - 1 ? 'NEXT QUESTION ▶' : 'SUBMIT KNOWLEDGE QUIZ ▶'}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
