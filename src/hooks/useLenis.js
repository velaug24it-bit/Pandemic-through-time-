/**
 * useLenis.js
 * Initialise Lenis smooth scroll and expose the instance.
 * In this project Lenis is used mainly for smooth panel scrolling
 * inside mission control overlays.
 */
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

export function useLenis(options = {}) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      ...options,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return lenisRef;
}
