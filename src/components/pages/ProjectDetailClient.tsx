'use client';

import { useMemo } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { projects } from '@/lib/data';

export function ProjectDetailClient({ slug }: { slug?: string }) {
  const project = useMemo(() => projects.find((p) => p.id === slug), [slug]);

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center px-6">
          <h1 className="font-display text-5xl text-text-primary mb-4">Project not found</h1>
          <p className="text-text-secondary mb-8">The project you are looking for does not exist or has been removed.</p>
          <a href="/projects">
            <Button variant="outline">Back to Projects</Button>
          </a>
        </div>
      </main>
    );
  }

  const related = projects.filter((p) => p.category === project.category && p.id !== project.id).slice(0, 2);

  return (
    <main>
      <section className="relative h-[80vh] min-h-[500px] flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${project.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <ScrollReveal>
            <span className="text-primary uppercase tracking-[0.2em] text-xs font-sans">{project.category}</span>
            <h1 className="font-display text-5xl md:text-7xl text-text-inverse mt-3 leading-tight max-w-4xl">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5 text-sm text-text-inverse/80">
              <span>{project.location}</span>
              <span className="w-1 h-1 rounded-full bg-text-inverse/40" />
              <span>{project.area}</span>
              <span className="w-1 h-1 rounded-full bg-text-inverse/40" />
              <span>{project.timeline}</span>
              <span className="w-1 h-1 rounded-full bg-text-inverse/40" />
              <span className="px-2.5 py-0.5 bg-primary/80 text-background text-xs uppercase tracking-wider">
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
              <span className="w-1 h-1 rounded-full bg-text-inverse/40" />
              <span>{project.client}</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-28 md:py-36 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <ScrollReveal>
              <h2 className="font-display text-3xl text-text-primary mb-6">Description</h2>
              <p className="text-text-secondary leading-relaxed text-lg">{project.description}</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-28 md:py-36 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ScrollReveal>
              <h2 className="font-display text-3xl text-text-inverse mb-6">Project Story</h2>
              <p className="text-text-inverse/70 leading-relaxed">{project.story}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display text-3xl text-text-inverse mb-6">Our Approach</h2>
              <p className="text-text-inverse/70 leading-relaxed">{project.approach}</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-28 md:py-36 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ScrollReveal>
              <h3 className="text-sm uppercase tracking-widest text-primary mb-6">Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2.5 text-xs uppercase tracking-wider border border-border text-text-secondary bg-surface hover:border-primary/50 transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h3 className="text-sm uppercase tracking-widest text-primary mb-6">Workflows</h3>
              <ul className="space-y-4">
                {project.workflows.map((wf, i) => (
                  <li key={i} className="flex items-start gap-3 text-text-secondary">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-display shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{wf}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {project.gallery.length > 0 && (
        <section className="pb-28 md:pb-36 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="font-display text-3xl text-text-primary mb-10">Gallery</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[project.heroImage, ...project.gallery].map((img, i) => (
                <ScrollReveal key={img} delay={i * 0.05}>
                  <div
                    className={`bg-cover bg-center bg-secondary ${
                      i === 0 ? 'md:col-span-2 md:h-[500px]' : ''
                    } h-[300px] rounded-sm`}
                    style={{ backgroundImage: `url(${img})` }}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="py-28 md:py-36 bg-secondary relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/[0.05] to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <ScrollReveal>
              <h2 className="font-display text-3xl text-text-inverse mb-12">Related Projects</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((r, i) => (
                <ScrollReveal key={r.id} delay={i * 0.05}>
                  <a href={`/projects/${r.id}`} className="group block">
                    <div className="aspect-[4/3] bg-cover bg-center bg-text-secondary/20 transition-transform duration-500 group-hover:scale-[1.02] relative overflow-hidden rounded-sm">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${r.heroImage})` }}
                      />
                      <div className="absolute inset-0 bg-black/20" />
                    </div>
                    <h3 className="font-display text-xl text-text-inverse mt-4 group-hover:text-accent transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-text-inverse/60 text-sm mt-1">{r.location}</p>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-28 md:py-36 bg-background">
        <div className="max-w-3xl mx-auto text-center px-6">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl text-text-primary mb-4">
              Interested in a similar project?
            </h2>
            <p className="text-text-secondary text-lg mb-8">
              Let's discuss how Formaspace Studio can bring your vision to life.
            </p>
            <a href="/contact">
              <Button variant="primary" size="lg">
                Start a Conversation
              </Button>
            </a>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
