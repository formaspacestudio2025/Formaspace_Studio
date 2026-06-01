'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import Button from '@/components/ui/Button';

export function ContactCTA() {
  return (
    <section className="relative bg-[#1e3a5f] py-28 md:py-36 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <ScrollReveal>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1]">
            Ready to transform your project delivery?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="mt-8 text-text-light text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Let&apos;s discuss how our digital engineering, BIM, and project controls
            capabilities can help you deliver with confidence.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <Button href="/contact" variant="primary" size="lg">
              Get in Touch
            </Button>
            <Button href="/services" variant="outline" size="lg">
              Explore Our Services
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
