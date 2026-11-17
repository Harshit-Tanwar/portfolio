'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ease } from '@/lib/motion';
import { usePageTransition } from '@/components/providers/TransitionProvider';

const word = {
  hidden: { y: '115%', rotate: 2, filter: 'blur(8px)' },
  show: (delay) => ({
    y: '0%',
    rotate: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.05,
      ease: ease.out,
      delay,
    },
  }),
};

export default function SplitText({
  children: text,
  as = 'span',
  className = '',
  delay = 0,
  stagger = 0.055,
  trigger = 'view',
}) {
  const { introDone } = usePageTransition();
  const ref = useRef(null);

  // useInView with `once: true` latches permanently once it enters the viewport.
  // We gate on introDone so whileInView can't fire while the preloader covers it.
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  const Tag = motion[as];

  // For intro-triggered words: play when introDone flips.
  // For view-triggered words: play when BOTH inView AND introDone are true —
  // so the preloader can't swallow the animation.
  const shouldShow = trigger === 'intro' ? introDone : introDone && inView;

  let n = 0;
  const lines = String(text).split('\n');

  return (
    <Tag
      ref={ref}
      className={className}
      aria-label={String(text).replace(/\n/g, ' ')}
      initial="hidden"
      animate={shouldShow ? 'show' : 'hidden'}
    >
      {lines.map((line, li) => (
        <span key={li} aria-hidden="true" className="block">
          {line.split(' ').map((w, wi) => (
            <span
              key={wi}
              className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom"
            >
              <motion.span
                className="split-word inline-block"
                variants={word}
                custom={delay + n++ * stagger}
              >
                {w}
                {'\u00A0'}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
