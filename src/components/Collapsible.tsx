import { useState, useRef, useEffect, type ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function Collapsible({ title, children, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(defaultOpen ? undefined : 0);

  useEffect(() => {
    if (!contentRef.current) return;
    if (open) {
      setHeight(contentRef.current.scrollHeight);
      const timer = setTimeout(() => setHeight(undefined), 300);
      return () => clearTimeout(timer);
    } else {
      setHeight(contentRef.current.scrollHeight);
      requestAnimationFrame(() => setHeight(0));
    }
  }, [open]);

  return (
    <div className="border border-[var(--color-mc-border)] overflow-hidden transition-colors hover:border-[var(--color-mc-accent,#c8ff00)]/20">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer bg-transparent border-none"
        aria-expanded={open}
      >
        <span
          className="text-base font-medium tracking-wide"
          style={{ fontFamily: 'Inter, system-ui, sans-serif', color: 'var(--color-mc-text)' }}
        >
          {title}
        </span>
        <svg
          className="flex-shrink-0 transition-transform duration-300"
          style={{
            width: 20,
            height: 20,
            color: 'var(--color-mc-accent)',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        ref={contentRef}
        style={{
          height: height !== undefined ? height : 'auto',
          overflow: 'hidden',
          transition: 'height 0.3s ease',
        }}
      >
        <div className="px-6 pb-6">
          {children}
        </div>
      </div>
    </div>
  );
}
