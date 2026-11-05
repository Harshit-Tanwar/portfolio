'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import TransitionLink from '@/components/ui/TransitionLink';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Magnetic from '@/components/ui/Magnetic';
import { useSmoothScroll } from '@/components/providers/SmoothScroll';
import { usePageTransition } from '@/components/providers/TransitionProvider';
import { ease } from '@/lib/motion';
import { site } from '@/data/site';

const hints = {
  Work: 'Selected projects',
  About: 'Background and approach',
  Experience: 'Work and education',
  Contact: 'Email and links',
};

const pill =
  'pointer-events-auto rounded-full bg-ink/70 text-mist shadow-[0_14px_34px_-14px_rgba(20,20,58,0.6)] backdrop-blur-md';

function PingDot({ className = 'bg-pop' }) {
  return (
    <span className="relative flex size-2.5 shrink-0">
      <span className={`absolute inline-flex size-full animate-ping rounded-full opacity-70 ${className}`} />
      <span className={`relative inline-flex size-2.5 rounded-full ${className}`} />
    </span>
  );
}

function useActiveNav() {
  const pathname = usePathname();
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (pathname !== '/') {
      setActive(pathname.startsWith('/work') ? '/#work' : null);
      return;
    }
    const watch = ['work', 'about', 'experience', 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const hero = document.querySelector('[aria-label="Introduction"]');

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          setActive(e.target === hero ? null : `/#${e.target.id}`);
        }),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    [hero, ...watch].filter(Boolean).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return active;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [sidesHidden, setSidesHidden] = useState(false);
  const [hover, setHover] = useState(null);
  const active = useActiveNav();

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const { stop, start } = useSmoothScroll();
  const { introDone } = usePageTransition();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSidesHidden(y > prev && y > 260);
  });

  useEffect(() => {
    open ? stop() : start();
    return () => start();
  }, [open, stop, start]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const mql = window.matchMedia('(min-width: 768px)');
    const onChange = (e) => e.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    mql.addEventListener('change', onChange);
    return () => {
      window.removeEventListener('keydown', onKey);
      mql.removeEventListener('change', onChange);
    };
  }, []);

  const sideY = !introDone || (sidesHidden && !open) ? '-170%' : '0%';
  const sideTransition = { duration: 0.6, ease: ease.out };

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[70]">
        <div className="container-x relative flex items-start justify-between pt-4">
          <motion.div animate={{ y: sideY }} transition={sideTransition}>
            <TransitionLink
              href="/"
              label="Home"
              onClick={() => setOpen(false)}
              aria-label={`${site.name}, home`}
              className="pointer-events-auto group flex h-14 items-center gap-3"
            >
              <span className="t-h3 text-[1.7rem]!">{site.nickname}</span>
            </TransitionLink>
          </motion.div>

          <div className="pointer-events-none absolute left-1/2 top-4 hidden -translate-x-1/2 md:block">
            <motion.nav
              aria-label="Primary"
              initial={{ y: '-170%' }}
              animate={{ y: introDone ? '0%' : '-170%' }}
              transition={{ ...sideTransition, delay: 0.1 }}
              onMouseLeave={() => setHover(null)}
              className={`${pill} relative flex h-14 items-center gap-1 px-2`}
            >
              {site.nav.map((item) => {
                const isHover = hover === item.href;
                const isActive = active === item.href;
                return (
                  <TransitionLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    aria-current={isActive ? 'location' : undefined}
                    onMouseEnter={() => setHover(item.href)}
                    onFocus={() => setHover(item.href)}
                    onBlur={() => setHover(null)}
                    className={`relative flex h-10 items-center rounded-full px-5 font-medium transition-colors duration-300 ${
                      isHover ? 'text-ink' : 'text-mist'
                    }`}
                  >
                    {isHover && (
                      <motion.span
                        layoutId="nav-highlight"
                        className="absolute inset-0 rounded-full bg-pop"
                        transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                      />
                    )}
                    <span
                      aria-hidden="true"
                      className={`relative mr-0 inline-block size-1.5 shrink-0 rounded-full transition-all duration-300 ${
                        isActive ? 'mr-2 scale-100' : 'w-0 scale-0'
                      } ${isHover ? 'bg-ink' : 'bg-pop'}`}
                    />
                    <span className="relative">{item.label}</span>
                  </TransitionLink>
                );
              })}
              <motion.span
                aria-hidden="true"
                style={{ scaleX: progress }}
                className="absolute inset-x-6 bottom-1.25 h-0.5 origin-left rounded-full bg-pop/80"
              />
            </motion.nav>
          </div>

          <motion.div animate={{ y: sideY }} transition={{ ...sideTransition, delay: 0.05 }}>
            <div className="pointer-events-auto flex h-14 items-center gap-3">

              <div className="hidden md:block">
                <Magnetic strength={0.12}>
                  <TransitionLink
                    href="/#contact"
                    label="Contact"
                    className="flex h-10 items-center gap-2.5 px-1 font-medium text-fg"
                  >
                    <PingDot className="bg-pop" />
                    <span className="text-sm">Open to work</span>
                  </TransitionLink>
                </Magnetic>
              </div>
              <ThemeToggle className="size-10! border-muted/20! hover:bg-mist/10!" />

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="menu"
                className="flex h-10 items-center gap-3 pl-2 pr-1 font-medium md:hidden"
              >
                {open ? 'Close' : 'Menu'}
                <span aria-hidden="true" className="relative block h-3 w-5">
                  <motion.span
                    className="absolute left-0 h-[2px] w-full rounded bg-current"
                    animate={{ top: open ? 5 : 0, rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.4, ease: ease.out }}
                  />
                  <motion.span
                    className="absolute left-0 h-[2px] w-full rounded bg-current"
                    animate={{ top: open ? 5 : 10, rotate: open ? -45 : 0 }}
                    transition={{ duration: 0.4, ease: ease.out }}
                  />
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: ease.inOut }}
            className="fixed inset-0 z-[60] flex flex-col justify-end bg-ink px-5 pb-8 pt-28 text-mist md:hidden"
          >
            <nav aria-label="Mobile">
              <ul>
                {site.nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ y: 70, opacity: 0 }}
                    animate={{ y: 0, opacity: 1, transition: { delay: 0.3 + i * 0.07, duration: 0.8, ease: ease.out } }}
                    className="border-b border-mist/15"
                  >
                    <TransitionLink
                      href={item.href}
                      label={item.label}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between gap-4 py-3 transition-colors hover:text-pop focus-visible:text-pop"
                    >
                      <span className="t-display">{item.label}</span>
                      <span className="max-w-[9rem] text-right text-sm text-mist/60">{hints[item.label]}</span>
                    </TransitionLink>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="mt-8 flex flex-col gap-5">
              <span className="inline-flex w-fit items-center gap-2.5 text-sm">
                <PingDot /> Open to work
              </span>
              <a href={`mailto:${site.email}`} className="link-u w-fit text-xl">{site.email}</a>
              <ul className="flex gap-6 text-mist/70">
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-u hover:text-mist">{s.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}