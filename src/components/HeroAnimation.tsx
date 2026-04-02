import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import CourtSVG from './CourtSVG';

interface HeroTexts {
  subtitle: string;
  title: string;
  tagline: string;
  cta: string;
  scroll: string;
}

export default function HeroAnimation({ texts }: { texts: HeroTexts }) {
  const containerRef = useRef<HTMLElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const impactRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rippleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const courtRef = useRef<HTMLDivElement>(null);
  const cornerBallRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      gsap.set(
        [
          courtRef.current,
          contentRef.current,
          dividerRef.current,
          taglineRef.current,
          ctaRef.current,
          cornerBallRef.current,
          scrollRef.current,
        ],
        { autoAlpha: 1, scaleX: 1 },
      );
      return;
    }

    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      const bouncePoints = isMobile
        ? [
            { x: '70vw', y: '60vh' },
            { x: '49vw', y: '48vh' },
          ]
        : [
            { x: '70vw', y: '65vh' },
            { x: '15vw', y: '20vh' },
            { x: '75vw', y: '70vh' },
            { x: '49vw', y: '48vh' },
          ];

      // Start ball
      tl.set(ballRef.current, { left: '-5%', top: '-5%', opacity: 0, scale: 0.5 }).to(
        ballRef.current,
        { opacity: 1, scale: 1, duration: 0.2 },
      );

      // Animate through bounce points
      bouncePoints.forEach((point, i) => {
        const isLast = i === bouncePoints.length - 1;
        // Fly to point
        tl.to(ballRef.current, {
          left: point.x,
          top: point.y,
          duration: 0.6,
          ease: 'power2.inOut',
          rotation: `+=${360}`,
        })
          // Squash on impact
          .to(ballRef.current, { scaleX: 1.2, scaleY: 0.8, duration: 0.05 })
          .to(ballRef.current, { scaleX: 0.9, scaleY: 1.1, duration: 0.08 })
          .to(ballRef.current, { scaleX: 1, scaleY: 1, duration: 0.05 })
          // Impact flash
          .fromTo(
            impactRefs.current[i],
            { left: point.x, top: point.y, width: 8, height: 8, opacity: 1 },
            { width: 80, height: 80, opacity: 0, duration: 0.6, marginLeft: -36, marginTop: -36 },
            '<',
          );

        // Ripples on last bounce
        if (isLast) {
          rippleRefs.current.forEach((r, ri) => {
            tl.fromTo(
              r,
              { width: 10, height: 10, opacity: 0.5 },
              { width: 300, height: 300, opacity: 0, duration: 1.2 },
              `<+=${ri * 0.15}`,
            );
          });
        }
      });

      // Fade ball out
      tl.to(ballRef.current, { opacity: 0, scale: 0.6, duration: 0.3 });

      // Phase 2: Court reveal
      tl.to(courtRef.current, { autoAlpha: 1, scale: 1, duration: 0.8, ease: 'power2.out' }, '-=0.3');

      // Phase 3: Content reveal
      tl.to(contentRef.current, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
        .to(dividerRef.current, { scaleX: 1, duration: 0.5 }, '-=0.3')
        .to(taglineRef.current, { autoAlpha: 1, duration: 0.6 }, '-=0.2')
        .to(ctaRef.current, { autoAlpha: 1, duration: 0.6 }, '-=0.3')
        .to(cornerBallRef.current, { autoAlpha: 1, duration: 0.4 }, '-=0.4')
        .to(scrollRef.current, { autoAlpha: 1, duration: 0.6 }, '-=0.2');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-mc-bg via-mc-bg-alt to-mc-bg-end"
    >
      {/* Ball element */}
      <div ref={ballRef} className="absolute w-[22px] h-[22px] z-40 opacity-0">
        <div className="w-full h-full rounded-full bg-gradient-radial from-[#e8ff5a] via-[#c8ff00] to-[#9abf00] shadow-[0_0_25px_rgba(200,255,0,0.6)]" />
      </div>

      {/* Impact flashes */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          ref={(el) => { impactRefs.current[i] = el; }}
          className="absolute w-2 h-2 bg-mc-accent rounded-full opacity-0 z-30"
        />
      ))}

      {/* Ripple rings */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          ref={(el) => { rippleRefs.current[i] = el; }}
          className="absolute w-2 h-2 border border-mc-accent/25 rounded-full opacity-0 z-30"
          style={{ left: '50%', top: '49%', transform: 'translate(-50%, -50%)' }}
        />
      ))}

      {/* Court SVG */}
      <div
        ref={courtRef}
        className="absolute w-[76%] max-w-[860px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 z-10"
        style={{ perspective: '900px', transform: 'translate(-50%, -50%) perspective(900px) rotateX(6deg)' }}
      >
        <CourtSVG />
      </div>

      {/* Ball corner accent */}
      <div
        ref={cornerBallRef}
        className="absolute top-6 right-8 w-[10px] h-[10px] bg-mc-accent rounded-full shadow-[0_0_20px_rgba(200,255,0,0.4)] opacity-0 z-50 gentlePulse"
      />

      {/* Content */}
      <div ref={contentRef} className="text-center z-30 relative opacity-0">
        <div className="font-heading text-sm tracking-[6px] text-mc-accent/60 uppercase mb-4">
          {texts.subtitle}
        </div>
        <h1 className="font-heading text-7xl font-light text-mc-text tracking-[4px] leading-tight">
          {texts.title}
        </h1>
        <div
          ref={dividerRef}
          className="w-[50px] h-[2px] mx-auto my-6 bg-gradient-to-r from-mc-accent to-mc-accent/20 scale-x-0 origin-left"
        />
        <div ref={taglineRef} className="text-xs text-white/40 tracking-[3px] opacity-0">
          {texts.tagline}
        </div>
        <a
          ref={ctaRef}
          href="#"
          className="cta-sweep inline-block mt-10 px-9 py-3.5 border border-mc-accent/30 text-mc-accent/80 text-xs tracking-[3px] uppercase opacity-0"
        >
          {texts.cta}
        </a>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 z-30"
      >
        <span className="text-[10px] tracking-[3px] text-white/20">{texts.scroll}</span>
        <div className="w-px h-[30px] bg-gradient-to-b from-mc-accent/30 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
