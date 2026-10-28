'use client';

import { createContext, useContext, useEffect, useMemo, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SmoothScrollContext = createContext({ scrollTo: () => {}, stop: () => {}, start: () => {} });
export const useSmoothScroll = () => useContext(SmoothScrollContext);

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so Lenis, ScrollTrigger
 * and Framer Motion's scroll hooks all read one consistent scroll position.
 * Disabled for visitors who prefer reduced motion.
 */
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const api = useMemo(
    () => ({
      scrollTo: (target, options = {}) => {
        const lenis = lenisRef.current;
        if (lenis) {
          lenis.scrollTo(target, { duration: 1.4, ...options });
          return;
        }
        // Native fallback (reduced motion).
        if (typeof target === 'number') window.scrollTo({ top: target, behavior: options.immediate ? 'auto' : 'smooth' });
        else document.querySelector(target)?.scrollIntoView({ behavior: options.immediate ? 'auto' : 'smooth' });
      },
      stop: () => lenisRef.current?.stop(),
      start: () => lenisRef.current?.start(),
    }),
    []
  );

  return <SmoothScrollContext.Provider value={api}>{children}</SmoothScrollContext.Provider>;
}
