import type {
  Project,
  Service,
  TeamMember,
  Insight,
  Metric,
  CompanyValue,
  TechInnovation,
  Industry,
} from '@/types';

export const services: Service[] = [
  {
    id: 'project-management',
    title: 'Project Management Consultancy',
    subtitle: 'Governance, control, and strategic delivery',
    description:
      'End-to-end project management consultancy covering governance frameworks, PMO setup, stakeholder alignment, and delivery assurance. We establish the systems, processes, and reporting structures that keep complex programmes on track.',
    problem:
      'Capital projects lose value when governance is weak, roles are undefined, and decision-making lacks a structured framework.',
    solution:
      'We deploy fit-for-purpose governance models, establish PMOs with clear escalation paths, and implement reporting cadences that give stakeholders real visibility into project health.',
    methodology: [
      'Governance framework design and implementation',
      'PMO setup with standardised processes and tooling',
      'Stakeholder mapping and communication planning',
      'Stage-gate assurance and peer reviews',
      'Benefits realisation tracking and close-out reporting',
    ],
    deliverables: [
      'Project governance charter and RACI matrix',
      'PMO operating model and process manuals',
      'Dashboard reporting suite for steering committees',
      'Risk and issue registers with mitigation plans',
      'Lessons learned and project close-out reports',
    ],
    technologies: ['Power BI', 'MS Project', 'Jira', 'Confluence', 'SharePoint', 'Procore'],
    color: '#1e3a5f',
  },
  {
    id: 'digital-engineering',
    title: 'Digital Engineering',
    subtitle: 'BIM, information management, and digital delivery',
    description:
      'Comprehensive digital engineering services from BIM execution planning through model authoring, coordination, and information management. We help clients achieve ISO 19650 compliance and unlock the full value of their project data.',
    problem:
      'Construction projects generate vast amounts of data but most organisations lack the workflows, standards, and talent to turn that data into actionable intelligence.',
    solution:
      'We establish BIM execution plans, common data environments, and automated quality-control workflows that ensure model data is accurate, coordinated, and available when decisions are made.',
    methodology: [
      'BIM execution plan development aligned to ISO 19650',
      'Common data environment setup and administration',
      'Federated model coordination with automated clash workflows',
      '4D construction sequencing and 5D cost integration',
      'Digital twin configuration for asset operations',
    ],
    deliverables: [
      'BIM execution plan and standards manual',
      'Federated multidisciplinary models at LOD 350+',
      'Clash detection reports and resolution logs',
      'Quantity take-offs and cost plan exports',
      'COBie-compliant asset data drops',
    ],
    technologies: ['Revit + Dynamo', 'Navisworks Manage', 'Solibri Office', 'BIM 360 / ACC', 'Dalux', 'Power BI'],
    color: '#2563eb',
  },
  {
    id: 'project-controls',
    title: 'Project Controls',
    subtitle: 'Cost, schedule, risk — integrated and transparent',
    description:
      'Integrated project controls services covering cost control, forecasting, change management, earned value analysis, and performance reporting. We give project leaders the numbers they need to make confident decisions.',
    problem:
      'Without integrated controls, cost and schedule data live in separate silos, making it impossible to forecast true project outcomes or catch deviations before they become crises.',
    solution:
      'We implement unified cost-schedule baselines with earned value management, weekly forensic analysis, and exception-based reporting that flags issues before they escalate.',
    methodology: [
      'Control account setup and work breakdown structure development',
      'Integrated cost-schedule baselining with EVM',
      'Monthly forecasting and variance analysis',
      'Change control administration and trend analysis',
      'Risk-adjusted contingency management and drawdown tracking',
    ],
    deliverables: [
      'Project controls plan and procedures manual',
      'Integrated cost-schedule baseline with EVM metrics',
      'Monthly performance reports with dashboards',
      'Change log with impact assessments',
      'Risk register with Monte Carlo analysis outputs',
    ],
    technologies: ['Primavera P6', 'Power BI', 'MS Project', 'Excel', 'Oracle EPM', 'Procore'],
    color: '#0f172a',
  },
  {
    id: 'cost-management',
    title: 'Cost Management',
    subtitle: 'Budget planning, procurement, commercial control',
    description:
      'Full-spectrum cost management services from feasibility and budget planning through procurement support, commercial management, and final account resolution. We protect your bottom line at every stage.',
    problem:
      'Poor cost intelligence during design and procurement leads to budget overruns that could have been avoided with better commercial discipline.',
    solution:
      'We embed cost managers within project teams to provide real-time cost feedback during design, competitive procurement strategies, and rigorous commercial control through construction.',
    methodology: [
      'Feasibility studies and order-of-magnitude estimates',
      'Cost planning through design stages with elemental analysis',
      'Procurement strategy development and tender evaluation',
      'Contract administration and payment valuation',
      'Final account negotiation and close-out',
    ],
    deliverables: [
      'Feasibility estimates and budget plans',
      'Elemental cost plans at each design stage',
      'Tender documentation and evaluation reports',
      'Monthly cost reports with cash flow forecasts',
      'Final account statements and variation logs',
    ],
    technologies: ['Excel', 'Power BI', 'CostX', 'Bluebeam Revu', 'Procore', 'Oracle EPM'],
    color: '#059669',
  },
  {
    id: 'schedule-management',
    title: 'Schedule Management',
    subtitle: 'Primavera P6, planning, progress, delay analysis',
    description:
      'Professional schedule management services using Primavera P6 and industry-best planning practices. From baseline development through progress monitoring and delay analysis, we keep programmes on track.',
    problem:
      'Construction schedules are often optimistic, poorly resourced, and disconnected from actual site progress, making realistic completion dates impossible to predict.',
    solution:
      'We build resource-loaded, risk-adjusted schedules with forensic progress monitoring and proactive delay analysis that gives early warning of slippage.',
    methodology: [
      'Schedule strategy development and level 1-4 planning',
      'Resource-loaded baseline development in Primavera P6',
      'Progress measurement with earned schedule techniques',
      'Forensic delay analysis and impact quantification',
      'Recovery planning and schedule compression',
    ],
    deliverables: [
      'Schedule management plan and WBS dictionary',
      'Resource-loaded Primavera P6 schedule',
      'Weekly progress reports with S-curves',
      'Delay analysis reports and entitlement assessments',
      'Recovery schedules and what-if scenarios',
    ],
    technologies: ['Primavera P6', 'MS Project', 'Synchro 4D', 'Power BI', 'TILOS', 'Excel'],
    color: '#dc2626',
  },
  {
    id: 'construction-management',
    title: 'Construction Management',
    subtitle: 'Site coordination, quality, and handover',
    description:
      'Construction management services that bridge the gap between design and delivery. We provide site coordination, quality assurance, progress tracking, and structured handover processes.',
    problem:
      'The design-to-construction handover is where most projects lose value — poor coordination, unclear quality standards, and fragmented handover processes lead to rework and delays.',
    solution:
      'We deploy structured site management systems with clear quality gates, daily progress tracking, and digital handover workflows that ensure nothing is missed.',
    methodology: [
      'Site mobilisation and logistics planning',
      'Daily progress monitoring and look-ahead planning',
      'Quality inspection and test plan execution',
      'Non-conformance tracking and corrective action management',
      'Structured handover with snagging and commissioning support',
    ],
    deliverables: [
      'Construction management and logistics plans',
      'Daily and weekly progress reports',
      'Quality inspection records and NCR logs',
      'Snagging lists and completion certificates',
      'Handover dossiers and O&M manuals',
    ],
    technologies: ['Procore', 'Power BI', 'Bluebeam Revu', 'Autodesk Build', 'PlanGrid', 'Fieldwire'],
    color: '#0891b2',
  },
];

