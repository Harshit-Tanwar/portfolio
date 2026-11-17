import TransitionLink from '@/components/ui/TransitionLink';
import ProjectArt from './ProjectArt';

const face = { backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' };

export default function StageCard({ project }) {
  return (
    <div
      className="wk-card absolute left-1/2 top-1/2"
      style={{ width: 'var(--cw)', aspectRatio: '4 / 5', transformStyle: 'preserve-3d' }}
    >
      {/* ── Front face ── */}
      <div className="absolute inset-0 overflow-hidden rounded-[1.75rem]" style={face}>
        <ProjectArt project={project} showImage={false} />

        {/* Gradient overlay — text legibility */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.80) 20%, transparent 72%)' }}
          aria-hidden="true"
        />

        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/60">
            {project.kind}
          </p>
          <h3 className="mt-1.5 text-[1.2rem] font-bold leading-tight tracking-tight text-white">
            {project.title}
          </h3>
        </div>
      </div>

      {/* ── Back face ── */}
      <div
        className="absolute inset-0 flex flex-col overflow-hidden rounded-[1.75rem] bg-ink p-6 text-mist"
        style={{ ...face, transform: 'rotateY(180deg)' }}
      >
        <div className="flex-1 overflow-hidden">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-mist/40">
            {project.year} · {project.role}
          </p>
          <h3 className="mt-2.5 text-[1.2rem] font-bold leading-tight tracking-tight">
            {project.title}
          </h3>
          <p className="mt-3 line-clamp-5 text-[0.9rem] leading-relaxed text-mist/70">
            {project.summary}
          </p>
        </div>

        <div className="mt-4 shrink-0 border-t border-mist/10 pt-4">
          <p className="line-clamp-1 font-mono text-[0.78rem] text-mist/35">
            {project.stack.join(' · ')}
          </p>
          <TransitionLink
            href={`/work/${project.slug}`}
            label={project.title}
            data-cursor="View"
            className="link-u mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-pop"
          >
            Read the case study ↗
          </TransitionLink>
        </div>
      </div>
    </div>
  );
}
