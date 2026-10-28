import { skills } from '@/data/skills';

/** What I use, grouped by what it's for. Static: structure carries the meaning. */
export default function Capabilities() {
  return (
    <section aria-labelledby="skills-title" className="pb-28 md:pb-44">
      <div className="container-x">
        <h2 id="skills-title" className="t-h2">What I work with</h2>
        <dl className="mt-14 border-t border-line">
          {skills.map(({ group, items }) => (
            <div
              key={group}
              className="grid gap-4 border-b border-line py-8 transition-colors duration-500 hover:bg-surface md:grid-cols-[1fr_2.2fr] md:gap-16 md:px-4"
            >
              <dt className="t-h3">{group}</dt>
              <dd className="flex flex-wrap gap-x-6 gap-y-2 self-center text-lg md:text-xl">
                {items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
