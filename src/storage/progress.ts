import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  achievements,
  isAchievementUnlocked,
} from '../data/achievements';

import {
  getSkillsUnlockedByWorkout,
  getStarterSkillIds,
} from '../data/skills';

import type {
  TrainingProfileId,
} from '../data/trainingProfiles';

const STORAGE_KEY =
  'calisthenics_progress_v3';

// ===========================================================
// TYPES
// ===========================================================

export type DailyStat = {
  sets: number;

  workouts: number;

  kcal: number;
};

export type WorkoutHistoryEntry = {
  id: string;

  workoutId: string;

  workoutTitle: string;

  levelId: number;

  completedAt: string;

  durationSeconds: number;

  earnedXP: number;

  burnedKcal: number;

  setsCompleted: number;
};

export type BossHistoryEntry = {
  id: string;

  bossId: string;

  bossName: string;

  levelId: number;

  defeatedAt: string;
};

export type PlayerProgress = {
  // ---------------------------------------------------------
  // ONBOARDING
  // ---------------------------------------------------------

  onboardingCompleted: boolean;

  trainingProfile: TrainingProfileId | null;

  journeyStartedAt: string | null;

  // ---------------------------------------------------------
  // PROGRESS
  // ---------------------------------------------------------

  xp: number;

  totalKcal: number;

  completedWorkoutIds: string[];

  completedExerciseIds: string[];

  totalWorkouts: number;

  totalTrainingSeconds: number;

  totalSetsCompleted: number;

  // ---------------------------------------------------------
  // AURA / STREAK
  // ---------------------------------------------------------

  currentStreak: number;

  bestStreak: number;

  lastTrainingDate: string | null;

  trainingDates: string[];

  // ---------------------------------------------------------
  // DAILY
  // ---------------------------------------------------------

  dailyStats: Record<
    string,
    DailyStat
  >;

  dailyChallengeClaims: string[];

  // ---------------------------------------------------------
  // BOSSES
  // ---------------------------------------------------------

  defeatedBossIds: string[];

  bossDefeats: Record<
    string,
    number
  >;

  totalBossBattles: number;

  // ---------------------------------------------------------
  // LEVELS
  // ---------------------------------------------------------

  unlockedLevelIds: number[];

  // ---------------------------------------------------------
  // SKILLS
  // ---------------------------------------------------------

  unlockedSkillIds: string[];

  seenSkillUnlockIds: string[];

  pendingSkillUnlockIds: string[];

  // ---------------------------------------------------------
  // ACHIEVEMENTS
  // ---------------------------------------------------------

  earnedAchievementIds: string[];

  seenAchievementIds: string[];

  pendingAchievementIds: string[];

  // ---------------------------------------------------------
  // HISTORY
  // ---------------------------------------------------------

  workoutHistory: WorkoutHistoryEntry[];

  bossHistory: BossHistoryEntry[];
};

// ===========================================================
// DEFAULT
// ===========================================================

function createDefaultProgress(): PlayerProgress {
  const starterSkills =
    getStarterSkillIds();

  return {
    onboardingCompleted:
      false,

    trainingProfile:
      null,

    journeyStartedAt:
      null,

    xp: 0,

    totalKcal: 0,

    completedWorkoutIds:
      [],

    completedExerciseIds:
      [],

    totalWorkouts: 0,

    totalTrainingSeconds:
      0,

    totalSetsCompleted:
      0,

    currentStreak: 0,

    bestStreak: 0,

    lastTrainingDate:
      null,

    trainingDates: [],

    dailyStats: {},

    dailyChallengeClaims:
      [],

    defeatedBossIds:
      [],

    bossDefeats: {},

    totalBossBattles:
      0,

    unlockedLevelIds: [
      1,
    ],

    unlockedSkillIds:
      [...starterSkills],

    seenSkillUnlockIds:
      [...starterSkills],

    pendingSkillUnlockIds:
      [],

    earnedAchievementIds:
      [],

    seenAchievementIds:
      [],

    pendingAchievementIds:
      [],

    workoutHistory: [],

    bossHistory: [],
  };
}

export const DEFAULT_PROGRESS =
  createDefaultProgress();

// ===========================================================
// DATE
// ===========================================================

