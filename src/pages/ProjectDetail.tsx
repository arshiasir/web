import { motion } from 'motion/react';
import { ArrowLeft, Github, Linkedin, Mail, ExternalLink, ChevronRight, Target, Lightbulb, TrendingUp, Layers } from 'lucide-react';
import type { ProjectSchema } from '../types/schema';
import { imageLinks } from '../data/imageLinks';

interface ProjectDetailProps {
  project: ProjectSchema;
  languageKey: 'en' | 'fa';
  onBack: () => void;
  onContact: () => void;
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const } },
};

function Panel({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-[0_24px_80px_rgba(0,0,0,0.25)] ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

function SectionTitle({ label, title, accent }: { label: string; title: string; accent: string }) {
  return (
    <div className="mb-7">
      <span className="text-[11px] font-black uppercase tracking-[1.5px]" style={{ color: accent }}>{label}</span>
      <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-2">{title}</h2>
      <div className="mt-3 h-0.5 w-12 rounded-full" style={{ backgroundColor: accent }} />
    </div>
  );
}

const visualMap: Record<string, string> = {
  calkilo: imageLinks.calkiloMockup,
  couchini: imageLinks.couchiniMockup,
  tipax: imageLinks.tipaxMockup,
  hyperstar: imageLinks.hyperstarMockup,
  faceauth: imageLinks.faceauthMockup,
};

const scopeLabels: Record<string, string> = {
  FULLSTACK: 'Fullstack',
  MOBILE: 'Mobile',
  BACKEND: 'Backend',
};

const ui = {
  en: {
    back: 'Back',
    overview: 'Overview',
    challenge: 'The Challenge',
    problem: 'The Problem',
    outcome: 'Outcome',
    approach: 'What I Built',
    process: 'How It Was Built',
    architecture: 'Architecture',
    results: 'Results',
    byTheNumbers: 'By the Numbers',
    screenshots: 'Screenshots',
    techStack: 'Tech Stack',
    myRole: 'My Role',
    projectType: 'Project Type',
    scope: 'Scope',
    platform: 'Platform',
    viewScreens: 'View Screenshots',
    seeGithub: 'See on GitHub',
    contact: 'Contact Me',
    ctaTitle: 'Interested in building something amazing?',
    ctaSub: "I'm available for new projects and collaborations.",
    solved: 'How I solved it',
  },
  fa: {
    back: 'بازگشت',
    overview: 'نمای کلی',
    challenge: 'چالش',
    problem: 'مسئله',
    outcome: 'نتیجه',
    approach: 'آنچه ساختم',
    process: 'فرآیند ساخت',
    architecture: 'معماری',
    results: 'نتایج',
    byTheNumbers: 'به زبان عدد',
    screenshots: 'تصاویر صفحات',
    techStack: 'تکنولوژی‌ها',
    myRole: 'نقش من',
    projectType: 'نوع پروژه',
    scope: 'دامنه',
    platform: 'پلتفرم',
    viewScreens: 'مشاهدهٔ صفحات',
    seeGithub: 'مشاهده در گیت‌هاب',
    contact: 'تماس با من',
    ctaTitle: 'مایل به ساخت چیز خارق‌العاده‌ای هستی؟',
    ctaSub: 'برای پروژه‌ها و همکاری‌های جدید در دسترسم.',
    solved: 'چطور حلش کردم',
  },
};

export default function ProjectDetail({ project, languageKey, onBack, onContact }: ProjectDetailProps) {
  const localized = project[languageKey] || project.en;
  const L = ui[languageKey] || ui.en;
  const features = localized.features || [];
  const highlights = localized.highlights || [];
  const metrics = project.metrics || [];
  const tech = project.tech || [];
  const color = project.color || '#7B61FF';
  const isFa = document.documentElement.dir === 'rtl';
  const screens = localized.screens || [];
  const archNodes = localized.architectureHighlights || [];
  const challenges = localized.challenges || [];
  const timeline = localized.timeline || [];

  const heroImage = visualMap[project.id];
  const platform = project.scope === 'MOBILE' ? (isFa ? 'اندروید، iOS' : 'Android, iOS') : (isFa ? 'وب، API' : 'Web, API');

  const navItems = [
    { id: 'overview', label: L.overview },
    ...(challenges.length ? [{ id: 'challenge', label: L.challenge }] : []),
    ...(features.length ? [{ id: 'approach', label: L.approach }] : []),
    ...(archNodes.length ? [{ id: 'architecture', label: L.architecture }] : []),
    ...(metrics.length ? [{ id: 'results', label: L.results }] : []),
    ...(screens.length ? [{ id: 'screens', label: L.screenshots }] : []),
    ...(tech.length ? [{ id: 'tech', label: L.techStack }] : []),
  ];

  return (
    <div dir={isFa ? 'rtl' : 'ltr'} className="min-h-screen text-white relative" style={{
      backgroundColor: '#05070d',
      backgroundImage: `radial-gradient(circle at 78% 8%, ${color}33, transparent 38%), radial-gradient(circle at 12% 22%, ${color}1f, transparent 34%)`,
    }}>
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-[rgba(5,7,13,0.72)] border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-[72px] flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2.5 font-bold text-lg">
            <div className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/[0.1] flex items-center justify-center">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="hidden sm:inline">{localized.title}</span>
          </button>

          <nav className="hidden lg:flex items-center gap-7 text-sm text-gray-400">
            {navItems.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="hover:text-white transition-colors">{n.label}</a>
            ))}
          </nav>

          <button onClick={onContact}
            className="px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:opacity-90 shadow-lg"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)`, boxShadow: `0 18px 40px ${color}40` }}
          >
            {L.contact}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 md:px-8">

        {/* ===== HERO ===== */}
        <motion.section
          id="overview"
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="py-16 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center scroll-mt-24"
        >
          <motion.div variants={stagger}>
            <motion.span variants={fadeUp} className="text-[12px] font-black uppercase tracking-[1.5px]" style={{ color }}>
              {localized.category}
            </motion.span>

            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.92] tracking-[-3px] mt-3 mb-4">
              {localized.title.split(' ').slice(0, -1).join(' ')}
              <br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${color}, ${color}aa, ${color})`, WebkitBackgroundClip: 'text' }}>
                {localized.title.split(' ').pop()}
              </span>
            </motion.h1>

            {localized.tagline && (
              <motion.div variants={fadeUp} className="text-xl md:text-2xl font-extrabold mb-4" style={{ color }}>
                {localized.tagline}
              </motion.div>
            )}

            <motion.p variants={fadeUp} className="text-[15px] text-gray-400 leading-relaxed max-w-lg mb-6">
              {localized.problem}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-8">
              {screens.length > 0 && (
                <a href="#screens"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)`, boxShadow: `0 18px 40px ${color}40` }}
                >
                  {L.viewScreens}
                  <ChevronRight className="w-4 h-4" />
                </a>
              )}
              <a href="https://github.com/arshia-khani" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/[0.12] bg-white/[0.04] font-bold text-sm text-white hover:bg-white/[0.08] transition-all duration-300 hover:-translate-y-0.5"
              >
                <Github className="w-4 h-4" />
                {L.seeGithub}
              </a>
            </motion.div>

            {metrics.length > 0 && (
              <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md">
                {metrics.map((m, i) => {
                  const label = (m.label as Record<string, string>)[languageKey] || '';
                  return (
                    <div key={i} className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-4">
                      <div className="text-lg md:text-xl font-black" style={{ color }}>{m.value}</div>
                      <div className="text-[9px] uppercase tracking-[1px] text-gray-500 font-bold mt-1">{label}</div>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex justify-center lg:justify-end"
          >
            {heroImage && (
              <div className="relative">
                <div className="absolute inset-0 blur-[60px] opacity-30 rounded-full" style={{ backgroundColor: color }} />
                <img src={heroImage} alt={`${localized.title} Preview`} className="relative w-full max-w-[500px] drop-shadow-[0_40px_80px_rgba(0,0,0,0.7)]" />
              </div>
            )}
          </motion.div>
        </motion.section>

        {/* ===== THE CHALLENGE ===== */}
        {challenges.length > 0 && (
          <motion.section
            id="challenge"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="mt-7 scroll-mt-24"
          >
            <Panel className="p-6 md:p-8">
              <SectionTitle label={L.challenge} title={L.problem} accent={color} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.p variants={fadeUp} className="text-[15px] text-gray-300 leading-relaxed">
                  {localized.problem}
                </motion.p>
                <div className="space-y-4">
                  {challenges.map((c, idx) => (
                    <motion.div key={idx} variants={fadeUp} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
                      <div className="flex items-start gap-3">
                        <Target className="w-4 h-4 mt-1 shrink-0" style={{ color }} />
                        <div>
                          <div className="text-[13px] font-bold text-white">{c.problem}</div>
                          <div className="text-[13px] text-gray-400 leading-relaxed mt-1.5">{c.solution}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Panel>
          </motion.section>
        )}

        {/* ===== WHAT I BUILT / APPROACH ===== */}
        {features.length > 0 && (
          <motion.section
            id="approach"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="mt-7 scroll-mt-24"
          >
            <Panel className="p-6 md:p-8">
              <SectionTitle label={L.approach} title={localized.category} accent={color} />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {features.map((f, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeUp}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 transition-all duration-300"
                    whileHover={{ y: -5, borderColor: `${color}60`, boxShadow: `0 20px 50px ${color}20` }}
                  >
                    <h3 className="text-sm font-extrabold text-white mb-2">{f.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{f.description}</p>
                  </motion.div>
                ))}
              </div>

              {highlights.length > 0 && (
                <div className="mt-7 flex flex-wrap gap-2.5">
                  {highlights.map((item, idx) => (
                    <span key={idx} className="text-[12px] font-semibold px-3.5 py-2 rounded-full border" style={{ color, borderColor: `${color}30`, backgroundColor: `${color}10` }}>
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </Panel>
          </motion.section>
        )}

        {/* ===== PROCESS / TIMELINE ===== */}
        {timeline.length > 0 && (
          <motion.section
            id="process"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="mt-7 scroll-mt-24"
          >
            <Panel className="p-6 md:p-8">
              <SectionTitle label={L.process} title={L.process} accent={color} />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {timeline.map((step, idx) => (
                  <motion.div key={idx} variants={fadeUp} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[12px] font-black mb-3" style={{ backgroundColor: `${color}1a`, color }}>
                      {idx + 1}
                    </div>
                    <div className="text-[13px] font-bold text-white mb-1">{step.phase}</div>
                    <div className="text-[11px] text-gray-400 leading-relaxed">{step.description}</div>
                  </motion.div>
                ))}
              </div>
            </Panel>
          </motion.section>
        )}

        {/* ===== ARCHITECTURE ===== */}
        {archNodes.length > 0 && (
          <motion.section
            id="architecture"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="mt-7 scroll-mt-24"
          >
            <Panel className="p-6 md:p-8">
              <SectionTitle label={L.architecture} title={L.architecture} accent={color} />
              <div className="flex flex-wrap items-center gap-3">
                {archNodes.map((node, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.06 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className="rounded-xl border px-4 py-3 text-sm font-bold text-center min-w-[110px]"
                      style={{ borderColor: `${color}30`, backgroundColor: `${color}08`, color }}
                    >
                      {node}
                    </div>
                    {idx < archNodes.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    )}
                  </motion.div>
                ))}
              </div>
            </Panel>
          </motion.section>
        )}

        {/* ===== RESULTS / BY THE NUMBERS ===== */}
        {metrics.length > 0 && (
          <motion.section
            id="results"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="mt-7 scroll-mt-24"
          >
            <Panel className="p-6 md:p-8 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${color}14, rgba(255,255,255,0.02))` }}>
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[80px] opacity-20" style={{ backgroundColor: color }} />
              <SectionTitle label={L.results} title={L.byTheNumbers} accent={color} />
              <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-2 flex items-center">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 mt-1 shrink-0" style={{ color }} />
                    <p className="text-[15px] text-gray-200 leading-relaxed font-medium">{localized.outcome}</p>
                  </div>
                </div>
                <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {metrics.map((m, i) => {
                    const label = (m.label as Record<string, string>)[languageKey] || '';
                    return (
                      <div key={i} className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-4">
                        <div className="text-xl md:text-2xl font-black" style={{ color }}>{m.value}</div>
                        <div className="text-[9px] uppercase tracking-[1px] text-gray-500 font-bold mt-1">{label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Panel>
          </motion.section>
        )}

        {/* ===== SCREENSHOTS ===== */}
        {screens.length > 0 && (
          <motion.section
            id="screens"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="mt-7 scroll-mt-24"
          >
            <Panel className="p-6 md:p-8">
              <SectionTitle label={L.screenshots} title={L.screenshots} accent={color} />
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
                {screens.map((screen, idx) => (
                  <div key={idx} className="min-w-[160px] snap-start text-center flex-shrink-0">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className="rounded-2xl border border-white/[0.1] bg-zinc-900 aspect-[9/19] w-[160px] flex items-center justify-center mb-3 overflow-hidden"
                      style={{ boxShadow: `0 8px 30px ${color}15` }}
                    >
                      <div className="w-full h-full flex flex-col items-center justify-center p-4" style={{ background: `linear-gradient(180deg, ${color}20, transparent)` }}>
                        <div className="text-2xl mb-2">{['📱', '🔍', '📝', '📋', '📁', '👤', '⚙️', '📊'][idx % 8]}</div>
                        <div className="text-[9px] font-bold text-center text-white/60">{screen.title}</div>
                        <div className="text-[7px] text-white/30 text-center mt-1 leading-relaxed">{screen.description}</div>
                      </div>
                    </motion.div>
                    <p className="text-sm font-bold">{screen.title}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </motion.section>
        )}

        {/* ===== TECH STACK + METADATA ===== */}
        <motion.section
          id="tech"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="mt-7 grid grid-cols-1 lg:grid-cols-5 gap-7 scroll-mt-24"
        >
          <Panel className="p-6 md:p-8 lg:col-span-3">
            <SectionTitle label={L.techStack} title={L.techStack} accent={color} />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {tech.map((t, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm font-bold text-blue-50/90 flex items-center gap-2"
                >
                  <Layers className="w-3.5 h-3.5" style={{ color }} />
                  {t}
                </motion.div>
              ))}
            </div>
          </Panel>

          <Panel className="p-6 md:p-8 lg:col-span-2">
            <SectionTitle label={L.overview} title={L.overview} accent={color} />
            <div className="grid grid-cols-2 gap-3 content-start">
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-5">
                <div className="text-[10px] font-black uppercase tracking-[1px]" style={{ color }}>{L.myRole}</div>
                <p className="text-base font-bold text-white mt-2">{localized.role || scopeLabels[project.scope] || ''}</p>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-5">
                <div className="text-[10px] font-black uppercase tracking-[1px]" style={{ color }}>{L.projectType}</div>
                <p className="text-base font-bold text-white mt-2">{localized.scopeLabel || scopeLabels[project.scope] || ''}</p>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-5">
                <div className="text-[10px] font-black uppercase tracking-[1px]" style={{ color }}>{L.scope}</div>
                <p className="text-base font-bold text-white mt-2">{project.scope}</p>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-5">
                <div className="text-[10px] font-black uppercase tracking-[1px]" style={{ color }}>{L.platform}</div>
                <p className="text-base font-bold text-white mt-2">{platform}</p>
              </div>
            </div>
          </Panel>
        </motion.section>

        {/* ===== CTA ===== */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="my-7"
        >
          <Panel className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5" style={{ background: `linear-gradient(135deg, ${color}12, rgba(255,255,255,0.02))` }}>
            <div className="flex items-start gap-4">
              {heroImage && (
                <img src={heroImage} alt="" className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
              )}
              <div>
                <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">{L.ctaTitle}</h2>
                <p className="text-sm text-gray-400 mt-1">{L.ctaSub}</p>
              </div>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <button onClick={onContact}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)`, boxShadow: `0 18px 40px ${color}40` }}
              >
                <Mail className="w-4 h-4" />
                {L.contact}
              </button>
              <a href="https://github.com/arshia-khani" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-white/[0.1] text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com/in/arshia-khani" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-white/[0.1] text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </Panel>
        </motion.section>

        {/* Footer */}
        <footer className="py-6 text-xs text-gray-500 flex flex-wrap justify-between gap-4 border-t border-white/[0.06]">
          <p>© 2026 {localized.title}. {isFa ? 'تمام حقوق محفوظ است.' : 'All rights reserved.'}</p>
          <div className="flex gap-4">
            <a href="https://github.com/arshia-khani" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/arshia-khani" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <button onClick={onContact} className="hover:text-white transition-colors">{L.contact}</button>
          </div>
        </footer>

      </main>
    </div>
  );
}
