'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useFinePointer } from '@/hooks/useMediaQuery';

/**
 * Desktop-only cursor follower. Grows into a labelled disc over any element
 * with a data-cursor attribute (data-cursor="View" shows "View").
 */
export default function Cursor() {
  const fine = useFinePointer();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.35 });
  const [target, setTarget] = useState(null); // null | string

  useEffect(() => {
    if (!fine) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      const el = e.target.closest?.('[data-cursor]');
      setTarget(el ? el.getAttribute('data-cursor') : null);
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
    };
  }, [fine, x, y]);

  if (!fine) return null;
  const active = target !== null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[120]"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 grid place-items-center rounded-full bg-pop text-sm font-medium text-ink"
        animate={{ width: active ? (target ? 88 : 56) : 12, height: active ? (target ? 88 : 56) : 12, opacity: active ? 0.95 : 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {target}
      </motion.div>
    </motion.div>
  );
}
