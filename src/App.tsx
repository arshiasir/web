/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Smartphone, 
  Server, 
  Database, 
  Cpu, 
  Zap, 
  ArrowRight, 
  CheckCircle, 
  MessageSquare, 
  Code2, 
  Terminal, 
  ExternalLink, 
  Mail, 
  Github, 
  Linkedin, 
  Send, 
  Activity, 
  Layers, 
  Radio, 
  Sparkles, 
  Share2,
  ChevronRight,
  Workflow,
  MousePointerClick,
  Globe,
  AlertTriangle,
  RefreshCw,
  Shield,
  Play,
  GitBranch,
  Sliders,
  Eye,
  Copy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { translations } from './data/translations';
import { projectsData } from './data/projectsData';
import { walkthroughData } from './data/walkthroughData';
import { imageLinks } from './data/imageLinks';

const arshiaPortrait = imageLinks.arshiaPortrait;
const aboutGeometric = imageLinks.aboutGeometric;
const calkiloMockup = imageLinks.calkiloMockup;
const couchiniMockup = imageLinks.couchiniMockup;
const tipaxMockup = imageLinks.tipaxMockup;
const hyperstarMockup = imageLinks.hyperstarMockup;
const faceauthMockup = imageLinks.faceauthMockup;

export default function App() {
  // Global Bilingual State ('en' for English LTR, 'fa' for Persian / Farsi RTL)
  const [lang, setLang] = useState<'en' | 'fa'>('en');
  const t = translations[lang];

  // Mobile vs Backend active mode focus selector state
  const [mode, setMode] = useState<'MOBILE' | 'BACKEND'>('MOBILE');
  
  // Filtering based on project type: ALL | FULLSTACK | MOBILE | BACKEND
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'FULLSTACK' | 'MOBILE' | 'BACKEND'>('ALL');

  const [activeTitleIdx, setActiveTitleIdx] = useState(0);
  const titles = lang === 'en' 
    ? ['Flutter Engineer', 'Backend Developer', 'System Architect', 'AI Integrator']
    : ['مهندس ارشد فلاتر', 'توسعه‌دهنده بک‌اند', 'معمار سامانه‌ها', 'کارشناس هوش مصنوعی'];

  // Project overlay popup state
  const [selectedProjId, setSelectedProjId] = useState<string | null>(null);

  // Floating Developer HUD console states
  const [devMode, setDevMode] = useState<boolean>(false);
  const [devActiveTab, setDevActiveTab] = useState<'CONSOLE' | 'GIT' | 'METRICS' | 'CONFIG' | 'SQL' | 'SANDBOX' | 'TOPOLOGY'>('CONSOLE');
  const [devPanelOpen, setDevPanelOpen] = useState<boolean>(false);
  const [nodeActiveTab, setNodeActiveTab] = useState<'OVERVIEW' | 'SOURCE'>('OVERVIEW');
  const [syntheticLatency, setSyntheticLatency] = useState<number>(50); // ms override
  const [syntheticLoad, setSyntheticLoad] = useState<number>(1420); // rps override
  const [syntheticError, setSyntheticError] = useState<number>(2); // % overriding 
  const [hoveredComponent, setHoveredComponent] = useState<{ name: string; selectors: string; size: string } | null>(null);
  const [themeOverride, setThemeOverride] = useState<string | null>(null);
  const [quantumGrid, setQuantumGrid] = useState<boolean>(true);
  const [laserIntensity, setLaserIntensity] = useState<number>(25);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [cpuOverride, setCpuOverride] = useState<number | null>(null);
  const [hologramSpin, setHologramSpin] = useState<boolean>(false);

  // ==========================================
  // ENHANCED DEV MODE HUD SANDBOX & CHAOS STATES
  // ==========================================
  const [hudExpandWide, setHudExpandWide] = useState<boolean>(false);
  const [sandboxCodeTemplateActive, setSandboxCodeTemplateActive] = useState<'DART' | 'EXPRESS' | 'DOCKER'>('DART');
  const [sandboxCodeText, setSandboxCodeText] = useState<string>(
    `// Dart High Performance microservice routing\nvoid main() async {\n  final channel = SystemChannel("com.tipax.router");\n  channel.stream((packet) {\n    final latency = packet.timestamp.elapsed();\n    Telemetry.track("tipax_dispatch_latency", latency);\n  });\n}`
  );
  const [sandboxCompilerRunning, setSandboxCompilerRunning] = useState<boolean>(false);
  const [sandboxCompilerLogs, setSandboxCompilerLogs] = useState<string[]>([]);
  
  const [sqlQuery, setSqlQuery] = useState<string>('SELECT * FROM driver_shards WHERE active = true;');
  const [sqlResult, setSqlResult] = useState<any[] | null>([
    { driver_id: 'dr_920', name: 'Alireza', region: 'Tehran-North', rating: 4.9, active_routes: 2 },
    { driver_id: 'dr_104', name: 'Siavash', region: 'Tehran-East', rating: 4.8, active_routes: 1 },
    { driver_id: 'dr_841', name: 'Sara', region: 'Tehran-West', rating: 4.7, active_routes: 3 },
  ]);
  const [sqlError, setSqlError] = useState<string | null>(null);
  const [chaosSqlInjectionScore, setChaosSqlInjectionScore] = useState<number>(14);
  const [activeRoutingServer, setActiveRoutingServer] = useState<'TEHRAN' | 'FRANKFURT' | 'SINGAPORE'>('TEHRAN');
  const [gatewayNodeState, setGatewayNodeState] = useState<'HEALTHY' | 'DEGRADED' | 'DOWN'>('HEALTHY');
  const [gitCustomBranch, setGitCustomBranch] = useState<string>('feat/quantum-buffer');
  const [gitCommitMessage, setGitCommitMessage] = useState<string>('perf: optimize lockless redis ring buffer pipeline');
  const [simSoundTick, setSimSoundTick] = useState<boolean>(true);

  // ==========================================
  // DEEP SYSTEM TOPOLOGY SIMULATOR STATES
  // ==========================================
  const [activeBlueprintId, setActiveBlueprintId] = useState<string>('calkilo');
  const [simStep, setSimStep] = useState<number | null>(null); // null means passive auto-cycler, 1..5 is step-by-step
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0); // active step index 0..4
  const [copiedPayload, setCopiedPayload] = useState<boolean>(false);

  const handleCopyPayload = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedPayload(true);
      setTimeout(() => setCopiedPayload(false), 1500);
    } catch (err) {
      console.error("Failed to copy payload text:", err);
    }
  };

  const [chaosActive, setChaosActive] = useState<boolean>(false);
  const [chaosNode, setChaosNode] = useState<string | null>(null);
  const [surgeActive, setSurgeActive] = useState<boolean>(false);
  const [cachePurged, setCachePurged] = useState<boolean>(false);
  const [deploying, setDeploying] = useState<boolean>(false);
  const [deployProgress, setDeployProgress] = useState<number>(0);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('client');
  const [topologyStats, setTopologyStats] = useState({
    throughput: 1240,
    latency: 18,
    errorRate: 0.02,
    cpuPercent: 24,
    cacheHitRate: 99.8,
  });

  // Dynamic Telemetry history (sparkline state) that shifts values every 800ms
  const [telemetryHistory, setTelemetryHistory] = useState<number[]>(Array(18).fill(30));

  // Dynamic terminals log feed state
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  // Dynamic document language sync for bilingually optimized crawler/SEO indexing
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  }, [lang]);

  // Global cursor location tracker for Quantum Laser Overlay (Dev Mode)
  useEffect(() => {
    if (!devMode) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [devMode]);

  // Telemetry loop hook for the topology control room
  useEffect(() => {
    const statInterval = setInterval(() => {
      setTopologyStats((prev) => {
        let baseRps = activeBlueprintId === 'tipax' ? 2400 : activeBlueprintId === 'hyperstar' ? 3800 : 1240;
        let baseLat = activeBlueprintId === 'calkilo' ? 180 : activeBlueprintId === 'couchini' ? 45 : 12;
        let baseCpu = 24;
        let baseErr = 0.02;
        let baseCacheHit = 99.8;

        // Apply Surge Modifier
        if (surgeActive) {
          baseRps *= 12.5;
          baseLat *= 3.4;
          baseCpu += 62;
          baseErr += 1.8;
        }

        // Apply Chaos Modifier (if work nodes fail)
        if (chaosActive) {
          baseRps *= 0.45;
          baseLat *= 4.5;
          baseErr += 24.5;
          baseCpu += 15;
        }

        // Apply Cache Purge Modifier
        if (cachePurged) {
          baseCacheHit = 12.4;
          baseLat *= 6.2;
          baseCpu += 48; // DB high CPU
        }

        // Add some analog noise
        const noiseText = Math.sin(Date.now() / 3000) * 12;
        // Merge synthetic HUD console sliders dynamically
        const finalRps = devMode ? Math.round(syntheticLoad + Math.random() * 20) : Math.round(baseRps + Math.random() * 80 + noiseText);
        const finalLat = devMode ? Math.round(syntheticLatency + Math.random() * 3) : Math.round(baseLat + Math.random() * 8 + noiseText / 3);
        const finalErr = devMode ? syntheticError : Math.max(0, parseFloat((baseErr + Math.random() * 0.15).toFixed(2)));
        const finalCpu = devMode 
          ? (cpuOverride !== null ? cpuOverride : Math.min(99, Math.max(10, Math.round(18 + (syntheticLoad / 120) + Math.random() * 4))))
          : Math.min(100, Math.max(10, Math.round(baseCpu + Math.random() * 5 + noiseText / 2)));
        const finalCacheHit = Math.max(5, parseFloat((baseCacheHit + (Math.random() * 0.4 - 0.2)).toFixed(1)));

        // Update telemetry sparkline
        setTelemetryHistory((history) => {
          const nextVal = selectedNodeId === 'database' && cachePurged 
            ? Math.min(100, finalCpu + 15)
            : selectedNodeId === 'worker' && surgeActive
            ? Math.min(100, finalCpu + 5)
            : finalCpu;
          const updated = [...history.slice(1), nextVal];
          return updated;
        });

        return {
          throughput: finalRps,
          latency: finalLat,
          errorRate: finalErr,
          cpuPercent: finalCpu,
          cacheHitRate: finalCacheHit,
        };
      });
    }, 1000);

    return () => clearInterval(statInterval);
  }, [activeBlueprintId, surgeActive, chaosActive, cachePurged, selectedNodeId]);

  // Auto heal schedule of Chaos Monkey Node kill
  useEffect(() => {
    if (chaosActive) {
      const timer = setTimeout(() => {
        setChaosActive(false);
        setChaosNode(null);
        setTerminalLogs((prev) => [
          ...prev.slice(-25),
          `[SRE-HEAL] [${new Date().toISOString().slice(11, 19)}] Automated health monitor detected node outage context.`,
          `[SRE-HEAL] [${new Date().toISOString().slice(11, 19)}] Rescheduling pods via k8s-scheduler...`,
          `[SRE-HEAL] [${new Date().toISOString().slice(11, 19)}] Standby-replica successfully attached. Health restored to 100%.`,
        ]);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [chaosActive]);

  // Auto warm DB cache after purge
  useEffect(() => {
    if (cachePurged) {
      const timer = setTimeout(() => {
        setCachePurged(false);
        setTerminalLogs((prev) => [
          ...prev.slice(-25),
          `[CACHE] [${new Date().toISOString().slice(11, 19)}] Background database indexing finished warming evictees pools.`,
          `[CACHE] [${new Date().toISOString().slice(11, 19)}] Memory cache index syncer successfully pre-heated. Cache hit restored.`,
        ]);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [cachePurged]);

  // Handle deployment rollout progress
  useEffect(() => {
    if (deploying) {
      const timer = setInterval(() => {
        setDeployProgress((p) => {
          if (p >= 100) {
            clearInterval(timer);
            setDeploying(false);
            setTerminalLogs((prev) => [
              ...prev.slice(-25),
              `[DEPLOY] k8s service cluster rollout complete! Restoring routing nodes to Gold Image.`,
              `[SYSTEM] Dynamic systems state successfully optimized. System active.`,
            ]);
            return 0;
          }
          return p + 20;
        });
      }, 600);
      return () => clearInterval(timer);
    }
  }, [deploying]);

  // Populates realistic initial logs for the active blueprint
  useEffect(() => {
    let initialLogs: string[] = [];
    if (activeBlueprintId === 'calkilo') {
      initialLogs = [
        `[SYSTEM] Booting Calkilo AI Intelligent Nutrition Environment...`,
        `[SYSTEM] Connected to Local GPU Pipeline (ONNX inference engine ready)`,
        `[NET] gRPC channels established on port 8002 for YOLOv8 classifier`,
        `[DB] PostgreSQL PgVector connection bounds: (0 .. 50) initialized.`,
        `[TELEMETRY] Logging frame metrics: 120Hz scanner texture buffers connected.`,
        `[STATUS] System status is 100% HEALTHY`,
      ];
    } else if (activeBlueprintId === 'couchini') {
      initialLogs = [
        `[SYSTEM] Initializing Couchini synchronized streaming audio core...`,
        `[NET] WebSockets cluster listening on port 8010 for client heartbeats.`,
        `[CACHE] Connected to Active Redis Pub-Sub server on port 6379`,
        `[DEC] Cryptographic on-device decryption matrices loaded successfully.`,
        `[STATUS] Listening party rooms synchronized state: average delay <50ms.`,
      ];
    } else if (activeBlueprintId === 'tipax') {
      initialLogs = [
        `[SYSTEM] Starting Tipax Logistics Geo-Telemetry Dispatch network...`,
        `[NET] UDP Socket listening on port 888 for mobile driver packets.`,
        `[QUEUE] RabbitMQ AMQP Channels open: dispatcher virtual hosts active.`,
        `[DB] PostGIS Geographic extension verified. Spatial index caching pre-heated.`,
        `[STATUS] Tracking coordinates pipeline receiving streams: 12,000 active nodes.`,
      ];
    } else if (activeBlueprintId === 'hyperstar') {
      initialLogs = [
        `[SYSTEM] Mounting Hyperstar Enterprise Inventory Ledger state-machine...`,
        `[NET] Congruity Reverse Proxy active on port 443 with RBAC enabled.`,
        `[CACHE] Distributed Redis sentinel instances pre-heated.`,
        `[DB] Postgres master database replica pools synchronized.`,
        `[STATUS] Concurrency state locks: active monitor idle. Ready for queries.`,
      ];
    } else {
      initialLogs = [
        `[SYSTEM] Booting FaceAuth Attendance biometric terminal daemon...`,
        `[EDGE] Local camera frame grabber initialized via OpenCV isolates.`,
        `[MODEL] FaceNet lightweight engine loaded: mathematical embeddings primed.`,
        `[DB] Encrypted local SQLite DB cache file opened on edge disk cache.`,
        `[STATUS] Hardware status online. Continuous health stream pinging cloud logger.`,
      ];
    }
    setTerminalLogs(initialLogs);
  }, [activeBlueprintId]);

  // Periodic background telemetry logs tick
  useEffect(() => {
    const logInterval = setInterval(() => {
      if (deploying) return;

      const timestamp = new Date().toISOString().slice(11, 19);
      let logLine = '';

      if (activeBlueprintId === 'calkilo') {
        const sentences = [
          `[INFO] [${timestamp}] OpenCV Camera frames processed: index texture synced at 120Hz.`,
          `[INFO] [${timestamp}] CUDA core invocation successful. YOLO inference resolved in 182ms.`,
          `[DB] [${timestamp}] PostgreSQL Vector Store: indexed culinary vector group (id: ${Math.floor(Math.random() * 1000)}).`,
          `[NET] [${timestamp}] WebSocket frame transmission ok. Packets dispatched via broker.`,
        ];
        logLine = sentences[Math.floor(Math.random() * sentences.length)];
      } else if (activeBlueprintId === 'couchini') {
        const sentences = [
          `[INFO] [${timestamp}] Sound isolates thread pool decrypted stream chunk index ${Math.floor(Math.random() * 50)}0.`,
          `[NET] [${timestamp}] Session ws-c3b9 heartbeats verified. Playhead sync drift <0.5ms.`,
          `[CACHE] [${timestamp}] Redis hit registered on audio_playback_keys. Stream uninterrupted.`,
          `[NET] [${timestamp}] CloudFront CDN buffer pre-heated: fetched chunk packet.`,
        ];
        logLine = sentences[Math.floor(Math.random() * sentences.length)];
      } else if (activeBlueprintId === 'tipax') {
        const sentences = [
          `[INFO] [${timestamp}] Geo metrics: Driver node ${Math.floor(Math.random() * 100) + 10} reported coordinates coords=(35.712, 51.402).`,
          `[QUEUE] [${timestamp}] RabbitMQ batch queue dispatched map overlay coords coordinates.`,
          `[INFO] [${timestamp}] TSP Route engine optimized delivery path: calculated optimal driver waypoint sequence.`,
          `[DB] [${timestamp}] Postgres Spatial PostGIS queries: resolved clustered bounds overlay in 11ms.`,
        ];
        logLine = sentences[Math.floor(Math.random() * sentences.length)];
      } else if (activeBlueprintId === 'hyperstar') {
        const sentences = [
          `[INFO] [${timestamp}] POS ledger receipt: logged barcode scan on store terminal index 184.`,
          `[CACHE] [${timestamp}] Redis atomic counter incremented for stock inventory index ${Math.floor(Math.random() * 500)}.`,
          `[DB] [${timestamp}] PG write-replica synchronized: lock levels clear.`,
          `[NET] [${timestamp}] Gateway reverse proxy rate-limiter check: OK (connections stable).`,
        ];
        logLine = sentences[Math.floor(Math.random() * sentences.length)];
      } else if (activeBlueprintId === 'faceauth') {
        const sentences = [
          `[INFO] [${timestamp}] Video source Isolates: Isolated facial ROI inside coordinates (120, 80, 220, 180).`,
          `[INFO] [${timestamp}] FaceNet embedded matrix match confidence score 0.96. Entry approved.`,
          `[DB] [${timestamp}] Local SQLite cache synced biometric indices in 14ms.`,
          `[NET] [${timestamp}] WS telemetry logger dispatched Kiosk temperature metrics (41C - stable).`,
        ];
        logLine = sentences[Math.floor(Math.random() * sentences.length)];
      }

      setTerminalLogs((prev) => [...prev.slice(-21), logLine]);
    }, 2500);

    return () => clearInterval(logInterval);
  }, [activeBlueprintId, deploying]);

  // Form submission handling
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formSent, setFormSent] = useState(false);

  // Rotating subtitle ticks
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTitleIdx((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [titles.length]);

  // Theme configurations based on active mode with dynamic developer overridden presets
  const accentColor = themeOverride || (mode === 'MOBILE' ? '#00D1FF' : '#9EFF00');
  const secondaryAccent = themeOverride ? '#FF6B00' : (mode === 'MOBILE' ? '#7B61FF' : '#FF6B00');
  const activeGlow = accentColor === '#00D1FF' 
    ? 'shadow-[0_0_40px_rgba(0,209,255,0.15)]' 
    : accentColor === '#9EFF00' 
      ? 'shadow-[0_0_40px_rgba(158,255,0,0.15)]'
      : accentColor === '#7B61FF'
        ? 'shadow-[0_0_40px_rgba(123,97,255,0.15)]'
        : 'shadow-[0_0_40px_rgba(255,107,0,0.15)]';
  
  // Custom scrolling text elements for marquee
  const techRow1 = [
    { name: 'Flutter', color: '#02569B' },
    { name: 'Dart', color: '#0175C2' },
    { name: 'FastAPI', color: '#059669' },
    { name: 'Django', color: '#092E20' },
    { name: 'PostgreSQL', color: '#336791' },
    { name: 'Redis', color: '#DC382D' },
    { name: 'Docker', color: '#2496ED' },
    { name: 'AWS', color: '#FF9900' }
  ];

  const techRow2 = [
    { name: 'WebSocket', color: '#F80000' },
    { name: 'Firebase', color: '#FFCA28' },
    { name: 'GraphQL', color: '#E10098' },
    { name: 'Linux', color: '#FCC624' },
    { name: 'Riverpod', color: '#00D1FF' },
    { name: 'BLoC', color: '#7B61FF' },
    { name: 'Celery', color: '#37BC9B' },
    { name: 'JWT/REST', color: '#00D1FF' }
  ];

  // Dynamic parameterized filtering and priority re-ordering of projects:
  const filteredProjects = projectsData.filter((item) => {
    if (roleFilter === 'ALL') return true;
    return item.scope === roleFilter;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    // Reorder projects depending on active prioritized mode (Mobile puts client apps first, Backend puts service infrastructures first)
    const aMatchesMode = (a.scope === 'MOBILE' && mode === 'MOBILE') || (a.scope === 'BACKEND' && mode === 'BACKEND');
    const bMatchesMode = (b.scope === 'MOBILE' && mode === 'MOBILE') || (b.scope === 'BACKEND' && mode === 'BACKEND');
    if (aMatchesMode && !bMatchesMode) return -1;
    if (bMatchesMode && !aMatchesMode) return 1;
    return 0;
  });

  // Services list mapping dynamic translations items
  const services = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: t.services.items[0].title,
      desc: t.services.items[0].desc,
      focus: t.services.items[0].focus
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: t.services.items[1].title,
      desc: t.services.items[1].desc,
      focus: t.services.items[1].focus
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: t.services.items[2].title,
      desc: t.services.items[2].desc,
      focus: t.services.items[2].focus
    },
    {
      icon: <Radio className="w-6 h-6" />,
      title: t.services.items[3].title,
      desc: t.services.items[3].desc,
      focus: t.services.items[3].focus
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: t.services.items[4] ? t.services.items[4].title : (lang === 'en' ? 'Intelligent AI Shards' : 'اجزای هوشمند یادگیری ماشین'),
      desc: t.services.items[4] ? t.services.items[4].desc : (lang === 'en' ? 'Embedding computer vision detectors and recommendation indices on-device and on backend.' : 'استقرار مدل‌های لبه وب برای تشخیص تصویر و پیشنهاد یادگیری ماشین.'),
      focus: t.services.items[4] ? t.services.items[4].focus : (lang === 'en' ? 'Predictive Models' : 'مدل‌های هوش مصنوعی')
    }
  ];

  // Simulated architecture request stream updates
  const [activePacket, setActivePacket] = useState<number>(0);
  const [hudStats, setHudStats] = useState({
    activeSession: 'SYS-ACTIVE-449',
    latency: '12ms',
    trafficRate: '1,420 req/s',
    ramUsage: '44.2%',
    cpuUsage: '12.8%'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePacket((prev) => (prev + 1) % 6);
      
      // randomize analytics a tiny bit for simulation
      setHudStats({
        activeSession: `SYS-ACTIVE-${Math.floor(Math.random() * 200 + 300)}`,
        latency: `${Math.floor(Math.random() * 8 + 6)}ms`,
        trafficRate: `${(1200 + Math.floor(Math.random() * 400)).toLocaleString()} req/s`,
        ramUsage: `${(40 + Math.random() * 8).toFixed(1)}%`,
        cpuUsage: `${(10 + Math.random() * 15).toFixed(1)}%`
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormState({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div 
      dir={lang === 'fa' ? 'rtl' : 'ltr'} 
      className="min-h-screen bg-[#070707] text-[#D7E2EA] font-sans selection:bg-[#9EFF00] selection:text-[#070707] overflow-x-hidden relative"
    >
      
      {/* Dynamic Background Glow changing according to interactive Mode selection */}
      <div className="absolute top-0 left-0 w-full h-[120vh] pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute -top-[20%] left-[10%] w-[500px] h-[500px] rounded-full blur-[140px] opacity-25 transition-all duration-1000 ease-in-out"
          style={{ backgroundColor: accentColor }}
        />
        <div 
          className="absolute top-[40%] -right-[10%] w-[600px] h-[600px] rounded-full blur-[180px] opacity-[0.12] transition-all duration-1000 ease-in-out"
          style={{ backgroundColor: secondaryAccent }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* FLOATING NAVBAR */}
      <header className="fixed top-5 left-1/2 -translate-x-1/2 w-[94%] max-w-7xl h-16 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full z-50 px-4 md:px-8 flex items-center justify-between transition-all duration-300 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full transition-all duration-500 animate-pulse" style={{ backgroundColor: accentColor }} />
          <span className="font-black text-lg tracking-wider bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent uppercase">
            {lang === 'en' ? 'ARSHIA.' : 'عرشیا.'}
          </span>
        </div>

        {/* Desktop navigation with bilingual support */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-semibold tracking-widest uppercase">
          <a href="#about" className="hover:text-white transition-colors duration-200">{t.navbar.about}</a>
          <a href="#services" className="hover:text-white transition-colors duration-200">{t.navbar.services}</a>
          <a href="#architecture" className="hover:text-white transition-colors duration-200">{t.navbar.architecture}</a>
          <a href="#projects" className="hover:text-white transition-colors duration-200">{t.navbar.projects}</a>
          <a href="#contact" className="hover:text-white transition-colors duration-200">{t.navbar.contact}</a>
        </nav>

        {/* Action Widgets Zone */}
        <div className="flex items-center gap-3">
          
          {/* Dev Mode Layout Inspector Toggle */}
          <button
            onClick={() => {
              const nextMode = !devMode;
              setDevMode(nextMode);
              if (nextMode) {
                setDevPanelOpen(true);
              }
              setTerminalLogs((prev) => [
                ...prev.slice(-25),
                nextMode 
                  ? `[DEV-ALERT] [${new Date().toISOString().slice(11, 19)}] Interactive Layout Inspector ACTIVE. Wireframes mounted, dev console streaming.`
                  : `[DEV-INFO] [${new Date().toISOString().slice(11, 19)}] Layout Inspector inactive. Returning view to static.`
              ]);
            }}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-black tracking-widest uppercase transition-all duration-300 cursor-pointer ${
              devMode 
                ? 'bg-[#9EFF00]/10 border-[#9EFF00]/40 text-[#9EFF00] shadow-[0_0_12px_rgba(158,255,0,0.2)]' 
                : 'bg-white/5 border-white/5 hover:border-white/15 hover:bg-white/10 text-gray-300'
            }`}
            title="Toggle Layout Inspector (Dev Mode)"
          >
            <Terminal className="w-3.5 h-3.5" style={{ color: devMode ? '#9EFF00' : '#888' }} />
            <span>{devMode ? 'INSPECT: ON' : 'DEV MODE'}</span>
          </button>

          {/* Global Bilingual Switcher Toggle Button */}
          <button 
            onClick={() => setLang(lang === 'en' ? 'fa' : 'en')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 hover:border-white/15 hover:bg-white/10 text-[10px] font-black tracking-widest uppercase transition-all duration-300 text-gray-300 cursor-pointer"
            title="Toggle Language / تغییر زبان"
          >
            <Globe className="w-3.5 h-3.5 text-gray-400 rotate-0 hover:rotate-45 transition-transform" />
            <span>{lang === 'en' ? 'فارسی' : 'English'}</span>
          </button>

          {/* Dynamic Mode Switcher on Navigation Bar */}
          <div className="flex items-center gap-1 bg-white/5 border border-white/5 py-1 px-1 rounded-full shadow-inner scale-90 md:scale-100">
            <button 
              onClick={() => setMode('MOBILE')}
              className={`px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase transition-all duration-300 ${
                mode === 'MOBILE' 
                  ? 'bg-[#7B61FF] text-white shadow-[0_0_12px_rgba(123,97,255,0.4)]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              mobile
            </button>
            
            <button 
              onClick={() => setMode('BACKEND')}
              className={`px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase transition-all duration-300 ${
                mode === 'BACKEND' 
                  ? 'bg-[#9EFF00] text-black shadow-[0_0_12px_rgba(158,255,0,0.4)] font-extrabold' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              backend
            </button>
          </div>

        </div>
      </header>

      {/* HERO SECTION */}
      <section 
        onMouseEnter={() => {
          if (devMode) setHoveredComponent({ name: 'HeroSection', selectors: 'section.relative.min-h-screen.pt-28.pb-16', size: '1240 × 820px' });
        }}
        onMouseLeave={() => {
          if (devMode) setHoveredComponent(null);
        }}
        className={`relative min-h-screen pt-28 pb-16 flex items-center justify-center z-10 px-4 md:px-8 max-w-7xl mx-auto transition-all duration-500 ${
          devMode ? 'border border-dashed border-[#00D1FF]/40 bg-[#00D1FF]/[0.01] rounded-3xl mt-2 relative' : ''
        }`}
      >
        {devMode && (
          <div className="absolute top-4 left-4 z-[40] font-mono text-[9px] bg-black/90 text-[#00D1FF] border border-[#00D1FF]/30 px-2.5 py-1 rounded flex items-center gap-1.5 select-none animate-pulse">
            <Code2 className="w-3 h-3 text-[#00D1FF]" />
            <span>&lt;HeroComponent mode="{mode}" rendering="Impeller" compiler="Dart AOT (ARM64)" /&gt;</span>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          
          {/* Hero Left Side: Intro and main headline */}
          <div className="lg:col-span-4 flex flex-col justify-center items-start space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-gray-300">
              <Sparkles className="w-3.5 h-3.5" style={{ color: accentColor }} />
              <span>{lang === 'en' ? 'Fullstack & Mobile Specialist' : 'متخصص سیستم‌های ارشد و کلاینت'}</span>
            </div>
            
            <div className="space-y-1 text-left rtl:text-right">
              <span className="text-lg md:text-xl font-bold text-gray-400 uppercase tracking-widest block">{lang === 'en' ? "Hi, I'm" : 'من'}</span>
              <h1 className="text-6xl md:text-7xl xl:text-8xl font-black uppercase text-white tracking-tighter leading-none relative">
                {t.hero.role}
                <span className="absolute -bottom-1 left-0 rtl:right-0 w-24 h-1.5 rounded" style={{ backgroundColor: accentColor }} />
              </h1>
            </div>

            <div className="h-10 flex items-center">
              <span className="text-lg md:text-xl font-medium tracking-wide bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {lang === 'en' ? 'Expert' : 'متخصص'} <span className="underline decoration-2 transition-colors duration-500 font-bold" style={{ textDecorationColor: accentColor }}>{titles[activeTitleIdx]}</span>
              </span>
            </div>

            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-sm text-left rtl:text-right font-light">
              {t.hero.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#contact" 
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg text-black"
                style={{ 
                  backgroundColor: accentColor,
                  boxShadow: `0 8px 24px -6px ${accentColor}`
                }}
              >
                <span>{t.hero.contactBtn}</span>
                <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                  <ArrowRight className="w-3 h-3 text-black rtl:rotate-180" />
                </span>
              </a>
              
              <a 
                href="#projects" 
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:border-white/20 text-white"
              >
                <span>{t.hero.projectsBtn}</span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400 rtl:rotate-180" />
              </a>
            </div>
          </div>

          {/* Hero Center Column: Stylized Cinematic Developer portrait render (generated) */}
          <div className="lg:col-span-4 relative flex items-center justify-center py-6">
            <div className="relative w-full aspect-square max-w-[380px] group">
              
              {/* Spinning tech orbits decoration */}
              <div 
                className="absolute inset-0 rounded-full border border-dashed border-white/10 animate-[spin_50s_linear_infinite] transition-all duration-1000 ease-in-out"
                style={{ borderColor: `${accentColor}30` }}
              />
              <div 
                className="absolute inset-4 rounded-full border border-double border-white/5 animate-[spin_30s_linear_infinite_reverse] transition-all duration-1000 ease-in-out"
                style={{ borderColor: `${secondaryAccent}20` }}
              />
              
              {/* Glowing halo behind portrait */}
              <div 
                className="absolute inset-10 rounded-full blur-[40px] opacity-40 mix-blend-screen transition-all duration-1000 ease-in-out animate-pulse"
                style={{ backgroundColor: accentColor }}
              />
              <div 
                className="absolute inset-16 rounded-full blur-[60px] opacity-30 mix-blend-screen transition-all duration-1000 ease-in-out animate-pulse delay-700"
                style={{ backgroundColor: secondaryAccent }}
              />

              {/* Holographic frame details */}
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-white/30" />
              <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-white/30" />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-white/30" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-white/30" />
              
              {/* Glowing decorative indicator light */}
              <div className="absolute top-3 left-4 flex items-center gap-1.5 z-10 bg-black/60 px-2 py-0.5 rounded border border-white/10 text-[8px] tracking-widest uppercase font-bold text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: accentColor }} />
                <span>render_node_01</span>
              </div>

              {/* Actual Generated Image Render */}
              <div className="w-full h-full rounded-2xl overflow-hidden glass-card relative p-2">
                <img 
                  src={arshiaPortrait} 
                  alt="Arshia Khani Developer Portrait" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl transition-all duration-700 group-hover:scale-[1.03] grayscale hover:grayscale-0"
                />
              </div>

              {/* Watermark identity name in front of hoodies style portrait */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-black/90 border border-white/10 px-6 py-2 rounded-full shadow-2xl z-20 flex items-center gap-2">
                <span className="text-[10px] tracking-widest font-black uppercase text-gray-300">ARSHIA KHANI</span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">{mode} SPECIFIED</span>
              </div>
            </div>
          </div>

          {/* Hero Right Column: Interactive UI Showcase responsive preview in a beautiful glass card */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            
            {/* The Floating UI Mockup Card from the reference */}
            <div className={`glass-card rounded-2xl p-6 relative overflow-hidden transition-all duration-700 hover:border-white/12 group ${activeGlow}`}>
              
              {/* Mode-specific abstract background lighting */}
              <div 
                className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-[50px] opacity-15 transition-all duration-1000 ease-in-out" 
                style={{ backgroundColor: accentColor }}
              />

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                  <span className="text-[10px] tracking-widest font-bold uppercase text-gray-400">
                    {mode === 'MOBILE' 
                      ? (lang === 'en' ? 'CLIENT INTERACTION' : 'رابط تعاملی کاربر') 
                      : (lang === 'en' ? 'CORE SERVICES ENGINE' : 'موتور سرویس‌های هسته')}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full" />
                  <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full" />
                  <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full" />
                </div>
              </div>

              {/* Heading matching the mock illustration */}
              <h3 className="text-xl md:text-2xl font-bold uppercase text-white tracking-tight flex items-center gap-2">
                {mode === 'MOBILE' 
                  ? (lang === 'en' ? 'MOBILE SUITE' : 'مجموعه کلاینت') 
                  : (lang === 'en' ? 'BACKEND SWARM' : 'خوشه سرور بک‌اند')}
                <Sparkles className="w-5 h-5 shrink-0" style={{ color: accentColor }} />
              </h3>
              
              <p className="text-gray-400 text-xs mt-2 mb-6 leading-relaxed max-w-sm">
                {mode === 'MOBILE' 
                  ? (lang === 'en' ? 'Beautiful, high-framerate, cross-platform Android & iOS experiences engineered with clean code.' : 'رابط‌های کاربری زنده، ۶۰ فریم و بومی برای اندروید و iOS با مهندسی الگوریتم‌های رندر روان موبایل.')
                  : (lang === 'en' ? 'Highly concurrent system layers, lightning-fast database routers, and persistent queue states.' : 'لایه‌های سیستم بسیار همزمان، وب‌سوکت‌ها، کوئری‌های بهینه دیتابیس و مدیریت فعال صف‌های مبادلاتی.')}
              </p>

              {/* REAL LIVE CSS MOCKUPS of Mobile screens or Terminal nodes inside the card */}
              <div className="bg-[#0b0b0d]/80 rounded-xl p-3 border border-white/5 space-y-3 relative overflow-hidden min-h-[170px] flex flex-col justify-center">
                
                <AnimatePresence mode="wait">
                  {mode === 'MOBILE' ? (
                    <motion.div 
                      key="mobile-mock"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="grid grid-cols-3 gap-2"
                    >
                      {/* Sub-mockup 1: Car Marketplace */}
                      <div className="bg-zinc-900/90 border border-[#00D1FF]/20 rounded-lg p-2 flex flex-col justify-between text-[8px] h-28 relative overflow-hidden hover:border-[#00D1FF]/40 transition-colors">
                        <div className="flex justify-between items-center pb-1 border-b border-white/5">
                          <span className="font-bold text-gray-300">CarZone</span>
                          <span className="text-[6px] text-[#00D1FF]">{lang === 'en' ? 'Active' : 'فعال'}</span>
                        </div>
                        <div className="py-2 flex justify-center">
                          {/* Vector Sports Car Representation */}
                          <div className="w-10 h-4 bg-[#00D1FF]/10 rounded-full border border-[#00D1FF]/30 relative flex items-center justify-center">
                            <div className="absolute right-1 w-2 h-2 bg-white/70 rounded-full" />
                            <div className="w-3 h-1.5 bg-white/30 rounded-xs absolute top-0.5" />
                          </div>
                        </div>
                        <div className="text-gray-400 text-[6px]">{lang === 'en' ? 'Find your ride' : 'یافتن خودرو'}</div>
                      </div>

                      {/* Sub-mockup 2: FitTrack dashboard */}
                      <div className="bg-zinc-900/90 border border-[#7B61FF]/20 rounded-lg p-2 flex flex-col justify-between text-[8px] h-28 relative overflow-hidden hover:border-[#7B61FF]/40 transition-colors">
                        <div className="flex justify-between items-center pb-1 border-b border-white/5">
                          <span className="font-bold text-gray-300">FitTrack</span>
                          <span className="text-[#7B61FF] font-black">76%</span>
                        </div>
                        {/* Live CSS Ring Graphic */}
                        <div className="flex justify-center my-1">
                          <div className="w-8 h-8 rounded-full border-2 border-dashed border-[#7B61FF] flex items-center justify-center animate-spin">
                            <div className="w-4 h-4 rounded-full bg-[#7B61FF]/20" />
                          </div>
                        </div>
                        <div className="text-gray-500 text-[6px] text-center">{lang === 'en' ? 'Calories Tracker' : 'پایش کالری'}</div>
                      </div>

                      {/* Sub-mockup 3: User Chatly Active */}
                      <div className="bg-zinc-900/90 border border-white/5 rounded-lg p-2 flex flex-col justify-between text-[8px] h-28 relative overflow-hidden hover:border-[#00D1FF]/10 transition-colors">
                        <div className="flex items-center gap-1 pb-1 border-b border-white/5">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="font-bold text-gray-300">Chatly</span>
                        </div>
                        <div className="space-y-1">
                          <div className="bg-white/5 h-1.5 rounded w-4/5" />
                          <div className="bg-[#7B61FF]/20 h-1.5 rounded w-3/4 self-end ml-1" />
                          <div className="bg-white/5 h-1.5 rounded w-1/2" />
                        </div>
                        <span className="text-[5px] text-gray-500">{lang === 'en' ? 'Connected 1ms' : 'متصل 1ms'}</span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="backend-mock"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-2 text-[9px] font-mono leading-none"
                    >
                      {/* Backend Logs / Process HUD */}
                      <div className="flex items-center justify-between text-[#9EFF00] border-b border-white/5 pb-1">
                        <span>[FASTAPI-APP-SYS]</span>
                        <span className="animate-pulse">● RUNNING</span>
                      </div>
                      
                      <div className="space-y-1 text-gray-400 text-[8px]">
                        <div className="flex justify-between">
                          <span className="text-[#FF6B00]">GET /api/v1/auth/user</span>
                          <span className="text-emerald-400">200 OK - 8ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#FF6B00]">POST /api/v1/model/predict</span>
                          <span className="text-emerald-400">201 Inferred - 180ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">REDIS-CACHE.GET(user_session)</span>
                          <span className="text-orange-400">HIT - 0.2ms</span>
                        </div>
                        <div className="flex justify-between items-center text-[#9EFF00] bg-[#9EFF00]/5 px-1 py-0.5 rounded mt-1">
                          <span>WebSocket Active:</span>
                          <span>{lang === 'en' ? '12,402 listening' : '۱۲،۴۰۲ شنونده فعال'}</span>
                        </div>
                      </div>

                      <div className="w-full bg-neutral-900 h-1 rounded overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#9EFF00] to-[#FF6B00]" style={{ width: '85%' }} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

              {/* View Projects CTA bottom */}
              <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                <a href="#projects" className="text-xs font-black tracking-widest uppercase flex items-center gap-1 group/btn" style={{ color: accentColor }}>
                  <span>{t.hero.projectsBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </a>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  {lang === 'en' ? `${mode} mode Active` : `حالت ${mode === 'MOBILE' ? 'کلاینت' : 'سیستم'} فعال`}
                </span>
              </div>
            </div>

            {/* Tech Stack List Under Preview Card */}
            <div className="glass-card rounded-xl p-4 border border-white/5">
              <span className="text-[10px] tracking-widest uppercase font-black text-gray-500 block mb-2.5">
                {lang === 'en' ? 'Current Stack Focus' : 'فناوری‌های ارشد کلاینت و سرور'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {techRow1.slice(0, 5).map((tech, i) => (
                  <span 
                    key={`stack1-${i}`} 
                    className="text-[9px] font-bold uppercase tracking-wider bg-white/5 border border-white/5 py-1 px-2.5 rounded-full inline-flex items-center gap-1.5 hover:border-white/20 transition-all duration-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tech.color }} />
                    {tech.name}
                  </span>
                ))}
                {techRow2.slice(0, 4).map((tech, i) => (
                  <span 
                    key={`stack2-${i}`} 
                    className="text-[9px] font-bold uppercase tracking-wider bg-white/5 border border-white/5 py-1 px-2.5 rounded-full inline-flex items-center gap-1.5 hover:border-white/20 transition-all duration-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tech.color }} />
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* TECH MARQUEE STRIP ROW */}
      <section 
        onMouseEnter={() => {
          if (devMode) setHoveredComponent({ name: 'InfiniteMarquee', selectors: 'section.bg-black/40.border-y.py-6', size: '1920 × 96px' });
        }}
        onMouseLeave={() => {
          if (devMode) setHoveredComponent(null);
        }}
        className={`bg-black/40 border-y border-white/5 py-6 overflow-hidden relative z-10 select-none transition-all duration-500 ${
          devMode ? 'border border-dashed border-[#7B61FF]/40 bg-[#7B61FF]/[0.01] relative' : ''
        }`}
      >
        {devMode && (
          <div className="absolute top-2 left-4 z-[40] font-mono text-[9px] bg-black/90 text-[#7B61FF] border border-[#7B61FF]/30 px-2.5 py-1 rounded flex items-center gap-1.5 select-none animate-pulse">
            <Code2 className="w-3 h-3 text-[#7B61FF]" />
            <span>&lt;InfiniteMarquee speed="25s" scroll="dual-axis" stream="throughput" /&gt;</span>
          </div>
        )}
        
        {/* Glow behind the Marquee */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-10 rounded-full blur-[60px] opacity-10 bg-[#7B61FF]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-10 rounded-full blur-[60px] opacity-10 bg-[#9EFF00]" />

        {/* Row 1 - scrolling left */}
        <div className="relative flex overflow-x-hidden group mb-4">
          <div className="animate-[marquee_25s_linear_infinite] flex whitespace-nowrap gap-4">
            {techRow1.concat(techRow1).map((tech, idx) => (
              <div 
                key={`marquee1-${idx}`} 
                className="bg-zinc-900/80 border border-white/5 rounded-full px-5 py-2.5 flex items-center gap-2 shadow-lg hover:border-white/20 cursor-default transition-all duration-300"
              >
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: tech.color }} />
                <span className="text-xs font-black uppercase tracking-widest text-[#D7E2EA]">{tech.name}</span>
                <span className="text-[9px] text-gray-600">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - scrolling right */}
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-[marquee_30s_linear_infinite_reverse] flex whitespace-nowrap gap-4">
            {techRow2.concat(techRow2).map((tech, idx) => (
              <div 
                key={`marquee2-${idx}`} 
                className="bg-zinc-900/80 border border-white/5 rounded-full px-5 py-2.5 flex items-center gap-2 shadow-lg hover:border-white/20 cursor-default transition-all duration-300"
              >
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: tech.color }} />
                <span className="text-xs font-black uppercase tracking-widest text-[#D7E2EA]">{tech.name}</span>
                <span className="text-[9px] text-gray-600">✦</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CINEMATIC FEATURED PROJECTS SECTION */}
      <section 
        id="projects" 
        onMouseEnter={() => {
          if (devMode) setHoveredComponent({ name: 'CinematicProjects', selectors: 'section#projects.py-24.relative.bg-black/45', size: '1240 × 1400px' });
        }}
        onMouseLeave={() => {
          if (devMode) setHoveredComponent(null);
        }}
        className={`py-24 relative z-10 bg-black/45 border-y border-white/5 scroll-mt-20 transition-all duration-500 ${
          devMode ? 'border border-dashed border-[#9EFF00]/40 bg-[#9EFF00]/[0.01]' : ''
        }`}
      >
        {devMode && (
          <div className="absolute top-4 left-4 z-[40] font-mono text-[9px] bg-black/95 text-[#9EFF00] border border-[#9EFF00]/30 px-2.5 py-1 rounded flex items-center gap-1.5 select-none animate-pulse">
            <Code2 className="w-3 h-3 text-[#9EFF00]" />
            <span>&lt;ProjectRepository state="indexed-assets" load="interactive" /&gt;</span>
          </div>
        )}
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div className="flex flex-col space-y-2 text-left rtl:text-right font-sans">
              <div className="flex items-center gap-2">
                <span className="w-6 h-0.5 animate-pulse" style={{ backgroundColor: accentColor }} />
                <span className="text-xs tracking-widest uppercase font-black" style={{ color: accentColor }}>
                  {lang === 'en' ? 'Premium Showcases' : 'نمونه کارهای ارشد متمایز'}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
                {lang === 'en' ? 'Featured Work' : 'پروژه‌های شاخص'}
              </h2>
              <p className="text-gray-400 text-sm max-w-sm font-light mt-1">
                {lang === 'en' ? 'Luxury vertical showcases detailing real engineering layers and live telemetry blocks.' : 'کلکسیونی از سیستم‌های مهندسی با کارایی برتر، لاگ داده‌ها و رندرهای کلاینت.'}
              </p>
            </div>
            
            <div className="flex items-center gap-4 font-mono">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-2.5 rounded-xl text-xs">
                <span className="text-gray-500 font-bold">{lang === 'en' ? 'Priority View:' : 'اولویت نمایش:'}</span>
                <span className="px-3 py-1 rounded-sm uppercase font-black text-[10px]" style={{ color: accentColor, backgroundColor: `${accentColor}10` }}>
                  {lang === 'en' ? `${mode} SPECS ACCENTUATED` : `تاکید روی حالت ${mode === 'MOBILE' ? 'موبایل' : 'سرور'}`}
                </span>
              </div>
            </div>
          </div>

          {/* Stacking Tall Cinematic Vertical Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
            <AnimatePresence mode="popLayout">
              {sortedProjects.map((proj, idx) => {
                const projLocal = proj[lang] || proj.en;
                return (
                  <motion.div 
                    layout
                    key={proj.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }}
                    onClick={() => setSelectedProjId(proj.id)}
                    className="group relative cursor-pointer flex flex-col justify-between bg-zinc-950/60 rounded-3xl overflow-hidden border border-white/5 hover:border-white/15 transition-all duration-500 min-h-[580px] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]"
                    style={{
                      boxShadow: `inset 0 1px 1px rgba(255,255,255,0.05)`
                    }}
                  >
                    {/* Subtle lighting reflection sweep effect on card hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.012] to-transparent bg-[length:200%_200%] transition-all duration-700 opacity-0 group-hover:opacity-100 animate-pulse" />
                    
                    {/* Neon Glow Corner Elements matching individual project's design accent */}
                    <div 
                      className="absolute -top-12 -right-12 w-44 h-44 rounded-full blur-[65px] opacity-10 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none animate-pulse"
                      style={{ backgroundColor: proj.color }}
                    />
                    
                    {/* Category, Banner & Title Grid */}
                    <div className="p-6 pb-4 z-10 relative text-left rtl:text-right">
                      <div className="flex justify-between items-center mb-2.5 gap-2 font-mono">
                        <span className="text-[10px] uppercase tracking-widest font-extrabold text-gray-400">
                          {projLocal.category}
                        </span>
                        
                        {proj.scope === 'FULLSTACK' && (
                          <span className="text-[8px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/10">
                            {lang === 'en' ? 'FULLSTACK ARCHITECTURE' : 'معماری فول‌استک'}
                          </span>
                        )}
                        {proj.scope === 'MOBILE' && (
                          <span className="text-[8px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider bg-[#7B61FF]/10 text-[#7B61FF] border border-[#7B61FF]/10">
                            {lang === 'en' ? 'MOBILE SUITE' : 'توسعه موبایل'}
                          </span>
                        )}
                        {proj.scope === 'BACKEND' && (
                          <span className="text-[8px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/10">
                            {lang === 'en' ? 'BACKEND SWARM' : 'کدهای بک‌اند'}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-3xl font-black uppercase text-white tracking-tight leading-none group-hover:text-white transition-colors duration-300 font-sans">
                        {projLocal.title}
                      </h3>
                    </div>

                    {/* Cinematic Large Image Showcase & Reflection Block */}
                    <div className="flex-1 px-5 flex items-center justify-center relative my-4 overflow-hidden min-h-[220px]">
                      <div className="relative w-full h-[220px] rounded-2xl overflow-hidden glass-card border border-white/5 flex items-center justify-center p-1.5 transition-all duration-500">
                        
                        {/* Background visual halo */}
                        <div 
                          className="absolute inset-6 rounded-full blur-[35px] opacity-25 group-hover:scale-110 group-hover:opacity-45 transition-all duration-700" 
                          style={{ backgroundColor: proj.color }}
                        />
                        
                        <img 
                          src={proj.visual} 
                          alt={lang === 'en' ? `${projLocal.title} Device Showcase` : `پیش‌نمایش دستگاه پروژه ${projLocal.title}`} 
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover rounded-xl transition-all duration-700 group-hover:scale-[1.05] grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100"
                        />

                        {/* Sliding HUD grid line */}
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-white/10 [box-shadow:0_0_10px_#fff] opacity-0 group-hover:opacity-100 group-hover:translate-y-[215px] transition-all duration-[3s] ease-linear repeat-infinite pointer-events-none" />
                      </div>
                    </div>

                    {/* Descriptions, metrics tags & core features list */}
                    <div className="p-6 pt-2 space-y-4 z-10 relative bg-black/40 border-t border-white/5 text-left rtl:text-right font-sans">
                      
                      <p className="text-gray-400 text-xs leading-relaxed font-light min-h-[48px]">
                        {projLocal.desc}
                      </p>

                      {/* Customized highlights depending on engineers' role */}
                      <div className="text-[9px] font-light text-gray-400 border-t border-white/5 pt-2.5 font-mono">
                        {proj.scope === 'FULLSTACK' && (
                          <div className="flex flex-col gap-1 text-[8px] uppercase tracking-wider text-[#9EFF00]">
                            <span>✦ {lang === 'en' ? 'UI Preview & Server Logic Combined' : 'تلاقی کامل رابط کاربری موبایل و وب با منطق سرور'}</span>
                            <span>✦ {lang === 'en' ? 'Dockerized Microservices & REST/WS APIs' : 'میکروسرویس‌های کانتینری و وب‌سوکت‌های پاسخگو'}</span>
                          </div>
                        )}
                        {proj.scope === 'MOBILE' && (
                          <div className="flex flex-col gap-1 text-[8px] uppercase tracking-wider text-[#00D1FF]">
                            <span>✦ {lang === 'en' ? 'Ultra Smooth UI & Flow Animation' : 'انیمیشن‌های جریانی ۶۰ فریم تعاملی کلاینت'}</span>
                            <span>✦ {lang === 'en' ? 'Cross-Platform Engine Render Pipeline' : 'مهندسی ویجت‌ها با ذخیره حافظه پنهان بومی'}</span>
                          </div>
                        )}
                        {proj.scope === 'BACKEND' && (
                          <div className="flex flex-col gap-1 text-[8px] uppercase tracking-wider text-[#FF6B00]">
                            <span>✦ {lang === 'en' ? 'Database Pool Tuning & Memory Buffers' : 'بهینه‌سازی حداکثری پایگاه‌داده و بافرهای مقیاس‌پذیر'}</span>
                            <span>✦ {lang === 'en' ? 'High Concurrent Stream Brokers' : 'بهره‌گیری از صف‌های پیام‌رسانی غیرهمزمان توزیع شده'}</span>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3.5 py-3 border-y border-white/5 font-mono">
                        {proj.metrics.map((metric, mIdx) => {
                          const metLabel = metric.label[lang] || metric.label.en;
                          return (
                            <div key={mIdx} className="space-y-0.5">
                              <span className="text-[9px] uppercase tracking-wider text-gray-500 font-bold block">{metLabel}</span>
                              <span className="text-sm font-black text-white" style={{ color: proj.color }}>{metric.value}</span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex flex-wrap gap-1 pt-1 font-mono">
                        {proj.tech.slice(0, 4).map((t, idx) => (
                          <span key={idx} className="text-[9px] font-bold uppercase tracking-wider bg-white/5 border border-white/5 px-2.5 py-1 rounded text-gray-400 group-hover:border-white/15 transition-colors">
                            {t}
                          </span>
                        ))}
                        {proj.tech.length > 4 && (
                          <span className="text-[9px] font-bold uppercase tracking-wider bg-white/5 border border-white/5 px-2 py-1 rounded text-gray-400 hover:border-white/15 transition-colors">
                            +{proj.tech.length - 4} {lang === 'en' ? 'MORE' : 'بیشتر'}
                          </span>
                        )}
                      </div>

                      {/* Highly polished footer and CTA */}
                      <div className="pt-3 flex items-center justify-between text-xs text-white">
                        <span className="inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase font-black text-gray-500 transition-colors group-hover:text-white font-sans">
                          <span>{lang === 'en' ? 'Enter System Details' : 'مشاهده عمیق مشخصات سیستم'}</span>
                          <MousePointerClick className="w-3.5 h-3.5" style={{ color: proj.color }} />
                        </span>
                        <span className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white group-hover:bg-white/10 group-hover:scale-105 transition-all duration-300">
                          <ArrowRight className="w-4 h-4" style={{ color: proj.color }} />
                        </span>
                      </div>

                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* ABOUT ME SECTION (REDESIGNED & DEEP INTERACTIVE BENTO) */}
      <section 
        id="about" 
        onMouseEnter={() => {
          if (devMode) setHoveredComponent({ name: 'AboutGrid', selectors: 'section#about.py-24.relative', size: '1240 × 740px' });
        }}
        onMouseLeave={() => {
          if (devMode) setHoveredComponent(null);
        }}
        className={`py-24 relative z-10 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20 transition-all duration-500 ${
          devMode ? 'border border-dashed border-[#FF6B00]/40 bg-[#FF6B00]/[0.01] rounded-3xl mt-4 relative' : ''
        }`}
      >
        {devMode && (
          <div className="absolute top-4 left-4 z-[40] font-mono text-[9px] bg-black/90 text-[#FF6B00] border border-[#FF6B00]/30 px-2.5 py-1 rounded flex items-center gap-1.5 select-none animate-pulse">
            <Code2 className="w-3 h-3 text-[#FF6B00]" />
            <span>&lt;BioProcessor state="bilingual" engine="ts-compiler" layout="bento" /&gt;</span>
          </div>
        )}
        
        {/* Decorative background grids and vector particles */}
        <div className="absolute top-0 right-10 w-32 h-32 bg-[radial-gradient(rgba(255,255,255,0.015)_1.5px,transparent_1.5px)] bg-[size:10px_10px] pointer-events-none" />
        
        <div className="flex flex-col space-y-2 mb-12">
          <div className="flex items-center gap-2">
            <span className="w-6 h-0.5" style={{ backgroundColor: accentColor }} />
            <span className="text-xs tracking-widest uppercase font-black" style={{ color: accentColor }}>{t.about.mindset}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight text-left rtl:text-right font-sans">
            {t.about.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Bento Card 1: Futuristic Code Terminal Story Board (Span 7) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-zinc-950/40 border border-white/5 rounded-3xl p-6 md:p-8 relative overflow-hidden group hover:border-white/10 transition-all duration-300">
            {/* Ambient terminal backing glow */}
            <div 
              className="absolute -top-24 -left-24 w-60 h-60 rounded-full blur-[70px] opacity-5 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
              style={{ backgroundColor: accentColor }}
            />
            
            {/* Monospace tech headers */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6 font-mono">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-gray-500" />
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                  SYS_INIT :: BIOPROCESSOR_LOGS.dart
                </span>
              </div>
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500/40" />
                <span className="w-2 h-2 rounded-full bg-amber-500/40" />
                <span className="w-2 h-2 rounded-full bg-emerald-500/40" />
              </div>
            </div>

            <div className="space-y-6 text-left rtl:text-right flex-1 flex flex-col justify-center font-sans">
              {/* Core design mind quote block */}
              <div className="border-l-2 pl-4 rtl:border-l-0 rtl:border-r-2 rtl:pr-4 py-1" style={{ borderColor: accentColor }}>
                <p className="text-white text-base md:text-md font-medium leading-relaxed tracking-wide">
                  {t.about.desc1}
                </p>
              </div>
              
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                {t.about.desc2}
              </p>
            </div>

            {/* Simulated compiler line numbers */}
            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[8px] text-gray-500">
              <div className="flex gap-4">
                <span>LINE: 104 .. 240</span>
                <span>COMPILER: FLUTTER_IMP_AOT</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-400 font-bold uppercase tracking-wider">SYNC_COMPLETED (0ms)</span>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Interactive Real-Time Latency Network & Graphic Monitor (Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-zinc-950/40 border border-white/5 rounded-3xl p-6 relative overflow-hidden group hover:border-[#7B61FF]/20 transition-all duration-300">
            {/* Visual halo backing */}
            <div 
              className="absolute -bottom-24 -right-24 w-60 h-60 rounded-full blur-[70px] opacity-5 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
              style={{ backgroundColor: secondaryAccent }}
            />

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-white/5 font-mono">
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" style={{ color: secondaryAccent }} />
                  CONCURRENT SOCKET THREADS
                </span>
                <span className="text-[8px] tracking-wider uppercase font-extrabold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-emerald-400 animate-pulse">
                  SYSTEM OK
                </span>
              </div>

              {/* Grid Simulator representation of actual geometric architecture components */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black/40 border border-white/5 p-4 flex flex-col justify-between">
                <img 
                  src={aboutGeometric} 
                  alt="System Geometric Representation" 
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-25 grayscale group-hover:opacity-45 group-hover:scale-105 transition-all duration-700 pointer-events-none"
                />

                {/* Simulated telemetry metrics overlay */}
                <div className="relative z-10 flex flex-col justify-between h-full font-mono text-[8px] uppercase">
                  <div className="flex justify-between text-gray-500">
                    <span>GRID_COORDINATES // UX_3</span>
                    <span>FPS_STABILITY_PERCENT // 99%</span>
                  </div>
                  
                  {/* CSS Live Wave simulation */}
                  <div className="flex items-end justify-center gap-1 h-12 my-2">
                    {[30, 45, 25, 60, 80, 50, 65, 40, 55, 75, 90, 35, 60, 45, 50].map((h, index) => (
                      <div 
                        key={index}
                        className="w-[3px] rounded-t transition-all duration-500"
                        style={{ 
                          height: `${h}%`, 
                          backgroundColor: index % 2 === 0 ? accentColor : secondaryAccent,
                          animationDelay: `${index * 50}ms`,
                        }} 
                      />
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-[#9EFF00]" style={{ color: accentColor }}>
                    <span>NETWORK_PULSE_HEARTBEAT</span>
                    <span className="font-bold">60Hz CLOCK</span>
                  </div>
                </div>
              </div>

              {/* Extra technical parameters illustrating full system depth */}
              <div className="space-y-2 pt-2 text-[10px] text-gray-400 leading-relaxed font-light">
                <div className="flex justify-between items-center font-mono text-[8px] py-1 border-b border-white/5">
                  <span className="text-gray-400">BIOMETRIC_ENCRYPTION ::</span>
                  <span className="text-white font-bold">SHA-256 SALT</span>
                </div>
                <div className="flex justify-between items-center font-mono text-[8px] py-1 border-b border-white/5">
                  <span className="text-gray-400">WS_PING_ROUNDTRIP ::</span>
                  <span className="text-[#00D1FF] font-bold">1.2ms CONCURRENT BOUND</span>
                </div>
                <div className="flex justify-between items-center font-mono text-[8px] py-1">
                  <span className="text-gray-400">MEMORY_QUEUE ::</span>
                  <span className="text-white font-bold">REDIS PUBLISH / SUBSCRIBE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Stats Row: 4 sleek Grid Boxes */}
          <div className="lg:col-span-12 grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 font-sans">
            
            {/* Stat Box 1 */}
            <div className="bg-zinc-950/40 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all duration-300 relative group">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mb-4 text-gray-400 group-hover:bg-white/10 transition-colors">
                <Code2 className="w-4 h-4" style={{ color: accentColor }} />
              </div>
              <span className="text-4xl font-black text-white block tracking-tight">{t.about.stats.projects}</span>
              <span className="text-[10px] tracking-wider uppercase font-black block mt-1" style={{ color: accentColor }}>
                {t.about.stats.projectsSub}
              </span>
            </div>

            {/* Stat Box 2 */}
            <div className="bg-zinc-950/40 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all duration-300 relative group">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mb-4 text-gray-400 group-hover:bg-white/10 transition-colors">
                <Activity className="w-4 h-4" style={{ color: secondaryAccent }} />
              </div>
              <span className="text-4xl font-black text-white block tracking-tight">{t.about.stats.experience}</span>
              <span className="text-[10px] tracking-wider uppercase font-black block mt-1 text-gray-300">
                {t.about.stats.experienceSub}
              </span>
            </div>

            {/* Stat Box 3 */}
            <div className="bg-zinc-950/40 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all duration-300 relative group">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mb-4 text-gray-400 group-hover:bg-white/10 transition-colors">
                <Layers className="w-4 h-4" style={{ color: accentColor }} />
              </div>
              <span className="text-4xl font-black text-white block tracking-tight">{t.about.stats.clients}</span>
              <span className="text-[10px] tracking-wider uppercase font-black block mt-1 text-gray-400">
                {t.about.stats.clientsSub}
              </span>
            </div>

            {/* Stat Box 4 */}
            <div className="bg-zinc-950/40 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all duration-300 relative group">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mb-4 text-gray-400 group-hover:bg-white/10 transition-colors">
                <Shield className="w-4 h-4" style={{ color: secondaryAccent }} />
              </div>
              <span className="text-4xl font-black text-white block tracking-tight">{t.about.stats.satisfaction}</span>
              <span className="text-[10px] tracking-wider uppercase font-black block mt-1 text-[#00D1FF]">
                {t.about.stats.satisfactionSub}
              </span>
            </div>

          </div>

        </div>
      </section>


      {/* CORE SERVICES */}
      <section 
        id="services" 
        onMouseEnter={() => {
          if (devMode) setHoveredComponent({ name: 'CoreServices', selectors: 'section#services.py-24.relative.bg-black/30', size: '1240 × 580px' });
        }}
        onMouseLeave={() => {
          if (devMode) setHoveredComponent(null);
        }}
        className={`py-24 relative z-10 bg-black/30 border-y border-white/5 scroll-mt-10 transition-all duration-500 ${
          devMode ? 'border border-dashed border-[#00D1FF]/40 bg-[#00D1FF]/[0.01]' : ''
        }`}
      >
        {devMode && (
          <div className="absolute top-4 left-4 z-[40] font-mono text-[9px] bg-black/95 text-[#00D1FF] border border-[#00D1FF]/30 px-2.5 py-1 rounded flex items-center gap-1.5 select-none animate-pulse">
            <Code2 className="w-3 h-3 text-[#00D1FF]" />
            <span>&lt;ServiceRegistry registry="grpc-gateway" list="dart-transports" /&gt;</span>
          </div>
        )}
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="flex flex-col space-y-2 mb-12 text-left rtl:text-right">
            <div className="flex items-center gap-2">
              <span className="w-6 h-0.5" style={{ backgroundColor: accentColor }} />
              <span className="text-xs tracking-widest uppercase font-black" style={{ color: accentColor }}>{t.services.heading}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
              {t.services.title}
            </h2>
            <p className="text-gray-400 text-sm max-w-lg mt-1 font-light">
              {t.services.sub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {services.map((item, idx) => (
              <div 
                key={idx} 
                className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden transition-all duration-300 hover:border-white/15 hover:translate-y-[-4px] group flex flex-col justify-between min-h-[290px]"
              >
                {/* Background glow behind hover cards */}
                <div 
                  className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300"
                  style={{ backgroundColor: accentColor }}
                />

                <div className="space-y-4">
                  {/* Styled circular layout container from reference */}
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white border border-white/5 transition-colors group-hover:bg-white/10">
                    <span style={{ color: idx % 2 === 0 ? accentColor : secondaryAccent }}>
                      {item.icon}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight leading-tight group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-400 text-[11px] leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4 mt-4 flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase tracking-wider text-gray-500">
                    {lang === 'en' ? 'Focus Target' : 'هدف اصلی'}
                  </span>
                  <span className="text-[9px] font-bold text-gray-300 bg-white/5 py-0.5 px-2 rounded">
                    {item.focus}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SYSTEM ARCHITECTURE SECTION */}
      <section 
        id="architecture" 
        onMouseEnter={() => {
          if (devMode) setHoveredComponent({ name: 'SystemArchitecture', selectors: 'section#architecture.py-24.relative', size: '1240 × 784px' });
        }}
        onMouseLeave={() => {
          if (devMode) setHoveredComponent(null);
        }}
        className={`py-24 relative z-10 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-10 transition-all duration-500 ${
          devMode ? 'border border-dashed border-[#7B61FF]/40 bg-[#7B61FF]/[0.01] rounded-3xl mt-4 relative' : ''
        }`}
      >
        {devMode && (
          <div className="absolute top-4 left-4 z-[40] font-mono text-[9px] bg-black/95 text-[#7B61FF] border border-[#7B61FF]/30 px-2.5 py-1 rounded flex items-center gap-1.5 select-none animate-pulse">
            <Code2 className="w-3 h-3 text-[#7B61FF]" />
            <span>&lt;TopologySimulator driver="webGL-graph" state="active-tracer" /&gt;</span>
          </div>
        )}
        
        <div className="flex flex-col space-y-2 mb-12 text-left rtl:text-right">
          <div className="flex items-center gap-2">
            <span className="w-6 h-0.5" style={{ backgroundColor: accentColor }} />
            <span className="text-xs tracking-widest uppercase font-black" style={{ color: accentColor }}>{t.architecture.heading}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
            {t.architecture.title}
          </h2>
          <p className="text-gray-400 text-sm max-w-lg font-light">
            {lang === 'en' 
              ? "Select any of my production-grade blueprint systems below to inspect its live visual topology, and run a step-by-step network packet lookup to explore real SRE strategy points."
              : "یکی از ساختارهای واقعی زیر را انتخاب کنید تا با شبیه‌سازی گام‌به‌گام بسته‌های اطلاعات، رویکرد مهندسی SRE و سناریوهای ترافیک آن را بررسی نمایید."}
          </p>
        </div>

        {/* Blueprint Selector Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-8 justify-start relative z-10">
          {[
            { id: 'calkilo', title: lang === 'en' ? 'Calkilo AI (Nutrition)' : 'کالکیلو (هوش مصنوعی سلامت)', color: '#00D1FF' },
            { id: 'couchini', title: lang === 'en' ? 'Couchini Music (Sync)' : 'کوچینی (استریم متقارن دیره)', color: '#7B61FF' },
            { id: 'tipax', title: lang === 'en' ? 'Tipax Logistics (UDP)' : 'تیپاکس لجستیک (مکان‌یابی UDP)', color: '#FF6B00' },
            { id: 'hyperstar', title: lang === 'en' ? 'Hyperstar supply (ACID)' : 'هایپر استار انبارداری (ACID)', color: '#9EFF00' }
          ].map((tab) => {
            const isTabActive = activeBlueprintId === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveBlueprintId(tab.id);
                  setSimStep(null);
                  setActiveStepIndex(0);
                }}
                className={`px-4 py-2.5 rounded-xl border text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 relative overflow-hidden flex items-center gap-2 cursor-pointer ${
                  isTabActive 
                    ? 'text-white border-white/10' 
                    : 'text-gray-400 border-white/5 bg-white/[0.01] hover:bg-white/5 hover:text-white'
                }`}
                style={{
                  background: isTabActive ? `${tab.color}15` : '',
                  boxShadow: isTabActive ? `0 0 16px -4px ${tab.color}30` : 'none',
                  borderColor: isTabActive ? tab.color : 'transparent'
                }}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${isTabActive ? 'animate-pulse' : ''}`} style={{ backgroundColor: tab.color }} />
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Topology Container */}
        {(() => {
          const currentBlueprint = walkthroughData[activeBlueprintId] || walkthroughData.calkilo;
          const blueprintColor = activeBlueprintId === 'calkilo' ? '#00D1FF' :
                                  activeBlueprintId === 'couchini' ? '#7B61FF' :
                                  activeBlueprintId === 'tipax' ? '#FF6B00' :
                                  activeBlueprintId === 'hyperstar' ? '#9EFF00' : accentColor;

          const isWalkthroughActive = simStep !== null;
          const currentStep = isWalkthroughActive ? currentBlueprint.steps[activeStepIndex] : null;

          // Define nodes mapping for this blueprint
          const nodesConfig = [
            {
              id: 'client',
              icon: <Smartphone className="w-5 h-5" />,
              label: {
                calkilo: lang === 'en' ? "Flutter Camera Core" : "رابط کاربری فلاتر دوربین",
                couchini: lang === 'en' ? "Flutter Room Core" : "مرکز کنترل اتاق فلاتر",
                tipax: lang === 'en' ? "Driver Mobile Handset" : "اپ رانندگان فلاتر",
                hyperstar: lang === 'en' ? "POS Cash Drawer" : "گیشه پوز صندوق فروشگاهی",
              }[activeBlueprintId] || "Flutter Client",
              sub: {
                calkilo: "Dart Camera Isolates",
                couchini: "Riverpod state tree",
                tipax: "UDP compact binary",
                hyperstar: "Local invoice checkout",
              }[activeBlueprintId] || "Client App",
              badge: {
                calkilo: "120Hz Scanner",
                couchini: "Zero GC stutter",
                tipax: "Kalman Filter ON",
                hyperstar: "On-demand frame",
              }[activeBlueprintId] || "Ready"
            },
            {
              id: 'gateway',
              icon: <Shield className="w-5 h-5" />,
              label: {
                calkilo: lang === 'en' ? "Kong API Gateway" : "درگاه هوشمند Kong",
                couchini: lang === 'en' ? "Nginx Reverse Proxy" : "سرور توزیع بار Nginx",
                tipax: lang === 'en' ? "UDP Socket Gateway" : "سوکت گیت‌وی لینوکس",
                hyperstar: lang === 'en' ? "AWS Application LB" : "لود بالانسر هوشمند AWS",
              }[activeBlueprintId] || "Proxy Endpoints",
              sub: {
                calkilo: "Bearer authorization",
                couchini: "End-to-end SSL term",
                tipax: "raw epoll sockets bind",
                hyperstar: "Multizone balancing",
              }[activeBlueprintId] || "Access Ingress",
              badge: {
                calkilo: "JWT verify",
                couchini: "Decryptermined",
                tipax: "Checksum verified",
                hyperstar: "L7 routing rules",
              }[activeBlueprintId] || "Active"
            },
            {
              id: 'broker',
              icon: <Layers className="w-5 h-5" />,
              label: {
                calkilo: lang === 'en' ? "Redis Streams Broker" : "صف پیام ردیس استریم",
                couchini: lang === 'en' ? "Redis Pub/Sub Sync" : "رابط همگام‌ساز ردیس",
                tipax: lang === 'en' ? "RabbitMQ AMQP Streams" : "صف بسته‌های RabbitMQ",
                hyperstar: lang === 'en' ? "Redis Memory Lock" : "بافر موقت رم ردیس",
              }[activeBlueprintId] || "Event Buffer",
              sub: {
                calkilo: "Async queue handler",
                couchini: "Cross-cluster dispatch",
                tipax: "Persistent QoS streams",
                hyperstar: "Short-TTL mutex lock",
              }[activeBlueprintId] || "Message Queue",
              badge: {
                calkilo: "XADD streams OK",
                couchini: "Channels active",
                tipax: "Zero loss logs",
                hyperstar: "Lock verified",
              }[activeBlueprintId] || "Broker OK"
            },
            {
              id: 'worker',
              icon: <Cpu className="w-5 h-5" />,
              label: {
                calkilo: lang === 'en' ? "YOLOv8 ONNX (GPU)" : "طبقه‌بندی تصویر YOLO",
                couchini: lang === 'en' ? "FastAPI WS daemon" : "پیشران وب‌سوکت صوتی",
                tipax: lang === 'en' ? "SRE Path Solver (C++)" : "حل‌کننده TSP لجستیک",
                hyperstar: lang === 'en' ? "FastAPI Ledger Engine" : "موتور انبارگردانی کانتینر",
              }[activeBlueprintId] || "Inference Workers",
              sub: {
                calkilo: "CUDA accelerated frames",
                couchini: "Active room frames",
                tipax: "TSP heuristics algorithms",
                hyperstar: "Inventory balancer",
              }[activeBlueprintId] || "Compute Instance",
              badge: {
                calkilo: "CUDA v12.2",
                couchini: "Pitch pitch adjust",
                tipax: "Route optimal",
                hyperstar: "Celery task async",
              }[activeBlueprintId] || "Compute Ready"
            },
            {
              id: 'database',
              icon: <Database className="w-5 h-5" />,
              label: {
                calkilo: lang === 'en' ? "PostgreSQL pg_vector" : "پستگرس برداری pg_vector",
                couchini: lang === 'en' ? "S3 Storage + SQLite" : "سطل کلاود + دیتابیس بومی",
                tipax: lang === 'en' ? "PostGIS Spatial Nodes" : "خوشه فضایی PostGIS",
                hyperstar: lang === 'en' ? "PostgreSQL Transac Pool" : "مخزن اتومیک Postgres",
              }[activeBlueprintId] || "Core Storage",
              sub: {
                calkilo: "Cosine similarity search",
                couchini: "Symmetric key indices",
                tipax: "GIST indexing geometry",
                hyperstar: "Master Write / Read split",
              }[activeBlueprintId] || "Database Shard",
              badge: {
                calkilo: "pg_vector indices",
                couchini: "Encrypted AES CTR",
                tipax: "ST_Geometry active",
                hyperstar: "Row lock SELECT UPDATE",
              }[activeBlueprintId] || "Persisted"
            }
          ];

          return (
            <div className="glass-card rounded-2xl border border-white/5 p-6 md:p-10 relative overflow-hidden transition-all duration-500">
              
              {/* Radar sweep ambient glow */}
              <div 
                className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent h-1/2 w-full top-0 left-0 animate-[bounce_16s_infinite] pointer-events-none" 
                style={{ content: '""' }}
              />

              {/* Dynamic HUD Control Header */}
              <div className="flex flex-wrap items-center justify-between border-b border-white/5 pb-4 mb-8 gap-4">
                <div className="flex items-center gap-3">
                  <div 
                    className={`w-3 h-3 rounded-full ${isWalkthroughActive ? 'animate-pulse' : 'animate-ping'}`} 
                    style={{ backgroundColor: blueprintColor }} 
                  />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-white flex items-center gap-2">
                    <span>{currentBlueprint.projectName[lang]}</span>
                    <span className="text-gray-500 text-[10px]">({activeBlueprintId}_blueprint.yml)</span>
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-[10px] font-mono text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded bg-cyan-400 animate-pulse" />
                    <span>{lang === 'en' ? 'SRE status' : 'وضعیت مهندسی'}: {isWalkthroughActive ? 'TRANSMITTING' : 'HEARTBEAT_ACTIVE'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded bg-emerald-400" />
                    <span>Ping: {isWalkthroughActive ? '1.2ms' : '14ms'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: blueprintColor }} />
                    <span>Traffic: {isWalkthroughActive ? 'SINGLE_PACKET' : '2,420 rps'}</span>
                  </div>
                </div>
              </div>

              {/* Diagrams graphical nodes node layers */}
              <div className="grid grid-cols-1 md:grid-cols-9 gap-4 items-center relative z-10 py-6">
                {nodesConfig.map((node, i) => {
                  const isNodeFocused = !isWalkthroughActive || currentStep?.activeNodes.includes(node.id);
                  const isNodeLastStep = isWalkthroughActive && activeStepIndex === 4 && node.id === 'client';
                  const isNodeActiveColor = isNodeFocused || isNodeLastStep;
                  const isNodeSelected = selectedNodeId === node.id;

                  return (
                    <React.Fragment key={node.id}>
                      {/* Node wrapper */}
                      <div 
                        onClick={() => {
                          if (!isWalkthroughActive) {
                            setSelectedNodeId(node.id);
                          }
                        }}
                        className={`md:col-span-1 glass-card rounded-2xl p-4 border relative flex flex-col items-center group transition-all duration-500 cursor-pointer ${
                          isNodeActiveColor 
                            ? isNodeSelected && !isWalkthroughActive
                              ? 'scale-105 ring-1 ring-offset-2 ring-offset-black'
                              : 'border-white/20 hover:border-white/40' 
                            : 'opacity-25 blur-[0.4px] border-white/5'
                        }`}
                        style={{
                          boxShadow: isNodeActiveColor 
                            ? isNodeSelected && !isWalkthroughActive
                              ? `0 0 32px -4px ${blueprintColor}80`
                              : `0 0 24px -6px ${blueprintColor}30` 
                            : 'none',
                          borderColor: isNodeActiveColor 
                            ? isNodeSelected && !isWalkthroughActive
                              ? blueprintColor
                              : `${blueprintColor}45` 
                            : '',
                        }}
                        id={`topology-node-${node.id}`}
                      >
                        {/* Upper Active Glow dot */}
                        <div 
                          className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full transition-all duration-500" 
                          style={{ backgroundColor: isNodeActiveColor ? blueprintColor : 'transparent' }} 
                        />

                        {/* Node Icon Holder */}
                        <div 
                          className="w-11 h-11 rounded-full border flex items-center justify-center mb-3 transition-colors duration-500"
                          style={{
                            backgroundColor: isNodeActiveColor ? `${blueprintColor}09` : 'rgba(255,255,255,0.02)',
                            borderColor: isNodeActiveColor ? `${blueprintColor}30` : 'rgba(255,255,255,0.05)',
                            color: isNodeActiveColor ? blueprintColor : '#9CA3AF'
                          }}
                        >
                          {node.icon}
                        </div>

                        {/* Labels stack */}
                        <span className="text-[10.5px] font-black uppercase text-white tracking-wider text-center block max-w-full truncate leading-tight">
                          {node.label}
                        </span>
                        <span className="text-[8px] text-gray-500 mt-1 uppercase tracking-widest font-mono text-center block truncate max-w-full">
                          {node.sub}
                        </span>

                        <div 
                          className="mt-3 text-[8.5px] font-mono text-gray-400 bg-black/40 px-2.5 py-1 rounded-md border border-white/5 text-center leading-none"
                        >
                          {node.badge}
                        </div>
                      </div>

                      {/* Connection arrow between nodes */}
                      {i < 4 && (
                        <div className="md:col-span-1 hidden md:flex flex-col items-center justify-center relative py-4">
                          <span className="text-[8px] font-mono text-gray-600 mb-1 tracking-widest uppercase">
                            {
                              ['HTTP/gRPC', 'Ingress', 'Broker Stream', 'Daemon Write'][i]
                            }
                          </span>
                          
                          {/* Central Line */}
                          <div className="w-full h-[1px] bg-white/5 relative">
                            {/* Animated telemetry packet traveling */}
                            {((!isWalkthroughActive && activePacket === i) || (isWalkthroughActive && activeStepIndex === i)) && (
                              <div 
                                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full animate-pulse transition-all duration-300"
                                style={{ 
                                  backgroundColor: blueprintColor, 
                                  boxShadow: `0 0 8px ${blueprintColor}`,
                                  left: '50%'
                                }}
                              />
                            )}
                          </div>

                          <ChevronRight className="w-3.5 h-3.5 text-gray-600 mt-1 rtl:rotate-180" style={{ color: ((!isWalkthroughActive && activePacket === i) || (isWalkthroughActive && activeStepIndex === i)) ? blueprintColor : '' }} />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Dynamic Walkthrough Controller Desk Deck */}
              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                
                {/* Status message */}
                <div className="text-left rtl:text-right">
                  {!isWalkthroughActive ? (
                    <div>
                      <span className="text-[#00FF66] bg-[#00FF66]/5 px-2.5 py-1 rounded text-[9px] uppercase font-mono font-bold tracking-widest inline-block mb-1.5 border border-[#00FF66]/10">
                        {lang === 'en' ? '● PASSIVE HEARBEAT_OK' : '● پایش فعال خودکار'}
                      </span>
                      <p className="text-xs text-gray-400 max-w-md font-light">
                        {lang === 'en' 
                          ? "The system is in passive auto-heartbeat telemetry mode. Click nodes to view code structures, toggle stress metrics below, or start the step-by-step transaction walkthrough."
                          : "سیستم در وضعیت خودکار پایش ترافیک است. روی معماری گره‌ها کلیک کنید، آزمایش بار کلاود را فعال سازید یا شروع شبیه‌سازی گام‌به‌گام پکت را آغاز نمایید."}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <span className="px-2.5 py-1 rounded text-[9px] uppercase font-mono font-bold tracking-widest inline-block mb-1.5 border"
                            style={{ 
                              color: blueprintColor, 
                              backgroundColor: `${blueprintColor}10`,
                              borderColor: `${blueprintColor}20`
                            }}
                      >
                        {lang === 'en' ? `● SIMULATION_ACTIVE: STEP ${activeStepIndex + 1} OF 5` : `● شبیه‌سازی فعال: گام ${activeStepIndex + 1} از ۵`}
                      </span>
                      <h4 className="text-sm font-bold text-white tracking-tight uppercase" style={{ color: blueprintColor }}>
                        {currentStep?.title[lang]}
                      </h4>
                    </div>
                  )}
                </div>

                {/* Control Action Buttons Panel */}
                <div className="flex flex-wrap items-center gap-3">
                  {!isWalkthroughActive ? (
                    <button
                      onClick={() => {
                        setSimStep(1);
                        setActiveStepIndex(0);
                      }}
                      className="px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider text-black bg-white hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 shadow-lg cursor-pointer"
                      style={{
                        backgroundColor: blueprintColor,
                        boxShadow: `0 8px 24px -6px ${blueprintColor}`
                      }}
                    >
                      <Play className="w-3.5 h-3.5 fill-black" />
                      <span>{lang === 'en' ? "Simulate Live Packet Walkthrough" : "شروع شبیه‌سازی قدم به قدم پکت"}</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      {/* Back button */}
                      <button
                        onClick={() => {
                          if (activeStepIndex > 0) {
                            setActiveStepIndex(prev => prev - 1);
                          }
                        }}
                        disabled={activeStepIndex === 0}
                        className={`px-3 py-2.5 rounded-xl border text-xs font-mono font-bold uppercase transition-all duration-200 cursor-pointer ${
                          activeStepIndex === 0 
                            ? 'text-gray-600 border-white/5 bg-white/[0.01] cursor-not-allowed' 
                            : 'text-gray-300 border-white/10 bg-white/5 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {lang === 'en' ? "Back" : "عقب"}
                      </button>

                      {/* Next/Finish button */}
                      <button
                        onClick={() => {
                          if (activeStepIndex < 4) {
                            setActiveStepIndex(prev => prev + 1);
                          } else {
                            // Reset to passive mode
                            setSimStep(null);
                            setActiveStepIndex(0);
                          }
                        }}
                        className="px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-black transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                        style={{
                          backgroundColor: blueprintColor,
                          boxShadow: `0 4px 16px -4px ${blueprintColor}`
                        }}
                      >
                        <span>{activeStepIndex === 4 ? (lang === 'en' ? "Complete Sim" : "اتمام فرآیند") : (lang === 'en' ? "Next Step" : "گام بعدی")}</span>
                        <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                      </button>

                      <div className="w-[1px] h-6 bg-white/10 mx-2" />

                      {/* Exit dynamic simulator */}
                      <button
                        onClick={() => {
                          setSimStep(null);
                          setActiveStepIndex(0);
                        }}
                        className="px-3 py-2.5 rounded-xl text-xs font-mono text-gray-400 hover:text-red-400 hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 transition-all duration-200 cursor-pointer"
                      >
                        {lang === 'en' ? "Exit" : "خروج"}
                      </button>
                    </div>
                  )}
                </div>

              </div>

              {/* Dynamic Technical Core Deep-Dive Board */}
              <AnimatePresence mode="wait">
                {isWalkthroughActive && currentStep && (
                  <motion.div
                    key={`${activeBlueprintId}_step_${activeStepIndex}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-10 border-t border-white/5 pt-8 z-10 relative text-left rtl:text-right"
                  >
                    {/* Left 5 cols: Code/Payload Inspect */}
                    <div className="lg:col-span-5 flex flex-col space-y-4">
                      
                      {/* Frame Description */}
                      <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                        <span className="text-[10px] font-mono text-gray-500 block mb-1 uppercase tracking-wider">
                          {lang === 'en' ? "TRANSMISSION METADATA" : "جزئیات انتقال بسته"}
                        </span>
                        <p className="text-xs text-[#D7E2EA] font-light leading-relaxed">
                          {currentStep.desc[lang]}
                        </p>
                      </div>

                      {/* Network Packet Editor Inspector */}
                      <div className="bg-[#030304] rounded-xl border border-white/5 overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.02] border-b border-white/5">
                          <span className="text-[10px] font-mono text-gray-400 flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5" style={{ color: blueprintColor }} />
                            <span>{currentStep.protocol}</span>
                          </span>
                          
                          <button
                            onClick={() => handleCopyPayload(currentStep.payload)}
                            className="px-2.5 py-1 rounded bg-white/5 text-[9.5px] font-mono text-gray-400 hover:bg-white/10 hover:text-white transition-colors duration-150 cursor-pointer"
                          >
                            {copiedPayload ? (lang === 'en' ? "Copied!" : "کپی شد!") : (lang === 'en' ? "Copy Payload" : "کپی پکت")}
                          </button>
                        </div>

                        {/* Payload Viewer Container */}
                        <div className="p-4 font-mono text-[10px] text-gray-300 leading-relaxed overflow-x-auto max-h-[160px] bg-black/40">
                          <pre className="whitespace-pre">
                            {currentStep.payload.split('\n').map((line, lid) => {
                              // basic syntax highlights mock values
                              const keyColor = blueprintColor;
                              return (
                                <div key={lid} className="table-row">
                                  <span className="table-cell select-none text-gray-600 text-[8px] pr-3 text-right w-4">{lid + 1}</span>
                                  <span className="table-cell">
                                    {line.replace(/"([^"]+)":/g, `<span style="color: ${keyColor}">"$1"</span>:`).replace(/: "([^"]+)"/g, ': <span class="text-emerald-400">"$1"</span>')}
                                  </span>
                                </div>
                              );
                            })}
                          </pre>
                        </div>
                      </div>

                      {/* Live step corresponding software logs */}
                      <div className="bg-[#040405] rounded-xl p-4 border border-white/5 font-mono text-[9px] text-gray-500 leading-relaxed max-h-[110px] overflow-y-auto">
                        <span className="block text-[8px] text-gray-600 uppercase tracking-widest mb-1">
                          {lang === 'en' ? "machine_hardware_logs" : "رویدادهای کنسول اتمیک"}
                        </span>
                        {currentStep.systemLogs.map((log, logIdx) => (
                          <div key={logIdx} className="truncate select-none">
                            <span style={{ color: blueprintColor }}>&gt;</span> {log}
                          </div>
                        ))}
                      </div>

                    </div>

                    {/* Right 7 cols: SRE Engineering Strategy explanation */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                      
                      {/* Protocol Selection explanation */}
                      <div className="bg-white/[0.01] rounded-2xl border border-white/5 p-5 flex flex-col justify-between h-full relative overflow-hidden group">
                        
                        {/* Abstract background vector glow of blueprint brand */}
                        <div 
                          className="absolute -right-24 -top-24 w-48 h-48 rounded-full blur-[90px] opacity-[0.06] transition-all duration-500 pointer-events-none"
                          style={{ backgroundColor: blueprintColor }}
                        />

                        <div className="space-y-4 text-left rtl:text-right">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                              <Shield className="w-4 h-4" style={{ color: blueprintColor }} />
                            </div>
                            <div>
                              <span className="text-[10px] font-mono text-gray-500 block tracking-widest leading-none uppercase">
                                {lang === 'en' ? 'PROTOCOL SPECIFICATION' : 'پروتکل و منطق شبکه'}
                              </span>
                              <span className="text-xs font-bold font-mono text-gray-300">
                                {currentStep.protocol}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <h5 className="text-[11px] uppercase font-black tracking-widest text-gray-400">
                              {lang === 'en' ? 'Why this protocol is chosen for production:' : 'چرا این پروتکل برای محیط پروداکشن انتخاب شده؟'}
                            </h5>
                            <p className="text-xs text-gray-400 font-light leading-relaxed">
                              {currentStep.reason[lang]}
                            </p>
                          </div>
                        </div>

                        {/* Engineering Strategy Challenge Box */}
                        <div 
                          className="mt-6 border-t border-white/5 pt-5 text-left rtl:text-right space-y-2.5"
                        >
                          <div className="flex items-center gap-1.5">
                            <Activity className="w-4 h-4 shrink-0" style={{ color: blueprintColor }} />
                            <h4 className="text-xs font-black uppercase tracking-widest text-[#D7E2EA]">
                              {lang === 'en' ? 'SRE PRODUCTION COMPLIANCE' : 'مزیت پایداری و مهندسی سیستم‌ها'}
                            </h4>
                          </div>
                          
                          <p className="text-xs text-gray-400 font-light leading-relaxed">
                            {currentStep.challenge[lang]}
                          </p>
                        </div>

                      </div>

                    </div>
                  </motion.div>
                )}

                {!isWalkthroughActive && (
                  <motion.div
                    key="sre_dashboard"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-10 border-t border-white/5 pt-8 z-10 relative text-left rtl:text-right"
                  >
                    {/* Left Panel: Telemetry Metrics & Chaos Injection controls */}
                    <div className="lg:col-span-7 flex flex-col space-y-6">
                      
                      {/* Metric widgets block */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {/* Metric 1: Throughput */}
                        <div className="bg-black/35 rounded-xl p-4 border border-white/5 relative overflow-hidden group">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">
                              {lang === 'en' ? 'Throughput / Queue' : 'نرخ عبور صف'}
                            </span>
                            <Activity className="w-3.5 h-3.5" style={{ color: blueprintColor }} />
                          </div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-xl font-black font-mono text-white animate-[pulse_2s_infinite]">
                              {topologyStats.throughput.toLocaleString()}
                            </span>
                            <span className="text-[9px] text-gray-400 font-mono">req/s</span>
                          </div>
                          <div className="mt-2.5 flex items-center gap-1">
                            <span className={`w-1.5 h-1.5 rounded-full ${surgeActive ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'}`} />
                            <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">
                              {surgeActive 
                                ? (lang === 'en' ? 'TRAFFIC SURGE ACTIVE' : 'بار ترافیک سنگین فعال') 
                                : (lang === 'en' ? 'STABLE CONGESTION' : 'بهینه و بدون تاخیر')}
                            </span>
                          </div>
                        </div>

                        {/* Metric 2: Network Latency */}
                        <div className="bg-black/35 rounded-xl p-4 border border-white/5 relative overflow-hidden group">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">
                              {lang === 'en' ? 'Internal Latency' : 'تاخیر کل شبکه'}
                            </span>
                            <Zap className="w-3.5 h-3.5" style={{ color: blueprintColor }} />
                          </div>
                          <div className="flex items-baseline gap-1">
                            <span className={`text-xl font-black font-mono ${
                              topologyStats.latency > 150 ? 'text-red-400 animate-pulse' :
                              topologyStats.latency > 50 ? 'text-amber-400' : 'text-cyan-400'
                            }`}>
                              {topologyStats.latency}
                            </span>
                            <span className="text-[9px] text-gray-400 font-mono">ms</span>
                          </div>
                          <div className="mt-2.5 flex items-center gap-1">
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              topologyStats.latency > 150 ? 'bg-red-500 animate-ping' :
                              topologyStats.latency > 50 ? 'bg-amber-500' : 'bg-[#00FF66]'
                            }`} />
                            <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">
                              {topologyStats.latency > 150 ? (lang === 'en' ? 'HIGH LATENCY ALERT' : 'هشدار تاخیر شبکه') : (lang === 'en' ? 'FAST RESPONSE' : 'تضمین پاسخ سریع')}
                            </span>
                          </div>
                        </div>

                        {/* Metric 3: Packet Error Rate */}
                        <div className="bg-black/35 rounded-xl p-4 border border-white/5 relative overflow-hidden group">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">
                              {lang === 'en' ? 'Outages / Errors' : 'خطای تراکنش کانتینر'}
                            </span>
                            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                          </div>
                          <div className="flex items-baseline gap-1">
                            <span className={`text-xl font-black font-mono ${topologyStats.errorRate > 5 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                              {topologyStats.errorRate}%
                            </span>
                          </div>
                          <div className="mt-2.5 flex items-center gap-1">
                            <span className={`w-1.5 h-1.5 rounded-full ${chaosActive ? 'bg-red-500 animate-ping' : 'bg-emerald-400'}`} />
                            <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">
                              {chaosActive 
                                ? (lang === 'en' ? 'CHAOS INJECTION HIGH' : 'آشوب: وقوع خطای کاذب') 
                                : (lang === 'en' ? 'ZERO LOSS CHANNELS' : 'شبکه بدون تلف')}
                            </span>
                          </div>
                        </div>

                        {/* Metric 4: CPU Clusters load */}
                        <div className="bg-black/35 rounded-xl p-4 border border-white/5 relative overflow-hidden group col-span-2 md:col-span-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">
                              {lang === 'en' ? 'Thread Saturation' : 'اشباع نخ‌های CPU'}
                            </span>
                            <Cpu className="w-3.5 h-3.5" style={{ color: blueprintColor }} />
                          </div>
                          <div className="flex items-baseline gap-1 mb-2">
                            <span className="text-sm font-black font-mono text-white">
                              {topologyStats.cpuPercent}%
                            </span>
                            <span className="text-[8px] text-gray-500 font-mono">cluster load</span>
                          </div>
                          {/* Progress bar */}
                          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-500 ${
                                topologyStats.cpuPercent > 80 ? 'bg-red-500' :
                                topologyStats.cpuPercent > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                              }`} 
                              style={{ width: `${topologyStats.cpuPercent}%` }}
                            />
                          </div>
                        </div>

                        {/* Metric 5: Redis Cache Hit */}
                        <div className="bg-black/35 rounded-xl p-4 border border-white/5 relative overflow-hidden group col-span-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">
                              {lang === 'en' ? 'L1 Memory Cache Hit' : 'ضریب کارایی کش ردیس'}
                            </span>
                            <Database className="w-3.5 h-3.5" style={{ color: blueprintColor }} />
                          </div>
                          <div className="flex items-baseline gap-1 mb-2">
                            <span className={`text-base font-black font-mono ${cachePurged ? 'text-red-400' : 'text-emerald-400'}`}>
                              {topologyStats.cacheHitRate}%
                            </span>
                            <span className="text-[8px] text-gray-500 font-mono">Redis match</span>
                          </div>
                          {/* Progress bar */}
                          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-500 ${
                                cachePurged ? 'bg-red-500' : 'bg-emerald-400'
                              }`} 
                              style={{ width: `${topologyStats.cacheHitRate}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Automation Chaos engineering Control deck panel */}
                      <div className="bg-[#030304]/60 rounded-2xl border border-white/5 p-5 text-left rtl:text-right">
                        <span className="text-[9.5px] font-mono text-gray-500 block mb-4 uppercase tracking-widest text-[#D7E2EA]">
                          🛡️ {lang === 'en' ? 'SRE SCENARIO TESTING DECK' : 'کنسول مدیریت آشوب و آزمایش مقیاس‌پذیری SRE'}
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          
                          {/* Button 1: Traffic Surge */}
                          <button
                            onClick={() => {
                              setSurgeActive(!surgeActive);
                              setTerminalLogs((prev) => [
                                ...prev.slice(-25),
                                surgeActive 
                                  ? `[SRE-WARM] [${new Date().toISOString().slice(11, 19)}] Spiked-load simulations terminated. Traffic cooled down to regular values.`
                                  : `[SRE-ALERT] [${new Date().toISOString().slice(11, 19)}] Initiating flood-load testing. Spatially broadcasting concurrent packets!`,
                              ]);
                            }}
                            className={`p-3.5 rounded-xl border text-xs font-mono font-bold flex flex-col items-start gap-1 justify-between transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                              surgeActive 
                                ? 'text-[#FF6B00] border-[#FF6B00]/40' 
                                : 'text-gray-400 border-white/5 bg-white/[0.01] hover:bg-white/5 hover:text-white'
                            }`}
                            style={{ background: surgeActive ? 'rgba(255,107,0,0.08)' : '' }}
                          >
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4 shrink-0" />
                              <span className="uppercase tracking-wider">
                                {surgeActive 
                                  ? (lang === 'en' ? 'Damping Traffic Flood' : 'کاهش بار ترافیک') 
                                  : (lang === 'en' ? 'Simulate 12x Traffic Flood' : 'انفجار ۱۲ برابری ترافیک')}
                              </span>
                            </div>
                            <span className="text-[8px] text-gray-500 font-normal leading-normal text-left rtl:text-right mt-1.5 font-sans">
                              {lang === 'en' 
                                ? 'Floods the reverse proxy with spiked concurrent transaction packets to test API thread pools.' 
                                : 'سرریز پکت‌های تراکنش با فشار بالا جهت سنجش توان پاسخ میکروسرویس‌های FastAPI.'}
                            </span>
                          </button>

                          {/* Button 2: Chaos Monkey */}
                          <button
                            onClick={() => {
                              if (!chaosActive) {
                                setChaosActive(true);
                                setChaosNode('database');
                                setTerminalLogs((prev) => [
                                  ...prev.slice(-25),
                                  `[SRE-CRITICAL] [${new Date().toISOString().slice(11, 19)}] Inoculator triggered: terminated main Postgres database node.`,
                                  `[SRE-WARN] [${new Date().toISOString().slice(11, 19)}] Network timeouts occurring! Outages rose to 25.4%.`,
                                  `[SRE-HEAL] [${new Date().toISOString().slice(11, 19)}] Kube-Scheduler active! Running automated replica swap-out.`,
                                ]);
                              }
                            }}
                            disabled={chaosActive}
                            className={`p-3.5 rounded-xl border text-xs font-mono font-bold flex flex-col items-start gap-1 justify-between transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                              chaosActive 
                                ? 'text-red-400 border-red-500/40 opacity-75 cursor-not-allowed' 
                                : 'text-gray-400 border-white/5 bg-white/[0.01] hover:bg-white/5 hover:text-white'
                            }`}
                            style={{ background: chaosActive ? 'rgba(239,68,68,0.08)' : '' }}
                          >
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 shrink-0" />
                              <span className="uppercase tracking-wider">
                                {chaosActive 
                                  ? (lang === 'en' ? 'Self-Healing Pod (k8s)...' : 'خود ترمیمی کانتینر فلاتر...') 
                                  : (lang === 'en' ? 'Release Chaos Monkey / Kill Pod' : 'کشتن گره دیتابیس (آشوب)')}
                              </span>
                            </div>
                            <span className="text-[8px] text-gray-500 font-normal leading-normal text-left rtl:text-right mt-1.5 font-sans">
                              {lang === 'en' 
                                ? 'Terminates active worker pod to trigger automated Kubernetes replication self-healing.' 
                                : 'کشتن آنی کانتینر دیتابیس برای به تصویر کشیدن خود ترمیمی خودکار در بستر ابری.'}
                            </span>
                          </button>

                          {/* Button 3: Redis Cache Purge */}
                          <button
                            onClick={() => {
                              if (!cachePurged) {
                                setCachePurged(true);
                                setTerminalLogs((prev) => [
                                  ...prev.slice(-25),
                                  `[SRE-CMD] [${new Date().toISOString().slice(11, 19)}] FlushRedis command manual override issued.`,
                                  `[REDIS] [${new Date().toISOString().slice(11, 19)}] Evicted 24,000 index keys. Cache hit collapsed to 12.4%.`,
                                  `[PG-WARN] [${new Date().toISOString().slice(11, 19)}] Heavy non-indexed fallback queries directly hitting read replicas!`,
                                ]);
                              }
                            }}
                            disabled={cachePurged}
                            className={`p-3.5 rounded-xl border text-xs font-mono font-bold flex flex-col items-start gap-1 justify-between transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                              cachePurged 
                                ? 'text-amber-400 border-amber-500/40 opacity-75 cursor-not-allowed' 
                                : 'text-gray-400 border-white/5 bg-white/[0.01] hover:bg-white/5 hover:text-white'
                            }`}
                            style={{ background: cachePurged ? 'rgba(245,158,11,0.08)' : '' }}
                          >
                            <div className="flex items-center gap-2">
                              <RefreshCw className="w-4 h-4 shrink-0" />
                              <span className="uppercase tracking-wider">
                                {cachePurged 
                                  ? (lang === 'en' ? 'Re-warming L1 Cache...' : 'در حال پیش‌گرم کردن کش...') 
                                  : (lang === 'en' ? 'Purge Memory Cache Pool' : 'تخلیه آنی فضای کش ردیس')}
                              </span>
                            </div>
                            <span className="text-[8px] text-gray-500 font-normal leading-normal text-left rtl:text-right mt-1.5 font-sans">
                              {lang === 'en' 
                                ? 'Evicts Redis cache pool. Shows severe fallback database execution and latency lag.' 
                                : 'خالی کردن آنی رم ردیس با پایش کندی موقت پاسخ دیتابیس اصلی.'}
                            </span>
                          </button>

                          {/* Button 4: CI/CD Deploy Rollout */}
                          <button
                            onClick={() => {
                              if (!deploying) {
                                setDeploying(true);
                                setDeployProgress(0);
                                setTerminalLogs((prev) => [
                                  ...prev.slice(-25),
                                  `[CI-CD] [${new Date().toISOString().slice(11, 19)}] Triggering Blue-Green Kubernetes deployment pipeline...`,
                                  `[CI-CD] [${new Date().toISOString().slice(11, 19)}] Compiling Flutter / Dart source branches with fast null safety.`,
                                  `[CI-CD] [${new Date().toISOString().slice(11, 19)}] Standardized lint successfully verified.`,
                                ]);
                              }
                            }}
                            disabled={deploying}
                            className={`p-3.5 rounded-xl border text-xs font-mono font-bold flex flex-col items-start gap-1 justify-between transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                              deploying 
                                ? 'text-emerald-400 border-emerald-500/40' 
                                : 'text-gray-400 border-white/5 bg-white/[0.01] hover:bg-white/5 hover:text-white'
                            }`}
                            style={{ background: deploying ? 'rgba(16,185,129,0.08)' : '' }}
                          >
                            <div className="flex items-center gap-2">
                              <Workflow className="w-4 h-4 shrink-0" />
                              <span className="uppercase tracking-wider">
                                {deploying 
                                  ? `${lang === 'en' ? 'Deploying Rollout:' : 'در حال استقرار:'} ${deployProgress}%` 
                                  : (lang === 'en' ? 'Run Blue-Green CI/CD Deploy' : 'اجرای استقرار بدون سرکوب')}
                              </span>
                            </div>
                            <span className="text-[8px] text-gray-500 font-normal leading-normal text-left rtl:text-right mt-1.5 font-sans">
                              {lang === 'en' 
                                ? 'Launches automated Kubernetes rolling updates. Deploys updated specs with zero downtime.' 
                                : 'اجرای سناریوی ریلیز مداوم نسخه‌های ابری فلاتر و پایتون با مانیتور درجا.'}
                            </span>
                          </button>

                        </div>

                        {/* Rollout Progress Meter */}
                        {deploying && (
                          <div className="mt-4 bg-[#0a0a0c] p-3 rounded-lg border border-white/5 space-y-2">
                            <div className="flex justify-between items-center text-[9px] font-mono">
                              <span className="text-gray-400 uppercase tracking-widest">{lang === 'en' ? 'Compiling & Rollout pods...' : 'در حال کامپایل و استقرار پادها...'}</span>
                              <span className="text-emerald-400">{deployProgress}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${deployProgress}%` }} />
                            </div>
                          </div>
                        )}
                      </div>

                    </div>

                    {/* Right Panel: Interactive Node Specs and Terminal Logging live loop */}
                    <div className="lg:col-span-5 flex flex-col space-y-6">
                      
                      {/* Node Specifications Inspect Box */}
                      <div className="bg-[#030304]/80 rounded-2xl border border-white/5 p-5 relative overflow-hidden text-left rtl:text-right">
                        <div 
                          className="absolute -right-24 -top-24 w-48 h-48 rounded-full blur-[90px] opacity-[0.06] pointer-events-none"
                          style={{ backgroundColor: blueprintColor }}
                        />
                        
                        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4 border-b border-white/5 pb-3">
                          <div className="flex items-center gap-2">
                            <Code2 className="w-4 h-4" style={{ color: blueprintColor }} />
                            <span className="text-[10px] font-mono font-bold tracking-widest text-white uppercase block">
                              {lang === 'en' ? 'Active Node Specifications' : 'کنسول کدهای اختصاصی آرجیتک گره'}
                            </span>
                          </div>

                          {/* Interactive tab selector */}
                          <div className="flex items-center bg-black/40 border border-white/10 p-0.5 rounded-lg text-[9px] font-mono">
                            <button
                              onClick={() => setNodeActiveTab('OVERVIEW')}
                              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                                nodeActiveTab === 'OVERVIEW' 
                                  ? 'bg-white/10 text-white font-bold' 
                                  : 'text-gray-400 hover:text-white'
                              }`}
                            >
                              {lang === 'en' ? 'OVERVIEW' : 'بررسی کلی'}
                            </button>
                            <button
                              onClick={() => setNodeActiveTab('SOURCE')}
                              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                                nodeActiveTab === 'SOURCE' 
                                  ? 'bg-white/10 text-white font-bold' 
                                  : 'text-gray-400 hover:text-white'
                              }`}
                            >
                              {lang === 'en' ? 'SOURCE_CODE' : 'کد منبع'}
                            </button>
                          </div>
                        </div>

                        {/* Selected Node representation block */}
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center text-gray-400" style={{ color: blueprintColor }}>
                                {nodesConfig.find(n => n.id === selectedNodeId)?.icon || <Smartphone className="w-4 h-4" />}
                              </div>
                              <span className="text-xs font-bold font-mono text-gray-200 tracking-tight uppercase">
                                {nodesConfig.find(n => n.id === selectedNodeId)?.label}
                              </span>
                            </div>

                            <span className="text-[8px] font-mono text-gray-500 bg-white/5 px-2 py-0.5 rounded">
                              {selectedNodeId === 'client' ? 'main.dart' :
                               selectedNodeId === 'gateway' ? 'nginx.conf' :
                               selectedNodeId === 'broker' ? 'broker.ts' :
                               selectedNodeId === 'worker' ? 'main.py' : 'database.sql'}
                            </span>
                          </div>

                          {nodeActiveTab === 'OVERVIEW' ? (
                            <div className="space-y-3">
                              <p className="text-xs text-gray-400 font-light leading-relaxed min-h-[96px] font-sans">
                                {(() => {
                                  const descriptions: Record<string, { en: string; fa: string }> = {
                                    client: {
                                      en: "Flutter client application compiled into optimized, dual-engine ARM64 binary. Leverages asynchronous Dart Isolates for background compression, ensuring zero garbage-collector stutters and keeping the camera UI fluid at locked 120Hz.",
                                      fa: "کدهای کلاینت فلاتر که به کدهای بومی ماشین ARM64 کامپایل شده‌اند. استفاده از ترد مستقل Dart Isolate با شیدرهای پیشرفته رندر که بازسازی انیمیشن‌ها را بدون تأخیر در نرخ نوسازی بالا (۱۲۰ هرتز) حفظ می‌کند."
                                    },
                                    gateway: {
                                      en: "Kong / Nginx API Gateway configured to intercept and inspect TLS 1.3 payloads. Leverages sub-millisecond route matching against JWT whitelist cached in memory, preventing unauthorized queries from exhausting worker processes.",
                                      fa: "دروازه‌ ورودی مدیریت Kong که برای پایش کوئری‌های ورودی از بستر TLS 1.3 تنظیم شده است. این دروازه توزیع فرکانس‌ها را در صدم میلی‌ثانیه‌ای اعتبار سنجی کرده و از هدررفت منابع پس‌زمینه در مقابل ربات‌ها جلوگیری می‌کند."
                                    },
                                    broker: {
                                      en: "Redis streams and RabbitMQ event message queues. Implements asynchronous back-pressured pipelines with strict QoS delivery guarantees. Provides parallel channels to balance heavy real-time tracking signals cleanly across workers.",
                                      fa: "صف‌های پیام‌رسانی غیرهمزمان ردیس استریم و AMQP RabbitMQ برای کانال‌کشی پکت‌ها. تخصیص تضمین تحویل رویداد بدون هدررفت داده‌ها جهت توزیع جریان عظیم موقعیت جغرافیایی و لایو استریم‌ها."
                                    },
                                    worker: {
                                      en: "FastAPI ASGI threads running asynchronously in Python with uvicorn workers. Leverages CUDA-accelerated model frames or geographic path heuristics solvers. Packs frame operations cleanly inside shared memory buffers to prevent leakages.",
                                      fa: "میکروسرویس ناهمگام پایتون با فریمورک FastAPI تحت وب‌سور سرور موازی Uvicorn. متکی بر کتابخانه‌های بهینه‌شده OpenCV و موتورهای محاسباتی هوش مصنوعی CUDA جهت آنالیز با سرعت بالا."
                                    },
                                    database: {
                                      en: "PostgreSQL relational persistent database cluster, sharded and configured with PgVector index columns or PostGIS geo-geometry models. Uses composite queries optimized via active read/write splits for query latency averaging 12ms.",
                                      fa: "خوشه پایگاه‌داده قدرتمند PostgreSQL بهینه‌سازی شده با نماهای برداری pg_vector و هندسی PostGIS. بهره‌برداری از استخر پورت اتصالات جهت ثبت موازی سنگین بدون بروز تداخل بن‌بست."
                                    }
                                  };
                                  return descriptions[selectedNodeId]?.[lang] || descriptions.client[lang];
                                })()}
                              </p>

                              {/* Realistic technical capabilities list */}
                              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 font-mono text-[9px] text-gray-400">
                                <div>
                                  <span className="text-gray-600">COMPILER_OPTS:</span> <span className="text-gray-300">-O3 -ffast-math</span>
                                </div>
                                <div>
                                  <span className="text-gray-600">QOS_WEIGHT:</span> <span className="text-gray-300">0x0C (DSCP-ExpEdited)</span>
                                </div>
                                <div>
                                  <span className="text-gray-600">SHARD_HEAP:</span> <span className="text-gray-300">{selectedNodeId === 'client' ? '2.4 MB' : '12.8 MB'}</span>
                                </div>
                                <div>
                                  <span className="text-gray-600">REDUNDANCY:</span> <span className="text-emerald-400">Active Node (3/3 reps)</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="mt-2 bg-[#050507] border border-white/5 rounded-xl p-3 font-mono text-[10px] leading-relaxed relative text-left">
                              {/* VSCode UI Mimic bar */}
                              <div className="absolute top-2.5 right-3 flex items-center gap-1.5 text-gray-500 z-10">
                                <button 
                                  onClick={() => {
                                    const codeText = {
                                      client: `// main.dart -- Dual Isolate Flutter Stream Engine
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class TelemetryIsolateWorker {
  final _receivePort = ReceivePort();
  SendPort? _sendPort;

  Future<void> initialize() async {
    // Spawn Dart isolate for computational offloading
    await Isolate.spawn(_decodeFrameThread, _receivePort.sendPort);
    _receivePort.listen((message) {
      if (message is SendPort) {
        _sendPort = message;
      } else {
        _notifyRenderPipeline(message as Map<String, dynamic>);
      }
    });
  }

  static void _decodeFrameThread(SendPort backendSendPort) {
    final threadPort = ReceivePort();
    backendSendPort.send(threadPort.sendPort);
    
    // Lock GC heap allocations using raw bytes
    threadPort.listen((frameBuffer) {
      final processed = runOnDeviceInference(frameBuffer);
      backendSendPort.send(processed);
    });
  }
}`,
                                      gateway: `# nginx.conf / kong.yml -- High-Availability Gate Proxy
upstream fastapi_servers {
    server 127.0.0.1:8000 max_fails=3 fail_timeout=10s;
    keepalive 128;
}

server {
    listen 443 ssl http2;
    server_name api.arshia.dev;
    
    # TCP connection backpressure buffers
    proxy_buffers 16 16k;
    proxy_buffer_size 32k;

    location /api/v2 {
        proxy_pass http://fastapi_servers;
        proxy_http_version 1.1;
        proxy_set_header Connection "upgrade";
        proxy_set_header Upgrade $http_upgrade;
        
        # Sub-millisecond JWT authentication parsing
        access_by_lua_block {
            local jwt = require("resty.jwt")
            local key_cache = redis.get("whitelist:" .. token)
            if not key_cache then
                ngx.status = 401
                ngx.say('{"error": "QoS quota exhausted"}')
                ngx.exit(401)
            end
        }
    }
}`,
                                      broker: `// broker.ts -- Redis Streams & RabbitMQ QoS Controller
import Redis from 'ioredis';
import amqplib from 'amqplib';

export async function publishCoordinates(point: GeoPoint) {
  // Leverage Redis XADD streams for microsecond caching
  const pipeline = redisClient.multi();
  pipeline.xadd('driver_logs_stream', '*', 
    'lat', point.lat, 
    'lng', point.lng, 
    'timestamp', Date.now()
  );
  pipeline.xtrim('driver_logs_stream', 'MAXLEN', '~', 10000);
  await pipeline.exec();

  // Route packet via high-priority RabbitMQ exchange
  channel.publish(
    'dispatch_exchange', 
    'geo.coordinate', 
    Buffer.from(JSON.stringify(point)),
    { deliveryMode: 2, priority: 9 } // persistent QoS level 1
  );
}`,
                                      worker: `# main.py -- FastAPI ASGI Asynchronous Process Workers
from fastapi import FastAPI, Depends, Header
import concurrent.futures
import asyncio

app = FastAPI(title="Core AI Analytics Worker", docs_url=None)
executor = concurrent.futures.ThreadPoolExecutor(max_workers=16)

@app.post("/api/v1/analyze-frame", response_model=FrameResult)
async def process_frame(payload: FramePayload):
    # Offload camera frame manipulation to native isolates thread pool
    loop = asyncio.get_event_loop()
    inference_result = await loop.run_in_executor(
        executor, 
        cv2_gpu_yolo_classifier, 
        payload.raw_frame_buffer
    )
    return FrameResult(
        score=inference_result.confidence, 
        classes=inference_result.detections
    )
`,
                                      database: `-- database.sql -- PostgreSQL PostGIS & pgvector Index Layout
-- Indexing geo geo-coordinates and high-dimensional camera vector embeddings
CREATE INDEX IF NOT EXISTS idx_logs_geom ON driver_tracker USING GIST (geom);
CREATE INDEX IF NOT EXISTS idx_embed_vector ON products USING hnsw (embedding vector_cosine_ops);

-- High-speed partitioned write/read replica lookup queries (avg 12ms)
SELECT d.driver_id, d.name, 
       ST_Distance(d.geom, ST_MakePoint(51.402, 35.712)::geography) AS dist_meters
FROM active_drivers d
INNER JOIN partition_shards s ON s.shard_id = d.partition_key
WHERE ST_DWithin(d.geom, ST_MakePoint(51.402, 35.712)::geography, 3000)
ORDER BY dist_meters ASC
LIMIT 5;`
                                    }[selectedNodeId as 'client' | 'gateway' | 'broker' | 'worker' | 'database'] || '';
                                    handleCopyPayload(codeText);
                                  }}
                                  className="hover:text-white p-1 rounded bg-white/5 active:bg-white/10 transition-colors"
                                  title="Copy Source Code Payload"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <div className="overflow-x-auto max-h-[140px] font-mono text-[9px] text-[#00D1FF] whitespace-pre select-all pr-2">
                                {(() => {
                                  switch (selectedNodeId) {
                                    case 'client':
                                      return (
                                        <>
                                          <span className="text-purple-400">import</span> <span className="text-white">'package:flutter/material.dart'</span>;<br />
                                          <span className="text-purple-400">import</span> <span className="text-white">'package:flutter_riverpod/flutter_riverpod.dart'</span>;<br /><br />
                                          <span className="text-blue-400">class</span> <span className="text-green-400">TelemetryIsolateWorker</span> &#123;<br />
                                          &nbsp;&nbsp;<span className="text-blue-400">final</span> _receivePort = <span className="text-green-400">ReceivePort</span>();<br />
                                          &nbsp;&nbsp;<span className="text-green-400">SendPort</span>? _sendPort;<br /><br />
                                          &nbsp;&nbsp;<span className="text-green-400">Future</span>&lt;<span className="text-blue-400">void</span>&gt; initialize() <span className="text-purple-400">async</span> &#123;<br />
                                          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">await</span> <span className="text-green-400">Isolate</span>.spawn(_decodeFrameThread, _receivePort.sendPort);<br />
                                          &nbsp;&nbsp;&nbsp;&nbsp;_receivePort.listen((message) &#123;<br />
                                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">if</span> (message <span className="text-blue-400">is</span> <span className="text-green-400">SendPort</span>) _sendPort = message;<br />
                                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">else</span> _notifyPipeline(message);<br />
                                          &nbsp;&nbsp;&nbsp;&nbsp;&#125;);<br />
                                          &nbsp;&nbsp;&#125;<br />
                                          &#125;
                                        </>
                                      );
                                    case 'gateway':
                                      return (
                                        <>
                                          <span className="text-blue-400">upstream</span> <span className="text-green-400">fastapi_servers</span> &#123;<br />
                                          &nbsp;&nbsp;<span className="text-purple-300">server</span> 127.0.0.1:8000 <span className="text-amber-400">max_fails</span>=3;<br />
                                          &nbsp;&nbsp;<span className="text-purple-300">keepalive</span> 128;<br />
                                          &#125;<br /><br />
                                          <span className="text-blue-400">server</span> &#123;<br />
                                          &nbsp;&nbsp;<span className="text-purple-300">listen</span> 443 <span className="text-amber-400">ssl http2</span>;<br />
                                          &nbsp;&nbsp;<span className="text-purple-300">location</span> /api/v2 &#123;<br />
                                          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-300">proxy_pass</span> http://fastapi_servers;<br />
                                          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-300">proxy_http_version</span> 1.1;<br />
                                          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-300">access_by_lua_block</span> &#123;<br />
                                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;local key = redis.get("auth:" .. token)<br />
                                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">if not</span> key <span className="text-purple-400">then</span> ngx.exit(401) <span className="text-purple-400">end</span><br />
                                          &nbsp;&nbsp;&nbsp;&nbsp;&#125;;<br />
                                          &nbsp;&nbsp;&#125;<br />
                                          &#125;
                                        </>
                                      );
                                    case 'broker':
                                      return (
                                        <>
                                          <span className="text-purple-400">import</span> Redis <span className="text-purple-400">from</span> <span className="text-white">'ioredis'</span>;<br />
                                          <span className="text-purple-400">import</span> amqplib <span className="text-purple-400">from</span> <span className="text-white">'amqplib'</span>;<br /><br />
                                          <span className="text-purple-400">export async function</span> <span className="text-blue-400">publishCoordinates</span>(point: GeoPoint) &#123;<br />
                                          &nbsp;&nbsp;<span className="text-blue-400">const</span> pipeline = redisClient.multi();<br />
                                          &nbsp;&nbsp;pipeline.<span className="text-green-400">xadd</span>(<span className="text-white">'driver_stream'</span>, <span className="text-white">'*'</span>, <span className="text-white">'lat'</span>, point.lat);<br />
                                          &nbsp;&nbsp;pipeline.<span className="text-green-400">xtrim</span>(<span className="text-white">'driver_stream'</span>, <span className="text-white">'MAXLEN'</span>, <span className="text-white">'~'</span>, 10000);<br />
                                          &nbsp;&nbsp;<span className="text-purple-400">await</span> pipeline.exec();<br /><br />
                                          &nbsp;&nbsp;channel.<span className="text-green-400">publish</span>(<span className="text-white">'dispatch'</span>, <span className="text-white">'geo.coord'</span>, <span className="text-green-400">Buffer</span>.from(point));<br />
                                          &#125;
                                        </>
                                      );
                                    case 'worker':
                                      return (
                                        <>
                                          <span className="text-purple-400">from</span> fastapi <span className="text-purple-400">import</span> FastAPI, Depends<br />
                                          <span className="text-purple-400">import</span> asyncio<br /><br />
                                          app = FastAPI(title=<span className="text-white">"AI_Worker"</span>)<br /><br />
                                          <span className="text-blue-400">@app</span>.post(<span className="text-white">"/api/v1/analyze-frame"</span>)<br />
                                          <span className="text-purple-400">async def</span> <span className="text-blue-400">process_frame</span>(payload: FramePayload):<br />
                                          &nbsp;&nbsp;&nbsp;&nbsp;loop = asyncio.get_event_loop()<br />
                                          &nbsp;&nbsp;&nbsp;&nbsp;res = <span className="text-purple-400">await</span> loop.run_in_executor(<br />
                                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;executor_pool, cv2_gpu_yolo_classifier, payload.raw_buffer<br />
                                          &nbsp;&nbsp;&nbsp;&nbsp;)<br />
                                          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> FrameResult(score=res.score, classes=res.detections)<br />
                                        </>
                                      );
                                    case 'database':
                                    default:
                                      return (
                                        <>
                                          <span className="text-purple-400">CREATE INDEX INDEX_GIST</span> <span className="text-blue-400">ON</span> active_drivers <span className="text-purple-400">USING</span> GIST (geom);<br />
                                          <span className="text-purple-400">CREATE INDEX INDEX_HNSW</span> <span className="text-blue-400">ON</span> inventory <span className="text-purple-400">USING</span> hnsw (embedding vector_cosine_ops);<br /><br />
                                          <span className="text-purple-400">SELECT</span> d.driver_id, d.name, <span className="text-green-400">ST_Distance</span>(d.geom, ST_MakePoint(51.402, 35.712))<br />
                                          <span className="text-purple-400">FROM</span> active_drivers d<br />
                                          <span className="text-purple-400">INNER JOIN</span> partition_shards s <span className="text-purple-400">ON</span> s.shard_key = d.partition_key<br />
                                          <span className="text-purple-400">WHERE</span> <span className="text-green-400">ST_DWithin</span>(d.geom, ST_MakePoint(51.402, 35.712), 3000)<br />
                                          <span className="text-purple-400">ORDER BY</span> distance <span className="text-purple-400">ASC LIMIT</span> 5;<br />
                                        </>
                                      );
                                  }
                                })()}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Micro VSCode Terminal log stream output */}
                      <div className="bg-[#030304] rounded-2xl border border-white/5 overflow-hidden flex flex-col h-[210px]">
                        <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/5 flex items-center justify-between font-mono text-[9px] text-gray-400">
                          <span className="flex items-center gap-1.5 uppercase tracking-wider">
                            <Terminal className="w-3.5 h-3.5" style={{ color: blueprintColor }} />
                            <span>System Log Terminal (/bin/zsh)</span>
                          </span>
                          <span className="text-[8px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/10 uppercase font-black">
                            {lang === 'en' ? 'LIVE FEED' : 'سوکت آنلاین'}
                          </span>
                        </div>
                        <div className="p-4 flex-1 overflow-y-auto font-mono text-[9.5px] leading-relaxed select-none bg-black/40 text-left rtl:text-left text-gray-300 space-y-1">
                          {terminalLogs.map((log, logIdx) => {
                            // style logs according to SRE warning levels
                            const isHeal = log.includes('[SRE-HEAL]') || log.includes('[CI-CD]') || log.includes('[DEPLOY]');
                            const isCritical = log.includes('[SRE-CRITICAL]') || log.includes('[SRE-ALERT]');
                            const isWarn = log.includes('[SRE-WARN]') || log.includes('[PG-WARN]') || log.includes('[SRE-WARM]');
                            const isDb = log.includes('[DB]') || log.includes('[PG]');
                            
                            let logColor = 'text-gray-400';
                            if (isHeal) logColor = 'text-emerald-400';
                            else if (isCritical) logColor = 'text-red-400 font-bold';
                            else if (isWarn) logColor = 'text-amber-400';
                            else if (isDb) logColor = 'text-[#00D1FF]';

                            return (
                              <div key={logIdx} className={`${logColor} truncate`}>
                                <span className="text-gray-600 block sm:inline mr-1">{`[sys_worker-${logIdx % 3}]`}</span>
                                {log}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          );
        })()}
      </section>

        {/* IMMERSIVE FULLSCREEN CASE STUDY OVERLAY DASHBOARD */}
        <AnimatePresence>
          {selectedProjId && (() => {
            const project = projectsData.find(p => p.id === selectedProjId);
            if (!project) return null;
            const projectLocal = project[lang] || project.en;

            return (
              <motion.div 
                key="case-study-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 md:p-6 overflow-y-auto"
              >
                {/* Immersive Blueprint container */}
                <motion.div 
                  key={`case-study-content-${selectedProjId}`}
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 30 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                  className="w-full max-w-6xl bg-[#09090b]/90 border border-white/8 rounded-3xl overflow-hidden shadow-2xl relative my-auto min-h-[85vh] flex flex-col justify-between text-left rtl:text-right"
                  style={{
                    boxShadow: `0 30px 100px -10px rgba(0, 0, 0, 0.9), 0 0 40px -5px ${project.color}15`
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  
                  {/* Decorative technical line layout overlay */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ff6b00]/10 to-transparent pointer-events-none" />
                  
                  {/* Header HUD panel */}
                  <div className="border-b border-white/5 bg-black/60 px-6 md:px-8 py-4 flex items-center justify-between z-10 relative">
                    <div className="flex items-center gap-4">
                      <div className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: project.color }} />
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-black tracking-widest text-gray-500">
                          {lang === 'en' ? 'Systems Analytics Blueprint' : 'نقشه آنالیز هوشمند معماری فنی'}
                        </span>
                        <span className="text-xs font-mono text-gray-400 select-all">INSTANCE::{project.id.toUpperCase()}_NODE.DOCKER.LOCAL</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => setSelectedProjId(null)}
                      className="inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 text-xs text-white uppercase tracking-wider font-bold transition-all"
                    >
                      <span>{lang === 'en' ? 'Close Console' : 'بستن کنسول'}</span>
                      <span className="text-gray-500 font-normal">ESC [x]</span>
                    </button>
                  </div>

                  {/* Main dual-column dashboard panel splits */}
                  <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 md:p-8 overflow-y-auto max-h-[70vh] items-stretch">
                    
                    {/* LEFT COLUMN: Cinematic Hero representation & Tech Specifications */}
                    <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                      
                      <div className="glass-card rounded-2xl p-5 border border-white/5 space-y-4 bg-black/20 flex-1 flex flex-col justify-center">
                        <div className="relative aspect-square max-w-[280px] mx-auto rounded-xl overflow-hidden shadow-lg border border-white/5">
                          {/* Reflective shine sweep image overlay */}
                          <div className="absolute top-0 right-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-[30deg] animate-[shine_5s_ease-in-out_infinite]" />
                          <img 
                            src={project.visual} 
                            alt={`${projectLocal.title} Full visual`} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>

                        <div className="text-center pt-2">
                          <h4 className="text-2xl font-black uppercase text-white tracking-tight leading-none mb-1">{projectLocal.title}</h4>
                          <span className="text-[10px] uppercase tracking-widest font-black" style={{ color: project.color }}>{projectLocal.role}</span>
                        </div>
                      </div>

                      {/* Technical specifications logs table */}
                      <div className="glass-card rounded-2xl p-5 border border-white/5 space-y-3 font-mono text-[10px] bg-black/40">
                        <div className="flex items-center justify-between border-b border-white/5 pb-2 text-gray-400">
                          <span className="font-bold">{lang === 'en' ? 'SYSTEM METRIC' : 'شاخص سیستم'}</span>
                          <span className="font-bold">{lang === 'en' ? 'METADATA STATUS' : 'وضعیت داده'}</span>
                        </div>
                        
                        <div className="flex justify-between py-1.5 border-b border-white/5 text-gray-300">
                          <span>PLATFORM_ROLE:</span>
                          <span className="text-white font-bold uppercase">{project.scope}</span>
                        </div>

                        <div className="flex justify-between py-1.5 border-b border-white/5 text-gray-300">
                          <span>CORE_STACK:</span>
                          <span className="text-cyan-400 font-bold">{project.tech.slice(0, 3).join(' + ')}</span>
                        </div>

                        <div className="flex justify-between py-1.5 border-b border-white/5 text-gray-[#D7E2EA]">
                          <span>CONTAINER_LOAD:</span>
                          <span className="text-emerald-400">{lang === 'en' ? '99.98% HEALTHY' : '۹۹.۹۸٪ بدون خطا'}</span>
                        </div>

                        <div className="flex justify-between py-1.5 text-gray-200">
                          <span>CONNECTION_PORT:</span>
                          <span className="text-orange-400 font-bold">PORT: 3000 (HTTPS)</span>
                        </div>
                      </div>

                    </div>

                    {/* RIGHT COLUMN: Interactive live spec grids, pipeline blueprints, and details */}
                    <div className="lg:col-span-7 flex flex-col gap-6 justify-between">
                      
                      {/* Project architecture workflow pipeline graph diagram */}
                      <div className="glass-card rounded-2xl p-5 border border-white/5 space-y-3.5 bg-black/30">
                        <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                          <Workflow className="w-4 h-4" style={{ color: project.color }} />
                          <span className="text-xs uppercase font-extrabold text-white tracking-wider">
                            {lang === 'en' ? 'Architecture Pipeline Flow' : 'روند خط لوله معماری سیستم'}
                          </span>
                        </div>
                        
                        {/* Interactive schematic path nodes */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center py-2">
                          {projectLocal.architectureHighlights.map((node, nIdx) => (
                            <React.Fragment key={nIdx}>
                              <div className="bg-white/5 border border-white/10 rounded-lg p-2 flex-1 w-full min-h-[50px] flex items-center justify-center hover:border-white/20 transition-all">
                                <span className="text-[9px] font-mono leading-tight text-gray-300 uppercase">{node}</span>
                              </div>
                              {nIdx < projectLocal.architectureHighlights.length - 1 && (
                                <span className="text-gray-600 text-[11px] font-mono rotate-90 md:rotate-0 select-none">▶</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>

                      {/* Technical Pillars deep-dive list items */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        <div className="bg-white/2 border border-white/5 rounded-xl p-4.5 space-y-1 hover:border-white/10 transition-colors">
                          <div className="flex items-center gap-1.5 text-[10px] uppercase font-black text-gray-400">
                            <Activity className="w-3.5 h-3.5" style={{ color: project.color }} />
                            <span>{lang === 'en' ? 'Real-Time Features' : 'ویژگی‌های بلادرنگ (Real-Time)'}</span>
                          </div>
                          <p className="text-gray-400 text-[10px] leading-relaxed font-light">{projectLocal.realtimeFeatures}</p>
                        </div>

                        <div className="bg-white/2 border border-white/5 rounded-xl p-4.5 space-y-1 hover:border-white/10 transition-colors">
                          <div className="flex items-center gap-1.5 text-[10px] uppercase font-black text-gray-400">
                            <Sparkles className="w-3.5 h-3.5" style={{ color: project.color }} />
                            <span>{lang === 'en' ? 'Artificial Intelligence' : 'هوش مصنوعی (AI)'}</span>
                          </div>
                          <p className="text-gray-400 text-[10px] leading-relaxed font-light">{projectLocal.aiFeatures}</p>
                        </div>

                        <div className="bg-white/2 border border-white/5 rounded-xl p-4.5 space-y-1 hover:border-white/10 transition-colors">
                          <div className="flex items-center gap-1.5 text-[10px] uppercase font-black text-gray-400">
                            <Layers className="w-3.5 h-3.5" style={{ color: project.color }} />
                            <span>{lang === 'en' ? 'System Scalability' : 'مقیاس‌پذیری سیستم'}</span>
                          </div>
                          <p className="text-gray-400 text-[10px] leading-relaxed font-light">{projectLocal.scalabilityDetails}</p>
                        </div>

                        <div className="bg-white/2 border border-white/5 rounded-xl p-4.5 space-y-1 hover:border-white/10 transition-colors">
                          <div className="flex items-center gap-1.5 text-[10px] uppercase font-black text-gray-400">
                            <Cpu className="w-3.5 h-3.5" style={{ color: project.color }} />
                            <span>{lang === 'en' ? 'Performance Tuning' : 'بهینه‌سازی کارایی پلتفرم'}</span>
                          </div>
                          <p className="text-gray-400 text-[10px] leading-relaxed font-light">{projectLocal.performanceOptimizations}</p>
                        </div>

                      </div>

                      {/* Live System Console Logs simulating process queues */}
                      <div className="glass-card rounded-2xl p-4 border border-white/5 bg-black/80 font-mono text-[9px] text-[#9eff00] space-y-1 relative">
                        <div className="absolute top-2.5 right-3 px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold tracking-widest text-[7px] uppercase animate-pulse">
                          sys_ok
                        </div>

                        <div className="text-gray-500 border-b border-white/5 pb-1 mb-1 font-bold">
                          {lang === 'en' ? 'LIVE TELEMETRY WORKER STREAM' : 'جریان زنده داده‌های کارگر مخزن پردازشی'}
                        </div>
                        <div className="text-zinc-400 flex justify-between">
                          <span>[COMPILED] worker_isolation_layer_v2 --mode=production</span>
                          <span className="text-gray-500 text-[8px]">{new Date().toISOString().slice(11, 19)} UTC</span>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                          <span className="text-emerald-500">INIT:</span>
                          <span>
                            {lang === 'en' 
                              ? `Est. Database Connection pool bounds: (0 .. ${project.metrics[0].value}) OK`
                              : `برقرار است. بازه مجاز اتصالات پایگاه داده: (۰ .. ${project.metrics[0].value}) تایید`}
                          </span>
                        </div>
                        <div className="text-[#00D1FF] flex justify-between">
                          <span>
                            {lang === 'en' 
                              ? `CACHE :: Fetch hits logged: (891ms active cache run)` 
                              : `حافظه نهان :: ترافیک ثبت‌شده: کش پاسخ فشرده شده`}
                          </span>
                          <span className="font-bold text-[#9eff00]">
                            {lang === 'en' ? 'SHARD_HIT_RATE :: 99.4%' : 'دقت بازیابی :: ۹۹.۴٪'}
                          </span>
                        </div>
                      </div>

                    </div>

                  </div>

                  {/* Footer links options bar */}
                  <div className="border-t border-white/5 bg-black/60 px-6 py-4 flex flex-wrap items-center gap-4 justify-between text-xs z-10 relative">
                    <div className="flex items-center gap-4 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                      <span>{lang === 'en' ? 'Role Focus:' : 'جایگاه نقشی:'}</span>
                      <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-white font-sans">{projectLocal.role}</span>
                    </div>

                    <div className="flex gap-3">
                      <a 
                        href="#contact"
                        onClick={() => setSelectedProjId(null)}
                        className="px-5 py-2.5 rounded-full bg-white text-black font-black uppercase tracking-wider text-[10px] hover:bg-white/90 shadow transition-colors"
                      >
                        {lang === 'en' ? 'Inquire About Project code' : 'استعلام کدهای منبع پروژه'}
                      </a>
                    </div>
                  </div>

                </motion.div>
              </motion.div>
            );
          })()}
        </AnimatePresence>

      {/* FOOTER & CONTACT SECTION WITH GIANT DETAILED RADIAL GLOW */}
      <section 
        id="contact" 
        onMouseEnter={() => {
          if (devMode) setHoveredComponent({ name: 'FooterContact', selectors: 'section#contact.py-24.relative.overflow-hidden', size: '1240 × 600px' });
        }}
        onMouseLeave={() => {
          if (devMode) setHoveredComponent(null);
        }}
        className={`py-24 relative z-10 overflow-hidden scroll-mt-10 transition-all duration-500 ${
          devMode ? 'border border-dashed border-[#FF6B00]/40 bg-[#FF6B00]/[0.01]' : ''
        }`}
      >
        {devMode && (
          <div className="absolute top-4 left-4 z-[40] font-mono text-[9px] bg-black/95 text-[#FF6B00] border border-[#FF6B00]/30 px-2.5 py-1 rounded flex items-center gap-1.5 select-none animate-pulse">
            <Code2 className="w-3 h-3 text-[#FF6B00]" />
            <span>&lt;SecureChannel state="listening-sockets" ssl="mTLS" /&gt;</span>
          </div>
        )}
        
        {/* Massive radial spotlight background glow from bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[400px] bg-[radial-gradient(circle,rgba(123,97,255,0.07)_0%,transparent_70%)] pointer-events-none z-0" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-[radial-gradient(circle,rgba(158,255,0,0.05)_0%,transparent_70%)] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* CTA Massive Left description */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-6 h-0.5 animate-pulse" style={{ backgroundColor: accentColor }} />
                <span className="text-xs tracking-widest uppercase font-black" style={{ color: accentColor }}>Get in Touch</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl xl:text-7xl font-black uppercase text-white tracking-tighter leading-none">
                LET'S BUILD <br />
                SOMETHING <br />
                <span className="bg-gradient-to-r bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(90deg, #D7E2EA 0%, ${accentColor} 100%)` }}>
                  POWERFUL
                </span>
              </h2>

              <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
                Whether you need a high-end Flutter application deployed to the App Store or an ultra-fast FastAPI real-time architecture capable of millions of hits, I am ready to engineer it.
              </p>

              {/* Dynamic contact lists metrics widgets */}
              <div className="grid grid-cols-2 gap-4 max-w-md pt-4">
                
                <div className="bg-white/2 px-4 py-3 border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                  <span className="text-[10px] text-gray-500 uppercase block font-mono">system_email</span>
                  <a href="mailto:khaniarshia7@gmail.com" className="text-xs font-bold text-white tracking-wider hover:underline transition-all block mt-1 truncate">
                    khaniarshia7@gmail.com
                  </a>
                </div>

                <div className="bg-white/2 px-4 py-3 border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                  <span className="text-[10px] text-gray-500 uppercase block font-mono">social_github</span>
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="text-xs font-bold text-white tracking-wider hover:underline transition-all block mt-1">
                    github.com/arshiakhani
                  </a>
                </div>

                <div className="bg-white/2 px-4 py-3 border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                  <span className="text-[10px] text-gray-500 uppercase block font-mono">social_linkedin</span>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-xs font-bold text-white tracking-wider hover:underline transition-all block mt-1">
                    linkedin.com/in/arshiakhani
                  </a>
                </div>

                <div className="bg-white/2 px-4 py-3 border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                  <span className="text-[10px] text-gray-500 uppercase block font-mono">telegram_broker</span>
                  <a href="https://t.me" target="_blank" rel="noreferrer" className="text-xs font-bold text-white tracking-wider hover:underline transition-all block mt-1">
                    @arshiakhani
                  </a>
                </div>

              </div>
            </div>

            {/* Email Contact Form Container */}
            <div className="lg:col-span-6">
              <div className="glass-card rounded-2xl p-6 md:p-8 border border-white/5 relative">
                
                <div className="flex items-center gap-2 mb-6 text-gray-400">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-[10px] tracking-widest font-black uppercase text-gray-400">secured_communication_tunnel</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-2">Sender Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Satoshi Nakamoto" 
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-[#0b0b0d] border border-white/5 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-2">Sender Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. satoshi@bitcoin.org" 
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-[#0b0b0d] border border-white/5 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-2">Transmission Message payload</label>
                    <textarea 
                      rows={4}
                      required
                      placeholder="Type details about your project architecture request..." 
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-[#0b0b0d] border border-white/5 rounded-lg p-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-all resize-none"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 relative overflow-hidden group/btn text-black flex items-center justify-center gap-2"
                    style={{ 
                      backgroundColor: accentColor,
                      boxShadow: `0 8px 32px -8px ${accentColor}`
                    }}
                  >
                    <span>Transmit Message Payload</span>
                    <Send className="w-3.5 h-3.5 shrink-0 text-black group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                </form>

                {/* Secure successful banner message transmission feedback */}
                <AnimatePresence>
                  {formSent && (
                    <motion.div 
                      key="form-success-banner"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute inset-0 bg-[#070707]/95 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center p-6 text-center border border-[#9EFF00]/30"
                    >
                      <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                        <CheckCircle className="w-6 h-6 text-emerald-400" />
                      </div>
                      <h4 className="text-lg font-bold text-white uppercase tracking-tight">Transmission complete!</h4>
                      <p className="text-gray-400 text-xs max-w-xs mt-2 leading-relaxed">
                        Message packet has been successfully published to Arshia's personal inbox. I will reply to you in under 12 hours.
                      </p>
                      <span className="text-[9px] text-[#9EFF00] font-mono uppercase tracking-widest mt-4">SYS_PACKET_STDOUT: 202_ACCEPTED</span>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>

          {/* Simple footer credentials matching layout */}
          <div className="border-t border-white/5 pt-8 mt-16 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono">
            <span>© 2026 ARSHIA KHANI. ALL SYSTEM CHANNELS RESERVED.</span>
            <div className="flex gap-4">
              <span className="text-[#9EFF00]/80">LATENCY: 1ms</span>
              <span>HOST: AIR_STUDIO</span>
              <span>v1.2.0-stable</span>
            </div>
          </div>
        </div>

      </section>

      {/* FLOATING DEVELOPER PANEL HUD AND LAYOUT TOOLTIP ELEMENT */}
      {devMode && (
        <AnimatePresence>
          {/* Interactive Laser Crosshair CAD Grid overlay */}
          {quantumGrid && (
            <motion.div 
              key="quantum-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 pointer-events-none z-[99] overflow-hidden"
            >
              {/* Horizontal laser line */}
              <div 
                className="absolute left-0 right-0 h-[1.5px] pointer-events-none"
                style={{ 
                  top: mousePos.y, 
                  backgroundColor: accentColor,
                  opacity: laserIntensity / 100,
                  boxShadow: `0 0 10px ${accentColor}, 0 0 20px ${accentColor}40` 
                }}
              />
              {/* Vertical laser line */}
              <div 
                className="absolute top-0 bottom-0 w-[1.5px] pointer-events-none"
                style={{ 
                  left: mousePos.x, 
                  backgroundColor: accentColor,
                  opacity: laserIntensity / 100,
                  boxShadow: `0 0 10px ${accentColor}, 0 0 20px ${accentColor}40`
                }}
              />
              {/* Dynamic Target Aim crosshair tracking circles */}
              <div 
                className="absolute w-5 h-5 rounded-full border-2 border-dashed pointer-events-none -translate-x-1/2 -translate-y-1/2 animate-spin"
                style={{ 
                  left: mousePos.x, 
                  top: mousePos.y, 
                  borderColor: accentColor,
                  opacity: (laserIntensity + 25) / 100,
                  animationDuration: '8s'
                }}
              />
              <div 
                className="absolute w-2 h-2 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
                style={{ 
                  left: mousePos.x, 
                  top: mousePos.y, 
                  backgroundColor: accentColor,
                  opacity: (laserIntensity + 40) / 100,
                  boxShadow: `0 0 8px ${accentColor}`
                }}
              />
              {/* Holographic matrix coordinate tag */}
              <div 
                className="absolute font-mono text-[8px] font-black px-2 py-0.5 bg-black/95 border rounded backdrop-blur-md pointer-events-none select-none flex items-center gap-1.5"
                style={{ 
                  left: mousePos.x + 18, 
                  top: mousePos.y + 18, 
                  borderColor: accentColor + '60', 
                  color: accentColor,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.8)'
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                <span>LOC [X:{mousePos.x} | Y:{mousePos.y}] 2026_TRACER</span>
              </div>
            </motion.div>
          )}

          {devPanelOpen && (
            <motion.div
              key="dev-panel"
              initial={{ opacity: 0, x: 100, y: 100, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                x: 0, 
                y: 0, 
                scale: 1,
                width: hudExpandWide ? 'min(94vw, 920px)' : '420px',
                height: hudExpandWide ? '600px' : '490px'
              }}
              exit={{ opacity: 0, x: 100, y: 100, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="fixed bottom-6 right-6 bg-black/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.95)] z-[100] overflow-hidden flex flex-col font-mono text-left select-none"
              style={{ maxHeight: '90vh' }}
            >
              {/* Header bar mimicking VSCode title */}
              <div 
                className="px-4 py-3 bg-white/[0.02] border-b border-white/5 flex items-center justify-between text-[10px] font-bold"
                style={{ borderBottomColor: accentColor + '20' }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: accentColor }} />
                  <span className="text-white tracking-widest uppercase">
                    {lang === 'en' ? 'QUANTUM COCKPIT SHARD MANAGER v1.9' : 'سازمان‌دهنده کوانتومی شاردها'}
                  </span>
                  <span className="text-gray-500 font-normal hidden md:inline">| SECURE_TUNNEL_ESTABLISHED</span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  {/* Expand view mode panel toggle button */}
                  <button
                    onClick={() => {
                      setHudExpandWide(!hudExpandWide);
                      if (simSoundTick && typeof AudioContext !== 'undefined') {
                        // play a subtle satisfying click cue
                        const ctx = new AudioContext();
                        const osc = ctx.createOscillator();
                        const gain = ctx.createGain();
                        osc.connect(gain);
                        gain.connect(ctx.destination);
                        osc.frequency.setValueAtTime(hudExpandWide ? 1000 : 1800, ctx.currentTime);
                        gain.gain.setValueAtTime(0.01, ctx.currentTime);
                        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
                        osc.start();
                        osc.stop(ctx.currentTime + 0.1);
                      }
                    }}
                    className="text-gray-400 hover:text-white px-2 py-0.5 rounded text-[8px] bg-white/5 cursor-pointer uppercase font-black transition-colors"
                  >
                    {hudExpandWide 
                      ? (lang === 'en' ? 'COMPACT' : 'فشرده‌سازی') 
                      : (lang === 'en' ? 'EXPAND WIDE' : 'نمای عریض')}
                  </button>
                  <button 
                    onClick={() => setDevPanelOpen(false)}
                    className="text-gray-500 hover:text-white px-1.5 py-0.5 rounded text-[8px] bg-white/5 cursor-pointer uppercase font-black transition-colors"
                  >
                    {lang === 'en' ? 'minify' : 'کمینه‌سازی'}
                  </button>
                  <button 
                    onClick={() => {
                      setDevPanelOpen(false);
                      setDevMode(false);
                      setThemeOverride(null);
                    }}
                    className="text-red-400 hover:text-red-300 px-1.5 py-0.5 rounded text-[8px] bg-red-400/5 cursor-pointer uppercase font-black transition-colors"
                  >
                    {lang === 'en' ? 'Kill' : 'خروج'}
                  </button>
                </div>
              </div>

              {/* Main Content Splitted or Single depending on Wide option */}
              <div className="flex-1 flex overflow-hidden">
                
                {/* HUD Sidebar Tabs */}
                <div className="w-[85px] sm:w-[100px] border-r border-white/5 bg-black/40 flex flex-col justify-between text-[8px] font-bold select-none py-2 shrink-0">
                  <div className="space-y-1">
                    {[
                      { id: 'CONSOLE', label: lang === 'en' ? 'SRE_CHAOS' : 'آشوب SRE', icon: <Terminal className="w-3.5 h-3.5" /> },
                      { id: 'TOPOLOGY', label: lang === 'en' ? 'NET_FLOWS' : 'سیم‌کشی شبکه', icon: <Radio className="w-3.5 h-3.5 animate-pulse" /> },
                      { id: 'SQL', label: lang === 'en' ? 'SQL_DB' : 'پایگاه داده', icon: <Database className="w-3.5 h-3.5" /> },
                      { id: 'SANDBOX', label: lang === 'en' ? 'SANDBOX' : 'کامپایلر', icon: <Code2 className="w-3.5 h-3.5" /> },
                      { id: 'GIT', label: lang === 'en' ? 'ROLLOUTS' : 'گیت و ریلیز', icon: <GitBranch className="w-3.5 h-3.5" /> },
                      { id: 'METRICS', label: lang === 'en' ? 'METRICS' : 'کوانتوم‌آرا', icon: <Cpu className="w-3.5 h-3.5" /> },
                      { id: 'CONFIG', label: lang === 'en' ? 'LASER_CONFIG' : 'تنظیم رنگ', icon: <Sliders className="w-3.5 h-3.5" /> },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setDevActiveTab(t.id as any);
                          if (simSoundTick && typeof AudioContext !== 'undefined') {
                            const ctx = new AudioContext();
                            const osc = ctx.createOscillator();
                            const gain = ctx.createGain();
                            osc.connect(gain);
                            gain.connect(ctx.destination);
                            osc.frequency.setValueAtTime(1400, ctx.currentTime);
                            gain.gain.setValueAtTime(0.005, ctx.currentTime);
                            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
                            osc.start();
                            osc.stop(ctx.currentTime + 0.05);
                          }
                        }}
                        className={`w-full py-3.5 px-1 border-l-2 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all ${
                          devActiveTab === t.id
                            ? 'text-white border-white bg-white/5'
                            : 'text-gray-500 border-transparent hover:text-gray-300'
                        }`}
                        style={{ borderLeftColor: devActiveTab === t.id ? accentColor : 'transparent' }}
                      >
                        <div style={{ color: devActiveTab === t.id ? accentColor : 'inherit' }}>
                          {t.icon}
                        </div>
                        <span className="text-[7.5px] scale-90 tracking-tighter text-center uppercase truncate block w-full">
                          {t.label}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Settings bottom state ticker */}
                  <div className="px-2 text-center text-[7px] text-gray-600 font-mono space-y-1.5">
                    <div>ACCENT_HEX:</div>
                    <div className="font-bold text-[8px]" style={{ color: accentColor }}>{accentColor}</div>
                    <button 
                      onClick={() => setSimSoundTick(!simSoundTick)}
                      className={`px-1 py-0.5 rounded text-[6.5px] uppercase font-bold text-center block w-full border ${
                        simSoundTick ? 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5' : 'border-white/5 text-gray-500'
                      }`}
                    >
                      {simSoundTick ? 'SOUND: ON' : 'SOUND: OFF'}
                    </button>
                  </div>
                </div>

                {/* Main panel displays */}
                <div className="flex-1 p-4 overflow-y-auto text-xs space-y-4 bg-[#010101]/60 flex flex-col justify-between">
                  
                  {/* CONSOLE TAB (SRE & CHAOS ENGINEERING EXPERIMENT PANEL) */}
                  {devActiveTab === 'CONSOLE' && (
                    <div className="space-y-4 font-mono flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center bg-white/2 p-2 rounded border border-white/5">
                          <span className="text-gray-400 text-[9px] uppercase font-bold">// Sandbox Network Chaos Deck</span>
                          <span className="text-[8.5px] text-[#9EFF00] font-bold" style={{ color: accentColor }}>GATEWAY: {gatewayNodeState}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-[8px]">
                          <button
                            onClick={() => {
                              setSyntheticLoad(9820);
                              setCpuOverride(98);
                              setGatewayNodeState('DEGRADED');
                              setTerminalLogs((prev) => [
                                ...prev.slice(-25),
                                `[SRE-SHARD] [${new Date().toISOString().slice(11, 19)}] TRAFFIC DDOS SIMULATION TRIGGERED!`,
                                `[SRE-SHARD] Launching load generator simulation: ${activeRoutingServer} edge nodes bound.`,
                                `[ALERT-FIRE] Global traffic peaking at 9,820 RPS. Router cluster memory pool at 98.4% threadpool starvation.`
                              ]);
                            }}
                            className="p-2.5 border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 rounded cursor-pointer font-bold text-left transition-all relative overflow-hidden group/btn"
                          >
                            <div className="text-[9px] font-black uppercase mb-0.5">⚡ SURGE TRAFFIC FLOOD</div>
                            <div className="text-[7px] font-normal text-red-500/60 leading-tight">Mock DDoS attack up to 9.8k req/sec</div>
                          </button>

                          <button
                            onClick={() => {
                              setCpuOverride(99);
                              setSyntheticLatency(250);
                              setGatewayNodeState('DEGRADED');
                              setTerminalLogs((prev) => [
                                ...prev.slice(-25),
                                `[SRE-CRITICAL] [${new Date().toISOString().slice(11, 19)}] INJECTING SYNTHETIC CPU LOCK THROTTLE OVERHEAD...`,
                                `[SRE-CRITICAL] Host thread affinity overridden. Forced lock on 8 isolate cores.`,
                                `[SRE-ALERT] Simulated telemetry locked latency target at 250ms with system SRE warning trace.`
                              ]);
                            }}
                            className="p-2.5 border border-[#FF6B00]/20 bg-[#FF6B00]/5 hover:bg-[#FF6B00]/10 text-[#FF6B00] rounded cursor-pointer font-bold text-left transition-all font-mono"
                          >
                            <div className="text-[9px] font-black uppercase mb-0.5">🔥 CPU CLOCK EMBARGO</div>
                            <div className="text-[7px] font-normal text-orange-500/60 leading-tight">Simulate CPU throttling at 99.1%</div>
                          </button>

                          <button
                            onClick={() => {
                              setSyntheticLatency(180);
                              setSyntheticError(22);
                              setGatewayNodeState('DEGRADED');
                              setTerminalLogs((prev) => [
                                ...prev.slice(-25),
                                `[SRE-WARN] [${new Date().toISOString().slice(11, 19)}] DRIPPING HIGH PACKET LOSS & NETWORK INTERFERENCE...`,
                                `[SRE-WARN] Simulated frame dropped: TCP retransmission bound is now 22%.`,
                                `[PG-WARN] Out-of-order execution packets registered across regional gateway router shards.`
                              ]);
                            }}
                            className="p-2.5 border border-[#7B61FF]/20 bg-[#7B61FF]/5 hover:bg-[#7B61FF]/10 text-[#7B61FF] rounded cursor-pointer font-bold text-left transition-all"
                          >
                            <div className="text-[9px] font-black uppercase mb-0.5">🌐 INJECT JITTER DRIFT</div>
                            <div className="text-[7px] font-normal text-purple-400/60 leading-tight">Simulate 22% socket package dropouts</div>
                          </button>

                          <button
                            onClick={() => {
                              setChaosSqlInjectionScore(prev => prev + 1);
                              setTerminalLogs((prev) => [
                                ...prev.slice(-25),
                                `[SEC-SHIFTER] [${new Date().toISOString().slice(11, 19)}] WAN SECURITY THREAT VECTORS REGISTERED!`,
                                `[SEC-SHIFTER] Attacker attempted SQL Injection (OR 1=1 --) query pattern on drivers shard.`,
                                `[SEC-SHIELD] INTRUSION AUTOSHIELD DEFLECTED! Attack vector scrubbed and blacklisted on Nginx layer.`
                              ]);
                            }}
                            className="p-2.5 border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 text-cyan-400 rounded cursor-pointer font-bold text-left transition-all"
                          >
                            <div className="text-[9px] font-black uppercase mb-0.5 font-bold">🛡️ WAF SQL DEFLECTOR</div>
                            <div className="text-[7px] font-normal text-cyan-500/60 leading-tight">Simulate and block cyber vulnerabilities</div>
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 mt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 text-[8px] uppercase tracking-wider">// System mitigation triggers</span>
                          <span className="text-[7px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 px-1 py-0.2 rounded uppercase font-black">STABLE OPTIMIZER</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-[8px]">
                          <button
                            onClick={() => {
                              setSyntheticLoad(1420);
                              setSyntheticLatency(50);
                              setSyntheticError(2);
                              setCpuOverride(null);
                              setGatewayNodeState('HEALTHY');
                              setTerminalLogs((prev) => [
                                ...prev.slice(-25),
                                `[SRE-HEAL] [${new Date().toISOString().slice(11, 19)}] SHARD OPTIMIZATION MATRIX DEPLOYED...`,
                                `[SRE-HEAL] Cleared load generator and released CPU locks cleanly.`,
                                `[SRE-HEAL] Gateway health auto-restored. Telemetry streams back to stable 60fps.`
                              ]);
                            }}
                            className="p-2 border rounded font-black cursor-pointer text-center transition-all bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20 uppercase"
                          >
                            💚 EVICT ALL SYSTEM CHAOS
                          </button>

                          <button
                            onClick={() => {
                              setTerminalLogs((prev) => [
                                ...prev.slice(-25),
                                `[DB-SYNC] [${new Date().toISOString().slice(11, 19)}] Recalibrating multi-region replication balances...`,
                                `[DB-SYNC] Latency balances synchronized between Frankfurt DB block and Tehran sharding tables.`,
                                `[DB-SYNC] Zero delta replication lag achieved across nodes.`
                              ]);
                            }}
                            className="p-2 border rounded font-black cursor-pointer text-center transition-all bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 uppercase"
                          >
                            🔄 RE-ALIGN REPLICAS
                          </button>
                        </div>
                      </div>

                      {/* Live DOM Inspector widget nested directly inside tab console */}
                      <div className="bg-[#030304] rounded-xl border border-white/5 p-3 font-mono text-[8px] leading-relaxed text-left text-gray-400 mt-4 space-y-1">
                        <div className="text-gray-500 font-bold uppercase pb-1 border-b border-white/5 mb-1 flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" style={{ color: accentColor }} />
                          <span>Layout Inspector (Hover Tracking)</span>
                        </div>
                        {hoveredComponent ? (
                          <div className="text-[#9EFF00] space-y-0.5" style={{ color: accentColor }}>
                            <div className="font-bold">BOUND COMPONENT INDEXED: &lt;{hoveredComponent.name} /&gt;</div>
                            <div className="opacity-80">CSS Selectors: {hoveredComponent.selectors}</div>
                            <div>Dimension: {hoveredComponent.size} | System Status: ONLINE</div>
                          </div>
                        ) : (
                          <span className="text-gray-600 block italic">
                            Hover your mouse over any wireframed sections behind this panel to retrieve instant component metadata parameters...
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* SQL DATABASE SANDBOX TAB */}
                  {devActiveTab === 'SQL' && (
                    <div className="space-y-4 font-mono flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-[9px] uppercase font-bold">// SQL Shard Queries Sandbox</span>
                          <span className="text-[7px] text-gray-500 uppercase">Interactive Query Terminal</span>
                        </div>

                        <div className="bg-[#050506] border border-white/10 rounded-xl overflow-hidden p-2">
                          <div className="flex items-center justify-between text-[8px] pb-1.5 border-b border-white/5 mb-2 text-gray-500">
                            <span>Target Database: tipax_hyper_drivers</span>
                            <span className="text-emerald-400">STATE: LIVE_CONN</span>
                          </div>
                          
                          <textarea 
                            value={sqlQuery}
                            onChange={(e) => setSqlQuery(e.target.value)}
                            className="w-full bg-transparent text-gray-200 outline-none font-mono text-[10px] h-[55px] resize-none leading-relaxed"
                            placeholder="Type PostgreSQL SQL statement..."
                          />

                          <div className="flex justify-between items-center pt-1 border-t border-white/5 mt-2">
                            <span className="text-[8px] text-gray-600 font-sans italic">{'Try typing: "rating > 4.8" or "region = \'Tehran-North\'"'}</span>
                            <button
                              onClick={() => {
                                setSqlError(null);
                                const q = sqlQuery.toLowerCase();
                                
                                // Mock SQL execution logic
                                if (q.includes('drop') || q.includes('delete')) {
                                  setSqlError('FATAL: Write/Drop permissions blocked for read-only sandbox credentials on drivers_shard_01.');
                                  setSqlResult(null);
                                  return;
                                }

                                if (q.includes('injection') || q.includes('or 1=1')) {
                                  setSqlError('WAF DETECTED: Illegal SQL operand threat pattern. Threat deflector auto-blacklisted token.');
                                  setSqlResult(null);
                                  return;
                                }

                                let defaultResults = [
                                  { driver_id: 'dr_920', name: 'Alireza', region: 'Tehran-North', rating: 4.9, active_routes: 2 },
                                  { driver_id: 'dr_104', name: 'Siavash', region: 'Tehran-East', rating: 4.8, active_routes: 1 },
                                  { driver_id: 'dr_841', name: 'Sara', region: 'Tehran-West', rating: 4.7, active_routes: 3 },
                                  { driver_id: 'dr_221', name: 'Rayan', region: 'Tehran-South', rating: 4.5, active_routes: 0 },
                                  { driver_id: 'dr_403', name: 'Nazanin', region: 'Karaj-Edge', rating: 4.6, active_routes: 1 }
                                ];

                                if (q.includes('active_routes') || q.includes('active = true')) {
                                  setSqlResult(defaultResults.filter(d => d.active_routes > 0));
                                } else if (q.includes('tehran-north') || q.includes('north')) {
                                  setSqlResult(defaultResults.filter(d => d.region === 'Tehran-North'));
                                } else if (q.includes('4.8') || q.includes('rating > 4.8')) {
                                  setSqlResult(defaultResults.filter(d => d.rating >= 4.8));
                                } else if (q.includes('sara')) {
                                  setSqlResult(defaultResults.filter(d => d.name === 'Sara'));
                                } else {
                                  setSqlResult(defaultResults);
                                }

                                if (simSoundTick && typeof AudioContext !== 'undefined') {
                                  const ctx = new AudioContext();
                                  const osc = ctx.createOscillator();
                                  const gain = ctx.createGain();
                                  osc.connect(gain);
                                  gain.connect(ctx.destination);
                                  osc.frequency.setValueAtTime(2000, ctx.currentTime);
                                  gain.gain.setValueAtTime(0.01, ctx.currentTime);
                                  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
                                  osc.start();
                                  osc.stop(ctx.currentTime + 0.1);
                                }
                              }}
                              className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[9.5px] text-white hover:bg-white/10 active:scale-95 transition-all flex items-center gap-1 cursor-pointer font-bold"
                            >
                              <Play className="w-2.5 h-2.5" style={{ color: accentColor }} />
                              <span>{lang === 'en' ? 'RUN SQL STATEMENT' : 'اجرای کوئری PostgreSQL'}</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 mt-2">
                        <div className="text-[8.5px] uppercase font-bold text-gray-500">// Execution Query Results</div>
                        <div className="bg-[#030304] rounded-xl border border-white/5 p-2 h-[120px] overflow-y-auto w-full">
                          {sqlError ? (
                            <div className="text-red-400 text-[8.5px] flex items-start gap-1 p-1 font-mono">
                              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                              <div className="whitespace-pre-line leading-relaxed">{sqlError}</div>
                            </div>
                          ) : sqlResult && sqlResult.length > 0 ? (
                            <div className="w-full">
                              <table className="w-full text-left text-[8px] font-mono text-gray-300">
                                <thead>
                                  <tr className="border-b border-white/10 text-gray-500 uppercase">
                                    <th className="py-1">driver_id</th>
                                    <th className="py-1">name</th>
                                    <th className="py-1">region</th>
                                    <th className="py-1">rating</th>
                                    <th className="py-1 text-right">routes_cnt</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {sqlResult.map((row, rI) => (
                                    <tr key={rI} className="border-b border-white/2 hover:bg-white/2">
                                      <td className="py-1 font-bold text-white shrink-0">{row.driver_id}</td>
                                      <td className="py-1 text-gray-400">{row.name}</td>
                                      <td className="py-1 text-gray-400">{row.region}</td>
                                      <td className="py-1 font-bold" style={{ color: accentColor }}>{row.rating}</td>
                                      <td className="py-1 text-right text-gray-300">{row.active_routes}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              <div className="text-[7.5px] text-gray-600 mt-2 text-right">
                                Returned {sqlResult.length} rows inside Postgres cluster pool (0.42ms execution duration)
                              </div>
                            </div>
                          ) : (
                            <div className="text-gray-600 text-[8.5px] italic text-center pt-8">
                              Query yielded zero driver records in this sector layout. Try a broader select.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SANDBOX TAB - DIRECT MICRO-COMPILER COCKPIT */}
                  {devActiveTab === 'SANDBOX' && (
                    <div className="space-y-4 font-mono flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[9px]">
                          <span className="text-gray-400 uppercase font-black">// Interactive Sandbox Language Engine</span>
                          <span className="text-[7.5px] text-gray-500 uppercase font-bold">RECONCILER COMPILER</span>
                        </div>

                        {/* Template Selectors */}
                        <div className="grid grid-cols-3 gap-1.5 text-[8.5px]">
                          {[
                            { id: 'DART', label: 'Dart Micro', code: `// Dart High Performance microservice routing\nvoid main() async {\n  final channel = SystemChannel("com.tipax.router");\n  channel.stream((packet) {\n    final latency = packet.timestamp.elapsed();\n    Telemetry.track("tipax_dispatch_latency", latency);\n  });\n}` },
                            { id: 'EXPRESS', label: 'Express Proxy', code: `// Express API Gateway load proxy route\napp.post('/api/gateway/route', async (req, res) => {\n  const shard = ShardManager.getShardForRegion(req.body.senderRegion);\n  const response = await shard.proxyForward(req.body);\n  return res.json(response);\n});` },
                            { id: 'DOCKER', label: 'K8s Container', code: `# Optimized Dockerfile for multi-region microservices\nFROM alpine:3.18 as builder\nCOPY . /app\nRUN cargo build --release\nFROM scratch\nCOPY --from=builder /app/target/release/server /server\nCMD ["/server"]` },
                          ].map((tmpl) => (
                            <button
                              key={tmpl.id}
                              onClick={() => {
                                setSandboxCodeTemplateActive(tmpl.id as any);
                                setSandboxCodeText(tmpl.code);
                                setSandboxCompilerLogs([]);
                              }}
                              className={`py-1 rounded border text-[8px] font-black cursor-pointer transition-all uppercase text-center ${
                                sandboxCodeTemplateActive === tmpl.id
                                  ? 'bg-white/10 text-white'
                                  : 'bg-transparent text-gray-500 border-white/5 hover:border-white/10'
                              }`}
                              style={{ borderColor: sandboxCodeTemplateActive === tmpl.id ? accentColor + '60' : undefined }}
                            >
                              {tmpl.label}
                            </button>
                          ))}
                        </div>

                        <div className="bg-[#050506] border border-white/10 rounded-xl p-2 relative">
                          <textarea
                            value={sandboxCodeText}
                            onChange={(e) => setSandboxCodeText(e.target.value)}
                            className="w-full bg-transparent text-gray-200 outline-none font-mono text-[9px] h-[75px] leading-relaxed resize-none"
                            style={{ fontVariantLigatures: 'none' }}
                          />
                          <div className="absolute top-2 right-2 text-[6.5px] px-1 py-0.2 bg-white/5 text-gray-500 rounded font-mono uppercase font-bold uppercase">
                            {sandboxCodeTemplateActive} VM
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 mt-2">
                        <div className="flex justify-between items-center text-[8px]">
                          <span className="text-gray-500 uppercase">Compiler Evaluation Terminal</span>
                          <button
                            onClick={() => {
                              if (sandboxCompilerRunning) return;
                              setSandboxCompilerRunning(true);
                              
                              let logs = [
                                'Initializing V8 sandbox environment...',
                                `Loading active ${sandboxCodeTemplateActive} syntax tree mapper...`,
                                'Tree-shaking redundant dependencies (removed 14.1 KB dead code)...',
                                'Checking static analyzer for type alignment variables...',
                                'Building binary executable file format in memory...',
                                'Hot-deploying standalone image to active Cloud Run K8s pods...',
                                'SYSTEM VERIFIED: Unit build success with 0 warnings. Active swap sequence completed successfully.'
                              ];

                              // Print them sequentially for dramatic hacking effect
                              let currentLogList: string[] = [];
                              logs.forEach((logLine, idx) => {
                                setTimeout(() => {
                                  currentLogList.push(`[${new Date().toISOString().slice(11, 19)}] ` + logLine);
                                  setSandboxCompilerLogs([...currentLogList]);
                                  if (idx === logs.length - 1) {
                                    setSandboxCompilerRunning(false);
                                    // Also append deployment to system logs
                                    setTerminalLogs((prev) => [
                                      ...prev.slice(-25),
                                      `[CI-CD-SANDBOX] [${new Date().toISOString().slice(11, 19)}] BUILD EVENT TRIGGERED! Sandbox successfully compiled and swapped on K8s drivers cluster.`
                                    ]);
                                  }
                                }, (idx + 1) * 280);
                              });

                              if (simSoundTick && typeof AudioContext !== 'undefined') {
                                const ctx = new AudioContext();
                                const osc = ctx.createOscillator();
                                const gain = ctx.createGain();
                                osc.connect(gain);
                                gain.connect(ctx.destination);
                                osc.frequency.setValueAtTime(1200, ctx.currentTime);
                                gain.gain.setValueAtTime(0.01, ctx.currentTime);
                                gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
                                osc.start();
                                osc.stop(ctx.currentTime + 0.3);
                              }
                            }}
                            disabled={sandboxCompilerRunning}
                            className={`px-3 py-1 flex items-center gap-1 font-bold rounded text-[9px] uppercase cursor-pointer transition-all ${
                              sandboxCompilerRunning 
                                ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20 cursor-not-allowed animate-pulse' 
                                : 'bg-[#9EFF00]/10 border border-[#9EFF00]/20 hover:bg-[#9EFF00]/20'
                            }`}
                            style={{ 
                              borderColor: !sandboxCompilerRunning ? accentColor + '40' : undefined,
                              color: !sandboxCompilerRunning ? accentColor : undefined 
                            }}
                          >
                            <RefreshCw className={`w-2.5 h-2.5 ${sandboxCompilerRunning ? 'animate-spin' : ''}`} />
                            <span>{sandboxCompilerRunning ? 'COMPILING UNIT...' : 'COMPILE & HOT-SWAP DEPLOY'}</span>
                          </button>
                        </div>

                        <div className="bg-[#030304] rounded-xl border border-white/5 p-2 h-[80px] overflow-y-auto font-mono text-[7.5px] leading-relaxed text-gray-400 space-y-0.5">
                          {sandboxCompilerLogs.length > 0 ? (
                            sandboxCompilerLogs.map((log, lIdx) => (
                              <div key={lIdx} className={log.includes('success') || log.includes('VERIFIED') ? 'text-emerald-400 font-bold' : 'text-gray-300'}>
                                {log}
                              </div>
                            ))
                          ) : (
                            <div className="text-gray-600 italic text-center pt-5">
                              Compile sandbox code unit to mount live memory changes and stream Hot-Swap event variables.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TOPOLOGY TAB - INTERACTIVE NETWORK TOPOLOGY MAP */}
                  {devActiveTab === 'TOPOLOGY' && (
                    <div className="space-y-4 font-mono flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center bg-white/2 p-2 rounded border border-white/5">
                          <span className="text-gray-400 text-[9px] uppercase font-bold">// System Architecture Interconnect</span>
                          <span className="text-[7.5px] text-gray-500 uppercase">Interactive Network Node Map</span>
                        </div>
                        <div className="text-[7.5px] text-gray-500 italic pb-1">
                          Click any node below to simulate instant gateway SRE outages and toggle performance metrics.
                        </div>
                      </div>

                      {/* Cool Interactive SVG Network Graph */}
                      <div className="bg-black/80 rounded-2xl border border-white/5 p-4 flex items-center justify-center relative min-h-[160px]">
                        <svg viewBox="0 0 400 160" className="w-full h-full max-h-[160px] cursor-pointer">
                          {/* Pulsing connection pipelines */}
                          {/* Client -> Gateway Line */}
                          <line 
                            x1="50" y1="80" x2="150" y2="80" 
                            stroke={gatewayNodeState === 'DOWN' ? '#ef4444' : accentColor} 
                            strokeWidth="1.5" 
                            strokeDasharray="4 4" 
                            className="animate-pulse"
                            style={{
                              animationDuration: `${Math.max(0.5, 3 - (syntheticLoad / 3000))}s`,
                              animationDirection: 'reverse'
                            }}
                          />
                          {/* Gateway -> Cache Line */}
                          <line 
                            x1="150" y1="80" x2="250" y2="40" 
                            stroke={gatewayNodeState === 'DOWN' ? '#ef4444' : '#00d1ff'} 
                            strokeWidth="1" 
                            strokeDasharray="3 3"
                            style={{
                              animationDuration: '1.5s',
                            }}
                          />
                          {/* Gateway -> DB Line */}
                          <line 
                            x1="150" y1="80" x2="250" y2="120" 
                            stroke={gatewayNodeState === 'DOWN' ? '#ef4444' : '#ff6b00'} 
                            strokeWidth="1" 
                            strokeDasharray="3 3"
                          />
                          {/* Cache -> DB sync link */}
                          <line 
                            x1="250" y1="40" x2="250" y2="120" 
                            stroke="#7b61ff" 
                            strokeWidth="0.8" 
                            strokeDasharray="2 2"
                          />
                          {/* SRE monitor link */}
                          <line 
                            x1="150" y1="80" x2="350" y2="80" 
                            stroke="#9eff00" 
                            strokeWidth="0.8" 
                          />

                          {/* Nodes */}
                          {/* Client Node */}
                          <g transform="translate(50, 80)">
                            <circle r="14" fill="#111" stroke="#888" strokeWidth="1.5" />
                            <circle r="4" fill="#fff" />
                            <text y="-20" textAnchor="middle" fill="#aaa" fontSize="7" fontFamily="monospace">Web Client</text>
                            <text y="24" textAnchor="middle" fill="#666" fontSize="6" fontFamily="monospace">60 FPS</text>
                          </g>

                          {/* Gateway Node */}
                          <g 
                            transform="translate(150, 80)"
                            onClick={() => {
                              if (gatewayNodeState === 'HEALTHY') {
                                setGatewayNodeState('DEGRADED');
                                setSyntheticLatency(180);
                                setSyntheticError(15);
                                setTerminalLogs((prev) => [...prev.slice(-20), `[SRE-ALERT] Gateway sharding router DEGRADED by manual SRE testing trigger.`]);
                              } else if (gatewayNodeState === 'DEGRADED') {
                                setGatewayNodeState('DOWN');
                                setSyntheticLatency(600);
                                setSyntheticError(95);
                                setTerminalLogs((prev) => [...prev.slice(-20), `[SRE-CRITICAL] Gateway sharding router COMPLETELY OFFLINE. Packet loss peaking at 95%.`]);
                              } else {
                                setGatewayNodeState('HEALTHY');
                                setSyntheticLatency(50);
                                setSyntheticError(2);
                                setTerminalLogs((prev) => [...prev.slice(-20), `[SRE-HEAL] Manual trigger resolved outage. Shard router nodes stabilized.`]);
                              }
                            }}
                          >
                            <circle 
                              r="18" 
                              fill="#111" 
                              stroke={gatewayNodeState === 'HEALTHY' ? accentColor : gatewayNodeState === 'DEGRADED' ? '#f59e0b' : '#ef4444'} 
                              strokeWidth="2.5" 
                              className="animate-pulse"
                            />
                            <path d="M-5 -5 L5 5 M5 -5 L-5 5" stroke="#fff" strokeWidth="1.5" />
                            <text y="-24" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold" fontFamily="monospace">API Gateway</text>
                            <text y="28" textAnchor="middle" fill={gatewayNodeState === 'HEALTHY' ? '#10b981' : gatewayNodeState === 'DEGRADED' ? '#f59e0b' : '#ef4444'} fontSize="6.5" fontWeight="bold" fontFamily="monospace">{gatewayNodeState}</text>
                          </g>

                          {/* Cache Node */}
                          <g 
                            transform="translate(250, 40)"
                            onClick={() => {
                              setTerminalLogs(p => [...p, `[CACHE-SYNC] Flashed active Redis memory cache buffers (allocated: 12.4 MB). Cache warmth rebuilding.`]);
                            }}
                          >
                            <circle r="13" fill="#111" stroke="#00d1ff" strokeWidth="1.5" />
                            <rect x="-5" y="-5" width="10" height="10" fill="#00d1ff" opacity="0.8" />
                            <text y="-18" textAnchor="middle" fill="#999" fontSize="7" fontFamily="monospace">Redis Sync</text>
                            <text y="22" textAnchor="middle" fill="#666" fontSize="6" fontFamily="monospace">12 MB Heap</text>
                          </g>

                          {/* DB Node */}
                          <g 
                            transform="translate(250, 120)"
                            onClick={() => {
                              setTerminalLogs(p => [...p, `[DB-SHARD] Forced partition sweep across PostgreSQL drivers shards block. Found 0 locks.`]);
                            }}
                          >
                            <circle r="13" fill="#111" stroke="#ff6b00" strokeWidth="1.5" />
                            <path d="M-6 -4 L6 -4 M-6 0 L6 0 M-6 4 L6 4" stroke="#ff6b00" strokeWidth="1.5" />
                            <text y="22" textAnchor="middle" fill="#999" fontSize="7" fontFamily="monospace">PostgreSQL Shard</text>
                          </g>

                          {/* SRE telemetry Node */}
                          <g transform="translate(350, 80)">
                            <polygon points="0,-12 12,8 -12,8" fill="#111" stroke="#9eff00" strokeWidth="1.5" />
                            <circle r="2" fill="#9eff00" className="animate-ping" />
                            <text y="-18" textAnchor="middle" fill="#aaa" fontSize="7" fontFamily="monospace">Telemetry Pod</text>
                            <text y="20" textAnchor="middle" fill="#666" fontSize="6" fontFamily="monospace">K8s Agent</text>
                          </g>
                        </svg>

                        <div className="absolute bottom-2 left-3 text-[7px] text-gray-500 font-sans leading-none">
                          * Click API Gateway multiple times to simulate regional microservice node downtime loops.
                        </div>
                      </div>

                      {/* Spark telemetry dashboard */}
                      <div className="grid grid-cols-3 gap-2 text-[8px] font-mono">
                        <div className="bg-white/2 border border-white/5 p-1.5 rounded text-left">
                          <span className="text-gray-500 block">SHARD ACTIVE CONN</span>
                          <span className="text-white font-black block text-[10px] mt-0.5">Tehran-Router_West</span>
                          <span className="text-gray-600 block mt-0.2">Replicated (Frankfurt sync)</span>
                        </div>
                        <div className="bg-white/2 border border-white/5 p-1.5 rounded text-left">
                          <span className="text-gray-500 block">CACHE RECOVERY RATE</span>
                          <span className="text-green-400 font-black block text-[10px] mt-0.5">99.85 %</span>
                          <span className="text-gray-600 block mt-0.2">Hot Cache Warmup</span>
                        </div>
                        <div className="bg-white/2 border border-white/5 p-1.5 rounded text-left">
                          <span className="text-gray-500 block">SRE CRASH GUARD</span>
                          <span className="text-cyan-400 font-black block text-[10px] mt-0.5">Active Deflector</span>
                          <span className="text-gray-600 block mt-0.2">Bypassing memory corruption</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* GIT TAB - BILINGUAL ROLLOUT WORKFLOW & STAGINGS */}
                  {devActiveTab === 'GIT' && (
                    <div className="space-y-4 font-mono flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[9px]">
                          <span className="text-gray-400 uppercase font-black">// Interactive Simulated Hotfix Pipelines</span>
                          <span className="text-[7.5px] text-gray-400 uppercase">Git Workflows</span>
                        </div>

                        {/* Interactive Branch Deployer form */}
                        <div className="bg-[#050506] border border-white/10 rounded-xl p-3 space-y-2 text-[9px]">
                          <div className="space-y-1">
                            <span className="text-gray-500 font-bold block">TARGET PUSH BRANCH:</span>
                            <input 
                              type="text" 
                              value={gitCustomBranch}
                              onChange={(e) => setGitCustomBranch(e.target.value)}
                              className="w-full bg-transparent border border-white/10 p-1.5 p-y px-2.5 rounded text-white font-mono text-[9.5px] outline-none hover:border-white/10 focus:border-white/25"
                              placeholder="e.g. patch/driver-locking-redis"
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <span className="text-gray-500 font-bold block">COMMIT OUTAGE DESCRIPTION:</span>
                            <input 
                              type="text" 
                              value={gitCommitMessage}
                              onChange={(e) => setGitCommitMessage(e.target.value)}
                              className="w-full bg-transparent border border-white/10 p-1.5 py px-2.5 rounded text-white font-mono text-[9.5px] outline-none hover:border-white/10 focus:border-white/25"
                              placeholder="e.g. fix: isolate locks in cache scheduler queue"
                            />
                          </div>

                          <div className="pt-1 text-right">
                            <button
                              onClick={() => {
                                const hash = Math.random().toString(16).substring(2, 9);
                                setTerminalLogs((prev) => [
                                  ...prev.slice(-25),
                                  `[GIT-ROLLOUT] [${new Date().toISOString().slice(11, 19)}] Initiating CLI git-flow trigger...`,
                                  `[GIT-ROLLOUT] Pushing local changes to remote cluster branch: origin/${gitCustomBranch}`,
                                  `[GIT-ROLLOUT] Compress delta objects: 100% (3/3), pack hash matches [${hash}]`,
                                  `[CI-CD-JENKINS] Thread pool compiled. Webhook accepted by Kubernetes Pod deployment.`,
                                  `[ROLLOUT-DONE] Complete rollout of core patch on regional shard router clusters. Node fully active.`
                                ]);
                                
                                setGitCommitMessage('');
                                
                                if (simSoundTick && typeof AudioContext !== 'undefined') {
                                  const ctx = new AudioContext();
                                  const osc = ctx.createOscillator();
                                  const gain = ctx.createGain();
                                  osc.connect(gain);
                                  gain.connect(ctx.destination);
                                  osc.frequency.setValueAtTime(1700, ctx.currentTime);
                                  gain.gain.setValueAtTime(0.01, ctx.currentTime);
                                  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);
                                  osc.start();
                                  osc.stop(ctx.currentTime + 0.22);
                                }
                              }}
                              disabled={!gitCommitMessage || !gitCustomBranch}
                              className={`px-3 py-1.5 rounded font-black cursor-pointer transition-all uppercase text-[9px] border inline-flex items-center gap-1.5 ${
                                (!gitCommitMessage || !gitCustomBranch)
                                  ? 'bg-transparent text-gray-600 border-white/5 cursor-not-allowed'
                                  : 'bg-[#9EFF00]/10 border-[#9EFF00]/30 hover:bg-[#9EFF00]/20'
                              }`}
                              style={{ 
                                borderColor: (gitCommitMessage && gitCustomBranch) ? accentColor + '40' : undefined,
                                color: (gitCommitMessage && gitCustomBranch) ? accentColor : undefined 
                              }}
                            >
                              <GitBranch className="w-3 h-3 text-[#9eff00]" style={{ color: accentColor }} />
                              <span>{lang === 'en' ? 'PUSH & HOT-DEPLOY' : 'پوش و انتشار مستقیم خط تولید'}</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Horizontal timeline of standard commits */}
                      <div className="space-y-1.5 text-[8.5px] mt-2">
                        <div className="text-gray-500 uppercase font-black">// Shard Deployment Rollouts Track</div>
                        <div className="space-y-1 max-h-[140px] overflow-y-auto">
                          {[
                            { hash: 'e82b71f', branch: 'main', msg: 'Merge feature: multi-region active redis pool sync', color: '#9EFF00' },
                            { hash: 'cfa1103', branch: 'feat/calkilo', msg: 'feat: calibrate dynamic Dart isolate thread scheduler', color: '#00D1FF' },
                            { hash: 'bfa8892', branch: 'hotfix/leak', msg: 'perf: lock bypass thread allocators on local storage', color: '#FF6B00' },
                          ].map((commit, cIdx) => (
                            <div
                              key={commit.hash}
                              className="w-full text-left bg-white/2 border border-white/5 rounded px-2.5 py-1.5 flex flex-col gap-0.5"
                            >
                              <div className="flex items-center justify-between text-gray-500 font-bold shrink-0">
                                <span className="flex items-center gap-1">
                                  <span className="w-1 rounded-full h-1" style={{ backgroundColor: commit.color }} />
                                  <span className="text-white font-mono">{commit.hash}</span>
                                  <span className="text-gray-600 font-sans">({commit.branch})</span>
                                </span>
                                <span className="text-[7.5px] text-[#9eff00] uppercase font-bold" style={{ color: accentColor }}>ACTIVE DEPLOYED</span>
                              </div>
                              <p className="text-gray-300 truncate font-sans text-[8px]">{commit.msg}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* METRICS TAB - CYBER METRICS DECK */}
                  {devActiveTab === 'METRICS' && (
                    <div className="space-y-4 font-mono flex-1 flex flex-col justify-between text-[9px]">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-gray-400">
                          <span className="uppercase font-bold text-[9px]">// Core Tracer Performance Indicators</span>
                          <span className="text-gray-600 uppercase">TELEMETRIES</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { key: 'VIRTUAL RECONCILE DEPTH', val: '7 levels', unit: 'RECONCILED_FAST' },
                            { key: 'CURSOR MOUSE TRACER X', val: `${mousePos.x} px`, unit: 'REALTIME' },
                            { key: 'CURSOR MOUSE TRACER Y', val: `${mousePos.y} px`, unit: 'REALTIME' },
                            { key: 'FLUTTER RE-RENDER SPEED', val: '60.0 FPS', unit: '16.6ms DRAW LATENCY' },
                            { key: 'SQL SHARDS BLOCKED ATTACKS', val: `${chaosSqlInjectionScore} deflections`, unit: 'WAF MONITOR' },
                            { key: 'REDIS HEAP CACHE BUFFERS', val: '144.1 KB', unit: 'CLEAN SCRUBBED' },
                            { key: 'DART THREAD ALLOCATORS', val: '4 Isolates', unit: 'BOND_STABLE' },
                            { key: 'PERSISTED REDUX CLUSTERS', val: '18 modules', unit: 'IN_MEMORY' },
                            { key: 'RENDER PIPELINE GRAPHICS', val: 'Impeller_Vulkan_Engine', unit: 'Direct_GPU' },
                            { key: 'TELEMETRY DISPATCH SPEED', val: `${syntheticLatency} ms`, unit: 'UDP_TUNNELED' },
                          ].map((metric) => (
                            <div key={metric.key} className="bg-white/2 border border-white/5 p-2 rounded">
                              <span className="text-gray-500 uppercase block text-[7px] leading-none">{metric.key}</span>
                              <span className="text-[9.5px] font-black block mt-1 text-white">{metric.val}</span>
                              <span className="text-[7.5px] font-bold block text-[#9EFF00] mt-0.5" style={{ color: accentColor }}>{metric.unit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Spark line visual representation */}
                      <div className="bg-black/90 rounded-xl border border-white/5 p-2 space-y-1.5 mt-2">
                        <div className="flex justify-between text-[7px] text-gray-500 uppercase leading-none">
                          <span>SRE Core Throttling Telemetry Tracker Stream</span>
                          <span className="text-emerald-400">ACTIVE TICK</span>
                        </div>
                        <div className="h-6 flex items-end gap-[2px] pt-1">
                          {[30, 45, 25, 60, 80, 50, 65, 40, 55, 75, 90, 35, 60, 45, 50, 82, 41, 19, 57, 63, 29, 74].map((h, i) => (
                            <div 
                              key={i} 
                              className="flex-1 rounded-sm bg-gray-700 hover:bg-white transition-all transition-duration" 
                              style={{ 
                                height: `${h}%`, 
                                backgroundColor: i % 4 === 0 ? accentColor : undefined,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CONFIG TAB - INTERACTIVE GRIDS, LASERS & EXOTIC THEMES */}
                  {devActiveTab === 'CONFIG' && (
                    <div className="space-y-4 text-[9px] font-mono flex-1 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="text-gray-500 uppercase font-black">// Recalibrate Active Master Layout Accent Colors</div>
                        
                        {/* Theme Swapper Matrix */}
                        <div className="space-y-1.5">
                          <div className="text-gray-300 font-bold text-[8.5px] uppercase tracking-wider">
                            Choose Active System Architectural Layout:
                          </div>
                          <div className="grid grid-cols-4 gap-1.5">
                            {[
                              { name: 'emerald', color: '#9EFF00', label: lang === 'en' ? 'Emerald Neon' : 'زمرد نئون' },
                              { name: 'sky', color: '#00D1FF', label: lang === 'en' ? 'Ocean Aqua' : 'آبی اقیانوسی' },
                              { name: 'plasma', color: '#7B61FF', label: lang === 'en' ? 'Cosmic Plasma' : 'بنفش پلاسمایی' },
                              { name: 'copper', color: '#FF6B00', label: lang === 'en' ? 'Copper Amber' : 'کهربای نارنجی' },
                            ].map((x) => (
                              <button
                                key={x.name}
                                onClick={() => {
                                  setThemeOverride(x.color);
                                  setTerminalLogs((prev) => [
                                    ...prev.slice(-25),
                                    `[THEME-SYNC] Swapped visual accent profile to: ${x.name.toUpperCase()} (${x.color})`,
                                    `[THEME-SYNC] Re-aligning global style matrix overlays in real-time...`
                                  ]);
                                }}
                                className="flex flex-col items-center gap-1.5 p-1.5 bg-white/2 border border-white/5 hover:border-white/15 rounded cursor-pointer text-center"
                              >
                                <span className="w-5 h-5 rounded-full border border-white/10" style={{ backgroundColor: x.color }} />
                                <span className="text-[7px] text-gray-400 font-sans block truncate leading-none w-full">{x.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Interactive Grid laser crosshairs settings */}
                        <div className="flex items-center justify-between py-2 border-t border-b border-white/5 my-2">
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-300 uppercase">Laser CAD Crosshair overlay</span>
                            <span className="text-gray-500 text-[7.5px] font-normal leading-normal">Draw dynamic system coordinate vectors on cursor</span>
                          </div>
                          <button
                            onClick={() => {
                              setQuantumGrid(!quantumGrid);
                              setTerminalLogs((prev) => [
                                ...prev.slice(-25),
                                `[LASER-TRACER] Grid state toggled: ${!quantumGrid ? 'ACTIVE_TRACER' : 'INACTIVE_TRACER'}`
                              ]);
                            }}
                            className="px-2.5 py-1 rounded text-[8px] font-black cursor-pointer uppercase transition-all"
                            style={{ 
                              backgroundColor: quantumGrid ? accentColor + '20' : 'rgba(255,255,255,0.05)',
                              color: quantumGrid ? accentColor : '#888',
                              border: `1px solid ${quantumGrid ? accentColor + '40' : 'transparent'}`
                            }}
                          >
                            {quantumGrid ? (lang === 'en' ? 'ENABLED' : 'فعال') : (lang === 'en' ? 'DISABLED' : 'غیرفعال')}
                          </button>
                        </div>

                        {/* Interactive sliders for latency testing */}
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-gray-300 text-[8.5px]">
                              <span>MOUSE VECTOR GAIN RATE:</span>
                              <span className="font-black" style={{ color: accentColor }}>{laserIntensity} %</span>
                            </div>
                            <input 
                              type="range" 
                              min="5" 
                              max="90" 
                              value={laserIntensity} 
                              onChange={(e) => setLaserIntensity(parseInt(e.target.value))}
                              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                              style={{ accentColor }}
                            />
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-gray-300 text-[8.5px]">
                              <span>SIMULATOR CONCURRENT TRAFFIC:</span>
                              <span className="font-black text-white">{syntheticLoad.toLocaleString()} reqs/s</span>
                            </div>
                            <input 
                              type="range" 
                              min="200" 
                              max="9800" 
                              value={syntheticLoad} 
                              onChange={(e) => setSyntheticLoad(parseInt(e.target.value))}
                              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                              style={{ accentColor }}
                            />
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-gray-300 text-[8.5px]">
                              <span>SIMULATED REPLICATION LATENCY:</span>
                              <span className="font-black text-cyan-400">{syntheticLatency} ms</span>
                            </div>
                            <input 
                              type="range" 
                              min="5" 
                              max="240" 
                              value={syntheticLatency} 
                              onChange={(e) => setSyntheticLatency(parseInt(e.target.value))}
                              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Standard unified live diagnostics stream logs in footer of right box */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[7px] text-gray-500 uppercase font-mono mt-3 shrink-0">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{lang === 'en' ? 'SRE LOG STREAMING: ATTACHED' : 'جریان لاگ متصل است'}</span>
                    </span>
                    <span>SHARDS COUNTER: 32 active</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Miniature closed tray HUD flag if panel is closed but devMode is active */}
          {!devPanelOpen && (
            <motion.button
              key="dev-panel-minimized"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setDevPanelOpen(true)}
              className="fixed bottom-6 right-6 px-4 py-2.5 bg-black/95 border border-[#9EFF00]/30 rounded-full text-[9px] font-black font-mono tracking-widest text-[#9EFF00] shadow-[0_12px_32px_-4px_rgba(158,255,0,0.3)] hover:bg-black transition-colors flex items-center gap-1.5 z-[100] cursor-pointer"
              title="Open HUD Diagnostic Control"
              style={{ borderColor: accentColor + '60', color: accentColor, boxShadow: `0 12px 32px -4px ${accentColor}40` }}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>DIAG_CONSOLE (MINIMIZED)</span>
            </motion.button>
          )}

          {/* Mouse follow real-time element tag tooltip popup in bottom-left */}
          <motion.div 
            key="inspector-overlay"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-6 font-mono text-[9px] bg-black/95 border border-white/10 rounded-xl p-3 shadow-2xl z-[100] max-w-[280px] pointer-events-none text-left leading-relaxed"
          >
            <div className="flex items-center gap-2 text-white font-bold mb-1 pb-1 border-b border-white/5 uppercase">
              <Eye className="w-3.5 h-3.5" style={{ color: accentColor }} />
              <span>Inspector Info Overlay</span>
            </div>
            {hoveredComponent ? (
              <div className="space-y-1 text-gray-400 text-[8px]">
                <div className="text-white text-[9px] font-black">tag: &lt;<span style={{ color: accentColor }}>{hoveredComponent.name}</span> /&gt;</div>
                <div>class: <span style={{ color: accentColor }}>{hoveredComponent.selectors}</span></div>
                <div>viewport: {hoveredComponent.size}</div>
                <div>render_pipe: impeller_vulkan_pipeline</div>
              </div>
            ) : (
              <span className="text-gray-600 font-sans text-[8px] italic leading-tight block">
                Hover cursor over any section with dashed outlines to fetch node metadata specs...
              </span>
            )}
          </motion.div>
        </AnimatePresence>
      )}

    </div>
  );
}
