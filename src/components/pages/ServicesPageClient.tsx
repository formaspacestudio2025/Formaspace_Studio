'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import { services, industries } from '@/lib/data';

export function ServicesPageClient() {
  return (
    <main>
      <section className="relative pt-40 pb-28 md:pb-36 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <span className="text-primary uppercase tracking-[0.2em] text-xs font-sans">What We Do</span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-text-primary mt-4 leading-tight">
              Our Services
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mt-6 leading-relaxed">
              End-to-end project delivery capabilities.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-28 md:pb-36 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {services.map((service, i) => (
              <ScrollReveal key={service.id} delay={i * 0.05}>
                <a
                  href={`/services/${service.id}`}
                  className="group block border border-border hover:border-primary/50 transition-all duration-300 h-full hover:shadow-xl hover:shadow-primary/[0.04]"
                >
                  <div className="h-1.5" style={{ backgroundColor: service.color }} />
                  <div className="p-8">
                    <h3 className="font-display text-2xl text-text-primary group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm text-text-secondary mt-1 uppercase tracking-wider">{service.subtitle}</p>
                    <p className="text-text-secondary mt-4 leading-relaxed text-sm line-clamp-3">{service.description}</p>
                    <div className="flex flex-wrap gap-2 mt-6">
                      {service.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-[10px] uppercase tracking-wider border border-border text-text-secondary/70"
                        >
                          {tech}
                        </span>
                      ))}
                      {service.technologies.length > 4 && (
                        <span className="px-3 py-1 text-[10px] uppercase tracking-wider text-primary">
                          +{service.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 md:py-36 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.06] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl text-text-inverse mb-12 text-center">
              Industries We Serve
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {industries.map((industry, i) => (
              <ScrollReveal key={industry.id} delay={i * 0.05}>
                <div className="border border-border/50 p-6 h-full hover:border-primary/30 transition-colors duration-300">
                  <span className="text-2xl text-primary block mb-3">{industry.icon}</span>
                  <h3 className="font-display text-lg text-text-inverse mb-2">{industry.title}</h3>
                  <p className="text-text-inverse/60 text-sm leading-relaxed">{industry.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 md:py-36 bg-background">
        <div className="max-w-3xl mx-auto text-center px-6">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl text-text-primary mb-4">
              Not sure which service fits your needs?
            </h2>
            <p className="text-text-secondary text-lg mb-8">
              We'll help you find the right approach for your project.
            </p>
            <a href="/contact">
              <span className="inline-flex items-center px-8 py-3 border border-primary text-primary uppercase tracking-wider text-sm hover:bg-primary hover:text-background transition-all duration-200">
                Get in Touch
              </span>
            </a>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
