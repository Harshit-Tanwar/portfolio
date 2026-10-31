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
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <footer id="contact" className="relative overflow-hidden bg-ink text-mist">
      {/* Ambient glow */}
      {/* <div
        aria-hidden="true"
        className="pointer-events-none absolute top-32 left-1/2 h-80 w-96 -translate-x-1/2 rounded-full bg-accent/20 blur-[100px]"
      /> */}

      <div ref={ref} className="container-x relative z-10 pb-10 pt-28 md:pt-40">

        {/* Big CTA */}
        <motion.p
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="t-label mb-8 text-mist/40"
        >
          Get in touch
        </motion.p>

        <SplitText as="h2" className="t-display max-w-[14ch]" stagger={0.045}>
          {'Have a role or a project in mind?'}
        </SplitText>

        {/* Email — skew distortion on hover */}
        <div className="mt-14 overflow-hidden">
          <motion.a
            href={`mailto:${site.email}`}
            data-cursor="Write"
            className="inline-block break-all font-semibold leading-none"
            style={{
              fontSize: 'clamp(1.6rem, 5vw, 4.5rem)',
              fontStretch: '85%',
            }}
            onHoverStart={() => setEmailHover(true)}
            onHoverEnd={() => setEmailHover(false)}
            animate={{
              skewX: emailHover ? -4 : 0,
              x: emailHover ? 12 : 0,
              color: emailHover ? 'var(--pop)' : 'var(--mist)',
            }}
            transition={{ duration: 0.4, ease: ease.out }}
          >
            {site.email}
          </motion.a>
        </div>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp(0.15)}
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
          transition={{ duration: 1.2, ease: ease.out, delay: 0.3 }}
        />

        {/* Bottom bar */}
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mt-8 flex flex-col gap-6 text-mist/50 md:flex-row md:items-center md:justify-between"
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
            <LocalTime className="text-sm" />
          </motion.div>

          <motion.button
            variants={fadeUp(0)}
            type="button"
            onClick={() => scrollTo(0)}
            data-cursor=""
            className="group flex w-fit items-center gap-2 text-sm transition-colors duration-300 hover:text-mist"
          >
            <span className="inline-block transition-transform duration-400 group-hover:-translate-y-0.5">↑</span>
            Back to top
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}
