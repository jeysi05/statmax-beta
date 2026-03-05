// ─── SHARED TYPES ─────────────────────────────────────────────────────────────

export type Path = 'fat-loss' | 'muscle-gain' | 'balanced';
export type Equipment = 'GYM' | 'HOME' | 'BODYWEIGHT' | 'ANY';
export type StatKey = 'STR' | 'AGI' | 'END' | 'VIT' | 'INT' | 'SEN';

export interface Stats {
  str: number;
  agi: number;
  vit: number;
  int: number;
  sen: number;
}

export interface Exercise {
  name: string;
  reps: string;
  form: string;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  type: string;
  stat: StatKey;
  equipment: Equipment;
  accent: 'orange' | 'blue' | 'emerald' | 'pink' | 'amber';
  exercises: Exercise[];
}

export interface Quest {
  id: number;
  task: string;
  detail: string;
  reward: string;
  goal: string;
  current: string;
  unit: string;
}