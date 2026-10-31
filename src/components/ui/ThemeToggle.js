'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoonIcon, SunIcon } from './Icons';

/**
 * Light/dark switch with an animated icon crossfade.
 * The initial value is set by the inline head script (no flash).
 */
export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState(null);

  useEffect(() => setTheme(document.documentElement.dataset.theme || 'light'), []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch {}
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`group relative grid size-11 place-items-center overflow-hidden rounded-full border border-current/25 transition-all duration-400 hover:border-current hover:bg-surface/50 ${className}`}
      data-cursor=""
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.span
            key="sun"
            initial={{ y: 12, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -12, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute"
          >
            <SunIcon />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ y: 12, opacity: 0, rotate: 90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -12, opacity: 0, rotate: -90 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute"
          >
            <MoonIcon />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
