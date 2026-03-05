'use client';

import Link from 'next/link';
import { User, Swords, Shield, Trophy } from 'lucide-react';

interface FooterProps {
  active: 'status' | 'combat' | 'guild' | 'system';
}

export default function SystemFooter({ active }: FooterProps) {
  const NAV = [
    { key: 'status' as const,  href: '/dashboard', Icon: User,   label: 'Status'  },
    { key: 'combat' as const,  href: '/dungeons',  Icon: Swords, label: 'Combat'  },
    { key: 'guild'  as const,  href: '/guild',     Icon: Shield, label: 'Guild'   },
    { key: 'system' as const,  href: '/system',    Icon: Trophy, label: 'System'  },
  ];

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@700&display=swap');`}</style>
      <nav
        className="fixed bottom-0 w-full z-50 flex justify-around items-center py-3 px-4"
        style={{
          background: 'rgba(5,0,10,0.97)',
          borderTop: '1px solid rgba(139,92,246,0.15)',
          backdropFilter: 'blur(20px)',
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        {NAV.map(({ key, href, Icon, label }) => {
          const isActive = active === key;
          return (
            <Link
              key={key}
              href={href}
              className="flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-all"
              style={{
                color: isActive ? '#a78bfa' : 'rgba(255,255,255,0.2)',
              }}
            >
              {/* Active indicator dot */}
              <span
                className="w-1 h-1 rounded-full block mb-0.5 transition-all"
                style={{ background: isActive ? '#7c3aed' : 'transparent' }}
              />
              <Icon
                className="w-5 h-5 transition-colors"
                style={{
                  color: isActive ? '#a78bfa' : 'rgba(255,255,255,0.2)',
                  filter: isActive ? 'drop-shadow(0 0 6px rgba(139,92,246,0.5))' : 'none',
                }}
              />
              <span
                className="text-[9px] font-bold tracking-widest uppercase transition-colors"
                style={{ color: isActive ? '#a78bfa' : 'rgba(255,255,255,0.2)' }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}