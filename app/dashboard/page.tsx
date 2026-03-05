'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RadarChart from '../components/RadarChart';
import SystemFooter from '../components/SystemFooter';
import LevelUpModal from '../components/LevelUpModal'; // Injecting the Modal

type Path = 'fat-loss' | 'muscle-gain' | 'balanced';
interface Stats { str: number; agi: number; vit: number; int: number; sen: number; }
interface Quest { id: number; task: string; detail: string; reward: string; goal: string; current: string; unit: string; }

const PATH_STATS: Record<Path, Stats> = {
  'fat-loss':    { str: 42, agi: 78, vit: 55, int: 21, sen: 38 },
  'muscle-gain': { str: 85, agi: 40, vit: 33, int: 21, sen: 50 },
  balanced:      { str: 55, agi: 55, vit: 45, int: 30, sen: 48 },
};

const QUESTS: Record<Path, Quest[]> = {
  'fat-loss': [
    { id: 1, task: 'High Intensity Run',  detail: '5 KM',       reward: '+8 AGI, +5 VIT', goal: '5',   current: '3.2', unit: 'KM'   },
    { id: 2, task: '100 Burpees',         detail: 'Full Sets',  reward: '+6 STR, +4 VIT', goal: '100', current: '100', unit: 'reps' },
    { id: 3, task: 'Shadow Boxing',       detail: '20 Minutes', reward: '+3 AGI, +3 STR', goal: '20',  current: '0',   unit: 'min'  },
  ],
  'muscle-gain': [
    { id: 1, task: 'Heavy Bench Press', detail: '5 × 5',      reward: '+10 STR',         goal: '5x5', current: '5x5', unit: '' },
    { id: 2, task: 'Weighted Squats',   detail: '5 × 5',      reward: '+10 STR, +5 VIT', goal: '5x5', current: '3x5', unit: '' },
    { id: 3, task: 'Deadlift 1RM',      detail: 'Max Effort', reward: '+15 STR',         goal: '1RM', current: '0',   unit: '' },
  ],
  balanced: [
    { id: 1, task: 'Push-ups',     detail: '100 Reps',   reward: '+5 STR, +2 VIT', goal: '100', current: '100', unit: 'reps' },
    { id: 2, task: 'Running',      detail: '10 KM',      reward: '+8 AGI, +5 VIT', goal: '10',  current: '6.2', unit: 'KM'   },
    { id: 3, task: 'Core Circuit', detail: '30 Minutes', reward: '+3 AGI, +3 STR', goal: '30',  current: '0',   unit: 'min'  },
  ],
};

const RANK_TITLES: Record<Path, string> = {
  'fat-loss':    'Shadow Runner',
  'muscle-gain': 'Iron Monarch',
  balanced:      'The Weakest Hunter',
};

