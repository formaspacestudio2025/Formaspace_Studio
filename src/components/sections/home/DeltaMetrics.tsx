'use client';

import { useEffect, useRef } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function DeltaMetrics() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    const w = rect.width;
    const h = rect.height;
    const pad = { top: 30, right: 30, bottom: 40, left: 50 };
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;

    let animationId: number;
    let progress = 0;

    const plannedData = [10, 18, 28, 40, 52, 62, 72, 80, 86, 91, 95, 100];
    const actualData = [10, 16, 24, 35, 48, 58, 66, 73, 80, 86, 91, 95];

    function draw(curveProgress: number) {
      ctx.clearRect(0, 0, w, h);

      const visMonths = Math.max(1, Math.floor(curveProgress * months.length));

      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 5; i++) {
        const y = pad.top + (chartH / 5) * i;
        ctx.beginPath();
        ctx.moveTo(pad.left, y);
        ctx.lineTo(w - pad.right, y);
        ctx.stroke();

        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.font = '10px monospace';
        ctx.textAlign = 'right';
        ctx.fillText(`${(100 - i * 20)}%`, pad.left - 8, y + 3);
      }

      const plannedVis = plannedData.slice(0, visMonths);
      const actualVis = actualData.slice(0, visMonths);

      // Planned line
      ctx.beginPath();
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      plannedVis.forEach((val, i) => {
        const x = pad.left + (chartW / (months.length - 1)) * i;
        const y = pad.top + chartH - (val / 100) * chartH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Actual line
      ctx.beginPath();
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2.5;
      actualVis.forEach((val, i) => {
        const x = pad.left + (chartW / (months.length - 1)) * i;
        const y = pad.top + chartH - (val / 100) * chartH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Labels
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      months.forEach((m, i) => {
        if (i % 2 === 0 || i === months.length - 1) {
          const x = pad.left + (chartW / (months.length - 1)) * i;
          if (i < visMonths) {
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
          }
          ctx.fillText(m, x, h - pad.bottom + 16);
        }
      });

      if (actualVis.length > 0) {
        const last = actualVis.length - 1;
        const lx = pad.left + (chartW / (months.length - 1)) * last;
        const ly = pad.top + chartH - (actualVis[last] / 100) * chartH;
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.arc(lx, ly, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#3b82f6';
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('— Planned', pad.left + 10, pad.top - 10);

      ctx.fillStyle = '#22c55e';
      ctx.fillText('— Actual', pad.left + 110, pad.top - 10);

      if (curveProgress < 1) {
        progress = Math.min(1, progress + 0.008);
        animationId = requestAnimationFrame(() => draw(progress));
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          progress = 0;
          draw(0);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (canvas) observer.observe(canvas);
    return () => {
      observer.disconnect();
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="relative bg-[#0f172a] py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-accent mb-4 block">
            Project Performance Dashboard
          </span>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <ScrollReveal delay={0.1}>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white leading-[1.15] max-w-xl">
                S-Curve — Planned vs Actual Progress
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="mt-8">
                <canvas
                  ref={canvasRef}
                  className="w-full h-[280px] border border-white/10 rounded-sm bg-[#0a0f1a]"
                />
              </div>
            </ScrollReveal>
          </div>

          <div>
            <ScrollReveal delay={0.2}>
              <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-accent mb-6">
                Key Performance Indicators
              </h3>
            </ScrollReveal>
            <div className="space-y-5">
              {[
                { label: 'Schedule Performance Index', value: '0.96', color: '#22c55e', bar: '68' },
                { label: 'Cost Performance Index', value: '0.93', color: '#3b82f6', bar: '72' },
                { label: 'Forecast Completion', value: '+2.5 mo', color: '#f59e0b', bar: '45' },
                { label: 'Change Order Impact', value: '$1.2M', color: '#ef4444', bar: '30' },
              ].map((kpi, i) => (
                <ScrollReveal key={kpi.label} delay={0.1 * i}>
                  <div className="p-4 border border-white/10 bg-white/5">
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-xs text-text-light uppercase tracking-wider">{kpi.label}</span>
                      <span className="font-mono text-sm text-white font-bold">{kpi.value}</span>
                    </div>
                    <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-[2000ms] ease-out"
                        style={{ width: `${kpi.bar}%`, backgroundColor: kpi.color }}
                      />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
