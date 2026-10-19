import type { PlayerProgress } from '../storage/progress';

export type AchievementCategory =
  | 'training'
  | 'streak'
  | 'boss'
  | 'progress'
  | 'energy';

export type AchievementRarity =
  | 'bronze'
  | 'silver'
  | 'gold'
  | 'legendary';

export type AchievementCondition =
  | {
      type: 'workouts';
      target: number;
    }
  | {
      type: 'sets';
      target: number;
    }
  | {
      type: 'streak';
      target: number;
    }
  | {
      type: 'bosses';
      target: number;
    }
  | {
      type: 'kcal';
      target: number;
    }
  | {
      type: 'xp';
      target: number;
    };

export type Achievement = {
  id: string;

  title: string;

  description: string;

  category: AchievementCategory;

  rarity: AchievementRarity;

  icon:
    | 'barbell'
    | 'flame'
    | 'skull'
    | 'flash'
    | 'trophy'
    | 'star'
    | 'ribbon'
    | 'shield-checkmark';

  condition: AchievementCondition;
};

export const achievements: Achievement[] = [
  {
    id: 'first-workout',

    title: 'Der erste Schritt',

    description:
      'Schließe dein erstes Training ab.',

    category: 'training',

    rarity: 'bronze',

    icon: 'barbell',

    condition: {
      type: 'workouts',
      target: 1,
    },
  },

  {
    id: 'five-workouts',

    title: 'Routine entsteht',

    description:
      'Schließe 5 Trainings ab.',

    category: 'training',

    rarity: 'bronze',

    icon: 'barbell',

    condition: {
      type: 'workouts',
      target: 5,
    },
  },

  {
    id: 'ten-workouts',

    title: 'Keine Ausrede',

    description:
      'Schließe 10 Trainings ab.',

    category: 'training',

    rarity: 'silver',

    icon: 'shield-checkmark',

    condition: {
      type: 'workouts',
      target: 10,
    },
  },

  {
    id: 'twentyfive-workouts',

    title: 'Disziplin',

    description:
      'Schließe 25 Trainings ab.',

    category: 'training',

    rarity: 'gold',

    icon: 'trophy',

    condition: {
      type: 'workouts',
      target: 25,
    },
  },

  {
    id: 'fifty-sets',

    title: '50 Sätze',

    description:
      'Schließe insgesamt 50 Trainingssätze ab.',

    category: 'training',

    rarity: 'bronze',

    icon: 'flash',

    condition: {
      type: 'sets',
      target: 50,
    },
  },

  {
    id: 'hundred-sets',

    title: 'Hundertfach',

    description:
      'Schließe insgesamt 100 Trainingssätze ab.',

    category: 'training',

    rarity: 'silver',

    icon: 'flash',

    condition: {
      type: 'sets',
      target: 100,
    },
  },

  {
    id: 'fivehundred-sets',

    title: 'Maschine',

    description:
      'Schließe insgesamt 500 Trainingssätze ab.',

    category: 'training',

    rarity: 'legendary',

    icon: 'trophy',

    condition: {
      type: 'sets',
      target: 500,
    },
  },

  {
    id: 'streak-3',

    title: 'Die Flamme brennt',

    description:
      'Trainiere an 3 Tagen hintereinander.',

    category: 'streak',

    rarity: 'bronze',

    icon: 'flame',

    condition: {
      type: 'streak',
      target: 3,
    },
  },

  {
    id: 'streak-7',

    title: 'Flame Keeper',

    description:
      'Erreiche einen 7-Tage-Streak.',

    category: 'streak',

    rarity: 'silver',

    icon: 'flame',

    condition: {
      type: 'streak',
      target: 7,
    },
  },

  {
    id: 'streak-30',

    title: 'Ungebrochen',

    description:
      'Erreiche einen 30-Tage-Streak.',

    category: 'streak',

    rarity: 'legendary',

    icon: 'flame',

    condition: {
      type: 'streak',
      target: 30,
    },
  },

  {
    id: 'first-boss',

    title: 'Boss Hunter',

    description:
      'Besiege deinen ersten Boss.',

    category: 'boss',

    rarity: 'silver',

    icon: 'skull',

    condition: {
      type: 'bosses',
      target: 1,
    },
  },

  {
    id: 'three-bosses',

    title: 'Boss Slayer',

    description:
      'Besiege 3 verschiedene Bosse.',

    category: 'boss',

    rarity: 'gold',

    icon: 'skull',

    condition: {
      type: 'bosses',
      target: 3,
    },
  },

  {
    id: 'kcal-500',

    title: 'Energie I',

    description:
      'Verbrenne insgesamt 500 geschätzte kcal.',

    category: 'energy',

    rarity: 'bronze',

    icon: 'flash',

    condition: {
      type: 'kcal',
      target: 500,
    },
  },

  {
    id: 'kcal-2500',

    title: 'Energie II',

    description:
      'Verbrenne insgesamt 2.500 geschätzte kcal.',

    category: 'energy',

    rarity: 'silver',

    icon: 'flash',

    condition: {
      type: 'kcal',
      target: 2500,
    },
  },

  {
    id: 'xp-1000',

    title: 'Erwacht',

    description:
      'Sammle insgesamt 1.000 XP.',

    category: 'progress',

    rarity: 'silver',

    icon: 'star',

    condition: {
      type: 'xp',
      target: 1000,
    },
  },

  {
    id: 'xp-5000',

    title: 'Aufgestiegen',

    description:
      'Sammle insgesamt 5.000 XP.',

    category: 'progress',

    rarity: 'gold',

    icon: 'ribbon',

    condition: {
      type: 'xp',
      target: 5000,
    },
  },
];

export function getAchievementCurrentValue(
  achievement: Achievement,
  progress: PlayerProgress
) {
  switch (achievement.condition.type) {
    case 'workouts':
      return progress.totalWorkouts;

    case 'sets':
      return progress.totalSetsCompleted;

    case 'streak':
      return progress.bestStreak;

    case 'bosses':
      return progress.defeatedBossIds.length;

    case 'kcal':
      return progress.totalKcal;

    case 'xp':
      return progress.xp;

    default:
      return 0;
  }
}

export function isAchievementUnlocked(
  achievement: Achievement,
  progress: PlayerProgress
) {
  return (
    getAchievementCurrentValue(
      achievement,
      progress
    ) >= achievement.condition.target
  );
}

export function getAchievementProgress(
  achievement: Achievement,
  progress: PlayerProgress
) {
  const current =
    getAchievementCurrentValue(
      achievement,
      progress
    );

  const target =
    achievement.condition.target;

  return {
    current,

    target,

    percentage: Math.min(
      100,
      (current / target) * 100
    ),
  };
}