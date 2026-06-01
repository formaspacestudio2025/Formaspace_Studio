'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import { services } from '@/lib/data';

export function ServicesOverview() {
  return (
    <section className="relative bg-surface py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <h2 className="font-display text-4xl md:text-5xl text-text-primary leading-[1.1]">
            Our Services
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-4 text-text-secondary text-base md:text-lg max-w-2xl">
            End-to-end project delivery capabilities for the built environment
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {services.map((service, i) => (
            <ScrollReveal key={service.id} delay={0.05 * i}>
              <a
                href={`/services/${service.id}`}
                className="group block h-full bg-background border border-border hover:border-accent/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 rounded-sm overflow-hidden"
              >
                <div
                  className="h-1 w-full transition-colors duration-300"
                  style={{ backgroundColor: service.color }}
                />
                <div className="p-8">
                  <h3 className="font-display text-lg md:text-xl text-text-primary group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-text-secondary text-sm leading-relaxed">
                    {service.subtitle}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="inline-block px-3 py-1 text-[11px] font-mono uppercase tracking-wider bg-accent/5 text-accent border border-accent/20 rounded-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
