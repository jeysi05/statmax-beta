'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Info, Dumbbell, Home, Activity, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import SystemFooter from '../components/SystemFooter';
import { WORKOUT_PLANS, ACCENT_CLASSES } from '../lib/workouts';
import { WorkoutPlan, Equipment, StatKey } from '../types';

type CustomStat = Exclude<StatKey, 'INT' | 'SEN'>;

const statToAccent: Record<CustomStat, WorkoutPlan['accent']> = {
  STR: 'orange', AGI: 'blue', END: 'emerald', VIT: 'pink',
};

const SL_FONTS = `@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700;800&display=swap');`;

export default function DungeonsPage() {
  const [plans, setPlans]             = useState<WorkoutPlan[]>(WORKOUT_PLANS);
  const [selectedTutorial, setSelectedTutorial] = useState<WorkoutPlan | null>(null);
  const [environment, setEnvironment] = useState<'GYM' | 'HOME' | 'BODYWEIGHT'>('GYM');
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [customName, setCustomName]   = useState('');
  const [customStat, setCustomStat]   = useState<CustomStat>('STR');
  const [customExercises, setCustomExercises] = useState('');

  const filteredPlans = plans.filter(
    (p) => p.equipment === environment || p.equipment === 'ANY'
  );

  const handleCreateGate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    const accent = statToAccent[customStat];
    const parsedExercises = customExercises
      ? customExercises.split(',').map((ex) => ({ name: ex.trim(), reps: 'Custom', form: 'User-defined movement.' }))
      : [{ name: 'Custom Exercise', reps: '-', form: 'Focus on form.' }];

    setPlans([{
      id: `custom-${Date.now()}`,
      name: customName.toUpperCase(),
      type: `CUSTOM ${customStat}`,
      stat: customStat,
      equipment: environment as Equipment,
      accent,
      exercises: parsedExercises.slice(0, 4),
    }, ...plans]);

    setCustomName(''); setCustomExercises(''); setIsCreatorOpen(false);
  };

  const ENV_TABS = [
    { key: 'GYM' as const,        label: 'Full Gym',   Icon: Dumbbell },
    { key: 'HOME' as const,       label: 'Home (DBs)', Icon: Home     },
    { key: 'BODYWEIGHT' as const, label: 'No Equip',   Icon: Activity },
  ];

  return (
    <>
      <style>{SL_FONTS}</style>

      <div
        className="min-h-screen pb-32"
        style={{
          background: 'linear-gradient(180deg, #080010 0%, #05000d 50%, #000008 100%)',
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        {/* Scanline overlay */}
        <div className="fixed inset-0 pointer-events-none z-0"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)' }}
        />

        {/* ── HEADER ── */}
        <header
          className="relative z-10 pt-12 pb-6 px-6"
          style={{ borderBottom: '1px solid rgba(139,92,246,0.15)', background: 'rgba(8,0,16,0.9)' }}
        >
          <div className="flex items-center gap-2 mb-1">
            <motion.span
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full block"
              style={{ background: '#ef4444' }}
            />
            <span className="text-[8px] tracking-[0.35em] uppercase" style={{ color: 'rgba(239,68,68,0.6)' }}>
              Gate Detected
            </span>
          </div>
          <h1 className="text-3xl font-black italic tracking-tighter uppercase text-white"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            Select Gate
          </h1>
          <p className="text-[10px] mt-1 tracking-widest uppercase" style={{ color: 'rgba(139,92,246,0.6)' }}>
            Configure Raid Parameters
          </p>

          {/* Environment tabs */}
          <div className="flex p-1 rounded-lg mt-5"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(139,92,246,0.15)' }}>
            {ENV_TABS.map(({ key, label, Icon }) => (
              <motion.button
                key={key} whileTap={{ scale: 0.96 }}
                onClick={() => setEnvironment(key)}
                className="flex-1 flex flex-col items-center py-2 rounded gap-1 text-[10px] font-bold tracking-widest transition-all uppercase"
                style={{
                  background: environment === key ? '#f59e0b' : 'transparent',
                  color:      environment === key ? '#000' : 'rgba(255,255,255,0.25)',
                }}
              >
                <Icon className="w-4 h-4" />
                {label}
              </motion.button>
            ))}
          </div>
        </header>

        <main className="relative z-10 px-6 py-6 flex flex-col gap-5 max-w-md mx-auto">

          {/* Open New Gate */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsCreatorOpen(true)}
            className="w-full p-5 rounded-xl flex items-center gap-4 transition-all"
            style={{ border: '1px dashed rgba(139,92,246,0.2)', background: 'rgba(139,92,246,0.03)' }}
          >
            <div className="p-3 rounded-lg" style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}>
              <Plus className="w-5 h-5" style={{ color: '#a78bfa' }} />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-white uppercase italic text-sm" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                Open New Gate
              </h3>
              <p className="text-[9px] tracking-widest mt-0.5 uppercase" style={{ color: 'rgba(139,92,246,0.5)' }}>
                Map Custom Raid Parameters
              </p>
            </div>
          </motion.button>

          {/* Gate list */}
          <h2 className="text-[9px] font-bold tracking-[0.3em] uppercase" style={{ color: 'rgba(139,92,246,0.7)' }}>
            ◈ Active Gates
          </h2>

          {filteredPlans.length === 0 && (
            <div className="text-center py-10 rounded-xl" style={{ border: '1px dashed rgba(255,255,255,0.05)' }}>
              <p className="text-xs tracking-widest" style={{ color: 'rgba(255,255,255,0.2)' }}>
                No gates detected for this environment.
              </p>
            </div>
          )}

          {filteredPlans.map((plan, idx) => {
            const ac = ACCENT_CLASSES[plan.accent];
            const accentRgb =
              plan.accent === 'orange' ? '249,115,22'
              : plan.accent === 'blue'    ? '96,165,250'
              : plan.accent === 'emerald' ? '52,211,153'
              : plan.accent === 'pink'    ? '244,114,182'
              : '245,158,11';

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07 }}
                className="p-5 rounded-xl relative overflow-hidden"
                style={{ background: 'rgba(8,0,16,0.7)', border: '1px solid rgba(139,92,246,0.15)' }}
              >
                {/* Accent top stripe */}
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `rgba(${accentRgb},0.5)` }} />

                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className={`text-[9px] font-black tracking-widest uppercase ${ac.text}`}>{plan.type}</span>
                    <h3 className="text-xl font-black italic text-white tracking-tight uppercase mt-0.5"
                      style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                      {plan.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedTutorial(plan)}
                    className="p-2 rounded-full shrink-0 transition-colors"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <Info className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {plan.exercises.map((ex) => (
                    <span key={ex.name} className="text-[9px] px-2 py-1 rounded"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.35)' }}>
                      {ex.name}
                    </span>
                  ))}
                </div>

                <Link href={`/combat?id=${plan.id}`}
                  className="w-full flex items-center justify-center py-3 rounded-lg text-xs font-bold tracking-[0.2em] uppercase text-white transition-all"
                  style={{ background: `rgba(${accentRgb},0.1)`, border: `1px solid rgba(${accentRgb},0.25)` }}>
                  Commence Raid
                </Link>
              </motion.div>
            );
          })}
        </main>

        {/* ── OPEN GATE MODAL ── */}
        <AnimatePresence>
          {isCreatorOpen && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-end justify-center"
              style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
            >
              <motion.div
                initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="w-full max-w-md p-6 rounded-t-2xl relative"
                style={{ background: '#0a0010', border: '1px solid rgba(139,92,246,0.25)', borderBottom: 'none' }}
              >
                <button onClick={() => setIsCreatorOpen(false)} className="absolute top-4 right-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2 mb-5">
                  <AlertTriangle className="w-4 h-4" style={{ color: '#a78bfa' }} />
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#a78bfa' }}>Gate Generator</span>
                </div>
                <form onSubmit={handleCreateGate} className="flex flex-col gap-4">
                  <div>
                    <label className="text-[9px] tracking-widest uppercase mb-1.5 block" style={{ color: 'rgba(255,255,255,0.3)' }}>Gate Designation</label>
                    <input type="text" required value={customName} onChange={(e) => setCustomName(e.target.value)}
                      placeholder="e.g. SHADOW PROTOCOL"
                      className="w-full p-3 rounded-lg text-sm text-white outline-none"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(139,92,246,0.2)', fontFamily: "'JetBrains Mono', monospace" }}
                    />
                  </div>
                  <div>
                    <label className="text-[9px] tracking-widest uppercase mb-1.5 block" style={{ color: 'rgba(255,255,255,0.3)' }}>Target Stat</label>
                    <div className="grid grid-cols-4 gap-2">
                      {(['STR', 'AGI', 'END', 'VIT'] as CustomStat[]).map((stat) => (
                        <button key={stat} type="button" onClick={() => setCustomStat(stat)}
                          className="py-2 rounded text-xs font-bold transition-colors"
                          style={{
                            border:     customStat === stat ? '1px solid rgba(139,92,246,0.6)' : '1px solid rgba(255,255,255,0.06)',
                            background: customStat === stat ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.02)',
                            color:      customStat === stat ? '#a78bfa' : 'rgba(255,255,255,0.3)',
                          }}>{stat}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] tracking-widest uppercase mb-1.5 block" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      Objectives <span className="normal-case" style={{ color: 'rgba(255,255,255,0.15)' }}>(comma separated)</span>
                    </label>
                    <textarea value={customExercises} onChange={(e) => setCustomExercises(e.target.value)}
                      placeholder="Push-ups, Pull-ups, Dips"
                      className="w-full p-3 rounded-lg text-sm text-white outline-none h-20 resize-none"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(139,92,246,0.2)', fontFamily: "'JetBrains Mono', monospace" }}
                    />
                  </div>
                  <motion.button whileTap={{ scale: 0.97 }} type="submit"
                    className="w-full py-3.5 rounded-lg font-black text-xs tracking-widest uppercase text-white"
                    style={{ background: '#7c3aed' }}>
                    Open Gate
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── RAID BRIEFING MODAL ── */}
        <AnimatePresence>
          {selectedTutorial && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-6"
              style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(8px)' }}
              onClick={() => setSelectedTutorial(null)}
            >
              <motion.div
                initial={{ scale: 0.92, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm p-6 rounded-2xl relative max-h-[80vh] overflow-y-auto"
                style={{ background: '#0a0010', border: '1px solid rgba(139,92,246,0.25)' }}
              >
                <div className="absolute top-2 left-2 w-4 h-4 border-t border-l" style={{ borderColor: 'rgba(139,92,246,0.4)' }} />
                <div className="absolute top-2 right-2 w-4 h-4 border-t border-r" style={{ borderColor: 'rgba(139,92,246,0.4)' }} />
                <button onClick={() => setSelectedTutorial(null)} className="absolute top-4 right-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2 mb-1">
                  <Info className="w-4 h-4" style={{ color: '#a78bfa' }} />
                  <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: '#a78bfa' }}>Raid Briefing</span>
                </div>
                <h2 className="text-2xl font-black italic text-white mb-6 uppercase" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                  {selectedTutorial.name}
                </h2>
                <div className="flex flex-col gap-5 mb-6">
                  {selectedTutorial.exercises.map((ex, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.08 }}
                      className="pl-4" style={{ borderLeft: '2px solid rgba(139,92,246,0.4)' }}>
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-bold text-white text-sm uppercase">{ex.name}</h3>
                        <span className="text-[9px] px-2 py-0.5 rounded"
                          style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', color: '#a78bfa' }}>
                          {ex.reps}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed mt-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{ex.form}</p>
                    </motion.div>
                  ))}
                </div>
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => setSelectedTutorial(null)}
                  className="w-full py-3.5 rounded-lg font-black text-xs tracking-widest uppercase text-white"
                  style={{ background: '#7c3aed' }}>
                  Understood
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <SystemFooter active="combat" />
      </div>
    </>
  );
}