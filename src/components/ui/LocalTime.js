'use client';

import { useEffect, useState } from 'react';
import { site } from '@/data/site';

/** Live local time for the site owner. Renders after mount to avoid hydration drift. */
export default function LocalTime({ className }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-IN', {
      hour: 'numeric', minute: '2-digit', hour12: true, timeZone: site.timezone,
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  return <span className={className}>{time ? `It’s ${time} for me` : '\u00A0'}</span>;
}
