import Accordion from '@/components/ui/Accordion';
import { experience } from '@/data/experience';

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="exp-title" className="pb-28 md:pb-44">
      <div className="container-x">
        <h2 id="exp-title" className="t-h2">Experience</h2>
        <div className="mt-14">
          <Accordion items={experience} defaultOpen={1} />
        </div>
      </div>
    </section>
  );
}
