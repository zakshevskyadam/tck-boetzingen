import { useEffect, useRef } from 'react';
import CourtSVG from './CourtSVG';

interface HeroTexts {
  subtitle: string;
  title: string;
  tagline: string;
  cta: string;
  scroll: string;
}

export default function HeroAnimation({ texts }: { texts: HeroTexts }) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced && heroRef.current) {
      heroRef.current.classList.add('no-motion');
    }
  }, []);

  return (
    <>
      <style>{`
        /* ===== BALL ===== */
        .hero-ball {
          position: absolute;
          width: 22px; height: 22px;
          z-index: 40;
          animation: snakePath 2s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards;
          opacity: 0;
          pointer-events: none;
        }
        .hero-ball-body {
          width: 100%; height: 100%;
          background: radial-gradient(circle at 35% 35%, #e8ff5a, #c8ff00 40%, #9abf00 100%);
          border-radius: 50%;
          box-shadow: 0 0 25px rgba(200,255,0,0.6), 0 0 60px rgba(200,255,0,0.2);
          animation: ballSpin 2s linear 0.1s;
          position: relative;
        }
        .hero-ball-body::before {
          content: '';
          position: absolute;
          inset: 2px;
          border-radius: 50%;
          background: transparent;
          border-top: 1.5px solid rgba(255,255,255,0.2);
          border-bottom: 1.5px solid rgba(255,255,255,0.2);
          transform: rotate(-30deg);
        }

        @keyframes ballSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(1440deg); }
        }

        /* Court is roughly 12%-88% horizontal, 22%-78% vertical in viewport */
        @keyframes snakePath {
          0%   { left: 12%;  top: 22%;  opacity: 0; transform: scale(0.5); }
          3%   { opacity: 1; transform: scale(1); }
          /* Bounce 1: top-left → bottom-right of court */
          18%  { left: 75%;  top: 68%; transform: scale(1.15, 0.85); }
          20%  { left: 74%;  top: 65%; transform: scale(0.9, 1.1); }
          /* Bounce 2: → top-left of court */
          38%  { left: 20%;  top: 28%; transform: scale(1.1, 0.9); }
          40%  { left: 21%;  top: 30%; transform: scale(0.9, 1.1); }
          /* Bounce 3: → bottom-right of court */
          58%  { left: 72%;  top: 70%; transform: scale(1.15, 0.85); }
          60%  { left: 71%;  top: 67%; transform: scale(0.9, 1.1); }
          /* Bounce 4: → center of court */
          78%  { left: 50%;  top: 50%; transform: translate(-50%, -50%) scale(1.2, 0.8); }
          82%  { left: 50%;  top: 50%; transform: translate(-50%, -50%) scale(0.95, 1.05); }
          90%  { left: 50%; top: 50%; transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { left: 50%; top: 50%; transform: translate(-50%, -50%) scale(0.6); opacity: 0; }
        }

        /* ===== IMPACT FLASHES ===== */
        .hero-impact {
          position: absolute;
          width: 8px; height: 8px;
          background: #c8ff00;
          border-radius: 50%;
          opacity: 0;
          z-index: 35;
          pointer-events: none;
        }
        .hero-impact::after {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 8px; height: 8px;
          border: 1px solid rgba(200,255,0,0.4);
          border-radius: 50%;
          animation: inherit;
          animation-delay: inherit;
        }
        .hero-impact { transform: translate(-50%, -50%); }
        .hero-impact-1 { left: 75%; top: 68%; animation: impactBurst 0.5s ease 0.50s forwards; }
        .hero-impact-2 { left: 20%; top: 28%; animation: impactBurst 0.5s ease 0.90s forwards; }
        .hero-impact-3 { left: 72%; top: 70%; animation: impactBurst 0.5s ease 1.30s forwards; }
        .hero-impact-4 { left: 50%; top: 50%; animation: impactBurst 0.6s ease 1.70s forwards; }

        @keyframes impactBurst {
          0%   { opacity: 1; width: 8px; height: 8px;
                 box-shadow: 0 0 20px rgba(200,255,0,0.8); }
          100% { opacity: 0; width: 80px; height: 80px;
                 box-shadow: 0 0 0 rgba(200,255,0,0); }
        }

        /* ===== RIPPLE RINGS ===== */
        .hero-ripple {
          position: absolute; left: 50%; top: 49%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 1px solid rgba(200,255,0,0.25);
          opacity: 0; z-index: 34;
          pointer-events: none;
        }
        .hero-fr1 { width: 10px; height: 10px; animation: rippleOut 1.2s ease 1.70s forwards; }
        .hero-fr2 { width: 10px; height: 10px; animation: rippleOut 1.2s ease 1.82s forwards; }
        .hero-fr3 { width: 10px; height: 10px; animation: rippleOut 1.2s ease 1.94s forwards; }

        @keyframes rippleOut {
          0%   { opacity: 0.5; width: 10px; height: 10px; }
          100% { opacity: 0; width: 400px; height: 400px; }
        }

        /* ===== COURT ===== */
        .hero-court {
          position: absolute;
          width: 76%; max-width: 860px;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%) perspective(900px) rotateX(6deg);
          opacity: 0;
          z-index: 10;
          animation: courtAppear 1.5s ease 0.4s forwards;
          pointer-events: none;
        }
        @keyframes courtAppear {
          0%   { opacity: 0; transform: translate(-50%, -50%) perspective(900px) rotateX(6deg) scale(0.95); }
          100% { opacity: 1; transform: translate(-50%, -50%) perspective(900px) rotateX(6deg) scale(1); }
        }

        /* ===== CONTENT ===== */
        .hero-text-content {
          text-align: center; z-index: 30; position: relative;
          opacity: 0;
          animation: contentReveal 0.8s ease 2.3s forwards;
        }
        @keyframes contentReveal {
          0%   { opacity: 0; transform: translateY(25px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .hero-text-sub {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 15px; letter-spacing: 6px; color: var(--color-mc-accent);
          text-transform: uppercase; margin-bottom: 16px;
          font-weight: 400;
        }
        .hero-text-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 72px; font-weight: 300; color: var(--color-mc-text);
          letter-spacing: 4px; line-height: 1.1;
        }
        .hero-text-divider {
          width: 50px; height: 2px; margin: 24px auto;
          background: linear-gradient(90deg, var(--color-mc-accent), transparent);
          transform: scaleX(0); transform-origin: left;
          animation: drawH 0.5s ease 2.7s forwards;
        }
        @keyframes drawH { to { transform: scaleX(1); } }
        .hero-text-tagline {
          font-size: 13px; color: rgba(255,255,255,0.65); letter-spacing: 3px;
          opacity: 0;
          animation: heroFadeIn 0.6s ease 2.9s forwards;
        }
        .hero-text-cta {
          display: inline-block; margin-top: 40px;
          padding: 16px 40px;
          border: 1px solid rgba(200,255,0,0.5);
          color: #c8ff00;
          font-size: 13px; font-weight: 500; letter-spacing: 3px; text-transform: uppercase;
          text-decoration: none;
          opacity: 0;
          animation: heroFadeIn 0.6s ease 3.1s forwards;
          transition: all 0.4s;
          position: relative; overflow: hidden;
        }
        .hero-text-cta:hover {
          background: rgba(200,255,0,0.08);
          border-color: rgba(200,255,0,0.6);
        }
        @keyframes heroFadeIn { to { opacity: 1; } }

        /* ===== CORNER BALL ===== */
        .hero-corner-ball {
          position: absolute; top: 24px; right: 32px;
          width: 10px; height: 10px;
          background: #c8ff00; border-radius: 50%;
          box-shadow: 0 0 20px rgba(200,255,0,0.4);
          opacity: 0; z-index: 50;
          animation: heroFadeIn 0.4s ease 2.1s forwards, heroGentlePulse 3s ease 3s infinite;
        }
        @keyframes heroGentlePulse {
          0%, 100% { box-shadow: 0 0 20px rgba(200,255,0,0.3); }
          50% { box-shadow: 0 0 30px rgba(200,255,0,0.5), 0 0 60px rgba(200,255,0,0.15); }
        }

        /* ===== SCROLL HINT ===== */
        .hero-scroll-hint {
          position: absolute; bottom: 40px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          opacity: 0; z-index: 30;
          animation: heroFadeIn 0.8s ease 3.3s forwards;
        }
        .hero-scroll-hint span { font-size: 10px; letter-spacing: 3px; color: rgba(255,255,255,0.2); }
        .hero-scroll-line {
          width: 1px; height: 30px;
          background: linear-gradient(180deg, rgba(200,255,0,0.3), transparent);
          animation: scrollPulse 2s ease infinite;
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.6); }
          50% { opacity: 1; transform: scaleY(1); }
        }

        /* ===== LIGHT THEME KEYFRAME OVERRIDES ===== */
        @keyframes impactBurstLight {
          0%   { opacity: 1; width: 8px; height: 8px;
                 box-shadow: 0 0 20px rgba(90,138,0,0.8); }
          100% { opacity: 0; width: 80px; height: 80px;
                 box-shadow: 0 0 0 rgba(90,138,0,0); }
        }
        @keyframes heroGentlePulseLight {
          0%, 100% { box-shadow: 0 0 20px rgba(90,138,0,0.3); }
          50% { box-shadow: 0 0 30px rgba(90,138,0,0.5), 0 0 60px rgba(90,138,0,0.15); }
        }
        @keyframes scrollPulseLight {
          0%, 100% { opacity: 0.3; transform: scaleY(0.6); }
          50% { opacity: 1; transform: scaleY(1); }
        }

        [data-theme="light"] .hero-impact-1 { animation: impactBurstLight 0.5s ease 0.50s forwards; }
        [data-theme="light"] .hero-impact-2 { animation: impactBurstLight 0.5s ease 0.90s forwards; }
        [data-theme="light"] .hero-impact-3 { animation: impactBurstLight 0.5s ease 1.30s forwards; }
        [data-theme="light"] .hero-impact-4 { animation: impactBurstLight 0.6s ease 1.70s forwards; }
        [data-theme="light"] .hero-corner-ball {
          animation: heroFadeIn 0.4s ease 2.1s forwards, heroGentlePulseLight 3s ease 3s infinite;
        }

        /* ===== MOBILE ===== */
        @media (max-width: 768px) {
          .hero-text-title { font-size: 48px; letter-spacing: 2px; }
          .hero-text-sub { font-size: 11px; letter-spacing: 4px; }
          .hero-text-tagline { font-size: 12px; letter-spacing: 2.5px; padding: 0 24px; }

          /* Rotate court 90deg so it fits portrait screens */
          .hero-court {
            width: 77.25vh;
            max-width: none;
            transform: translate(-50%, -50%) rotate(90deg);
            animation: courtAppearMobile 1.5s ease 0.4s forwards;
          }
          @keyframes courtAppearMobile {
            0%   { opacity: 0; transform: translate(-50%, -50%) rotate(90deg) scale(0.92); }
            100% { opacity: 1; transform: translate(-50%, -50%) rotate(90deg) scale(1); }
          }

          /* Ball: vertical rally up-down across the rotated court */
          .hero-ball {
            animation: snakePathMobile 2s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards;
          }
          @keyframes snakePathMobile {
            0%   { left: 50%;  top: -5%;  opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            3%   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            /* Bounce 1: → far baseline (bottom) */
            18%  { left: 45%;  top: 80%; transform: translate(-50%, -50%) scale(0.85, 1.15); }
            20%  { left: 47%;  top: 78%; transform: translate(-50%, -50%) scale(1.1, 0.9); }
            /* Bounce 2: → near baseline (top) */
            38%  { left: 52%;  top: 22%; transform: translate(-50%, -50%) scale(0.9, 1.1); }
            40%  { left: 50%;  top: 24%; transform: translate(-50%, -50%) scale(1.1, 0.9); }
            /* Bounce 3: → bottom again */
            58%  { left: 48%;  top: 78%; transform: translate(-50%, -50%) scale(0.85, 1.15); }
            60%  { left: 50%;  top: 76%; transform: translate(-50%, -50%) scale(1.1, 0.9); }
            /* Bounce 4: → center */
            78%  { left: 50%;  top: 50%; transform: translate(-50%, -50%) scale(1.2, 0.8); }
            82%  { left: 50%;  top: 50%; transform: translate(-50%, -50%) scale(0.95, 1.05); }
            90%  { left: 50%;  top: 50%; transform: translate(-50%, -50%) scale(1); opacity: 1; }
            100% { left: 50%;  top: 50%; transform: translate(-50%, -50%) scale(0.6); opacity: 0; }
          }

          /* Move impact flashes to mobile bounce points */
          .hero-impact-1 { left: 45% !important; top: 80% !important; }
          .hero-impact-2 { left: 52% !important; top: 22% !important; }
          .hero-impact-3 { left: 48% !important; top: 78% !important; }
          .hero-impact-4 { left: 50% !important; top: 50% !important; }
        }

        /* ===== REDUCED MOTION ===== */
        .no-motion .hero-ball,
        .no-motion .hero-impact,
        .no-motion .hero-ripple { display: none; }
        .no-motion .hero-court,
        .no-motion .hero-text-content,
        .no-motion .hero-text-tagline,
        .no-motion .hero-text-cta,
        .no-motion .hero-corner-ball,
        .no-motion .hero-scroll-hint,
        .no-motion .hero-text-divider {
          opacity: 1 !important;
          animation: none !important;
          transform: translate(-50%, -50%) perspective(900px) rotateX(6deg) scale(1);
        }
        .no-motion .hero-text-content {
          transform: translateY(0) !important;
        }
        .no-motion .hero-text-divider {
          transform: scaleX(1) !important;
        }
      `}</style>

      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(160deg, var(--color-mc-bg) 0%, var(--color-mc-bg-alt) 40%, var(--color-mc-bg-end) 100%)' }}
      >
        {/* Ball */}
        <div className="hero-ball">
          <div className="hero-ball-body" />
        </div>

        {/* Impact flashes */}
        <div className="hero-impact hero-impact-1" />
        <div className="hero-impact hero-impact-2" />
        <div className="hero-impact hero-impact-3" />
        <div className="hero-impact hero-impact-4" />

        {/* Final bounce ripples */}
        <div className="hero-ripple hero-fr1" />
        <div className="hero-ripple hero-fr2" />
        <div className="hero-ripple hero-fr3" />

        {/* Court */}
        <div className="hero-court">
          <CourtSVG />
        </div>

        {/* Corner ball accent */}
        <div className="hero-corner-ball" />

        {/* Content */}
        <div className="hero-text-content">
          <div className="hero-text-sub">{texts.subtitle}</div>
          <h1 className="hero-text-title">{texts.title}</h1>
          <div className="hero-text-divider" />
          <div className="hero-text-tagline">{texts.tagline}</div>
          <a href="/kontakt" className="hero-text-cta">{texts.cta}</a>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll-hint">
          <span>{texts.scroll}</span>
          <div className="hero-scroll-line" />
        </div>
      </section>
    </>
  );
}
