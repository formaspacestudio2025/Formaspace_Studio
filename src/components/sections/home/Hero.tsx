'use client';

import { useEffect, useRef, useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';

const techBadges = ['BIM', 'Project Controls', 'Digital Twin', 'Cost Intelligence', 'Construction Analytics'];

const floatingKPIs = [
  { value: '6+', label: 'Projects', color: '#3b82f6' },
  { value: '$2.5B', label: 'Value Managed', color: '#22c55e' },
  { value: '30+', label: 'Partners', color: '#f59e0b' },
];

export function Hero() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [kpiVisible, setKpiVisible] = useState(false);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    let start = 0;
    function animate() {
      start += 0.03;
      grid.style.transform = `translate(${Math.sin(start) * 15}px, ${Math.cos(start * 1.3) * 10}px)`;
      requestAnimationFrame(animate);
    }
    const id = requestAnimationFrame(animate);
    setTimeout(() => setKpiVisible(true), 600);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-secondary overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          ref={gridRef}
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 60%)',
          }}
        />
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full" style={{ paddingTop: 'clamp(6rem, 15vh, 10rem)', paddingBottom: 'clamp(4rem, 10vh, 8rem)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-end">
          <div className="lg:col-span-3">
            <ScrollReveal>
              <span className="inline-block font-sans text-xs uppercase tracking-[0.25em] text-accent-light mb-6 border border-accent/20 px-4 py-1.5">
                Project Management Consultancy &bull; Digital Engineering
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1
                className="font-display text-white leading-[1.05] font-bold"
                style={{ fontSize: 'clamp(2.8rem, 8vw, 5.5rem)' }}
              >
                The Future of{' '}
                <span className="text-accent">Project Delivery</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="mt-6 max-w-xl text-text-light text-base md:text-lg leading-relaxed">
                Digital Engineering, BIM, Project Controls and Construction Intelligence.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="/contact"
                  className="group relative inline-flex items-center justify-center px-10 py-4 text-sm font-sans uppercase tracking-[0.15em] font-medium bg-accent text-white overflow-hidden transition-all duration-500 hover:bg-accent-dark"
                >
                  <span className="relative z-10">Start Your Project</span>
                </a>
                <a
                  href="/services"
                  className="group relative inline-flex items-center justify-center px-10 py-4 text-sm font-sans uppercase tracking-[0.15em] font-medium border border-accent/50 text-accent-light overflow-hidden transition-all duration-500 hover:bg-accent/10"
                >
                  <span className="relative z-10">Explore Services</span>
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="mt-14 flex flex-wrap gap-3">
                {techBadges.map((badge, i) => (
                  <span
                    key={badge}
                    className="inline-block px-5 py-2.5 text-xs font-mono uppercase tracking-[0.2em] border border-accent/20 text-accent-light/80 bg-accent/5"
                    style={{
                      animation: `badge-float ${4 + i * 0.3}s ease-in-out infinite`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-4">
            {floatingKPIs.map((kpi, i) => (
              <div
                key={kpi.label}
                className="border border-white/10 bg-white/5 backdrop-blur-sm p-5 transition-all duration-700"
                style={{
                  opacity: kpiVisible ? 1 : 0,
                  transform: kpiVisible ? 'translateX(0)' : 'translateX(40px)',
                  transitionDelay: `${0.5 + i * 0.15}s`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-display text-3xl md:text-4xl text-white font-bold">{kpi.value}</span>
                    <span className="font-sans text-xs text-text-light ml-3 uppercase tracking-wider">{kpi.label}</span>
                  </div>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: kpi.color }} />
                </div>
                <div className="mt-3 h-0.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-[2000ms]"
                    style={{
                      width: kpiVisible ? `${80 - i * 10}%` : '0%',
                      backgroundColor: kpi.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes badge-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
}