function localDateKey(
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

function dayDifference(
  fromKey: string,
  toKey: string
) {
  const [
    fromYear,
    fromMonth,
    fromDay,
  ] =
    fromKey
      .split('-')
      .map(Number);

  const [
    toYear,
    toMonth,
    toDay,
  ] =
    toKey
      .split('-')
      .map(Number);

  const from =
    new Date(
      fromYear,
      fromMonth - 1,
      fromDay,
      12
    );

  const to =
    new Date(
      toYear,
      toMonth - 1,
      toDay,
      12
    );

  return Math.round(
    (
      to.getTime() -
      from.getTime()
    ) /
      86_400_000
  );
}

// ===========================================================
// MIGRATION
// ===========================================================

function withDefaults(
  raw: Partial<PlayerProgress>
): PlayerProgress {
  const defaults =
    createDefaultProgress();

  return {
    ...defaults,

    ...raw,

    onboardingCompleted:
      raw.onboardingCompleted ??
      false,

    trainingProfile:
      raw.trainingProfile ??
      null,

    journeyStartedAt:
      raw.journeyStartedAt ??
      null,

    completedWorkoutIds:
      raw.completedWorkoutIds ??
      [],

    completedExerciseIds:
      raw.completedExerciseIds ??
      [],

    trainingDates:
      raw.trainingDates ??
      [],

    dailyStats:
      raw.dailyStats ??
      {},

    dailyChallengeClaims:
      raw.dailyChallengeClaims ??
      [],

    defeatedBossIds:
      raw.defeatedBossIds ??
      [],

    bossDefeats:
      raw.bossDefeats ??
      {},

    unlockedLevelIds:
      raw.unlockedLevelIds?.length
        ? raw.unlockedLevelIds
        : [1],

    unlockedSkillIds:
      Array.from(
        new Set([
          ...getStarterSkillIds(),

          ...(raw.unlockedSkillIds ??
            []),
        ])
      ),

    seenSkillUnlockIds:
      Array.from(
        new Set([
          ...getStarterSkillIds(),

          ...(raw.seenSkillUnlockIds ??
            []),
        ])
      ),

    pendingSkillUnlockIds:
      raw.pendingSkillUnlockIds ??
      [],

    earnedAchievementIds:
      raw.earnedAchievementIds ??
      [],

    seenAchievementIds:
      raw.seenAchievementIds ??
      [],

    pendingAchievementIds:
      raw.pendingAchievementIds ??
      [],

    workoutHistory:
      raw.workoutHistory ??
      [],

    bossHistory:
      raw.bossHistory ??
      [],
  };
}

// ===========================================================
// AURA NORMALISIEREN
// ===========================================================

function normalizeAura(
  progress: PlayerProgress
) {
  if (
    !progress.lastTrainingDate
  ) {
    progress.currentStreak =
      0;

    return;
  }

  const today =
    localDateKey();

  const difference =
    dayDifference(
      progress.lastTrainingDate,
      today
    );

  /*
    0 = heute bereits trainiert
    1 = gestern trainiert, Streak lebt noch
    >1 = mindestens ein kompletter Tag ausgelassen
  */

  if (
    difference > 1
  ) {
    progress.currentStreak =
      0;
  }
}

// ===========================================================
// ACHIEVEMENTS
// ===========================================================

function syncAchievements(
  progress: PlayerProgress
) {
  const newAchievements =
    achievements
      .filter(
        (achievement) =>
          isAchievementUnlocked(
            achievement,
            progress
          )
      )
      .filter(
        (achievement) =>
          !progress.earnedAchievementIds.includes(
            achievement.id
          )
      );

  const ids =
    newAchievements.map(
      (achievement) =>
        achievement.id
    );

  progress.earnedAchievementIds =
    Array.from(
      new Set([
        ...progress.earnedAchievementIds,

        ...ids,
      ])
    );

  progress.pendingAchievementIds =
    Array.from(
      new Set([
        ...progress.pendingAchievementIds,

        ...ids,
      ])
    );
}

// ===========================================================
// LOAD / SAVE
// ===========================================================

export async function loadProgress(): Promise<PlayerProgress> {
  try {
    const saved =
      await AsyncStorage.getItem(
        STORAGE_KEY
      );

    if (!saved) {
      return createDefaultProgress();
    }

    const parsed =
      JSON.parse(saved);

    const progress =
      withDefaults(
        parsed
      );

    normalizeAura(
      progress
    );

    syncAchievements(
      progress
    );

    return progress;
  } catch (error) {
    console.error(
      'Progress konnte nicht geladen werden:',
      error
    );

    return createDefaultProgress();
  }
}

export async function saveProgress(
  progress: PlayerProgress
) {
  normalizeAura(
    progress
  );

  syncAchievements(
    progress
  );

  await AsyncStorage.setItem(
    STORAGE_KEY,

    JSON.stringify(
      progress
    )
  );
}

// ===========================================================
// NEUE REISE
// ===========================================================

export async function initializeJourney(
  trainingProfile: TrainingProfileId
) {
  /*
    Bewusst kompletter Neustart.

    Story = Level 1
    XP = 0
    Aura = 0

    Nur das körperliche Trainingsniveau wird
    auf den gewählten Wert gesetzt.
  */

  const progress =
    createDefaultProgress();

  progress.onboardingCompleted =
    true;

  progress.trainingProfile =
    trainingProfile;

  progress.journeyStartedAt =
    new Date().toISOString();

  await saveProgress(
    progress
  );

  return progress;
}

// ===========================================================
// TRAININGSNIVEAU ÄNDERN
// OHNE SPIELFORTSCHRITT ZU LÖSCHEN
// ===========================================================

export async function changeTrainingProfile(
  trainingProfile: TrainingProfileId
) {
  const progress =
    await loadProgress();

  progress.trainingProfile =
    trainingProfile;

  await saveProgress(
    progress
  );

  return progress;
}

// ===========================================================
// SET REWARD
// ===========================================================

export async function addSetReward(
  earnedXP: number,
  burnedKcal: number
) {
  const progress =
    await loadProgress();

  const today =
    localDateKey();

  const daily =
    progress.dailyStats[
      today
    ] ?? {
      sets: 0,

      workouts: 0,

      kcal: 0,
    };

  progress.xp +=
    Math.max(
      0,
      earnedXP
    );

  progress.totalKcal +=
    Math.max(
      0,
      burnedKcal
    );

  progress.totalSetsCompleted +=
    1;

  progress.dailyStats = {
    ...progress.dailyStats,

    [today]: {
      ...daily,

      sets:
        daily.sets + 1,

      kcal:
        daily.kcal +
        Math.max(
          0,
          burnedKcal
        ),
    },
  };

  await saveProgress(
    progress
  );

  return progress;
}

// ===========================================================
// EXERCISE
// ===========================================================

export async function completeExercise(
  exerciseId: string
) {
  const progress =
    await loadProgress();

  if (
    !progress.completedExerciseIds.includes(
      exerciseId
    )
  ) {
    progress.completedExerciseIds.push(
      exerciseId
    );
  }

  await saveProgress(
    progress
  );

  return progress;
}

// ===========================================================
// WORKOUT
// ===========================================================

export async function completeWorkout(
  workoutId: string,
  trainingSeconds: number
) {
  const progress =
    await loadProgress();

  const today =
    localDateKey();

  const firstCompletion =
    !progress.completedWorkoutIds.includes(
      workoutId
    );

  if (
    firstCompletion
  ) {
    progress.completedWorkoutIds.push(
      workoutId
    );
  }

  progress.totalWorkouts +=
    1;

  progress.totalTrainingSeconds +=
    Math.max(
      0,
      trainingSeconds
    );

  const daily =
    progress.dailyStats[
      today
    ] ?? {
      sets: 0,

      workouts: 0,

      kcal: 0,
    };

  progress.dailyStats = {
    ...progress.dailyStats,

    [today]: {
      ...daily,

      workouts:
        daily.workouts +
        1,
    },
  };

  if (
    !progress.trainingDates.includes(
      today
    )
  ) {
    progress.trainingDates.push(
      today
    );
  }

  // ---------------------------------------------------------
  // AURA / STREAK
  // ---------------------------------------------------------

  if (
    progress.lastTrainingDate !==
    today
  ) {
    if (
      !progress.lastTrainingDate
    ) {
      /*
        Das erste Training überhaupt:
        Aura 0 -> Aura 1
      */

      progress.currentStreak =
        1;
    } else {
      const difference =
        dayDifference(
          progress.lastTrainingDate,
          today
        );

      if (
        difference === 1
      ) {
        /*
          Gestern trainiert:
          +1 Aura
        */

        progress.currentStreak +=
          1;
      } else {
        /*
          Mindestens einen Tag ausgelassen:
          Neustart bei 1
        */

        progress.currentStreak =
          1;
      }
    }

    progress.bestStreak =
      Math.max(
        progress.bestStreak,
        progress.currentStreak
      );

    progress.lastTrainingDate =
      today;
  }

  // ---------------------------------------------------------
  // SKILL UNLOCKS
  // ---------------------------------------------------------

  if (
    firstCompletion
  ) {
    const skills =
      getSkillsUnlockedByWorkout(
        workoutId
      );

    for (
      const skill
      of skills
    ) {
      if (
        !progress.unlockedSkillIds.includes(
          skill.id
        )
      ) {
        progress.unlockedSkillIds.push(
          skill.id
        );

        progress.pendingSkillUnlockIds.push(
          skill.id
        );
      }
    }
  }

  progress.unlockedSkillIds =
    Array.from(
      new Set(
        progress.unlockedSkillIds
      )
    );

  progress.pendingSkillUnlockIds =
    Array.from(
      new Set(
        progress.pendingSkillUnlockIds
      )
    );

  await saveProgress(
    progress
  );

  return progress;
}

// ===========================================================
// HISTORY
// ===========================================================

export async function recordWorkoutSession(
  entry: Omit<
    WorkoutHistoryEntry,
    'id' | 'completedAt'
  >
) {
  const progress =
    await loadProgress();

  const historyEntry: WorkoutHistoryEntry =
    {
      ...entry,

      id:
        `${entry.workoutId}-${Date.now()}`,

      completedAt:
        new Date().toISOString(),
    };

  progress.workoutHistory = [
    historyEntry,

    ...progress.workoutHistory,
  ].slice(
    0,
    100
  );

  await saveProgress(
    progress
  );

  return progress;
}

// ===========================================================
// DAILY CHALLENGE
// ===========================================================

export async function claimDailyChallenge(
  dateKey: string,
  bonusXP: number
) {
  const progress =
    await loadProgress();

  if (
    progress.dailyChallengeClaims.includes(
      dateKey
    )
  ) {
    return progress;
  }

  progress.dailyChallengeClaims.push(
    dateKey
  );

  progress.xp +=
    Math.max(
      0,
      bonusXP
    );

  await saveProgress(
    progress
  );

  return progress;
}

// ===========================================================
// BOSS
// ===========================================================

export async function completeBoss(
  bossId: string,
  rewardXP: number,
  unlockLevelId: number
) {
  const progress =
    await loadProgress();

  const firstDefeat =
    !progress.defeatedBossIds.includes(
      bossId
    );

  progress.totalBossBattles +=
    1;

  progress.bossDefeats = {
    ...progress.bossDefeats,

    [bossId]:
      (
        progress.bossDefeats[
          bossId
        ] ??
        0
      ) + 1,
  };

  if (
    firstDefeat
  ) {
    progress.defeatedBossIds.push(
      bossId
    );

    progress.xp +=
      Math.max(
        0,
        rewardXP
      );

    if (
      unlockLevelId >
        0 &&
      !progress.unlockedLevelIds.includes(
        unlockLevelId
      )
    ) {
      progress.unlockedLevelIds.push(
        unlockLevelId
      );
    }
  }

  await saveProgress(
    progress
  );

  return {
    progress,

    firstDefeat,
  };
}

export async function recordBossVictory(
  bossId: string,
  bossName: string,
  levelId: number
) {
  const progress =
    await loadProgress();

  const entry: BossHistoryEntry =
    {
      id:
        `${bossId}-${Date.now()}`,

      bossId,

      bossName,

      levelId,

      defeatedAt:
        new Date().toISOString(),
    };

  progress.bossHistory = [
    entry,

    ...progress.bossHistory,
  ].slice(
    0,
    50
  );

  await saveProgress(
    progress
  );

  return progress;
}

// ===========================================================
// REWARD QUEUE
// ===========================================================

export async function getNextPendingSkillUnlock() {
  const progress =
    await loadProgress();

  return (
    progress.pendingSkillUnlockIds[
      0
    ] ??
    null
  );
}

export async function markSkillUnlockSeen(
  skillId: string
) {
  const progress =
    await loadProgress();

  progress.pendingSkillUnlockIds =
    progress.pendingSkillUnlockIds.filter(
      (id) =>
        id !== skillId
    );

  if (
    !progress.seenSkillUnlockIds.includes(
      skillId
    )
  ) {
    progress.seenSkillUnlockIds.push(
      skillId
    );
  }

  await saveProgress(
    progress
  );

  return progress;
}

export async function getNextPendingAchievement() {
  const progress =
    await loadProgress();

  return (
    progress.pendingAchievementIds[
      0
    ] ??
    null
  );
}

export async function markAchievementSeen(
  achievementId: string
) {
  const progress =
    await loadProgress();

  progress.pendingAchievementIds =
    progress.pendingAchievementIds.filter(
      (id) =>
        id !==
        achievementId
    );

  if (
    !progress.seenAchievementIds.includes(
      achievementId
    )
  ) {
    progress.seenAchievementIds.push(
      achievementId
    );
  }

  await saveProgress(
    progress
  );

  return progress;
}

// ===========================================================
// RESET
// ===========================================================

export async function resetProgress() {
  const progress =
    createDefaultProgress();

  await AsyncStorage.setItem(
    STORAGE_KEY,

    JSON.stringify(
      progress
    )
  );

  return progress;
}