import { ArrowLeft, Check, Copy, Download, ExternalLink, Globe2 } from 'lucide-react';
import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';
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

const ui = {
  fa: {
    back: 'بازگشت', copy: 'کپی لینک', copied: 'کپی شد', download: 'دانلود PDF تصویری', exporting: 'در حال ساخت…',
    profile: 'پروفایل حرفه‌ای', selected: 'پروژه‌های شاخص', more: 'ادامه پروژه‌ها', toolkit: 'توانمندی‌های اصلی',
    evidence: 'اثر قابل اندازه‌گیری', contact: 'ارتباط', availability: 'آماده همکاری', caseStudy: 'مشاهده جزئیات',
    footer: 'رزومه آنلاین عرشیا خانی', page: 'صفحه',
    intro: 'محصولات موبایل و بک‌اند را از ایده تا انتشار می‌سازم؛ با تمرکز بر معماری تمیز، تجربه سریع و نتیجه‌ای که بتوان اندازه گرفت.',
    availabilityText: 'برای همکاری با تیم‌های محصول در حوزه موبایل، بک‌اند و سامانه‌های هوشمند؛ حضوری در تهران یا دورکاری.',
  },
  en: {
    back: 'Back', copy: 'Copy link', copied: 'Copied', download: 'Download image PDF', exporting: 'Creating…',
    profile: 'Professional profile', selected: 'Selected work', more: 'More projects', toolkit: 'Core expertise',
    evidence: 'Measurable impact', contact: 'Contact', availability: 'Open to work', caseStudy: 'View case study',
    footer: 'Arshia Khani — online resume', page: 'Page',
    intro: 'I build mobile and backend products from idea to production, with clean architecture, fast experiences, and measurable outcomes.',
    availabilityText: 'Available for product teams working on mobile, backend, and intelligent systems — onsite in Tehran or remote.',
  },
} as const;

const clean = (value: string) => value.replace(/\s+/g, ' ').trim();

