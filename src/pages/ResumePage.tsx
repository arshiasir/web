import { ArrowLeft, Copy, ExternalLink, Globe2, Printer } from 'lucide-react';
import { useEffect, useState } from 'react';
import { projectsData } from '../data/projectsData';
import { resumeProfile } from '../data/resumeProfile';
import type { ProjectSchema, ResumeLanguage } from '../types/schema';
import './resume.css';

interface ResumePageProps {
  language: ResumeLanguage;
  onBack: () => void;
  onLanguageChange: (language: ResumeLanguage) => void;
}

const windows1252: Record<string, number> = {
  '€': 0x80, '‚': 0x82, 'ƒ': 0x83, '„': 0x84, '…': 0x85, '†': 0x86, '‡': 0x87,
  'ˆ': 0x88, '‰': 0x89, 'Š': 0x8a, '‹': 0x8b, 'Œ': 0x8c, 'Ž': 0x8e, '‘': 0x91,
  '’': 0x92, '“': 0x93, '”': 0x94, '•': 0x95, '–': 0x96, '—': 0x97, '˜': 0x98,
  '™': 0x99, 'š': 0x9a, '›': 0x9b, 'œ': 0x9c, 'ž': 0x9e, 'Ÿ': 0x9f,
};

function repairEncoding(value: string) {
  if (!/[ØÙÛâÂ]/.test(value)) return value;
  try {
    const bytes = Uint8Array.from(value, (character) => windows1252[character] ?? character.charCodeAt(0));
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    return value;
  }
}

