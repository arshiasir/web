import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Github, ChevronLeft, ChevronRight, ArrowLeft, ArrowUpRight, Linkedin, GitBranch, Boxes, Cpu, Radio, Smartphone, Webhook, Database, Cloud, Share2, Server } from 'lucide-react';
import type { ProjectSchema } from '../types/schema';
import { projectsData } from '../data/projectsData';
import ArchitectureMap from '../components/ArchitectureMap';
import './caseStudy.css';

interface ProjectDetailProps {
  project: ProjectSchema;
  languageKey: 'en' | 'fa';
  onBack: () => void;
  onContact: () => void;
  onOpenProject?: (id: string) => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const ui = {
  en: {
    back: 'Back to Projects',
    navOverview: 'Overview', navScreens: 'Screens', navTechnical: 'Technical', navArchitecture: 'Architecture', navChallenges: 'Challenges', navResults: 'Results',
    contact: 'Contact',
    explore: 'Explore the App', github: 'GitHub', viewLive: 'View Live',
    projectOverview: 'Project Overview', overviewLead: 'Why this project exists, and what it actually delivers.',
    problemLabel: 'The problem', valueLabel: 'What it delivers',
    myContribution: 'My Contribution', builtWith: 'Built with',
    walkthrough: 'Product Walkthrough', walkthroughLead: 'Navigate the core screens. Each one exists to solve a specific moment in the workflow.',
    keyInteraction: 'Key interaction', whyExists: 'Why it exists',
    devHighlights: 'Development Highlights', devHighlightsLead: 'The engineering work that mattered — not feature checkboxes.',
    productCapabilities: 'Product Capabilities', technicalImplementation: 'Technical Implementation', engineeringNotes: 'Engineering Notes',
    architecture: 'Technical Architecture', architectureLead: 'A deliberately simple flow. Each layer has one job, which kept the system debuggable as it scaled.',
    architectureNote: 'Layers stay decoupled so a slow subsystem never blocks a core write path.',
    challengesTitle: 'Challenges & Solutions', challengesLead: 'The interesting part of any real product is what broke, and why the fix looks obvious in hindsight.',
    resultsTitle: 'Results', resultsLead: 'Numbers from production telemetry and post-launch review — not projections.',
    outcomeLabel: 'Outcome', gallery: 'Gallery', galleryLead: 'Click any screen to view it fullscreen.',
    reflection: 'Developer Reflection', reflectionLead: 'What I would tell my past self.',
    nextProjects: 'Next Projects', nextProjectsLead: 'Keep exploring related work.',
    openProject: 'Open case study',
    builtBy: 'Built by Arshia', builtByDesc: 'Mobile & fullstack developer focused on clean, scalable and user-centered applications.',
    viewProfile: 'GitHub', roleLabel: 'Role', platformsLabel: 'Platforms', statusLabel: 'Status', yearLabel: 'Year',
    roleDev: { MOBILE: 'Mobile Developer', FULLSTACK: 'Fullstack Developer', BACKEND: 'Backend Developer' },
    platforms: { MOBILE: 'Android & iOS', OTHER: 'Web & API' },
    statusMap: { 'In Development': 'In Development', 'Production': 'Production' },
    problem: 'Problem', solution: 'Solution',
    notes: { realtime: 'Real-time', ai: 'AI / Automation', scale: 'Scale', perf: 'Performance' },
  },
  fa: {
    back: 'بازگشت به پروژه‌ها',
    navOverview: 'نمای کلی', navScreens: 'صفحات', navTechnical: 'فنی', navArchitecture: 'معماری', navChallenges: 'چالش‌ها', navResults: 'نتایج',
    contact: 'تماس',
    explore: 'کاوش در اپ', github: 'گیت‌هاب', viewLive: 'مشاهده زنده',
    projectOverview: 'نمای کلی پروژه', overviewLead: 'چرا این پروژه وجود دارد و واقعاً چه چیزی تحویل می‌دهد.',
    problemLabel: 'مسئله', valueLabel: 'آنچه تحویل می‌دهد',
    myContribution: 'مشارکت من', builtWith: 'ساخته‌شده با',
    walkthrough: 'گام‌به‌گام محصول', walkthroughLead: 'در صفحات اصلی حرکت کنید. هر کدام برای حل لحظه‌ای خاص در جریان کار وجود دارند.',
    keyInteraction: 'تعامل کلیدی', whyExists: 'چرا وجود دارد',
    devHighlights: 'جزئیات فنی توسعه', devHighlightsLead: 'کار مهندسی که اهمیت داشت — نه فقط لیست ویژگی‌ها.',
    productCapabilities: 'قابلیت‌های محصول', technicalImplementation: 'پیاده‌سازی فنی', engineeringNotes: 'یادداشت‌های فنی',
    architecture: 'معماری فنی', architectureLead: 'جریانی عمدتاً ساده. هر لایه یک وظیفه دارد که سیستم را هنگام مقیاس‌پذیری قابل اشکال‌زدایی نگه می‌دارد.',
    architectureNote: 'لایه‌ها از هم جدا می‌مانند تا یک زیرسیستم کند هرگز مسیر نوشتن اصلی را مسدود نکند.',
    challengesTitle: 'چالش‌ها و راه‌حل‌ها', challengesLead: 'بخش جالب هر محصول واقعی این است که چه چیزی خراب شد و چرا راه‌حل در نگاه به عقب بدیهی به نظر می‌رسد.',
    resultsTitle: 'نتایج', resultsLead: 'اعدادی از تل‌متری تولید و بررسی پس از انتشار — نه حدس و گمان.',
    outcomeLabel: 'نتیجه', gallery: 'گالری', galleryLead: 'هر صفحه را کلیک کنید تا تمام‌صفحه ببینید.',
    reflection: 'بازاندیشی توسعه‌دهنده', reflectionLead: 'آنچه به گذشته خودم می‌گفتم.',
    nextProjects: 'پروژه‌های بعدی', nextProjectsLead: 'کاوش در آثار مرتبط را ادامه دهید.',
    openProject: 'باز کردن مطالعه موردی',
    builtBy: 'ساخته‌شده توسط آرشیا', builtByDesc: 'توسعه‌دهنده موبایل و فول‌استک با تمرکز بر اپلیکیشن‌های تمیز، مقیاس‌پذیر و کاربرمحور.',
    viewProfile: 'گیت‌هاب', roleLabel: 'نقش', platformsLabel: 'پلتفرم‌ها', statusLabel: 'وضعیت', yearLabel: 'سال',
    roleDev: { MOBILE: 'توسعه‌دهنده موبایل', FULLSTACK: 'توسعه‌دهنده فول‌استک', BACKEND: 'توسعه‌دهنده بک‌اند' },
    platforms: { MOBILE: 'اندروید و iOS', OTHER: 'وب و API' },
    statusMap: { 'In Development': 'در حال توسعه', 'Production': 'تولید' },
    problem: 'مسئله', solution: 'راه‌حل',
    notes: { realtime: 'بلادرنگ', ai: 'هوش مصنوعی', scale: 'مقیاس', perf: 'کارایی' },
  },
};

/* ---------- animated project logo ---------- */
function ProjectLogo({ title, accent, size = 40 }: { title: string; accent: string; size?: number }) {
  const initial = (title.replace(/[^A-Za-z0-9]/g, '').charAt(0) || 'A').toUpperCase();
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <div className="cs-ring cs-spin-slow absolute inset-0 rounded-[12px] opacity-80" style={{ ['--cs-accent' as any]: accent }} />
      <div
        className="relative grid place-items-center rounded-[10px] font-bold text-white"
        style={{ width: size - 7, height: size - 7, background: `linear-gradient(140deg, ${accent}, rgba(0,0,0,0.45))`, boxShadow: `0 10px 24px -8px ${accent}`, fontSize: size * 0.42 }}
      >
        {initial}
      </div>
    </div>
  );
}

