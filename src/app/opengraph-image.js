import { ImageResponse } from 'next/og';
import { site } from '@/data/site';

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#3B3BFF', color: '#EEEDF8', padding: 72 }}>
        <div style={{ display: 'flex', fontSize: 34, opacity: 0.8 }}>{site.name}, also known as {site.nickname}</div>
        <div style={{ display: 'flex', fontSize: 132, fontWeight: 800, lineHeight: 0.95, letterSpacing: -4 }}>
          I build interfaces that feel considered.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 32 }}>
          <div style={{ width: 28, height: 28, borderRadius: 28, background: '#FFB800' }} />
          {site.role}
        </div>
      </div>
    ),
    size
  );
}
