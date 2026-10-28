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
    openGraph: { type: 'article', url, title: `${project.title} – ${site.name}`, description: project.summary },
    twitter: { title: `${project.title} – ${site.name}`, description: project.summary },
  };
}

function Block({ title, children }) {
  return (
    <section className="grid gap-6 border-t border-line py-14 md:grid-cols-[1fr_2.2fr] md:gap-16 md:py-20">
      <h2 className="t-h3 md:sticky md:top-28 md:self-start">{title}</h2>
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

      <header className="container-x pt-36 md:pt-48">
        <p className="text-muted">{project.kind}</p>
        <SplitText as="h1" trigger="intro" delay={0.55} className="t-display mt-4">
          {project.title}
        </SplitText>
        <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 md:grid-cols-3">
          {meta.map(([k, v]) => (
            <div key={k}>
              <dt className="text-muted">{k}</dt>
              <dd className="mt-1 text-lg">{v}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="container-x mt-16">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] md:aspect-[21/10]">
          <ProjectArt project={project} />
        </div>
      </div>

      <div className="container-x mt-20 md:mt-28">
        <Block title="Overview"><p className="t-prose">{project.overview}</p></Block>
        <Block title="The problem"><p className="t-prose">{project.challenge}</p></Block>
        <Block title="How I approached it">
          <ol className="space-y-10">
            {project.approach.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-4">
                <span className="t-h3 text-accent-text">{i + 1}</span>
                <div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="t-prose mt-2">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Block>
        <Block title="Where it landed"><p className="t-prose">{project.outcome}</p></Block>
      </div>

      <section aria-label="Next case study" className="mt-10">
        <TransitionLink
          href={`/work/${next.slug}`}
          label={next.title}
          data-cursor="Next"
          className="group block bg-stage py-24 text-mist transition-colors duration-500 hover:bg-ink md:py-36"
        >
          <div className="container-x">
            <p className="text-mist/70">Next case study</p>
            <p className="t-display mt-4">{next.title}</p>
          </div>
        </TransitionLink>
      </section>
    </article>
  );
}
