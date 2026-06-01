'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import Button from '@/components/ui/Button';
import { team, companyValues, certifications, memberships } from '@/lib/data';

export function AboutClient() {
  return (
    <main>
      <section className="relative pt-40 pb-32 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-text-primary leading-tight max-w-5xl">
              About Formaspace Studio
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mt-6 leading-relaxed">
              Formaspace Studio is a modern digital-first Project Management Consultancy
              that bridges the gap between traditional project delivery and digital
              innovation. We combine deep construction expertise with advanced BIM,
              project controls, and digital engineering capabilities to help clients
              deliver complex programmes with confidence.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <ScrollReveal>
              <h2 className="text-primary uppercase tracking-[0.2em] text-xs font-sans mb-4">Our Mission</h2>
              <p className="text-text-inverse text-xl md:text-2xl leading-relaxed font-display">
                To close the gap between traditional project management and digital
                innovation — delivering programmes that are smarter, faster, and more
                transparent through integrated BIM, project controls, and digital
                engineering.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="text-primary uppercase tracking-[0.2em] text-xs font-sans mb-4">Our Vision</h2>
              <p className="text-text-inverse text-xl md:text-2xl leading-relaxed font-display">
                To be the most trusted digital delivery partner for capital projects
                worldwide — where data-driven decision-making, technical rigour, and
                hands-on leadership set a new standard for project excellence.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-display text-4xl text-text-primary mb-16 text-center">Our Values</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14">
            {companyValues.map((v, i) => (
              <ScrollReveal key={v.id} delay={i * 0.05}>
                <span className="text-primary font-display text-5xl opacity-30 block mb-3">{v.id}</span>
                <h3 className="font-display text-xl text-text-primary mb-3">{v.title}</h3>
                <p className="text-text-secondary leading-relaxed text-sm">{v.description}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-display text-4xl text-text-inverse mb-16 text-center">Leadership</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 max-w-5xl mx-auto">
            {team.map((member, i) => (
              <ScrollReveal key={member.id} delay={i * 0.1}>
                <div className="bg-background rounded-sm p-8 md:p-10 border border-border">
                  <div className="aspect-[3/2] bg-secondary relative overflow-hidden mb-6 w-full max-w-sm">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${member.image})` }}
                    />
                  </div>
                  <h3 className="font-display text-2xl text-text-primary">{member.name}</h3>
                  <p className="text-primary text-sm uppercase tracking-wider mt-1 font-sans">{member.role}</p>
                  <p className="text-text-secondary text-sm mt-4 leading-relaxed">{member.bio}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl text-text-primary mb-8">Certifications</h2>
              <ul className="space-y-3">
                {certifications.map((c) => (
                  <li key={c} className="text-text-secondary text-sm leading-relaxed flex items-start gap-3">
                    <span className="text-primary mt-0.5 shrink-0">&#x2713;</span>
                    {c}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display text-2xl text-text-primary mb-8">Memberships</h2>
              <ul className="space-y-3">
                {memberships.map((m) => (
                  <li key={m} className="text-text-secondary text-sm leading-relaxed flex items-start gap-3">
                    <span className="text-primary mt-0.5 shrink-0">&#x2713;</span>
                    {m}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary">
        <div className="max-w-3xl mx-auto text-center px-6">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl text-text-inverse mb-4">
              Ready to work with us?
            </h2>
            <p className="text-text-light text-lg mb-8">
              Let&apos;s discuss how Formaspace Studio can support your next project.
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
