export default function CourtSVG({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 1068 548" fill="none" className={className}>
      {/* Court surface hint */}
      <rect x="0" y="0" width="1068" height="548" fill="rgba(200,255,0,0.008)"/>
      {/* Outer boundary (doubles) */}
      <rect x="2" y="2" width="1064" height="544" stroke="rgba(200,255,0,0.14)" strokeWidth="1.5"/>
      {/* Singles sidelines */}
      <line x1="2" y1="69" x2="1066" y2="69" stroke="rgba(200,255,0,0.10)" strokeWidth="1"/>
      <line x1="2" y1="479" x2="1066" y2="479" stroke="rgba(200,255,0,0.10)" strokeWidth="1"/>
      {/* Net (dashed) */}
      <line x1="534" y1="2" x2="534" y2="546" stroke="rgba(200,255,0,0.18)" strokeWidth="2" strokeDasharray="8 5"/>
      {/* Net posts */}
      <circle cx="534" cy="2" r="4" fill="rgba(200,255,0,0.12)"/>
      <circle cx="534" cy="546" r="4" fill="rgba(200,255,0,0.12)"/>
      {/* Service lines */}
      <line x1="198" y1="69" x2="198" y2="479" stroke="rgba(200,255,0,0.09)" strokeWidth="1"/>
      <line x1="870" y1="69" x2="870" y2="479" stroke="rgba(200,255,0,0.09)" strokeWidth="1"/>
      {/* Center service line */}
      <line x1="198" y1="274" x2="870" y2="274" stroke="rgba(200,255,0,0.08)" strokeWidth="1"/>
      {/* Center marks */}
      <line x1="2" y1="268" x2="2" y2="280" stroke="rgba(200,255,0,0.14)" strokeWidth="2"/>
      <line x1="1066" y1="268" x2="1066" y2="280" stroke="rgba(200,255,0,0.14)" strokeWidth="2"/>
      {/* Service boxes */}
      <rect x="198" y="69" width="336" height="205" stroke="rgba(200,255,0,0.04)" strokeWidth="0.5" fill="none"/>
      <rect x="198" y="274" width="336" height="205" stroke="rgba(200,255,0,0.04)" strokeWidth="0.5" fill="none"/>
      <rect x="534" y="69" width="336" height="205" stroke="rgba(200,255,0,0.04)" strokeWidth="0.5" fill="none"/>
      <rect x="534" y="274" width="336" height="205" stroke="rgba(200,255,0,0.04)" strokeWidth="0.5" fill="none"/>
      {/* Doubles alleys */}
      <rect x="2" y="2" width="1064" height="67" fill="rgba(200,255,0,0.008)"/>
      <rect x="2" y="479" width="1064" height="67" fill="rgba(200,255,0,0.008)"/>
    </svg>
  );
}
