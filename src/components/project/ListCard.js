'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import TransitionLink from '@/components/ui/TransitionLink';
import ProjectArt from './ProjectArt';
import { ease, fadeUp } from '@/lib/motion';

/** Project card for mobile/tablet/reduced-motion. Stagger + hover lift. */
export default function ListCard({ project, index = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' });

  return (
    <motion.li
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.9, ease: ease.out, delay: index * 0.12 },
        },
      }}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
    >
      <TransitionLink
        href={`/work/${project.slug}`}
        label={project.title}
        className="group block"
        data-cursor="View"
      >
        {/* Artwork with zoom + overlay */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
          <ProjectArt
            project={project}
            className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
          {/* Overlay that darkens slightly on hover */}
          <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10 rounded-[1.5rem]" />
          {/* Pill tag */}
          <div className="absolute left-4 top-4 rounded-full bg-ink/60 px-3 py-1 text-xs text-mist/80 backdrop-blur-sm">
            {project.kind}
          </div>
        </div>

        <div className="mt-5 flex items-baseline justify-between gap-4">
          <h3 className="t-h3 transition-colors duration-300 group-hover:text-accent">
            {project.title}
          </h3>
          <span className="text-sm text-mist/60">{project.year}</span>
        </div>

        <p className="mt-2 max-w-md text-sm text-mist/70">{project.summary}</p>

        {/* Read more — slides in on hover */}
        <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-pop opacity-0 transition-all duration-400 group-hover:opacity-100 group-hover:translate-x-1">
          Read case study ↗
        </span>
      </TransitionLink>
    </motion.li>
  );
}
