'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export function ContactClient() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to send message');
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center px-6 max-w-lg">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <span className="text-primary text-3xl">&#10003;</span>
          </div>
          <h1 className="font-display text-4xl text-text-primary mb-4">Thank You</h1>
          <p className="text-text-secondary text-lg mb-8">
            Your message has been received. Our team will get back to you within 24 hours.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 border border-border text-text-secondary uppercase tracking-wider text-xs hover:border-primary hover:text-primary transition-colors"
          >
            Back to Home
          </a>
        </div>
      </main>
    );
  }

  return (
    <main>
      <section className="relative pt-40 pb-28 md:pb-36 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <span className="text-primary uppercase tracking-[0.2em] text-xs font-sans">Contact</span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-text-primary mt-4 leading-tight">
              Get in Touch
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mt-6 leading-relaxed">
              Ready to discuss your project? Contact our team.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-28 md:pb-36 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ScrollReveal>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-text-secondary mb-2">Name</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 bg-transparent border border-border text-text-primary text-sm placeholder:text-text-secondary/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-text-secondary mb-2">Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 bg-transparent border border-border text-text-primary text-sm placeholder:text-text-secondary/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-text-secondary mb-2">Company</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full px-4 py-3 bg-transparent border border-border text-text-primary text-sm placeholder:text-text-secondary/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-text-secondary mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 bg-transparent border border-border text-text-primary text-sm placeholder:text-text-secondary/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                {error && (
                  <p className="text-red-400 text-sm" role="alert">{error}</p>
                )}
                <button
                  type="submit"
                  className="px-8 py-3 bg-primary text-background uppercase tracking-wider text-sm font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20"
                >
                  Send Message
                </button>
              </form>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="space-y-12 lg:pt-0 pt-10">
                <div className="p-8 border border-border bg-surface">
                  <h3 className="text-primary text-xs uppercase tracking-widest mb-3">Email</h3>
                  <p className="font-display text-xl text-text-primary hover:text-primary transition-colors">
                    info@formaspacestudio.com
                  </p>
                </div>
                <div className="p-8 border border-border bg-surface">
                  <h3 className="text-primary text-xs uppercase tracking-widest mb-3">Location</h3>
                  <p className="font-display text-xl text-text-primary">Bangalore, India</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
