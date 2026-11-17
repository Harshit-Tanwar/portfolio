'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import SplitText from '@/components/ui/SplitText';
import Button from '@/components/ui/Button';
import { usePageTransition } from '@/components/providers/TransitionProvider';
import { ease } from '@/lib/motion';
import { site } from '@/data/site';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MARQUEE_ITEMS = [
  'React', '·', 'Next.js', '·', 'GSAP', '·', 'Framer Motion', '·',
  'TypeScript', '·', 'Node.js', '·', 'CSS', '·', 'Motion Design', '·',
];

export default function Hero() {
  const root = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const { introDone } = usePageTransition();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to('.hero-headline', {
          yPercent: -14,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        if (orb1Ref.current) {
          gsap.to(orb1Ref.current, {
            y: -100,
            x: 50,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
        if (orb2Ref.current) {
          gsap.to(orb2Ref.current, {
            y: -60,
            x: -40,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      });
    },
    { scope: root }
  );

  const fadeBottom = {
    hidden: { opacity: 0, y: 32, filter: 'blur(6px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.1, ease: ease.out, delay: 1.05 },
    },
  };

  return (
    <section ref={root} aria-label="Introduction" className="relative flex min-h-svh flex-col overflow-hidden">

      <div
        ref={orb1Ref}
        aria-hidden="true"
        className="absolute -top-40 -right-40 hidden h-[600px] w-[600px] rounded-full bg-accent/[0.12] blur-[140px] pointer-events-none sm:block"
      />
      <div
        ref={orb2Ref}
        aria-hidden="true"
        className="absolute bottom-10 -left-48 hidden h-[500px] w-[500px] rounded-full bg-pop/[0.09] blur-[130px] pointer-events-none sm:block"
      />

      <div className="relative z-10 flex flex-1 flex-col justify-between pb-0 pt-28 md:pt-36">

        {/* Headline */}
        <div className="hero-headline container-x my-10 md:my-14">
          <SplitText
            as="h1"
            trigger="intro"
            className="t-display [&>span:last-child>span:last-child>.split-word]:font-serif [&>span:last-child>span:last-child>.split-word]:font-semibold [&>span:last-child>span:last-child>.split-word]:italic [&>span:last-child>span:last-child>.split-word]:text-accent-text"
            stagger={0.055}
          >
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

        <motion.div
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 1.4, duration: 0.9 } } }}
          initial="hidden"
          animate={introDone ? 'show' : 'hidden'}
          className="overflow-hidden border-t border-line/40 bg-muted py-2.5"
          aria-hidden="true"
        >
          <div className="flex animate-[marquee_28s_linear_infinite] gap-12 whitespace-nowrap will-change-transform">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span
                key={`marquee-${i}`}
                className={`text-sm font-bold tracking-[0.18em] uppercase ${
                  item === '·' ? 'text-surface/65' : 'text-surface'
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
