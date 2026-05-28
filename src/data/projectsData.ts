/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProjectSchema } from '../types/schema';

// Project Mockup Image Imports
import calkiloMockup from '../assets/images/calkilo_mockup_1779713789930.png';
import couchiniMockup from '../assets/images/couchini_mockup_1779713805197.png';
import tipaxMockup from '../assets/images/tipax_mockup_1779713822171.png';
import hyperstarMockup from '../assets/images/hyperstar_mockup_1779713838569.png';
import faceauthMockup from '../assets/images/faceauth_mockup_1779713858799.png';

export const projectsData: ProjectSchema[] = [
  {
    id: 'calkilo',
    tech: ['Flutter', 'FastAPI', 'PostgreSQL', 'AI APIs', 'Python'],
    color: '#00D1FF',
    visual: calkiloMockup,
    scope: 'FULLSTACK',
    metrics: [
      { label: { en: 'Accuracy', fa: 'دقت تشخیص' }, value: '96.2%' },
      { label: { en: 'Inference', fa: 'زمان پاسخ‌دهی' }, value: '180ms' }
    ],
    en: {
      title: 'Calkilo AI',
      category: 'AI Health Platform',
      desc: 'Smart nutrient analysis and instant meal classification powered by custom computer vision AI algorithms.',
      role: 'FULLSTACK DEVELOPMENT',
      scopeLabel: 'Fullstack Systems',
      highlights: [
        'Real-time food recognition AI',
        'Automatic caloric volume calculation',
        'Dynamic personal nutrition metrics',
        'Scalable API pipeline structures'
      ],
      architectureHighlights: [
        'Flutter UI Rendering View',
        'FastAPI Prediction Endpoint',
        'On-device Image Compactor',
        'PostgreSQL Vector DB'
      ],
      realtimeFeatures: 'Leverages high-speed WebSockets to stream frame-by-frame inference details directly during live camera scan previews.',
      aiFeatures: 'Integrates custom YOLOv8 models exported to ONNX format. Processes nutrition classification and density parsing in under 200ms.',
      scalabilityDetails: 'Designed high-throughput inference nodes, enabling horizontal microservices scaling across GPU worker groups behind an API Gateway.',
      performanceOptimizations: 'Utilizes hardware-accelerated texture shaders in Flutter and locks frames at constant 120Hz during live camera scanner overlays.'
    },
    fa: {
      title: 'کالکیلو (Calkilo AI)',
      category: 'پلتفرم هوش مصنوعی سلامت',
      desc: 'آنالیز هوشمند مواد مغذی و دسته‌بندی فوری وعده‌های غذایی با بهره‌گیری از الگوریتم‌های اختصاصی بینایی ماشین هوش مصنوعی.',
      role: 'توسعه فول‌استک (FULLSTACK)',
      scopeLabel: 'سیستم‌های فول‌استک دوجانبه',
      highlights: [
        'تشخیص هوشمند و بلادرنگ نوع غذا',
        'محاسبه خودکار حجم کالری و ریزمغذی‌ها',
        'نمودارهای پویای شاخص‌های تغذیه‌ای کاربر',
        'خط لوله پردازش تصویر فوق سریع'
      ],
      architectureHighlights: [
        'پوسته رابط کاربری فلاتر',
        'نقطه پایانی پیش‌بینی FastAPI',
        'فشرده‌ساز تصاویر سمت دستگاه',
        'پایگاه‌داده برداری PostgreSQL'
      ],
      realtimeFeatures: 'بهره‌گیری از کانال‌های توزیع وب‌سوکت برای استریم نتایج تخمین فریم-به-فریم پیش‌بینی مستقیماً در حین پیش‌نمایش زنده دوربین.',
      aiFeatures: 'ادغام مدل‌های بهینه‌سازی شده تصحیح حرکتی YOLOv8 که در مدت کمتر از ۲۰۰ میلی‌ثانیه دسته‌بندی مواد و حجم را تحلیل می‌کنند.',
      scalabilityDetails: 'معماری بر پایه میکروسرویس‌های توزیع شده که ظرفیت پاسخ‌دهی را با تخصیص گره‌های مستقل پردازشی به صورت افقی افزایش می‌دهد.',
      performanceOptimizations: 'بهینه‌سازی کدهای رندر با استفاده از شیدرهای سخت‌افزاری فلاتر و قفل تراز فرکانس تصاویر روی نرخ نوسازی ۱۲۰ هرتز.'
    }
  },
  {
    id: 'couchini',
    tech: ['Flutter', 'Django', 'WebSocket', 'Redis', 'Riverpod'],
    color: '#7B61FF',
    visual: couchiniMockup,
    scope: 'MOBILE',
    metrics: [
      { label: { en: 'Audio Latency', fa: 'تاخیر استریم' }, value: '<50ms' },
      { label: { en: 'Frame Rate', fa: 'نرخ بازسازی فریم' }, value: '120fps' }
    ],
    en: {
      title: 'Couchini Music',
      category: 'Streaming Platform',
      desc: 'Immersive audio-entertainment app offering low-latency streams, hardware decoding representation, and modern custom interactive discovery tools.',
      role: 'MOBILE DEVELOPMENT',
      scopeLabel: 'Mobile Screen Engineering',
      highlights: [
        'Immersive UI with advanced gesture layouts',
        'Offline cryptographic decryption engine',
        'Synchronized party listening mechanisms',
        'Reactive microstate updates via Riverpod'
      ],
      architectureHighlights: [
        'Immersive Widget Tree Layers',
        'Hardware Media Decoders',
        'Fast Cache Decryption State',
        'Advanced Liquid UI Engine'
      ],
      realtimeFeatures: 'Implements full state synchronization inside Dart isolates, updating localized media controllers instantly on status cues of paired party rooms.',
      aiFeatures: 'Utilizes an on-device lightweight user behavioral engine to order immediate recommendation card displays depending on environmental context.',
      scalabilityDetails: 'Designed cleanly separating presentation states from media service models, creating completely predictable memory bounds for continuous play.',
      performanceOptimizations: 'Custom audio buffer pipelines bypass standard framework channels, eliminating GC memory spikes during heavy high-fidelity chunk buffers.'
    },
    fa: {
      title: 'کوچینی موزیک (Couchini)',
      category: 'پلتفرم پخش جریانی صوت',
      desc: 'اپلیکیشن موسیقی لوکس با امکان استریم صوتی فوق‌العاده کم‌تاخیر، رمزگشایی آفلاین سخت‌افزاری و موتور کشف آهنگ مبتنی بر هوش محیطی.',
      role: 'توسعه تخصصی موبایل (MOBILE)',
      scopeLabel: 'فریم‌ورک‌های موبایل و کلاینت',
      highlights: [
        'رابط کاربری پیشرفته و تعاملات متحرک',
        'رمزگشایی محتوای دانلودی به صورت آفلاین',
        'سینک لحظه‌ای چند کاربره (Party Play)',
        'مدیریت حالت فوق‌العاده پاسخگو با Riverpod'
      ],
      architectureHighlights: [
        'درخت ویجت بهینه‌سازی شده پیشرفته',
        'دیکودرهای صوتی بومی دستگاه',
        'مدیریت حافظه پنهان محلی با اتم رمزگذاری شده',
        'موتور تصویرساز فرکانس موسیقی مستقل'
      ],
      realtimeFeatures: 'سینک دقیق پکت‌های پخش موزیک به کمک پشته وب‌سوکت و تالارهای تبادل رویداد ردیس بدون ایجاد نوسان صوتی.',
      aiFeatures: 'مدل‌سازی ترجیحات کاربر از روی رفتارهای شنیداری برای پیشنهاد ترک‌های بعدی با کمترین تاخیر در پس‌زمینه سیستم.',
      scalabilityDetails: 'بهره‌گیری از جداسازی ساختار لایه‌های گرافیکی و لایه‌های مدیریت پخش برای حفظ تخصیص کاملاً پایدار حافظه موقت.',
      performanceOptimizations: 'بازنویسی کانال سرریز داده‌ها در Dart Isolates که زمان توقف اجرای رابط کاربری را مایل به صفر می‌کند.'
    }
  },
  {
    id: 'tipax',
    tech: ['Flutter', 'FastAPI', 'PostgreSQL', 'WebSocket', 'Docker'],
    color: '#FF6B00',
    visual: tipaxMockup,
    scope: 'FULLSTACK',
    metrics: [
      { label: { en: 'Active Drivers', fa: 'رانندگان فعال سوم' }, value: '12k+' },
      { label: { en: 'Throughput', fa: 'تراکنش لجستیک' }, value: '500k/day' }
    ],
    en: {
      title: 'Tipax Logistics',
      category: 'Realtime Logistics Network',
      desc: 'Robust enterprise system empowering microsecond-accurate updates for delivery drivers, management team cascades, and active tracking map modules.',
      role: 'FULLSTACK DEVELOPMENT',
      scopeLabel: 'Fullstack Systems',
      highlights: [
        'Continuous GPS location broadcasting',
        'Robust multi-persona dashboard panels',
        'Fault-tolerant routing calculations',
        'Automated order assignment systems'
      ],
      architectureHighlights: [
        'Flutter Driver / Supervisor Apps',
        'FastAPI High-through Terminal',
        'RabbitMQ Delivery Pipelines',
        'PostgreSQL PostGIS GeoCluster'
      ],
      realtimeFeatures: 'Broadcasting live coordinates of 12,000+ driver nodes continuously. Relies on low-latency JSON queues with packet fault tolerance.',
      aiFeatures: 'Integrates real-time traveling salesman algorithms (TSP) to compute optimal delivery routes dynamically and minimize logistics wear.',
      scalabilityDetails: 'Distributed worker systems packaged inside high-availability environments. Supports parallel pooling on database coordinates.',
      performanceOptimizations: 'Engineered custom geographic packet telemetry encodings that slashed transmission payloads size by 78% for cellular cells.'
    },
    fa: {
      title: 'تیپاکس لجستیک (Tipax)',
      category: 'شبکه لجستیک و توزیع بلادرنگ',
      desc: 'سامانه قدرتمند لجستیک سازمانی برای رانندگان، ناظران بارکدگذاری و داشبورد مدیریتی کلان با قابلیت ردیابی دقیق جغرافیایی.',
      role: 'توسعه فول‌استک (FULLSTACK)',
      scopeLabel: 'سیستم‌های فول‌استک دوجانبه',
      highlights: [
        'گزارش‌دهی مداوم و کم‌مصرف موقعیت رانندگان',
        'داشبوردهای توزیع و زمان‌بندی سفارشات',
        'محاسبه مسیر بهینه برای رانندگی سریع',
        'سامانه دیسپاچ خودکار سفارشات جدید'
      ],
      architectureHighlights: [
        'اپلیکیشن‌های چندگانه راننده و ناظر',
        'پشت‌صحنه کارآمد با فریم‌ورک FastAPI',
        'صف‌های پیام نامتقارن RabbitMQ',
        'خوشه جغرافیایی PostgreSQL PostGIS'
      ],
      realtimeFeatures: 'پشتیبانی از انتقال آنی مختصات مکانی بیش از ۱۲٬۰۰۰ راننده فعال در جاده از طریق وب‌سوکت سبک لجستیکی.',
      aiFeatures: 'پیاده‌سازی الگوریتم‌های حل مسئله فروشنده دوره‌گرد به منظور یافتن بهینه‌ترین ترتیب ملاقات برای تحویل مرسولات.',
      scalabilityDetails: 'معماری بر پایه مخازن داکر و صف پردازشی توزیع‌شده جهت تضمین عدم تراکم درخواست‌ها در زمان پیک ترافیک شهری.',
      performanceOptimizations: 'طراحی پروتکل بسته‌بندی باینری برای پیام‌های تل‌متری جغرافیایی رانندگان که هدررفت اطلاعات در اینترنت لرزان سلولاری را از بین می‌برد.'
    }
  },
  {
    id: 'hyperstar',
    tech: ['FastAPI', 'PostgreSQL', 'Docker', 'AWS', 'Redis'],
    color: '#9EFF00',
    visual: hyperstarMockup,
    scope: 'BACKEND',
    metrics: [
      { label: { en: 'Database Sync', fa: 'نرخ همگام‌سازیDB' }, value: '2M/hr' },
      { label: { en: 'Query Performance', fa: 'تاخیر کوئری‌ها' }, value: '12ms' }
    ],
    en: {
      title: 'Hyperstar Supply',
      category: 'Enterprise Inventory Hub',
      desc: 'Highly cohesive state engine driving real-time inventory levels, dynamic warehouse stocking algorithms, and role-based permissions systems.',
      role: 'BACKEND DEVELOPMENT',
      scopeLabel: 'High Performance Backend',
      highlights: [
        'Ultra high-throughput transaction ledger',
        'Custom multi-role inventory governance',
        'Intelligent warehouse exhaustion predicts',
        'Optimized sub-millisecond cache engines'
      ],
      architectureHighlights: [
        'REST Gateway API Proxies',
        'FastAPI Core Inventory Engine',
        'Redis Memory Layer Caching',
        'Postgres Database Shard Clusters'
      ],
      realtimeFeatures: 'Establishes high-urgency notifications directly via real-time SSE lanes pushing immediate alerts to supplier procurement panels.',
      aiFeatures: 'Employs predictive stock models using neural regressors to auto-adjust minimum replenish thresholds based on seasonal curves.',
      scalabilityDetails: 'Designed split read-write databases and configured active-active Redis nodes, easily ensuring reliable scaling bounds under stress.',
      performanceOptimizations: 'Formulated precise PostgreSQL composite indexes and query loops that plunged system operations response down to just 12ms.'
    },
    fa: {
      title: 'انبارداری هایپر استار (Hyperstar)',
      category: 'هسته لجستیک و انبار هوشمند زنجیره‌ای',
      desc: 'سیستم جامع مدیریت منابع و پایش بلادرنگ موجودی کالاها با سیستم تایید سطوح دسترسی کارکنان و الگوریتم‌های تامین مجدد کالا.',
      role: 'توسعه تخصصی بک‌اند (BACKEND)',
      scopeLabel: 'معماری بک‌اند و پایگاه‌داده',
      highlights: [
        'ثبت و ردیابی تراکنش‌های انبوه موجودی کالا',
        'مدیریت سطوح دسترسی پیشرفته به سبک RBAC',
        'پیش‌بینی خروج سریع کالا و لزوم شارژ مجدد',
        'سیستم کشینگ فوق سریع برای گزارش کالاها'
      ],
      architectureHighlights: [
        'دروازه مرکزی مدیریت درخواست‌ها API',
        'پردازشگر تراکنش مستقل با FastAPI',
        'توزیع کش حافظه موقت در فواصل دوره‌ای',
        'پورت‌های خوشه‌بندی توزیع داده PostgreSQL'
      ],
      realtimeFeatures: 'ارسال اعلان‌های تغییر فوری موجودی به توزیع‌کنندگان با متدهای Server-Sent Events بدون تاخیر اتصال مجدد.',
      aiFeatures: 'مدل‌سازی آماری پیشرفته روی داده‌های خرید تاریخی برای تنظیم هوشمند حجم انبارش و پیشنهاد فواصل زمانی بهینه‌ترین سفارش.',
      scalabilityDetails: 'استفاده از سیستم شاردینگ پایگاه‌داده و توزیع بار خواندن اطلاعات بین کپی‌های چندگانه برای حفظ دسترسی پایدار.',
      performanceOptimizations: 'بازنویسی کوئری‌های انفرادی پیچیده به روش عبارات مقید پیشرفته و افزایش چشمگیر سرعت خواندن گزارش انبار به کمتر از ۱۲ میلی‌ثانیه.'
    }
  },
  {
    id: 'faceauth',
    tech: ['Flutter', 'Python', 'Linux', 'SQLite', 'OpenCV'],
    color: '#D7E2EA',
    visual: faceauthMockup,
    scope: 'BACKEND',
    metrics: [
      { label: { en: 'Match Latency', fa: 'سرعت تطبیق چهره' }, value: '0.08s' },
      { label: { en: 'Database Sync', fa: 'همگام‌سازی محلی' }, value: 'Active' }
    ],
    en: {
      title: 'FaceAuth Attendance',
      category: 'Biometric Authentication',
      desc: 'Microsecond facial recognition login terminals synced with legacy attendance records for corporate physical infrastructures.',
      role: 'BACKEND DEVELOPMENT',
      scopeLabel: 'High Performance Backend',
      highlights: [
        'Encrypted on-device biometric checking',
        'High-security edge storage pipelines',
        'Robust offline caching mechanisms',
        'Compact custom attendance nodes'
      ],
      architectureHighlights: [
        'Industrial Flutter Kiosk View',
        'On-device Face Vector Extractor',
        'Local SQLite Security Cache',
        'WS Telemetry Sync Pipeline'
      ],
      realtimeFeatures: 'Continuously streams device health analytics and biometric authentications to cloud management dashboard logs.',
      aiFeatures: 'Leverages optimized FaceNet embeddings to compute mathematical face metrics on the edge in less than 90ms with strict precision bounds.',
      scalabilityDetails: 'Designed completely resilient edge loops allowing continuous biometrics validation even during complete connectivity offline states.',
      performanceOptimizations: 'Slashed OpenCV frame resolutions down to crucial regions of interest, mitigating CPU thermal throttling on passive cooled kiosks.'
    },
    fa: {
      title: 'سامانه حضور و غیاب FaceAuth',
      category: 'موتور تشخیص چهره بیومتریک',
      desc: 'ترمینال‌های سخت‌افزاری حضور و غیاب پرسنل مبتنی بر شناسایی فوری بیومتریک با همگام‌سازی خودکار سوابق اداری در بستر شبکه محلی.',
      role: 'توسعه تخصصی بک‌اند (BACKEND)',
      scopeLabel: 'معماری بک‌اند و پایگاه‌داده',
      highlights: [
        'استخراج و مقایسه امن اطلاعات چهره بر روی دستگاه',
        'سیستم ذخیره‌سازی ابری و محنی بیومتریک رمزنگاری‌شده',
        'عملکرد بدون اشکال و پایدار در زمان قطعی کامل شبکه',
        'سازگار با کیوسک‌های ترمینالی صنعتی متنوع'
      ],
      architectureHighlights: [
        'واسط کاربری کیوسک بهینه‌شده با فلاتر',
        'استخراج‌کننده ماتریس چهره روی دستگاه',
        'پایگاه‌داده محلی رمز شده SQLite',
        'هماهنگ‌کننده همزمان صف‌های ابلاغ'
      ],
      realtimeFeatures: 'انتقال برخط اطلاعات ورود رانندگان و وضعیت دمای گره‌های کیوسکی به داشبوردهای مدیریتی مرکزی سازمان.',
      aiFeatures: 'بهره‌برداری از مدل فشرده‌شده FaceNet برای خلق و مقایسه شناسه ریاضی ویژگی‌های صورت در کمتر از ۹۰ میلی‌ثانیه بدون تکیه به سرور ابری.',
      scalabilityDetails: 'طراحی لایه منعطف محلی که در سناریوهای ترافیک باری، سیستم را عاری از باگ متوقف نگهداشته و تاییدها را صادر می‌کند.',
      performanceOptimizations: 'کوچک‌سازی ماتریس فریم‌ها با تقطیع رزولوشن به ناحیه تشخیص چهره که منجرب به برطرف‌سازی داغ شدن شدید دستگاه کیوسک می‌شود.'
    }
  }
];
