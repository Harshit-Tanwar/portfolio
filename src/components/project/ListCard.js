'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import TransitionLink from '@/components/ui/TransitionLink';
import ProjectArt from './ProjectArt';
import { ease } from '@/lib/motion';

export default function ListCard({ project, index = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' });

  return (
    <motion.li
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 44 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.9, ease: ease.out, delay: index * 0.11 },
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
        {/* Thumbnail */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <ProjectArt
            project={project}
            sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
            showImage={false}
            className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
          {/* Hover tint — subtle ink wash */}
          <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15 rounded-2xl" />

          {/* Kind badge */}
          <div className="absolute left-4 top-4 rounded-full bg-ink/55 px-3 py-1 text-xs font-medium text-mist backdrop-blur-sm">
            {project.kind}
          </div>
        </div>

        {/* Meta */}
        <div className="mt-5 flex items-baseline justify-between gap-4 px-0.5">
          <h3 className="t-h3 transition-colors duration-300 group-hover:text-accent">
            {project.title}
          </h3>
          <span className="shrink-0 font-mono text-sm text-mist/75 tabular-nums">{project.year}</span>
        </div>

        <p className="mt-2 px-0.5 text-sm leading-relaxed text-mist line-clamp-2">{project.summary}</p>

        {/* CTA — slides in on hover */}
        <span
          aria-hidden="true"
          className="mt-3 inline-flex items-center gap-1.5 px-0.5 text-sm font-semibold text-pop opacity-0 translate-x-0 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:translate-x-1"
        >
          Read case study ↗
        </span>
      </TransitionLink>
    </motion.li>
  );
}
