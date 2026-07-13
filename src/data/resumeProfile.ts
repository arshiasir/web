import type { ResumeProfile } from '../types/schema';

export const resumeProfile: ResumeProfile = {
  name: { en: 'Arshia Khani', fa: 'عرشیا خانی' },
  role: {
    en: 'Flutter Engineer · Backend Developer · System Architect',
    fa: 'مهندس فلاتر · توسعه‌دهنده بک‌اند · معمار سیستم',
  },
  summary: {
    en: 'System-oriented software engineer with 4+ years of experience building polished Flutter products and high-throughput backend services. Focused on real-time systems, machine-learning pipelines, scalable databases, and reliable end-to-end delivery.',
    fa: 'مهندس نرم‌افزار سیستم‌محور با بیش از ۴ سال تجربه در ساخت محصولات حرفه‌ای Flutter و سرویس‌های بک‌اند پربازده؛ متمرکز بر سیستم‌های بلادرنگ، پایپ‌لاین‌های یادگیری ماشین، پایگاه‌داده‌های مقیاس‌پذیر و تحویل کامل محصول.',
  },
  location: { en: 'Tehran, Iran', fa: 'تهران، ایران' },
  contact: {
    email: 'khaniarshia7@gmail.com',
    phone: '+98 903 851 0475',
    website: 'https://arshiasir.ir',
  },
  social: [
    { label: 'GitHub', url: 'https://github.com/arshiasir' },
    { label: 'Telegram', url: 'https://t.me/arshia_sir' },
    { label: 'X', url: 'https://x.com/arshia_sir' },
    { label: 'YouTube', url: 'https://m.youtube.com/@arshia_sir/playlists' },
  ],
  skills: [
    { title: { en: 'Mobile Engineering', fa: 'مهندسی موبایل' }, items: ['Flutter', 'Dart', 'Riverpod', 'BLoC', 'Clean Architecture'] },
    { title: { en: 'Backend & APIs', fa: 'بک‌اند و API' }, items: ['FastAPI', 'Django REST', 'Express', 'WebSocket', 'REST API'] },
    { title: { en: 'Data & Infrastructure', fa: 'داده و زیرساخت' }, items: ['PostgreSQL', 'Redis', 'SQLite', 'Docker', 'Microservices'] },
    { title: { en: 'AI & Performance', fa: 'هوش مصنوعی و عملکرد' }, items: ['Computer Vision', 'Machine Learning', 'ONNX', 'System Design', 'Performance Optimization'] },
  ],
  labels: {
    en: {
      summary: 'Professional Summary', skills: 'Core Skills', projects: 'Selected Engineering Projects',
      experience: 'Experience', education: 'Education', technologies: 'Technologies', highlights: 'Highlights',
      metrics: 'Key Metrics', caseStudy: 'View case study', page: 'Page', generatedFrom: 'Live portfolio data',
      status: 'Status', scope: 'Scope', year: 'Year',
      role: 'Role', outcome: 'Outcome',
      scopes: { FULLSTACK: 'Full-stack', MOBILE: 'Mobile', BACKEND: 'Backend' },
      statuses: { Production: 'Production', 'In Development': 'In development' },
    },
    fa: {
      summary: 'خلاصه حرفه‌ای', skills: 'مهارت‌های کلیدی', projects: 'پروژه‌های منتخب مهندسی',
      experience: 'سوابق حرفه‌ای', education: 'تحصیلات', technologies: 'فناوری‌ها', highlights: 'دستاوردها',
      metrics: 'شاخص‌های کلیدی', caseStudy: 'مشاهده مطالعه پروژه', page: 'صفحه', generatedFrom: 'داده زنده وب‌سایت',
      status: 'وضعیت', scope: 'حوزه', year: 'سال',
      role: 'نقش', outcome: 'نتیجه',
      scopes: { FULLSTACK: 'فول‌استک', MOBILE: 'موبایل', BACKEND: 'بک‌اند' },
      statuses: { Production: 'منتشرشده', 'In Development': 'در حال توسعه' },
    },
  },
};
