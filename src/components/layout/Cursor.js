'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useFinePointer } from '@/hooks/useMediaQuery';

const SPRING_MAIN = { stiffness: 480, damping: 36, mass: 0.3 };
const SPRING_DOT  = { stiffness: 900, damping: 55, mass: 0.15 };

/**
 * World-class cursor:
 * - A small trailing dot (tight spring) at true pointer position
 * - A larger follower that grows on hover with velocity-based skew
 * - Label shows inside the follower when data-cursor="Label"
 * - Blend mode mix-blend-difference when not over interactive elements
 */
export default function Cursor() {
  const fine = useFinePointer();

  // Raw pointer
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  // Dot — very tight
  const dotX = useSpring(rawX, SPRING_DOT);
  const dotY = useSpring(rawY, SPRING_DOT);

  // Follower — softer
  const followX = useSpring(rawX, SPRING_MAIN);
  const followY = useSpring(rawY, SPRING_MAIN);

  // Velocity for skew
  const velX = useRef(0);
  const velY = useRef(0);
  const prevX = useRef(-200);
  const prevTime = useRef(performance.now());

  const [target, setTarget] = useState(null);   // string label | null
  const [pressing, setPressing] = useState(false);

  const skewX = useTransform(followX, () => {
    const v = velX.current;
    return Math.max(-18, Math.min(18, v * 0.03));
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
    // window.addEventListener('pointerover', over, { passive: true });
    window.addEventListener('pointerdown', down, { passive: true });
    window.addEventListener('pointerup', up, { passive: true });

    return () => {
      window.removeEventListener('pointermove', move);
      // window.removeEventListener('pointerover', over);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
    };
  }, [fine, rawX, rawY]);

  if (!fine) return null;

  const hasLabel = target !== null && target !== '';
  const followerSize = hasLabel ? 96 : target !== null ? 52 : 14;
  const dotSize = target !== null ? 0 : 5;

  return (
    <>
      {/* Dot — exact pointer position */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[130] rounded-full bg-accent"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ width: dotSize, height: dotSize, opacity: dotSize > 0 ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Follower */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[125]"
        style={{ x: followX, y: followY }}
      >
        <motion.div
          className="grid place-items-center rounded-full font-medium text-ink"
          style={{
            translateX: '-50%',
            translateY: '-50%',
            skewX,
          }}
          animate={{
            width: followerSize,
            height: followerSize,
            backgroundColor: hasLabel ? 'var(--pop)' : target !== null ? 'var(--accent)' : 'rgba(0, 0, 0, 0)',
            border: target === null ? '1.5px solid var(--accent)' : 'none',
            scale: pressing ? 0.88 : 1,
            opacity: target !== null ? 1 : 0.6,
          }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="text-sm font-semibold leading-none tracking-wide"
            animate={{ opacity: hasLabel ? 1 : 0, scale: hasLabel ? 1 : 0.6 }}
            transition={{ duration: 0.22 }}
          >
            {target}
          </motion.span>
        </motion.div>
      </motion.div>
    </>
  );
}
