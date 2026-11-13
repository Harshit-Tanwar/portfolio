'use client';

import { motion } from 'framer-motion';
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
  const Tag = motion[as];
  const trigProps =
    trigger === 'intro'
      ? { animate: introDone ? 'show' : 'hidden' }
      : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } };

  let n = 0;
  const lines = String(text).split('\n');

  return (
    <Tag
      className={className}
      aria-label={String(text).replace(/\n/g, ' ')}
      initial="hidden"
      {...trigProps}
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
