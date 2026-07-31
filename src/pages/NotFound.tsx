import { ArrowLeft, ArrowRight, Home, SearchX } from 'lucide-react';
import { motion } from 'motion/react';

type NotFoundProps = {
  language: 'en' | 'fa';
  onBack: () => void;
};

export default function NotFound({ language, onBack }: NotFoundProps) {
  const isFa = language === 'fa';
  const BackArrow = isFa ? ArrowRight : ArrowLeft;

  return (
    <main dir={isFa ? 'rtl' : 'ltr'} className="relative min-h-screen overflow-hidden bg-[#070707] px-5 text-[#D7E2EA]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9EFF00]/10 blur-[140px]" />

      <section className="relative z-10 mx-auto flex min-h-screen max-w-5xl items-center justify-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] shadow-2xl shadow-black/50 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-white/35 sm:px-8">
            <span>HTTP / 404</span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#9EFF00] shadow-[0_0_12px_#9EFF00]" />
              {isFa ? 'مسیر پیدا نشد' : 'Route not found'}
            </span>
          </div>

          <div className="grid gap-10 px-6 py-12 sm:px-10 md:grid-cols-[1fr_auto] md:items-center md:px-14 md:py-16">
            <div className="max-w-xl">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#9EFF00]/25 bg-[#9EFF00]/10 text-[#9EFF00]">
                <SearchX size={22} />
              </div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#9EFF00]">
                {isFa ? 'خطای مسیریابی' : 'Navigation error'}
              </p>
              <h1 className="text-3xl font-black leading-tight text-white sm:text-5xl">
                {isFa ? 'این صفحه در دسترس نیست.' : 'This page is off the map.'}
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-7 text-white/50 sm:text-base">
                {isFa
                  ? 'ممکن است آدرس اشتباه باشد یا صفحه جابه‌جا شده باشد. از دکمهٔ زیر به صفحهٔ اصلی برگردید.'
                  : 'The address may be incorrect, or the page may have moved. Head back home and continue exploring.'}
              </p>

              <button
                type="button"
                onClick={onBack}
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#9EFF00] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-[#070707] transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EFF00] focus-visible:ring-offset-4 focus-visible:ring-offset-[#070707]"
              >
                <Home size={16} />
                {isFa ? 'بازگشت به صفحهٔ اصلی' : 'Back to home'}
                <BackArrow size={16} className="transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
              </button>
            </div>

            <div aria-hidden="true" className="relative mx-auto select-none md:mx-0">
              <div className="absolute inset-0 scale-75 rounded-full bg-[#9EFF00]/20 blur-3xl" />
              <div className="relative font-mono text-[7rem] font-black leading-none tracking-[-0.12em] text-white/5 sm:text-[10rem] md:text-[12rem]">404</div>
              <div className="absolute inset-0 flex items-center justify-center font-mono text-5xl font-black tracking-[-0.08em] text-white sm:text-7xl">
                404<span className="text-[#9EFF00]">.</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
