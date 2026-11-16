export const projects = [
  {
    slug: "mindquest",
    title: "MindQuest",
    kind: "Interactive quiz platform",
    year: "2025",
    role: "Design and full-stack",
    summary:
      "A timed quiz platform with per-question countdowns, streak tracking, and a three-way power-up system built with race-condition-safe ref guards.",
    stack: ["Next.js", "React", "Tailwind CSS"],
    links: [
      { label: "Live Demo", href: "https://harshittanwar.netlify.app/#" },
      { label: "Source Code", href: "https://harshittanwar.netlify.app/#" },
    ],
    art: { shape: "strip", bg: "#3B3BFF", fg: "#EEEDF8", accent: "#FFB800" },
    overview:
      "MindQuest is a quiz platform where every question carries its own 60-second countdown. Players build streaks, spend gems to unlock challenge rounds, and choose from three mutually exclusive power-ups — each race-condition-safe through ref-based guards that survive rapid re-renders.",
    challenge:
      "Timer logic is deceptively tricky in React: state updates batch asynchronously, so a naive setTimeout can fire after a component unmounts or double-trigger under StrictMode. Power-ups also needed mutual exclusion — activating one had to reliably block the others, even on fast clicks.",
    approach: [
      {
        title: "Refs over state for the countdown engine",
        text: "The active timer handle lives in a ref, not state. This keeps the interval stable across renders and makes teardown in the cleanup function deterministic — no stale closure problems.",
      },
      {
        title: "Single-source power-up state machine",
        text: "All three power-ups share one state atom that tracks the currently active power-up. Any activation first checks the atom; if one is already set, the new call is a no-op. This gives mutual exclusion without locks.",
      },
      {
        title: "Gem gate as a natural pacing mechanic",
        text: "Challenge rounds require a gem balance, so players have to earn access rather than replay infinitely. The gem-gated modal also gave a natural place to surface the post-game summary.",
      },
    ],
    outcome:
      "A polished quiz experience where the timer, streaks, and power-ups all feel reliable under fast interaction. The Swiper-powered carousels and gem system add replay value without making the UI feel cluttered.",
  },
  {
    slug: "design-drama",
    title: "Design Drama",
    kind: "Creative Agency Website",
    year: "2026",
    role: "Frontend Development",
    summary:
      "A fully responsive creative agency website featuring immersive animations, interactive elements, and fluid transitions designed to create an engaging browsing experience.",
    stack: ["React", "JavaScript", "GSAP", "Framer Motion", "Lenis", "CSS"],
    links: [{ label: "Live Website", href: "https://designdrama.co/" }],
    art: {
      shape: "strip",
      bg: "#171717",
      fg: "#FFFFFF",
      accent: "#FF5C35",
    },
    overview:
      "Design Drama is a creative agency website built to showcase the company’s services, work, and creative identity through an engaging digital experience. I developed the complete frontend, combining responsive layouts with interactive animations and motion-driven elements to bring the design to life.",
    challenge:
      "The main challenge was creating a visually engaging experience without compromising usability or performance. Each animation needed to feel intentional and fluid while maintaining consistent behavior across different screen sizes and devices.",
    approach: [
      {
        title: "Interactive cursor and hover effects",
        text: "Implemented a custom glow cursor and interactive hover states to add depth and responsiveness to the browsing experience.",
      },
      {
        title: "Motion-driven UI components",
        text: "Developed flip-card interactions, falling pill-text animations, and other custom motion elements to make content transitions more engaging.",
      },
      {
        title: "Smooth transitions and scrolling",
        text: "Integrated scroll-based animations and fluid transitions to create a cohesive visual flow throughout the website.",
      },
      {
        title: "Responsive frontend development",
        text: "Built and optimized layouts across desktop, tablet, and mobile devices, ensuring animations and interactive elements adapt smoothly to different screen sizes.",
      },
    ],
    outcome:
      "Delivered a complete, responsive agency website with custom interactions, smooth animations, and a cohesive visual experience that brings Design Drama’s creative identity to life.",
  },
  {
    slug: "employee-management-system",
    title: "Employee Management System",
    kind: "Role-based enterprise dashboard",
    year: "2025",
    role: "Design and full-stack",
    summary:
      "A role-based employee dashboard with real-time task tracking, category tagging, and localStorage-backed persistence — no backend required.",
    stack: ["React", "JavaScript", "Tailwind CSS", "HTML"],
    links: [
      { label: "Live Demo", href: "https://harshittanwar.netlify.app/#" },
      { label: "Source Code", href: "https://harshittanwar.netlify.app/#" },
    ],
    art: {
      shape: "accordion",
      bg: "#13143D",
      fg: "#EEEDF8",
      accent: "#FFB800",
    },
    overview:
      "A comprehensive employee management platform where admins and employees each see a tailored interface. Admins assign tasks with due dates and category tags; employees track their workload through a live statistics dashboard and color-coded task cards.",
    challenge:
      "Without a backend, state had to survive page refreshes while staying consistent across two very different role views. Task status workflows also needed to feel instant, not like they were writing to storage.",
    approach: [
      {
        title: "localStorage as the persistence layer",
        text: "All task and user data serialises to localStorage on every mutation. A single read on app load rehydrates the full state, so the experience feels continuous even without a server.",
      },
      {
        title: "Role-based rendering from one router",
        text: "The same React tree renders both the admin and employee views. A context value derived from the logged-in user swaps the layout entirely — no duplicated routes or separate entry points.",
      },
      {
        title: "Status workflow as explicit transitions",
        text: "Tasks move through a defined set of statuses (new → in-progress → completed / failed). Each card only shows the transitions valid from its current state, keeping the UI honest about what has actually happened.",
      },
    ],
    outcome:
      "A fully self-contained management tool that works offline and loads instantly. The explicit status workflow reduced confusion about task state, and color-coded cards made priority visible at a glance.",
  },
  {
    slug: "nrk-rasoma",
    title: "NRK Group",
    kind: "Premium Real Estate Webste",
    year: "2026",
    role: "Design and frontend",
    summary:
      "A Real Esatate Website with premium animations, scroll driven rendered cdn images",
    stack: ["React", "Motion", "Cloudinary", "Animaiton"],
    links: [],
    art: { shape: "strip", bg: "#FFB800", fg: "#14143A", accent: "#3B3BFF" },
    overview:
      "NRK Rasoma is a page where the scrollbar is the playback control. Scroll progress maps to a frame index, and a canvas draws the matching frame out of a 1,422-image sequence.",
    challenge:
      "More than a thousand frames is a heavy payload. The sequence has to feel immediate and stay in sync with the scroll position, without the images weighing down the app itself.",
    approach: [
      {
        title: "Draw everything on one canvas",
        text: "Instead of swapping image elements, a single canvas repaints with the frame that matches the current scroll progress. One surface means one thing to keep fast.",
      },
      {
        title: "Move the frames to a CDN",
        text: "The sequence now lives on Cloudinary rather than in the app bundle, so the frames are delivered from edge servers and the page ships lighter.",
      },
      {
        title: "Tie scroll to frames, not time",
        text: "The animation has no timeline of its own. Scrolling faster or slower simply moves through the frames at the same pace as the reader.",
      },
    ],
    outcome:
      "A product page that behaves like a film you control. Moving the frames to a CDN was the biggest single improvement to how quickly it feels ready.",
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);

export const getNextProject = (slug) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};
