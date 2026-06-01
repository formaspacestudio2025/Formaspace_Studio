'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import { insights } from '@/lib/data';

export function InsightsPageClient() {
  return (
    <main>
      <section className="relative pt-40 pb-28 md:pb-36 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <span className="text-primary uppercase tracking-[0.2em] text-xs font-sans">Knowledge</span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-text-primary mt-4 leading-tight">
              Insights
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mt-6 leading-relaxed">
              Thought leadership in project delivery and construction technology.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-28 md:pb-36 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {insights.map((insight, i) => (
              <ScrollReveal key={insight.id} delay={i * 0.05}>
                <a href={`/insights/${insight.id}`} className="group block">
                  <div className="aspect-[16/9] bg-cover bg-center bg-secondary relative overflow-hidden mb-5 rounded-sm">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${insight.image})` }}
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 text-[10px] uppercase tracking-wider font-medium bg-primary text-background shadow-lg">
                        {insight.category}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-display text-lg text-text-primary group-hover:text-primary transition-colors duration-300 leading-snug">
                    {insight.title}
                  </h3>
                  <p className="text-text-secondary text-sm mt-2 leading-relaxed line-clamp-2">
                    {insight.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-text-secondary uppercase tracking-wider mt-4">
                    <span>{insight.author}</span>
                    <span className="w-1 h-1 rounded-full bg-text-secondary/40" />
                    <span>{insight.date}</span>
                    <span className="w-1 h-1 rounded-full bg-text-secondary/40" />
                    <span>{insight.readTime}</span>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
