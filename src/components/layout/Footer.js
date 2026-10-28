'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import SplitText from '@/components/ui/SplitText';
import LocalTime from '@/components/ui/LocalTime';
import { useSmoothScroll } from '@/components/providers/SmoothScroll';
import { site } from '@/data/site';

/** Global footer and contact section; the "Contact" nav item scrolls here. */
export default function Footer() {
  const [copied, setCopied] = useState(false);
  const { scrollTo } = useSmoothScroll();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <footer id="contact" className="bg-ink text-mist">
      <div className="container-x pb-8 pt-28 md:pt-40">
        <SplitText as="h2" className="t-display max-w-[14ch]">{'Have a role or a project in mind?'}</SplitText>

        <a
          href={`mailto:${site.email}`}
          data-cursor="Write"
          className="link-u mt-14 inline-block break-all text-[clamp(1.6rem,5vw,4.5rem)] font-semibold leading-none"
          style={{ fontStretch: '85%' }}
        >
          {site.email}
        </a>

        <div className="mt-10 flex flex-wrap gap-3" role="group" aria-label="Contact actions">
          <Button variant="light" href={`mailto:${site.email}`}>Send an email</Button>
          <Button variant="outline-light" onClick={copy}>{copied ? 'Copied to clipboard' : 'Copy email address'}</Button>
        </div>

        <div className="mt-28 flex flex-col gap-6 border-t border-mist/15 pt-8 text-mist/75 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-u hover:text-mist">{s.label}</a>
              </li>
            ))}
          </ul>
          <LocalTime />
          <button type="button" onClick={() => scrollTo(0)} className="link-u w-fit hover:text-mist" data-cursor="">
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