/* ---------- reveal-on-scroll wrapper ---------- */
function Reveal({ children, delay = 0, y = 26, className }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- count-up metric value ---------- */
function MetricValue({ value, accent, reduce }: { value: string; accent: string; reduce: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^([^\d]*)([\d.]+)(.*)$/);
  const initial = match ? `${match[1]}${(0).toFixed((match[2].split('.')[1] || '').length)}${match[3]}` : value;
  const [display, setDisplay] = useState(initial);

  useEffect(() => {
    if (!match) { setDisplay(value); return; }
    if (reduce) { setDisplay(value); return; }
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const decimals = (numStr.split('.')[1] || '').length;
    let started = false;
    const start = () => {
      if (started) return; started = true;
      const dur = 1300; const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        setDisplay(`${prefix}${(target * e).toFixed(decimals)}${suffix}`);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const obs = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && start()), { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value, reduce, match]);

  return <span ref={ref} style={{ color: accent }}>{display}</span>;
}

function PhoneMock({ title, active, accent, large }: { title: string; active: boolean; accent: string; large?: boolean }) {
  return (
    <div
      className="relative aspect-[9/19] w-full rounded-[30px] border bg-[#0e0f14] p-3 transition-shadow duration-300"
      style={{ borderColor: active ? `${accent}66` : 'rgba(255,255,255,0.1)', boxShadow: active ? `0 24px 60px ${accent}22` : '0 12px 30px rgba(0,0,0,0.4)' }}
    >
      <div className="flex h-full w-full flex-col overflow-hidden rounded-[22px] border border-white/[0.06] bg-[#0a0b0f]">
        <div className="relative flex h-10 items-center gap-2 border-b border-white/[0.06] px-4">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
          <span className="truncate text-[10px] font-medium text-white/70">{title}</span>
          {active && <span className="cs-scan" />}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="h-20 rounded-xl" style={{ background: `linear-gradient(135deg, ${accent}26, transparent)` }} />
          <div className="h-2.5 w-3/4 rounded-full bg-white/10" />
          <div className="h-2.5 w-1/2 rounded-full bg-white/10" />
          <div className="h-2.5 w-2/3 rounded-full bg-white/10" />
          <div className="mt-auto space-y-2">
            <div className="h-2 w-full rounded-full bg-white/10" />
            <div className="h-2 w-5/6 rounded-full bg-white/10" />
          </div>
        </div>
        <div className="flex h-12 items-center justify-center border-t border-white/[0.06]">
          <div className="h-1 w-10 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  );
}

/* ---------- architecture model ----------
   Maps each tech to a layer; ownership comes from the project scope.
   Unmatched tech still ships via the "external" node, so new tools
   light up automatically without code changes. */
const ARCH_LAYERS = [
  { id: 'client', icon: Smartphone, match: ['flutter', 'dart', 'react', 'riverpod', 'bloc', 'swift', 'kotlin', 'android', 'ios', 'mobile'] },
  { id: 'api', icon: Webhook, match: ['fastapi', 'django', 'rest', 'graphql', 'express', 'node', 'websocket', 'api', 'laravel'] },
  { id: 'services', icon: Cpu, match: ['ai', 'opencv', 'python', 'ml', 'celery', 'recommendation', 'on-device'] },
  { id: 'data', icon: Database, match: ['postgresql', 'redis', 'sqlite', 'mongodb', 'mysql', 'database'] },
  { id: 'infra', icon: Cloud, match: ['docker', 'aws', 's3', 'kubernetes', 'gcp', 'firebase', 'linux'] },
];

const OWNED_BY_SCOPE: Record<string, string[]> = {
  MOBILE: ['client'],
  FULLSTACK: ['client', 'api', 'services'],
  BACKEND: ['api', 'services', 'data', 'infra'],
};

function buildArchitecture(techs: string[], scope: string) {
  const owned = OWNED_BY_SCOPE[scope] || [];
  const used = new Set<string>();
  const layers = ARCH_LAYERS.map((l) => {
    const items = techs.filter((t) => l.match.some((m) => t.toLowerCase().includes(m)));
    items.forEach((t) => used.add(t));
    return { ...l, items, owned: owned.includes(l.id), external: false };
  }).filter((l) => l.items.length > 0);
  const leftover = techs.filter((t) => !used.has(t));
  if (leftover.length) layers.push({ id: 'external', icon: Share2, match: [], items: leftover, owned: false, external: true });
  return layers;
}

export default function ProjectDetail({ project, languageKey, onBack, onContact, onOpenProject }: ProjectDetailProps) {
  const localized = project[languageKey] || project.en;
  const L = ui[languageKey] || ui.en;
  const isFa = languageKey === 'fa';
  const accent = project.color || '#2563EB';
  const reduce = useReducedMotion() || false;

  const screens = localized.screens || [];
  const contribution = localized.contribution || [];
  const responsibilities = contribution.length > 0 ? contribution : (localized.highlights || []);
  const capabilities = localized.capabilities || [];
  const implementation = localized.implementation || [];
  const challenges = localized.challenges || [];
  const reflection = localized.reflection;
  const notes = [
    { key: 'realtime', icon: Radio, text: localized.realtimeFeatures },
    { key: 'ai', icon: Cpu, text: localized.aiFeatures },
    { key: 'scale', icon: Boxes, text: localized.scalabilityDetails },
    { key: 'perf', icon: GitBranch, text: localized.performanceOptimizations },
  ].filter((n) => n.text);

  const role = L.roleDev[project.scope] || project.scope;
  const platforms = L.platforms[project.scope === 'MOBILE' ? 'MOBILE' : 'OTHER'];
  const status = L.statusMap[project.status as keyof typeof L.statusMap] || project.status;

  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => { itemRefs.current[active]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }); }, [active]);

  useEffect(() => { window.scrollTo(0, 0); }, [project.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? el.scrollTop / max : 0);
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => removeEventListener('scroll', onScroll);
  }, []);

  const go = (dir: number) => setActive((i) => (i + dir + screens.length) % screens.length);
  const related = projectsData.filter((p) => p.id !== project.id).slice(0, 3);
  const arch = buildArchitecture(project.tech, project.scope);
  const ownedTechs = new Set<string>();
  arch.forEach((l) => { if (l.owned) l.items.forEach((t) => ownedTechs.add(t)); });

  return (
    <div dir={isFa ? 'rtl' : 'ltr'} className="relative min-h-screen text-white" style={{ backgroundColor: '#08090C', ['--cs-accent' as any]: accent }}>
      {/* animated accent background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="cs-aurora-1 absolute -top-[15%] left-[8%] h-[520px] w-[520px] rounded-full blur-[130px] opacity-25" style={{ background: accent }} />
        <div className="cs-aurora-2 absolute top-[35%] -right-[10%] h-[600px] w-[600px] rounded-full blur-[160px] opacity-[0.14]" style={{ background: accent }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% -5%, rgba(255,255,255,0.05), transparent 55%)' }} />
        <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '64px 64px', maskImage: 'radial-gradient(ellipse 80% 55% at 50% 0%, #000 25%, transparent 78%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 55% at 50% 0%, #000 25%, transparent 78%)' }} />
      </div>

      {/* scroll progress */}
      <motion.div className="cs-progress" style={{ scaleX: progress }} />

      {/* ===== Navigation ===== */}
      <header className="sticky top-0 z-50 border-b backdrop-blur" style={{ backgroundColor: 'rgba(8,9,12,0.78)', borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
          <button onClick={onBack} className="flex items-center gap-3">
            <ProjectLogo title={localized.title} accent={accent} size={36} />
            <span className="text-sm font-semibold tracking-tight">{localized.title}</span>
          </button>

          <nav className="hidden items-center gap-8 text-sm md:flex" style={{ color: 'rgba(255,255,255,0.55)' }}>
            <a href="#overview" className="transition-colors hover:text-white">{L.navOverview}</a>
            <a href="#screens" className="transition-colors hover:text-white">{L.navScreens}</a>
            <a href="#tech" className="transition-colors hover:text-white">{L.navTechnical}</a>
            <a href="#architecture" className="transition-colors hover:text-white">{L.navArchitecture}</a>
            <a href="#challenges" className="transition-colors hover:text-white">{L.navChallenges}</a>
          </nav>

          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={onContact} className="rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-white/5" style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'white' }}>
            {L.contact}
          </motion.button>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
        {/* ===== Hero ===== */}
        <section id="overview" className="grid scroll-mt-24 grid-cols-1 items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>{localized.category}</span>
              <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium" style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.55)' }}>
                <span className="h-1.5 w-1.5 rounded-full cs-pulse-soft" style={{ backgroundColor: accent }} />
                {status}
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05, ease: EASE }} className="mt-5 bg-gradient-to-b from-white to-white/55 bg-clip-text text-5xl font-bold leading-[1.02] tracking-tight text-transparent md:text-6xl lg:text-7xl">
              {localized.title}
            </motion.h1>

            {localized.tagline && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.18 }} className="cs-shimmer-text mt-4 text-lg font-medium">{localized.tagline}</motion.p>
            )}
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.26, ease: EASE }} className="mt-5 max-w-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{localized.heroDescription}</motion.p>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.34, ease: EASE }} className="mt-9 flex flex-wrap gap-x-10 gap-y-5">
              <div><div className="text-[11px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.45)' }}>{L.roleLabel}</div><div className="mt-1 font-medium text-white">{role}</div></div>
              <div><div className="text-[11px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.45)' }}>{L.platformsLabel}</div><div className="mt-1 font-medium text-white">{platforms}</div></div>
              <div><div className="text-[11px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.45)' }}>{L.statusLabel}</div><div className="mt-1 flex items-center gap-2 font-medium text-white"><span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />{status}</div></div>
              <div><div className="text-[11px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.45)' }}>{L.yearLabel}</div><div className="mt-1 font-medium text-white">{project.year}</div></div>
            </motion.div>

            {project.tech?.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.42 }} className="mt-7 flex flex-wrap items-center gap-2">
                {project.tech.map((t, i) => (<span key={i} className="rounded-full border px-3 py-1 text-xs font-medium text-white/70" style={{ borderColor: 'rgba(255,255,255,0.12)' }}>{t}</span>))}
              </motion.div>
            )}

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5, ease: EASE }} className="mt-9 flex flex-wrap gap-3">
              <motion.a href="#screens" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="rounded-lg px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90" style={{ backgroundColor: accent }}>{L.explore}</motion.a>
              <motion.a href="https://github.com/arshia-khani" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5" style={{ borderColor: 'rgba(255,255,255,0.12)' }}><Github className="h-4 w-4" /> {L.github}</motion.a>
              <motion.button onClick={onBack} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/5" style={{ borderColor: 'rgba(255,255,255,0.12)' }}><ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {L.back}</motion.button>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2, ease: EASE }} className="flex justify-center lg:justify-end">
            {project.visual && (
              <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border lg:max-w-xl" style={{ borderColor: 'rgba(255,255,255,0.12)', boxShadow: `0 50px 140px -40px ${accent}77` }}>
                <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(120% 80% at 50% -10%, ${accent}22, transparent 70%)` }} />
                <img src={project.visual} alt={`${localized.title} cover`} className="relative h-full w-full object-cover" />
              </div>
            )}
          </motion.div>
        </section>

        {/* ===== Overview ===== */}
        <section className="scroll-mt-24 border-t py-14 md:py-20" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
            <Reveal>
              <span className="cs-eyebrow-line" />
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{L.projectOverview}</h2>
              <p className="mt-3 max-w-xl" style={{ color: 'rgba(255,255,255,0.6)' }}>{L.overviewLead}</p>
              <div className="mt-8 space-y-6">
                <div><div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: accent }}>{L.problemLabel}</div><p className="mt-2 text-lg leading-relaxed text-white/90">{localized.problem}</p></div>
                <div><div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: accent }}>{L.valueLabel}</div><p className="mt-2 text-lg leading-relaxed text-white/90">{localized.outcome}</p></div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border p-7" style={{ borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.6)' }}>{L.myContribution}</h3>
                <ul className="mt-5 space-y-4">
                  {responsibilities.map((item, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-semibold" style={{ backgroundColor: `${accent}1a`, color: accent }}>{i + 1}</span>
                      <span className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== Walkthrough ===== */}
        {screens.length > 0 && (
          <section id="screens" className="scroll-mt-24 border-t py-14 md:py-20" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <Reveal>
              <span className="cs-eyebrow-line" />
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{L.walkthrough}</h2>
              <p className="mt-3 max-w-xl" style={{ color: 'rgba(255,255,255,0.6)' }}>{L.walkthroughLead}</p>
            </Reveal>

            <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_280px]">
              <div ref={trackRef} className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 no-scrollbar" style={{ paddingLeft: 'calc(50% - 115px)', paddingRight: 'calc(50% - 115px)' }}>
                {screens.map((screen, i) => (
                  <motion.div
                    key={screen.id}
                    ref={(el) => { itemRefs.current[i] = el; }}
                    className={`w-[230px] shrink-0 snap-center transition-all duration-300 ${i === active ? 'scale-100 opacity-100' : 'scale-90 opacity-50'}`}
                  >
                    <PhoneMock title={screen.title} active={i === active} accent={accent} />
                  </motion.div>
                ))}
              </div>

              <Reveal delay={0.1}>
                <div className="font-mono text-sm" style={{ color: accent }}>{String(active + 1).padStart(2, '0')} / {String(screens.length).padStart(2, '0')}</div>
                <AnimatePresence mode="wait">
                  <motion.h3 key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: EASE }} className="mt-1 text-2xl font-semibold text-white">{screens[active].title}</motion.h3>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.p key={`d${active}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="mt-2 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{screens[active].description}</motion.p>
                </AnimatePresence>

                <div className="mt-7 flex items-center gap-3">
                  <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} onClick={() => go(-1)} aria-label="Previous screen" className="flex h-10 w-10 items-center justify-center rounded-lg border transition-colors hover:bg-white/5" style={{ borderColor: 'rgba(255,255,255,0.12)' }}><ChevronLeft className="h-4 w-4 rtl:rotate-180" /></motion.button>
                  <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} onClick={() => go(1)} aria-label="Next screen" className="flex h-10 w-10 items-center justify-center rounded-lg border transition-colors hover:bg-white/5" style={{ borderColor: 'rgba(255,255,255,0.12)' }}><ChevronRight className="h-4 w-4 rtl:rotate-180" /></motion.button>
                </div>
                <div className="mt-2 h-[2px] w-full overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <motion.div className="h-full rounded-full" style={{ background: accent, width: `${((active + 1) / screens.length) * 100}%` }} layout transition={{ duration: 0.4, ease: EASE }} />
                </div>
                <div className="mt-5 flex gap-1.5">
                  {screens.map((_, i) => (<button key={i} onClick={() => setActive(i)} aria-label={`Go to screen ${i + 1}`} className="h-1.5 rounded-full transition-all" style={{ width: i === active ? 24 : 6, backgroundColor: i === active ? accent : 'rgba(255,255,255,0.2)' }} />))}
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* ===== Development Highlights ===== */}
        {(capabilities.length > 0 || implementation.length > 0 || notes.length > 0) && (
          <section id="tech" className="scroll-mt-24 border-t py-14 md:py-20" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <Reveal>
              <span className="cs-eyebrow-line" />
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{L.devHighlights}</h2>
              <p className="mt-3 max-w-xl" style={{ color: 'rgba(255,255,255,0.6)' }}>{L.devHighlightsLead}</p>
            </Reveal>

            {(capabilities.length > 0 || implementation.length > 0) && (
              <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2">
                {capabilities.length > 0 && (
                  <Reveal>
                    <h3 className="text-xl font-semibold text-white">{L.productCapabilities}</h3>
                    <div className="mt-4 divide-y" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                      {capabilities.map((row, i) => (<div key={i} className="py-4"><div className="text-base font-medium text-white">{row.title}</div><div className="mt-1 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{row.description}</div></div>))}
                    </div>
                  </Reveal>
                )}
                {implementation.length > 0 && (
                  <Reveal delay={0.1}>
                    <h3 className="text-xl font-semibold text-white">{L.technicalImplementation}</h3>
                    <div className="mt-4 divide-y" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                      {implementation.map((row, i) => (<div key={i} className="py-4"><div className="flex items-center gap-2 text-base font-medium text-white"><span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />{row.title}</div><div className="mt-1 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{row.description}</div></div>))}
                    </div>
                  </Reveal>
                )}
              </div>
            )}

            {notes.length > 0 && (
              <div className="mt-9">
                <h3 className="text-xl font-semibold text-white">{L.engineeringNotes}</h3>
                <div className="mt-4 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, overflow: 'hidden' }}>
                  {notes.map((n, i) => { const Icon = n.icon; return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                      className="p-5" style={{ backgroundColor: '#08090C' }}
                    >
                      <Icon className="h-4 w-4" style={{ color: accent }} />
                      <div className="mt-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: accent }}>{L.notes[n.key as keyof typeof L.notes]}</div>
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{n.text}</p>
                    </motion.div>
                  ); })}
                </div>
              </div>
            )}
          </section>
        )}

        {/* ===== Architecture map ===== */}
        {arch.length > 0 && (
          <section id="architecture" className="scroll-mt-24 border-t py-14 md:py-20" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <Reveal>
              <span className="cs-eyebrow-line" />
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{L.architecture}</h2>
              <p className="mt-3 max-w-xl" style={{ color: 'rgba(255,255,255,0.6)' }}>{L.architectureLead}</p>
            </Reveal>

            <div className="mt-10">
              <ArchitectureMap tech={project.tech} name={localized.title} accent={accent} ownedTechs={ownedTechs} isFa={isFa} />
            </div>

            <Reveal>
              <div className="mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
                <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full" style={{ background: `${accent}59`, border: `1px solid ${accent}` }} /> {isFa ? 'تکنولوژی‌های بخش من' : 'My-scope technologies'}</span>
                <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)' }} /> {isFa ? 'سایر تکنولوژی‌ها' : 'Other technologies'}</span>
              </div>
              <p className="mx-auto mt-4 max-w-2xl text-center text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{L.architectureNote}</p>
            </Reveal>
          </section>
        )}

        {/* ===== Challenges & Solutions ===== */}
        {challenges.length > 0 && (
          <section id="challenges" className="scroll-mt-24 border-t py-14 md:py-20" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <Reveal>
              <span className="cs-eyebrow-line" />
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{L.challengesTitle}</h2>
              <p className="mt-3 max-w-xl" style={{ color: 'rgba(255,255,255,0.6)' }}>{L.challengesLead}</p>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {challenges.map((item, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3, ease: EASE }} className="cs-sheen h-full rounded-2xl border p-6 md:p-7" style={{ borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                    <span className="font-mono text-xs font-semibold" style={{ color: accent, border: `1px solid ${accent}55`, backgroundColor: `${accent}14`, borderRadius: 8, padding: '5px 9px' }}>C{i + 1}</span>
                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                      <div><div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: accent }}>{L.problem}</div><p className="mt-2 text-sm leading-relaxed text-white/90">{item.problem}</p></div>
                      <div><div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: accent }}>{L.solution}</div><p className="mt-2 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{item.solution}</p></div>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* ===== Results removed per request ===== */}

        {/* ===== Gallery ===== */}
        {screens.length > 0 && (
          <section className="scroll-mt-24 border-t py-14 md:py-20" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <Reveal>
              <span className="cs-eyebrow-line" />
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{L.gallery}</h2>
              <p className="mt-3 max-w-xl" style={{ color: 'rgba(255,255,255,0.6)' }}>{L.galleryLead}</p>
            </Reveal>

            <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
              {screens.map((screen, i) => (
                <Reveal key={screen.id} delay={i * 0.05}>
                  <motion.button whileHover={{ y: -4 }} whileTap={{ scale: 0.97 }} onClick={() => setLightbox(i)} className="group flex w-full flex-col items-center gap-3 text-center" aria-label={`Open ${screen.title}`}>
                    <div className="w-full max-w-[150px] transition-transform duration-300 group-hover:-translate-y-1"><PhoneMock title={screen.title} active={false} accent={accent} /></div>
                    <span className="text-xs font-medium text-white/70 group-hover:text-white">{screen.title}</span>
                  </motion.button>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* ===== Reflection ===== */}
        {reflection && (
          <section className="scroll-mt-24 border-t py-14 md:py-20" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <Reveal>
              <span className="cs-eyebrow-line" />
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{L.reflection}</h2>
              <p className="mt-3 max-w-xl" style={{ color: 'rgba(255,255,255,0.6)' }}>{L.reflectionLead}</p>
              <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1, ease: EASE }} className="mt-8 max-w-3xl text-lg leading-relaxed text-white/90">{reflection}</motion.p>
            </Reveal>
          </section>
        )}

        {/* ===== Next Projects ===== */}
        <section className="scroll-mt-24 border-t py-14 md:py-20" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{L.nextProjects}</h2>
            <p className="mt-3 max-w-xl" style={{ color: 'rgba(255,255,255,0.6)' }}>{L.nextProjectsLead}</p>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {related.map((p, idx) => {
              const pl = p[languageKey] || p.en;
              return (
                <Reveal key={p.id} delay={idx * 0.08}>
                  <motion.button whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }} onClick={() => onOpenProject?.(p.id)} className="cs-sheen group flex h-full w-full flex-col rounded-2xl border p-6 text-left" style={{ borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: p.color }}>{pl.category}</span>
                      <ArrowUpRight className="h-4 w-4 text-white/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5 rtl:group-hover:translate-y-0.5" />
                    </div>
                    <div className="mt-4 text-xl font-semibold text-white">{pl.title}</div>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{pl.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.tech.slice(0, 3).map((t, i) => (<span key={i} className="rounded-full border px-2.5 py-0.5 text-[11px] text-white/60" style={{ borderColor: 'rgba(255,255,255,0.12)' }}>{t}</span>))}
                    </div>
                  </motion.button>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ===== Developer Profile ===== */}
        <section className="border-t py-14 md:py-20" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <Reveal>
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <ProjectLogo title={localized.title} accent={accent} size={64} />
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-white">{L.builtBy}</h2>
                <p className="mt-1 max-w-md text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{L.builtByDesc}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <motion.a href="https://github.com/arshia-khani" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="rounded-lg border px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/5" style={{ borderColor: 'rgba(255,255,255,0.12)' }}><span className="flex items-center gap-2"><Github className="h-4 w-4" /> {L.viewProfile}</span></motion.a>
                <motion.a href="https://linkedin.com/in/arshia-khani" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="rounded-lg border px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/5" style={{ borderColor: 'rgba(255,255,255,0.12)' }}><span className="flex items-center gap-2"><Linkedin className="h-4 w-4" /> LinkedIn</span></motion.a>
                <motion.button onClick={onContact} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90" style={{ backgroundColor: accent }}>{L.contact}</motion.button>
              </div>
            </div>
          </Reveal>
        </section>

        <footer className="border-t py-8 text-xs" style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p>© 2026 {localized.title}. {isFa ? 'تمام حقوق محفوظ است.' : 'All rights reserved.'}</p>
            <div className="flex gap-4">
              <a href="https://github.com/arshia-khani" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">GitHub</a>
              <a href="https://linkedin.com/in/arshia-khani" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">LinkedIn</a>
              <button onClick={onContact} className="transition-colors hover:text-white">{L.contact}</button>
            </div>
          </div>
        </footer>
      </main>

      {/* ===== Lightbox ===== */}
      <AnimatePresence>
        {lightbox !== null && screens[lightbox] && (
          <motion.div key="lb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-6 backdrop-blur" onClick={() => setLightbox(null)}>
            <button className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border text-white transition-colors hover:bg-white/10" style={{ borderColor: 'rgba(255,255,255,0.12)' }} aria-label="Close">×</button>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="w-[300px]" onClick={(e) => e.stopPropagation()}>
              <PhoneMock title={screens[lightbox].title} active accent={accent} large />
              <p className="mt-4 text-center text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{screens[lightbox].description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
