'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import { companyValues } from '@/lib/data';

const highlights = [
  {
    title: 'Digital Engineering',
    description: 'BIM management, information management, and digital delivery at every project stage.',
    color: '#3b82f6',
  },
  {
    title: 'Project Intelligence',
    description: 'Real-time dashboards, earned value analysis, and data-driven decision making.',
    color: '#1e3a5f',
  },
  {
    title: 'Technical Excellence',
    description: 'Founder-led expertise with deep construction and digital delivery experience.',
    color: '#059669',
  },
];

export function CompanyIntro() {
  return (
    <section className="relative bg-background py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-text-primary leading-[1.1] max-w-4xl">
            Built for the future of construction
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-8 max-w-3xl text-text-secondary text-lg md:text-xl leading-relaxed">
            We believe construction projects require more than traditional management. They require
            real-time intelligence, integrated digital workflows, and data-driven decision making.
            Formaspace was created to bridge the gap between engineering expertise and digital
            innovation — combining deep project delivery experience with advanced BIM, project
            controls, and construction technology.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {highlights.map((item, i) => (
            <ScrollReveal key={item.title} delay={0.1 * i}>
              <div className="group h-full p-8 border border-border hover:border-accent/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 bg-white/50 backdrop-blur-sm rounded-sm">
                <div
                  className="w-10 h-1 mb-6 transition-colors duration-300"
                  style={{ backgroundColor: item.color }}
                />
                <h3 className="font-display text-xl text-text-primary group-hover:text-accent transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="mt-3 text-text-secondary text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-12 mt-28">
          {companyValues.map((value, i) => (
            <ScrollReveal key={value.id} delay={0.08 * i}>
              <div className="border-t border-border pt-8">
                <span className="font-display text-6xl md:text-7xl text-primary/10 font-bold leading-none tracking-tight">
                  {value.id}
                </span>
                <h3 className="font-display text-2xl text-text-primary mt-2">
                  {value.title}
                </h3>
                <p className="mt-4 text-text-secondary text-base leading-relaxed max-w-xl">
                  {value.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
