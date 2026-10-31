'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import TransitionLink from '@/components/ui/TransitionLink';
import ProjectArt from './ProjectArt';
import { ease, fadeUp } from '@/lib/motion';


export default function CaseStudyIndex({ projects }) {
  const [active, setActive] = useState(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 24 });
  const y = useSpring(my, { stiffness: 220, damping: 24 });

  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: '0px 0px -10% 0px' });

  return (
    <section aria-labelledby="index-title" className="py-28 md:py-40">
      <div className="container-x">
        <motion.div
          ref={headRef}
          variants={fadeUp(0)}
          initial="hidden"
          animate={headInView ? 'show' : 'hidden'}
          className="flex items-end justify-between gap-6 border-b border-line pb-10"
        >
          <h2 id="index-title" className="t-h2">Case studies</h2>
          <p className="hidden text-sm text-muted md:block">{projects.length} projects</p>
        </motion.div>

        <ul
          className="mt-2"
          onMouseMove={(e) => {
            mx.set(e.clientX + 32);
            my.set(e.clientY - 180);
          }}
        >
          {projects.map((p, i) => (
            <IndexRow
              key={p.slug}
              project={p}
              index={i}
              onEnter={() => setActive(i)}
              onLeave={() => setActive(null)}
            />
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            key={active}
            aria-hidden="true"
            initial={{ scale: 0.82, opacity: 0, rotate: -3 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.82, opacity: 0, rotate: 3 }}
            transition={{ duration: 0.35, ease: ease.out }}
            style={{ x, y }}
            className="pointer-events-none fixed left-0 top-0 z-40 hidden h-80 w-60 overflow-hidden rounded-3xl shadow-2xl md:block"
          >
            <ProjectArt project={projects[active]} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function IndexRow({ project: p, index, onEnter, onLeave }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' });

  return (
    <motion.li
      ref={ref}
      variants={{
        hidden: { opacity: 0, x: -20 },
        show: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.75, ease: ease.out, delay: index * 0.1 },
        },
      }}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className="border-b border-line"
    >
      <TransitionLink
        href={`/work/${p.slug}`}
        label={p.title}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onFocus={() => {}}
        className="group flex items-center justify-between gap-6 py-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:pl-6"
        data-cursor=""
      >
        <span className="hidden text-sm tabular-nums text-muted/50 md:block">
          {String(index + 1).padStart(2, '0')}
        </span>

        <span className="flex-1">
          <span className="t-h3 block transition-colors duration-300 group-hover:text-accent">
            {p.title}
          </span>
        </span>

        <span className="hidden text-sm text-muted transition-opacity duration-300 group-hover:opacity-0 md:block">
          {p.kind}
        </span>

        <span className="flex items-center gap-3 text-sm text-muted">
          <span>{p.year}</span>
          <span className="inline-block -translate-x-1 opacity-0 transition-all duration-400 group-hover:translate-x-0 group-hover:opacity-100">
            ↗
          </span>
        </span>
      </TransitionLink>
    </motion.li>
  );
}
