/**
 * Flat geometric artwork per project, drawn in SVG. No image requests,
 * crisp at any size. Swap for real screenshots via next/image when ready.
 * The wrapper owns the background so the art can letterbox in any ratio.
 */
function Strip({ fg, accent }) {
  // A filmstrip of frames, one of them lit: the scrubbed sequence.
  return Array.from({ length: 28 }).map((_, i) => {
    const r = Math.floor(i / 4);
    const c = i % 4;
    const lit = i === 13;
    return (
      <rect key={i} x={26 + c * 66} y={36 + r * 48} width={56} height={36} rx={5}
        fill={lit ? accent : 'none'} stroke={fg} strokeWidth="2.5" opacity={lit ? 1 : 0.5} />
    );
  });
}

function Fan({ fg, accent }) {
  // Three cards fanned from a shared pivot.
  return [-26, 0, 26].map((a, i) => (
    <rect key={a} x="92" y="80" width="116" height="168" rx="14"
      fill={i === 1 ? accent : 'none'} stroke={fg} strokeWidth="2.5"
      transform={`rotate(${a} 150 290)`} />
  ));
}

function Accordion({ fg, accent }) {
  // Collapsed rows with one open.
  const rows = [[34, 38], [84, 38], [134, 130], [276, 38], [326, 38]];
  return (
    <>
      {rows.map(([y, h], i) => (
        <rect key={y} x="30" y={y} width="240" height={h} rx="12"
          fill={i === 2 ? accent : 'none'} stroke={fg} strokeWidth="2.5" />
      ))}
      <line x1="52" y1="184" x2="200" y2="184" stroke={fg} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="52" y1="208" x2="238" y2="208" stroke={fg} strokeWidth="2.5" strokeLinecap="round" opacity=".6" />
      <line x1="52" y1="232" x2="170" y2="232" stroke={fg} strokeWidth="2.5" strokeLinecap="round" opacity=".6" />
    </>
  );
}

const shapes = { strip: Strip, fan: Fan, accordion: Accordion };

export default function ProjectArt({ project, className = '' }) {
  const { shape, bg, fg, accent } = project.art;
  const Shape = shapes[shape] ?? Strip;
  return (
    <div className={`absolute inset-0 ${className}`} style={{ background: bg }} aria-hidden="true">
      <svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid meet" className="h-full w-full">
        <Shape fg={fg} accent={accent} />
      </svg>
    </div>
  );
}
