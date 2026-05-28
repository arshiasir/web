/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TranslationDictionary } from '../types/schema';

export const translations: { en: TranslationDictionary; fa: TranslationDictionary } = {
  en: {
    navbar: {
      about: 'About',
      services: 'Services & Skills',
      projects: 'Showcase',
      contact: 'Ping System',
      architecture: 'System Core'
    },
    hero: {
      sub: 'SYSTEM ARCHITECT & DEVELOPER',
      role: 'Arshia Khani',
      description: 'I architect elegant client-facing mobile applications using Flutter & Dart, coupled with robust, ultra high-throughput backend services using FastAPI & Django. Specialized in real-time systems, machine learning pipelines, and highly scaled databases.',
      contactBtn: 'Connect with System',
      projectsBtn: 'Browse Blueprints',
      activeMode: 'Active Mode Frame',
      specify: 'Developer Perspective'
    },
    about: {
      mindset: 'Development Mindset',
      title: 'Crafting Highly Scaled, Fault-Tolerant Ecosystems',
      desc1: 'As a system-oriented designer and engineer, I approach software as complete cybernetic networks. Beautiful mobile front-ends look exceptional, but they thrive only when synced to low-latency backends, fault-tolerant message queues, and bulletproof database models.',
      desc2: 'With over four years of core Flutter development paired with heavy Unix-grade backend design, I construct software that handles load, secures sensitive biometric authentications, streams high-fidelity buffers, and remains responsive under concurrent user pressures.',
      stats: {
        projects: '15+',
        projectsSub: 'Industrial Apps Built',
        experience: '4+ Years',
        experienceSub: 'System Core Experience',
        clients: '20+',
        clientsSub: 'Ecosystem Deliveries',
        satisfaction: '99.9%',
        satisfactionSub: 'Pipeline Sleep-Rate'
      }
    },
    services: {
      title: 'System Competencies',
      heading: 'Engineered Services',
      sub: 'How I split resources to deliver robust modern applications.',
      clientHeader: 'CLIENT SCREEN FLOWS (MOBILE)',
      serverHeader: 'INFRASTRUCTURE STACKS (BACKEND)',
      focus: 'Architectural Focus',
      items: [
        {
          title: 'Reactive Flutter Core',
          desc: 'Building clean-room Dart applications utilizing predictable state machines like Riverpod or BLoC, absolute native layout performance, and bespoke custom rendering modules.',
          focus: 'Fluid UI & Touch Gestures'
        },
        {
          title: 'Asymmetric Backend Services',
          desc: 'Creating asynchronous, high-availability APIs with FastAPI, Django Rest Framework, and Express, optimizing load levels and protecting core data endpoints.',
          focus: 'Distributed Thread Routing'
        },
        {
          title: 'Real-Time Pipelines',
          desc: 'Integrating persistent low-latency full-duplex WebSocket channels and Redis Pub-Sub channels to drive microsecond-accurate data broadcasts and active stream buffers.',
          focus: 'Low-overhead Socket Sync'
        },
        {
          title: 'Intelligent AI Shards',
          desc: 'Embedding computer vision detectors, regression engines, and recommendation indices both on-device and on remote high-power inference worker systems.',
          focus: 'Sub-200ms Inference Bounds'
        }
      ]
    },
    architecture: {
      title: 'Interactive Infrastructure Blueprint',
      heading: 'System Topology',
      sub: 'A schematic view of how my typical fullstack configurations coordinate. Click nodes to trace real-time packet telemetry.',
      labels: {
        client: 'Flutter Terminal App (Client-side UI / On-device Cache)',
        gateway: 'API Reverse Proxy Gateway (Load Balancer & Port Gate)',
        microservices: 'FastAPI / Django Microservices (Compute Workers)',
        websocket: 'WebSocket Real-time Channel Broker',
        database: 'PostgreSQL Database Node (Sharded Layout / PostGIS)',
        cache: 'Redis Cache Network (Pub-Sub & Memory Buffers)'
      }
    },
    projects: {
      title: 'Cinematic System Portfolios',
      heading: 'Featured Engineering Work',
      sub: 'Visually isolated showcases detailing architecture pipelines, active telemetry, and code specifications.',
      priority: 'PRIORITY SPECIFICATIONS',
      allProjects: 'All Architectural Systems',
      enter: 'System Console Details',
      close: 'CLOSE CONSOLE',
      specs: 'ENGINEERING SPECIFICATIONS',
      metricsHeader: 'CORE PERFORMANCE METRIC',
      metadataHeader: 'NODE METADATA STATUS',
      pillarsHeader: 'ARCHITECTURAL DEEP-DIVE PILLARS',
      telemetryHeader: 'LIVE TELEMETRY REALTIME WORKER STREAM',
      inquireBtn: 'Inquire About Project Codebase',
      roles: {
        FULLSTACK: 'FULLSTACK DEVELOPMENT',
        MOBILE: 'MOBILE DEVELOPMENT',
        BACKEND: 'BACKEND DEVELOPMENT'
      }
    },
    contact: {
      heading: 'Ping System / Establish Connection',
      name: 'System Comm Link Name',
      email: 'Comm Packet Email Sender',
      msg: 'Telemetry / Transmission Message',
      submit: 'Broadcast Secure Packet',
      success: 'TRANSMISSION DELIVERED: Heartbeat check successfully logged.',
      footerText: 'Ecosystem designed with high-contrast displays. Codebase verified strict lint & compile checks.'
    }
  },
  fa: {
    navbar: {
      about: 'درباره من',
      services: 'خدمات و تخصص‌ها',
      projects: 'نمونه کارهای شاخص',
      contact: 'ارتباط مستقیم',
      architecture: 'هسته معماری'
    },
    hero: {
      sub: 'معمار سامانه‌های دیجیتال و توسعه‌دهنده سیستم',
      role: 'عرشیا خانی',
      description: 'من رابط‌های کاربری چشم‌نواز و زنده را در فلاتر (Flutter) خلق می‌کنم و آن‌ها را با سرویس‌های بک‌اند سریع و مقیاس‌پذیر در FastAPI و Django تلفیق می‌سازم. تخصص من در ساخت سامانه‌های بلادرنگ، پایگاه‌های داده توزیع‌شده و بهینه‌سازی کانال‌های ارتباطی داده است.',
      contactBtn: 'برقراری ارتباط مستقیم با سیستم',
      projectsBtn: 'مشاهده نقشه‌های معماری پروژه‌ها',
      activeMode: 'مد شبیه‌ساز فعال سیستم',
      specify: 'رویکرد توسعه مهندسی'
    },
    about: {
      mindset: 'دیدگاه مهندسی نرم‌افزار',
      title: 'خلق اکوسیستم‌های مقاوم در برابر بار سنگین اطلاعات',
      desc1: 'به‌عنوان یک طراح و معمار سیستم، نرم‌افزارها را مثل بسترهای سایبرنتیک به هم پیوسته می‌بینم. هر چقدر بخش گرافیکی سیستم زیبا باشد، بدون کدهای بک‌اند مقاوم در برابر خطا، صف‌های پیام پایدار و معماری بهینه‌شده پایگاه‌داده ارزش روتین نخواهد داشت.',
      desc2: 'با تکیه بر بیش از چهار دوره توسعه اختصاصی فلاتر به همراه طراحی کدهای بک‌اند به سبک یونیکس، توانسته‌ام سامانه‌هایی پایدار تولید کنم که بسترهای هویت‌سنجی بیومتریک، استریم‌های صوتی لوکس و ثبت تراکنش‌های میلیونی را بدون اخلال پذیرا باشند.',
      stats: {
        projects: '۱۵+',
        projectsSub: 'محصولات صنعتی مستقر شده',
        experience: '۴+ سال',
        experienceSub: 'تمرکز مستمر بر طراحی سیستم',
        clients: '۲۰+',
        clientsSub: 'تحویل سیستم‌های بزرگ',
        satisfaction: '۹۹.۹٪',
        satisfactionSub: 'پایداری بدون خطای کدهای زنده'
      }
    },
    services: {
      title: 'شایستگی‌های تکنیکال',
      heading: 'قابلیت‌های مهندسی',
      sub: 'تفکیک منابع و توانمندی‌ها برای ارايه بهترین راهکارهای تحت وب و موبایل.',
      clientHeader: 'توسعه کلاینت و واسط کاربری (MOBILE)',
      serverHeader: 'فناوری‌های توزیع‌شده زیرساخت (BACKEND)',
      focus: 'تمرکز فنی معماری',
      items: [
        {
          title: 'سامانه‌های روان بومی فلاتر',
          desc: 'توسعه اپلیکیشن‌های بومی و کارآمد با دارت با موتورهای مدیریت وضعیت پیش‌بینی‌پذیر مانند Riverpod و BLoC، کدهای تمیز و رندرهای گرافیکی سفارشی.',
          focus: 'انیمیشن‌ها و تعاملات ارگونومیک لمسی'
        },
        {
          title: 'میکروسرویس‌های بک‌اند سریع',
          desc: 'پیاده‌سازی نقاط دسترسی ناهمگام با زمان پاسخ‌دهی در مقیاس میکروثانیه با FastAPI، فریم‌ورک جنگو رست و اکسپرس جهت حفاظت جامع از داده‌ها.',
          focus: 'کنترل ناهمگام نخ‌های پردازشی'
        },
        {
          title: 'موتورهای جابجایی بلادرنگ داده',
          desc: 'ادغام پشته‌های وب‌سوکت برای توزیع فرکانسی سریع اطلاعات و استفاده هوشمندانه از پیام‌رسان‌های ردیس برای سینک زنده موسیقی و موقعیت مکانی.',
          focus: 'تسهیل جریان داده سوکت با پهنای باند کم'
        },
        {
          title: 'اجزای هوشمند یادگیری ماشین',
          desc: 'استقرار مدل‌های لبه وب برای تشخیص چهره، دسته‌بندی تصویر و پیش‌بینی انبارداری به دو صورت پردازش محلی روی دستگاه و هم در گره‌های رایانش ابری.',
          focus: 'زمان تایید زیر ۲۰۰ میلی‌ثانیه‌ای مدل'
        }
      ]
    },
    architecture: {
      title: 'نقشه تعاملی سیستم‌های توزیع شده',
      heading: 'همبندی ساختاری (Topology)',
      sub: 'شماتیکی از نحوه تعامل لایه‌های مختلف برنامه‌های من. برای ردیابی جریان تبادل داده، روی گره‌ها کلیک کنید.',
      labels: {
        client: 'اپلیکیشن فلاتر (رابط کاربری و حافظه موقت محلی پرسرعت)',
        gateway: 'دروازه ورودی معکوس Nginx (مسیریاب درخواست‌ها و بالانسر بار)',
        microservices: 'میکروسرویس‌های پردازشی با FastAPI و Django',
        websocket: 'سیستم توزیع بلادرنگ و تالار کانال‌های وب‌سوکت',
        database: 'پایگاه‌داده پستگرس با ساختار شارد شده و PostGIS جغرافیایی',
        cache: 'شبکه حافظه موقت ردیس (Redis Pub-Sub و توزیع رویدادها)'
      }
    },
    projects: {
      title: 'مجموعه‌ پروژه‌های مهندسی من',
      heading: 'مرور شاهکارهای توسعه',
      sub: 'جلوه‌های گرافیکی اختصاصی برای کشف معماری دقیق پروژه‌ها، آمارها و جزییات کدهای زیرساختی.',
      priority: 'اولویت‌های نمایش کئوری داده',
      allProjects: 'کلیه سیستم‌های مهندسی',
      enter: 'ورود به کنسول اطلاعات سیستم',
      close: 'بستن کنسول اطلاعات',
      specs: 'مشخصات فنی مهندسی',
      metricsHeader: 'شاخص‌های کلیدی کارکرد سیستم',
      metadataHeader: 'اطلاعات فراداده‌ای گره',
      pillarsHeader: 'ستون‌های فنی و معماری عمیق کد',
      telemetryHeader: 'فرکانس کاری جریان بلادرنگ پکت‌های سیستم',
      inquireBtn: 'استعلام دسترسی به کدهای زیرمجموعه سیستم',
      roles: {
        FULLSTACK: 'توسعه فول‌استک (FULLSTACK)',
        MOBILE: 'توسعه موبایل (MOBILE)',
        BACKEND: 'توسعه بک‌اند (BACKEND)'
      }
    },
    contact: {
      heading: 'برقراری ارتباط با سیستم / ارسال سیگنال فرکانسی',
      name: 'نام فرستنده سیگنال ارتباطی',
      email: 'آدرس ایمیل بسته‌ داده‌ای',
      msg: 'پیام فرستنده / لاگ مخابره',
      submit: 'مخابره بسته داده به سرور',
      success: 'انتقال موفقیت‌آمیز: پالس فرکانسی شما با موفقیت در سیستم ثبت گردید.',
      footerText: 'طراحی شده با کنتراست بالای بصری. تایید صحت عملکرد به واسطه لایپ‌های گوناگون کامپایلر.'
    }
  }
};