export default function ResumePage({ language, onBack, onLanguageChange }: ResumePageProps) {
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);
  const isFa = language === 'fa';
  const t = ui[language];
  const labels = resumeProfile.labels[language];
  const projects = projectsData as ProjectSchema[];

  useEffect(() => {
    document.title = `${resumeProfile.name[language]} — ${isFa ? 'رزومه' : 'Resume'}`;
    return () => { document.title = 'Arshia Khani | Full-Stack Engineer'; };
  }, [isFa, language]);

  const copyUrl = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const downloadPdf = async () => {
    if (exporting) return;
    setExporting(true);
    const previousScroll = window.scrollY;
    try {
      await document.fonts.ready;
      const pages = Array.from(document.querySelectorAll<HTMLElement>('.cv-page'));
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
      for (let index = 0; index < pages.length; index += 1) {
        pages[index].scrollIntoView({ block: 'start' });
        await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
        const canvas = await html2canvas(pages[index], {
          backgroundColor: '#f7f5ef', scale: 2, useCORS: true, logging: false,
          width: pages[index].scrollWidth, height: pages[index].scrollHeight,
        });
        if (index) pdf.addPage('a4', 'portrait');
        pdf.addImage(canvas.toDataURL('image/jpeg', .97), 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
      }
      window.scrollTo({ top: previousScroll });
      pdf.save(`Arshia-Khani-Resume-${language.toUpperCase()}.pdf`);
    } finally {
      window.scrollTo({ top: previousScroll });
      setExporting(false);
    }
  };

  const renderProject = (project: ProjectSchema, number: number, featured = false) => {
    const item = project[language];
    const link = project.publicUrl?.[language] ?? `${resumeProfile.contact.website}/${language}/projects/${project.id}`;
    return (
      <article className={`cv-project${featured ? ' featured' : ''}`} key={project.id}>
        <div className="cv-project-index">{String(number).padStart(2, '0')}</div>
        <div className="cv-project-body">
          <div className="cv-project-heading">
            <div>
              <h3>{clean(item.title)}</h3>
              <p>{project.year} · {labels.scopes[project.scope]} · {labels.statuses[project.status] ?? project.status}</p>
            </div>
            <a href={link} target="_blank" rel="noreferrer" aria-label={`${t.caseStudy}: ${clean(item.title)}`}><ExternalLink size={13} /></a>
          </div>
          <p className="cv-project-desc">{clean(item.desc)}</p>
          <ul>{item.highlights.slice(0, featured ? 3 : 2).map((entry: string) => <li key={entry}>{clean(entry)}</li>)}</ul>
          <div className="cv-metrics">{project.metrics.slice(0, 3).map((metric) => <span key={metric.label.en}><b>{clean(metric.value)}</b>{clean(metric.label[language])}</span>)}</div>
        </div>
      </article>
    );
  };

  return (
    <main className="cv-shell" dir={isFa ? 'rtl' : 'ltr'}>
      <nav className="cv-toolbar">
        <button type="button" onClick={onBack}><ArrowLeft size={16} className={isFa ? 'rotate-180' : ''} />{t.back}</button>
        <div>
          <button type="button" onClick={() => onLanguageChange(isFa ? 'en' : 'fa')}><Globe2 size={16} />{isFa ? 'English' : 'فارسی'}</button>
          <button type="button" onClick={copyUrl}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? t.copied : t.copy}</button>
          <button type="button" className="primary" onClick={downloadPdf} disabled={exporting}><Download size={16} />{exporting ? t.exporting : t.download}</button>
        </div>
      </nav>

      <section className="cv-page cv-page-one" aria-label={`${resumeProfile.name[language]} resume page 1`}>
        <header className="cv-hero">
          <div className="cv-monogram">AK<span>+</span></div>
          <div className="cv-identity">
            <p className="cv-overline">SENIOR SOFTWARE ENGINEER · PRODUCT BUILDER</p>
            <h1>{resumeProfile.name[language]}</h1>
            <p className="cv-role">{resumeProfile.role[language]}</p>
          </div>
          <div className="cv-contact">
            <a href={`mailto:${resumeProfile.contact.email}`}>{resumeProfile.contact.email}</a>
            <a href={`tel:${resumeProfile.contact.phone.replace(/\s/g, '')}`}>{resumeProfile.contact.phone}</a>
            <a href={resumeProfile.contact.website}>arshiasir.ir</a>
            <span>{resumeProfile.location[language]}</span>
          </div>
        </header>

        <div className="cv-intro-grid">
          <div className="cv-intro-number"><strong>5+</strong><span>{isFa ? 'سال تجربه ساخت محصول' : 'years building products'}</span></div>
          <div className="cv-intro-copy"><p>{t.intro}</p><small>{resumeProfile.summary[language]}</small></div>
        </div>

        <div className="cv-main-grid">
          <aside>
            <CvTitle number="01" title={t.toolkit} />
            <div className="cv-skills">
              {resumeProfile.skills.map((group) => <div key={group.title.en}><h3>{group.title[language]}</h3><p>{group.items.join(' / ')}</p></div>)}
            </div>
            <CvTitle number="02" title={t.evidence} />
            <div className="cv-proof">
              <div><b>12k+</b><span>{isFa ? 'راننده فعال' : 'active drivers'}</span></div>
              <div><b>2M/h</b><span>{isFa ? 'همگام‌سازی رکورد' : 'records synced'}</span></div>
              <div><b>&lt;90ms</b><span>{isFa ? 'تطبیق چهره' : 'face matching'}</span></div>
              <div><b>6</b><span>{isFa ? 'محصول واقعی' : 'real products'}</span></div>
            </div>
          </aside>
          <div className="cv-work">
            <CvTitle number="03" title={t.selected} />
            {projects.slice(0, 3).map((project, index) => renderProject(project, index + 1, index === 0))}
          </div>
        </div>
        <div className="cv-page-one-band">
          <div><span>AVAILABLE / 2026</span><strong>{t.availability}</strong></div>
          <p>{t.availabilityText}</p>
          <a href={`mailto:${resumeProfile.contact.email}`}>{resumeProfile.contact.email}</a>
        </div>
        <CvFooter page={1} language={language} label={t.footer} pageLabel={t.page} />
      </section>

      <section className="cv-page cv-page-two" aria-label={`${resumeProfile.name[language]} resume page 2`}>
        <header className="cv-page-header"><div className="cv-monogram small">AK<span>+</span></div><div><b>{resumeProfile.name[language]}</b><span>{resumeProfile.role[language]}</span></div><a href={resumeProfile.contact.website}>ARSHIASIR.IR</a></header>
        <div className="cv-page-two-title"><span>04</span><h2>{t.more}</h2><p>{isFa ? 'شش محصول، از موبایل و تجربه کاربری تا بک‌اند، داده و هوش مصنوعی.' : 'Six products spanning mobile UX, backend, data, and applied AI.'}</p></div>
        <div className="cv-projects-second">{projects.slice(3).map((project, index) => renderProject(project, index + 4, true))}</div>
        <div className="cv-bottom-grid">
          <section><CvTitle number="05" title={t.availability} /><p>{t.availabilityText}</p><a href={`mailto:${resumeProfile.contact.email}`}>{resumeProfile.contact.email}</a></section>
          <section><CvTitle number="06" title={t.contact} /><div className="cv-socials">{resumeProfile.social.map((item) => <a key={item.url} href={item.url}>{item.label}<ExternalLink size={11} /></a>)}</div></section>
          <div className="cv-cta"><span>{isFa ? 'بیایید یک محصول خوب بسازیم.' : "Let's build something that matters."}</span><b>AVAILABLE / 2026</b></div>
        </div>
        <CvFooter page={2} language={language} label={t.footer} pageLabel={t.page} />
      </section>
    </main>
  );
}

function CvTitle({ number, title }: { number: string; title: string }) {
  return <div className="cv-section-title"><span>{number}</span><h2>{title}</h2></div>;
}

function CvFooter({ page, language, label, pageLabel }: { page: number; language: ResumeLanguage; label: string; pageLabel: string }) {
  return <footer className="cv-footer"><span>{label}</span><span>{pageLabel} {page} / 2 · {language.toUpperCase()}</span></footer>;
}
