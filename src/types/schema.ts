export type ProjectScope = 'FULLSTACK' | 'MOBILE' | 'BACKEND';

export interface ScreenMockup {
  id: string;
  title: string;
  description: string;
  image?: string;
}

export interface FeatureCard {
  title: string;
  description: string;
  icon: string;
}

export interface TimelineStep {
  phase: string;
  description: string;
}

export interface ChallengePair {
  problem: string;
  solution: string;
}

export interface CapabilityRow {
  title: string;
  description: string;
}

export interface TechRow {
  title: string;
  description: string;
}

export interface ProjectLocalizedData {
  title: string;
  category: string;
  desc: string;
  role: string;
  problem: string;
  outcome: string;
  highlights: string[];
  realtimeFeatures: string;
  aiFeatures: string;
  scalabilityDetails: string;
  performanceOptimizations: string;
  architectureHighlights: string[];
  scopeLabel: string;
  tagline: string;
  heroDescription: string;
  screens: ScreenMockup[];
  features: FeatureCard[];
  timeline: TimelineStep[];
  challenges: ChallengePair[];
  contribution?: string[];
  capabilities?: CapabilityRow[];
  implementation?: TechRow[];
  reflection?: string;
}

export interface ProjectLinks {
  github?: string;
  live?: string;
  store?: { label: string; url: string }[];
}

export interface ProjectImages {
  mockup: string;
  gallery?: string[];
}

export interface ProjectSchema {
  id: string;
  tech: string[];
  metrics: { label: { en: string; fa: string }; value: string }[];
  color: string;
  images: ProjectImages;
  links: ProjectLinks;
  scope: ProjectScope;
  year: string;
  status: string;
  en: ProjectLocalizedData;
  fa: ProjectLocalizedData;
  [languageCode: string]: any;
}

export interface TranslationDictionary {
  navbar: {
    about: string;
    services: string;
    projects: string;
    contact: string;
    architecture: string;
  };
  hero: {
    sub: string;
    role: string;
    description: string;
    contactBtn: string;
    projectsBtn: string;
    activeMode: string;
    specify: string;
  };
  about: {
    mindset: string;
    title: string;
    desc1: string;
    desc2: string;
    stats: {
      projects: string;
      projectsSub: string;
      experience: string;
      experienceSub: string;
      clients: string;
      clientsSub: string;
      satisfaction: string;
      satisfactionSub: string;
    };
  };
  services: {
    title: string;
    heading: string;
    sub: string;
    clientHeader: string;
    serverHeader: string;
    focus: string;
    items: {
      title: string;
      desc: string;
      focus: string;
    }[];
  };
  architecture: {
    title: string;
    heading: string;
    sub: string;
    labels: {
      client: string;
      gateway: string;
      microservices: string;
      websocket: string;
      database: string;
      cache: string;
    };
  };
  projects: {
    title: string;
    heading: string;
    sub: string;
    priority: string;
    allProjects: string;
    enter: string;
    close: string;
    specs: string;
    metricsHeader: string;
    metadataHeader: string;
    pillarsHeader: string;
    telemetryHeader: string;
    inquireBtn: string;
    filterAll: string;
    understand: string;
    theChallenge: string;
    theApproach: string;
    results: string;
    byTheNumbers: string;
    problemLabel: string;
    outcomeLabel: string;
    openCaseStudy: string;
    roles: {
      FULLSTACK: string;
      MOBILE: string;
      BACKEND: string;
    };
  };
  contact: {
    heading: string;
    name: string;
    email: string;
    msg: string;
    submit: string;
    success: string;
    footerText: string;
  };
}
