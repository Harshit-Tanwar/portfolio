'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Accordion from '@/components/ui/Accordion';
import { experience } from '@/data/experience';
import { fadeUp } from '@/lib/motion';

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  return (
    <section id="experience" aria-labelledby="exp-title" className="pb-28 md:pb-44">
      <div className="container-x">
        <motion.div
          ref={ref}
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="flex items-end justify-between gap-6 border-line pb-10"
        >
          <h2 id="exp-title" className="t-h2">Experience</h2>
          <p className="hidden text-sm text-muted md:block">{experience.length} entries</p>
        </motion.div>

        <motion.div
          variants={fadeUp(0.1)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mt-2"
        >
          <Accordion items={experience} defaultOpen={1} />
        </motion.div>
      </div>
    </section>
  );
}
