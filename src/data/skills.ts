export type SkillCategory =
  | 'push'
  | 'pull'
  | 'core'
  | 'legs'
  | 'skill';

export type SkillRarity =
  | 'basic'
  | 'advanced'
  | 'elite'
  | 'legendary';

export type SkillNode = {
  id: string;

  name: string;

  category: SkillCategory;

  level: number;

  description: string;

  requiredWorkoutId?: string;

  rarity?: SkillRarity;

  unlockMessage?: string;
};

export const skillNodes: SkillNode[] = [
  // =========================================================
  // PUSH
  // =========================================================

  {
    id: 'incline-pushup',

    name: 'Incline Push-up',

    category: 'push',

    level: 1,

    rarity: 'basic',

    description:
      'Der Einstieg in deine Push-Progression.',

    unlockMessage:
      'Dein erster Schritt zu stärkerer Druckkraft.',
  },

  {
    id: 'knee-pushup',

    name: 'Knee Push-up',

    category: 'push',

    level: 2,

    rarity: 'basic',

    description:
      'Mehr Belastung bei kontrollierter Technik.',

    requiredWorkoutId:
      'l1-push-1',

    unlockMessage:
      'Deine Push-Kraft entwickelt sich.',
  },

  {
    id: 'pushup',

    name: 'Push-up',

    category: 'push',

    level: 3,

    rarity: 'basic',

    description:
      'Die Grundlage für fortgeschrittene Druckbewegungen.',

    requiredWorkoutId:
      'l1-push-2',

    unlockMessage:
      'Der klassische Push-up wurde freigeschaltet.',
  },

  {
    id: 'diamond-pushup',

    name: 'Diamond Push-up',

    category: 'push',

    level: 4,

    rarity: 'advanced',

    description:
      'Mehr Belastung für Trizeps und Körperspannung.',

    requiredWorkoutId:
      'l2-push-1',

    unlockMessage:
      'Eine neue Push-Progression steht bereit.',
  },

  {
    id: 'pike-pushup',

    name: 'Pike Push-up',

    category: 'push',

    level: 5,

    rarity: 'advanced',

    description:
      'Der erste Schritt in Richtung Handstand Push-up.',

    requiredWorkoutId:
      'l2-push-2',

    unlockMessage:
      'Deine Schulterkraft erreicht die nächste Stufe.',
  },

  {
    id: 'archer-pushup',

    name: 'Archer Push-up',

    category: 'push',

    level: 6,

    rarity: 'elite',

    description:
      'Bereitet dich auf einarmige Druckbewegungen vor.',

    unlockMessage:
      'Ein fortgeschrittener Push-Skill wurde freigeschaltet.',
  },

  // =========================================================
  // PULL
  // =========================================================

  {
    id: 'dead-hang',

    name: 'Dead Hang',

    category: 'pull',

    level: 1,

    rarity: 'basic',

    description:
      'Griffkraft und Schulterkontrolle.',

    unlockMessage:
      'Deine Pull-Reise beginnt.',
  },

  {
    id: 'scapular-pullup',

    name: 'Scapular Pull-up',

    category: 'pull',

    level: 2,

    rarity: 'basic',

    description:
      'Lerne die Schulterblätter aktiv zu kontrollieren.',

    requiredWorkoutId:
      'l1-pull-1',

    unlockMessage:
      'Mehr Kontrolle für deinen ersten Klimmzug.',
  },

  {
    id: 'band-pullup',

    name: 'Band Pull-up',

    category: 'pull',

    level: 3,

    rarity: 'basic',

    description:
      'Trainiere die vollständige Pull-up-Bewegung.',

    requiredWorkoutId:
      'l1-pull-2',

    unlockMessage:
      'Die vollständige Zugbewegung wurde freigeschaltet.',
  },

  {
    id: 'negative-pullup',

    name: 'Negative Pull-up',

    category: 'pull',

    level: 4,

    rarity: 'advanced',

    description:
      'Kontrolliere die Abwärtsbewegung ohne Unterstützung.',

    requiredWorkoutId:
      'l2-pull-1',

    unlockMessage:
      'Jetzt beginnt echte Pull-up-Kontrolle.',
  },

  {
    id: 'pullup',

    name: 'Pull-up',

    category: 'pull',

    level: 5,

    rarity: 'advanced',

    description:
      'Der erste freie Klimmzug.',

    requiredWorkoutId:
      'l2-pull-2',

    unlockMessage:
      'Der freie Pull-up ist jetzt Teil deines Skill-Pfades.',
  },

  {
    id: 'chest-to-bar',

    name: 'Chest-to-Bar',

    category: 'pull',

    level: 6,

    rarity: 'elite',

    description:
      'Explosiver Zug bis zur Brust.',
  },

  {
    id: 'high-pullup',

    name: 'High Pull-up',

    category: 'pull',

    level: 7,

    rarity: 'elite',

    description:
      'Explosivität für fortgeschrittene Pull-Skills.',
  },

  {
    id: 'muscle-up',

    name: 'Muscle-up',

    category: 'pull',

    level: 8,

    rarity: 'legendary',

    description:
      'Zug und Dip werden zu einer Bewegung.',

    unlockMessage:
      'Ein legendärer Calisthenics-Skill wurde freigeschaltet.',
  },

  // =========================================================
  // CORE
  // =========================================================

  {
    id: 'plank',

    name: 'Plank',

    category: 'core',

    level: 1,

    rarity: 'basic',

    description:
      'Grundlage für Körperspannung.',
  },

  {
    id: 'hollow-hold',

    name: 'Hollow Hold',

    category: 'core',

    level: 2,

    rarity: 'basic',

    description:
      'Aktive Körperspannung für Calisthenics-Skills.',

    requiredWorkoutId:
      'l1-core-1',
  },

  {
    id: 'hanging-knee-raise',

    name: 'Hanging Knee Raise',

    category: 'core',

    level: 3,

    rarity: 'basic',

    description:
      'Core-Kontrolle in der Hangposition.',

    requiredWorkoutId:
      'l1-core-2',
  },

  {
    id: 'tuck-hold',

    name: 'Tuck Hold',

    category: 'core',

    level: 4,

    rarity: 'advanced',

    description:
      'Die erste statische Vorbereitung für den L-Sit.',

    requiredWorkoutId:
      'l2-core-1',
  },

  {
    id: 'tuck-lsit',

    name: 'Tuck L-Sit',

    category: 'core',

    level: 5,

    rarity: 'advanced',

    description:
      'Der Einstieg in die L-Sit-Progression.',

    requiredWorkoutId:
      'l2-core-2',
  },

  {
    id: 'lsit',

    name: 'L-Sit',

    category: 'core',

    level: 6,

    rarity: 'elite',

    description:
      'Fortgeschrittene Core- und Hüftbeugerkontrolle.',
  },

  {
    id: 'vsit',

    name: 'V-Sit',

    category: 'core',

    level: 7,

    rarity: 'legendary',

    description:
      'Fortgeschrittene L-Sit-Weiterentwicklung.',
  },

  // =========================================================
  // LEGS
  // =========================================================

  {
    id: 'squat',

    name: 'Squat',

    category: 'legs',

    level: 1,

    rarity: 'basic',

    description:
      'Die Grundlage deiner Beinkraft.',
  },

  {
    id: 'reverse-lunge',

    name: 'Reverse Lunge',

    category: 'legs',

    level: 2,

    rarity: 'basic',

    description:
      'Einbeinige Kontrolle und Stabilität.',

    requiredWorkoutId:
      'l1-legs-2',
  },

  {
    id: 'split-squat',

    name: 'Split Squat',

    category: 'legs',

    level: 3,

    rarity: 'advanced',

    description:
      'Mehr einbeinige Kraft und Balance.',

    requiredWorkoutId:
      'l2-legs',
  },

  {
    id: 'pistol-prep',

    name: 'Pistol Squat Prep',

    category: 'legs',

    level: 4,

    rarity: 'advanced',

    description:
      'Vorbereitung auf den einbeinigen Squat.',
  },

  {
    id: 'pistol-squat',

    name: 'Pistol Squat',

    category: 'legs',

    level: 5,

    rarity: 'elite',

    description:
      'Fortgeschrittene einbeinige Kniebeuge.',
  },

  // =========================================================
  // SKILLS
  // =========================================================

  {
    id: 'support-hold',

    name: 'Support Hold',

    category: 'skill',

    level: 1,

    rarity: 'basic',

    description:
      'Stabilität auf parallelen Stangen.',

    requiredWorkoutId:
      'l2-dip-1',
  },

  {
    id: 'wall-handstand',

    name: 'Wall Handstand',

    category: 'skill',

    level: 2,

    rarity: 'advanced',

    description:
      'Lerne die Handstandposition kontrolliert kennen.',

    requiredWorkoutId:
      'l2-skill-control',

    unlockMessage:
      'Die Welt steht jetzt Kopf.',
  },

  {
    id: 'handstand',

    name: 'Handstand',

    category: 'skill',

    level: 3,

    rarity: 'elite',

    description:
      'Freier Handstand mit Balance und Körperspannung.',
  },

  {
    id: 'planche-lean',

    name: 'Planche Lean',

    category: 'skill',

    level: 4,

    rarity: 'advanced',

    description:
      'Erster Schritt in Richtung Planche.',
  },

  {
    id: 'tuck-planche',

    name: 'Tuck Planche',

    category: 'skill',

    level: 5,

    rarity: 'elite',

    description:
      'Fortgeschrittene statische Druckkraft.',
  },

  {
    id: 'front-lever-tuck',

    name: 'Tuck Front Lever',

    category: 'skill',

    level: 6,

    rarity: 'elite',

    description:
      'Der Einstieg in die Front-Lever-Progression.',
  },
];

export function getStarterSkillIds() {
  return skillNodes
    .filter(
      (skill) =>
        !skill.requiredWorkoutId &&
        skill.level === 1
    )
    .map(
      (skill) =>
        skill.id
    );
}

export function getSkillsUnlockedByWorkout(
  workoutId: string
) {
  return skillNodes.filter(
    (skill) =>
      skill.requiredWorkoutId ===
      workoutId
  );
}