export const industries: Industry[] = [
  {
    id: 'hospitality',
    title: 'Hospitality',
    description: 'Hotels, resorts, serviced apartments, and leisure developments. Project controls, BIM coordination, and construction management for hospitality clients.',
    icon: '✦',
  },
  {
    id: 'commercial',
    title: 'Commercial',
    description: 'Office towers, retail centres, and mixed-use complexes. Integrated PMC and digital engineering for high-rise and campus developments.',
    icon: '◆',
  },
  {
    id: 'residential',
    title: 'Residential',
    description: 'Luxury apartments, master-planned communities, and affordable housing. Schedule management, cost control, and BIM delivery for residential programmes.',
    icon: '◈',
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    description: 'Hospitals, clinics, and medical research facilities. Specialised project controls and digital engineering for regulated healthcare environments.',
    icon: '◎',
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure',
    description: 'Airports, transit systems, roads, and utilities. Megaproject programme management, BIM, and project controls for infrastructure clients.',
    icon: '⊕',
  },
  {
    id: 'government',
    title: 'Government',
    description: 'Public sector buildings, civic infrastructure, and defence. Governance, reporting, and assurance frameworks for publicly funded projects.',
    icon: '⊞',
  },
  {
    id: 'mixed-use',
    title: 'Mixed-Use Developments',
    description: 'Integrated urban developments combining residential, commercial, retail, and public space. End-to-end PMC and digital delivery coordination.',
    icon: '⊡',
  },
];

