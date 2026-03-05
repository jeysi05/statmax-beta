'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Crown, Skull, Plus, X, Flag, Crosshair, Palette, Users, UserMinus, UserPlus, Settings } from 'lucide-react';
import SystemFooter from '../components/SystemFooter';

const LEADERBOARD = [
  { rank: 1, name: "SUNG JIN-WOO", class: "ASSASSIN", level: 99, score: "9,999", color: "text-purple-500" },
  { rank: 2, name: "JC", class: "FIGHTER", level: 12, score: "1,250", color: "text-amber-500" },
  { rank: 3, name: "THOMAS ANDRE", class: "TANK", level: 98, score: "8,840", color: "text-red-500" },
  { rank: 4, name: "CHA HAE-IN", class: "FIGHTER", level: 85, score: "7,200", color: "text-blue-500" },
];

export default function GuildPage() {
  // Guild & Member State
  const [myGuild, setMyGuild] = useState<null | { name: string, motto: string, type: string, colorClass: string, bgClass: string, borderClass: string }>(null);
  const [members, setMembers] = useState([
    { id: '1', name: 'JC (YOU)', role: 'MASTER', level: 12 },
    { id: '2', name: 'IRON', role: 'MEMBER', level: 8 },
    { id: '3', name: 'IGRIS', role: 'MEMBER', level: 9 }
  ]);
  
  // Modals State
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);
  
  // Form States
  const [guildName, setGuildName] = useState('');
  const [guildMotto, setGuildMotto] = useState('');
  const [guildType, setGuildType] = useState('ASSAULT');
  const [guildColor, setGuildColor] = useState('AMBER');
  const [inviteId, setInviteId] = useState('');

  const handleCreateGuild = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guildName.trim()) return;

    let colorClass = "text-amber-500"; let borderClass = "border-amber-500/30"; let bgClass = "bg-amber-500/5";
    if (guildColor === 'CRIMSON') { colorClass = "text-red-500"; borderClass = "border-red-500/30"; bgClass = "bg-red-500/5"; }
    if (guildColor === 'COBALT') { colorClass = "text-blue-500"; borderClass = "border-blue-500/30"; bgClass = "bg-blue-500/5"; }
    if (guildColor === 'AMETHYST') { colorClass = "text-purple-500"; borderClass = "border-purple-500/30"; bgClass = "bg-purple-500/5"; }

    setMyGuild({
      name: guildName.toUpperCase(),
      motto: guildMotto || "FIGHT TO SURVIVE",
      type: guildType,
      colorClass, bgClass, borderClass
    });

    setIsCreatorOpen(false);
  };

  const handleKickMember = (id: string) => {
    setMembers(members.filter(m => m.id !== id));
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteId.trim() || members.length >= 10) return;
    
    setMembers([...members, { 
      id: Date.now().toString(), 
      name: `HUNTER-${inviteId.substring(0,4)}`, 
      role: 'MEMBER', 
      level: 1 
    }]);
    setInviteId('');
  };

  return (
    <div className="min-h-screen bg-[#000000] text-gray-300 font-sans pb-32">
      <header className="pt-12 pb-6 px-6 border-b border-white/5 bg-[#0a0a0a]">
        <h1 className="text-3xl font-mono font-black italic tracking-tighter text-white uppercase">Hunter Assoc.</h1>
        <p className="font-mono text-[10px] text-amber-500/70 mt-1 tracking-widest">GUILDS & GLOBAL RAIDS</p>
      </header>

      <main className="px-6 py-8 flex flex-col gap-8 max-w-md mx-auto">
        
        {/* PLAYER GUILD SECTION */}
        <section>
          {myGuild ? (
            <div className={`p-6 rounded-xl border ${myGuild.borderClass} ${myGuild.bgClass} relative overflow-hidden group`}>
              <div className={`absolute top-0 left-0 w-2 h-full ${myGuild.colorClass.replace('text-', 'bg-')}`}></div>
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className={`w-4 h-4 ${myGuild.colorClass}`} />
                    <span className={`font-mono text-[10px] font-black tracking-widest uppercase ${myGuild.colorClass}`}>{myGuild.type} SQUAD</span>
                  </div>
                  <h2 className="text-3xl font-black italic text-white tracking-tight uppercase leading-none">{myGuild.name}</h2>
                </div>
              </div>
              
              <p className="font-mono text-xs text-gray-400 mb-6 border-l-2 border-gray-700 pl-3 italic">
                "{myGuild.motto}"
              </p>

              <div className="flex gap-4 border-t border-white/10 pt-4 mb-4">
                <div className="flex-1">
                  <p className="font-mono text-[10px] text-gray-500 uppercase">Squad Capacity</p>
                  <p className="font-mono text-lg text-white font-bold flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" /> {members.length} / 10
                  </p>
                </div>
                <div className="flex-1">
                  <p className="font-mono text-[10px] text-gray-500 uppercase">Your Rank</p>
                  <p className={`font-mono text-lg font-bold ${myGuild.colorClass}`}>MASTER</p>
                </div>
              </div>

              {/* MASTER AUTHORITY BUTTON */}
              <button 
                onClick={() => setIsManageOpen(true)}
                className={`w-full py-2 bg-black/40 border border-white/10 hover:border-white/30 rounded flex items-center justify-center gap-2 font-mono text-[10px] font-bold text-white transition-colors uppercase`}
              >
                <Settings className="w-3 h-3" /> Manage Squad Roster
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsCreatorOpen(true)}
              className="w-full group border-2 border-dashed border-gray-800 hover:border-amber-500/50 p-6 rounded-xl flex items-center justify-between transition-all bg-[#0a0a0a]"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gray-900 group-hover:bg-amber-500/20 p-3 rounded-lg transition-colors">
                  <Plus className="w-6 h-6 group-hover:text-amber-500" />
                </div>
                <div className="text-left">
                  <h3 className="font-mono font-bold text-white uppercase italic">Establish Squad</h3>
                  <p className="font-mono text-[10px] text-gray-600 tracking-tighter">REGISTER MAX 10 HUNTERS</p>
                </div>
              </div>
            </button>
          )}
        </section>

        {/* ACTIVE RAID SECTION */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <h2 className="font-mono text-xs font-bold text-amber-500 tracking-widest uppercase flex items-center gap-2">
              <Skull className="w-4 h-4 text-red-500" /> Active Gate Break
            </h2>
            <span className="font-mono text-[10px] text-red-500 animate-pulse">TIME LEFT: 14:22:10</span>
          </div>

          <div className="p-5 rounded-xl border border-red-500/30 bg-red-500/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
            <h3 className="text-xl font-black italic text-white tracking-tight uppercase mb-1">THE DEMON KING'S TOWER</h3>
            <p className="font-mono text-[10px] text-gray-400 mb-4">COMMUNITY OBJECTIVE: 1,000,000 PUSH-UPS</p>
            
            <div className="mb-2 flex justify-between font-mono text-[10px] font-bold">
              <span className="text-red-500">PROGRESS</span>
              <span className="text-white">642,100 / 1M</span>
            </div>
            <div className="h-2 w-full bg-[#121212] rounded-full overflow-hidden border border-gray-800">
              <motion.div 
                initial={{ width: 0 }} animate={{ width: '64%' }} transition={{ duration: 1 }}
                className="h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
              />
            </div>
            
            <button className="w-full mt-6 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 rounded-lg font-mono text-xs font-bold text-red-500 transition-colors uppercase cursor-pointer">
              Contribute to Raid
            </button>
          </div>
        </section>
      </main>

      {/* SQUAD MANAGEMENT MODAL */}
      <AnimatePresence>
        {isManageOpen && myGuild && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-2xl max-w-sm w-full relative max-h-[90vh] overflow-y-auto"
            >
              <button onClick={() => setIsManageOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-2 mb-6">
                <Shield className={`w-5 h-5 ${myGuild.colorClass}`} />
                <span className={`font-mono text-xs font-bold uppercase tracking-widest ${myGuild.colorClass}`}>Squad Authority</span>
              </div>

              {/* Invite Section */}
              <form onSubmit={handleInvite} className="mb-8 border-b border-gray-800 pb-6">
                <label className="font-mono text-[10px] text-gray-500 mb-2 block uppercase">Issue Draft Notice (By ID)</label>
                <div className="flex gap-2">
                  <input 
                    type="text" value={inviteId} onChange={(e) => setInviteId(e.target.value)}
                    placeholder="Enter Hunter ID..." 
                    className="flex-1 bg-[#121212] border border-gray-800 rounded p-3 text-white font-mono text-sm focus:border-amber-500 outline-none uppercase"
                    disabled={members.length >= 10}
                  />
                  <button 
                    type="submit" disabled={members.length >= 10}
                    className="px-4 bg-white/10 hover:bg-white/20 text-white rounded font-mono text-xs font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <UserPlus className="w-4 h-4" />
                  </button>
                </div>
                {members.length >= 10 && <p className="font-mono text-[10px] text-red-500 mt-2">SQUAD AT MAXIMUM CAPACITY.</p>}
              </form>

              {/* Member List */}
              <h3 className="font-mono text-[10px] text-gray-500 mb-3 uppercase">Active Roster ({members.length}/10)</h3>
              <div className="flex flex-col gap-2">
                {members.map(member => (
                  <div key={member.id} className="flex items-center justify-between bg-[#121212] border border-gray-800 p-3 rounded-lg">
                    <div>
                      <p className={`font-mono text-xs font-bold uppercase ${member.role === 'MASTER' ? myGuild.colorClass : 'text-white'}`}>
                        {member.name}
                      </p>
                      <p className="font-mono text-[9px] text-gray-500 uppercase">LVL {member.level} • {member.role}</p>
                    </div>
                    {member.role !== 'MASTER' && (
                      <button 
                        onClick={() => handleKickMember(member.id)}
                        className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
                        title="Expel from Squad"
                      >
                        <UserMinus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setIsManageOpen(false)}
                className="w-full py-4 mt-6 bg-white/5 hover:bg-white/10 text-white font-mono font-black text-xs tracking-widest rounded-lg transition-colors"
              >
                CLOSE INTERFACE
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GUILD CREATOR MODAL (Same as before) */}
      <AnimatePresence>
        {isCreatorOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm"
          >
            {/* ... Your existing guild creation form goes here ... */}
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-[#0a0a0a] border border-amber-500/30 p-6 rounded-2xl max-w-sm w-full relative max-h-[90vh] overflow-y-auto"
            >
              <button onClick={() => setIsCreatorOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-2 mb-4">
                <Flag className="w-5 h-5 text-amber-500" />
                <span className="font-mono text-xs text-amber-500 font-bold uppercase tracking-widest">Guild Registration</span>
              </div>
              
              <form onSubmit={handleCreateGuild} className="flex flex-col gap-5">
                <div>
                  <label className="font-mono text-[10px] text-gray-500 mb-1 block uppercase">Guild Designation</label>
                  <input 
                    type="text" required
                    value={guildName} onChange={(e) => setGuildName(e.target.value)}
                    placeholder="e.g. AHJIN GUILD" 
                    className="w-full bg-[#121212] border border-gray-800 rounded p-3 text-white font-mono text-sm focus:border-amber-500 outline-none uppercase"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] text-gray-500 mb-1 block uppercase">Guild Directive (Motto)</label>
                  <input 
                    type="text" required
                    value={guildMotto} onChange={(e) => setGuildMotto(e.target.value)}
                    placeholder="e.g. We rise from the shadows." 
                    className="w-full bg-[#121212] border border-gray-800 rounded p-3 text-gray-300 font-mono text-sm focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] text-gray-500 mb-1 block uppercase flex items-center gap-1"><Crosshair className="w-3 h-3"/> Operational Specialty</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['ASSAULT', 'SCAVENGE', 'SUPPORT', 'MINING'].map(type => (
                      <button
                        key={type} type="button" onClick={() => setGuildType(type)}
                        className={`py-2 rounded font-mono text-[10px] font-bold border transition-colors ${
                          guildType === type 
                            ? 'bg-white/10 border-white text-white' 
                            : 'bg-[#121212] border-gray-800 text-gray-500 hover:border-gray-600'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="font-mono text-[10px] text-gray-500 mb-1 block uppercase flex items-center gap-1"><Palette className="w-3 h-3"/> Guild Aura (Theme)</label>
                  <div className="flex justify-between gap-2">
                    {[
                      { id: 'AMBER', hex: 'bg-amber-500' },
                      { id: 'CRIMSON', hex: 'bg-red-500' },
                      { id: 'COBALT', hex: 'bg-blue-500' },
                      { id: 'AMETHYST', hex: 'bg-purple-500' }
                    ].map(color => (
                      <button
                        key={color.id} type="button" onClick={() => setGuildColor(color.id)}
                        className={`flex-1 h-10 rounded-lg border-2 transition-all flex items-center justify-center ${
                          guildColor === color.id ? 'border-white scale-110' : 'border-transparent opacity-50 hover:opacity-100'
                        }`}
                      >
                        <div className={`w-full h-full rounded-md ${color.hex}`}></div>
                      </button>
                    ))}
                  </div>
                </div>
                <button type="submit" className="w-full py-4 mt-2 bg-amber-500 hover:bg-amber-400 text-black font-mono font-black text-xs tracking-widest rounded-lg transition-colors cursor-pointer">
                  FOUND GUILD
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SystemFooter active="guild" />
    </div>
  );
}