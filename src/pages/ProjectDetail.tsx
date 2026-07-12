import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowUpRight, Linkedin, Expand, GitBranch, Boxes, Cpu, Radio, Smartphone, Webhook, Database, Cloud, Share2, Server } from 'lucide-react';
import type { ProjectSchema } from '../types/schema';
import { projectsData } from '../data/projectsData';
import { resolveAsset } from '../data/imageLinks';
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
    outcomeLabel: 'Outcome', viewScreen: 'View',
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
    outcomeLabel: 'نتیجه', viewScreen: 'مشاهده',
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

function PhoneMock({ active, accent, image }: { active: boolean; accent: string; image?: string; title?: string; large?: boolean }) {
  const src = resolveAsset(image);
  return (
    <div
      className="relative aspect-[9/16] w-full overflow-hidden rounded-[34px] border bg-[#0a0b0f] transition-shadow duration-500"
      style={{
        borderColor: active ? `${accent}99` : 'rgba(255,255,255,0.14)',
        boxShadow: active
          ? `0 50px 110px -40px ${accent}88, 0 0 0 1px ${accent}55`
          : '0 30px 70px -30px rgba(0,0,0,0.7)',
      }}
    >
      {src ? (
        <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <div className="h-full w-full" style={{ background: `radial-gradient(130% 90% at 50% 0%, ${accent}26, #0a0b0f 70%)` }} />
      )}
      {/* device top — notch only, no text */}
      <div className="pointer-events-none absolute left-1/2 top-2.5 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black/70" />
      <div className="pointer-events-none absolute inset-0 rounded-[34px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
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

const LAYER_LABELS: Record<string, { en: string; fa: string }> = {
  client: { en: 'Application', fa: 'اپلیکیشن' },
  api: { en: 'API & Gateway', fa: 'API و دروازه' },
  services: { en: 'Services & Intelligence', fa: 'سرویس و هوش' },
  data: { en: 'Data & Cache', fa: 'داده و کش' },
  infra: { en: 'Infrastructure & Storage', fa: 'زیرساخت و ذخیره‌سازی' },
  external: { en: 'External Integrations', fa: 'یکپارچه‌سازی خارجی' },
};
const layerLabel = (id: string, isFa: boolean) => LAYER_LABELS[id]?.[isFa ? 'fa' : 'en'] || id;

const LAYER_BLURBS: Record<string, { en: string; fa: string }> = {
  client: { en: 'What the user touches — the app surface and every interaction.', fa: 'آنچه کاربر لمس می‌کند — سطح اپلیکیشن و تعاملات.' },
  api: { en: 'The gateway that routes, validates, and secures each request.', fa: 'دروازه‌ای که هر درخواست را مسیریابی، اعتبارسنجی و ایمن می‌کند.' },
  services: { en: 'Business logic, models, and intelligent processing.', fa: 'منطق کسب‌وکار، مدل‌ها و پردازش هوشمند.' },
  data: { en: 'Persistence, caching, and fast lookups.', fa: 'ذخیره‌سازی، کش و جستجوهای سریع.' },
  infra: { en: 'Where it runs, scales, and rests at storage.', fa: 'محیط اجرا، مقیاس‌پذیری و ذخیره‌سازی.' },
  external: { en: 'Third-party systems wired into the flow.', fa: 'سیستم‌های ثالث متصل به جریان.' },
};
const layerBlurb = (id: string, isFa: boolean) => LAYER_BLURBS[id]?.[isFa ? 'fa' : 'en'] || '';

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
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
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
  const techToLayer: Record<string, string> = {};
  arch.forEach((l) => { if (l.owned) l.items.forEach((t) => ownedTechs.add(t)); l.items.forEach((t) => { techToLayer[t] = l.id; }); });
  const sA = accent;
  const sA2 = '#E8EDF2';
  const selectedLayer = arch.find((layer) => layer.id === activeLayer) || arch[0];

  return (
    <div dir={isFa ? 'rtl' : 'ltr'} className="cs-page relative min-h-screen text-white" style={{ backgroundColor: '#070707', ['--cs-accent' as any]: accent }}>
      {/* animated accent background */}
      <div className="cs-ambient pointer-events-none absolute inset-x-0 top-0 -z-10 h-[880px] overflow-hidden">
        <div className="cs-aurora-1 absolute -top-[18%] left-[8%] h-[420px] w-[420px] rounded-full blur-[150px] opacity-[0.11]" style={{ background: accent }} />
        <div className="cs-aurora-2 absolute top-[28%] -right-[8%] h-[420px] w-[420px] rounded-full blur-[170px] opacity-[0.07]" style={{ background: accent }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% -5%, rgba(255,255,255,0.05), transparent 55%)' }} />
        <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '64px 64px', maskImage: 'radial-gradient(ellipse 80% 55% at 50% 0%, #000 25%, transparent 78%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 55% at 50% 0%, #000 25%, transparent 78%)' }} />
      </div>

      {/* scroll progress */}
      <motion.div className="cs-progress" style={{ scaleX: progress }} />

      {/* ===== Navigation ===== */}
      <header className="cs-nav sticky top-2 sm:top-4 z-50 mx-auto w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-7xl rounded-full border backdrop-blur-xl" style={{ backgroundColor: 'rgba(7,7,7,0.82)', borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="mx-auto flex h-14 sm:h-16 items-center justify-between gap-2 px-3 sm:px-4 md:px-7">
          <button onClick={onBack} className="flex min-w-0 items-center gap-2 sm:gap-3">
            <ProjectLogo title={localized.title} accent={accent} size={36} />
            <span className="hidden truncate text-sm font-semibold tracking-tight min-[360px]:block">{localized.title}</span>
          </button>

          <nav className="cs-nav-links hidden items-center gap-1 text-xs font-semibold md:flex" style={{ color: 'rgba(255,255,255,0.55)' }}>
            <a href="#overview" className="transition-colors hover:text-white">{L.navOverview}</a>
            <a href="#screens" className="transition-colors hover:text-white">{L.navScreens}</a>
            <a href="#tech" className="transition-colors hover:text-white">{L.navTechnical}</a>
            <a href="#architecture" className="transition-colors hover:text-white">{L.navArchitecture}</a>
            <a href="#challenges" className="transition-colors hover:text-white">{L.navChallenges}</a>
          </nav>

          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={onContact} className="shrink-0 rounded-full border px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-bold transition-colors hover:bg-white/10" style={{ borderColor: `${accent}55`, color: 'white', background: `${accent}12` }}>
            {L.contact}
          </motion.button>
        </div>
      </header>

      <main className="cs-main relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        {/* ===== Hero ===== */}
        <section id="overview" className="cs-hero grid scroll-mt-28 grid-cols-1 items-center gap-8 sm:gap-10 overflow-hidden rounded-3xl sm:rounded-[2rem] border p-4 sm:p-6 md:p-10 lg:grid-cols-[1.05fr_.95fr] lg:p-14">
          <div className="relative z-10">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>{localized.category}</span>
              <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium" style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.55)' }}>
                <span className="h-1.5 w-1.5 rounded-full cs-pulse-soft" style={{ backgroundColor: accent }} />
                {status}
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05, ease: EASE }} className="mt-5 break-words bg-gradient-to-b from-white to-white/55 bg-clip-text text-4xl sm:text-5xl font-bold leading-[1.02] tracking-tight text-transparent md:text-6xl lg:text-7xl">
              {localized.title}
            </motion.h1>

            {localized.tagline && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.18 }} className="cs-shimmer-text mt-4 text-lg font-medium">{localized.tagline}</motion.p>
            )}
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.26, ease: EASE }} className="mt-5 max-w-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{localized.heroDescription}</motion.p>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.34, ease: EASE }} className="cs-meta mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border sm:grid-cols-4">
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
              <motion.button onClick={onBack} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/5" style={{ borderColor: 'rgba(255,255,255,0.12)' }}><ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {L.back}</motion.button>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2, ease: EASE }} className="cs-hero-visual flex justify-center lg:justify-end">
            {project.images.mockup && (
              <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border lg:max-w-xl" style={{ borderColor: 'rgba(255,255,255,0.12)', boxShadow: `0 50px 140px -40px ${accent}77` }}>
                <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(120% 80% at 50% -10%, ${accent}22, transparent 70%)` }} />
                <img src={project.images.mockup} alt={`${localized.title} cover`} className="relative h-full w-full object-cover" />
              </div>
            )}
          </motion.div>
        </section>

        {/* ===== Overview ===== */}
        <section className="cs-section scroll-mt-24 py-14 md:py-20">
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
              <div className="cs-glass-card rounded-3xl border p-7">
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
          <section id="screens" className="cs-section scroll-mt-24 py-14 md:py-20">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <Reveal>
                <span className="cs-eyebrow-line" />
                <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{L.walkthrough}</h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{L.walkthroughLead}</p>
              </Reveal>
              <div className="font-mono text-xs text-white/35">{String(active + 1).padStart(2, '0')} / {String(screens.length).padStart(2, '0')}</div>
            </div>

            <div className="cs-walkthrough mt-10 grid overflow-hidden rounded-[1.75rem] border lg:grid-cols-[minmax(240px,.72fr)_minmax(0,1.45fr)]">
              <div ref={trackRef} className="cs-screen-list no-scrollbar order-2 flex gap-2 overflow-x-auto border-t p-3 lg:order-1 lg:max-h-[680px] lg:flex-col lg:overflow-y-auto lg:border-t-0 lg:border-e lg:p-4">
                {screens.map((screen, i) => (
                  <motion.button
                    key={screen.id}
                    ref={(el) => { itemRefs.current[i] = el; }}
                    onClick={() => setActive(i)}
                    className={`group flex w-[220px] shrink-0 items-center gap-3 rounded-xl border p-2.5 text-start transition-all duration-300 lg:w-full ${i === active ? 'border-white/15 bg-white/[0.07]' : 'border-transparent hover:bg-white/[0.035]'}`}
                    aria-label={`Select ${screen.title}`}
                  >
                    <div className="h-16 w-11 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black">
                      {resolveAsset(screen.image) && <img src={resolveAsset(screen.image)} alt="" className="h-full w-full object-cover" loading="lazy" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-white/30">{String(i + 1).padStart(2, '0')}</span>
                        {i === active && <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />}
                      </div>
                      <span className={`mt-1 block truncate text-sm font-medium ${i === active ? 'text-white' : 'text-white/55'}`}>{screen.title}</span>
                    </div>
                    <ChevronRight className="hidden h-4 w-4 text-white/25 lg:block rtl:rotate-180" />
                  </motion.button>
                ))}
              </div>

              <div className="order-1 grid min-h-[540px] bg-black/20 p-5 sm:p-8 lg:order-2 lg:grid-cols-[minmax(0,1fr)_minmax(210px,.7fr)] lg:items-center lg:gap-8 lg:p-10">
                <AnimatePresence mode="wait">
                  <motion.div key={`phone-${active}`} initial={{ opacity: 0, y: 14, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: .98 }} transition={{ duration: .4, ease: EASE }} className="mx-auto w-full max-w-[285px]">
                    <button onClick={() => setLightbox(active)} className="group relative block w-full" aria-label={L.viewScreen}>
                      <PhoneMock active accent={accent} image={screens[active].image} />
                      <span className="absolute inset-0 grid place-items-center rounded-[34px] bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                        <span className="flex items-center gap-2 rounded-full border border-white/15 bg-black/70 px-4 py-2 text-xs text-white backdrop-blur"><Expand className="h-4 w-4" />{L.viewScreen}</span>
                      </span>
                    </button>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8 lg:mt-0">
                  <AnimatePresence mode="wait">
                    <motion.div key={`copy-${active}`} initial={{ opacity: 0, x: isFa ? -12 : 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: .35, ease: EASE }}>
                      <span className="font-mono text-[11px] uppercase tracking-[.18em] text-white/35">{L.keyInteraction}</span>
                      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">{screens[active].title}</h3>
                      <p className="mt-4 text-sm leading-7 text-white/55">{screens[active].description}</p>
                    </motion.div>
                  </AnimatePresence>
                  <div className="mt-8 flex items-center gap-2">
                    <button onClick={() => go(-1)} aria-label="Previous screen" className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white"><ChevronLeft className="h-4 w-4 rtl:rotate-180" /></button>
                    <button onClick={() => go(1)} aria-label="Next screen" className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white"><ChevronRight className="h-4 w-4 rtl:rotate-180" /></button>
                    <div className="ms-2 h-px flex-1 bg-white/10"><motion.div className="h-full" layout style={{ background: 'rgba(255,255,255,.55)', width: `${((active + 1) / screens.length) * 100}%` }} /></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ===== Development Highlights ===== */}
        {(capabilities.length > 0 || implementation.length > 0 || notes.length > 0) && (
          <section id="tech" className="cs-section scroll-mt-24 py-14 md:py-20">
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
              <Reveal delay={0.1} className="order-1 md:order-2">
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

        {/* ===== Architecture explorer ===== */}
        {false && arch.length > 0 && selectedLayer && (
          <section id="architecture" className="cs-section scroll-mt-24 overflow-hidden py-16 md:py-24">
            <Reveal>
              <span className="cs-eyebrow-line" />
              <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">{L.architecture}</h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/55 md:text-base">{L.architectureLead}</p>
            </Reveal>

            <div className="cs-architecture mt-12 overflow-hidden rounded-[1.75rem] border">
              <div className="border-b border-white/[0.07] p-4 md:p-6">
                <div className="no-scrollbar flex gap-2 overflow-x-auto">
                  {arch.map((layer, index) => {
                    const Icon = layer.icon;
                    const selected = selectedLayer.id === layer.id;
                    return (
                      <button key={layer.id} onClick={() => setActiveLayer(layer.id)} className={`flex min-w-[150px] flex-1 items-center gap-3 rounded-xl border px-4 py-3 text-start transition-colors ${selected ? 'border-white/15 bg-white/[0.07]' : 'border-transparent hover:bg-white/[0.035]'}`}>
                        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border ${selected ? 'border-white/15 bg-white/10 text-white' : 'border-white/[0.07] text-white/40'}`}><Icon className="h-4 w-4" /></span>
                        <span className="min-w-0">
                          <span className="block font-mono text-[9px] text-white/25">{String(index + 1).padStart(2, '0')}</span>
                          <span className={`mt-0.5 block truncate text-xs font-semibold ${selected ? 'text-white' : 'text-white/50'}`}>{layerLabel(layer.id, isFa)}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={selectedLayer.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: .3, ease: EASE }} className="grid gap-10 p-6 md:p-10 lg:grid-cols-[1fr_.8fr]">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white/75">{(() => { const Icon = selectedLayer.icon; return <Icon className="h-5 w-5" />; })()}</span>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{layerLabel(selectedLayer.id, isFa)}</h3>
                        <div className="mt-1 flex gap-3">
                          {selectedLayer.owned && <span className="text-[10px] font-semibold" style={{ color: accent }}>{isFa ? 'بخش من' : 'My scope'}</span>}
                          {selectedLayer.external && <span className="text-[10px] text-white/35">{isFa ? 'سرویس خارجی' : 'External service'}</span>}
                        </div>
                      </div>
                    </div>
                    <p className="mt-6 max-w-xl text-sm leading-7 text-white/55">{layerBlurb(selectedLayer.id, isFa)}</p>
                    <div className="mt-7 flex flex-wrap gap-2">
                      {selectedLayer.items.map((tech) => <span key={tech} className="rounded-lg border border-white/[0.09] bg-white/[0.025] px-3 py-2 text-xs text-white/65">{tech}</span>)}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-5 md:p-6">
                    <div className="text-[10px] font-semibold uppercase tracking-[.16em] text-white/30">{isFa ? 'جریان داده' : 'Data flow'}</div>
                    <div className="mt-5 space-y-2">
                      {arch.map((layer, index) => (
                        <button key={layer.id} onClick={() => setActiveLayer(layer.id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start transition-colors ${layer.id === selectedLayer.id ? 'bg-white/[0.07]' : 'hover:bg-white/[0.03]'}`}>
                          <span className="font-mono text-[10px] text-white/25">{String(index + 1).padStart(2, '0')}</span>
                          <span className={`h-1.5 w-1.5 rounded-full ${layer.id === selectedLayer.id ? '' : 'bg-white/15'}`} style={layer.id === selectedLayer.id ? { backgroundColor: accent } : undefined} />
                          <span className={`text-xs ${layer.id === selectedLayer.id ? 'text-white' : 'text-white/45'}`}>{layerLabel(layer.id, isFa)}</span>
                          <span className="ms-auto text-[10px] text-white/25">{layer.items.length}</span>
                        </button>
                      ))}
                    </div>
                    <p className="mt-5 border-t border-white/[0.07] pt-5 text-xs leading-6 text-white/40">{L.architectureNote}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </section>
        )}

        {/* Interactive architecture map */}
        {arch.length > 0 && (
          <section id="architecture" className="cs-section scroll-mt-24 overflow-hidden py-16 md:py-24">
            <div className="relative">
              {/* ambient glow */}
              <div className="pointer-events-none absolute left-1/2 top-2 h-64 w-64 -translate-x-1/2 rounded-full blur-3xl" style={{ background: `radial-gradient(circle, ${sA}0d, transparent 70%)` }} />

              <div className="relative">
                <Reveal>
                  <span className="cs-eyebrow-line" />
                  <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">{L.architecture}</h2>
                  <p className="mt-4 max-w-xl text-[15px] leading-relaxed md:text-base" style={{ color: 'rgba(255,255,255,0.6)' }}>{L.architectureLead}</p>
                </Reveal>

                <div className="cs-architecture-map mt-9 grid items-center gap-7 rounded-[1.5rem] border p-3 sm:p-5 md:mt-12 md:rounded-[1.75rem] md:p-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,.92fr)] lg:gap-12">
                  {/* diagram */}
                  <div className="flex justify-center">
                    <ArchitectureMap
                      tech={project.tech}
                      name={localized.title}
                      accent={sA}
                      accent2={sA2}
                      ownedTechs={ownedTechs}
                      isFa={isFa}
                      activeLayer={activeLayer}
                      techToLayer={techToLayer}
                      onHoverTech={(t) => setActiveLayer(t ? techToLayer[t] : null)}
                    />
                  </div>

                  {/* cards */}
                  <div className="flex flex-col gap-4">
                    {arch.map((layer) => {
                      const Icon = layer.icon;
                      const active = activeLayer === layer.id;
                      const dimmed = activeLayer != null && !active;
                      return (
                        <motion.div
                          key={layer.id}
                          onMouseEnter={() => setActiveLayer(layer.id)}
                          onMouseLeave={() => setActiveLayer(null)}
                          initial={{ opacity: 0, y: 18 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: '-40px' }}
                          transition={{ duration: 0.5, ease: EASE }}
                          whileHover={{ y: -2 }}
                          className="group relative overflow-hidden rounded-xl border p-4 sm:rounded-2xl md:p-6"
                          style={{
                            borderColor: active ? `${sA}55` : 'rgba(255,255,255,0.075)',
                            background: active
                              ? `linear-gradient(135deg, ${sA}0d, rgba(255,255,255,0.035))`
                              : 'linear-gradient(135deg, rgba(255,255,255,0.035), rgba(255,255,255,0.012))',
                            boxShadow: active ? `0 14px 38px -26px ${sA}88` : 'none',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            opacity: dimmed ? 0.58 : 1,
                            transition: 'background 500ms cubic-bezier(0.22,1,0.36,1), border-color 500ms cubic-bezier(0.22,1,0.36,1), box-shadow 500ms cubic-bezier(0.22,1,0.36,1), opacity 500ms cubic-bezier(0.22,1,0.36,1)',
                          }}
                        >
                          {/* left gradient accent */}
                          <span className="absolute inset-y-4 left-0 w-[2px] rounded-full" style={{ background: sA, opacity: active ? 1 : 0.25 }} />

                          <div className="flex items-start gap-4">
                            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl" style={{ background: active ? `${sA}12` : 'rgba(255,255,255,.035)', color: active ? sA : 'rgba(255,255,255,.55)', border: `1px solid ${active ? `${sA}30` : 'rgba(255,255,255,.07)'}` }}>
                              <Icon className="h-6 w-6" />
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-[15px] font-semibold text-white">{layerLabel(layer.id, isFa)}</h3>
                                {layer.owned && (<span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: `${sA}1f`, color: sA }}>{isFa ? 'بخش من' : 'My scope'}</span>)}
                                {layer.external && (<span className="rounded-full border px-2 py-0.5 text-[10px] font-medium" style={{ borderColor: 'rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.5)' }}>{isFa ? 'خارجی' : 'external'}</span>)}
                              </div>
                              <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{layerBlurb(layer.id, isFa)}</p>
                              <div className="mt-3 flex flex-wrap gap-1.5">
                                {layer.items.map((t, ti) => {
                                  const mine = ownedTechs.has(t);
                                  return (
                                    <span key={ti} className="rounded-md border px-2 py-1 text-[11px] font-medium" style={{ borderColor: mine ? `${sA}55` : 'rgba(255,255,255,0.12)', color: mine ? sA : 'rgba(255,255,255,0.65)', background: mine ? `${sA}12` : 'transparent' }}>{t}</span>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* ===== Challenges & Solutions ===== */}
        {challenges.length > 0 && (
          <section id="challenges" className="cs-section scroll-mt-24 py-14 md:py-20">
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

        {/* ===== Reflection ===== */}
        {reflection && (
          <section className="cs-section scroll-mt-24 py-14 md:py-20">
            <Reveal>
              <span className="cs-eyebrow-line" />
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{L.reflection}</h2>
              <p className="mt-3 max-w-xl" style={{ color: 'rgba(255,255,255,0.6)' }}>{L.reflectionLead}</p>
              <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1, ease: EASE }} className="mt-8 max-w-3xl text-lg leading-relaxed text-white/90">{reflection}</motion.p>
            </Reveal>
          </section>
        )}

        {/* ===== Next Projects ===== */}
        <section className="cs-section scroll-mt-24 py-14 md:py-20">
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
        <section className="cs-profile my-6 rounded-[2rem] border p-7 md:p-10">
          <Reveal>
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <ProjectLogo title={localized.title} accent={accent} size={64} />
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-white">{L.builtBy}</h2>
                <p className="mt-1 max-w-md text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{L.builtByDesc}</p>
              </div>
              <div className="flex flex-wrap gap-3">
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
            <button className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border text-white transition-colors hover:bg-white/10" style={{ borderColor: 'rgba(255,255,255,0.12)' }} aria-label="Close" onClick={(e) => { e.stopPropagation(); setLightbox(null); }}>×</button>
            <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + screens.length - 1) % screens.length); }} className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:bg-white/10 rtl:right-4 rtl:left-auto" aria-label="Previous screen"><ChevronLeft className="h-5 w-5 rtl:rotate-180" /></button>
            <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % screens.length); }} className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:bg-white/10 rtl:left-4 rtl:right-auto" aria-label="Next screen"><ChevronRight className="h-5 w-5 rtl:rotate-180" /></button>
            <motion.div key={lightbox} initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="flex w-[360px] max-w-[85vw] flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <PhoneMock title={screens[lightbox].title} active accent={accent} large image={screens[lightbox].image} />
              <p className="mt-4 text-center text-sm font-medium text-white">{screens[lightbox].title}</p>
              <p className="mt-1 max-w-xs text-center text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{screens[lightbox].description}</p>
              <div className="mt-3 font-mono text-xs" style={{ color: accent }}>{String(lightbox + 1).padStart(2, '0')} / {String(screens.length).padStart(2, '0')}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
