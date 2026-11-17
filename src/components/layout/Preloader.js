'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ease } from '@/lib/motion';
import { site } from '@/data/site';
import { usePageTransition } from '@/components/providers/TransitionProvider';

const HOLD_MS = 1600;
const COUNT_MS = 1200;


export default function Preloader() {
  const { setIntroDone } = usePageTransition();
  const [state, setState] = useState('run'); // run | out | gone
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== 'on') {
      setState('gone');
      setIntroDone(true);
      return;
    }

    // Smooth counter 0→100 over COUNT_MS ms, ease-out³
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / COUNT_MS, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * 100));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    const timers = [
      setTimeout(() => setState('out'), HOLD_MS),
      setTimeout(() => setIntroDone(true), HOLD_MS + 600),
      setTimeout(() => {
        try { sessionStorage.setItem('intro-seen', '1'); } catch {}
        root.dataset.intro = 'off';
        setState('gone');
      }, HOLD_MS + 1200),
    ];

    return () => {
      timers.forEach(clearTimeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [setIntroDone]);

  if (state === 'gone') return null;

  return (
    <motion.div
      aria-hidden="true"
      className="preloader fixed inset-0 z-[100] flex-col justify-between overflow-hidden bg-ink p-7 text-mist md:p-14"
      animate={{ y: state === 'out' ? '-100%' : '0%' }}
      transition={{ duration: 1.1, ease: ease.inOut }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between">
        <motion.p
          className="t-label text-mist/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {site.role}
        </motion.p>
        <motion.p
          className="t-label text-mist/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {site.location}
        </motion.p>
      </div>

      {/* Centre — name reveal */}
      <div className="-mt-8">
        <div className="overflow-hidden pb-2">
          <motion.p
            className="t-display leading-none"
            initial={{ y: '115%', rotate: 2 }}
            animate={{ y: '0%', rotate: 0 }}
            transition={{ duration: 1.1, ease: ease.out, delay: 0.15 }}
          >
            {site.name}
          </motion.p>
        </div>

        {/* Progress bar + counter */}
        <div className="mt-10 flex items-center gap-6">
          <div className="h-[1.5px] flex-1 overflow-hidden rounded-full bg-mist/10">
            <motion.div
              className="h-full origin-left rounded-full bg-pop"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: count / 100 }}
              style={{ transformOrigin: 'left' }}
              transition={{ duration: 0.05, ease: 'linear' }}
            />
          </div>
          <motion.span
            className="w-10 text-right font-mono text-sm tabular-nums text-mist/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            {String(count).padStart(2, '0')}
          </motion.span>
        </div>
      </div>

      {/* Bottom row */}
      <motion.div
        className="flex items-end justify-between"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7, ease: ease.out }}
      >
        <p className="font-mono text-sm text-mist/30">&copy; {new Date().getFullYear()}</p>
        <p className="font-mono text-sm text-mist/30">Portfolio</p>
      </motion.div>
    </motion.div>
  );
}
