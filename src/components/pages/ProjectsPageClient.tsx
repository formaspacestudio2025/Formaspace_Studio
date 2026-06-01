'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { projects } from '@/lib/data';

const categories = ['All', ...new Set(projects.map((p) => p.category))];

export function ProjectsPageClient() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main>
      <section className="relative pt-40 pb-28 md:pb-36 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <span className="text-primary uppercase tracking-[0.2em] text-xs font-sans">Portfolio</span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-text-primary mt-4 leading-tight">
              Projects
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mt-6 leading-relaxed">
              Professional case studies in project delivery.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-28 md:pb-36 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap items-center gap-3 pb-8 border-b border-border">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 text-xs uppercase tracking-wider font-medium border transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-primary text-background border-primary shadow-lg shadow-primary/20'
                      : 'bg-transparent text-text-secondary border-border hover:border-primary hover:text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
              <div className="ml-auto w-full sm:w-auto mt-4 sm:mt-0">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 px-4 py-2.5 bg-transparent border border-border text-text-primary text-sm placeholder:text-text-secondary/50 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14 mt-10"
            >
              {filtered.map((project, i) => (
                <motion.a
                  key={project.id}
                  href={`/projects/${project.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="group block"
                >
                  <div className="relative overflow-hidden bg-gradient-to-br from-primary/20 to-secondary aspect-[4/3] rounded-sm">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${project.heroImage})` }}
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs uppercase tracking-wider font-medium bg-primary text-background shadow-lg">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="text-background/80 text-sm">{project.location}</span>
                    </div>
                  </div>
                  <div className="mt-5">
                    <h3 className="font-display text-2xl text-text-primary group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-text-secondary text-sm mt-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {project.location}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 text-[10px] uppercase tracking-wider border border-border text-text-secondary/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-text-secondary">No projects match your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
