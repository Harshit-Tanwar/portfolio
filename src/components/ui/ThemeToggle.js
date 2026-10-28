'use client';

import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from './Icons';

/** Light/dark switch. The initial value is set by the inline head script (no flash). */
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
      className={`grid size-11 place-items-center rounded-full border border-current/25 transition-colors hover:border-current ${className}`}
      data-cursor=""
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
