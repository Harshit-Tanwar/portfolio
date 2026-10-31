'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import StageCard from '@/components/project/StageCard';
import ListCard from '@/components/project/ListCard';
import CaseStudyIndex from '@/components/project/CaseStudyIndex';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Work({ projects }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const stage = root.current.querySelector('.wk-stage');
        const cards = gsap.utils.toArray('.wk-card', stage);
        const mid = (cards.length - 1) / 2;
        const cardWidth = () => cards[0].offsetWidth;

        gsap.set(cards, { xPercent: -50, yPercent: -50, transformPerspective: 1600, zIndex: (i) => i });
        gsap.set(cards, { x: 0, y: (i) => i * -6, rotation: (i) => (i - mid) * 2, scale: 0.94 });

        gsap.fromTo(
          '.wk-flood',
          { clipPath: 'circle(0px at 80% 0px)' },
          {
            clipPath: () => `circle(${Math.hypot(stage.offsetWidth, stage.offsetHeight) * 1.05}px at 80% 0px)`,
            ease: 'none',
            scrollTrigger: { trigger: stage, start: 'top 100%', end: 'top 25%', scrub: true, invalidateOnRefresh: true },
          }
        );
        gsap.fromTo(
          '.wk-content',
          { opacity: 0 },
          { opacity: 1, ease: 'none', scrollTrigger: { trigger: stage, start: 'top 55%', end: 'top 5%', scrub: true } }
        );

        const tl = gsap.timeline({
          defaults: { ease: 'power3.inOut' },
          scrollTrigger: {
            trigger: stage, start: 'top top', end: '+=320%',
            pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true,
          },
        });

        tl.to(cards, {
          rotation: (i) => (i - mid) * 11, x: (i) => (i - mid) * 70, y: (i) => Math.abs(i - mid) * 36,
          scale: 1, duration: 1,
        }, 0)
          .to('.wk-hint', { opacity: 0, duration: 0.4 }, 0.2)
          .to(cards, { rotation: 0, x: (i) => (i - mid) * cardWidth() * 1.1, y: 0, duration: 1 }, 1.3)
          .to(cards, { rotationY: 180, duration: 1, stagger: 0.14 }, 2.7)
          .fromTo('.wk-progress', { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 4 }, 0);
      });
    },
    { scope: root }
  );

  return (
    <section id="work" ref={root} aria-label="Selected work">
      {/* Desktop: pinned stage + case-study index */}
      <div className="wk-desktop">
        <div className="wk-stage relative h-svh overflow-hidden text-mist" style={{ '--cw': 'min(22vw, 340px, 36svh)' }}>
          <div className="wk-flood absolute inset-0 bg-stage" aria-hidden="true" />
          <div className="wk-content relative z-10 flex h-full flex-col">
            <div className="container-x flex items-end justify-between pt-28">
              <h2 className="t-h3">Selected work</h2>
              <p className="wk-hint text-mist/80">Keep scrolling and the cards spread out</p>
            </div>
            <div className="relative flex-1">
              {projects.map((p) => (
                <StageCard key={p.slug} project={p} />
              ))}
            </div>
            <div className="container-x pb-8">
              <div className="h-[3px] bg-mist/20">
                <div className="wk-progress h-full origin-left bg-pop" />
              </div>
            </div>
          </div>
        </div>
        <CaseStudyIndex projects={projects} />
      </div>

      {/* Mobile, tablet, reduced motion */}
      <div className="wk-list bg-stage py-24 text-mist">
        <div className="container-x">
          <h2 className="t-h2">Selected work</h2>
          <ul className="mt-14 grid gap-16 md:grid-cols-2">
            {projects.map((p, i) => (
              <ListCard key={p.slug} project={p} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
