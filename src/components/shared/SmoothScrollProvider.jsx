import { useEffect } from 'react';
import Lenis from 'lenis';

export function scrollToTarget(targetIdOrTop) {
  if (typeof window === 'undefined') return;

  const easeExpo = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

  if (!targetIdOrTop || targetIdOrTop === 'top') {
    if (window.lenisInstance) {
      window.lenisInstance.scrollTo(0, { duration: 1.2, easing: easeExpo });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return;
  }

  const el = document.getElementById(targetIdOrTop);
  if (!el) return;

  if (window.lenisInstance) {
    window.lenisInstance.scrollTo(el, { offset: -20, duration: 1.25, easing: easeExpo });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function SmoothScrollProvider({ isLocked = false, children }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    const lenis = new Lenis({
      lerp: 0.088,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
    });

    window.lenisInstance = lenis;

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if (window.lenisInstance === lenis) {
        window.lenisInstance = null;
      }
    };
  }, []);

  useEffect(() => {
    const lenis = window.lenisInstance;
    if (!lenis) return;
    if (isLocked) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [isLocked]);

  return children;
}
