'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Flame, Target, Zap, Shield, ChevronRight } from 'lucide-react';

const GOALS = [
  {
    id: 'fat-loss',
    title: 'THE AGILITY PATH',
    description: 'Focus on fat loss, stamina, and high-speed movement.',
    icon: <Zap className="w-6 h-6 text-blue-400" />,
    aura: 'shadow-[0_0_20px_rgba(96,165,250,0.3)]',
    border: 'border-blue-500/50'
  },
  {
    id: 'muscle-gain',
    title: 'THE STRENGTH PATH',
    description: 'Focus on hypertrophy, heavy lifting, and raw power.',
    icon: <Flame className="w-6 h-6 text-red-500" />,
    aura: 'shadow-[0_0_20px_rgba(239,68,68,0.3)]',
    border: 'border-red-500/50'
  },
  {
    id: 'balanced',
    title: 'THE MONARCH PATH',
    description: 'Balanced physical evolution. Strength and endurance.',
    icon: <Target className="w-6 h-6 text-purple-500" />,
    aura: 'shadow-[0_0_20px_rgba(168,85,247,0.3)]',
    border: 'border-purple-500/50'
  }
];

export default function Onboarding() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const router = useRouter();

  const handleInitialize = () => {
    if (!selectedGoal) return;
    // In Phase 4, we will save this to Supabase
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto w-full"
      >
        <div className="mb-10">
          <h1 className="text-4xl font-mono font-black italic tracking-tighter mb-2">SYSTEM INITIALIZATION</h1>
          <p className="text-amber-500 font-mono text-[10px] tracking-[0.2em] uppercase">Select your path of evolution</p>
        </div>

        <div className="flex flex-col gap-4">
          {GOALS.map((goal) => (
            <button
              key={goal.id}
              onClick={() => setSelectedGoal(goal.id)}
              className={`p-6 rounded-xl border-2 transition-all text-left relative overflow-hidden group ${
                selectedGoal === goal.id 
                ? `${goal.border} ${goal.aura} bg-white/5` 
                : 'border-gray-800 bg-[#0a0a0a] grayscale opacity-60'
              }`}
            >
              <div className="flex items-center gap-4 relative z-10">
                <div className={`p-3 rounded-lg bg-black border border-white/10`}>
                  {goal.icon}
                </div>
                <div>
                  <h3 className="font-mono font-bold text-lg italic">{goal.title}</h3>
                  <p className="text-xs text-gray-500 font-mono leading-tight">{goal.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={handleInitialize}
          disabled={!selectedGoal}
          className={`w-full mt-10 py-4 font-mono font-black text-sm tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 ${
            selectedGoal 
            ? 'bg-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.4)]' 
            : 'bg-gray-800 text-gray-500 cursor-not-allowed'
          }`}
        >
          {selectedGoal ? 'INITIALIZE SYSTEM' : 'SELECT A PATH'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}