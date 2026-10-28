/**
 * Case-study content. Add a project by appending an object here:
 * the home page, the case-study route, the sitemap and the SEO metadata
 * all read from this file.
 *
 * art.shape: 'strip' | 'fan' | 'accordion'  (see components/project/ProjectArt.js)
 * TODO: add measured results (load time, payload, frame rate) to each outcome.
 */
export const projects = [
  {
    slug: 'nrk-rasoma',
    title: 'NRK Rasoma',
    kind: 'Scroll-driven web page',
    year: '2026',
    role: 'Design and frontend',
    summary:
      'A single page that plays as you scroll: 1,422 frames drawn on a canvas and served from a CDN.',
    stack: ['React', 'Canvas', 'Cloudinary'],
    links: [],
    art: { shape: 'strip', bg: '#FFB800', fg: '#14143A', accent: '#3B3BFF' },
    overview:
      'NRK Rasoma is a page where the scrollbar is the playback control. Scroll progress maps to a frame index, and a canvas draws the matching frame out of a 1,422-image sequence.',
    challenge:
      'More than a thousand frames is a heavy payload. The sequence has to feel immediate and stay in sync with the scroll position, without the images weighing down the app itself.',
    approach: [
      {
        title: 'Draw everything on one canvas',
        text: 'Instead of swapping image elements, a single canvas repaints with the frame that matches the current scroll progress. One surface means one thing to keep fast.',
      },
      {
        title: 'Move the frames to a CDN',
        text: 'The sequence now lives on Cloudinary rather than in the app bundle, so the frames are delivered from edge servers and the page ships lighter.',
      },
      {
        title: 'Tie scroll to frames, not time',
        text: 'The animation has no timeline of its own. Scrolling faster or slower simply moves through the frames at the same pace as the reader.',
      },
    ],
    outcome:
      'A product page that behaves like a film you control. Moving the frames to a CDN was the biggest single improvement to how quickly it feels ready.',
  },
  {
    slug: 'fan-and-flip',
    title: 'Fan and Flip',
    kind: 'Scroll-driven card sequence',
    year: '2026',
    role: 'Design and frontend',
    summary:
      'A pinned section where a deck of cards fans out, separates and flips over as you scroll.',
    stack: ['React', 'Framer Motion', 'CSS 3D'],
    links: [],
    art: { shape: 'fan', bg: '#EEEDF8', fg: '#14143A', accent: '#3B3BFF' },
    overview:
      'Inspired by studio sites like Lusion, this section pins to the screen and tells a three-step story with one deck of cards: fan out, separate, flip.',
    challenge:
      'Scroll-linked motion falls apart quickly: scroll distances run too long, cards of different heights break the rhythm, and the sequence has to work on a phone as well as a wide monitor.',
    approach: [
      {
        title: 'Pin with sticky, animate with transforms',
        text: 'The stage uses position: sticky and every movement is a GPU-composited transform driven by scroll progress, so nothing triggers layout while scrolling.',
      },
      {
        title: 'Shorten the runway',
        text: 'The first version used a 400vh scroll distance, which felt like wading through mud. Tightening it made each phase land when the reader expects it.',
      },
      {
        title: 'Fix card height at the source',
        text: 'Images with height: auto made the cards uneven. Setting a fixed aspect ratio gave the deck a consistent silhouette at every breakpoint.',
      },
    ],
    outcome:
      'A reusable pattern for storytelling with scroll. The same sequence runs on desktop, tablet and mobile through a small breakpoint hook.',
  },
  {
    slug: 'careers-interface',
    title: 'Careers Interface',
    kind: 'Interface components',
    year: '2026',
    role: 'Design and frontend',
    summary:
      'Accordion job listings and a scroll-driven testimonial section, built as reusable pieces.',
    stack: ['React', 'CSS', 'Custom hooks'],
    links: [],
    art: { shape: 'accordion', bg: '#C9C7F5', fg: '#14143A', accent: '#FFB800' },
    overview:
      'A careers page built from small, reusable parts: an accordion for job listings and a testimonial section that responds to scroll.',
    challenge:
      'Accordions usually animate height, which is expensive and jumpy. The listings also needed to stay accessible and open one at a time.',
    approach: [
      {
        title: 'Animate rows, not pixels',
        text: 'Opening a job uses the grid-template-rows trick, moving from 0fr to 1fr, so the browser handles the height change smoothly without measuring content.',
      },
      {
        title: 'One open at a time',
        text: 'A single piece of state controls which listing is open, and the content inside staggers in once the row has made space.',
      },
      {
        title: 'Consolidate the hooks',
        text: 'Repeated scroll and breakpoint logic moved into shared custom hooks, which cut duplication and made each component easier to read.',
      },
    ],
    outcome:
      'A set of components that drop into any page. Cleaner hooks and lighter animation made the interface easier to maintain and smoother to use.',
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);

export const getNextProject = (slug) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};
