'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import { clientLogos, partnerLogos, certifications, memberships } from '@/lib/data';

const columns = [
  { title: 'Clients', items: clientLogos },
  { title: 'Partners', items: partnerLogos },
  { title: 'Certifications', items: certifications },
  { title: 'Memberships', items: memberships },
];

export function ClientTrust() {
  return (
    <section className="relative bg-surface py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-[1.15]">
            Trusted Partners
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 mt-16">
          {columns.map((col, colIdx) => (
            <ScrollReveal key={col.title} delay={0.08}>
              <div className={`${colIdx > 0 ? 'md:border-l border-border md:pl-8' : 'md:pr-8'}`}>
                <h3 className="font-sans text-xs uppercase tracking-[0.15em] text-primary mb-8">
                  {col.title}
                </h3>
                <ul className="space-y-4">
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-text-secondary leading-relaxed"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
