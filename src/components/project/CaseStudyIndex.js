'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import TransitionLink from '@/components/ui/TransitionLink';
import ProjectArt from './ProjectArt';

/** Text index of every case study; a floating preview follows the pointer. */
export default function CaseStudyIndex({ projects }) {
  const [active, setActive] = useState(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 28 });
  const y = useSpring(my, { stiffness: 260, damping: 28 });

  return (
    <section aria-labelledby="index-title" className="py-28 md:py-40">
      <div className="container-x">
        <h2 id="index-title" className="t-h2">Case studies</h2>
        <ul
          className="mt-14 border-t border-line"
          onMouseMove={(e) => {
            mx.set(e.clientX + 28);
            my.set(e.clientY - 150);
          }}
        >
          {projects.map((p, i) => (
            <li key={p.slug} className="border-b border-line">
              <TransitionLink
                href={`/work/${p.slug}`}
                label={p.title}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(null)}
                className="flex items-baseline justify-between gap-6 py-8 transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:pl-5 focus-visible:pl-5"
                data-cursor=""
              >
                <span className="t-h3">{p.title}</span>
                <span className="hidden text-muted md:block">{p.kind}</span>
                <span className="text-muted">{p.year}</span>
              </TransitionLink>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            key={active}
            aria-hidden="true"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ x, y }}
            className="pointer-events-none fixed left-0 top-0 z-40 hidden h-72 w-52 overflow-hidden rounded-3xl md:block"
          >
            <ProjectArt project={projects[active]} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
