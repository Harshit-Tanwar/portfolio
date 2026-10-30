/**
 * Motion tokens shared by Framer Motion and GSAP so every animation
 * on the site shares the same rhythm.
 */
export const ease = {
  out: [0.16, 1, 0.3, 1],       // expo-out: fast start, long settle
  inOut: [0.76, 0, 0.24, 1],    // expo-in-out: used for big panels
  spring: [0.34, 1.56, 0.64, 1], // slight spring overshoot
  soft: [0.25, 0.46, 0.45, 0.94], // softer deceleration
};

export const duration = { fast: 0.28, base: 0.75, slow: 1.1, verySlow: 1.6 };

export const gsapEase = {
  out: 'expo.out',
  inOut: 'expo.inOut',
  spring: 'elastic.out(1, 0.75)',
};

/** Framer Motion viewport preset for scroll-triggered reveals */
export const viewport = { once: true, margin: '0px 0px -10% 0px' };

/** Standard stagger container */
export const staggerContainer = (staggerChildren = 0.07, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/** Standard fade-up child variant */
export const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 32, filter: 'blur(4px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: ease.out, delay },
  },
});
