export default function CourtSVG({ className = '' }: { className?: string }) {
  return (
    <>
      <style>{`
        .court-svg { --court-line: rgba(200,255,0,0.14); --court-line-dim: rgba(200,255,0,0.10); --court-line-bright: rgba(200,255,0,0.18); --court-line-faint: rgba(200,255,0,0.09); --court-line-subtle: rgba(200,255,0,0.08); --court-line-box: rgba(200,255,0,0.04); --court-fill: rgba(200,255,0,0.008); --court-dot: rgba(200,255,0,0.12); }
        [data-theme="light"] .court-svg { --court-line: rgba(90,138,0,0.28); --court-line-dim: rgba(90,138,0,0.20); --court-line-bright: rgba(90,138,0,0.35); --court-line-faint: rgba(90,138,0,0.18); --court-line-subtle: rgba(90,138,0,0.15); --court-line-box: rgba(90,138,0,0.08); --court-fill: rgba(90,138,0,0.02); --court-dot: rgba(90,138,0,0.22); }
      `}</style>
      <svg viewBox="0 0 1068 548" fill="none" className={`court-svg ${className}`}>
        {/* Court surface hint */}
        <rect x="0" y="0" width="1068" height="548" fill="var(--court-fill)"/>
        {/* Outer boundary (doubles) */}
        <rect x="2" y="2" width="1064" height="544" stroke="var(--court-line)" strokeWidth="1.5"/>
        {/* Singles sidelines */}
        <line x1="2" y1="69" x2="1066" y2="69" stroke="var(--court-line-dim)" strokeWidth="1"/>
        <line x1="2" y1="479" x2="1066" y2="479" stroke="var(--court-line-dim)" strokeWidth="1"/>
        {/* Net (dashed) */}
        <line x1="534" y1="2" x2="534" y2="546" stroke="var(--court-line-bright)" strokeWidth="2" strokeDasharray="8 5"/>
        {/* Net posts */}
        <circle cx="534" cy="2" r="4" fill="var(--court-dot)"/>
        <circle cx="534" cy="546" r="4" fill="var(--court-dot)"/>
        {/* Service lines */}
        <line x1="198" y1="69" x2="198" y2="479" stroke="var(--court-line-faint)" strokeWidth="1"/>
        <line x1="870" y1="69" x2="870" y2="479" stroke="var(--court-line-faint)" strokeWidth="1"/>
        {/* Center service line */}
        <line x1="198" y1="274" x2="870" y2="274" stroke="var(--court-line-subtle)" strokeWidth="1"/>
        {/* Center marks */}
        <line x1="2" y1="268" x2="2" y2="280" stroke="var(--court-line)" strokeWidth="2"/>
        <line x1="1066" y1="268" x2="1066" y2="280" stroke="var(--court-line)" strokeWidth="2"/>
        {/* Service boxes */}
        <rect x="198" y="69" width="336" height="205" stroke="var(--court-line-box)" strokeWidth="0.5" fill="none"/>
        <rect x="198" y="274" width="336" height="205" stroke="var(--court-line-box)" strokeWidth="0.5" fill="none"/>
        <rect x="534" y="69" width="336" height="205" stroke="var(--court-line-box)" strokeWidth="0.5" fill="none"/>
        <rect x="534" y="274" width="336" height="205" stroke="var(--court-line-box)" strokeWidth="0.5" fill="none"/>
        {/* Doubles alleys */}
        <rect x="2" y="2" width="1064" height="67" fill="var(--court-fill)"/>
        <rect x="2" y="479" width="1064" height="67" fill="var(--court-fill)"/>
      </svg>
    </>
  );
}
