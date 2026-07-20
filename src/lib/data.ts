/* ============================================================
   PORTFOLIO CONTENT
   Single source of truth — edit this to customize the site.
   ============================================================ */

export const profile = {
  name: "Adrian Voss",
  firstName: "Adrian",
  initials: "AV",
  role: "Full Stack Web & App Developer",
  tagline:
    "I build high-performance websites, scalable applications, AI-powered products, and digital experiences that people love.",
  location: "Berlin, Germany",
  timezone: "GMT+1",
  email: "hello@adrianvoss.dev",
  availability: "Available for select projects",
  bioShort:
    "Senior full-stack engineer crafting fast, beautiful, and resilient software for startups and enterprises.",
  bioLong:
    "I'm a full-stack engineer with 8+ years of experience designing and shipping production software — from pixel-perfect interfaces to distributed backends and AI-powered features. I care deeply about performance, accessibility, and the small details that make a product feel effortless. I've led teams, mentored engineers, and helped startups scale from idea to millions of users.",
  resumeUrl: "#",
};

export const socials = [
  { label: "GitHub", href: "https://github.com", icon: "github", handle: "@adrianvoss" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin", handle: "in/adrianvoss" },
  { label: "X / Twitter", href: "https://x.com", icon: "x", handle: "@adrianvoss" },
  { label: "Dribbble", href: "https://dribbble.com", icon: "dribbble", handle: "adrianvoss" },
] as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export const heroStats = [
  { value: 8, suffix: "+", label: "Years building" },
  { value: 120, suffix: "+", label: "Projects shipped" },
  { value: 40, suffix: "+", label: "Happy clients" },
];

export const aboutHighlights = [
  { icon: "rocket", title: "0 → 1 Product", desc: "Turn ideas into shipped, scalable products fast." },
  { icon: "gauge", title: "Performance", desc: "Sub-second loads, 95+ Lighthouse, Core Web Vitals." },
  { icon: "shield", title: "Reliability", desc: "Tested, observable systems that don't break." },
  { icon: "sparkles", title: "Design sense", desc: "Interfaces that feel considered and premium." },
];

export const timeline = [
  { year: "2024 — Now", role: "Principal Engineer", company: "Nebula Labs", desc: "Leading architecture for AI-native SaaS products used by 2M+ users." },
  { year: "2021 — 2024", role: "Senior Full Stack Engineer", company: "Lumen Studio", desc: "Built design systems and high-traffic web platforms for global brands." },
  { year: "2019 — 2021", role: "Product Engineer", company: "Orbit Fintech", desc: "Shipped cross-platform fintech apps handling millions in transactions." },
  { year: "2016 — 2019", role: "Frontend Developer", company: "Pixel & Co.", desc: "Delivered award-winning marketing sites and interactive experiences." },
];

export type SkillCategory = {
  icon: string;
  title: string;
  level: number;
  blurb: string;
  techs: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    icon: "layout",
    title: "Frontend",
    level: 96,
    blurb: "Interfaces with motion, depth, and obsessive polish.",
    techs: ["React", "Next.js", "TypeScript", "Vue", "Tailwind CSS", "Framer Motion", "GSAP"],
  },
  {
    icon: "server",
    title: "Backend",
    level: 92,
    blurb: "APIs and services built to scale and stay reliable.",
    techs: ["Node.js", "NestJS", "Express", "Python", "FastAPI", "GraphQL", "REST"],
  },
  {
    icon: "smartphone",
    title: "Mobile",
    level: 88,
    blurb: "Cross-platform apps that feel truly native.",
    techs: ["React Native", "Flutter", "Expo", "Swift UI", "Kotlin"],
  },
  {
    icon: "cloud",
    title: "Cloud & DevOps",
    level: 85,
    blurb: "Automated pipelines, infra, and zero-downtime deploys.",
    techs: ["AWS", "Docker", "Kubernetes", "GitHub Actions", "Terraform", "Vercel"],
  },
  {
    icon: "brain",
    title: "AI & Data",
    level: 84,
    blurb: "LLM features, RAG, and intelligent automation.",
    techs: ["OpenAI", "LangChain", "Python", "Pinecone", "pgvector", "Pandas"],
  },
  {
    icon: "database",
    title: "Database",
    level: 90,
    blurb: "Modeling, indexing, and querying at any scale.",
    techs: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Supabase", "Prisma", "Firebase"],
  },
];

