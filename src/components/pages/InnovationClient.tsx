'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { techInnovations } from '@/lib/data';

const techStack = [
  'Autodesk Revit + Dynamo',
  'Navisworks Manage',
  'Primavera P6',
  'Power BI',
  'Oracle EPM',
  'Procore',
  'Solibri Office',
  'Synchro 4D',
];

export function InnovationClient() {
  return (
    <main>
      <section className="relative pt-40 pb-28 md:pb-36 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.04] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <span className="text-primary uppercase tracking-[0.2em] text-xs font-sans">Technology</span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-text-primary mt-4 leading-tight">
              Construction Intelligence
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mt-6 leading-relaxed">
              Technology and systems driving modern project delivery.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-28 md:pb-36 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl text-text-primary mb-12">Innovation Capabilities</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techInnovations.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.05}>
                <div className="border border-border p-8 h-full group hover:border-primary/50 hover:shadow-xl hover:shadow-primary/[0.04] transition-all duration-300">
                  <span className="text-3xl text-primary block mb-4">{item.icon}</span>
                  <h3 className="font-display text-xl text-text-primary mb-3">{item.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6">{item.description}</p>
                  <ul className="space-y-2.5">
                    {item.capabilities.map((cap) => (
                      <li key={cap} className="flex items-center gap-2 text-xs text-text-secondary/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 md:py-36 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.06] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl text-text-inverse mb-12 text-center">
              Our Technology Stack
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {techStack.map((tech, i) => (
              <ScrollReveal key={tech} delay={i * 0.05}>
                <div className="border border-border/50 px-6 py-6 text-center h-full flex items-center justify-center hover:border-primary/30 transition-colors duration-300">
                  <span className="text-text-inverse text-sm font-medium">{tech}</span>
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
              Ready to put our technology to work?
            </h2>
            <p className="text-text-secondary text-lg mb-8">
              Let's explore how our capabilities can transform your next project.
            </p>
            <a href="/contact">
              <Button variant="primary" size="lg">
                Get in Touch
              </Button>
            </a>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
