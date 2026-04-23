import { useEffect, useRef, useState } from 'react';

interface StatsItem {
  value: number;
  label: string;
}

interface Props {
  items: StatsItem[];
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function Counter({ value, label }: StatsItem) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            observer.unobserve(el);

            const duration = 2000;
            let start: number | null = null;

            function step(timestamp: number) {
              if (!start) start = timestamp;
              const elapsed = timestamp - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = easeOutCubic(progress);
              setDisplay(Math.round(eased * value));
              if (progress < 1) {
                requestAnimationFrame(step);
              }
            }

            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-heading text-5xl font-light text-mc-accent/70">
        {display}
      </div>
      <div className="text-xs tracking-[2px] text-white/55 uppercase mt-1">
        {label}
      </div>
    </div>
  );
}

export default function StatsCounter({ items }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-16 border-t border-mc-border pt-10">
      {items.map((item, i) => (
        <Counter key={i} value={item.value} label={item.label} />
      ))}
    </div>
  );
}
