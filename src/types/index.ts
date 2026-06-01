export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  area: string;
  status: 'completed' | 'in-progress' | 'planning';
  timeline: string;
  description: string;
  story: string;
  approach: string;
  technologies: string[];
  workflows: string[];
  heroImage: string;
  gallery: string[];
  client: string;
  year: number;
  tags: string[];
}

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  methodology: string[];
  deliverables: string[];
  technologies: string[];
  color: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Insight {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

export interface Metric {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
}

export interface CompanyValue {
  id: string;
  title: string;
  description: string;
}

export interface TechInnovation {
  icon: string;
  title: string;
  description: string;
  capabilities: string[];
}

export interface Industry {
  id: string;
  title: string;
  description: string;
  icon: string;
}
