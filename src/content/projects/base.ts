import { imageLinks } from '../../data/imageLinks';

export default [
  {
    id: 'calkilo',
    tech: ['Flutter', 'FastAPI', 'PostgreSQL', 'AI APIs', 'Python'],
    color: '#00D1FF',
    visual: imageLinks.calkiloMockup,
    scope: 'FULLSTACK',
    metrics: [
      { label: { en: 'Accuracy', fa: 'دقت تشخیص' }, value: '96.2%' },
      { label: { en: 'Inference', fa: 'زمان پاسخ‌دهی' }, value: '180ms' },
    ],
  },
  {
    id: 'couchini',
    tech: ['Flutter', 'Django', 'WebSocket', 'Redis', 'Riverpod'],
    color: '#7B61FF',
    visual: imageLinks.couchiniMockup,
    scope: 'MOBILE',
    metrics: [
      { label: { en: 'Audio Latency', fa: 'تأخیر استریم' }, value: '<50ms' },
      { label: { en: 'Frame Rate', fa: 'نرخ بازسازی فریم' }, value: '120fps' },
    ],
  },
  {
    id: 'tipax',
    tech: ['Flutter', 'FastAPI', 'PostgreSQL', 'WebSocket', 'Docker'],
    color: '#FF6B00',
    visual: imageLinks.tipaxMockup,
    scope: 'FULLSTACK',
    metrics: [
      { label: { en: 'Active Drivers', fa: 'رانندگان فعال' }, value: '12k+' },
      { label: { en: 'Throughput', fa: 'ترانش لجستیک' }, value: '500k/day' },
    ],
  },
  {
    id: 'hyperstar',
    tech: ['FastAPI', 'PostgreSQL', 'Docker', 'AWS', 'Redis'],
    color: '#9EFF00',
    visual: imageLinks.hyperstarMockup,
    scope: 'BACKEND',
    metrics: [
      { label: { en: 'Database Sync', fa: 'نرخ همگام‌سازی DB' }, value: '2M/hr' },
      { label: { en: 'Query Performance', fa: 'تاخیر کوئری‌ها' }, value: '12ms' },
    ],
  },
  {
    id: 'faceauth',
    tech: ['Flutter', 'Python', 'Linux', 'SQLite', 'OpenCV'],
    color: '#D7E2EA',
    visual: imageLinks.faceauthMockup,
    scope: 'BACKEND',
    metrics: [
      { label: { en: 'Match Latency', fa: 'سرعت تطبیق چهره' }, value: '0.08s' },
      { label: { en: 'Database Sync', fa: 'همگام‌سازی محلی' }, value: 'Active' },
    ],
  },
] as const;
