import { jsPDF } from 'jspdf';
import vazirFontUrl from '../assets/fonts/vazir/Vazirmatn-Regular.ttf?url';
import type { ProjectSchema, ResumeLanguage, ResumeProfile } from '../types/schema';

export interface GenerateResumePdfOptions {
  language: ResumeLanguage;
  profile: ResumeProfile;
  projects: ProjectSchema[];
}

type PdfColor = readonly [number, number, number];
const PAGE = { width: 210, height: 297, margin: 13 };
const COLOR = {
  navy: [14, 31, 45] as const,
  blue: [17, 112, 148] as const,
  cyan: [41, 165, 193] as const,
  ink: [29, 38, 45] as const,
  muted: [88, 101, 112] as const,
  line: [218, 226, 231] as const,
  soft: [244, 248, 250] as const,
  white: [255, 255, 255] as const,
};

let cachedFont: string | null = null;

async function loadPersianFont() {
  if (cachedFont) return cachedFont;
  const response = await fetch(vazirFontUrl);
  if (!response.ok) throw new Error('Unable to load the embedded Persian font.');
  const bytes = new Uint8Array(await response.arrayBuffer());
  let binary = '';
  for (let index = 0; index < bytes.length; index += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000));
  }
  cachedFont = btoa(binary);
  return cachedFont;
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

