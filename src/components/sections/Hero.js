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

const MARQUEE_ITEMS = [
  'React', '—', 'Next.js', '—', 'GSAP', '—', 'Framer Motion', '—',
  'TypeScript', '—', 'Node.js', '—', 'CSS', '—', 'Motion Design', '—',
];

function Orb({ className }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute rounded-full blur-[120px] opacity-[0.18] pointer-events-none ${className}`}
    />
  );
}

export default function Hero() {
  const root = useRef(null);
  const { introDone } = usePageTransition();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Parallax: headline drifts slower than scroll
        gsap.to('.hero-headline', {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
        // Meta row floats up slightly faster
        // gsap.to('.hero-meta', {
        //   yPercent: -6,
        //   ease: 'none',
        //   scrollTrigger: {
        //     trigger: root.current,
        //     start: 'top top',
        //     end: 'bottom top',
        //     scrub: true,
        //   },
        // });
        // Orbs drift opposite directions
        gsap.to('.hero-orb-1', {
          y: -80,
          x: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
        gsap.to('.hero-orb-2', {
          y: -50,
          x: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    },
    { scope: root }
  );

  const fade = {
    hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1, ease: ease.out, delay: 0.85 },
    },
  };

  const fadeBottom = {
    hidden: { opacity: 0, y: 32, filter: 'blur(4px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.1, ease: ease.out, delay: 1.05 },
    },
  };

  return (
    <section ref={root} aria-label="Introduction" className="relative flex min-h-svh flex-col overflow-hidden">

      <Orb className="hero-orb-1 -top-32 -right-32 w-[600px] h-[600px] bg-accent" />
      <Orb className="hero-orb-2 bottom-20 -left-40 w-[500px] h-[500px] bg-pop" />

      <div className="relative z-10 flex flex-1 flex-col justify-between pb-0 pt-28 md:pt-36">

        {/* <motion.div
          variants={fade}
          initial="hidden"
          animate={introDone ? 'show' : 'hidden'}
          className="hero-meta container-x flex items-start justify-between gap-6 text-muted"
        >
          <p className="text-sm font-medium">
            <span className="mr-2 inline-block size-1.5 rounded-full bg-pop align-middle" />
            {site.name}
          </p>
          <LocalTime className="hidden sm:block text-sm" />
        </motion.div> */}

        {/* Headline */}
        <div className="hero-headline container-x my-14">
          <SplitText as="h1" trigger="intro" className="t-display" stagger={0.055}>
            {'I build interfaces\nthat feel considered.'}
          </SplitText>
        </div>

        {/* Bottom CTA row */}
        <motion.div
          variants={fadeBottom}
          initial="hidden"
          animate={introDone ? 'show' : 'hidden'}
          className="container-x grid gap-10 border-t border-line/60 pt-8 pb-10 md:grid-cols-[1.4fr_1fr_auto] md:items-end"
        >
          <p className="t-prose max-w-[34ch] text-muted">
            {site.role}. Focused on type, spacing and motion — the parts people feel.
          </p>
          <p className="self-end text-sm text-muted/80 leading-relaxed">
            React · Next.js · GSAP<br />Framer Motion · Node.js
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/#work" label="Work">See the work</Button>
            <Button variant="outline" href={`mailto:${site.email}`}>Email me</Button>
          </div>
        </motion.div>

        {/* Marquee ticker strip */}
        <motion.div
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 1.3, duration: 0.8 } } }}
          initial="hidden"
          animate={introDone ? 'show' : 'hidden'}
          className="overflow-hidden border-t border-line/40 bg-muted py-2"
          aria-hidden="true"
        >
          <div className="flex animate-[marquee_22s_linear_infinite] gap-10 whitespace-nowrap">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span
                key={i}
                className={`text-sm font-bold tracking-widest uppercase ${
                  item === '—' ? 'text-surface/60' : 'text-surface'
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
