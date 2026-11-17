'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useFinePointer } from '@/hooks/useMediaQuery';

const SPRING_MAIN = { stiffness: 460, damping: 34, mass: 0.3 };
const SPRING_DOT  = { stiffness: 900, damping: 55, mass: 0.15 };

/**
 * Custom cursor:
 * - Tight dot at the true pointer position
 * - Softer follower that grows on interactive elements
 * - Label shows inside when data-cursor="Label" is set
 * - Velocity-based skewX for a sense of physicality
 */
export default function Cursor() {
  const fine = useFinePointer();

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  const dotX = useSpring(rawX, SPRING_DOT);
  const dotY = useSpring(rawY, SPRING_DOT);

  const followX = useSpring(rawX, SPRING_MAIN);
  const followY = useSpring(rawY, SPRING_MAIN);

  const velX = useRef(0);
  const prevX = useRef(-200);
  const prevTime = useRef(performance.now());

  const [target, setTarget] = useState(null);
  const [pressing, setPressing] = useState(false);

  const skewX = useTransform(followX, () => {
    const v = velX.current;
    return Math.max(-16, Math.min(16, v * 0.025));
  });

  useEffect(() => {
    if (!fine) return;

    const move = (e) => {
      const now = performance.now();
      const dt = Math.max(now - prevTime.current, 1);
      velX.current = (e.clientX - prevX.current) / dt * 16;
      prevX.current = e.clientX;
      prevTime.current = now;
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    const over = (e) => {
      const el = e.target.closest?.('[data-cursor]');
      setTarget(el ? el.getAttribute('data-cursor') : null);
    };

    const down = () => setPressing(true);
    const up   = () => setPressing(false);

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', down, { passive: true });
    window.addEventListener('pointerup', up, { passive: true });

    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
    };
  }, [fine, rawX, rawY]);

  if (!fine) return null;

  const hasLabel = typeof target === 'string' && target !== '';
  const followerSize = hasLabel ? 90 : target !== null ? 48 : 12;
  const dotSize = target !== null ? 0 : 5;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[130] rounded-full bg-accent"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: dotSize, height: dotSize, opacity: dotSize > 0 ? 1 : 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Follower — lags behind for a sense of weight */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[125]"
        style={{ x: followX, y: followY }}
      >
        <motion.div
          className="grid place-items-center rounded-full font-semibold text-ink"
          style={{ translateX: '-50%', translateY: '-50%', skewX }}
          animate={{
            width: followerSize,
            height: followerSize,
            backgroundColor: hasLabel
              ? 'var(--pop)'
              : target !== null
              ? 'var(--accent)'
              : 'rgba(0, 0, 0, 0)',
            border: target === null ? '1.5px solid var(--accent)' : 'none',
            scale: pressing ? 0.84 : 1,
            opacity: target !== null ? 1 : 0.55,
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="text-xs font-bold leading-none tracking-widest uppercase"
            animate={{ opacity: hasLabel ? 1 : 0, scale: hasLabel ? 1 : 0.5 }}
            transition={{ duration: 0.2 }}
          >
            {target}
          </motion.span>
        </motion.div>
      </motion.div>
    </>
  );
}
