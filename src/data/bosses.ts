import type { BossBattle } from '../types/game';

export const bossBattles: BossBattle[] = [
  // =========================================================
  // BOSS 1 – DER TORWÄCHTER
  // =========================================================

  {
    bossId: 'gatekeeper',

    maxHP: 100,

    phases: [
      {
        id: 'gatekeeper-phase-1',
        title: 'Erste Prüfung',
        subtitle:
          'Der Torwächter testet deine Grundlagen.',
        damage: 20,

        exercises: [
          {
            id: 'boss1-p1-push',
            name: 'Push-up',
            category: 'push',
            difficulty: 2,
            sets: 1,
            reps: 12,
            restSeconds: 45,
            estimatedKcal: 8,
          },

          {
            id: 'boss1-p1-squat',
            name: 'Squat',
            category: 'legs',
            difficulty: 2,
            sets: 1,
            reps: 15,
            restSeconds: 45,
            estimatedKcal: 8,
          },
        ],
      },

      {
        id: 'gatekeeper-phase-2',
        title: 'Der Griff des Wächters',
        subtitle:
          'Jetzt wird deine Zugkraft geprüft.',
        damage: 25,

        exercises: [
          {
            id: 'boss1-p2-band',
            name: 'Band Pull-up',
            category: 'pull',
            difficulty: 2,
            sets: 1,
            reps: 6,
            restSeconds: 60,
            estimatedKcal: 9,
          },

          {
            id: 'boss1-p2-negative',
            name: 'Negative Pull-up',
            category: 'pull',
            difficulty: 2,
            sets: 1,
            reps: 4,
            restSeconds: 60,
            estimatedKcal: 8,
          },
        ],
      },

      {
        id: 'gatekeeper-phase-3',
        title: 'Prüfung der Kontrolle',
        subtitle:
          'Der Kampf verlangt mehr als rohe Kraft.',
        damage: 25,

        exercises: [
          {
            id: 'boss1-p3-knee',
            name: 'Hanging Knee Raise',
            category: 'core',
            difficulty: 2,
            sets: 1,
            reps: 10,
            restSeconds: 45,
            estimatedKcal: 9,
          },

          {
            id: 'boss1-p3-hollow',
            name: 'Hollow Hold',
            category: 'core',
            difficulty: 2,
            sets: 1,
            durationSeconds: 30,
            restSeconds: 45,
            estimatedKcal: 8,
          },
        ],
      },

      {
        id: 'gatekeeper-phase-4',
        title: 'Finaler Angriff',
        subtitle:
          'Der Torwächter setzt seine letzte Kraft frei.',
        damage: 30,

        exercises: [
          {
            id: 'boss1-p4-push',
            name: 'Push-up',
            category: 'push',
            difficulty: 2,
            sets: 1,
            reps: 8,
            restSeconds: 45,
            estimatedKcal: 7,
          },

          {
            id: 'boss1-p4-negative',
            name: 'Negative Pull-up',
            category: 'pull',
            difficulty: 2,
            sets: 1,
            reps: 5,
            restSeconds: 60,
            estimatedKcal: 9,
          },

          {
            id: 'boss1-p4-plank',
            name: 'Plank',
            category: 'core',
            difficulty: 2,
            sets: 1,
            durationSeconds: 45,
            restSeconds: 45,
            estimatedKcal: 8,
          },
        ],
      },
    ],
  },

  // =========================================================
  // BOSS 2 – DER BRECHER
  // =========================================================

  {
    bossId: 'breaker',

    maxHP: 120,

    phases: [
      {
        id: 'breaker-phase-1',

        title: 'Aufprall',

        subtitle:
          'Der Brecher eröffnet den Kampf mit roher Gewalt.',

        damage: 25,

        exercises: [
          {
            id: 'breaker-p1-push',
            name: 'Push-up',
            category: 'push',
            difficulty: 3,
            sets: 2,
            reps: 12,
            restSeconds: 45,
            estimatedKcal: 14,
          },

          {
            id: 'breaker-p1-dip',
            name: 'Assisted Dip',
            category: 'push',
            difficulty: 3,
            sets: 2,
            reps: 8,
            restSeconds: 60,
            estimatedKcal: 14,
          },
        ],
      },

      {
        id: 'breaker-phase-2',

        title: 'Gegenkraft',

        subtitle:
          'Halte seinem Druck stand und zieh dich zurück in den Kampf.',

        damage: 30,

        exercises: [
          {
            id: 'breaker-p2-pull',
            name: 'Light Band Pull-up',
            category: 'pull',
            difficulty: 3,
            sets: 2,
            reps: 7,
            restSeconds: 75,
            estimatedKcal: 16,
          },

          {
            id: 'breaker-p2-negative',
            name: 'Negative Pull-up',
            category: 'pull',
            difficulty: 3,
            sets: 2,
            reps: 5,
            restSeconds: 75,
            estimatedKcal: 14,
          },
        ],
      },

      {
        id: 'breaker-phase-3',

        title: 'Standhalten',

        subtitle:
          'Der Brecher versucht, deine Körperspannung zu zerstören.',

        damage: 30,

        exercises: [
          {
            id: 'breaker-p3-knee',
            name: 'Hanging Knee Raise',
            category: 'core',
            difficulty: 3,
            sets: 2,
            reps: 10,
            restSeconds: 60,
            estimatedKcal: 15,
          },

          {
            id: 'breaker-p3-hollow',
            name: 'Hollow Hold',
            category: 'core',
            difficulty: 3,
            sets: 2,
            durationSeconds: 35,
            restSeconds: 45,
            estimatedKcal: 13,
          },

          {
            id: 'breaker-p3-squat',
            name: 'Squat',
            category: 'legs',
            difficulty: 2,
            sets: 2,
            reps: 20,
            restSeconds: 45,
            estimatedKcal: 15,
          },
        ],
      },

      {
        id: 'breaker-phase-4',

        title: 'Limit Break',

        subtitle:
          'Seine Aura explodiert. Dies ist der letzte Schlagabtausch.',

        damage: 35,

        exercises: [
          {
            id: 'breaker-p4-push',
            name: 'Push-up',
            category: 'push',
            difficulty: 3,
            sets: 2,
            reps: 12,
            restSeconds: 45,
            estimatedKcal: 15,
          },

          {
            id: 'breaker-p4-pull',
            name: 'Light Band Pull-up',
            category: 'pull',
            difficulty: 3,
            sets: 2,
            reps: 7,
            restSeconds: 60,
            estimatedKcal: 16,
          },

          {
            id: 'breaker-p4-dip',
            name: 'Assisted Dip',
            category: 'push',
            difficulty: 3,
            sets: 2,
            reps: 8,
            restSeconds: 60,
            estimatedKcal: 15,
          },

          {
            id: 'breaker-p4-plank',
            name: 'Plank',
            category: 'core',
            difficulty: 3,
            sets: 1,
            durationSeconds: 60,
            restSeconds: 45,
            estimatedKcal: 12,
          },
        ],
      },
    ],
  },
];