export type Project = {
  id: string;
  title: string;
  category: "Web" | "Mobile" | "AI" | "Full Stack" | "Open Source";
  blurb: string;
  description: string;
  tags: string[];
  image: string;
  accent: "cyan" | "azure" | "violet";
  live: string;
  repo: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "aurora",
    title: "Aurora Analytics",
    category: "Full Stack",
    blurb: "Real-time analytics dashboard for product teams.",
    description:
      "A real-time product analytics platform processing 50M+ events/day with sub-second queries, live dashboards, and AI-generated insights.",
    tags: ["Next.js", "PostgreSQL", "Kafka", "Redis"],
    image: "/images/project-1.jpg",
    accent: "cyan",
    live: "#",
    repo: "#",
    featured: true,
  },
  {
    id: "vault",
    title: "Vault Fintech",
    category: "Mobile",
    blurb: "Cross-platform banking app.",
    description:
      "A secure, beautiful mobile banking experience with biometric auth, instant transfers, and budgeting — built once for iOS and Android.",
    tags: ["React Native", "Node.js", "GraphQL"],
    image: "/images/project-2.jpg",
    accent: "violet",
    live: "#",
    repo: "#",
    featured: true,
  },
  {
    id: "neuron",
    title: "Neuron AI",
    category: "AI",
    blurb: "RAG knowledge assistant.",
    description:
      "An enterprise assistant that answers from your private docs using retrieval-augmented generation, citations, and tool use.",
    tags: ["LangChain", "OpenAI", "pgvector", "FastAPI"],
    image: "/images/project-3.jpg",
    accent: "azure",
    live: "#",
    repo: "#",
    featured: true,
  },
  {
    id: "atlas",
    title: "Atlas Commerce",
    category: "Web",
    blurb: "Headless e-commerce storefront.",
    description:
      "A lightning-fast headless commerce storefront with edge rendering, personalized search, and a 99 Lighthouse score.",
    tags: ["Next.js", "Stripe", "Supabase"],
    image: "/images/project-4.jpg",
    accent: "cyan",
    live: "#",
    repo: "#",
  },
  {
    id: "forge",
    title: "Forge UI",
    category: "Open Source",
    blurb: "Headless component library.",
    description:
      "An accessible, headless React component library with 6k+ GitHub stars powering design systems across teams.",
    tags: ["React", "TypeScript", "Radix"],
    image: "/images/project-1.jpg",
    accent: "violet",
    live: "#",
    repo: "#",
  },
  {
    id: "pulse",
    title: "Pulse IoT",
    category: "Full Stack",
    blurb: "Fleet monitoring platform.",
    description:
      "Real-time IoT fleet monitoring with anomaly detection, alerts, and a live geospatial map of thousands of devices.",
    tags: ["Vue", "NestJS", "WebSocket", "AWS"],
    image: "/images/project-3.jpg",
    accent: "azure",
    live: "#",
    repo: "#",
  },
];

export const projectFilters = ["All", "Web", "Mobile", "AI", "Full Stack", "Open Source"] as const;

export type Service = {
  icon: string;
  title: string;
  desc: string;
};

export const services: Service[] = [
  { icon: "code", title: "Web Development", desc: "Modern, fast, accessible web apps and marketing sites engineered to convert." },
  { icon: "smartphone", title: "Mobile App Development", desc: "Cross-platform iOS & Android apps with native feel and shared codebase." },
  { icon: "server", title: "Backend & APIs", desc: "Robust, well-documented APIs and microservices built to scale." },
  { icon: "brain", title: "AI Integration", desc: "LLM features, copilots, and intelligent automation woven into your product." },
  { icon: "palette", title: "UI Development", desc: "Pixel-perfect, animated interfaces and reusable design systems." },
  { icon: "cloud", title: "Cloud Deployment", desc: "CI/CD, infrastructure-as-code, and zero-downtime production deploys." },
  { icon: "gauge", title: "Performance Optimization", desc: "Profile, optimize, and hit Core Web Vitals and 95+ Lighthouse scores." },
  { icon: "search", title: "SEO & Maintenance", desc: "Technical SEO, structured data, and ongoing care that keeps you growing." },
];

