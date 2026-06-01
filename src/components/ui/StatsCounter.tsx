'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useInView } from '@/hooks/useInView';

type StatsCounterProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
  className?: string;
};

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function StatsCounter({
  value,
  suffix = '',
  prefix = '',
  label,
  duration = 2000,
  className,
}: StatsCounterProps) {
  const { ref, isInView } = useInView(0.3);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start: number | null = null;
    let rafId: number;

    function animate(timestamp: number) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const current = Math.round(easedProgress * value);
      setCount(current);
      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    }

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, value, duration]);

  return (
    <div ref={ref} className={cn('text-center', className)}>
      <span className="block font-display text-4xl md:text-5xl lg:text-6xl text-primary">
        {prefix}{count}{suffix}
      </span>
      <span className="block mt-2 text-sm text-text-secondary font-sans tracking-wide">
        {label}
      </span>
    </div>
  );
}

export default StatsCounter;
