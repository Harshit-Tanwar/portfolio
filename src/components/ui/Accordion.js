'use client';

import { useId, useState } from 'react';
import { motion } from 'framer-motion';
import { ease } from '@/lib/motion';

const group = { show: { transition: { staggerChildren: 0.08, delayChildren: 0.18 } }, hide: {} };
const item = {
  hide: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.out } },
};

/**
 * Single-open accordion.
 * Height animates through the grid-template-rows 0fr → 1fr trick, so the
 * browser handles the height change and nothing is measured in JS.
 * items: [{ meta, title, body, tags }]
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
                className="flex w-full items-center justify-between gap-6 py-7 text-left"
                data-cursor=""
              >
                <span className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-12">
                  <span className="w-28 shrink-0 text-muted">{it.meta}</span>
                  <span className="t-h3">{it.title}</span>
                </span>
                <span aria-hidden="true" className="relative size-10 shrink-0 rounded-full border border-fg/25">
                  <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 bg-fg" />
                  <span
                    className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-fg transition-transform duration-500"
                    style={{ transform: `translate(-50%, -50%) rotate(${isOpen ? 90 : 0}deg)` }}
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
                <motion.div variants={group} initial="hide" animate={isOpen ? 'show' : 'hide'} className="pb-10 md:pl-40">
                  <motion.p variants={item} className="t-prose">
                    {it.body}
                  </motion.p>
                  <motion.ul variants={item} className="mt-6 flex flex-wrap gap-2">
                    {it.tags.map((t) => (
                      <li key={t} className="rounded-full border border-line px-4 py-1.5 text-sm text-muted">
                        {t}
                      </li>
                    ))}
                  </motion.ul>
                </motion.div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
