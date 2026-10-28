'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ease } from '@/lib/motion';
import { sleep } from '@/lib/utils';
import { useSmoothScroll } from './SmoothScroll';

const TransitionContext = createContext(null);
export const usePageTransition = () => useContext(TransitionContext);

const COVER_MS = 750;

/** Two stacked panels wipe up over the page, then wipe away on the new route. */
const layers = [
  { className: 'bg-pop', custom: 0 },
  { className: 'bg-stage text-mist', custom: 1, label: true },
];

const panel = {
  idle: { clipPath: 'inset(100% 0% 0% 0%)', transition: { duration: 0 } },
  cover: (i) => ({
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 0.65, delay: i * 0.1, ease: ease.inOut },
  }),
  reveal: (i) => ({
    clipPath: 'inset(0% 0% 100% 0%)',
    transition: { duration: 0.75, delay: (1 - i) * 0.1, ease: ease.inOut },
  }),
};

/**
 * Owns route transitions and the "intro finished" flag.
 *   navigate(href, label): cover the screen → router.push → reveal.
 * App Router has no built-in exit animations, so the cover is driven here.
 */
export default function TransitionProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { scrollTo } = useSmoothScroll();

  const [phase, setPhase] = useState('idle'); // idle | cover | reveal
  const [label, setLabel] = useState('');
  const [introDone, setIntroDone] = useState(false);

  const busy = useRef(false);
  const pendingHash = useRef(null);
  const lastPath = useRef(pathname);

  const navigate = useCallback(
    async (href, nextLabel = '') => {
      if (busy.current) return;
      const [rawPath, hash] = href.split('#');
      const targetPath = rawPath || pathname;

      // Same page: just glide to the anchor (or the top).
      if (targetPath === pathname) {
        scrollTo(hash ? `#${hash}` : 0);
        return;
      }

      busy.current = true;
      pendingHash.current = hash ? `#${hash}` : null;
      setLabel(nextLabel);
      setPhase('cover');
      await sleep(COVER_MS + 50);
      router.push(targetPath);

      // Failsafe: never leave the curtain up if navigation stalls.
      setTimeout(() => {
        if (busy.current && lastPath.current === pathname) {
          setPhase('reveal');
          sleep(900).then(() => {
            setPhase('idle');
            busy.current = false;
          });
        }
      }, 7000);
    },
    [pathname, router, scrollTo]
  );

  // New route committed: reset scroll, then lift the curtain.
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    let cancelled = false;

    (async () => {
      scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
      await sleep(180);
      if (cancelled) return;
      ScrollTrigger.refresh();
      if (pendingHash.current) {
        scrollTo(pendingHash.current, { immediate: true });
        pendingHash.current = null;
      }
      setPhase('reveal');
      await sleep(950);
      if (cancelled) return;
      setPhase('idle');
      busy.current = false;
    })();

    return () => {
      cancelled = true;
    };
  }, [pathname, scrollTo]);

  const value = useMemo(() => ({ navigate, introDone, setIntroDone, phase }), [navigate, introDone, phase]);

  return (
    <TransitionContext.Provider value={value}>
      {children}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90]"
        style={{ pointerEvents: phase === 'idle' ? 'none' : 'auto' }}
      >
        {layers.map(({ className, custom, label: showLabel }) => (
          <motion.div
            key={custom}
            custom={custom}
            variants={panel}
            initial={false}
            animate={phase}
            className={`absolute inset-0 flex items-end p-6 md:p-12 ${className}`}
          >
            {showLabel && (
              <motion.span
                className="t-display block"
                animate={{ opacity: phase === 'cover' ? 1 : 0, y: phase === 'cover' ? 0 : -30 }}
                transition={{ duration: 0.5, delay: phase === 'cover' ? 0.35 : 0, ease: ease.out }}
              >
                {label}
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </TransitionContext.Provider>
  );
}