function clean(value: string) {
  return repairEncoding(value)
    .replace(/Â·/g, '·')
    .replace(/â€¢/g, '•')
    .replace(/â€”/g, '-')
    .replace(/â€™/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

const selectedProjectIds = ['tvarx', 'calkilo', 'tipax', 'faceauth'];

const copy = {
  fa: {
    back: 'بازگشت به سایت',
    print: 'دریافت PDF',
    copyLink: 'کپی لینک',
    copied: 'لینک کپی شد',
    directLink: 'نسخه آنلاین رزومه',
    summary: 'درباره من',
    impact: 'دستاوردهای منتخب',
    contact: 'ارتباط مستقیم',
    value: 'مزیتی که به تیم اضافه می‌کنم',
    skills: 'مهارت‌های فنی',
    availability: 'همکاری',
    caseStudy: 'مشاهده مطالعه پروژه',
    outcome: 'نتیجه',
    values: [
      ['تحویل سرتاسری محصول', 'از تحلیل نیاز و معماری تا انتشار و پایش'],
      ['موبایل باکیفیت', 'تجربه روان، معماری تمیز و عملکرد قابل اتکا'],
      ['بک‌اند مقیاس‌پذیر', 'API، داده و سرویس‌های بلادرنگ پایدار'],
      ['هوش مصنوعی کاربردی', 'تبدیل مدل و داده به قابلیت واقعی محصول'],
    ],
    availabilityText: 'آماده همکاری روی محصولات موبایل، بک‌اند و سامانه‌های هوشمند؛ حضوری در تهران یا به‌صورت دورکاری.',
    footer: 'رزومه تک‌صفحه‌ای · جزئیات و مطالعات پروژه در وب‌سایت',
  },
  en: {
    back: 'Back to portfolio',
    print: 'Save as PDF',
    copyLink: 'Copy link',
    copied: 'Link copied',
    directLink: 'Online resume',
    summary: 'Profile',
    impact: 'Selected impact',
    contact: 'Contact',
    value: 'What I bring',
    skills: 'Technical toolkit',
    availability: 'Availability',
    caseStudy: 'View case study',
    outcome: 'Outcome',
    values: [
      ['End-to-end delivery', 'Discovery, architecture, release, and monitoring'],
      ['High-quality mobile', 'Fluid UX, clean architecture, reliable performance'],
      ['Scalable backend', 'APIs, data, and dependable realtime services'],
      ['Applied AI', 'Turning models and data into useful product features'],
    ],
    availabilityText: 'Available for mobile, backend, and intelligent product teams - onsite in Tehran or remote.',
    footer: 'One-page resume · Full project case studies online',
  },
} as const;

export default function ResumePage({ language, onBack, onLanguageChange }: ResumePageProps) {
  const [copied, setCopied] = useState(false);
  const isFa = language === 'fa';
  const labels = resumeProfile.labels[language];
  const ui = copy[language];
  const projects = selectedProjectIds
    .map((id) => projectsData.find((project) => project.id === id))
    .filter(Boolean) as ProjectSchema[];

  useEffect(() => {
    document.title = `${resumeProfile.name[language]} | ${isFa ? 'رزومه حرفه‌ای' : 'Professional Resume'}`;
    return () => { document.title = 'Arshia Khani | Full-Stack Engineer'; };
  }, [isFa, language]);

  const copyUrl = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main className="resume-web" dir={isFa ? 'rtl' : 'ltr'}>
      <nav className="resume-toolbar" aria-label={ui.directLink}>
        <button type="button" className="resume-tool secondary" onClick={onBack}>
          <ArrowLeft size={16} className={isFa ? 'rotate-180' : ''} />
          <span>{ui.back}</span>
        </button>

        <div className="resume-toolbar-actions">
          <button
            type="button"
            className="resume-tool secondary"
            onClick={() => onLanguageChange(isFa ? 'en' : 'fa')}
          >
            <Globe2 size={16} />
            <span>{isFa ? 'English' : 'فارسی'}</span>
          </button>
          <button type="button" className="resume-tool secondary" onClick={copyUrl}>
            <Copy size={16} />
            <span>{copied ? ui.copied : ui.copyLink}</span>
          </button>
          <button type="button" className="resume-tool primary" onClick={() => window.print()}>
            <Printer size={16} />
            <span>{ui.print}</span>
          </button>
        </div>
      </nav>

      <article className="resume-paper" aria-label={`${resumeProfile.name[language]} resume`}>
        <header className="resume-header">
          <div>
            <h1>{resumeProfile.name[language]}</h1>
            <p className="resume-role">{resumeProfile.role[language]}</p>
            <p className="resume-location">{resumeProfile.location[language]}</p>
          </div>
        </header>

        <div className="resume-layout">
          <aside className="resume-sidebar">
            <ResumeSection title={ui.contact} compact>
              <div className="resume-contact-list" dir="ltr">
                <a href={`mailto:${resumeProfile.contact.email}`}>{resumeProfile.contact.email}</a>
                <a href={`tel:${resumeProfile.contact.phone.replace(/\s/g, '')}`}>{resumeProfile.contact.phone}</a>
                <a href={resumeProfile.contact.website} target="_blank" rel="noreferrer">arshiasir.ir</a>
                {resumeProfile.social.map((item) => (
                  <a key={item.url} href={item.url} target="_blank" rel="noreferrer">{item.label}</a>
                ))}
              </div>
            </ResumeSection>

            <ResumeSection title={ui.value} compact>
              <div className="resume-value-list">
                {ui.values.map(([title, description]) => (
                  <div className="resume-value" key={title}>
                    <span className="resume-dot" />
                    <div>
                      <strong>{title}</strong>
                      <p>{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ResumeSection>

            <ResumeSection title={ui.skills} compact>
              <div className="resume-skill-list">
                {resumeProfile.skills.map((group) => (
                  <div key={group.title.en}>
                    <strong>{group.title[language]}</strong>
                    <p dir="ltr">{group.items.join(' · ')}</p>
                  </div>
                ))}
              </div>
            </ResumeSection>

            <ResumeSection title={ui.availability} compact>
              <p className="resume-availability">{ui.availabilityText}</p>
            </ResumeSection>
          </aside>

          <div className="resume-content">
            <ResumeSection title={ui.summary}>
              <p className="resume-summary">{resumeProfile.summary[language]}</p>
            </ResumeSection>

            <ResumeSection title={ui.impact}>
              <div className="resume-project-list">
                {projects.map((project, index) => {
                  const item = project[language];
                  const projectUrl = project.publicUrl?.[language] ?? `${resumeProfile.contact.website}/${language}/projects/${project.id}`;
                  const metrics = project.metrics.slice(0, 3);
                  return (
                    <section className="resume-project" key={project.id}>
                      <h3><span>{String(index + 1).padStart(2, '0')}</span> {clean(item.title)}</h3>
                      <p className="resume-project-meta">
                        {project.year} · {labels.scopes[project.scope]} · {labels.statuses[project.status] ?? project.status}
                      </p>
                      <p className="resume-project-description">{clean(item.desc)}</p>
                      <ul>
                        {item.highlights.slice(0, 2).map((highlight: string) => <li key={highlight}>{clean(highlight)}</li>)}
                      </ul>
                      {item.outcome && <p className="resume-project-outcome"><strong>{ui.outcome}:</strong> {clean(item.outcome)}</p>}
                      <p className="resume-project-metrics">
                        {metrics.map((metric) => `${clean(metric.label[language])}: ${clean(metric.value)}`).join(' · ')}
                      </p>
                      <a className="resume-case-link" href={projectUrl} target="_blank" rel="noreferrer">
                        {ui.caseStudy}<ExternalLink size={11} />
                      </a>
                    </section>
                  );
                })}
              </div>
            </ResumeSection>
          </div>
        </div>

        <footer className="resume-footer">
          <span>{ui.footer}</span>
          <a href={resumeProfile.contact.website}>arshiasir.ir</a>
        </footer>
      </article>
    </main>
  );
}

function ResumeSection({ title, compact = false, children }: { title: string; compact?: boolean; children: React.ReactNode }) {
  return (
    <section className={`resume-section${compact ? ' compact' : ''}`}>
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}
