import { notFound } from 'next/navigation';
import SplitText from '@/components/ui/SplitText';
import TransitionLink from '@/components/ui/TransitionLink';
import ProjectArt from '@/components/project/ProjectArt';
import JsonLd from '@/components/seo/JsonLd';
import { projects, getProject, getNextProject } from '@/data/projects';
import { site } from '@/data/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const url = `/work/${project.slug}`;
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: `${project.title} – ${site.name}`,
      description: project.summary,
    },
    twitter: {
      title: `${project.title} – ${site.name}`,
      description: project.summary,
    },
  };
}

/** Two-column section block: sticky label left, content right. */
function Block({ title, children }) {
  return (
    <section className="grid gap-6 border-t border-line py-12 md:grid-cols-[1fr_2.2fr] md:gap-12 md:py-16">
      <h2 className="t-h3 text-muted md:sticky md:top-28 md:self-start">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(slug);

  const meta = [
    ['Role', project.role],
    ['Year', project.year],
    ['Built with', project.stack.join(', ')],
  ];

  const projectLinks = (project.links ?? []).filter(
    ({ href }) => href && href !== 'https://harshittanwar.netlify.app/#'
  );

  return (
    <article>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.title,
          description: project.summary,
          url: `${site.url}/work/${project.slug}`,
          dateCreated: project.year,
          creator: { '@type': 'Person', name: site.name },
          keywords: project.stack.join(', '),
        }}
      />

      {/* Header */}
      <header className="container-x pt-28 md:pt-36">
        <p className="t-label text-muted">{project.kind}</p>
        <SplitText as="h1" trigger="intro" delay={0.55} className="t-display mt-4">
          {project.title}
        </SplitText>

        {/* Meta grid */}
        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-6 md:grid-cols-3">
          {meta.map(([k, v]) => (
            <div key={k}>
              <dt className="text-xs font-semibold uppercase tracking-widest text-muted">{k}</dt>
              <dd className="mt-2 text-base font-medium leading-snug">{v}</dd>
            </div>
          ))}
        </dl>

        {/* External links */}
        {projectLinks.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {projectLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${link.label} for ${project.title} in a new tab`}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition-all duration-300 hover:bg-fg hover:text-canvas focus-visible:bg-fg focus-visible:text-canvas"
              >
                {link.label}
                <span aria-hidden="true" className="text-xs">↗</span>
              </a>
            ))}
          </div>
        )}
      </header>

      <div className="container-x mt-10">
        <div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-[1.5rem] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.25)] md:aspect-[16/8]">
          <ProjectArt project={project} sizes="(min-width: 1056px) 1024px, calc(100vw - 40px)" />
        </div>
      </div>

      <div className="container-x mt-12 md:mt-16">
        <Block title="Overview">
          <p className="t-prose">{project.overview}</p>
        </Block>

        <Block title="The problem">
          <p className="t-prose">{project.challenge}</p>
        </Block>

        <Block title="How I approached it">
          <ol className="space-y-10">
            {project.approach.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-4">
                <span className="t-h3 tabular-nums text-accent-text">{i + 1}</span>
                <div>
                  <h3 className="text-xl font-semibold leading-snug">{step.title}</h3>
                  <p className="t-prose mt-3">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Block>

        <Block title="Where it landed">
          <p className="t-prose">{project.outcome}</p>
        </Block>
      </div>

      {/* Next case study */}
      <section aria-label="Next case study" className="mt-16">
        <TransitionLink
          href={`/work/${next.slug}`}
          label={next.title}
          data-cursor="Next"
          className="group block bg-stage py-12 text-mist transition-colors duration-500 hover:bg-ink md:py-20"
        >
          <div className="container-x flex items-end justify-between gap-6">
            <div>
              <p className="t-label text-mist/40">Next case study</p>
              <p className="t-h2 mt-3 transition-colors duration-300 group-hover:text-pop">
                {next.title}
              </p>
            </div>
            <span
              aria-hidden="true"
              className="hidden shrink-0 text-5xl text-mist/20 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:-translate-y-1 group-hover:text-pop/60 md:block"
            >
              ↗
            </span>
          </div>
        </TransitionLink>
      </section>
    </article>
  );
}
