'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Shield as ShieldIcon, LogOut, Terminal, Ruler, Weight, Camera, Dumbbell, Activity, Calendar, ChevronRight } from 'lucide-react';
import SystemFooter from '../components/SystemFooter';

export default function SystemPage() {
  const [uploadHover, setUploadHover] = useState(false);

  const stagger = (i: number) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 + i * 0.08, duration: 0.4 } });

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700;800&display=swap');`}</style>

      <div className="min-h-screen pb-32" style={{
        background: 'linear-gradient(160deg, #080010 0%, #050008 40%, #000010 100%)',
        fontFamily: "'JetBrains Mono', monospace",
      }}>
        {/* Scanline */}
        <div className="fixed inset-0 pointer-events-none z-0"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)' }} />

        {/* Shadow orb */}
        <motion.div className="fixed pointer-events-none z-0 rounded-full"
          style={{ width: 300, height: 300, top: '5%', right: '-10%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)' }}
          animate={{ y: [0, -20, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />

        {/* ── HEADER ── */}
        <header className="relative z-10 pt-12 pb-6 px-6"
          style={{ borderBottom: '1px solid rgba(139,92,246,0.12)', background: 'rgba(8,0,16,0.8)' }}>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full block" style={{ background: 'rgba(139,92,246,0.6)' }} />
            <span className="text-[8px] tracking-[0.35em] uppercase" style={{ color: 'rgba(139,92,246,0.5)' }}>
              Hunter Registry
            </span>
          </div>
          <h1 className="text-3xl font-black italic tracking-tighter uppercase text-white"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}>System Matrix</h1>
          <p className="text-[10px] mt-1 tracking-widest uppercase" style={{ color: 'rgba(139,92,246,0.55)' }}>
            Vessel Data & Combat Logs
          </p>
        </header>

        <main className="relative z-10 px-6 py-6 flex flex-col gap-5 max-w-md mx-auto">

          {/* ── HUNTER ID ── */}
          <motion.section {...stagger(0)}
            className="p-5 rounded-xl relative overflow-hidden"
            style={{ background: 'rgba(8,0,16,0.7)', border: '1px solid rgba(139,92,246,0.2)' }}
          >
            {/* Left accent bar */}
            <div className="absolute top-0 left-0 w-0.5 h-full"
              style={{ background: 'linear-gradient(180deg, transparent, #7c3aed, transparent)' }} />
            {/* Corner brackets */}
            <div className="absolute top-2 right-2 w-3 h-3 border-t border-r" style={{ borderColor: 'rgba(139,92,246,0.35)' }} />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l" style={{ borderColor: 'rgba(139,92,246,0.35)' }} />

            <div className="flex items-center gap-4 pl-3">
              <div className="w-14 h-14 rounded-full shrink-0 flex items-center justify-center"
                style={{ background: 'rgba(139,92,246,0.08)', border: '2px solid rgba(139,92,246,0.35)' }}>
                <User className="w-7 h-7" style={{ color: '#a78bfa' }} />
              </div>
              <div>
                <h2 className="text-xl font-black uppercase italic leading-none text-white"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}>JC Alcantara</h2>
                <p className="text-[9px] tracking-widest mt-1 mb-2" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  ID: HUNTER-7734-X
                </p>
                <span className="text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest"
                  style={{ background: '#7c3aed', color: '#fff' }}>
                  Verified Vessel
                </span>
              </div>
            </div>
          </motion.section>

          {/* ── PHYSICAL PARAMETERS ── */}
          <motion.section {...stagger(1)} className="flex gap-3">
            {[
              { Icon: Ruler,  label: 'Height', value: '175', unit: 'CM' },
              { Icon: Weight, label: 'Weight',  value: '78',  unit: 'KG' },
            ].map(({ Icon, label, value, unit }) => (
              <motion.div key={label} whileTap={{ scale: 0.97 }}
                className="flex-1 rounded-xl p-4 flex flex-col items-center justify-center gap-1 cursor-pointer group"
                style={{ background: 'rgba(8,0,16,0.7)', border: '1px solid rgba(139,92,246,0.12)' }}>
                <Icon className="w-4 h-4 transition-colors" style={{ color: 'rgba(139,92,246,0.45)' }} />
                <span className="text-[9px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.2)' }}>{label}</span>
                <span className="text-2xl font-black text-white leading-none" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                  {value} <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>{unit}</span>
                </span>
              </motion.div>
            ))}
          </motion.section>

          {/* ── COMBAT RECORD ── */}
          <motion.section {...stagger(2)}>
            <h3 className="text-[9px] font-bold tracking-[0.3em] uppercase mb-3 flex items-center gap-2"
              style={{ color: 'rgba(139,92,246,0.7)' }}>
              <Calendar className="w-3.5 h-3.5" /> ◈ March Combat Record
            </h3>
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(139,92,246,0.12)' }}>
              {[
                { Icon: Dumbbell, label: 'Total Tonnage Lifted', value: '12,450', unit: 'KG' },
                { Icon: Activity, label: 'Dungeons Cleared',      value: '14',     unit: ''   },
              ].map(({ Icon, label, value, unit }, i) => (
                <div key={label} className="p-4 flex items-center justify-between"
                  style={{
                    background: 'rgba(8,0,16,0.6)',
                    borderBottom: i === 0 ? '1px solid rgba(139,92,246,0.08)' : 'none',
                  }}>
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" style={{ color: 'rgba(139,92,246,0.45)' }} />
                    <span className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>{label}</span>
                  </div>
                  <span className="font-black" style={{ fontFamily: "'Rajdhani', sans-serif", color: '#a78bfa' }}>
                    {value} <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>{unit}</span>
                  </span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ── VESSEL VISUAL LOG ── */}
          <motion.section {...stagger(3)}>
            <h3 className="text-[9px] font-bold tracking-[0.3em] uppercase mb-3 flex items-center gap-2"
              style={{ color: 'rgba(139,92,246,0.7)' }}>
              <Camera className="w-3.5 h-3.5" /> ◈ Vessel Visual Log
            </h3>
            <motion.div
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setUploadHover(true)}
              onHoverEnd={() => setUploadHover(false)}
              className="rounded-xl h-52 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all"
              style={{
                border: uploadHover ? '1px dashed rgba(139,92,246,0.4)' : '1px dashed rgba(139,92,246,0.15)',
                background: uploadHover ? 'rgba(139,92,246,0.04)' : 'rgba(8,0,16,0.5)',
              }}
            >
              <motion.div
                animate={{ scale: uploadHover ? 1.1 : 1 }}
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}>
                <Camera className="w-5 h-5" style={{ color: uploadHover ? '#a78bfa' : 'rgba(139,92,246,0.45)' }} />
              </motion.div>
              <div className="text-center">
                <p className="text-xs font-bold uppercase transition-colors"
                  style={{ color: uploadHover ? '#a78bfa' : 'rgba(255,255,255,0.3)' }}>
                  Upload Log: Mar 2026
                </p>
                <p className="text-[9px] tracking-widest mt-1 uppercase" style={{ color: 'rgba(255,255,255,0.15)' }}>
                  Tap to update physique scans
                </p>
              </div>
            </motion.div>
          </motion.section>

          {/* ── SYSTEM CONFIG ── */}
          <motion.section {...stagger(4)}>
            <h3 className="text-[9px] font-bold tracking-[0.3em] uppercase mb-3"
              style={{ color: 'rgba(255,255,255,0.18)' }}>
              Security & Config
            </h3>
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(139,92,246,0.12)' }}>
              {/* Theme */}
              <div className="p-4 flex items-center justify-between"
                style={{ background: 'rgba(8,0,16,0.6)', borderBottom: '1px solid rgba(139,92,246,0.08)' }}>
                <div className="flex items-center gap-3">
                  <Terminal className="w-4 h-4" style={{ color: 'rgba(139,92,246,0.4)' }} />
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>System Theme</span>
                </div>
                <span className="text-[9px] px-2 py-1 rounded uppercase tracking-widest"
                  style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', color: '#a78bfa' }}>
                  Shadow Void
                </span>
              </div>

              {/* Recovery */}
              <motion.button whileTap={{ scale: 0.99 }}
                className="w-full p-4 flex items-center justify-between text-left transition-colors"
                style={{ background: 'rgba(8,0,16,0.6)', borderBottom: '1px solid rgba(139,92,246,0.08)' }}>
                <div className="flex items-center gap-3">
                  <ShieldIcon className="w-4 h-4" style={{ color: 'rgba(139,92,246,0.4)' }} />
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>Account Recovery</span>
                </div>
                <ChevronRight className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.15)' }} />
              </motion.button>

              {/* Logout */}
              <motion.button whileTap={{ scale: 0.99 }}
                className="w-full p-4 flex items-center justify-between text-left transition-colors"
                style={{ background: 'rgba(8,0,16,0.6)' }}>
                <div className="flex items-center gap-3">
                  <LogOut className="w-4 h-4" style={{ color: '#ef4444' }} />
                  <span className="text-sm font-bold" style={{ color: '#ef4444' }}>Logout of System</span>
                </div>
                <ChevronRight className="w-4 h-4" style={{ color: 'rgba(239,68,68,0.3)' }} />
              </motion.button>
            </div>
          </motion.section>

        </main>
        <SystemFooter active="system" />
      </div>
    </>
  );
}