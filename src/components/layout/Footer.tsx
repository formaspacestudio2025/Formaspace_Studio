'use client';

const services = [
  { label: 'Project Management Consultancy', href: '/services/project-management' },
  { label: 'Digital Engineering', href: '/services/digital-engineering' },
  { label: 'Project Controls', href: '/services/project-controls' },
  { label: 'Cost Management', href: '/services/cost-management' },
  { label: 'Schedule Management', href: '/services/schedule-management' },
  { label: 'Construction Management', href: '/services/construction-management' },
];

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Construction Intelligence', href: '/innovation' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

export function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-border/50 text-text-inverse">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="md:col-span-1">
            <a href="/" className="inline-flex items-center gap-2.5 mb-5">
              <img src="/logos/FSS logo.png" alt="FSS" className="h-8 w-auto brightness-0 invert" />
              <span className="font-sans text-lg font-semibold tracking-tight text-text-primary">
                Formaspace
              </span>
            </a>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              A modern digital-first project delivery company combining engineering expertise, BIM, project controls, cost intelligence, and construction technology.
            </p>
          </div>

          <div>
            <h4 className="font-sans text-xs uppercase tracking-widest text-accent mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs uppercase tracking-widest text-accent mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs uppercase tracking-widest text-accent mb-5">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li>Bangalore, India</li>
              <li>
                <a href="mailto:info@formaspacestudio.com" className="hover:text-text-primary transition-colors">
                  info@formaspacestudio.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-secondary">
            &copy; {new Date().getFullYear()} Formaspace Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-text-secondary hover:text-text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-text-secondary hover:text-text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
