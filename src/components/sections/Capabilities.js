'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '@/data/skills';
import { ease, fadeUp } from '@/lib/motion';

function SkillRow({ group, items, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' });

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: ease.out, delay: index * 0.08 },
        },
      }}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className="group grid gap-4 border-b border-line py-8 transition-colors duration-500 hover:bg-surface md:grid-cols-[1fr_2.2fr] md:gap-16 md:px-5 rounded-lg"
    >
      <div className="flex items-start justify-between gap-4 md:flex-col md:justify-start md:gap-2">
        <dt className="t-h3">{group}</dt>
        <span className="mt-0.5 inline-block rounded-full bg-line/60 px-2.5 py-0.5 text-xs font-semibold text-muted tabular-nums md:mt-0">
          {String(items.length).padStart(2, '0')}
        </span>
      </div>
      <dd className="flex flex-wrap gap-x-3 gap-y-2.5 self-center">
        {items.map((item, i) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: ease.out, delay: index * 0.08 + 0.2 + i * 0.04 }}
            className="group/tag inline-flex items-center rounded-full border border-line px-4 py-1.5 text-sm font-medium transition-all duration-400 hover:border-accent hover:bg-accent hover:text-on-accent cursor-default"
          >
            {item}
          </motion.span>
        ))}
      </dd>
    </motion.div>
  );
}

export default function Capabilities() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: '0px 0px -10% 0px' });

  return (
    <section aria-labelledby="skills-title" className="pb-28 md:pb-44">
      <div className="container-x">
        <motion.div
          ref={headRef}
          variants={fadeUp(0)}
          initial="hidden"
          animate={headInView ? 'show' : 'hidden'}
          className="flex items-end justify-between gap-6 border-b border-line pb-10"
        >
          <h2 id="skills-title" className="t-h2">What I work with</h2>
          {/* <p className="hidden text-sm text-muted md:block">{skills.length} categories</p> */}
        </motion.div>

        <dl className="mt-2">
          {skills.map(({ group, items }, i) => (
            <SkillRow key={group} group={group} items={items} index={i} />
          ))}
        </dl>
      </div>
    </section>
  );
}
