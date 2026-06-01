'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import { techInnovations } from '@/lib/data';

export function TechnologyInnovation() {
  return (
    <section className="relative bg-secondary py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white leading-[1.15]">
            Construction Intelligence
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-4 max-w-2xl text-text-light text-base md:text-lg leading-relaxed">
            Technology and systems driving modern project delivery
          </p>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techInnovations.map((item, i) => (
            <ScrollReveal key={item.title} delay={0.06 * i}>
              <div className="border border-white/10 bg-white/5 p-8 h-full flex flex-col transition-all duration-500 hover:border-accent/30 hover:bg-white/[0.08] hover:-translate-y-1 rounded-sm">
                <span className="text-3xl text-accent mb-5 block">{item.icon}</span>
                <h3 className="font-display text-xl text-white leading-snug">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-text-light leading-relaxed flex-1">
                  {item.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.capabilities.slice(0, 3).map((cap) => (
                    <span
                      key={cap}
                      className="font-sans text-[11px] uppercase tracking-[0.08em] text-accent bg-accent/10 px-3 py-1 rounded-sm"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3} className="mt-16 text-center">
          <a
            href="/innovation"
            className="inline-flex items-center gap-2 font-sans text-sm uppercase tracking-[0.15em] text-accent hover:text-accent-light transition-colors duration-200"
          >
            Explore Our Technology
            <span className="text-lg leading-none">&rarr;</span>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
