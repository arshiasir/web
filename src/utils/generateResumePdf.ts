import { jsPDF } from 'jspdf';
import vazirFontUrl from '../assets/fonts/vazir/Vazirmatn-Regular.ttf?url';
import type { ProjectSchema, ResumeLanguage, ResumeProfile } from '../types/schema';

export interface GenerateResumePdfOptions {
  language: ResumeLanguage;
  profile: ResumeProfile;
  projects: ProjectSchema[];
}

const PAGE = { width: 210, height: 297, margin: 17, footer: 13 };
let cachedVazirBase64: string | null = null;

async function loadVazirFont() {
  if (cachedVazirBase64) return cachedVazirBase64;
  const response = await fetch(vazirFontUrl);
  if (!response.ok) throw new Error('Unable to load the embedded Persian font.');
  const bytes = new Uint8Array(await response.arrayBuffer());
  let binary = '';
  const chunkSize = 0x8000;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }
  cachedVazirBase64 = btoa(binary);
  return cachedVazirBase64;
}

export async function generateResumePdf({ language, profile, projects }: GenerateResumePdfOptions) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true, putOnlyUsedFonts: true });
  const isFa = language === 'fa';
  const labels = profile.labels[language];

  if (isFa) {
    doc.addFileToVFS('Vazirmatn-Regular.ttf', await loadVazirFont());
    doc.addFont('Vazirmatn-Regular.ttf', 'Vazirmatn', 'normal');
    doc.setFont('Vazirmatn', 'normal');
    // Right alignment provides the document direction. Enabling jsPDF's global
    // R2L bidi pass reverses Persian glyph order, so it must stay disabled.
    doc.setR2L(false);
  } else {
    doc.setFont('helvetica', 'normal');
  }

  const ink: [number, number, number] = [18, 18, 18];
  const muted: [number, number, number] = [88, 96, 106];
  const accent: [number, number, number] = [35, 60, 75];
  const contentWidth = PAGE.width - PAGE.margin * 2;
  const anchorX = isFa ? PAGE.width - PAGE.margin : PAGE.margin;
  const align = isFa ? 'right' as const : 'left' as const;
  let y = PAGE.margin;

  // jsPDF's Arabic plugin shapes text automatically in its preProcessText hook.
  // Passing already-shaped text through that hook a second time disconnects glyphs.
  const shape = (value: string) => value;
  const lines = (value: string, width = contentWidth) => doc.splitTextToSize(value, width) as string[];
  const setFont = (size: number, color: [number, number, number] = ink) => {
    doc.setFontSize(size);
    doc.setTextColor(...color);
  };
  const ensureSpace = (height: number) => {
    if (y + height <= PAGE.height - PAGE.footer) return;
    doc.addPage();
    y = PAGE.margin;
  };
  const write = (value: string, size = 9.2, width = contentWidth, lineHeight = 4.7, color = ink) => {
    const output = lines(value, width);
    ensureSpace(output.length * lineHeight + 1);
    setFont(size, color);
    doc.text(output, anchorX, y, { align, baseline: 'top', lineHeightFactor: lineHeight / (size * 0.3528) });
    y += output.length * lineHeight;
    return output.length;
  };
  const section = (title: string) => {
    ensureSpace(13);
    y += 4;
    setFont(13, accent);
    doc.text(shape(title), anchorX, y, { align, baseline: 'top' });
    y += 7;
    doc.setDrawColor(175);
    doc.setLineWidth(0.25);
    doc.line(PAGE.margin, y - 1.5, PAGE.width - PAGE.margin, y - 1.5);
  };
  const linkedText = (label: string, url: string, size = 8.5) => {
    const rendered = shape(label);
    setFont(size, accent);
    const width = Math.min(doc.getTextWidth(rendered), contentWidth);
    const x = isFa ? anchorX - width : anchorX;
    doc.text(rendered, anchorX, y, { align, baseline: 'top' });
    doc.link(x, y - 0.5, width, 4.5, { url });
    y += 5;
  };

  setFont(20);
  doc.text(shape(profile.name[language]), anchorX, y, { align, baseline: 'top' });
  y += 9;
  write(profile.role[language], 10.5, contentWidth, 5, accent);
  write(profile.location[language], 8.7, contentWidth, 4.5, muted);
  y += 2;

  const contactItems = [
    { label: profile.contact.email, url: `mailto:${profile.contact.email}` },
    { label: profile.contact.phone, url: `tel:${profile.contact.phone.replace(/\s/g, '')}` },
    { label: profile.contact.website.replace(/^https?:\/\//, ''), url: profile.contact.website },
    ...profile.social,
  ];
  ensureSpace(15);
  const columnWidth = (contentWidth - 8) / 2;
  const rowHeight = 6.2;
  contactItems.forEach((item, index) => {
    const column = index % 2;
    const row = Math.floor(index / 2);
    const x = PAGE.margin + column * (columnWidth + 8);
    const textY = y + row * rowHeight;
    const rendered = shape(item.label);
    setFont(8.2, index < 3 ? ink : accent);
    doc.text(rendered, x, textY, { align: 'left', baseline: 'top' });
    doc.link(x, textY - 0.5, Math.min(doc.getTextWidth(rendered), columnWidth), 4.5, { url: item.url });
  });
  y += Math.ceil(contactItems.length / 2) * rowHeight + 1;

  section(labels.summary);
  write(profile.summary[language], 9.4, contentWidth, 5.1, ink);

  section(labels.skills);
  profile.skills.forEach((group) => {
    ensureSpace(10);
    setFont(9.5, accent);
    doc.text(shape(group.title[language]), anchorX, y, { align, baseline: 'top' });
    y += 4.8;
    write(group.items.join(' · '), 8.5, contentWidth, 4.5, muted);
    y += 1;
  });

  section(labels.projects);
  projects.forEach((project, index) => {
    const localized = project[language];
    const projectUrl = project.publicUrl?.[language] ?? `${profile.contact.website}/${language}/projects/${project.id}`;
    ensureSpace(38);
    setFont(11.2, ink);
    doc.text(shape(`${index + 1}. ${localized.title}`), anchorX, y, { align, baseline: 'top' });
    y += 5.5;
    const localizedStatus = labels.statuses[project.status] ?? project.status;
    write(`${labels.year}: ${project.year}  ·  ${labels.scope}: ${labels.scopes[project.scope]}  ·  ${labels.status}: ${localizedStatus}`, 7.8, contentWidth, 4.2, muted);
    y += 1;
    write(localized.desc, 8.7, contentWidth, 4.7, ink);
    if (localized.role) write(`${labels.role}: ${localized.role}`, 8.2, contentWidth, 4.4, accent);
    if (localized.highlights?.length) {
      localized.highlights.slice(0, 4).forEach((highlight: string) => write(`• ${highlight}`, 8.2, contentWidth - 2, 4.4, muted));
    }
    if (localized.outcome) write(`${labels.outcome}: ${localized.outcome}`, 8.2, contentWidth, 4.4, ink);
    write(`${labels.technologies}: ${project.tech.join(', ')}`, 7.8, contentWidth, 4.2, muted);
    if (project.metrics?.length) {
      const metricText = project.metrics.map((metric) => `${metric.label[language]}: ${metric.value}`).join(' · ');
      write(`${labels.metrics}: ${metricText}`, 7.8, contentWidth, 4.2, accent);
    }
    linkedText(`${labels.caseStudy}: ${projectUrl.replace(/^https?:\/\//, '')}`, projectUrl, 8);
    y += 3;
  });

  const renderEntries = (title: string, entries = profile.experience) => {
    if (!entries?.length) return;
    section(title);
    entries.forEach((entry) => {
      ensureSpace(22);
      write(`${entry.title[language]} — ${entry.organization[language]}`, 10, contentWidth, 5, ink);
      write(entry.period[language], 8, contentWidth, 4.2, muted);
      entry.highlights[language].forEach((highlight) => write(`• ${highlight}`, 8.5, contentWidth, 4.5, ink));
      y += 2;
    });
  };
  renderEntries(labels.experience, profile.experience);
  renderEntries(labels.education, profile.education);

  const pageCount = doc.getNumberOfPages();
  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page);
    doc.setDrawColor(220);
    doc.line(PAGE.margin, PAGE.height - 10, PAGE.width - PAGE.margin, PAGE.height - 10);
    setFont(7.2, muted);
    const pageText = `${labels.page} ${page} / ${pageCount}`;
    doc.text(shape(pageText), isFa ? PAGE.width - PAGE.margin : PAGE.margin, PAGE.height - 6, { align });
    const source = `${labels.generatedFrom} · arshiasir.ir`;
    doc.text(shape(source), isFa ? PAGE.margin : PAGE.width - PAGE.margin, PAGE.height - 6, { align: isFa ? 'left' : 'right' });
  }

  const filename = `Arshia-Khani-Resume-${language.toUpperCase()}.pdf`;
  doc.save(filename);
  return filename;
}
