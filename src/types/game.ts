export type ExerciseCategory = 'push' | 'pull' | 'legs' | 'core' | 'skill';

export type Exercise = {
  id: string;
  name: string;
  category: ExerciseCategory;
  difficulty: number;
  sets: number;
  reps?: number;
  durationSeconds?: number;
  restSeconds: number;
  estimatedKcal: number;
  imageStart?: string;
  imageEnd?: string;
};

export type Workout = {
  id: string;
  title: string;
  description: string;
  exercises: Exercise[];
  requiredXP?: number;
};

export type Boss = {
  id: string;
  name: string;
  level: number;
  requiredXP: number;
  description: string;
  rewardXP: number;
};

export type GameLevel = {
  id: number;
  title: string;
  subtitle: string;
  workouts: Workout[];
  boss: Boss;
};

export type BossPhase = {
  id: string;
  title: string;
  subtitle: string;
  damage: number;
  exercises: Exercise[];
};

export type BossBattle = {
  bossId: string;
  maxHP: number;
  phases: BossPhase[];
};
