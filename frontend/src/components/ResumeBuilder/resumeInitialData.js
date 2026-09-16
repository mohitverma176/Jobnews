export const emptyResumeData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    photoUrl: ''
  },
  summary: '',
  experience: [
    {
      id: '1',
      role: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: ''
    }
  ],
  education: [
    {
      id: '1',
      degree: '',
      field: '',
      institution: '',
      location: '',
      startYear: '',
      endYear: '',
      score: ''
    }
  ],
  skills: [
    { id: '1', category: 'Technical Skills', items: '' },
    { id: '2', category: 'Frameworks & Tools', items: '' },
    { id: '3', category: 'Soft Skills', items: '' }
  ],
  projects: [
    {
      id: '1',
      name: '',
      technologies: '',
      link: '',
      description: ''
    }
  ],
  certifications: [
    {
      id: '1',
      name: '',
      issuer: '',
      date: '',
      link: ''
    }
  ],
  languages: [
    { id: '1', language: '', proficiency: 'Fluent' }
  ]
};

export const sampleResumeData = {
  personalInfo: {
    fullName: 'Alex Morgan',
    jobTitle: 'Full Stack Software Engineer',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    website: 'https://alexmorgan.dev',
    linkedin: 'linkedin.com/in/alexmorgan',
    github: 'github.com/alexmorgan',
    photoUrl: ''
  },
  summary: 'Results-driven Full Stack Engineer with 4+ years of experience designing, scaling, and maintaining modern web applications. Skilled in React, Node.js, TypeScript, and cloud architecture. Passionate about building high-performance, accessible, and user-centric software solutions.',
  experience: [
    {
      id: '1',
      role: 'Senior Frontend Engineer',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA',
      startDate: 'Jan 2022',
      endDate: 'Present',
      isCurrent: true,
      description: '• Architected and migrated core SaaS dashboard to React 19 and Next.js, boosting page load speeds by 42%.\n• Collaborated with UX teams to implement an accessible component design system used across 5 enterprise apps.\n• Mentored 6 junior developers and established CI/CD automation pipelines reducing deployment cycle time by 30%.'
    },
    {
      id: '2',
      role: 'Software Developer',
      company: 'InnovateX Labs',
      location: 'Austin, TX',
      startDate: 'Jun 2020',
      endDate: 'Dec 2021',
      isCurrent: false,
      description: '• Developed RESTful APIs and real-time notification microservices using Node.js, Express, and Redis.\n• Implemented secure JWT authentication and Role-Based Access Control (RBAC) for over 100k active users.\n• Optimized database queries in PostgreSQL, resolving critical latency bottlenecks.'
    }
  ],
  education: [
    {
      id: '1',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      startYear: '2016',
      endYear: '2020',
      score: 'GPA: 3.8 / 4.0'
    }
  ],
  skills: [
    { id: '1', category: 'Programming Languages', items: 'JavaScript, TypeScript, Python, Java, SQL, HTML5, CSS3' },
    { id: '2', category: 'Frameworks & Libraries', items: 'React, Node.js, Express, Next.js, Redux, Tailwind CSS' },
    { id: '3', category: 'Cloud & Developer Tools', items: 'Git, Docker, AWS (S3, EC2), PostgreSQL, MongoDB, REST APIs, Jest' }
  ],
  projects: [
    {
      id: '1',
      name: 'CloudSync - Real-time Collaboration Tool',
      technologies: 'React, Node.js, Socket.io, WebRTC, Redis',
      link: 'https://github.com/alexmorgan/cloudsync',
      description: 'Built a collaborative document editor enabling 20+ simultaneous users to co-author with sub-50ms latency.'
    },
    {
      id: '2',
      name: 'DevPulse - Developer Job & Insights Platform',
      technologies: 'React, Express, Cheerio, Tailwind CSS',
      link: 'https://devpulse-demo.app',
      description: 'Aggregates tech job openings and career news with real-time search, filters, and salary trends.'
    }
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      date: '2023',
      link: 'https://aws.amazon.com/verification'
    },
    {
      id: '2',
      name: 'Meta Front-End Developer Professional Certificate',
      issuer: 'Coursera / Meta',
      date: '2021',
      link: ''
    }
  ],
  languages: [
    { id: '1', language: 'English', proficiency: 'Native' },
    { id: '2', language: 'Spanish', proficiency: 'Conversational' }
  ]
};

export const resumeTemplatesList = [
  {
    id: 'modern',
    name: 'Modern Two-Column',
    description: 'Sleek sidebar layout with high visual balance and organized sections',
    icon: 'fa-columns',
    badge: 'Popular'
  },
  {
    id: 'classic',
    name: 'Executive Classic',
    description: 'Traditional single-column layout optimized for ATS and corporate roles',
    icon: 'fa-file-lines',
    badge: 'ATS Friendly'
  },
  {
    id: 'tech',
    name: 'Tech Minimalist',
    description: 'Clean developer-focused timeline with structured skill tags and compact headers',
    icon: 'fa-code',
    badge: 'Tech / Dev'
  },
  {
    id: 'creative',
    name: 'Creative Header',
    description: 'Stylish top accent header bar with modern badges and clean typography',
    icon: 'fa-wand-magic-sparkles',
    badge: 'Modern'
  },
  {
    id: 'compact',
    name: 'Compact Grid',
    description: 'High information density for extensive experience and rich profiles',
    icon: 'fa-table-cells-large',
    badge: 'High Density'
  }
];

export const colorPalettes = [
  { id: 'navy', name: 'Navy Blue', primary: '#1e3a8a', secondary: '#3b82f6', light: '#eff6ff', text: '#1e293b' },
  { id: 'slate', name: 'Executive Slate', primary: '#334155', secondary: '#64748b', light: '#f8fafc', text: '#0f172a' },
  { id: 'emerald', name: 'Emerald Green', primary: '#065f46', secondary: '#10b981', light: '#ecfdf5', text: '#064e3b' },
  { id: 'violet', name: 'Royal Violet', primary: '#5b21b6', secondary: '#8b5cf6', light: '#f5f3ff', text: '#3b0764' },
  { id: 'crimson', name: 'Modern Crimson', primary: '#991b1b', secondary: '#ef4444', light: '#fef2f2', text: '#450a0a' },
  { id: 'amber', name: 'Warm Amber', primary: '#92400e', secondary: '#f59e0b', light: '#fffbeb', text: '#451a03' },
  { id: 'teal', name: 'Cyber Teal', primary: '#0f766e', secondary: '#14b8a6', light: '#f0fdfa', text: '#134e4a' }
];

export const fontOptions = [
  { id: 'sans', name: 'Modern Sans', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" },
  { id: 'serif', name: 'Classic Serif', fontFamily: "'Georgia', 'Times New Roman', serif" },
  { id: 'mono', name: 'Clean Tech Mono', fontFamily: "'Fira Code', 'Courier New', monospace" }
];