function useCountdown(initialSeconds: number) {
  const [secs, setSecs] = useState(initialSeconds);
  useEffect(() => {
    const t = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = String(Math.floor(secs / 3600)).padStart(2, '0');
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function GlitchRank({ rank }: { rank: string }) {
  const [glitching, setGlitching] = useState(false);
  useEffect(() => {
    const t = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 120);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative select-none">
      <span className="text-5xl font-black leading-none block" style={{
        fontFamily: "'Rajdhani', sans-serif",
        color: '#f59e0b',
        textShadow: glitching ? '3px 0 #7c3aed, -3px 0 #06b6d4' : '0 0 24px rgba(245,158,11,0.45)',
        transition: 'text-shadow 0.05s',
      }}>
        {rank}
      </span>
      {glitching && (
        <>
          <span className="absolute inset-0 text-5xl font-black leading-none" style={{
            fontFamily: "'Rajdhani', sans-serif", color: '#7c3aed',
            clipPath: 'inset(20% 0 50% 0)', transform: 'translateX(4px)', opacity: 0.7,
          }}>{rank}</span>
          <span className="absolute inset-0 text-5xl font-black leading-none" style={{
            fontFamily: "'Rajdhani', sans-serif", color: '#06b6d4',
            clipPath: 'inset(55% 0 15% 0)', transform: 'translateX(-3px)', opacity: 0.6,
          }}>{rank}</span>
        </>
      )}
    </div>
  );
}

export default function Dashboard() {
  const [path, setPath]           = useState<Path>('balanced');
  const [completed, setCompleted] = useState<number[]>([]);
  const [booted, setBooted]       = useState(false);
  const countdown                 = useCountdown(14 * 3600 + 22 * 60 + 5);

  // --- NEW LEVEL UP STATES ---
  const [playerLevel, setPlayerLevel] = useState(14);
  const [isLevelUpOpen, setIsLevelUpOpen] = useState(false);

  useEffect(() => { const t = setTimeout(() => setBooted(true), 800); return () => clearTimeout(t); }, []);

  const stats  = PATH_STATS[path];
  const quests = QUESTS[path];
  const xp = 6500; const xpMax = 10000;
  const xpPct = Math.round((xp / xpMax) * 100);
  const qPct  = quests.length ? Math.round((completed.length / quests.length) * 100) : 0;

  const toggle = (id: number) =>
    setCompleted((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  const handlePathChange = (next: Path) => { setPath(next); setCompleted([]); };

  // --- AUTO-TRIGGER LEVEL UP WHEN QUESTS HIT 100% ---
  useEffect(() => {
    if (qPct === 100) {
      const timer = setTimeout(() => {
        setIsLevelUpOpen(true);
      }, 1000); // 1-second dramatic delay after finishing the last quest
      return () => clearTimeout(timer);
    }
  }, [qPct]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700;800&display=swap');
        * { -webkit-font-smoothing: antialiased; }
        ::selection { background: rgba(139,92,246,0.25); }
      `}</style>

      <div className="min-h-screen pb-32" style={{
        background: 'linear-gradient(160deg, #080010 0%, #050008 40%, #000010 100%)',
        fontFamily: "'JetBrains Mono', monospace",
      }}>

        {/* Shadow orbs */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {[
            { size: 300, x: '5%',  y: '8%',  color: '139,92,246', dur: 6 },
            { size: 200, x: '70%', y: '15%', color: '245,158,11', dur: 8 },
            { size: 250, x: '20%', y: '55%', color: '139,92,246', dur: 7 },
            { size: 180, x: '80%', y: '60%', color: '6,182,212',  dur: 9 },
          ].map((orb, i) => (
            <motion.div key={i}
              className="absolute rounded-full"
              style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y,
                background: `radial-gradient(circle, rgba(${orb.color},0.05) 0%, transparent 70%)` }}
              animate={{ y: [0, -24, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: orb.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
            />
          ))}
          {/* Scanline */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)',
          }} />
        </div>

        {/* Boot overlay */}
        <AnimatePresence>
          {!booted && (
            <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
              className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-3"
              style={{ background: '#080010' }}>
              <motion.div
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1, times: [0, 0.15, 0.85, 1] }}
                className="flex flex-col items-center gap-3"
              >
                <motion.div
                  animate={{ scaleX: [0, 1] }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="h-px w-48"
                  style={{ background: 'linear-gradient(90deg, transparent, #7c3aed, transparent)' }}
                />
                <p className="text-xs tracking-[0.4em] uppercase" style={{ color: 'rgba(139,92,246,0.8)' }}>
                  System Initializing
                </p>
                <motion.div
                  animate={{ scaleX: [0, 1] }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                  className="h-px w-32"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)' }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── HEADER ── */}
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          className="relative z-10 px-6 pt-10 pb-5 flex justify-between items-start"
          style={{ borderBottom: '1px solid rgba(139,92,246,0.12)' }}
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <motion.span
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full block"
                style={{ background: '#7c3aed' }}
              />
              <span className="text-[8px] tracking-[0.35em] uppercase" style={{ color: 'rgba(139,92,246,0.55)' }}>
                The System Watches
              </span>
            </div>
            <h1 className="text-3xl font-black italic tracking-tight uppercase leading-none text-white"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              STAT<span style={{ color: '#f59e0b' }}>MAX</span>
            </h1>
            <p className="text-[8px] tracking-[0.2em] mt-1 uppercase" style={{ color: 'rgba(255,255,255,0.12)' }}>
              Hunter Interface // Shadow System
            </p>
          </div>
          <div className="text-right">
            <p className="text-[8px] tracking-[0.2em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.2)' }}>Rank</p>
            <GlitchRank rank="E" />
            <p className="text-[7px] tracking-widest uppercase mt-1" style={{ color: 'rgba(245,158,11,0.3)' }}>
              Rank-Up Available
            </p>
          </div>
        </motion.header>

        <main className="relative z-10 px-6 max-w-md mx-auto flex flex-col gap-5 mt-5">

          {/* ── HUNTER CARD ── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.45 }}
            className="rounded-xl relative overflow-hidden p-5"
            style={{
              background: 'linear-gradient(135deg, rgba(139,92,246,0.07) 0%, rgba(8,0,16,0.95) 60%, #000 100%)',
              border: '1px solid rgba(139,92,246,0.18)',
            }}
          >
            {/* Corner glow */}
            <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
              style={{ background: 'radial-gradient(circle at top right, rgba(139,92,246,0.08), transparent 65%)' }} />
            {/* Brackets */}
            {[['top-2 left-2', 'border-t border-l'], ['top-2 right-2', 'border-t border-r'],
              ['bottom-2 left-2', 'border-b border-l'], ['bottom-2 right-2', 'border-b border-r']].map(([pos, bdr], i) => (
              <div key={i} className={`absolute ${pos} w-3 h-3 ${bdr}`} style={{ borderColor: 'rgba(139,92,246,0.35)' }} />
            ))}

            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 rounded text-[8px] font-bold tracking-[0.2em] uppercase"
                style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.28)', color: '#a78bfa' }}>
                [ E-Rank ]
              </span>
              <span className="text-[8px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.18)' }}>
                {RANK_TITLES[path]}
              </span>
            </div>

            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-[7px] tracking-[0.2em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.18)' }}>Hunter</p>
                <h2 className="text-2xl font-black uppercase tracking-tight leading-none text-white"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}>JC Alcantara</h2>
              </div>
              <div className="text-right">
                <p className="text-[7px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.18)' }}>Level</p>
                {/* DYNAMIC LEVEL INJECTED HERE */}
                <p className="text-3xl font-black leading-none" style={{ fontFamily: "'Rajdhani', sans-serif", color: '#f59e0b' }}>{playerLevel}</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[8px] mb-1.5 tracking-widest">
                <span className="uppercase" style={{ color: 'rgba(139,92,246,0.6)' }}>Experience</span>
                <span style={{ color: 'rgba(255,255,255,0.25)' }}>{xp.toLocaleString()} / {xpMax.toLocaleString()}</span>
              </div>
              <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <motion.div
                  initial={{ width: 0 }} animate={{ width: `${xpPct}%` }}
                  transition={{ duration: 1.4, ease: 'easeOut', delay: 1.1 }}
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #7c3aed, #f59e0b)', boxShadow: '0 0 12px rgba(245,158,11,0.45)' }}
                />
              </div>
              <p className="text-[7px] mt-1.5 tracking-widest" style={{ color: 'rgba(255,255,255,0.12)' }}>
                {xpPct}% TO LEVEL {playerLevel + 1}
              </p>
            </div>

            <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              <p className="text-[7px] tracking-[0.25em] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.15)' }}>Active Path</p>
              <div className="flex gap-2">
                {([
                  { key: 'fat-loss',    label: 'Agility'  },
                  { key: 'balanced',    label: 'Monarch'  },
                  { key: 'muscle-gain', label: 'Strength' },
                ] as { key: Path; label: string }[]).map(({ key, label }) => (
                  <motion.button key={key} whileTap={{ scale: 0.94 }}
                    onClick={() => handlePathChange(key)}
                    className="flex-1 py-1.5 rounded text-[8px] font-bold tracking-widest uppercase transition-all"
                    style={{
                      border:     path === key ? '1px solid rgba(139,92,246,0.55)' : '1px solid rgba(255,255,255,0.06)',
                      background: path === key ? 'rgba(139,92,246,0.14)' : 'rgba(255,255,255,0.02)',
                      color:      path === key ? '#a78bfa' : 'rgba(255,255,255,0.2)',
                    }}>{label}</motion.button>
                ))}
              </div>
            </div>
          </motion.section>

          {/* ── ABILITY ASSESSMENT ── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.45 }}
            className="rounded-xl p-5"
            style={{ background: 'rgba(8,0,16,0.75)', border: '1px solid rgba(139,92,246,0.12)' }}
          >
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-[9px] tracking-[0.3em] font-bold uppercase" style={{ color: 'rgba(139,92,246,0.75)' }}>
                ◈ Ability Assessment
              </h2>
              <span className="text-[7px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.12)' }}>System Scan</span>
            </div>

            <RadarChart stats={stats} />

            <div className="grid grid-cols-5 gap-2 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              {(Object.entries(stats) as [keyof Stats, number][]).map(([key, val], i) => (
                <motion.div key={key} className="text-center"
                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + i * 0.06 }}>
                  <p className="text-[7px] tracking-widest uppercase mb-1" style={{ color: 'rgba(139,92,246,0.45)' }}>{key}</p>
                  <p className="text-sm font-black text-white" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{val}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ── DAILY PENALTY QUEST ── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.45 }}
          >
            <div className="flex justify-between items-center mb-3 px-1">
              <h2 className="text-[9px] tracking-[0.3em] font-bold uppercase" style={{ color: 'rgba(245,158,11,0.75)' }}>
                ◈ Daily Penalty Quest
              </h2>
              <span className="text-[8px] tracking-widest uppercase" style={{ color: 'rgba(239,68,68,0.55)' }}>
                Forfeit: {countdown}
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              <AnimatePresence mode="popLayout">
                {quests.map((q, idx) => {
                  const done    = completed.includes(q.id);
                  const numGoal = parseFloat(q.goal); const numCurr = parseFloat(q.current);
                  const progress = q.goal === q.current ? 1 : q.current === '0' ? 0
                    : !isNaN(numGoal) && !isNaN(numCurr) ? numCurr / numGoal : 0;

                  return (
                    <motion.div
                      key={`${path}-${q.id}`}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }} transition={{ delay: idx * 0.07 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggle(q.id)}
                      className="rounded-xl p-4 cursor-pointer"
                      style={{
                        background: done ? 'rgba(245,158,11,0.05)' : 'rgba(8,0,16,0.6)',
                        border: done ? '1px solid rgba(245,158,11,0.25)' : '1px solid rgba(139,92,246,0.1)',
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 w-5 h-5 rounded shrink-0 flex items-center justify-center transition-all"
                          style={{
                            border:     done ? '1px solid #f59e0b' : '1px solid rgba(139,92,246,0.3)',
                            background: done ? 'rgba(245,158,11,0.12)' : 'transparent',
                          }}>
                          {done && (
                            <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} width="10" height="10" viewBox="0 0 10 10">
                              <path d="M1.5 5L4 7.5L8.5 2.5" stroke="#f59e0b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                            </motion.svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold uppercase leading-snug"
                            style={{ textDecoration: done ? 'line-through' : 'none', color: done ? 'rgba(245,158,11,0.4)' : '#fff' }}>
                            {q.task}
                          </p>
                          <p className="text-[8px] tracking-widest mt-0.5" style={{ color: 'rgba(255,255,255,0.22)' }}>{q.detail}</p>
                          <p className="text-[8px] tracking-widest mt-1 uppercase" style={{ color: 'rgba(139,92,246,0.55)' }}>
                            Reward: {q.reward}
                          </p>
                          {!done && progress > 0 && progress < 1 && (
                            <div className="mt-2 h-px rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                              <motion.div initial={{ width: 0 }} animate={{ width: `${progress * 100}%` }}
                                transition={{ duration: 0.8 }} className="h-full"
                                style={{ background: 'rgba(139,92,246,0.6)' }} />
                            </div>
                          )}
                        </div>
                        <div className="shrink-0 text-right text-[8px] tracking-widest uppercase mt-0.5">
                          {done ? <span style={{ color: '#f59e0b' }}>Done</span>
                            : q.current === '0' ? <span style={{ color: 'rgba(239,68,68,0.5)' }}>Pending</span>
                            : <span style={{ color: 'rgba(255,255,255,0.28)' }}>{q.current}/{q.goal}{q.unit}</span>}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.section>

          {/* ── ARISE THRESHOLD ── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.45, duration: 0.45 }}
            className="rounded-xl p-4"
            style={{ background: 'rgba(8,0,16,0.7)', border: '1px solid rgba(139,92,246,0.1)' }}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(139,92,246,0.5)' }}>
                Arise Threshold
              </span>
              <span className="text-xs font-black" style={{
                fontFamily: "'Rajdhani', sans-serif",
                color: qPct === 100 ? '#f59e0b' : '#fff',
              }}>{qPct}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <motion.div animate={{ width: `${qPct}%` }} transition={{ duration: 0.5 }}
                className="h-full rounded-full"
                style={{
                  background: qPct === 100 ? 'linear-gradient(90deg, #7c3aed, #f59e0b)' : 'rgba(139,92,246,0.65)',
                  boxShadow: qPct > 0 ? '0 0 10px rgba(139,92,246,0.35)' : 'none',
                }} />
            </div>
            <AnimatePresence>
              {qPct === 100 && (
                <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                  className="text-[8px] text-center tracking-[0.25em] mt-3 uppercase"
                  style={{ color: '#f59e0b' }}>
                  ✦ Arise — Level Up Initiated ✦
                </motion.p>
              )}
            </AnimatePresence>
          </motion.section>

          {/* DEMO TRIGGER BUTTON (Hide this for final production) */}
          <button 
            onClick={() => setIsLevelUpOpen(true)}
            className="py-3 mt-4 border border-amber-500/20 rounded font-mono text-[10px] text-amber-500/50 hover:bg-amber-500/10 uppercase tracking-widest transition-colors"
          >
            [ Force System Level Up ]
          </button>

          {/* THE LEVEL UP MODAL */}
          <LevelUpModal 
            isOpen={isLevelUpOpen}
            onClose={() => {
              setIsLevelUpOpen(false);
              setPlayerLevel(prev => prev + 1);
            }}
            newLevel={playerLevel + 1}
            statIncreases={[
              { label: 'Strength', amount: 4 },
              { label: 'Agility', amount: 2 },
              { label: 'Vitality', amount: 1 },
            ]}
          />

        </main>
        <SystemFooter active="status" />
      </div>
    </>
  );
}