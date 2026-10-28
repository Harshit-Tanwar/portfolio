import Button from '@/components/ui/Button';
import SplitText from '@/components/ui/SplitText';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <section className="container-x flex min-h-svh flex-col justify-center pb-16 pt-32">
      <p className="text-muted">Error 404</p>
      <SplitText as="h1" trigger="intro" delay={0.4} className="t-display mt-4">
        {'That page\ndoesn’t exist.'}
      </SplitText>
      <p className="t-prose mt-8">The link may be broken or the page may have moved.</p>
      <div className="mt-10">
        <Button href="/" label="Home">Back to the homepage</Button>
      </div>
    </section>
  );
}