export const projects: Project[] = [
  {
    id: 'oceanic-horizon-resort',
    title: 'Oceanic Horizon Resort',
    category: 'Hospitality',
    location: 'Dubai, UAE',
    area: '85,000 sqm',
    status: 'completed',
    timeline: '2023 – 2024',
    description:
      'Integrated project management and digital engineering services for a 5-star beachfront resort development. Delivered BIM coordination, project controls, and construction management across 450 guest suites, private villas, and wellness amenities.',
    story:
      'The client required a delivery partner who could manage complex coastal construction while maintaining strict programme and budget targets. Our team established the project controls framework, led BIM coordination across 12 consulting firms, and provided on-site construction management through to handover.',
    approach:
      'We deployed an integrated PMC approach with a dedicated project controls team managing cost, schedule, and risk. BIM coordination was centralised through a common data environment with automated clash detection. Daily site coordination and quality inspections ensured construction milestones were met.',
    technologies: ['Revit + Dynamo', 'Navisworks Manage', 'Primavera P6', 'Power BI', 'Procore', 'BIM 360'],
    workflows: [
      'ISO 19650-compliant CDE with 12 supply chain partners',
      'Federated BIM coordination with weekly clash resolution',
      'Earned value management with monthly forecasting',
      'Digital quality inspections and NCR tracking',
      'Structured handover with COBie asset data',
    ],
    heroImage: '/images/projects/oceanic-horizon-hero.jpg',
    gallery: [
      '/images/projects/oceanic-horizon-01.jpg',
      '/images/projects/oceanic-horizon-02.jpg',
      '/images/projects/oceanic-horizon-03.jpg',
    ],
    client: 'Al Jazira Hospitality Group',
    year: 2024,
    tags: ['hospitality', 'resort', 'project-controls', 'bim-coordination', 'dubai'],
  },
  {
    id: 'vertika-commercial-tower',
    title: 'Vertika Commercial Tower',
    category: 'Commercial',
    location: 'London, United Kingdom',
    area: '120,000 sqm',
    status: 'completed',
    timeline: '2021 – 2024',
    description:
      'PMC and digital engineering services for a 52-storey Grade-A commercial tower. Delivered project controls, cost management, and BIM coordination for one of London most technically demanding high-rise developments.',
    story:
      'The project faced stringent heritage sight-line constraints and an ambitious 52-month programme. Our team provided integrated project controls and BIM management that kept the complex diagrid structure on schedule and within budget.',
    approach:
      'We implemented a digital delivery framework with BIM at its core, federating models from 15 consultants into a single coordinated environment. The project controls team managed a 52-month schedule with earned value tracking and monthly cost forecasting.',
    technologies: ['Revit + Dynamo', 'Primavera P6', 'Navisworks', 'Power BI', 'Solibri', 'CostX'],
    workflows: [
      'LOD 350 multidisciplinary model federation',
      '4D construction sequencing for logistics coordination',
      'Earned value management with 15 control accounts',
      'Monthly cost forecasts and variance analysis',
      'Digital fabrication coordination for diagrid facade',
    ],
    heroImage: '/images/projects/vertika-tower-hero.jpg',
    gallery: [
      '/images/projects/vertika-tower-01.jpg',
      '/images/projects/vertika-tower-02.jpg',
      '/images/projects/vertika-tower-03.jpg',
    ],
    client: 'Thameside Development Corporation',
    year: 2024,
    tags: ['commercial', 'highrise', 'digital-engineering', 'project-controls', 'london'],
  },
  {
    id: 'nexus-innovation-campus',
    title: 'Nexus Innovation Campus',
    category: 'Commercial',
    location: 'Berlin, Germany',
    area: '45,000 sqm',
    status: 'completed',
    timeline: '2020 – 2023',
    description:
      'Programme management and digital engineering for a technology campus of five interconnected pavilions. Delivered cost management, BIM coordination, and construction management for this fast-track R&D facility.',
    story:
      'A global technology company needed to deliver a European R&D headquarters on an aggressive 36-month programme. Our team established the programme management office and digital engineering framework that enabled phased delivery and rapid decision-making.',
    approach:
      'We established a PMO that managed procurement, cost control, and schedule across five simultaneous work packages. BIM was used not just for coordination but for direct fabrication output, enabling off-site manufacture of modular building components.',
    technologies: ['Revit + Dynamo', 'Tekla Structures', 'Primavera P6', 'Power BI', 'Dalux', 'Catia'],
    workflows: [
      'PMO setup with stage-gate governance',
      'Federated BIM for MEP-structural-facade coordination',
      '4D phasing for phased occupancy strategy',
      'BOM extraction for modular panel procurement',
      'Digital handover with IoT sensor integration',
    ],
    heroImage: '/images/projects/nexus-innovation-campus-hero.jpg',
    gallery: [
      '/images/projects/nexus-innovation-campus-01.jpg',
      '/images/projects/nexus-innovation-campus-02.jpg',
    ],
    client: 'Quantix Technologies GmbH',
    year: 2023,
    tags: ['commercial', 'tech-campus', 'programme-management', 'digital-engineering', 'berlin'],
  },
  {
    id: 'terra-residences',
    title: 'Terra Residences',
    category: 'Residential',
    location: 'Singapore',
    area: '25,000 sqm',
    status: 'completed',
    timeline: '2022 – 2024',
    description:
      'Project controls and BIM management for a biophilic luxury residential development. Delivered cost control, schedule management, and coordinated BIM delivery across 120 apartment units with integrated sky gardens.',
    story:
      'The developer required rigorous cost and schedule control for a complex residential project featuring cascading sky gardens and a rainforest atrium. Our project controls team managed the budget through design development and tracked progress during construction.',
    approach:
      'We implemented earned value management with monthly forecasting and risk-adjusted contingency drawdown. BIM coordination ensured MEP services were integrated with the complex landscape and structural elements.',
    technologies: ['Revit', 'Primavera P6', 'Navisworks', 'Power BI', 'Bluebeam Revu', 'BIM 360'],
    workflows: [
      'Control account setup with 12 cost centres',
      'Earned value analysis with monthly EAC forecasts',
      'Clash-free MEP-structural BIM coordination',
      'Quantity take-offs for bioretention systems',
      'Progress measurement with S-curve tracking',
    ],
    heroImage: '/images/projects/terra-residences-hero.jpg',
    gallery: [
      '/images/projects/terra-residences-01.jpg',
      '/images/projects/terra-residences-02.jpg',
      '/images/projects/terra-residences-03.jpg',
    ],
    client: 'Greenhill Living Pte Ltd',
    year: 2024,
    tags: ['residential', 'biophilic', 'project-controls', 'cost-management', 'singapore'],
  },
  {
    id: 'al-najd-airport',
    title: 'Al-Najd International Airport',
    category: 'Infrastructure',
    location: 'Riyadh, Saudi Arabia',
    area: '450,000 sqm',
    status: 'in-progress',
    timeline: '2024 – 2028',
    description:
      'Megaproject programme management and digital engineering for a greenfield international airport. Delivering project controls, BIM management, and construction intelligence across 10+ design and construction partners.',
    story:
      'The Kingdom is building a next-generation aviation gateway as part of Vision 2030. Our team was engaged to provide the programme controls framework, BIM coordination, and digital delivery systems for this landmark infrastructure project.',
    approach:
      'We deployed a fully integrated programme management office with 40+ controls staff managing cost, schedule, risk, and change across all workstreams. BIM coordination follows ISO 19650 protocols with a common data environment connecting 10+ supply chain partners.',
    technologies: [
      'Revit + Dynamo',
      'Primavera P6',
      'Navisworks Manage',
      'Bentley iTwin',
      'Synchro 4D',
      'Oracle EPM',
      'Power BI',
    ],
    workflows: [
      'ISO 19650-compliant CDE with 10+ supply chain partners',
      'LOD 350 to LOD 500 progressive model delivery',
      '4D construction simulation with 2,600+ activities',
      'Earned value management across 80+ control accounts',
      'Risk-adjusted contingency management with Monte Carlo analysis',
      'Digital twin commissioning for BMS integration',
    ],
    heroImage: '/images/projects/al-najd-airport-hero.jpg',
    gallery: [
      '/images/projects/al-najd-airport-01.jpg',
      '/images/projects/al-najd-airport-02.jpg',
      '/images/projects/al-najd-airport-03.jpg',
    ],
    client: 'General Authority of Civil Aviation (GACA)',
    year: 2028,
    tags: ['infrastructure', 'airport', 'megaproject', 'programme-controls', 'digital-engineering', 'vision-2030'],
  },
  {
    id: 'crystal-cultural-centre',
    title: 'Crystal Cultural Centre',
    category: 'Government',
    location: 'Seoul, South Korea',
    area: '12,000 sqm',
    status: 'completed',
    timeline: '2021 – 2023',
    description:
      'Project management and digital engineering for an iconic translucent cultural centre. Delivered cost control, schedule management, and BIM coordination for this complex glass-and-ETFE structure set within a reclaimed urban waterway park.',
    story:
      'The Seoul Metropolitan Government needed a delivery partner who could manage the technical complexity of an ultra-high-performance glass structure while maintaining strict public-sector budget controls. Our team provided end-to-end PMC and digital engineering services.',
    approach:
      'We managed the project through a stage-gate governance framework with monthly reporting to the city council. BIM coordination was critical given the complex steel-to-glass connections and ETFE cushion roof system.',
    technologies: ['Revit', 'Primavera P6', 'Navisworks', 'Power BI', 'BIMcollab', 'Solibri'],
    workflows: [
      'Stage-gate project governance with council reporting',
      'LOD 350 A/S/MEP coordinated federated model',
      'Parametric panel rationalisation and fabrication numbering',
      'Clash detection for complex steel-to-glass connections',
      'As-maintained BIM for facility operations handover',
    ],
    heroImage: '/images/projects/crystal-cultural-centre-hero.jpg',
    gallery: [
      '/images/projects/crystal-cultural-centre-01.jpg',
      '/images/projects/crystal-cultural-centre-02.jpg',
      '/images/projects/crystal-cultural-centre-03.jpg',
    ],
    client: 'Seoul Metropolitan Government',
    year: 2023,
    tags: ['government', 'cultural', 'project-management', 'bim-coordination', 'seoul'],
  },
];

