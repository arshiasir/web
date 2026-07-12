import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

/* brand slugs for cdn.simpleicons.org (falls back to a lettered chip if missing/offline) */
const SLUG: Record<string, string> = {
  Flutter: 'flutter',
  FastAPI: 'fastapi',
  PostgreSQL: 'postgresql',
  Python: 'python',
  Dart: 'dart',
  Django: 'django',
  Docker: 'docker',
  Redis: 'redis',
  SQLite: 'sqlite',
  Linux: 'linux',
  AWS: 'amazonaws',
  OpenCV: 'opencv',
};

const FALLBACK_COLOR: Record<string, string> = {
  'AI APIs': '#a855f7',
  Riverpod: '#19b9c9',
  WebSocket: '#38bdf8',
};

function initials(name: string) {
  const parts = name.replace(/[^a-zA-Z0-9 ]/g, ' ').trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function TechIcon({ name, accent }: { name: string; accent: string }) {
  const slug = SLUG[name];
  const url = slug ? `https://cdn.simpleicons.org/${slug}` : null;
  const [err, setErr] = useState(false);
  const fb = FALLBACK_COLOR[name] || accent;
  if (url && !err) {
    return (
      <img
        src={url}
        alt={name}
        loading="lazy"
        onError={() => setErr(true)}
        className="h-[56%] w-[56%] object-contain"
        style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))' }}
      />
    );
  }
  return (
    <span className="select-none font-mono text-[12px] font-bold tracking-tight" style={{ color: fb }}>
      {initials(name)}
    </span>
  );
}

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  tech: string[];
  name: string;
  accent: string;
  accent2: string;
  ownedTechs: Set<string>;
  isFa: boolean;
  activeLayer: string | null;
  techToLayer: Record<string, string>;
  onHoverTech: (tech: string | null) => void;
};

export default function ArchitectureMap({
  tech,
  name,
  accent,
  accent2,
  ownedTechs,
  isFa,
  activeLayer,
  techToLayer,
  onHoverTech,
}: Props) {
  const reduce = useReducedMotion();
  const n = tech.length;
  const R = 37; // keeps orbit nodes and labels inside narrow screens
  const positions = useMemo(
    () =>
      tech.map((_, i) => {
        const angle = -90 + (360 / n) * i;
        const rad = (angle * Math.PI) / 180;
        return { x: 50 + R * Math.cos(rad), y: 50 + R * Math.sin(rad), angle };
      }),
    [tech, n],
  );

  const particles = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => {
        const a = (i / 9) * Math.PI * 2;
        const rad = 16 + ((i * 13) % 18);
        return {
          id: i,
          x: 50 + rad * Math.cos(a),
          y: 50 + rad * Math.sin(a),
          size: 1.5 + ((i * 3) % 2),
          delay: (i % 5) * 0.8,
          dur: 4 + (i % 4),
        };
      }),
    [],
  );

  return (
    <div
      className="architecture-orbit relative mx-auto aspect-square w-full max-w-[460px]"
      style={{ ['--cs-accent' as string]: accent }}
    >
      {/* ambient core glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${accent}1f 0%, transparent 66%)` }}
      />

      {/* orbit rings (no hard connectors) */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <circle cx="50" cy="50" r={R} fill="none" stroke={accent} strokeOpacity="0.12" strokeWidth="0.35" />
        <circle cx="50" cy="50" r="28" fill="none" stroke={accent2} strokeOpacity="0.1" strokeWidth="0.3" />
        <circle cx="50" cy="50" r={R} fill="none" stroke={accent} strokeOpacity="0.4" strokeWidth="0.5" strokeDasharray="1.5 7" style={{ transformOrigin: '50px 50px' }}>
          <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="80s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* particles around core */}
      {!reduce &&
        particles.map((p) => (
          <motion.span
            key={p.id}
            className="pointer-events-none absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: accent,
              boxShadow: `0 0 ${p.size * 3}px ${accent}`,
            }}
            animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1, 0.5] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}

      {/* core node */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="architecture-core relative grid place-items-center rounded-full border text-center"
          style={{
            width: 150,
            height: 150,
            borderColor: `${accent}aa`,
            background: `radial-gradient(circle at 50% 35%, ${accent}22, #05070A 72%)`,
          }}
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={reduce ? undefined : { boxShadow: [`0 0 40px ${accent}33, inset 0 0 24px ${accent}14`, `0 0 72px ${accent}55, inset 0 0 34px ${accent}22`, `0 0 40px ${accent}33, inset 0 0 24px ${accent}14`] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="px-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.25em]" style={{ color: accent }}>
              {isFa ? 'هسته سیستم' : 'System Core'}
            </div>
            <div className="mt-1 text-base font-bold leading-tight text-white">{name}</div>
          </div>
        </motion.div>
      </div>

      {/* orbiting technology nodes */}
      {tech.map((t, i) => {
        const layer = techToLayer[t];
        const active = activeLayer === layer;
        const dimmed = activeLayer != null && !active;
        const owned = ownedTechs.has(t);
        const p = positions[i];
        const glow = active || owned ? accent : accent2;
        return (
          <motion.div
            key={t}
            className="absolute"
            style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%,-50%)' }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.07, ease: EASE }}
          >
            <motion.div
              className="flex flex-col items-center"
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 3.2 + (i % 4) * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            >
              <motion.div
                onMouseEnter={() => onHoverTech(t)}
                onMouseLeave={() => onHoverTech(null)}
                animate={{ scale: active ? 1.14 : 1 }}
                whileHover={{ scale: 1.16 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="architecture-tech-node relative grid cursor-pointer place-items-center rounded-full border bg-[#0a0c11]"
                style={{
                  width: 62,
                  height: 62,
                  borderColor: active ? accent : owned ? `${accent}88` : 'rgba(255,255,255,0.16)',
                  boxShadow: active || owned ? `0 0 24px ${glow}55, inset 0 0 12px ${glow}1f` : '0 0 0 rgba(0,0,0,0)',
                  opacity: dimmed ? 0.35 : 1,
                }}
              >
                {active && !reduce && (
                  <motion.span
                    className="pointer-events-none absolute inset-0 rounded-full"
                    style={{ border: `1px solid ${accent}` }}
                    animate={{ scale: [1, 1.32, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
                <TechIcon name={t} accent={accent} />
              </motion.div>
              <span
                className="architecture-tech-label mt-2 whitespace-nowrap text-[11px] font-medium tracking-wide"
                style={{ color: active || owned ? accent : 'rgba(255,255,255,0.6)', opacity: dimmed ? 0.4 : 1 }}
              >
                {t}
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
