'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/app/lib/supabase';
import { Terminal, ChevronRight, ShieldAlert, Copy, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [refCode, setRefCode] = useState('');
  const [copied, setCopied] = useState(false);

  const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    if (!email) {
      setStatus('error');
      setErrorMessage('System Alert: Email required to generate Hunter ID.');
      return;
    }

    // Generate a simple random referral code for the user
    const generatedCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email, referral_code: generatedCode }]);

      if (error) {
        if (error.code === '23505') { 
          setStatus('error');
          setErrorMessage('System Alert: This Hunter ID is already registered.');
        } else {
          throw error;
        }
      } else {
        setRefCode(generatedCode);
        setStatus('success');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage('System Alert: Network failure. Could not connect to the server.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`statmax.app/?ref=${refCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans selection:bg-amber-500/30">
      <nav className="fixed top-0 w-full border-b border-amber-500/10 bg-[#0a0a0a]/80 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="text-amber-500 w-5 h-5" />
            <span className="font-mono text-amber-500 font-bold tracking-widest text-sm">STATMAX_OS</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-green-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              SYSTEM ONLINE
            </span>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-16 px-6 max-w-6xl mx-auto flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 rounded-full mb-8 font-mono text-xs text-amber-500 tracking-wider"
        >
          [ BETA REGISTRATION OPEN ]
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6"
        >
          THE SYSTEM HAS <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">
            CHOSEN YOU.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl text-lg text-gray-400 mb-10 leading-relaxed"
        >
          Stop guessing. Start min-maxing your real-life build. The only fitness tracker designed with a true RPG progression system, weekly boss raids, and deep stat analytics.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full max-w-md"
        >
          {status === 'success' ? (
            <div className="p-6 border border-amber-500/30 bg-amber-500/5 rounded-xl text-left flex flex-col gap-4">
              <div className="flex items-center gap-3 border-b border-amber-500/20 pb-4">
                <CheckCircle2 className="w-8 h-8 text-amber-500" />
                <div>
                  <h3 className="text-amber-500 font-bold font-mono">ID SECURED</h3>
                  <p className="text-xs text-gray-400">Your base stats have been initialized.</p>
                </div>
              </div>
              
              <div className="pt-2">
                <p className="text-sm text-gray-300 font-bold mb-2">PRIORITY ACCESS PROTOCOL:</p>
                <p className="text-xs text-gray-400 mb-4">Invite 3 party members to bypass the waitlist queue and unlock the Guild Raid beta.</p>
                
                <div className="flex items-center gap-2 bg-[#121212] border border-gray-800 rounded-lg p-2">
                  <code className="text-xs text-amber-400 font-mono flex-1 overflow-x-auto px-2">
                    statmax.app/?ref={refCode}
                  </code>
                  <button 
                    onClick={copyToClipboard}
                    className="p-2 bg-amber-500/10 hover:bg-amber-500/20 rounded-md transition-colors"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-amber-500" />}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleJoinWaitlist} className="flex flex-col gap-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address..."
                  disabled={status === 'loading'}
                  className="w-full bg-[#121212] border border-gray-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-lg px-4 py-4 text-white font-mono placeholder-gray-600 outline-none transition-all disabled:opacity-50"
                />
              </div>
              
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-xs font-mono justify-center">
                  <ShieldAlert className="w-4 h-4" />
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {status === 'loading' ? 'AUTHENTICATING...' : '[ CLAIM YOUR HUNTER ID ]'}
                {!status && <ChevronRight className="w-5 h-5" />}
              </button>
            </form>
          )}
        </motion.div>
      </main>

      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
    </div>
  );
}