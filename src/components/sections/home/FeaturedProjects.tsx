'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import { projects } from '@/lib/data';

const fallbackGradients = [
  'from-slate-800 to-slate-900',
  'from-slate-900 to-blue-950',
  'from-blue-950 to-slate-900',
];

export function FeaturedProjects() {
  const featured = projects.slice(0, 3);

  return (
    <section className="relative bg-secondary py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white leading-[1.15]">
            Selected Projects
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featured.map((project, i) => (
            <ScrollReveal key={project.id} delay={0.1 * i}>
              <a
                href={`/projects/${project.id}`}
                className="group relative flex flex-col justify-end min-h-[520px] overflow-hidden bg-secondary block rounded-sm"
              >
                {project.heroImage ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.heroImage})` }}
                  />
                ) : (
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${fallbackGradients[i % fallbackGradients.length]}`}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="relative z-10 p-8 md:p-10">
                  <span className="inline-block font-sans text-[11px] uppercase tracking-[0.15em] text-accent bg-accent/10 px-3 py-1.5 mb-4 rounded-sm">
                    {project.category}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl text-white leading-tight group-hover:text-accent transition-colors duration-200">
                    {project.title}
                  </h3>
                  <div className="mt-4 flex flex-col gap-1 text-sm text-white/70 font-sans">
                    <span>{project.location}</span>
                    <span>{project.client}</span>
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
