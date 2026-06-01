'use client';

import { useEffect, useRef } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';

const phases = [
  { label: 'Concept', desc: 'Feasibility & Brief', color: '#3b82f6' },
  { label: 'Design', desc: 'Architecture & Engineering', color: '#60a5fa' },
  { label: 'Digital Engineering', desc: 'BIM & Coordination', color: '#1e3a5f' },
  { label: 'Construction', desc: 'Site Delivery & Controls', color: '#059669' },
  { label: 'Handover', desc: 'Digital Twin & Operations', color: '#0f172a' },
];

export function ProjectLifecycle() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.width = '100%';
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-surface py-28 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-accent mb-4 block">
            Project Delivery Lifecycle
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-text-primary leading-[1.15] max-w-3xl">
            From concept to handover — integrated digital delivery
          </h2>
        </ScrollReveal>

        <div className="relative mt-20">
          <div className="absolute top-10 left-0 right-0 h-0.5 bg-border" />
          <div
            ref={lineRef}
            className="absolute top-10 left-0 h-0.5 bg-accent transition-all duration-[2000ms] ease-out"
            style={{ width: '0%' }}
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-0 relative">
            {phases.map((phase, i) => (
              <ScrollReveal key={phase.label} delay={0.15 * i}>
                <div className="flex flex-col items-center text-center md:px-4">
                  <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white text-xs font-bold shadow-lg shadow-accent/20">
                    {i + 1}
                  </div>
                  <div className="mt-6 w-12 h-0.5" style={{ backgroundColor: phase.color }} />
                  <h3 className="font-display text-lg text-text-primary mt-4">{phase.label}</h3>
                  <p className="mt-1 text-xs text-text-secondary font-sans uppercase tracking-wider">{phase.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Integrated BIM Environment', desc: 'Federated models connecting every discipline in a single CDE' },
            { label: 'Real-Time Project Controls', desc: 'Cost, schedule, and risk data updated continuously' },
            { label: 'Digital Twin Handover', desc: 'Asset-ready data for operations and facility management' },
          ].map((item, i) => (
            <ScrollReveal key={item.label} delay={0.1 * i}>
              <div className="border border-border p-6 hover:border-accent/30 transition-colors duration-300">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-accent/10 text-accent text-sm font-bold">
                  {i + 1}
                </div>
                <h4 className="font-sans text-sm uppercase tracking-wider text-text-primary mt-4">{item.label}</h4>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
