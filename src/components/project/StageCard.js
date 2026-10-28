import TransitionLink from '@/components/ui/TransitionLink';
import ProjectArt from './ProjectArt';

const face = { backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' };

/**
 * One card in the pinned desktop sequence. Front shows the artwork,
 * the back (revealed by the GSAP flip) carries the details and link.
 * GSAP positions it; see sections/Work.js.
 */
export default function StageCard({ project }) {
  return (
    <div
      className="wk-card absolute left-1/2 top-1/2"
      style={{ width: 'var(--cw)', aspectRatio: '3 / 4', transformStyle: 'preserve-3d' }}
    >
      <div className="absolute inset-0 overflow-hidden rounded-[1.75rem]" style={face}>
        <ProjectArt project={project} />
        <div className="absolute inset-x-0 bottom-0 p-5" style={{ color: project.art.fg }}>
          <p className="text-sm opacity-75">{project.kind}</p>
          <h3 className="t-h3 mt-1">{project.title}</h3>
        </div>
      </div>

      <div
        className="absolute inset-0 flex flex-col justify-between rounded-[1.75rem] bg-ink p-6 text-mist"
        style={{ ...face, transform: 'rotateY(180deg)' }}
      >
        <div>
          <p className="text-sm text-mist/60">{project.year}, {project.role}</p>
          <h3 className="t-h3 mt-3">{project.title}</h3>
          <p className="mt-4 text-[0.95rem] leading-snug text-mist/80">{project.summary}</p>
        </div>
        <div>
          <p className="mb-5 text-sm text-mist/60">{project.stack.join(', ')}</p>
          <TransitionLink
            href={`/work/${project.slug}`}
            label={project.title}
            data-cursor="View"
            className="link-u inline-block text-lg font-medium text-pop"
          >
            Read the case study
          </TransitionLink>
        </div>
      </div>
    </div>
  );
}
