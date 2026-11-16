import Image from 'next/image';
import TransitionLink from '@/components/ui/TransitionLink';
import ProjectArt from './ProjectArt';

const face = { backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' };


export default function StageCard({ project }) {
  return (
    <div
      className="wk-card absolute left-1/2 top-1/2"
      style={{ width: 'var(--cw)', aspectRatio: '4 / 4', transformStyle: 'preserve-3d' }}
    >
      {/* ── Front face ── */}
      <div className="absolute inset-0 overflow-hidden rounded-[1.75rem]" style={face}>
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="min(28vw, 380px)"
            className="object-cover"
          />
        ) : (
          <ProjectArt project={project} />
        )}

        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.55) 38%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-xs font-medium uppercase tracking-widest text-white/70">
            {project.kind}
          </p>
          <h3 className="mt-1 text-[1.15rem] font-bold leading-tight tracking-tight text-white">
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
          <p className="text-[0.7rem] font-medium uppercase tracking-widest text-mist/50">
            {project.year} · {project.role}
          </p>
          <h3 className="mt-2 text-[1.15rem] font-bold leading-tight tracking-tight">
            {project.title}
          </h3>
          <p className="mt-3 line-clamp-4 text-[0.8rem] leading-relaxed text-mist/75">
            {project.summary}
          </p>
        </div>

        <div className="mt-4 shrink-0 border-t border-mist/10 pt-4">
          <p className="line-clamp-1 text-[0.7rem] text-mist/40">
            {project.stack.join(' · ')}
          </p>
          <TransitionLink
            href={`/work/${project.slug}`}
            label={project.title}
            data-cursor="View"
            className="link-u mt-3 inline-block text-sm font-semibold text-pop"
          >
            Read the case study ↗
          </TransitionLink>
        </div>
      </div>
    </div>
  );
}
