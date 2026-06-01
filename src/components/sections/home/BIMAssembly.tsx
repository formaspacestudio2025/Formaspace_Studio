'use client';

import { useEffect, useRef, useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';

const layers = [
  { id: 1, label: 'Structure', color: '#3b82f6', desc: 'Steel & Concrete Framework' },
  { id: 2, label: 'Facade', color: '#60a5fa', desc: 'Building Envelope & Glazing' },
  { id: 3, label: 'MEP', color: '#f59e0b', desc: 'Mechanical, Electrical, Plumbing' },
  { id: 4, label: 'Interior', color: '#1e3a5f', desc: 'Fit-Out & Finishes' },
  { id: 5, label: 'Complete', color: '#059669', desc: 'Coordinated Digital Twin' },
];

export function BIMAssembly() {
  const [activeLayer, setActiveLayer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startSimulation = () => {
    setIsPlaying(true);
    setActiveLayer(0);
    intervalRef.current = setInterval(() => {
      setActiveLayer((prev) => {
        if (prev >= layers.length - 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(startSimulation, 500);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );
    const el = document.getElementById('bim-assembly');
    if (el) observer.observe(el);
    return () => {
      observer.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section id="bim-assembly" className="relative bg-secondary py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-accent mb-4 block">
            BIM Assembly Simulation
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white leading-[1.15] max-w-4xl">
            Digital model assembly from structure to finish
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] bg-[#0a0f1a] border border-white/10 rounded-sm overflow-hidden">
            {layers.map((layer, i) => (
              <div
                key={layer.id}
                className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out"
                style={{
                  opacity: i <= activeLayer ? 1 : 0,
                  transform: i <= activeLayer ? 'translateY(0)' : 'translateY(20px)',
                }}
              >
                <svg viewBox="0 0 400 300" className="w-full h-full p-8">
                  {i >= 0 && (
                    <rect
                      x="80" y="40" width="240" height="220" rx="2"
                      fill="none" stroke={layers[0].color}
                      strokeWidth="2" opacity={i >= 0 ? 0.8 : 0.2}
                    />
                  )}
                  {i >= 1 && (
                    <rect
                      x="70" y="30" width="260" height="240" rx="2"
                      fill="none" stroke={layers[1].color}
                      strokeWidth="1.5" opacity={i >= 1 ? 0.7 : 0.15}
                      strokeDasharray="4 2"
                    />
                  )}
                  {i >= 2 && (
                    <>
                      <line x1="100" y1="80" x2="300" y2="80" stroke={layers[2].color} strokeWidth="1" opacity={0.5} />
                      <line x1="100" y1="120" x2="300" y2="120" stroke={layers[2].color} strokeWidth="1" opacity={0.5} />
                      <line x1="100" y1="160" x2="300" y2="160" stroke={layers[2].color} strokeWidth="1" opacity={0.5} />
                      <line x1="100" y1="200" x2="300" y2="200" stroke={layers[2].color} strokeWidth="1" opacity={0.5} />
                      <circle cx="120" cy="100" r="4" fill={layers[2].color} opacity={0.6} />
                      <circle cx="200" cy="140" r="4" fill={layers[2].color} opacity={0.6} />
                      <circle cx="280" cy="180" r="4" fill={layers[2].color} opacity={0.6} />
                    </>
                  )}
                  {i >= 3 && (
                    <>
                      <rect x="110" y="50" width="60" height="40" rx="1" fill={layers[3].color} opacity={0.15} stroke={layers[3].color} strokeWidth="0.5" />
                      <rect x="230" y="50" width="60" height="40" rx="1" fill={layers[3].color} opacity={0.15} stroke={layers[3].color} strokeWidth="0.5" />
                      <rect x="110" y="130" width="180" height="100" rx="1" fill={layers[3].color} opacity={0.1} stroke={layers[3].color} strokeWidth="0.5" />
                    </>
                  )}
                  {i >= 4 && (
                    <text x="200" y="160" textAnchor="middle" fill={layers[4].color} fontSize="10" fontFamily="monospace" opacity={0.8}>
                      DIGITAL TWIN
                    </text>
                  )}
                </svg>
              </div>
            ))}

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-3">
              <div className="flex gap-1">
                {layers.map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-1 rounded-full transition-all duration-500"
                    style={{
                      backgroundColor: i <= activeLayer ? layers[Math.min(i, layers.length - 1)].color : 'rgba(255,255,255,0.15)',
                    }}
                  />
                ))}
              </div>
              <span className="font-mono text-xs text-accent/70">
                {Math.round(((activeLayer + 1) / layers.length) * 100)}%
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {layers.map((layer, i) => (
              <ScrollReveal key={layer.id} delay={0.1 * i}>
                <button
                  onClick={() => { setActiveLayer(i); setIsPlaying(false); if (intervalRef.current) clearInterval(intervalRef.current); }}
                  className={`w-full text-left p-5 border transition-all duration-300 ${
                    i <= activeLayer
                      ? 'border-accent/30 bg-accent/5'
                      : 'border-white/10 bg-transparent hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-8 h-8 flex items-center justify-center rounded-full text-white text-xs font-bold"
                      style={{ backgroundColor: layer.color }}
                    >
                      {layer.id}
                    </div>
                    <div>
                      <h4 className={`font-sans text-sm uppercase tracking-wider ${
                        i <= activeLayer ? 'text-accent' : 'text-text-light'
                      }`}>
                        {layer.label}
                      </h4>
                      <p className="text-xs text-text-light/70 mt-0.5">{layer.desc}</p>
                    </div>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
