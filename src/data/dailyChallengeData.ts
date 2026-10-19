import type { PlayerProgress } from '../storage/progress';

export type DailyChallenge = {
  id: string;
  kind: 'sets' | 'workouts' | 'kcal';
  title: string;
  subtitle: string;
  target: number;
  bonusXP: number;
};

const POOL: Omit<DailyChallenge, 'id'>[] = [
  {
    kind: 'sets',
    title: 'Set-Sammler',
    subtitle: 'Schließe heute 8 Trainingssätze ab.',
    target: 8,
    bonusXP: 40,
  },
  {
    kind: 'sets',
    title: 'Durchziehen',
    subtitle: 'Schließe heute 12 Trainingssätze ab.',
    target: 12,
    bonusXP: 60,
  },
  {
    kind: 'workouts',
    title: 'Tagesmission',
    subtitle: 'Schließe heute ein Workout ab.',
    target: 1,
    bonusXP: 50,
  },
  {
    kind: 'kcal',
    title: 'Energie',
    subtitle: 'Sammle heute 100 geschätzte kcal.',
    target: 100,
    bonusXP: 50,
  },
];

export function getDailyChallenge(dateKey: string): DailyChallenge {
  const hash = [...dateKey].reduce((sum, c) => sum + c.charCodeAt(0), 0);
  const base = POOL[hash % POOL.length];
  return { ...base, id: `${dateKey}-${base.kind}-${base.target}` };
}

export function getDailyChallengeProgress(
  progress: PlayerProgress,
  challenge: DailyChallenge,
  dateKey: string
) {
  const stat = progress.dailyStats[dateKey] ?? {
    sets: 0,
    workouts: 0,
    kcal: 0,
  };

  if (challenge.kind === 'sets') return stat.sets;
  if (challenge.kind === 'workouts') return stat.workouts;
  return stat.kcal;
}
