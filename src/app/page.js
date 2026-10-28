import Hero from '@/components/sections/Hero';
import Work from '@/components/sections/Work';
import About from '@/components/sections/About';
import Capabilities from '@/components/sections/Capabilities';
import Experience from '@/components/sections/Experience';
import { projects } from '@/data/projects';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Work projects={projects} />
      <About />
      <Capabilities />
      <Experience />
    </>
  );
}
