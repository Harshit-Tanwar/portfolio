/**
 * Motion tokens shared by Framer Motion and GSAP so every animation
 * on the site shares the same rhythm.
 */
export const ease = {
  out: [0.16, 1, 0.3, 1], // expo-out: fast start, long settle
  inOut: [0.76, 0, 0.24, 1], // expo-in-out: used for big panels
};

export const duration = { fast: 0.35, base: 0.8, slow: 1.2 };

export const gsapEase = { out: 'expo.out', inOut: 'expo.inOut' };
