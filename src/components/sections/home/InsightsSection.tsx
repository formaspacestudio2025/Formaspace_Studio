'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import Button from '@/components/ui/Button';
import { insights } from '@/lib/data';

export function InsightsSection() {
  const featured = insights.slice(0, 3);

  return (
    <section className="relative bg-background py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between">
          <div>
            <ScrollReveal>
              <span className="inline-block font-sans text-xs uppercase tracking-[0.2em] text-primary mb-4">
                Insights & Research
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-text-primary leading-[1.15]">
                Latest Insights
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.2} className="hidden md:block">
            <Button href="/insights" variant="outline" size="md">
              View All Insights
            </Button>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {featured.map((insight, i) => (
            <ScrollReveal key={insight.id} delay={0.1 * i}>
              <a href={`/insights/${insight.id}`} className="group block">
                <div className="aspect-[16/10] bg-secondary relative overflow-hidden rounded-sm">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    style={{ backgroundImage: `url(${insight.image})` }}
                  />
                  <div className="absolute inset-0 bg-secondary/20" />
                </div>
                <div className="mt-6">
                  <div className="flex items-center gap-3 text-xs font-sans uppercase tracking-wider text-text-light">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-sm text-[10px] tracking-[0.15em]">
                      {insight.category}
                    </span>
                    <span>{insight.readTime}</span>
                  </div>
                  <h3 className="font-display text-lg md:text-xl text-text-primary mt-3 leading-snug group-hover:text-primary transition-colors duration-200">
                    {insight.title}
                  </h3>
                  <p className="mt-2 text-text-secondary text-sm leading-relaxed line-clamp-2">
                    {insight.excerpt}
                  </p>
                  <div className="flex items-center gap-2 mt-4 text-xs text-text-light">
                    <span>By {insight.author}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>{insight.date}</span>
                  </div>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-12 text-center md:hidden">
          <Button href="/insights" variant="outline" size="md">
            View All Insights
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
