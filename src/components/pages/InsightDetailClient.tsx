'use client';

import { useMemo } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { insights } from '@/lib/data';

const fullContent: Record<string, { sections: { heading: string; body: string }[] }> = {
  'evm-best-practices': {
    sections: [
      {
        heading: 'Why Traditional EVM Falls Short',
        body: 'Earned value management has been a cornerstone of project controls for decades, but on megaprojects traditional EVM often lags behind reality. SPI and CPI indices are backward-looking, and linear forecasting methods fail to capture the stochastic nature of large-scale construction. When programmes span multiple years and thousands of activities, deterministic forecasts based on a single path quickly lose accuracy.',
      },
      {
        heading: 'Probabilistic Forecasting at Scale',
        body: 'We replaced deterministic EAC calculations with Monte Carlo simulations that modelled schedule and cost correlations across thousands of activities. This gave project teams probability curves for completion dates and final cost, enabling proactive risk mitigation rather than reactive fire-fighting. The shift from single-point to range-based forecasting transformed how leadership understood programme risk.',
      },
      {
        heading: 'Leading Indicators That Work',
        body: 'Beyond lagging EVM metrics, we introduced leading indicators such as request-for-information aging, submittal approval cycle time, and site productivity trends. These gave teams 4–6 week early warnings of emerging issues before they impacted the critical path. Combining leading indicators with probabilistic EVM created a project controls ecosystem that was both predictive and prescriptive.',
      },
    ],
  },
  'iso-19650-implementation-guide': {
    sections: [
      {
        heading: 'Setting the Standard',
        body: 'ISO 19650 provides a framework for managing information over the whole life cycle of a built asset using BIM. For large-scale programmes with 30+ design and construction partners across multiple time zones, implementing the standard requires more than just a procedures document — it demands a digital infrastructure that enforces compliance automatically.',
      },
      {
        heading: 'Common Data Environment Strategy',
        body: 'We deployed a CDE with a federated permission schema that gave each partner access only to their relevant information containers. Automated clash detection ran nightly across all federated models, with results published to a Power BI dashboard visible to the entire project leadership team. The CDE became the single source of truth for all project information.',
      },
      {
        heading: 'Automation Wins at Scale',
        body: 'We developed scripts that automatically assigned standardised parameter sets to every new model element, reducing manual data entry by hundreds of hours. Compliance dashboards tracked each partner\'s adherence to the information standard with traffic-light indicators updated in real time. The result was a self-monitoring information ecosystem that maintained ISO 19650 compliance without a dedicated compliance team.',
      },
    ],
  },
  'digital-twin-construction-operations': {
    sections: [
      {
        heading: 'Bridging Construction and Operations',
        body: 'A digital twin is more than a 3D model — it is a live, data-connected representation of a physical asset that evolves in real time. On major infrastructure projects, we deploy digital twins from day one of construction, integrating IoT sensor feeds, progress photo analytics, and schedule data into a single source of truth that serves both construction and operations teams.',
      },
      {
        heading: 'Architecture for Dual Purpose',
        body: 'The twin serves two masters: the construction team needs real-time progress tracking and deviation alerts, while the future facility management team requires asset data in COBie format mapped to their CAFM system. We build a middleware layer that transforms construction-phase data into operations-ready records automatically, eliminating the traditional handover data loss.',
      },
      {
        heading: 'Success Factors and Lessons',
        body: 'Key success factors include establishing a clear data ownership model before the project starts, investing in sensor calibration and data validation protocols, and training both construction and facilities teams to use the twin interface during parallel phases. The digital twin should start adding value during construction, not after handover.',
      },
    ],
  },
  'ai-progress-monitoring': {
    sections: [
      {
        heading: 'The Problem with Manual Inspections',
        body: 'On large construction sites, traditional progress tracking requires supervisors to physically walk vast areas of active construction, photographing and logging progress on clipboards. Data is often weeks old by the time it reaches the schedule team, and manual inspections routinely miss 30–40% of deviations from the planned programme.',
      },
      {
        heading: 'AI-Powered Visual Monitoring',
        body: 'We installed fixed cameras covering the entire construction zone, each capturing images at regular intervals. A computer vision model trained on construction progress data automatically detects completed structural elements, installed MEP components, and facade panels — comparing actual progress against the Primavera schedule in near real time.',
      },
      {
        heading: 'Measurable Results',
        body: 'Progress reporting accuracy improved dramatically. The automated system identified hundreds of schedule deviations in the first few months that manual inspections missed. The investment in the system was recovered within months through avoided delay costs. AI progress monitoring is no longer experimental — it is an operational necessity for megaprojects.',
      },
    ],
  },
  'cost-management-strategies': {
    sections: [
      {
        heading: 'Navigating Market Volatility',
        body: 'Construction cost volatility has reached unprecedented levels due to material price fluctuations, labour shortages, and supply chain disruption. Traditional cost management approaches that rely on static budgets and periodic re-forecasts are no longer sufficient to protect project outcomes in this environment.',
      },
      {
        heading: 'Dynamic Cost Control Framework',
        body: 'We implement a dynamic cost control framework that combines monthly forensic variance analysis with real-time market intelligence feeds. Cost managers are embedded within project teams to provide immediate feedback during design decisions, and procurement strategies are structured to lock in prices where markets are rising while maintaining flexibility where volatility is expected.',
      },
      {
        heading: 'Practical Strategies That Deliver',
        body: 'Leading practices include early contractor involvement to validate cost assumptions, elemental cost planning that allocates contingency where risk is highest, and commercial dashboards that give leadership real-time visibility into cost health. The goal is not to eliminate all cost risk — that is impossible — but to create a system where every cost decision is informed, intentional, and traceable.',
      },
    ],
  },
  'bim-coordination-megaprojects': {
    sections: [
      {
        heading: 'Coordination at a Different Scale',
        body: 'On airport megaprojects, BIM coordination involves hundreds of federated models, thousands of daily changes, and coordination meetings that could fill a calendar every week. Traditional coordination methods — weekly meetings, manual clash reviews, and email-based document control — break down completely at this scale.',
      },
      {
        heading: 'Automated Coordination Workflows',
        body: 'We implement automated coordination workflows where clash detection runs nightly across the entire federated model set. Results are published to a coordination dashboard that assigns clashes to the responsible design partners with target resolution dates. Weekly coordination meetings shift from reviewing clashes to reviewing the coordination dashboard — a fundamental change in how teams collaborate.',
      },
      {
        heading: 'Standards and Governance',
        body: 'The foundation of scalable coordination is a clear BIM standard that defines model breakdown structures, LOD requirements, coordinate systems, and file-naming conventions. Automated compliance checking validates each model against the standard before it enters the CDE. With these systems in place, coordination becomes a data-driven process rather than a people-driven bottleneck.',
      },
    ],
  },
};