export const team: TeamMember[] = [
  {
    id: 'nadeem-ahmad',
    name: 'Nadeem Ahmad',
    role: 'BIM Lead',
    bio: 'Nadeem leads our digital engineering practice with deep expertise in BIM management, ISO 19650 implementation, and federated model coordination. He has delivered BIM strategies for large-scale infrastructure and commercial projects, managing multidisciplinary teams across common data environments. Nadeem specialises in automating quality assurance workflows through Dynamo and ensuring model data integrity from design through construction and handover.',
    image: '/images/team/nadeem-ahmad.jpg',
  },
  {
    id: 'syed-sajid-kirmani',
    name: 'Syed Sajid Kirmani',
    role: 'Project Controls Lead',
    bio: 'Syed Sajid oversees our project controls practice, bringing extensive experience in cost engineering, planning, earned value management, and risk analysis. He has established project controls frameworks for programmes with combined capital value exceeding USD 8 billion. Syed Sajid is a certified Planning & Scheduling Professional (PSP) and champions integrated cost-schedule baselining and forensic delay analysis across all company engagements.',
    image: '/images/team/syed-sajid-kirmani.jpg',
  },
];

export const insights: Insight[] = [
  {
    id: 'evm-best-practices',
    title: 'Earned Value Management on Complex Capital Programmes',
    excerpt:
      'Why traditional EVM falls short on megaprojects and how we adapted the methodology with probabilistic forecasting, leading indicators, and integrated risk-cost schedules.',
    category: 'Project Controls',
    author: 'Syed Sajid Kirmani',
    date: '2025-11-15',
    readTime: '8 min read',
    image: '/images/insights/evm-practices.jpg',
  },
  {
    id: 'iso-19650-implementation-guide',
    title: 'Implementing ISO 19650: A Practical Guide for Project Teams',
    excerpt:
      'Lessons from deploying Common Data Environments across 10+ supply-chain partners on megaprojects, including template strategies, permission schemas, and automation wins.',
    category: 'Digital Engineering',
    author: 'Nadeem Ahmad',
    date: '2025-09-28',
    readTime: '12 min read',
    image: '/images/insights/iso-19650-guide.jpg',
  },
  {
    id: 'digital-twin-construction-operations',
    title: 'Closing the Loop: Digital Twins from Construction to Operations',
    excerpt:
      'A practical framework for deploying digital twins that start adding value during construction and seamlessly transition to facilities management.',
    category: 'Technology',
    author: 'Nadeem Ahmad',
    date: '2025-08-12',
    readTime: '10 min read',
    image: '/images/insights/digital-twin-construction.jpg',
  },
  {
    id: 'ai-progress-monitoring',
    title: 'Computer Vision for Automated Progress Monitoring',
    excerpt:
      'How AI-powered cameras can detect progress deviations across large construction sites, reduce manual inspections, and feed live data into project schedules.',
    category: 'Innovation',
    author: 'Syed Sajid Kirmani',
    date: '2025-06-20',
    readTime: '11 min read',
    image: '/images/insights/ai-progress-monitoring.jpg',
  },
  {
    id: 'cost-management-strategies',
    title: 'Cost Management in Volatile Markets: Strategies That Work',
    excerpt:
      'Practical approaches to protecting project budgets during periods of material price volatility, labour shortages, and supply chain disruption.',
    category: 'Cost Management',
    author: 'Syed Sajid Kirmani',
    date: '2025-04-15',
    readTime: '7 min read',
    image: '/images/insights/cost-management.jpg',
  },
  {
    id: 'bim-coordination-megaprojects',
    title: 'BIM Coordination at Scale: Lessons from Airport Megaprojects',
    excerpt:
      'How federated BIM coordination, automated clash detection, and common data environments are transforming delivery on the worlds largest infrastructure programmes.',
    category: 'Digital Engineering',
    author: 'Nadeem Ahmad',
    date: '2025-02-10',
    readTime: '9 min read',
    image: '/images/insights/bim-coordination.jpg',
  },
];

