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
        className="h-[58%] w-[58%] object-contain"
        style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.55))' }}
      />
    );
  }
  return (
    <span
      className="select-none font-mono text-[13px] font-bold tracking-tight"
      style={{ color: fb }}
    >
      {initials(name)}
    </span>
  );
}

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  tech: string[];
  name: string;
  accent: string;
  ownedTechs: Set<string>;
  isFa: boolean;
};

export default function ArchitectureMap({ tech, name, accent, ownedTechs, isFa }: Props) {
  const reduce = useReducedMotion();
  const n = tech.length;
  const radius = 43; // % from center to node
  const positions = useMemo(
    () =>
      tech.map((_, i) => {
        const angle = -90 + (360 / n) * i;
        const rad = (angle * Math.PI) / 180;
        return {
          x: 50 + radius * Math.cos(rad),
          y: 50 + radius * Math.sin(rad),
          angle,
        };
      }),
    [tech, n],
  );

  const embers = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: (i * 53.3) % 100,
        top: (i * 27.7) % 100,
        size: 2 + ((i * 7) % 4),
        delay: (i % 9) * 0.7,
        dur: 4 + (i % 5),
      })),
    [],
  );

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[580px]"
      style={{ ['--cs-accent' as string]: accent }}
    >
      {/* volumetric core light */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${accent}33 0%, transparent 68%)` }}
      />

      {/* rotating dashed rings */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ border: `1px dashed ${accent}55` }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[66%] w-[66%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ border: `1px solid rgba(255,255,255,0.08)` }}
        animate={reduce ? undefined : { rotate: -360 }}
        transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
      />

      {/* radar scan sweep */}
      {!reduce && (
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, ${accent}22 18deg, transparent 40deg, transparent 360deg)`,
            maskImage: 'radial-gradient(circle, transparent 30%, #000 31%, #000 70%, transparent 72%)',
            WebkitMaskImage: 'radial-gradient(circle, transparent 30%, #000 31%, #000 70%, transparent 72%)',
          }}
        >
          <motion.div
            className="h-full w-full rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      )}

      {/* drifting embers */}
      {!reduce &&
        embers.map((e) => (
          <motion.span
            key={e.id}
            className="pointer-events-none absolute rounded-full"
            style={{
              left: `${e.left}%`,
              top: `${e.top}%`,
              width: e.size,
              height: e.size,
              background: accent,
              boxShadow: `0 0 ${e.size * 3}px ${accent}`,
            }}
            animate={{ opacity: [0, 0.8, 0], y: [0, -18, -34], scale: [0.6, 1, 0.4] }}
            transition={{ duration: e.dur, repeat: Infinity, delay: e.delay, ease: 'easeInOut' }}
          />
        ))}

      {/* spokes */}
      {positions.map((p, i) => {
        const owned = ownedTechs.has(tech[i]);
        return (
          <motion.div
            key={`spoke-${i}`}
            className="pointer-events-none absolute left-1/2 top-1/2 h-px"
            style={{
              width: `${radius}%`,
              transformOrigin: '0 50%',
              transform: `translateY(-50%) rotate(${p.angle}deg)`,
              background: owned
                ? `linear-gradient(90deg, ${accent}, ${accent}10)`
                : 'linear-gradient(90deg, rgba(255,255,255,0.35), rgba(255,255,255,0.04))',
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.08, ease: EASE }}
          />
        );
      })}

      {/* orbiting tech nodes */}
      {tech.map((t, i) => {
        const owned = ownedTechs.has(t);
        const p = positions[i];
        const ring = owned ? accent : 'rgba(255,255,255,0.22)';
        return (
          <motion.div
            key={t}
            className="absolute"
            style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%,-50%)' }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.25 + i * 0.08, ease: EASE }}
          >
            <motion.div
              className="flex flex-col items-center"
              animate={reduce ? undefined : { y: [0, -7, 0] }}
              transition={{ duration: 3.4 + (i % 4) * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            >
              <motion.div
                whileHover={{ scale: 1.18 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                className="grid place-items-center rounded-full border bg-[#0b0b0e]"
                style={{
                  width: 66,
                  height: 66,
                  borderColor: ring,
                  boxShadow: owned
                    ? `0 0 22px ${accent}66, inset 0 0 14px ${accent}22`
                    : '0 0 14px rgba(255,255,255,0.08)',
                }}
              >
                <TechIcon name={t} accent={accent} />
              </motion.div>
              <span
                className="mt-2 whitespace-nowrap text-[11px] font-medium tracking-wide"
                style={{ color: owned ? accent : 'rgba(255,255,255,0.62)' }}
              >
                {t}
              </span>
            </motion.div>
          </motion.div>
        );
      })}

      {/* core node */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="grid place-items-center rounded-full border text-center"
          style={{
            width: 168,
            height: 168,
            borderColor: `${accent}aa`,
            background: `radial-gradient(circle at 50% 35%, ${accent}22, #070708 70%)`,
            boxShadow: `0 0 50px ${accent}55, inset 0 0 30px ${accent}22`,
          }}
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {!reduce && (
            <motion.span
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{ border: `1px solid ${accent}66` }}
              animate={{ scale: [1, 1.18, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          <div className="px-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.25em]" style={{ color: accent }}>
              {isFa ? 'هسته سیستم' : 'System Core'}
            </div>
            <div className="mt-1 text-lg font-bold leading-tight text-white">{name}</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
