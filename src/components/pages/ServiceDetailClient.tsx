'use client';

import { useMemo } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { services } from '@/lib/data';

export function ServiceDetailClient({ slug }: { slug?: string }) {
  const service = useMemo(() => services.find((s) => s.id === slug), [slug]);

  if (!service) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center px-6">
          <h1 className="font-display text-5xl text-text-primary mb-4">404 — Service Not Found</h1>
          <p className="text-text-secondary mb-8">The service you are looking for does not exist or has been removed.</p>
          <a href="/services">
            <Button variant="outline">Back to Services</Button>
          </a>
        </div>
      </main>
    );
  }

  return (
    <main>
      <section className="relative pt-40 pb-28 md:pb-36" style={{ backgroundColor: service.color }}>
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <span className="text-background/60 uppercase tracking-[0.2em] text-xs font-sans">Service</span>
            <h1 className="font-display text-5xl md:text-7xl text-background mt-3 leading-tight">
              {service.title}
            </h1>
            <p className="text-background/80 text-lg mt-2 uppercase tracking-wider">{service.subtitle}</p>
            <p className="text-background/70 text-lg max-w-3xl mt-6 leading-relaxed">{service.description}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-28 md:py-36 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <ScrollReveal>
            <h2 className="font-display text-3xl text-text-inverse mb-8">The Problem</h2>
            <p className="text-text-inverse/70 text-lg leading-relaxed max-w-4xl">{service.problem}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-28 md:py-36 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-display text-3xl text-text-primary mb-8">Our Solution</h2>
            <p className="text-text-secondary text-lg leading-relaxed max-w-4xl">{service.solution}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-28 md:py-36 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ScrollReveal>
              <h3 className="font-display text-2xl text-text-primary mb-8">Methodology</h3>
              <div className="space-y-8">
                {service.methodology.map((step, i) => (
                  <div key={i} className="flex gap-5 group">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-display text-lg leading-none shrink-0 group-hover:bg-primary group-hover:text-background transition-colors duration-300">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-text-secondary leading-relaxed pt-1.5">{step}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h3 className="font-display text-2xl text-text-primary mb-8">Deliverables</h3>
              <ul className="space-y-4">
                {service.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-text-secondary">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-bold shrink-0 mt-0.5">
                      &#10003;
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-28 md:py-36 bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <h3 className="font-display text-2xl text-text-primary mb-8">Technologies</h3>
            <div className="flex flex-wrap gap-3">
              {service.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2.5 text-xs uppercase tracking-wider border border-border text-text-secondary bg-background hover:border-primary/50 hover:text-primary transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-28 md:py-36 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.06] to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center px-6 relative z-10">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl text-text-inverse mb-4">
              Ready to get started?
            </h2>
            <p className="text-text-inverse/60 text-lg mb-8">
              Let's discuss how our {service.title.toLowerCase()} expertise can help your next project.
            </p>
            <a href="/contact">
              <Button variant="primary" size="lg">
                Contact Us
              </Button>
            </a>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
