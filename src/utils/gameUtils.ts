import type {
  GameLevel,
  Workout,
} from '../types/game';

import type {
  PlayerProgress,
} from '../storage/progress';

import {
  levels,
} from '../data/levels';

import {
  resolveWorkout,
} from '../data/adaptiveTraining';

// ===========================================================
// DATUM
// ===========================================================

export function getTodayKey(
  date = new Date()
) {
  const year =
    date.getFullYear();

  const month =
    String(
      date.getMonth() + 1
    ).padStart(
      2,
      '0'
    );

  const day =
    String(
      date.getDate()
    ).padStart(
      2,
      '0'
    );

  return `${year}-${month}-${day}`;
}

// ===========================================================
// ZEIT
// ===========================================================

export function formatTrainingTime(
  totalSeconds: number
) {
  const seconds =
    Math.max(
      0,
      totalSeconds
    );

  const hours =
    Math.floor(
      seconds / 3600
    );

  const minutes =
    Math.floor(
      (
        seconds %
        3600
      ) / 60
    );

  if (
    hours === 0
  ) {
    return `${minutes} Min`;
  }

  return `${hours} Std ${minutes} Min`;
}

export function formatDurationShort(
  totalSeconds: number
) {
  const minutes =
    Math.max(
      1,

      Math.round(
        totalSeconds /
        60
      )
    );

  return `${minutes} Min`;
}

// ===========================================================
// PLAYER LEVEL
// ===========================================================

export const XP_PER_PLAYER_LEVEL =
  500;

export function getPlayerLevel(
  xp: number
) {
  return (
    Math.floor(
      Math.max(
        0,
        xp
      ) /
        XP_PER_PLAYER_LEVEL
    ) + 1
  );
}

export function getPlayerLevelProgress(
  xp: number
) {
  const safeXP =
    Math.max(
      0,
      xp
    );

  const level =
    getPlayerLevel(
      safeXP
    );

  const levelStart =
    (
      level - 1
    ) *
    XP_PER_PLAYER_LEVEL;

  const xpInsideLevel =
    safeXP -
    levelStart;

  const nextLevelXP =
    level *
    XP_PER_PLAYER_LEVEL;

  return {
    level,

    levelStart,

    levelEnd:
      nextLevelXP,

    xpInsideLevel,

    required:
      XP_PER_PLAYER_LEVEL,

    remaining:
      Math.max(
        0,

        nextLevelXP -
          safeXP
      ),

    percentage:
      Math.min(
        100,

        (
          xpInsideLevel /
          XP_PER_PLAYER_LEVEL
        ) *
          100
      ),
  };
}

// ===========================================================
// RANG
// ===========================================================

export function getPlayerRank(
  xp: number
) {
  if (
    xp <
    500
  ) {
    return 'Novize';
  }

  if (
    xp <
    1500
  ) {
    return 'Erwachter';
  }

  if (
    xp <
    3000
  ) {
    return 'Kämpfer';
  }

  if (
    xp <
    6000
  ) {
    return 'Elite';
  }

  if (
    xp <
    10000
  ) {
    return 'Meister';
  }

  return 'Legende';
}

export function getNextRank(
  xp: number
) {
  if (
    xp <
    500
  ) {
    return {
      name:
        'Erwachter',

      requiredXP:
        500,
    };
  }

  if (
    xp <
    1500
  ) {
    return {
      name:
        'Kämpfer',

      requiredXP:
        1500,
    };
  }

  if (
    xp <
    3000
  ) {
    return {
      name:
        'Elite',

      requiredXP:
        3000,
    };
  }

  if (
    xp <
    6000
  ) {
    return {
      name:
        'Meister',

      requiredXP:
        6000,
    };
  }

  if (
    xp <
    10000
  ) {
    return {
      name:
        'Legende',

      requiredXP:
        10000,
    };
  }

  return null;
}

// ===========================================================
// ADAPTIVE WORKOUT
// ===========================================================

export function getResolvedWorkout(
  workout: Workout,
  progress: PlayerProgress
) {
  return resolveWorkout(
    workout,
    progress.trainingProfile
  );
}

// ===========================================================
// WORKOUT FINDEN
// ===========================================================

export function findResolvedWorkoutById(
  workoutId: string,
  progress: PlayerProgress
): {
  level: GameLevel;

  workout: Workout;
} | null {
  for (
    const level
    of levels
  ) {
    const rawWorkout =
      level.workouts.find(
        (workout) =>
          workout.id ===
          workoutId
      );

    if (
      rawWorkout
    ) {
      return {
        level,

        workout:
          resolveWorkout(
            rawWorkout,
            progress.trainingProfile
          ),
      };
    }
  }

  return null;
}

// ===========================================================
// AKTUELLES WORKOUT
// ===========================================================

export function findCurrentWorkout(
  gameLevels: GameLevel[],
  progress: PlayerProgress
): {
  level: GameLevel;

  workout: Workout;

  stationNumber: number;
} | null {
  const unlockedLevels =
    gameLevels.filter(
      (level) =>
        progress.unlockedLevelIds.includes(
          level.id
        )
    );

  for (
    const level
    of unlockedLevels
  ) {
    const index =
      level.workouts.findIndex(
        (workout) =>
          !progress.completedWorkoutIds.includes(
            workout.id
          )
      );

    if (
      index >= 0
    ) {
      const rawWorkout =
        level.workouts[
          index
        ];

      return {
        level,

        workout:
          resolveWorkout(
            rawWorkout,
            progress.trainingProfile
          ),

        stationNumber:
          index + 1,
      };
    }
  }

  return null;
}