export function InsightDetailClient({ slug }: { slug?: string }) {
  const insight = useMemo(() => insights.find((i) => i.id === slug), [slug]);
  const content = slug ? fullContent[slug] : undefined;

  if (!insight) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center px-6">
          <h1 className="font-display text-5xl text-text-primary mb-4">404 — Insight Not Found</h1>
          <p className="text-text-secondary mb-8">The article you are looking for does not exist or has been removed.</p>
          <a href="/insights">
            <Button variant="outline">Back to Insights</Button>
          </a>
        </div>
      </main>
    );
  }

  const related = insights.filter((i) => i.category === insight.category && i.id !== insight.id).slice(0, 3);

  return (
    <main>
      <section className="pt-40 pb-8 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <a href="/insights" className="text-xs uppercase tracking-widest text-text-secondary hover:text-primary transition-colors">
            {'\u2190'} Back to Insights
          </a>
          <span className="inline-block mt-6 px-3 py-1 text-[10px] uppercase tracking-wider font-medium bg-primary text-background shadow-lg">
            {insight.category}
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-text-primary mt-4 leading-tight">
            {insight.title}
          </h1>
          <div className="flex items-center gap-4 mt-6 text-sm text-text-secondary">
            <span>{insight.author}</span>
            <span className="w-1 h-1 rounded-full bg-text-secondary/40" />
            <span>{insight.date}</span>
            <span className="w-1 h-1 rounded-full bg-text-secondary/40" />
            <span>{insight.readTime}</span>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-text-secondary leading-relaxed italic border-l-2 border-primary pl-5 mb-10">
            {insight.excerpt}
          </p>

          {content ? (
            <div className="space-y-12">
              {content.sections.map((section, i) => (
                <div key={i} className="group">
                  <div className="flex items-start gap-4">
                    <span className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-display shrink-0 mt-1 group-hover:bg-primary group-hover:text-background transition-colors duration-300">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h2 className="font-display text-2xl text-text-primary mb-3">{section.heading}</h2>
                      <p className="text-text-secondary leading-relaxed">{section.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-text-secondary leading-relaxed">{insight.excerpt}</p>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-28 md:py-36 bg-secondary mt-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.06] to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <ScrollReveal>
              <h2 className="font-display text-3xl text-text-inverse mb-12">Related Insights</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r, i) => (
                <ScrollReveal key={r.id} delay={i * 0.05}>
                  <a href={`/insights/${r.id}`} className="group block">
                    <div className="aspect-[16/9] bg-cover bg-center bg-text-secondary/20 relative overflow-hidden mb-4 rounded-sm">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${r.image})` }}
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-text-inverse/60 uppercase tracking-wider mb-1">
                      <span>{r.date}</span>
                      <span className="w-1 h-1 rounded-full bg-text-inverse/40" />
                      <span>{r.readTime}</span>
                    </div>
                    <h3 className="font-display text-base text-text-inverse group-hover:text-accent transition-colors">
                      {r.title}
                    </h3>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
