import TransitionLink from '@/components/ui/TransitionLink';
import ProjectArt from './ProjectArt';

/** Static project card used on mobile, tablets and for reduced motion. */
export default function ListCard({ project }) {
  return (
    <li>
      <TransitionLink href={`/work/${project.slug}`} label={project.title} className="group block" data-cursor="View">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
          <ProjectArt project={project} className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
        </div>
        <div className="mt-5 flex items-baseline justify-between gap-4">
          <h3 className="t-h3">{project.title}</h3>
          <span className="text-mist/70">{project.year}</span>
        </div>
        <p className="mt-2 max-w-md text-mist/80">{project.summary}</p>
      </TransitionLink>
    </li>
  );
}
