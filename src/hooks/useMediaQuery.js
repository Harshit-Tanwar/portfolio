'use client';

import { useSyncExternalStore } from 'react';

/** SSR-safe media query hook (no hydration mismatch, no layout effect). */
export function useMediaQuery(query, serverValue = false) {
  return useSyncExternalStore(
    (notify) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', notify);
      return () => mql.removeEventListener('change', notify);
    },
    () => window.matchMedia(query).matches,
    () => serverValue
  );
}

export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');
