import SplitText from '@/components/ui/SplitText';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-28">
      <div className="container-x grid gap-12 md:grid-cols-[1fr_2.2fr] md:gap-16">
        <h2 id="about-title" className="text-xl font-medium">About</h2>

        <div>
          <SplitText as="p" className="t-statement">
            {'I’m Harshit, though most people call me Flames. I build the frontend of products and care most about the parts people feel: type, spacing and motion.'}
          </SplitText>

          <div className="mt-14 grid gap-8 md:grid-cols-2 md:gap-14">
            <p className="t-prose">
              I work across the stack with React and Next.js at the centre. I studied for an MCA at Devi Ahilya University in Indore and learned production frontend work during an internship at Bytebudz.
            </p>
            <p className="t-prose">
              The sites that shaped my taste are studio work like Lusion, Locomotive and Resn, where scrolling is the main interaction. Most of my side projects chase that: scroll-driven sequences, frame-by-frame canvas playback, and animation that stays smooth on ordinary phones.
            </p>
          </div>

          <dl className="mt-14 grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
            <div>
              <dt className="text-muted">Looking at right now</dt>
              <dd className="mt-1 text-lg">Scroll-driven animation and frame sequences</dd>
            </div>
            <div>
              <dt className="text-muted">Looking for</dt>
              <dd className="mt-1 text-lg">A frontend role on a team that cares about craft</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
