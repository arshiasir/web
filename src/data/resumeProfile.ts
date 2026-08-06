import type { ResumeProfile } from '../types/schema';

export const resumeProfile: ResumeProfile = {
  name: { en: 'Arshia Khani', fa: 'عرشیا خانی' },
  role: {
    en: 'Senior Flutter & Backend Engineer | Product-focused System Architect',
    fa: 'مهندس ارشد فلاتر و بک‌اند | معمار سیستم و توسعه‌دهنده محصول',
  },
  summary: {
    en: 'Product-minded software engineer with 5+ years of experience delivering polished Flutter applications and dependable backend systems. I turn complex product requirements into maintainable architecture, fast user experiences, real-time services, data pipelines, and measurable business outcomes - from discovery through production.',
    fa: 'مهندس نرم‌افزار محصول‌محور با بیش از ۵ سال تجربه در طراحی و تحویل اپلیکیشن‌های حرفه‌ای فلاتر و سامانه‌های بک‌اند پایدار. نیازهای پیچیده محصول را از مرحله تحلیل تا انتشار، به معماری قابل نگهداری، تجربه کاربری سریع، سرویس‌های بلادرنگ، جریان‌های داده و نتایج قابل اندازه‌گیری تبدیل می‌کنم.',
  },
  location: { en: 'Tehran, Iran | Open to remote collaboration', fa: 'تهران، ایران | آماده همکاری حضوری و دورکاری' },
  contact: {
    email: 'khaniarshia7@gmail.com',
    phone: '+98 903 851 0475',
    website: 'https://arshiasir.ir',
  },
  social: [
    { label: 'github.com/arshiasir', url: 'https://github.com/arshiasir' },
    { label: 't.me/arshia_sir', url: 'https://t.me/arshia_sir' },
  ],
  skills: [
    { title: { en: 'Mobile Engineering', fa: 'توسعه موبایل' }, items: ['Flutter', 'Dart', 'Riverpod', 'BLoC', 'Clean Architecture'] },
    { title: { en: 'Backend & Realtime', fa: 'بک‌اند و بلادرنگ' }, items: ['FastAPI', 'Django REST', 'Node.js', 'WebSocket', 'REST API'] },
    { title: { en: 'Data & Infrastructure', fa: 'داده و زیرساخت' }, items: ['PostgreSQL', 'Redis', 'SQLite', 'Docker', 'Microservices'] },
    { title: { en: 'AI & Engineering', fa: 'هوش مصنوعی و مهندسی' }, items: ['Computer Vision', 'Machine Learning', 'ONNX', 'System Design', 'Performance'] },
  ],
  labels: {
    en: {
      summary: 'PROFILE', skills: 'TECHNICAL TOOLKIT', projects: 'SELECTED IMPACT',
      experience: 'EXPERIENCE', education: 'EDUCATION', technologies: 'Stack', highlights: 'Highlights',
      metrics: 'Evidence', caseStudy: 'Case study', page: 'Page', generatedFrom: 'arshiasir.ir',
      status: 'Status', scope: 'Focus', year: 'Year', role: 'Ownership', outcome: 'Outcome',
      scopes: { FULLSTACK: 'Full-stack', MOBILE: 'Mobile', BACKEND: 'Backend' },
      statuses: { Production: 'Production', 'In Development': 'In development' },
    },
    fa: {
      summary: 'درباره من', skills: 'مهارت‌های فنی', projects: 'دستاوردهای منتخب',
      experience: 'سوابق حرفه‌ای', education: 'تحصیلات', technologies: 'فناوری‌ها', highlights: 'نکات برجسته',
      metrics: 'شاخص‌ها', caseStudy: 'مطالعه پروژه', page: 'صفحه', generatedFrom: 'arshiasir.ir',
      status: 'وضعیت', scope: 'حوزه', year: 'سال', role: 'نقش و مسئولیت', outcome: 'نتیجه',
      scopes: { FULLSTACK: 'فول‌استک', MOBILE: 'موبایل', BACKEND: 'بک‌اند' },
      statuses: { Production: 'منتشرشده', 'In Development': 'در حال توسعه' },
    },
  },
};
