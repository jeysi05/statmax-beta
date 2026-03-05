import { WorkoutPlan } from '../types';

// Single source of truth — imported by both dungeons/page.tsx and combat/page.tsx
export const WORKOUT_PLANS: WorkoutPlan[] = [
  // ── STRENGTH ──────────────────────────────────────────────────────────────
  {
    id: 'str-gym-1',
    name: 'IRON CASTLE',
    type: 'STRENGTH',
    stat: 'STR',
    equipment: 'GYM',
    accent: 'orange',
    exercises: [
      { name: 'Barbell Back Squat', reps: '5x5', form: 'Break parallel. Drive chest up. Keep core braced.' },
      { name: 'Deadlift',           reps: '3x5', form: 'Hinge at hips. Drag bar up your shins. Squeeze glutes at top.' },
      { name: 'Bench Press',        reps: '5x5', form: 'Retract scapula. Pause bar on chest. Drive feet into floor.' },
    ],
  },
  {
    id: 'str-home-1',
    name: 'STEEL SANCTUARY',
    type: 'STRENGTH',
    stat: 'STR',
    equipment: 'HOME',
    accent: 'orange',
    exercises: [
      { name: 'Goblet Squat',          reps: '4x10', form: 'Hold DB at chest. Keep torso upright. Sink deep.' },
      { name: 'DB Romanian Deadlift',  reps: '4x10', form: 'Soft knees. Push hips back until hamstrings stretch.' },
      { name: 'Floor Press',           reps: '4x10', form: 'Lie on back. Press DBs until elbows lock out.' },
    ],
  },
  {
    id: 'str-bw-1',
    name: 'GRAVITY CHAMBER',
    type: 'STRENGTH',
    stat: 'STR',
    equipment: 'BODYWEIGHT',
    accent: 'orange',
    exercises: [
      { name: 'Pistol Squats',    reps: '4x6/leg', form: 'Extend one leg. Lower slowly. Use a chair if needed.' },
      { name: 'Deficit Push-ups', reps: '4x15',    form: 'Elevate hands. Lower chest past hands for max stretch.' },
      { name: 'Pull-ups',         reps: '4xMax',   form: 'Full dead hang to chin over bar. No kipping.' },
    ],
  },

  // ── AGILITY ───────────────────────────────────────────────────────────────
  {
    id: 'agi-any-1',
    name: 'VELOCITY VOID',
    type: 'AGILITY',
    stat: 'AGI',
    equipment: 'ANY',
    accent: 'blue',
    exercises: [
      { name: 'Box Jumps',        reps: '4x5',   form: 'Explode up, land soft. Step down — never jump down.' },
      { name: 'Lateral Bounds',   reps: '4x12',  form: 'Leap side to side. Stick the landing on one foot.' },
      { name: 'Sprint Intervals', reps: '8x10m', form: '100% max effort every rep. Full rest between sprints.' },
    ],
  },

  // ── ENDURANCE ─────────────────────────────────────────────────────────────
  {
    id: 'end-any-1',
    name: 'MARATHON MAZE',
    type: 'ENDURANCE',
    stat: 'END',
    equipment: 'ANY',
    accent: 'emerald',
    exercises: [
      { name: 'Tempo Run',   reps: '5KM',    form: 'Maintain a challenging but sustainable pace throughout.' },
      { name: 'Burpees',     reps: '3x20',   form: 'Chest to floor. Full jump at the top. Find a rhythm.' },
      { name: 'Jump Rope',   reps: '10 min', form: 'Stay on the balls of your feet. Keep elbows tucked.' },
    ],
  },

  // ── VITALITY ──────────────────────────────────────────────────────────────
  {
    id: 'vit-any-1',
    name: 'HEALING SPRING',
    type: 'VITALITY',
    stat: 'VIT',
    equipment: 'ANY',
    accent: 'pink',
    exercises: [
      { name: '90/90 Hip Rotations',      reps: '3x10', form: 'Sit on floor, knees at 90 degrees. Windshield wiper legs slowly.' },
      { name: "World's Greatest Stretch", reps: '3x5',  form: 'Lunge forward, drop elbow to instep, rotate arm to sky.' },
      { name: 'Dead Bugs',                reps: '3x12', form: 'Press lower back into floor. Extend opposite arm and leg.' },
    ],
  },
];

// Accent → Tailwind class map — defined here so Tailwind can statically detect them
export const ACCENT_CLASSES: Record<WorkoutPlan['accent'], {
  text: string;
  border: string;
  bg: string;
  tag: string;
}> = {
  orange:  { text: 'text-orange-500',  border: 'border-orange-500/30',  bg: 'bg-orange-500/5',  tag: 'bg-orange-500/10 border-orange-500/20 text-orange-400'  },
  blue:    { text: 'text-blue-400',    border: 'border-blue-500/30',    bg: 'bg-blue-500/5',    tag: 'bg-blue-500/10 border-blue-500/20 text-blue-400'        },
  emerald: { text: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/5', tag: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'},
  pink:    { text: 'text-pink-400',    border: 'border-pink-500/30',    bg: 'bg-pink-500/5',    tag: 'bg-pink-500/10 border-pink-500/20 text-pink-400'        },
  amber:   { text: 'text-amber-400',   border: 'border-amber-500/30',   bg: 'bg-amber-500/5',   tag: 'bg-amber-500/10 border-amber-500/20 text-amber-400'     },
};