export const processSteps = [
  { step: "01", title: "Discovery", desc: "We dig into goals, users, and constraints to define the right scope." },
  { step: "02", title: "Planning", desc: "Architecture, milestones, and a clear roadmap you can trust." },
  { step: "03", title: "Design", desc: "Wireframes, UI, and motion that feel premium and on-brand." },
  { step: "04", title: "Development", desc: "Clean, tested, scalable code shipped in tight iterations." },
  { step: "05", title: "Testing", desc: "Automated tests, QA, and performance tuning across devices." },
  { step: "06", title: "Deployment", desc: "Smooth launch with CI/CD, monitoring, and zero downtime." },
  { step: "07", title: "Support", desc: "Ongoing improvements, analytics, and peace of mind." },
];

export const stats = [
  { value: 120, suffix: "+", label: "Projects Completed" },
  { value: 40, suffix: "+", label: "Global Clients" },
  { value: 8, suffix: " yrs", label: "Experience" },
  { value: 14, suffix: "k", label: "GitHub Contributions" },
  { value: 2840, suffix: "", label: "Coffees Consumed" },
];

export const techStack = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL", "GraphQL",
  "Tailwind", "AWS", "Docker", "Prisma", "Redis", "Flutter", "React Native",
  "Vue", "NestJS", "FastAPI", "OpenAI", "LangChain", "Kubernetes", "Vercel", "Supabase",
];

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number;
  accent: "cyan" | "azure" | "violet";
};

export const testimonials: Testimonial[] = [
  {
    name: "Sofia Marchetti",
    role: "CEO, Lumen Studio",
    quote: "Adrian delivered a platform that felt like a flagship product. The performance and polish blew our investors away.",
    rating: 5,
    accent: "cyan",
  },
  {
    name: "Daniel Cho",
    role: "CTO, Orbit Fintech",
    quote: "Rare to find an engineer who sweats both the architecture and the pixels. He raised the bar for our whole team.",
    rating: 5,
    accent: "violet",
  },
  {
    name: "Amara Okafor",
    role: "Founder, Nebula Labs",
    quote: "Our AI features went from idea to production in weeks. Adrian moves fast without ever cutting corners.",
    rating: 5,
    accent: "azure",
  },
  {
    name: "Lucas Bauer",
    role: "Product Lead, Atlas",
    quote: "99 Lighthouse, beautiful UI, and zero production fires. Working with Adrian is genuinely effortless.",
    rating: 5,
    accent: "cyan",
  },
  {
    name: "Priya Nair",
    role: "Design Director",
    quote: "He implemented my designs better than I imagined them. The motion and detail are next level.",
    rating: 5,
    accent: "violet",
  },
];

export const commandActions = [
  { id: "home", label: "Go to Home", hint: "Hero", icon: "home", href: "#home" },
  { id: "about", label: "View About", hint: "Bio & timeline", icon: "user", href: "#about" },
  { id: "skills", label: "Browse Skills", hint: "Tech & expertise", icon: "layers", href: "#skills" },
  { id: "work", label: "See Projects", hint: "Selected work", icon: "folder", href: "#work" },
  { id: "experience", label: "Open Experience", hint: "Career timeline", icon: "briefcase", href: "#experience" },
  { id: "services", label: "Explore Services", hint: "What I offer", icon: "sparkles", href: "#services" },
  { id: "contact", label: "Contact Me", hint: "Start a project", icon: "mail", href: "#contact" },
  { id: "github", label: "Open GitHub", hint: "External", icon: "github", href: "https://github.com" },
];
