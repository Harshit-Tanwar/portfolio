/**
 * Single source of truth for site-wide content.
 * TODO: replace the placeholder email and social URLs before launch.
 */
export const site = {
  name: 'Harshit Tanwar',
  nickname: 'Harshit',
  role: 'Frontend-focused full-stack developer',
  title: 'Harshit Tanwar – Frontend Developer',
  description:
    'Portfolio of Harshit Tanwar (Flames), a frontend-focused full-stack developer building fast, motion-driven interfaces with React and Next.js.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  email: 'hello@example.com', // TODO: your real email
  location: 'India',
  timezone: 'Asia/Kolkata',
  socials: [
    { label: 'GitHub', href: 'https://github.com/your-handle' }, // TODO
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/your-handle' }, // TODO
  ],
  nav: [
    { label: 'Work', href: '/#work' },
    { label: 'About', href: '/#about' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Contact', href: '/#contact' },
  ],
};
