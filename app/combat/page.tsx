'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Hourglass, Play, Pause, RotateCcw, Plus, ChevronRight, Skull } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import SystemFooter from '../components/SystemFooter';
import { WORKOUT_PLANS, ACCENT_CLASSES } from '../lib/workouts';

const DEFAULT_REST = 90;

function formatTime(s: number) {
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

function CombatInterface() {
  const searchParams = useSearchParams();
  const dungeon = WORKOUT_PLANS.find((p) => p.id === searchParams.get('id')) ?? WORKOUT_PLANS[0];
  const ac = ACCENT_CLASSES[dungeon.accent];

  const [activeExIdx, setActiveExIdx]     = useState(0);
  const [completedSets, setCompletedSets] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft]           = useState(DEFAULT_REST);
  const [isRunning, setIsRunning]         = useState(false);
  const [showClear, setShowClear]         = useState(false);

  const activeEx   = dungeon.exercises[activeExIdx];
  const totalSets  = parseInt(activeEx?.reps?.split('x')[0]) || 3;
  const setsForThis = completedSets[activeExIdx] ?? 0;

  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft <= 0) { setIsRunning(false); return; }
    const t = setInterval(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [isRunning, timeLeft]);

  const allDone = dungeon.exercises.every((ex, i) => {
    const sets = parseInt(ex.reps?.split('x')[0]) || 3;
    return (completedSets[i] ?? 0) >= sets;
  });

  useEffect(() => { if (allDone) setShowClear(true); }, [allDone]);

  const logSet = () => {
    const next = setsForThis + 1;
    setCompletedSets((prev) => ({ ...prev, [activeExIdx]: next }));
    if (next < totalSets) { setTimeLeft(DEFAULT_REST); setIsRunning(true); }
  };

  const accentRgb =
    dungeon.accent === 'orange' ? '249,115,22'
    : dungeon.accent === 'blue'    ? '96,165,250'
    : dungeon.accent === 'emerald' ? '52,211,153'
    : dungeon.accent === 'pink'    ? '244,114,182'
    : '245,158,11';

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700;800&display=swap');`}</style>

      <div className="min-h-screen pb-28" style={{
        background: 'linear-gradient(160deg, #080010 0%, #050008 40%, #000010 100%)',
        fontFamily: "'JetBrains Mono', monospace",
      }}>
        {/* Scanline */}
        <div className="fixed inset-0 pointer-events-none z-0"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)' }} />

        {/* ── HEADER ── */}
        <header className="relative z-10 pt-12 pb-5 px-6 flex items-center justify-between"
          style={{ borderBottom: `1px solid rgba(${accentRgb},0.15)` }}>
          <Link href="/dungeons" className="flex items-center gap-2 transition-opacity hover:opacity-70"
            style={{ color: `rgba(${accentRgb},0.8)` }}>
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-bold tracking-widest uppercase"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}>{dungeon.name}</span>
          </Link>
          <div className="flex items-center gap-2 text-[10px] tracking-widest" style={{ color: 'rgba(239,68,68,0.7)' }}>
            <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full block" style={{ background: '#ef4444' }} />
            Recording
          </div>
        </header>

        <main className="relative z-10 max-w-md mx-auto px-6 py-6 flex flex-col gap-5">

          {/* ── OBJECTIVE LIST ── */}
          <section>
            <p className="text-[9px] tracking-[0.3em] uppercase mb-3" style={{ color: 'rgba(139,92,246,0.6)' }}>
              ◈ Raid Objectives
            </p>
            <div className="flex flex-col gap-2">
              {dungeon.exercises.map((ex, idx) => {
                const sets     = parseInt(ex.reps?.split('x')[0]) || 3;
                const done     = (completedSets[idx] ?? 0) >= sets;
                const isActive = idx === activeExIdx;

                return (
                  <motion.button key={idx} whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveExIdx(idx)}
                    className="w-full p-4 rounded-xl border text-left flex items-center gap-3 transition-all"
                    style={{
                      background: isActive ? `rgba(${accentRgb},0.06)` : done ? 'rgba(255,255,255,0.01)' : 'rgba(8,0,16,0.6)',
                      border: isActive ? `1px solid rgba(${accentRgb},0.3)` : done ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(139,92,246,0.1)',
                      opacity: done && !isActive ? 0.45 : 1,
                    }}
                  >
                    <div className="w-6 h-6 rounded shrink-0 flex items-center justify-center"
                      style={{
                        border: done ? `1px solid rgba(${accentRgb},0.5)` : isActive ? `1px solid rgba(${accentRgb},0.4)` : '1px solid rgba(255,255,255,0.1)',
                        background: done ? `rgba(${accentRgb},0.1)` : 'transparent',
                      }}>
                      {done ? <CheckCircle2 className={`w-3.5 h-3.5 ${ac.text}`} />
                        : isActive ? <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }}
                          className={`w-2 h-2 rounded-full ${ac.text.replace('text-', 'bg-')}`} style={{ background: `rgba(${accentRgb},0.8)` }} />
                        : <span className="w-1.5 h-1.5 rounded-full block" style={{ background: 'rgba(255,255,255,0.15)' }} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold uppercase ${isActive ? 'text-white' : done ? 'line-through' : 'text-white/50'}`}
                        style={{ color: done && !isActive ? 'rgba(255,255,255,0.25)' : undefined }}>{ex.name}</p>
                      <p className="text-[9px] tracking-widest mt-0.5" style={{ color: 'rgba(255,255,255,0.2)' }}>{ex.reps}</p>
                    </div>
                    {!done && (
                      <span className={`text-[10px] font-bold shrink-0 ${isActive ? ac.text : ''}`}
                        style={{ color: isActive ? `rgba(${accentRgb},0.9)` : 'rgba(255,255,255,0.2)' }}>
                        {completedSets[idx] ?? 0}/{sets}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </section>

          {/* ── ACTIVE EXERCISE ── */}
          <AnimatePresence mode="wait">
            <motion.section
              key={activeExIdx}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="p-5 rounded-xl"
              style={{ background: `rgba(${accentRgb},0.04)`, border: `1px solid rgba(${accentRgb},0.2)` }}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px rounded-t-xl"
                style={{ background: `linear-gradient(90deg, transparent, rgba(${accentRgb},0.5), transparent)` }} />

              <p className="text-[9px] tracking-[0.3em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.2)' }}>
                Current Objective
              </p>
              <h2 className="text-2xl font-black italic uppercase tracking-tight leading-none mb-1"
                style={{ fontFamily: "'Rajdhani', sans-serif", color: `rgba(${accentRgb},0.95)` }}>
                {activeEx?.name}
              </h2>
              <p className="text-[10px] tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.25)' }}>
                {activeEx?.reps}
              </p>

              <p className="text-xs leading-relaxed mb-4 pl-3"
                style={{ color: 'rgba(255,255,255,0.4)', borderLeft: `2px solid rgba(${accentRgb},0.25)` }}>
                {activeEx?.form}
              </p>

              {/* Set dots */}
              <div className="flex items-center gap-2 mb-2">
                {Array.from({ length: totalSets }).map((_, i) => (
                  <motion.div key={i}
                    animate={{ background: i < setsForThis ? `rgba(${accentRgb},0.9)` : 'rgba(255,255,255,0.08)' }}
                    className="h-1.5 flex-1 rounded-full" />
                ))}
              </div>
              <p className="text-[9px] tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.2)' }}>
                {setsForThis} / {totalSets} sets complete
              </p>

              {setsForThis < totalSets ? (
                <motion.button whileTap={{ scale: 0.97 }} onClick={logSet}
                  className="w-full py-3 rounded-lg font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 text-white"
                  style={{ background: `rgba(${accentRgb},0.85)` }}>
                  Log Set {setsForThis + 1} <ChevronRight className="w-4 h-4" />
                </motion.button>
              ) : activeExIdx < dungeon.exercises.length - 1 ? (
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => setActiveExIdx((i) => i + 1)}
                  className="w-full py-3 rounded-lg font-black text-xs tracking-widest uppercase text-white"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  Next Objective →
                </motion.button>
              ) : null}
            </motion.section>
          </AnimatePresence>

          {/* ── REST TIMER ── */}
          <section className="p-5 rounded-xl"
            style={{ background: 'rgba(8,0,16,0.7)', border: '1px solid rgba(139,92,246,0.12)' }}>
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>Status Effect</p>
                <h3 className="text-sm font-bold tracking-widest uppercase mt-0.5" style={{ color: '#a78bfa' }}>
                  Stamina Recovery
                </h3>
              </div>
              <span className="text-3xl font-black transition-colors"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  color: isRunning ? '#fff' : 'rgba(255,255,255,0.2)',
                  textShadow: isRunning ? '0 0 12px rgba(139,92,246,0.5)' : 'none',
                }}>
                {formatTime(timeLeft)}
              </span>
            </div>

            <div className="h-1.5 rounded-full overflow-hidden mb-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <motion.div
                animate={{ width: `${(timeLeft / DEFAULT_REST) * 100}%` }}
                transition={{ duration: 0.4 }}
                className="h-full rounded-full"
                style={{
                  background: isRunning ? 'linear-gradient(90deg, #7c3aed, #a78bfa)' : 'rgba(255,255,255,0.08)',
                  boxShadow: isRunning ? '0 0 8px rgba(139,92,246,0.5)' : 'none',
                }}
              />
            </div>

            <div className="flex gap-2">
              <motion.button whileTap={{ scale: 0.96 }}
                onClick={() => setIsRunning((v) => !v)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold tracking-widest uppercase transition-colors"
                style={isRunning ? {
                  background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171',
                } : {
                  background: '#7c3aed', color: '#fff',
                }}>
                {isRunning ? <><Pause className="w-3.5 h-3.5" /> Pause</> : <><Play className="w-3.5 h-3.5" /> Start</>}
              </motion.button>
              <motion.button whileTap={{ scale: 0.96 }}
                onClick={() => setTimeLeft((v) => v + 30)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold tracking-widest uppercase"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.35)' }}>
                <Plus className="w-3.5 h-3.5" /> 30s
              </motion.button>
              <motion.button whileTap={{ scale: 0.96 }}
                onClick={() => { setIsRunning(false); setTimeLeft(DEFAULT_REST); }}
                className="px-4 py-2.5 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)' }}>
                <RotateCcw className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </section>

          {/* ── DUNGEON CLEAR ── */}
          <AnimatePresence>
            {showClear && (
              <motion.section
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="p-6 rounded-xl text-center"
                style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.25)' }}
              >
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-2xl mb-2">✦</motion.div>
                <p className="font-black text-sm tracking-[0.2em] uppercase mb-1" style={{ fontFamily: "'Rajdhani', sans-serif", color: '#f59e0b' }}>
                  Dungeon Cleared
                </p>
                <p className="text-[9px] tracking-widest mb-5 uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  All objectives complete. XP awarded.
                </p>
                <Link href="/dungeons"
                  className="inline-block px-6 py-2.5 rounded-lg font-black text-xs tracking-widest uppercase text-white"
                  style={{ background: '#7c3aed' }}>
                  Return to Gate
                </Link>
              </motion.section>
            )}
          </AnimatePresence>

        </main>
        <SystemFooter active="combat" />
      </div>
    </>
  );
}

export default function CombatPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-xs tracking-widest uppercase"
        style={{ background: '#080010', color: 'rgba(139,92,246,0.6)', fontFamily: "'JetBrains Mono', monospace" }}>
        Loading Dungeon...
      </div>
    }>
      <CombatInterface />
    </Suspense>
  );
}