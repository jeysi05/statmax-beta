'use client';

import { motion } from 'framer-motion';

interface Stats {
  str: number; // Strength
  agi: number; // Agility
  vit: number; // Vitality
  int: number; // Intelligence
  sen: number; // Sense
}

export default function RadarChart({ stats }: { stats: Stats }) {
  const size = 200;
  const center = size / 2;
  const radius = size / 2.5;
  const angleStep = (Math.PI * 2) / 5;

  // Calculate coordinates for the pentagon points
  const getPoints = (values: number[], scale = 1) => {
    return values.map((val, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const r = (val / 100) * radius * scale;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  const statValues = [stats.str, stats.agi, stats.vit, stats.int, stats.sen];
  const labels = ['STR', 'AGI', 'VIT', 'INT', 'SEN'];

  return (
    <div className="relative flex justify-center items-center py-4">
      <svg width={size} height={size} className="drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]">
        {/* Background Web Grid */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((scale) => (
          <polygon
            key={scale}
            points={getPoints([100, 100, 100, 100, 100], scale)}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        ))}

        {/* Labels */}
        {labels.map((label, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x = center + (radius + 20) * Math.cos(angle);
          const y = center + (radius + 20) * Math.sin(angle);
          return (
            <text
              key={label}
              x={x}
              y={y}
              fill="rgba(255,255,255,0.4)"
              fontSize="10"
              fontFamily="monospace"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-bold uppercase tracking-tighter"
            >
              {label}
            </text>
          );
        })}

        {/* The Stats Polygon */}
        <motion.polygon
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          points={getPoints(statValues)}
          fill="rgba(245, 158, 11, 0.2)"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}