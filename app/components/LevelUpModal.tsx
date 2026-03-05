'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, Zap, Star } from 'lucide-react';

interface LevelUpProps {
  isOpen: boolean;
  onClose: () => void;
  newLevel: number;
  statIncreases: { label: string; amount: number }[];
}

export default function LevelUpModal({ isOpen, onClose, newLevel, statIncreases }: LevelUpProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
        >
          {/* BACKGROUND GLOW */}
          <div className="absolute inset-0 bg-amber-500/10 radial-gradient-mask"></div>

          <motion.div 
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            className="relative w-full max-w-sm bg-[#0a0a0a] border-y-2 border-amber-500/50 py-10 px-8 flex flex-col items-center shadow-[0_0_50px_rgba(245,158,11,0.2)]"
          >
            {/* AMBIENT PARTICLES (SVG) */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-12 opacity-20"
            >
              <Star className="w-24 h-24 text-amber-500 fill-amber-500" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <p className="font-mono text-amber-500 text-xs font-black tracking-[0.4em] uppercase mb-2">System Notification</p>
              <h2 className="text-5xl font-black italic text-white tracking-tighter uppercase mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                Level Up!
              </h2>
              <div className="h-1 w-20 bg-amber-500 mx-auto rounded-full mb-6"></div>
            </motion.div>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-gray-600 font-mono text-xl line-through">LV. {newLevel - 1}</span>
              <ChevronUp className="text-amber-500 w-6 h-6 animate-bounce" />
              <span className="text-white font-mono text-4xl font-black italic underline decoration-amber-500 underline-offset-8">LV. {newLevel}</span>
            </div>

            <div className="w-full space-y-3 mb-8">
              {statIncreases.map((stat, idx) => (
                <motion.div 
                  key={stat.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + (idx * 0.1) }}
                  className="flex justify-between items-center bg-white/5 p-3 rounded border border-white/5"
                >
                  <span className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-widest">{stat.label}</span>
                  <span className="font-mono text-sm text-amber-500 font-black">+{stat.amount}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="w-full py-4 bg-amber-500 text-black font-mono font-black text-xs tracking-widest rounded-lg hover:bg-amber-400 transition-colors cursor-pointer"
            >
              CONFIRM EVOLUTION
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}