// ===========================================================
// AKTIVES STORY-LEVEL
// ===========================================================

export function getActiveLevel(
  gameLevels: GameLevel[],
  progress: PlayerProgress
) {
  const current =
    findCurrentWorkout(
      gameLevels,
      progress
    );

  if (
    current
  ) {
    return current.level;
  }

  const unlocked =
    gameLevels.filter(
      (level) =>
        progress.unlockedLevelIds.includes(
          level.id
        )
    );

  return (
    unlocked[
      unlocked.length -
        1
    ] ??
    gameLevels[0]
  );
}

// ===========================================================
// LEVEL FORTSCHRITT
// ===========================================================

export function getLevelCompletion(
  level: GameLevel,
  progress: PlayerProgress
) {
  const completed =
    level.workouts.filter(
      (workout) =>
        progress.completedWorkoutIds.includes(
          workout.id
        )
    ).length;

  const total =
    level.workouts.length;

  return {
    completed,

    total,

    percentage:
      total >
      0
        ? Math.min(
            100,

            (
              completed /
              total
            ) *
              100
          )
        : 0,
  };
}

// ===========================================================
// BOSS STATUS
// ===========================================================

export function getBossReadiness(
  level: GameLevel,
  progress: PlayerProgress
) {
  const completion =
    getLevelCompletion(
      level,
      progress
    );

  const workoutsComplete =
    completion.completed ===
    completion.total;

  const enoughXP =
    progress.xp >=
    level.boss.requiredXP;

  const defeated =
    progress.defeatedBossIds.includes(
      level.boss.id
    );

  return {
    workoutsComplete,

    enoughXP,

    defeated,

    ready:
      workoutsComplete &&
      enoughXP,

    remainingXP:
      Math.max(
        0,

        level.boss.requiredXP -
          progress.xp
      ),

    xpPercentage:
      Math.min(
        100,

        (
          progress.xp /
          level.boss.requiredXP
        ) *
          100
      ),
  };
}

// ===========================================================
// NÄCHSTE WORKOUTS
// ===========================================================

export function getUpcomingWorkouts(
  level: GameLevel,
  progress: PlayerProgress,
  limit = 3
) {
  const currentIndex =
    level.workouts.findIndex(
      (workout) =>
        !progress.completedWorkoutIds.includes(
          workout.id
        )
    );

  if (
    currentIndex <
    0
  ) {
    return [];
  }

  return level.workouts
    .slice(
      currentIndex,

      currentIndex +
        limit
    )
    .map(
      (workout) =>
        resolveWorkout(
          workout,
          progress.trainingProfile
        )
    );
}

// ===========================================================
// LETZTE 7 TAGE
// ===========================================================

export type WeeklyTrainingDay = {
  dateKey: string;

  label: string;

  sets: number;

  workouts: number;

  kcal: number;

  trained: boolean;
};

export function getWeeklyTrainingData(
  progress: PlayerProgress
): WeeklyTrainingDay[] {
  const days:
    WeeklyTrainingDay[] =
    [];

  const labels = [
    'SO',
    'MO',
    'DI',
    'MI',
    'DO',
    'FR',
    'SA',
  ];

  for (
    let offset = 6;
    offset >= 0;
    offset--
  ) {
    const date =
      new Date();

    date.setHours(
      12,
      0,
      0,
      0
    );

    date.setDate(
      date.getDate() -
        offset
    );

    const dateKey =
      getTodayKey(
        date
      );

    const stats =
      progress.dailyStats[
        dateKey
      ] ?? {
        sets: 0,

        workouts: 0,

        kcal: 0,
      };

    days.push({
      dateKey,

      label:
        labels[
          date.getDay()
        ],

      sets:
        stats.sets,

      workouts:
        stats.workouts,

      kcal:
        stats.kcal,

      trained:
        stats.sets >
          0 ||
        stats.workouts >
          0,
    });
  }

  return days;
}

// ===========================================================
// HEUTE
// ===========================================================

export function getTodayStats(
  progress: PlayerProgress
) {
  return (
    progress.dailyStats[
      getTodayKey()
    ] ?? {
      sets: 0,

      workouts: 0,

      kcal: 0,
    }
  );
}

// ===========================================================
// WORKOUT STATS
// ===========================================================

export function getWorkoutTotalSets(
  workout: Workout
) {
  return workout.exercises.reduce(
    (
      sum,
      exercise
    ) =>
      sum +
      exercise.sets,

    0
  );
}

export function getWorkoutKcal(
  workout: Workout
) {
  return workout.exercises.reduce(
    (
      sum,
      exercise
    ) =>
      sum +
      exercise.estimatedKcal,

    0
  );
}

export function estimateWorkoutSeconds(
  workout: Workout
) {
  return workout.exercises.reduce(
    (
      total,
      exercise
    ) => {
      const activeSeconds =
        exercise.durationSeconds ??
        (
          exercise.reps ??
          8
        ) *
          4;

      const workSeconds =
        activeSeconds *
        exercise.sets;

      const restSeconds =
        Math.max(
          0,

          exercise.sets -
            1
        ) *
        exercise.restSeconds;

      return (
        total +
        workSeconds +
        restSeconds
      );
    },

    0
  );
}