export const metrics: Metric[] = [
  { value: 6, suffix: '+', label: 'Projects Delivered' },
  { value: 50, suffix: 'K', label: 'Sqm Under Management', prefix: '+' },
  { value: 20, suffix: 'M', label: 'Project Value Managed', prefix: '$' },
  { value: 10, suffix: '+', label: 'Supply Chain Partners' },
  { value: 6, suffix: '', label: 'Service Lines' },
];

export const companyValues: CompanyValue[] = [
  {
    id: '01',
    title: 'Technical Excellence',
    description: 'Every engagement is delivered with rigour and precision. Our team combines deep construction expertise with advanced digital capabilities to ensure outcomes that stand up to scrutiny.',
  },
  {
    id: '02',
    title: 'Data-Driven Delivery',
    description: 'We make decisions based on evidence, not intuition. Project intelligence, earned value analysis, and real-time dashboards inform every recommendation we make.',
  },
  {
    id: '03',
    title: 'Digital First',
    description: 'BIM, project controls platforms, and digital twins are not add-ons — they are the foundation of how we manage and deliver projects. We build digital ecosystems that connect design, construction, and operations.',
  },
  {
    id: '04',
    title: 'Founder-Led Expertise',
    description: 'Our leadership is hands-on. Nadeem and Sajid are directly involved in every engagement, bringing their specialist expertise in BIM and project controls to bear on every project.',
  },
];

