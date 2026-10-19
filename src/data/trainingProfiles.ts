export type TrainingProfileId =
  | 'beginner'
  | 'intermediate'
  | 'advanced'
  | 'glute-focus';

export type TrainingProfile = {
  id: TrainingProfileId;

  title: string;

  subtitle: string;

  description: string;

  weeklySessions: number;

  difficulty: string;

  focus: string[];
};

export const trainingProfiles: TrainingProfile[] = [
  {
    id: 'beginner',

    title: 'Die Grundlagen lernen',

    subtitle: 'Einsteiger',

    description:
      'Du baust Kraft, Körperspannung und Technik von Grund auf auf.',

    weeklySessions: 3,

    difficulty: 'Einsteiger',

    focus: [
      'Grundkraft',
      'Technik',
      'Kontrolle',
    ],
  },

  {
    id: 'intermediate',

    title: 'Du besitzt bereits Kraft',

    subtitle: 'Fortgeschritten',

    description:
      'Du kannst grundlegende Calisthenics-Übungen bereits ausführen und steigst mit anspruchsvolleren Varianten ein.',

    weeklySessions: 3,

    difficulty: 'Mittel',

    focus: [
      'Kraft',
      'Muskelaufbau',
      'Calisthenics',
    ],
  },

  {
    id: 'advanced',

    title: 'Fortgeschrittene Skills',

    subtitle: 'Athlet',

    description:
      'Du besitzt bereits eine starke Basis und arbeitest gezielt an schwierigen Skills.',

    weeklySessions: 4,

    difficulty: 'Fortgeschritten',

    focus: [
      'Skills',
      'Kraft',
      'Körperkontrolle',
    ],
  },

  {
    id: 'glute-focus',

    title: 'Po & Beine',

    subtitle: 'Glute Focus',

    description:
      'Ein progressiver Trainingsplan mit Schwerpunkt auf Gesäß, Beine und Unterkörper.',

    weeklySessions: 3,

    difficulty: 'Anpassbar',

    focus: [
      'Gesäß',
      'Beine',
      'Core',
    ],
  },
];

export const TRAINING_PROFILES =
  trainingProfiles;

export function getTrainingProfile(
  id?: string | null
): TrainingProfile {
  const profile =
    trainingProfiles.find(
      (item) =>
        item.id === id
    );

  return (
    profile ??
    trainingProfiles[0]
  );
}

export type AuraState = {
  level: number;

  title: string;
};

export function getAuraState(
  streak: number
): AuraState {
  if (streak >= 30) {
    return {
      level: 5,

      title: 'Legendäre Aura',
    };
  }

  if (streak >= 14) {
    return {
      level: 4,

      title: 'Mächtige Aura',
    };
  }

  if (streak >= 7) {
    return {
      level: 3,

      title: 'Starke Aura',
    };
  }

  if (streak >= 3) {
    return {
      level: 2,

      title: 'Erwachte Aura',
    };
  }

  if (streak >= 1) {
    return {
      level: 1,

      title: 'Erste Aura',
    };
  }

  return {
    level: 0,

    title: 'Noch nicht erwacht',
  };
}