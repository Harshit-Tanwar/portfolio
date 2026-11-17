/**
 * Shared motion constants and variants.
 * Keep these as the single source of truth — don't re-define delays/easings in components.
 */

export const ease = {
  out:    [0.16, 1, 0.3, 1],       // expo-out: fast entry, long settle
  inOut:  [0.76, 0, 0.24, 1],      // expo-in-out: big panel wipes
  spring: [0.34, 1.56, 0.64, 1],   // subtle overshoot
  soft:   [0.25, 0.46, 0.45, 0.94], // gentle deceleration
};

export const duration = {
  fast:     0.28,
  base:     0.75,
  slow:     1.1,
  verySlow: 1.6,
};

export const gsapEase = {
  out:    'expo.out',
  inOut:  'expo.inOut',
  spring: 'elastic.out(1, 0.75)',
};

export const viewport = { once: true, margin: '0px 0px -10% 0px' };

/** Container variant: stagger children on enter */
export const staggerContainer = (staggerChildren = 0.07, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/** Standard fade-up with blur — the workhorse entrance variant */
export const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 32, filter: 'blur(5px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: ease.out, delay },
  },
});

/** Slide in from the left */
export const slideInLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -32 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: ease.out, delay },
  },
});

/** Scale up from slightly smaller */
export const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: ease.out, delay },
  },
});
