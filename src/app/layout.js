import "@fontsource-variable/bricolage-grotesque/wdth.css";
import "@fontsource-variable/newsreader/wght.css";
import "./globals.css";

import SmoothScroll from "@/components/providers/SmoothScroll";
import TransitionProvider from "@/components/providers/TransitionProvider";
import Preloader from "@/components/layout/Preloader";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/layout/Cursor";
import JsonLd from "@/components/seo/JsonLd";
import { site } from "@/data/site";

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s – ${site.name}` },
  description: site.description,
  applicationName: `${site.name} Portfolio`,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "frontend developer",
    "React developer",
    "Next.js developer",
    "creative developer",
    "GSAP",
    "Framer Motion",
    "portfolio",
    site.name,
    site.nickname,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: `${site.name} Portfolio`,
    title: site.title,
    description: site.description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EEEDF8" },
    { media: "(prefers-color-scheme: dark)", color: "#0E0F2E" },
  ],
};

/** Runs before first paint: picks the theme and decides whether to show the intro. */
const initScript = `(function(){var d=document.documentElement,t='light',i='off';try{
var s=localStorage.getItem('theme');
t=s||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
if(!sessionStorage.getItem('intro-seen')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)i='on';
}catch(e){}d.dataset.theme=t;d.dataset.intro=i;})();`;

/** If JavaScript is off, make sure nothing stays hidden by an entrance animation. */
const noscriptCss = `.split-word{transform:none!important}.preloader{display:none!important}body{overflow:auto!important}`;

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.nickname,
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressCountry: "IN" },
  sameAs: site.socials.map((s) => s.href),
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "GSAP",
    "Framer Motion",
    "Tailwind CSS",
    "Node.js",
    "MongoDB",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
        <noscript>
          <style>{noscriptCss}</style>
        </noscript>
      </head>
      <body cz-shortcut-listen="true">
        <SmoothScroll>
          <TransitionProvider>
            <a
              href="#main"
              className="fixed left-4 top-4 z-[200] -translate-y-24 rounded-full bg-ink px-5 py-3 text-mist focus:translate-y-0"
            >
              Skip to content
            </a>
            <Preloader />
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <Cursor />
          </TransitionProvider>
        </SmoothScroll>
        <JsonLd data={person} />
      </body>
    </html>
  );
}
