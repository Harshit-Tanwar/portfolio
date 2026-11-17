'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SplitText from '@/components/ui/SplitText';
import { ease, fadeUp } from '@/lib/motion';

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' });

  return (
    <section id="about" aria-labelledby="about-title" className="py-28 md:py-40">
      <div className="container-x grid gap-12 md:grid-cols-[1fr_2.2fr] md:gap-16">

        <motion.h2
          id="about-title"
          ref={ref}
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="text-xl font-medium"
        >
          About
        </motion.h2>

        <div>
          <SplitText as="p" className="t-statement">
            {'I’m Harshit Tanwar. I build the frontend of products and care most about the parts people feel: type, spacing and motion.'}
          </SplitText>

          <div className="mt-14 grid gap-8 md:grid-cols-2 md:gap-14">
            <motion.p
              variants={fadeUp(0.1)}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="t-prose"
            >
              I work across the stack with React and Next.js at the centre. I studied for an MCA at Devi Ahilya University in Indore and learned production frontend work during an internship at Bytebudz.
            </motion.p>
            <motion.p
              variants={fadeUp(0.18)}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="t-prose"
            >
              The sites that shaped my taste are studio work like Lusion, Locomotive and Resn, where scrolling is the main interaction. Most of my side projects chase that: scroll-driven sequences, frame-by-frame canvas playback, and animation that stays smooth on ordinary phones.
            </motion.p>
          </div>

          <motion.dl
            variants={fadeUp(0.26)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="mt-14 grid gap-6 border-t border-line pt-8 sm:grid-cols-2"
          >
            <div>
              <dt className="text-muted text-sm">Looking at right now</dt>
              <dd className="mt-1.5 text-lg font-medium">Scroll-driven animation and frame sequences</dd>
            </div>
            <div>
              <dt className="text-muted text-sm">Looking for</dt>
              <dd className="mt-1.5 text-lg font-medium">A frontend role on a team that cares about craft</dd>
            </div>
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
