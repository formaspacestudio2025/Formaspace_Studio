'use client';

import { useState, useEffect, useRef } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { metrics } from '@/lib/data';

function AnimatedValue({ value, suffix, prefix }: { value: number; suffix: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1500;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-none tabular-nums">
      {prefix}{count}{suffix}
    </span>
  );
}

export function ImpactMetrics() {
  return (
    <section className="relative bg-[#1e3a5f] py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8 text-center">
          {metrics.map((metric, i) => (
            <ScrollReveal key={metric.label} delay={0.1 * i}>
              <div>
                <AnimatedValue value={metric.value} suffix={metric.suffix} prefix={metric.prefix} />
                <p className="mt-3 text-sm md:text-base text-white/70 font-sans leading-snug tracking-wide">
                  {metric.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
