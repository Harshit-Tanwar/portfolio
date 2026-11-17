'use client';

import { useId, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ease } from '@/lib/motion';

const contentVariants = {
  hidden: {
    opacity: 0,
    y: 14,
    filter: 'blur(4px)',
    transition: { duration: 0.22, ease: ease.out },
  },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: ease.out, delay: 0.1 },
  },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 6 },
  show: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.42, ease: ease.out, delay: 0.18 + i * 0.045 },
  }),
};

/**
 * Single-open accordion.
 * Height animates via grid-template-rows 0fr → 1fr.
 * +/− icon morphs on open/close.
 * Content fades and blurs in.
 */
export default function Accordion({ items, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen);
  const uid = useId();

  return (
    <ul className="border-t border-line">
      {items.map((it, i) => {
        const isOpen = open === i;
        const btnId = `${uid}-btn-${i}`;
        const panelId = `${uid}-panel-${i}`;

        return (
          <li key={it.title} className="border-b border-line">
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex w-full items-center justify-between gap-6 py-7 text-left transition-colors duration-300 hover:text-accent focus-visible:text-accent"
                data-cursor=""
              >
                {/* Left: index + title */}
                <span className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-12">
                  <span className="w-32 shrink-0 font-mono text-sm text-muted tabular-nums transition-colors duration-300 group-hover:text-current">
                    {String(i + 1).padStart(2, '0')} · {it.meta}
                  </span>
                  <span className="t-h3">{it.title}</span>
                </span>

                {/* Morphing +/− icon */}
                <span
                  aria-hidden="true"
                  className="relative size-10 shrink-0 rounded-full border border-fg/20 transition-all duration-300 group-hover:border-accent group-hover:bg-accent/10 group-focus-visible:border-accent group-focus-visible:bg-accent/10"
                >
                  {/* Horizontal bar — always present */}
                  <span className="absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
                  {/* Vertical bar — collapses when open */}
                  <motion.span
                    className="absolute left-1/2 top-1/2 h-4 w-[1.5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-current"
                    animate={{ scaleY: isOpen ? 0 : 1, rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.38, ease: ease.out }}
                  />
                </span>
              </button>
            </h3>

            {/* Panel */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              inert={!isOpen}
              className="grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      variants={contentVariants}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="pb-10 md:pl-44"
                    >
                      <p className="t-prose">{it.body}</p>
                      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
                        {it.tags.map((t, ti) => (
                          <motion.li
                            key={t}
                            custom={ti}
                            variants={tagVariants}
                            initial="hidden"
                            animate="show"
                            className="rounded-full border border-line px-4 py-1.5 text-sm text-muted transition-all duration-300 hover:border-accent hover:bg-accent/5 hover:text-accent"
                          >
                            {t}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
