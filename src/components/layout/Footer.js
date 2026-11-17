'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Button from '@/components/ui/Button';
import SplitText from '@/components/ui/SplitText';
import LocalTime from '@/components/ui/LocalTime';
import { useSmoothScroll } from '@/components/providers/SmoothScroll';
import { ease, fadeUp } from '@/lib/motion';
import { site } from '@/data/site';

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [emailHover, setEmailHover] = useState(false);
  const { scrollTo } = useSmoothScroll();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -5% 0px' });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <footer id="contact" className="relative overflow-hidden bg-ink text-mist">
 

      <div ref={ref} className="container-x relative z-10 pb-10 pt-28 md:pt-40">

        {/* Label */}
        <motion.p
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="t-label mb-8 text-mist/40"
        >
          Get in touch
        </motion.p>

        {/* Headline */}
        <SplitText as="h2" className="t-display max-w-[14ch]" stagger={0.045}>
          {'Have a role or a project in mind?'}
        </SplitText>

        {/* Email — skew distortion on hover */}
        <motion.div
          variants={fadeUp(0.1)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mt-14 overflow-hidden"
        >
          <motion.a
            href={`mailto:${site.email}`}
            data-cursor="Write"
            aria-label={`Send email to ${site.email}`}
            className="inline-block break-all font-semibold leading-none"
            style={{
              fontSize: 'clamp(1.6rem, 5vw, 4.5rem)',
              fontStretch: '85%',
            }}
            onHoverStart={() => setEmailHover(true)}
            onHoverEnd={() => setEmailHover(false)}
            animate={{
              skewX: emailHover ? -4 : 0,
              x: emailHover ? 14 : 0,
              color: emailHover ? 'var(--pop)' : 'var(--mist)',
            }}
            transition={{ duration: 0.35, ease: ease.out }}
          >
            {site.email}
          </motion.a>
        </motion.div>

        {/* CTA row */}
        <motion.div
          variants={fadeUp(0.18)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mt-10 flex flex-wrap gap-3"
          role="group"
          aria-label="Contact actions"
        >
          <Button variant="light" href={`mailto:${site.email}`}>Send an email</Button>
          <Button variant="outline-light" onClick={copy}>
            {copied ? '✓ Copied!' : 'Copy email'}
          </Button>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="mt-28 h-px bg-mist/10"
          initial={{ scaleX: 0, originX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, ease: ease.out, delay: 0.3 }}
          style={{ transformOrigin: 'left' }}
        />

        {/* Bottom bar */}
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.5 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mt-8 flex flex-col gap-6 text-mist/60 md:flex-row md:items-center md:justify-between"
        >
          <motion.p variants={fadeUp(0)} className="text-sm">
            &copy; {new Date().getFullYear()} {site.name}
          </motion.p>

          <motion.ul variants={fadeUp(0)} className="flex flex-wrap gap-x-8 gap-y-2">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-u text-sm transition-colors duration-300 hover:text-mist"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp(0)}>
            <LocalTime className="text-sm tabular-nums" />
          </motion.div>

          <motion.button
            variants={fadeUp(0)}
            type="button"
            onClick={() => scrollTo(0)}
            data-cursor=""
            aria-label="Back to top"
            className="group flex w-fit items-center gap-2 text-sm transition-colors duration-300 hover:text-mist"
          >
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1"
            >
              ↑
            </span>
            Back to top
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}