export const techInnovations: TechInnovation[] = [
  {
    icon: '◈',
    title: 'Building Information Modeling',
    description: 'Comprehensive BIM management from execution planning through model authoring, coordination, and information management. We deliver ISO 19650-compliant digital environments.',
    capabilities: ['BIM Execution Planning', 'Model Authoring & Coordination', 'Clash Detection & Resolution', 'Quantity Take-Offs', 'COBie Data Drops'],
  },
  {
    icon: '◇',
    title: 'Digital Twin',
    description: 'Live digital replicas of built assets that connect design, construction, and operations data into a single source of truth for decision-making.',
    capabilities: ['IoT Integration', 'Real-Time Monitoring', 'Predictive Maintenance', 'Performance Simulation', 'Asset Management'],
  },
  {
    icon: '◎',
    title: 'Reality Capture',
    description: 'High-precision laser scanning and photogrammetry services for as-built verification, progress tracking, and digital asset creation.',
    capabilities: ['3D Laser Scanning', 'Drone Photogrammetry', 'Scan-to-BIM', 'Progress Deviation Analysis', 'Heritage Documentation'],
  },
  {
    icon: '⊕',
    title: 'AI & Construction Analytics',
    description: 'Machine learning and computer vision applications for progress monitoring, quality detection, schedule risk prediction, and document intelligence.',
    capabilities: ['Progress Monitoring', 'Anomaly Detection', 'Risk Prediction', 'Document Intelligence', 'Generative Design'],
  },
  {
    icon: '⊞',
    title: 'Project Intelligence',
    description: 'Executive dashboards and analytics platforms that transform complex project data into actionable intelligence for stakeholders at every level.',
    capabilities: ['Power BI Dashboards', 'Earned Value Analytics', 'Portfolio Reporting', 'Trend Analysis', 'Scenario Modelling'],
  },
  {
    icon: '⊡',
    title: 'Construction Technology',
    description: 'Integrated construction technology stacks connecting site to office with real-time data on progress, quality, safety, and resource utilisation.',
    capabilities: ['Field Management Apps', 'Quality Inspection Workflows', 'Progress Photo Analytics', 'Resource Tracking', 'Digital Handover'],
  },
];

export const clientLogos: string[] = [
  'Hospitality Developer Dubai',
  'London Commercial Developer',
  'Singapore Residential Group',
  'European Tech Conglomerate',
  'Middle East Government Authority',
  'Seoul Metropolitan Government',
];

export const partnerLogos: string[] = [
  'Autodesk',
  'Oracle',
  'Microsoft',
  'Procore',
  'Trimble',
];

export const certifications: string[] = [
  'ISO 19650 BIM Certified',
  'Primavera P6 Certified',
  'Project Management Professional (PMP)',
  'Planning & Scheduling Professional (PSP)',
  'LEED Accredited Professional',
];

export const memberships: string[] = [
  'Project Management Institute (PMI)',
  'Royal Institution of Chartered Surveyors (RICS)',
  'buildingSMART International',
  'Association for the Advancement of Cost Engineering (AACE)',
  'Construction Management Association of America (CMAA)',
];

export const awards: string[] = [
  'Construction Innovation Award — Digital Delivery 2024',
  'BIM Excellence Award — Middle East 2023',
  'Project Controls Leadership Award 2023',
  'Technology in Construction Finalist 2024',
];
