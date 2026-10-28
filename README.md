# Flames — Portfolio

Next.js (App Router, JavaScript) · Tailwind CSS v4 · GSAP + ScrollTrigger · Framer Motion · Lenis

## Run it

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL to your real domain
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Before you launch (placeholders to replace)

| What | Where |
|---|---|
| Email, GitHub, LinkedIn | `src/data/site.js` |
| Project copy, results, links | `src/data/projects.js` (add real metrics to each `outcome`) |
| Experience dates and detail | `src/data/experience.js` |
| Site URL (canonical, sitemap, OG) | `.env.local` → `NEXT_PUBLIC_SITE_URL` |
| Project visuals | `ProjectArt.js` draws flat SVG art; swap for screenshots with `next/image` when ready |

## Structure

```
src/
  app/                    routes, metadata, sitemap, robots, OG image
    work/[slug]/page.js   case-study template (static, from data)
  components/
    providers/            SmoothScroll (Lenis + GSAP) · TransitionProvider (page curtain)
    layout/               Header · Footer/Contact · Preloader · Cursor
    sections/             Hero · Work (pinned sequence) · About · Capabilities · Experience
    project/              ProjectArt · StageCard · ListCard · CaseStudyIndex
    ui/                   Button · Magnetic · SplitText · Accordion · TransitionLink · ThemeToggle
    seo/                  JsonLd
  data/                   all content (site, projects, skills, experience)
  hooks/ lib/             useMediaQuery · motion tokens · utils
```

## Design system

Palette "Ultramarine": Mist `#EEEDF8`, Indigo ink `#14143A`, Ultramarine `#3B3BFF`, Marigold `#FFB800`.
Tokens live in `src/app/globals.css` (`:root` and `[data-theme="dark"]`) and are exposed to Tailwind
as `bg-canvas`, `text-fg`, `text-muted`, `border-line`, `bg-accent`, `bg-pop`, `bg-stage`, `bg-ink`, `text-mist`.
Type: Bricolage Grotesque (display and UI, variable weight and width) and Newsreader (reading text), both self-hosted via Fontsource.
Motion tokens (`src/lib/motion.js`) keep GSAP and Framer Motion on the same easing.

## How the motion is split

- **GSAP**: everything scroll-scrubbed (the pinned fan, spread and flip sequence, the colour flood, hero parallax).
- **Framer Motion**: everything UI-driven (page-transition curtain, preloader, menu, accordion, cursor, magnetic buttons, hover preview).
- **Lenis**: smooth scrolling, driven by GSAP's ticker so there is a single animation loop.

## Performance and accessibility notes

- Only `transform`, `opacity` and `clip-path` are animated. Pages are statically generated.
- No image requests for project art (inline SVG); fonts are self-hosted with `font-display: swap`.
- The pinned sequence runs only at 1024px and up with motion allowed; everything else gets a plain list (chosen in CSS, no JS flash).
- `prefers-reduced-motion`: no smooth scroll, no preloader, no pinning, near-instant transitions.
- Skip link, visible focus rings, labelled landmarks, keyboard-operable menu and accordion, `inert` on collapsed panels.
- SEO: metadata API, canonical URLs, Open Graph and Twitter cards, generated OG image, sitemap, robots, Person and CreativeWork JSON-LD.