export async function generateResumePdf({ language, profile, projects }: GenerateResumePdfOptions) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true, putOnlyUsedFonts: true });
  const isFa = language === 'fa';
  const align = isFa ? ('right' as const) : ('left' as const);
  const bodyFont = isFa ? 'Vazirmatn' : 'helvetica';
  const labels = profile.labels[language];

  if (isFa) {
    const fontData = await loadPersianFont();
    doc.addFileToVFS('Vazirmatn-Regular.ttf', fontData);
    doc.addFont('Vazirmatn-Regular.ttf', 'Vazirmatn', 'normal');
    doc.addFont('Vazirmatn-Regular.ttf', 'Vazirmatn', 'bold');
    doc.setR2L(false);
    doc.setLanguage('fa-IR');
  } else {
    doc.setLanguage('en-US');
  }

  doc.setProperties({
    title: `${profile.name[language]} - ${isFa ? 'رزومه حرفه‌ای' : 'Professional Resume'}`,
    author: profile.name.en,
    subject: profile.role[language],
    keywords: 'Flutter, Backend, FastAPI, Django, System Architecture, Mobile Engineering',
    creator: 'arshiasir.ir',
  });

  const setFont = (size: number, color: PdfColor = COLOR.ink, style: 'normal' | 'bold' = 'normal') => {
    doc.setFont(bodyFont, style);
    doc.setFontSize(size);
    doc.setTextColor(...color);
  };
  const anchor = (x: number, width: number) => (isFa ? x + width : x);
  const lines = (value: string, width: number) => doc.splitTextToSize(clean(value), width) as string[];
  const write = (
    value: string,
    x: number,
    y: number,
    width: number,
    size = 8,
    lineHeight = 4.1,
    color: PdfColor = COLOR.ink,
    style: 'normal' | 'bold' = 'normal',
  ) => {
    setFont(size, color, style);
    const output = lines(value, width);
    doc.text(output, anchor(x, width), y, { align, baseline: 'top', lineHeightFactor: lineHeight / (size * 0.3528) });
    return output.length * lineHeight;
  };
  const addLink = (label: string, url: string, x: number, y: number, width: number, size = 7.2) => {
    setFont(size, COLOR.blue, 'bold');
    doc.text(clean(label), anchor(x, width), y, { align, baseline: 'top' });
    doc.link(x, y - 0.5, width, 4, { url });
  };
  const sectionTitle = (title: string, x: number, y: number, width: number) => {
    setFont(8.4, COLOR.blue, 'bold');
    doc.text(clean(title), anchor(x, width), y, { align, baseline: 'top' });
    doc.setDrawColor(...COLOR.cyan);
    doc.setLineWidth(0.7);
    doc.line(isFa ? x + width - 13 : x, y + 5.2, isFa ? x : x + width, y + 5.2);
    return y + 8.2;
  };

  // Compact identity header: all essential context is visible in one scan.
  doc.setFillColor(...COLOR.navy);
  doc.rect(0, 0, PAGE.width, 43, 'F');
  doc.setFillColor(...COLOR.cyan);
  doc.rect(isFa ? 198 : 0, 0, 12, 43, 'F');
  setFont(22, COLOR.white, 'bold');
  doc.text(clean(profile.name[language]), isFa ? 191 : 17, 10.5, { align, baseline: 'top' });
  setFont(9, [191, 220, 231]);
  doc.text(clean(profile.role[language]), isFa ? 191 : 17, 23, { align, baseline: 'top', maxWidth: 170 });
  setFont(7.1, [219, 231, 236]);
  doc.text(clean(profile.location[language]), isFa ? 191 : 17, 33, { align, baseline: 'top' });

  const left = PAGE.margin;
  const totalWidth = PAGE.width - PAGE.margin * 2;
  const sideWidth = 53;
  const gap = 8;
  const mainWidth = totalWidth - sideWidth - gap;
  const sideX = isFa ? left + mainWidth + gap : left;
  const mainX = isFa ? left : left + sideWidth + gap;

  // Main narrative: recruiter-first, evidence-heavy, no decorative filler.
  let mainY = 49;
  mainY = sectionTitle(labels.summary, mainX, mainY, mainWidth);
  mainY += write(profile.summary[language], mainX, mainY, mainWidth, 8.4, 4.45, COLOR.ink) + 3.5;
  mainY = sectionTitle(labels.projects, mainX, mainY, mainWidth);

  const preferredOrder = ['tvarx', 'calkilo', 'tipax', 'faceauth'];
  const selectedProjects = preferredOrder
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is ProjectSchema => Boolean(project));

  const drawProject = (project: ProjectSchema, index: number, y: number) => {
    const item = project[language];
    const projectUrl = project.publicUrl?.[language] ?? `${profile.contact.website}/${language}/projects/${project.id}`;
    doc.setFillColor(...COLOR.soft);
    doc.roundedRect(mainX, y, mainWidth, 1.1, 0.5, 0.5, 'F');
    y += 3.5;
    y += write(`${String(index + 1).padStart(2, '0')}  ${item.title}`, mainX, y, mainWidth, 10, 4.8, COLOR.navy, 'bold');
    y += write(`${project.year} · ${labels.scopes[project.scope]} · ${labels.statuses[project.status] ?? project.status}`, mainX, y, mainWidth, 6.9, 3.6, COLOR.blue, 'bold') + 0.7;
    y += write(item.desc, mainX, y, mainWidth, 7.7, 4, COLOR.ink) + 0.5;
    (item.highlights ?? []).slice(0, 2).forEach((highlight: string) => {
      y += write(`• ${highlight}`, mainX, y, mainWidth, 7.25, 3.85, COLOR.ink);
    });
    if (item.outcome) {
      y += write(`${labels.outcome}: ${item.outcome}`, mainX, y + 0.3, mainWidth, 7.05, 3.75, COLOR.muted) + 0.5;
    }
    const metrics = (project.metrics ?? [])
      .slice(0, 3)
      .map((metric) => `${clean(metric.label[language])}: ${clean(metric.value)}`)
      .join(' · ');
    if (metrics) y += write(metrics, mainX, y + 0.3, mainWidth, 6.85, 3.6, COLOR.blue, 'bold') + 0.7;
    addLink(labels.caseStudy, projectUrl, mainX, y, mainWidth, 6.9);
    return y + 6.1;
  };

  selectedProjects.forEach((project, index) => {
    mainY = drawProject(project, index, mainY);
  });

  // Right rail ends with content; it is not stretched to page height.
  doc.setFillColor(...COLOR.soft);
  doc.roundedRect(sideX, 49, sideWidth, 198, 2.2, 2.2, 'F');
  let sideY = 56;
  const innerX = sideX + 5;
  const innerWidth = sideWidth - 10;

  sideY = sectionTitle(isFa ? 'ارتباط مستقیم' : 'CONTACT', innerX, sideY, innerWidth);
  const contacts = [
    [profile.contact.email, `mailto:${profile.contact.email}`],
    [profile.contact.phone, `tel:${profile.contact.phone.replace(/\s/g, '')}`],
    [profile.contact.website.replace(/^https?:\/\//, ''), profile.contact.website],
    ...profile.social,
  ];
  contacts.forEach((entry) => {
    const label = Array.isArray(entry) ? entry[0] : entry.label;
    const url = Array.isArray(entry) ? entry[1] : entry.url;
    addLink(label, url, innerX, sideY, innerWidth, 6.9);
    sideY += 5.5;
  });

  sideY += 3;
  sideY = sectionTitle(isFa ? 'مزیتی که به تیم اضافه می‌کنم' : 'WHAT I BRING', innerX, sideY, innerWidth);
  const valuePoints = isFa
    ? [
        ['تحویل سرتاسری محصول', 'از تحلیل نیاز و معماری تا انتشار و پایش'],
        ['موبایل باکیفیت', 'تجربه روان، معماری تمیز و عملکرد قابل اتکا'],
        ['بک‌اند مقیاس‌پذیر', 'API، داده و سرویس‌های بلادرنگ پایدار'],
        ['هوش مصنوعی کاربردی', 'تبدیل مدل و داده به قابلیت واقعی محصول'],
      ]
    : [
        ['End-to-end delivery', 'Discovery, architecture, release, and monitoring'],
        ['High-quality mobile', 'Fluid UX, clean architecture, reliable performance'],
        ['Scalable backend', 'APIs, data, and dependable realtime services'],
        ['Applied AI', 'Turning models and data into useful product features'],
      ];
  valuePoints.forEach(([title, description]) => {
    doc.setFillColor(...COLOR.cyan);
    doc.circle(isFa ? innerX + innerWidth - 1.5 : innerX + 1.5, sideY + 1.5, 0.65, 'F');
    sideY += write(title, innerX + 4.5, sideY, innerWidth - 6, 7.25, 3.8, COLOR.ink, 'bold');
    sideY += write(description, innerX + 4.5, sideY, innerWidth - 6, 6.7, 3.55, COLOR.muted) + 2.1;
  });

  sideY += 1;
  sideY = sectionTitle(labels.skills, innerX, sideY, innerWidth);
  profile.skills.forEach((group) => {
    sideY += write(group.title[language], innerX, sideY, innerWidth, 7.25, 3.8, COLOR.ink, 'bold');
    sideY += write(group.items.join(' · '), innerX, sideY, innerWidth, 6.55, 3.5, COLOR.muted) + 2.4;
  });

  sideY += 1;
  sideY = sectionTitle(isFa ? 'همکاری' : 'AVAILABILITY', innerX, sideY, innerWidth);
  sideY += write(
    isFa ? 'آماده همکاری روی محصولات موبایل، بک‌اند و سامانه‌های هوشمند؛ حضوری در تهران یا به‌صورت دورکاری.' : 'Available for mobile, backend, and intelligent product teams - onsite in Tehran or remote.',
    innerX,
    sideY,
    innerWidth,
    6.85,
    3.65,
    COLOR.ink,
  );

  doc.setDrawColor(...COLOR.line);
  doc.setLineWidth(0.25);
  doc.line(left, 285, PAGE.width - left, 285);
  setFont(6.5, COLOR.muted);
  doc.text(isFa ? 'رزومه تک‌صفحه‌ای · اطلاعات تکمیلی در وب‌سایت' : 'One-page resume · Full case studies online', isFa ? PAGE.width - left : left, 288.5, { align });
  doc.text('arshiasir.ir', isFa ? left : PAGE.width - left, 288.5, { align: isFa ? 'left' : 'right' });

  const filename = `Arshia-Khani-Resume-${language.toUpperCase()}.pdf`;
  doc.save(filename);
  return filename;
}
