'use client';

import { useId, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ease } from '@/lib/motion';

const contentVariants = {
  hidden: {
    opacity: 0,
    y: 12,
    filter: 'blur(4px)',
    transition: { duration: 0.25, ease: ease.out },
  },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: ease.out, delay: 0.12 },
  },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.88 },
  show: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: ease.out, delay: 0.2 + i * 0.05 },
  }),
};

/**
 * Single-open accordion.
 * Height animates through the grid-template-rows 0fr → 1fr trick.
 * The +/− icon morphs cleanly. Content fades up on open.
 */
export default function Accordion({ items, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen);
  const uid = useId();

  return (
    <ul className="border-t border-line">
      {items.map((it, i) => {
        const isOpen = open === i;
        const btn = `${uid}-btn-${i}`;
        const panel = `${uid}-panel-${i}`;

        return (
          <li key={it.title} className="border-b border-line">
            <h3>
              <button
                id={btn}
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex w-full items-center justify-between gap-6 py-7 text-left transition-colors duration-300 hover:text-accent"
                data-cursor=""
              >
                <span className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-12">
                  <span className="w-32 shrink-0 text-sm text-muted tabular-nums transition-colors duration-300 group-hover:text-current">
                    {String(i + 1).padStart(2, '0')} · {it.meta}
                  </span>
                  <span className="t-h3">{it.title}</span>
                </span>

                {/* Morphing icon */}
                <span
                  aria-hidden="true"
                  className="relative size-10 shrink-0 rounded-full border border-fg/20 transition-colors duration-300 group-hover:border-accent group-hover:bg-accent/10"
                >
                  {/* Horizontal bar — always present */}
                  <span className="absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
                  {/* Vertical bar — rotates out when open */}
                  <motion.span
                    className="absolute left-1/2 top-1/2 h-4 w-[1.5px] -translate-x-1/2 -translate-y-1/2 bg-current"
                    animate={{ scaleY: isOpen ? 0 : 1, rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.4, ease: ease.out }}
                  />
                </span>
              </button>
            </h3>

            <div
              id={panel}
              role="region"
              aria-labelledby={btn}
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
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {it.tags.map((t, ti) => (
                          <motion.li
                            key={t}
                            custom={ti}
                            variants={tagVariants}
                            initial="hidden"
                            animate="show"
                            className="rounded-full border border-line px-4 py-1.5 text-sm text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
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
