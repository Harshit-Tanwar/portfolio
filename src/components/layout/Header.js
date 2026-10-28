'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import TransitionLink from '@/components/ui/TransitionLink';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useSmoothScroll } from '@/components/providers/SmoothScroll';
import { ease } from '@/lib/motion';
import { site } from '@/data/site';

function Availability({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 rounded-full border border-current/25 px-4 py-2 text-sm ${className}`}>
      <span className="relative flex size-2.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-pop opacity-75" />
        <span className="relative inline-flex size-2.5 rounded-full bg-pop" />
      </span>
      Open to work
    </span>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const { scrollY } = useScroll();
  const { stop, start } = useSmoothScroll();

  // Hide on scroll down, reveal on scroll up.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > prev && y > 260);
  });

  useEffect(() => {
    open ? stop() : start();
    return () => start();
  }, [open, stop, start]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? '-110%' : '0%' }}
        transition={{ duration: 0.5, ease: ease.out }}
        className={`fixed inset-x-0 top-0 z-[70] transition-colors duration-500 ${
          open ? 'text-mist' : solid ? 'bg-canvas/80 text-fg backdrop-blur-md' : 'text-fg'
        }`}
      >
        <div className="container-x flex h-20 items-center justify-between">
          <TransitionLink href="/" label="Home" className="t-h3 !text-[1.9rem]" data-cursor="" onClick={() => setOpen(false)}>
            {site.nickname}
          </TransitionLink>

          <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
            {site.nav.map((item) => (
              <TransitionLink key={item.href} href={item.href} label={item.label} className="link-u py-1" data-cursor="">
                {item.label}
              </TransitionLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Availability className="hidden lg:inline-flex" />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu"
              className="h-11 rounded-full border border-current/25 px-5 text-sm md:hidden"
            >
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: ease.inOut }}
            className="fixed inset-0 z-[60] flex flex-col justify-end bg-ink px-5 pb-10 pt-28 text-mist md:hidden"
          >
            <nav aria-label="Mobile">
              <ul>
                {site.nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1, transition: { delay: 0.25 + i * 0.07, duration: 0.7, ease: ease.out } }}
                    className="border-b border-mist/15"
                  >
                    <TransitionLink href={item.href} label={item.label} onClick={() => setOpen(false)} className="t-display block py-3">
                      {item.label}
                    </TransitionLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="mt-8 flex items-center justify-between gap-4">
              <Availability />
              <a href={`mailto:${site.email}`} className="link-u">{site.email}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
