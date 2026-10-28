'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ease } from '@/lib/motion';
import { site } from '@/data/site';
import { usePageTransition } from '@/components/providers/TransitionProvider';

const RUN_MS = 1300;

/**
 * First-visit intro. The head script sets html[data-intro="on"] only when the
 * session hasn't seen it (and motion is allowed), so repeat visits and
 * reduced-motion users never see it, and nothing flashes before hydration.
 */
export default function Preloader() {
  const { setIntroDone } = usePageTransition();
  const [state, setState] = useState('run'); // run | out | gone

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== 'on') {
      setState('gone');
      setIntroDone(true);
      return;
    }
    const timers = [
      setTimeout(() => setState('out'), RUN_MS),
      setTimeout(() => setIntroDone(true), RUN_MS + 450),
      setTimeout(() => {
        try { sessionStorage.setItem('intro-seen', '1'); } catch {}
        root.dataset.intro = 'off';
        setState('gone');
      }, RUN_MS + 1000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [setIntroDone]);

  if (state === 'gone') return null;

  return (
    <motion.div
      aria-hidden="true"
      className="preloader fixed inset-0 z-[100] flex-col justify-between bg-ink p-6 text-mist md:p-12"
      animate={{ y: state === 'out' ? '-100%' : '0%' }}
      transition={{ duration: 0.9, ease: ease.inOut }}
    >
      <p className="text-mist/70">{site.role}</p>
      <div>
        <div className="overflow-hidden pb-2">
          <motion.p
            className="t-display"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1, ease: ease.out, delay: 0.1 }}
          >
            {site.name}
          </motion.p>
        </div>
        <div className="mt-8 h-[3px] bg-mist/15">
          <motion.div
            className="h-full origin-left bg-pop"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: RUN_MS / 1000, ease: ease.inOut }}
          />
        </div>
      </div>
    </motion.div>
  );
}
