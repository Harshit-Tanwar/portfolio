'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import SplitText from '@/components/ui/SplitText';
import Button from '@/components/ui/Button';
import LocalTime from '@/components/ui/LocalTime';
import { usePageTransition } from '@/components/providers/TransitionProvider';
import { ease } from '@/lib/motion';
import { site } from '@/data/site';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Hero: the headline is the poster. One orchestrated entrance (masked words,
 * then the footer row), and a light scroll parallax on exit.
 */
export default function Hero() {
  const root = useRef(null);
  const { introDone } = usePageTransition();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to('.hero-content', {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      });
    },
    { scope: root }
  );

  const fade = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: ease.out, delay: 0.9 } },
  };

  return (
    <section ref={root} aria-label="Introduction" className="relative flex min-h-svh flex-col">
      <div className="hero-content container-x flex flex-1 flex-col justify-between pb-10 pt-28 md:pt-32">
        <motion.div
          variants={fade}
          initial="hidden"
          animate={introDone ? 'show' : 'hidden'}
          className="flex items-start justify-between gap-6 text-muted"
        >
          <p>{site.name}, also known as {site.nickname}</p>
          <LocalTime className="hidden sm:block" />
        </motion.div>

        <div className="my-16">
          <SplitText as="h1" trigger="intro" className="t-display">
            {'I build interfaces\nthat feel considered.'}
          </SplitText>
        </div>

        <motion.div
          variants={fade}
          initial="hidden"
          animate={introDone ? 'show' : 'hidden'}
          className="grid gap-10 border-t border-line pt-8 md:grid-cols-[1.4fr_1fr_auto] md:items-end"
        >
          <p className="t-prose max-w-[34ch]">
            {site.role}. I work in React and Next.js and spend most of my time on type, spacing and motion.
          </p>
          <p className="text-muted">React, Next.js, GSAP, Framer Motion, Node.js</p>
          <div className="flex flex-wrap gap-3">
            <Button href="/#work" label="Work">See the work</Button>
            <Button variant="outline" href={`mailto:${site.email}`}>Email me</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
