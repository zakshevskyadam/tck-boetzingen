import { useState, useRef, useEffect, useCallback } from 'react';

interface FaqItem {
  q: string;
  a: string;
}

interface Category {
  name: string;
  items: FaqItem[];
}

interface Props {
  categories: Category[];
}

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<string>('0px');

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight('0px');
    }
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onToggle();
      }
    },
    [onToggle]
  );

  return (
    <div className="border-b border-mc-border">
      <button
        type="button"
        className="w-full flex items-center justify-between py-5 px-1 text-left cursor-pointer group"
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
      >
        <span className="text-sm text-mc-text group-hover:text-mc-accent/80 transition-colors pr-4">
          {item.q}
        </span>
        <svg
          className={`w-4 h-4 flex-shrink-0 text-white/55 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{ maxHeight }}
      >
        <p className="text-sm leading-relaxed text-white/70 pb-5 px-1">{item.a}</p>
      </div>
    </div>
  );
}

export default function FaqAccordion({ categories }: Props) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleCategoryChange = (index: number) => {
    setActiveCategory(index);
    setOpenIndex(null);
  };

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const currentItems = categories[activeCategory]?.items ?? [];

  return (
    <div>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-1 pb-4 mb-6 border-b border-mc-border">
        {categories.map((cat, i) => (
          <button
            key={cat.name}
            type="button"
            onClick={() => handleCategoryChange(i)}
            className={`px-3 py-2 text-xs tracking-[1px] uppercase transition-colors cursor-pointer ${
              i === activeCategory
                ? 'text-mc-accent border-b-2 border-mc-accent'
                : 'text-white/55 hover:text-white/75'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Accordion items */}
      <div>
        {currentItems.map((item, i) => (
          <AccordionItem
            key={`${activeCategory}-${i}`}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => handleToggle(i)}
          />
        ))}
      </div>
    </div>
  );
}
