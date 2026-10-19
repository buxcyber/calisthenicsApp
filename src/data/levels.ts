import type {
    GameLevel,
} from '../types/game';

import type {
    AdaptiveWorkout,
} from './adaptiveTraining';

type AdaptiveGameLevel =
  Omit<
    GameLevel,
    'workouts'
  > & {
    workouts:
      AdaptiveWorkout[];
  };

export const levels: AdaptiveGameLevel[] =
  [
    // =======================================================
    // LEVEL 1
    // DIE AUFNAHME
    // =======================================================

    {
      id: 1,

      title:
        'Die Aufnahme',

      subtitle:
        'Beweise dem Meister, dass du bereit bist.',

      workouts: [
        // ---------------------------------------------------
        // 1
        // ---------------------------------------------------

        {
          id:
            'l1-awakening',

          title:
            'Die Ankunft',

          description:
            'Deine erste Prüfung beginnt mit einfachen Grundbewegungen.',

          exercises: [
            {
              id:
                'l1-awakening-incline',

              name:
                'Incline Push-up',

              category:
                'push',

              difficulty:
                1,

              sets:
                3,

              reps:
                10,

              restSeconds:
                45,

              estimatedKcal:
                15,
            },

            {
              id:
                'l1-awakening-squat',

              name:
                'Bodyweight Squat',

              category:
                'legs',

              difficulty:
                1,

              sets:
                3,

              reps:
                12,

              restSeconds:
                45,

              estimatedKcal:
                18,
            },

            {
              id:
                'l1-awakening-plank',

              name:
                'Plank',

              category:
                'core',

              difficulty:
                1,

              sets:
                3,

              durationSeconds:
                20,

              restSeconds:
                40,

              estimatedKcal:
                12,
            },
          ],

          profileVariants: {
            advanced: {
              description:
                'Der Meister erkennt sofort, dass du kein Anfänger bist. Deine erste Prüfung beginnt entsprechend härter.',

              exercises: [
                {
                  id:
                    'l1-awakening-advanced-pushup',

                  name:
                    'Push-up',

                  category:
                    'push',

                  difficulty:
                    2,

                  sets:
                    3,

                  reps:
                    12,

                  restSeconds:
                    60,

                  estimatedKcal:
                    21,
                },

                {
                  id:
                    'l1-awakening-advanced-pullup',

                  name:
                    'Pull-up',

                  category:
                    'pull',

                  difficulty:
                    3,

                  sets:
                    4,

                  reps:
                    4,

                  restSeconds:
                    90,

                  estimatedKcal:
                    28,
                },

                {
                  id:
                    'l1-awakening-advanced-hollow',

                  name:
                    'Hollow Hold',

                  category:
                    'core',

                  difficulty:
                    2,

                  sets:
                    3,

                  durationSeconds:
                    30,

                  restSeconds:
                    45,

                  estimatedKcal:
                    15,
                },
              ],
            },

            athlete: {
              description:
                'Deine Kraft ist offensichtlich. Der Meister beginnt sofort mit einer anspruchsvollen Prüfung.',

              exercises: [
                {
                  id:
                    'l1-awakening-athlete-decline',

                  name:
                    'Decline Push-up',

                  category:
                    'push',

                  difficulty:
                    4,

                  sets:
                    4,

                  reps:
                    12,

                  restSeconds:
                    60,

                  estimatedKcal:
                    28,
                },

                {
                  id:
                    'l1-awakening-athlete-pullup',

                  name:
                    'Chest-to-Bar Pull-up',

                  category:
                    'pull',

                  difficulty:
                    5,

                  sets:
                    4,

                  reps:
                    5,

                  restSeconds:
                    100,

                  estimatedKcal:
                    34,
                },

                {
                  id:
                    'l1-awakening-athlete-hollow',

                  name:
                    'Hollow Hold',

                  category:
                    'core',

                  difficulty:
                    3,

                  sets:
                    4,

                  durationSeconds:
                    40,

                  restSeconds:
                    45,

                  estimatedKcal:
                    20,
                },
              ],
            },
          },
        },

        // ---------------------------------------------------
        // 2
        // ---------------------------------------------------

        {
          id:
            'l1-push-1',

          title:
            'Prüfung des Drucks',

          description:
            'Der Meister prüft deine grundlegende Druckkraft.',

          exercises: [
            {
              id:
                'l1-push1-incline',

              name:
                'Incline Push-up',

              category:
                'push',

              difficulty:
                1,

              sets:
                4,

              reps:
                10,

              restSeconds:
                60,

              estimatedKcal:
                24,
            },

            {
              id:
                'l1-push1-knee',

              name:
                'Knee Push-up',

              category:
                'push',

              difficulty:
                1,

              sets:
                3,

              reps:
                8,

              restSeconds:
                60,

              estimatedKcal:
                18,
            },

            {
              id:
                'l1-push1-plank',

              name:
                'High Plank',

              category:
                'core',

              difficulty:
                1,

              sets:
                3,

              durationSeconds:
                25,

              restSeconds:
                45,

              estimatedKcal:
                12,
            },
          ],

          profileVariants: {
            advanced: {
              exercises: [
                {
                  id:
                    'l1-push1-advanced-pushup',

                  name:
                    'Push-up',

                  category:
                    'push',

                  difficulty:
                    2,

                  sets:
                    4,

                  reps:
                    12,

                  restSeconds:
                    70,

                  estimatedKcal:
                    28,
                },

                {
                  id:
                    'l1-push1-advanced-diamond',

                  name:
                    'Diamond Push-up',

                  category:
                    'push',

                  difficulty:
                    3,

                  sets:
                    3,

                  reps:
                    8,

                  restSeconds:
                    75,

                  estimatedKcal:
                    24,
                },

                {
                  id:
                    'l1-push1-advanced-plank',

                  name:
                    'Plank Shoulder Tap',

                  category:
                    'core',

                  difficulty:
                    2,

                  sets:
                    3,

                  reps:
                    16,

                  restSeconds:
                    45,

                  estimatedKcal:
                    18,
                },
              ],
            },

            athlete: {
              exercises: [
                {
                  id:
                    'l1-push1-athlete-archer',

                  name:
                    'Archer Push-up',

                  category:
                    'push',

                  difficulty:
                    5,

                  sets:
                    4,

                  reps:
                    6,

                  restSeconds:
                    90,

                  estimatedKcal:
                    32,
                },

                {
                  id:
                    'l1-push1-athlete-pike',

                  name:
                    'Elevated Pike Push-up',

                  category:
                    'push',

                  difficulty:
                    5,

                  sets:
                    4,

                  reps:
                    8,

                  restSeconds:
                    90,

                  estimatedKcal:
                    30,
                },

                {
                  id:
                    'l1-push1-athlete-hollow',

                  name:
                    'Hollow Rocks',

                  category:
                    'core',

                  difficulty:
                    4,

                  sets:
                    3,

                  reps:
                    15,

                  restSeconds:
                    50,

                  estimatedKcal:
                    20,
                },
              ],
            },
          },
        },

        // ---------------------------------------------------
        // 3
        // ---------------------------------------------------

        {
          id:
            'l1-pull-1',

          title:
            'Prüfung des Griffs',

          description:
            'Ein fester Griff ist die Grundlage jeder Zugbewegung.',

          exercises: [
            {
              id:
                'l1-pull1-hang',

              name:
                'Dead Hang',

              category:
                'pull',

              difficulty:
                1,

              sets:
                3,

              durationSeconds:
                20,

              restSeconds:
                60,

              estimatedKcal:
                12,
            },

            {
              id:
                'l1-pull1-scapular',

              name:
                'Scapular Pull-up',

              category:
                'pull',

              difficulty:
                2,

              sets:
                3,

              reps:
                6,

              restSeconds:
                60,

              estimatedKcal:
                15,
            },

            {
              id:
                'l1-pull1-hollow',

              name:
                'Hollow Hold',

              category:
                'core',

              difficulty:
                1,

              sets:
                3,

              durationSeconds:
                20,

              restSeconds:
                40,

              estimatedKcal:
                12,
            },
          ],

          profileVariants: {
            advanced: {
              description:
                'Der Meister testet deine Zugkraft und deine Kontrolle an der Stange.',

              exercises: [
                {
                  id:
                    'l1-pull1-advanced-pullup',

                  name:
                    'Pull-up',

                  category:
                    'pull',

                  difficulty:
                    3,

                  sets:
                    4,

                  reps:
                    5,

                  restSeconds:
                    90,

                  estimatedKcal:
                    30,
                },

                {
                  id:
                    'l1-pull1-advanced-negative',

                  name:
                    'Slow Negative Pull-up',

                  category:
                    'pull',

                  difficulty:
                    3,

                  sets:
                    3,

                  reps:
                    4,

                  restSeconds:
                    80,

                  estimatedKcal:
                    21,
                },

                {
                  id:
                    'l1-pull1-advanced-hang',

                  name:
                    'Active Hang',

                  category:
                    'pull',

                  difficulty:
                    2,

                  sets:
                    3,

                  durationSeconds:
                    25,

                  restSeconds:
                    60,

                  estimatedKcal:
                    15,
                },
              ],
            },

            athlete: {
              exercises: [
                {
                  id:
                    'l1-pull1-athlete-chest',

                  name:
                    'Chest-to-Bar Pull-up',

                  category:
                    'pull',

                  difficulty:
                    5,

                  sets:
                    5,

                  reps:
                    5,

                  restSeconds:
                    100,

                  estimatedKcal:
                    40,
                },

                {
                  id:
                    'l1-pull1-athlete-high',

                  name:
                    'High Pull-up',

                  category:
                    'pull',

                  difficulty:
                    6,

                  sets:
                    4,

                  reps:
                    4,

                  restSeconds:
                    110,

                  estimatedKcal:
                    34,
                },

                {
                  id:
                    'l1-pull1-athlete-hang',

                  name:
                    'L-Sit Hang',

                  category:
                    'core',

                  difficulty:
                    5,

                  sets:
                    3,

                  durationSeconds:
                    15,

                  restSeconds:
                    70,

                  estimatedKcal:
                    18,
                },
              ],
            },
          },
        },

        // ---------------------------------------------------
        // 4
        // ---------------------------------------------------

        {
          id:
            'l1-legs-1',

          title:
            'Standfestigkeit',

          description:
            'Der Meister prüft, ob dein Fundament stabil genug ist.',

          exercises: [
            {
              id:
                'l1-legs1-squat',

              name:
                'Bodyweight Squat',

              category:
                'legs',

              difficulty:
                1,

              sets:
                4,

              reps:
                12,

              restSeconds:
                60,

              estimatedKcal:
                28,
            },

            {
              id:
                'l1-legs1-lunge',

              name:
                'Reverse Lunge',

              category:
                'legs',

              difficulty:
                2,

              sets:
                3,

              reps:
                8,

              restSeconds:
                60,

              estimatedKcal:
                24,
            },

            {
              id:
                'l1-legs1-calf',

              name:
                'Calf Raise',

              category:
                'legs',

              difficulty:
                1,

              sets:
                3,

              reps:
                15,

              restSeconds:
                45,

              estimatedKcal:
                15,
            },
          ],

          profileVariants: {
            advanced: {
              exercises: [
                {
                  id:
                    'l1-legs1-advanced-bulgarian',

                  name:
                    'Bulgarian Split Squat',

                  category:
                    'legs',

                  difficulty:
                    3,

                  sets:
                    4,

                  reps:
                    10,

                  restSeconds:
                    75,

                  estimatedKcal:
                    34,
                },

                {
                  id:
                    'l1-legs1-advanced-jump',

                  name:
                    'Jump Squat',

                  category:
                    'legs',

                  difficulty:
                    3,

                  sets:
                    3,

                  reps:
                    10,

                  restSeconds:
                    70,

                  estimatedKcal:
                    27,
                },

                {
                  id:
                    'l1-legs1-advanced-wall',

                  name:
                    'Wall Sit',

                  category:
                    'legs',

                  difficulty:
                    2,

                  sets:
                    3,

                  durationSeconds:
                    40,

                  restSeconds:
                    60,

                  estimatedKcal:
                    18,
                },
              ],
            },

            athlete: {
              exercises: [
                {
                  id:
                    'l1-legs1-athlete-pistol',

                  name:
                    'Pistol Squat',

                  category:
                    'legs',

                  difficulty:
                    6,

                  sets:
                    4,

                  reps:
                    6,

                  restSeconds:
                    90,

                  estimatedKcal:
                    36,
                },

                {
                  id:
                    'l1-legs1-athlete-jump',

                  name:
                    'Explosive Jump Squat',

                  category:
                    'legs',

                  difficulty:
                    5,

                  sets:
                    4,

                  reps:
                    10,

                  restSeconds:
                    80,

                  estimatedKcal:
                    36,
                },

                {
                  id:
                    'l1-legs1-athlete-split',

                  name:
                    'Deep Split Squat',

                  category:
                    'legs',

                  difficulty:
                    4,

                  sets:
                    3,

                  reps:
                    10,

                  restSeconds:
                    70,

                  estimatedKcal:
                    27,
                },
              ],
            },
          },
        },

        // ---------------------------------------------------
        // 5
        // ---------------------------------------------------

        {
          id:
            'l1-core-1',

          title:
            'Innere Kontrolle',

          description:
            'Kraft ohne Körperspannung ist für den Meister wertlos.',

          exercises: [
            {
              id:
                'l1-core1-plank',

              name:
                'Plank',

              category:
                'core',

              difficulty:
                1,

              sets:
                3,

              durationSeconds:
                30,

              restSeconds:
                45,

              estimatedKcal:
                15,
            },

            {
              id:
                'l1-core1-deadbug',

              name:
                'Dead Bug',

              category:
                'core',

              difficulty:
                1,

              sets:
                3,

              reps:
                10,

              restSeconds:
                45,

              estimatedKcal:
                15,
            },

            {
              id:
                'l1-core1-hollow',

              name:
                'Hollow Hold',

              category:
                'core',

              difficulty:
                2,

              sets:
                3,

              durationSeconds:
                20,

              restSeconds:
                45,

              estimatedKcal:
                15,
            },
          ],

          profileVariants: {
            advanced: {
              exercises: [
                {
                  id:
                    'l1-core1-advanced-hollow',

                  name:
                    'Hollow Hold',

                  category:
                    'core',

                  difficulty:
                    3,

                  sets:
                    4,

                  durationSeconds:
                    35,

                  restSeconds:
                    45,

                  estimatedKcal:
                    20,
                },

                {
                  id:
                    'l1-core1-advanced-knee',

                  name:
                    'Hanging Knee Raise',

                  category:
                    'core',

                  difficulty:
                    3,

                  sets:
                    4,

                  reps:
                    10,

                  restSeconds:
                    60,

                  estimatedKcal:
                    28,
                },

                {
                  id:
                    'l1-core1-advanced-side',

                  name:
                    'Side Plank',

                  category:
                    'core',

                  difficulty:
                    2,

                  sets:
                    3,

                  durationSeconds:
                    30,

                  restSeconds:
                    40,

                  estimatedKcal:
                    15,
                },
              ],
            },

            athlete: {
              exercises: [
                {
                  id:
                    'l1-core1-athlete-legraise',

                  name:
                    'Hanging Leg Raise',

                  category:
                    'core',

                  difficulty:
                    5,

                  sets:
                    4,

                  reps:
                    10,

                  restSeconds:
                    70,

                  estimatedKcal:
                    32,
                },

                {
                  id:
                    'l1-core1-athlete-lsit',

                  name:
                    'L-Sit',

                  category:
                    'core',

                  difficulty:
                    6,

                  sets:
                    4,

                  durationSeconds:
                    15,

                  restSeconds:
                    70,

                  estimatedKcal:
                    24,
                },

                {
                  id:
                    'l1-core1-athlete-hollow',

                  name:
                    'Hollow Rocks',

                  category:
                    'core',

                  difficulty:
                    4,

                  sets:
                    4,

                  reps:
                    15,

                  restSeconds:
                    50,

                  estimatedKcal:
                    24,
                },
              ],
            },
          },
        },

        // ---------------------------------------------------
        // 6
        // ---------------------------------------------------

        {
          id:
            'l1-fullbody-1',

          title:
            'Die erste Kombination',

          description:
            'Zum ersten Mal verbindet der Meister mehrere Bewegungen zu einer Prüfung.',

          exercises: [
            {
              id:
                'l1-full1-squat',

              name:
                'Bodyweight Squat',

              category:
                'legs',

              difficulty:
                1,

              sets:
                3,

              reps:
                12,

              restSeconds:
                45,

              estimatedKcal:
                18,
            },

            {
              id:
                'l1-full1-knee',

              name:
                'Knee Push-up',

              category:
                'push',

              difficulty:
                1,

              sets:
                3,

              reps:
                10,

              restSeconds:
                45,

              estimatedKcal:
                18,
            },

            {
              id:
                'l1-full1-plank',

              name:
                'Plank',

              category:
                'core',

              difficulty:
                1,

              sets:
                3,

              durationSeconds:
                25,

              restSeconds:
                45,

              estimatedKcal:
                15,
            },
          ],

          profileVariants: {
            advanced: {
              exercises: [
                {
                  id:
                    'l1-full1-advanced-pullup',

                  name:
                    'Pull-up',

                  category:
                    'pull',

                  difficulty:
                    3,

                  sets:
                    4,

                  reps:
                    5,

                  restSeconds:
                    75,

                  estimatedKcal:
                    28,
                },

                {
                  id:
                    'l1-full1-advanced-pushup',

                  name:
                    'Push-up',

                  category:
                    'push',

                  difficulty:
                    2,

                  sets:
                    4,

                  reps:
                    12,

                  restSeconds:
                    60,

                  estimatedKcal:
                    28,
                },

                {
                  id:
                    'l1-full1-advanced-split',

                  name:
                    'Bulgarian Split Squat',

                  category:
                    'legs',

                  difficulty:
                    3,

                  sets:
                    3,

                  reps:
                    10,

                  restSeconds:
                    60,

                  estimatedKcal:
                    27,
                },

                {
                  id:
                    'l1-full1-advanced-hollow',

                  name:
                    'Hollow Hold',

                  category:
                    'core',

                  difficulty:
                    3,

                  sets:
                    3,

                  durationSeconds:
                    30,

                  restSeconds:
                    45,

                  estimatedKcal:
                    15,
                },
              ],
            },

            athlete: {
              exercises: [
                {
                  id:
                    'l1-full1-athlete-highpull',

                  name:
                    'High Pull-up',

                  category:
                    'pull',

                  difficulty:
                    6,

                  sets:
                    4,

                  reps:
                    4,

                  restSeconds:
                    90,

                  estimatedKcal:
                    32,
                },

                {
                  id:
                    'l1-full1-athlete-archer',

                  name:
                    'Archer Push-up',

                  category:
                    'push',

                  difficulty:
                    5,

                  sets:
                    4,

                  reps:
                    6,

                  restSeconds:
                    80,

                  estimatedKcal:
                    30,
                },

                {
                  id:
                    'l1-full1-athlete-pistol',

                  name:
                    'Pistol Squat',

                  category:
                    'legs',

                  difficulty:
                    6,

                  sets:
                    3,

                  reps:
                    6,

                  restSeconds:
                    80,

                  estimatedKcal:
                    27,
                },

                {
                  id:
                    'l1-full1-athlete-lsit',

                  name:
                    'L-Sit',

                  category:
                    'core',

                  difficulty:
                    6,

                  sets:
                    3,

                  durationSeconds:
                    15,

                  restSeconds:
                    60,

                  estimatedKcal:
                    18,
                },
              ],
            },
          },
        },

        // ---------------------------------------------------
        // 7
        // ---------------------------------------------------

        {
          id:
            'l1-push-2',

          title:
            'Kontrolle unter Druck',

          description:
            'Der Meister erhöht die Belastung und beobachtet deine Technik.',

          exercises: [
            {
              id:
                'l1-push2-knee',

              name:
                'Knee Push-up',

              category:
                'push',

              difficulty:
                1,

              sets:
                4,

              reps:
                10,

              restSeconds:
                55,

              estimatedKcal:
                24,
            },

            {
              id:
                'l1-push2-negative',

              name:
                'Slow Push-up Negative',

              category:
                'push',

              difficulty:
                2,

              sets:
                3,

              reps:
                5,

              restSeconds:
                60,

              estimatedKcal:
                18,
            },
          ],

          profileVariants: {
            advanced: {
              exercises: [
                {
                  id:
                    'l1-push2-advanced-diamond',

                  name:
                    'Diamond Push-up',

                  category:
                    'push',

                  difficulty:
                    3,

                  sets:
                    4,

                  reps:
                    10,

                  restSeconds:
                    70,

                  estimatedKcal:
                    30,
                },

                {
                  id:
                    'l1-push2-advanced-pike',

                  name:
                    'Pike Push-up',

                  category:
                    'push',

                  difficulty:
                    4,

                  sets:
                    4,

                  reps:
                    8,

                  restSeconds:
                    80,

                  estimatedKcal:
                    28,
                },

                {
                  id:
                    'l1-push2-advanced-tempo',

                  name:
                    'Slow Tempo Push-up',

                  category:
                    'push',

                  difficulty:
                    3,

                  sets:
                    3,

                  reps:
                    8,

                  restSeconds:
                    70,

                  estimatedKcal:
                    21,
                },
              ],
            },

            athlete: {
              exercises: [
                {
                  id:
                    'l1-push2-athlete-handstand',

                  name:
                    'Wall Handstand Push-up Negative',

                  category:
                    'push',

                  difficulty:
                    7,

                  sets:
                    4,

                  reps:
                    4,

                  restSeconds:
                    100,

                  estimatedKcal:
                    32,
                },

                {
                  id:
                    'l1-push2-athlete-archer',

                  name:
                    'Archer Push-up',

                  category:
                    'push',

                  difficulty:
                    5,

                  sets:
                    4,

                  reps:
                    7,

                  restSeconds:
                    85,

                  estimatedKcal:
                    32,
                },

                {
                  id:
                    'l1-push2-athlete-pike',

                  name:
                    'Elevated Pike Push-up',

                  category:
                    'push',

                  difficulty:
                    5,

                  sets:
                    3,

                  reps:
                    8,

                  restSeconds:
                    80,

                  estimatedKcal:
                    24,
                },
              ],
            },
          },
        },

        // ---------------------------------------------------
        // 8
        // ---------------------------------------------------

        {
          id:
            'l1-pull-2',

          title:
            'Kontrolle am Hang',

          description:
            'Der Weg wird steiler. Jetzt zählt kontrollierte Zugkraft.',

          exercises: [
            {
              id:
                'l1-pull2-scapular',

              name:
                'Scapular Pull-up',

              category:
                'pull',

              difficulty:
                2,

              sets:
                4,

              reps:
                7,

              restSeconds:
                60,

              estimatedKcal:
                20,
            },

            {
              id:
                'l1-pull2-negative',

              name:
                'Negative Pull-up',

              category:
                'pull',

              difficulty:
                2,

              sets:
                3,

              reps:
                3,

              restSeconds:
                75,

              estimatedKcal:
                18,
            },
          ],

          profileVariants: {
            advanced: {
              exercises: [
                {
                  id:
                    'l1-pull2-advanced-pullup',

                  name:
                    'Pull-up',

                  category:
                    'pull',

                  difficulty:
                    3,

                  sets:
                    5,

                  reps:
                    5,

                  restSeconds:
                    90,

                  estimatedKcal:
                    35,
                },

                {
                  id:
                    'l1-pull2-advanced-chin',

                  name:
                    'Chin-up',

                  category:
                    'pull',

                  difficulty:
                    3,

                  sets:
                    4,

                  reps:
                    6,

                  restSeconds:
                    85,

                  estimatedKcal:
                    30,
                },

                {
                  id:
                    'l1-pull2-advanced-scap',

                  name:
                    'Scapular Pull-up',

                  category:
                    'pull',

                  difficulty:
                    2,

                  sets:
                    3,

                  reps:
                    10,

                  restSeconds:
                    55,

                  estimatedKcal:
                    15,
                },
              ],
            },

            athlete: {
              exercises: [
                {
                  id:
                    'l1-pull2-athlete-high',

                  name:
                    'High Pull-up',

                  category:
                    'pull',

                  difficulty:
                    6,

                  sets:
                    5,

                  reps:
                    4,

                  restSeconds:
                    105,

                  estimatedKcal:
                    40,
                },

                {
                  id:
                    'l1-pull2-athlete-archer',

                  name:
                    'Archer Pull-up Progression',

                  category:
                    'pull',

                  difficulty:
                    7,

                  sets:
                    4,

                  reps:
                    4,

                  restSeconds:
                    110,

                  estimatedKcal:
                    34,
                },

                {
                  id:
                    'l1-pull2-athlete-lsit',

                  name:
                    'L-Sit Pull-up',

                  category:
                    'pull',

                  difficulty:
                    7,

                  sets:
                    3,

                  reps:
                    5,

                  restSeconds:
                    100,

                  estimatedKcal:
                    27,
                },
              ],
            },
          },
        },

        // ---------------------------------------------------
        // 9
        // ---------------------------------------------------

        {
          id:
            'l1-legs-2',

          title:
            'Der steile Pfad',

          description:
            'Der Aufstieg zum Meister verlangt Kraft und Stabilität in den Beinen.',

          exercises: [
            {
              id:
                'l1-legs2-lunge',

              name:
                'Reverse Lunge',

              category:
                'legs',

              difficulty:
                2,

              sets:
                4,

              reps:
                10,

              restSeconds:
                60,

              estimatedKcal:
                28,
            },

            {
              id:
                'l1-legs2-squat',

              name:
                'Tempo Squat',

              category:
                'legs',

              difficulty:
                2,

              sets:
                3,

              reps:
                12,

              restSeconds:
                60,

              estimatedKcal:
                24,
            },
          ],

          profileVariants: {
            advanced: {
              exercises: [
                {
                  id:
                    'l1-legs2-advanced-split',

                  name:
                    'Bulgarian Split Squat',

                  category:
                    'legs',

                  difficulty:
                    3,

                  sets:
                    4,

                  reps:
                    12,

                  restSeconds:
                    75,

                  estimatedKcal:
                    36,
                },

                {
                  id:
                    'l1-legs2-advanced-pistolprep',

                  name:
                    'Pistol Squat Preparation',

                  category:
                    'legs',

                  difficulty:
                    4,

                  sets:
                    4,

                  reps:
                    6,

                  restSeconds:
                    75,

                  estimatedKcal:
                    28,
                },

                {
                  id:
                    'l1-legs2-advanced-jump',

                  name:
                    'Jump Squat',

                  category:
                    'legs',

                  difficulty:
                    3,

                  sets:
                    3,

                  reps:
                    12,

                  restSeconds:
                    65,

                  estimatedKcal:
                    27,
                },
              ],
            },

            athlete: {
              exercises: [
                {
                  id:
                    'l1-legs2-athlete-pistol',

                  name:
                    'Pistol Squat',

                  category:
                    'legs',

                  difficulty:
                    6,

                  sets:
                    5,

                  reps:
                    6,

                  restSeconds:
                    90,

                  estimatedKcal:
                    40,
                },

                {
                  id:
                    'l1-legs2-athlete-shrimp',

                  name:
                    'Shrimp Squat',

                  category:
                    'legs',

                  difficulty:
                    6,

                  sets:
                    4,

                  reps:
                    6,

                  restSeconds:
                    90,

                  estimatedKcal:
                    32,
                },

                {
                  id:
                    'l1-legs2-athlete-jump',

                  name:
                    'Explosive Jump Squat',

                  category:
                    'legs',

                  difficulty:
                    5,

                  sets:
                    3,

                  reps:
                    12,

                  restSeconds:
                    75,

                  estimatedKcal:
                    30,
                },
              ],
            },
          },
        },

        // ---------------------------------------------------
        // 10
        // ---------------------------------------------------

        {
          id:
            'l1-core-2',

          title:
            'Ruhe unter Spannung',

          description:
            'Der Meister fordert Kontrolle, obwohl dein Körper bereits ermüdet.',

          exercises: [
            {
              id:
                'l1-core2-hollow',

              name:
                'Hollow Hold',

              category:
                'core',

              difficulty:
                2,

              sets:
                4,

              durationSeconds:
                25,

              restSeconds:
                45,

              estimatedKcal:
                20,
            },

            {
              id:
                'l1-core2-knee',

              name:
                'Lying Knee Raise',

              category:
                'core',

              difficulty:
                2,

              sets:
                3,

              reps:
                12,

              restSeconds:
                45,

              estimatedKcal:
                18,
            },
          ],

          profileVariants: {
            advanced: {
              exercises: [
                {
                  id:
                    'l1-core2-advanced-knee',

                  name:
                    'Hanging Knee Raise',

                  category:
                    'core',

                  difficulty:
                    3,

                  sets:
                    4,

                  reps:
                    12,

                  restSeconds:
                    60,

                  estimatedKcal:
                    32,
                },

                {
                  id:
                    'l1-core2-advanced-tuck',

                  name:
                    'Tuck L-Sit',

                  category:
                    'core',

                  difficulty:
                    4,

                  sets:
                    4,

                  durationSeconds:
                    15,

                  restSeconds:
                    60,

                  estimatedKcal:
                    24,
                },

                {
                  id:
                    'l1-core2-advanced-hollow',

                  name:
                    'Hollow Rocks',

                  category:
                    'core',

                  difficulty:
                    3,

                  sets:
                    3,

                  reps:
                    15,

                  restSeconds:
                    45,

                  estimatedKcal:
                    18,
                },
              ],
            },

            athlete: {
              exercises: [
                {
                  id:
                    'l1-core2-athlete-legraise',

                  name:
                    'Hanging Leg Raise',

                  category:
                    'core',

                  difficulty:
                    5,

                  sets:
                    5,

                  reps:
                    10,

                  restSeconds:
                    70,

                  estimatedKcal:
                    40,
                },

                {
                  id:
                    'l1-core2-athlete-lsit',

                  name:
                    'L-Sit',

                  category:
                    'core',

                  difficulty:
                    6,

                  sets:
                    4,

                  durationSeconds:
                    20,

                  restSeconds:
                    70,

                  estimatedKcal:
                    28,
                },

                {
                  id:
                    'l1-core2-athlete-toes',

                  name:
                    'Toes-to-Bar',

                  category:
                    'core',

                  difficulty:
                    7,

                  sets:
                    4,

                  reps:
                    8,

                  restSeconds:
                    80,

                  estimatedKcal:
                    32,
                },
              ],
            },
          },
        },

        // ---------------------------------------------------
        // 11
        // ---------------------------------------------------

        {
          id:
            'l1-technique',

          title:
            'Prüfung der Technik',

          description:
            'Nicht Kraft, sondern saubere Ausführung entscheidet diese Prüfung.',

          exercises: [
            {
              id:
                'l1-technique-squat',

              name:
                'Tempo Squat',

              category:
                'legs',

              difficulty:
                2,

              sets:
                3,

              reps:
                10,

              restSeconds:
                50,

              estimatedKcal:
                18,
            },

            {
              id:
                'l1-technique-push',

              name:
                'Slow Knee Push-up',

              category:
                'push',

              difficulty:
                2,

              sets:
                3,

              reps:
                8,

              restSeconds:
                55,

              estimatedKcal:
                18,
            },

            {
              id:
                'l1-technique-hollow',

              name:
                'Hollow Hold',

              category:
                'core',

              difficulty:
                2,

              sets:
                3,

              durationSeconds:
                25,

              restSeconds:
                45,

              estimatedKcal:
                15,
            },
          ],

          profileVariants: {
            advanced: {
              exercises: [
                {
                  id:
                    'l1-technique-advanced-pull',

                  name:
                    'Tempo Pull-up',

                  category:
                    'pull',

                  difficulty:
                    4,

                  sets:
                    4,

                  reps:
                    4,

                  restSeconds:
                    90,

                  estimatedKcal:
                    28,
                },

                {
                  id:
                    'l1-technique-advanced-push',

                  name:
                    'Tempo Push-up',

                  category:
                    'push',

                  difficulty:
                    3,

                  sets:
                    4,

                  reps:
                    10,

                  restSeconds:
                    65,

                  estimatedKcal:
                    28,
                },

                {
                  id:
                    'l1-technique-advanced-split',

                  name:
                    'Slow Split Squat',

                  category:
                    'legs',

                  difficulty:
                    3,

                  sets:
                    3,

                  reps:
                    10,

                  restSeconds:
                    60,

                  estimatedKcal:
                    24,
                },
              ],
            },

            athlete: {
              exercises: [
                {
                  id:
                    'l1-technique-athlete-pull',

                  name:
                    'Chest-to-Bar Tempo Pull-up',

                  category:
                    'pull',

                  difficulty:
                    6,

                  sets:
                    4,

                  reps:
                    5,

                  restSeconds:
                    100,

                  estimatedKcal:
                    32,
                },

                {
                  id:
                    'l1-technique-athlete-archer',

                  name:
                    'Controlled Archer Push-up',

                  category:
                    'push',

                  difficulty:
                    6,

                  sets:
                    4,

                  reps:
                    6,

                  restSeconds:
                    90,

                  estimatedKcal:
                    30,
                },

                {
                  id:
                    'l1-technique-athlete-pistol',

                  name:
                    'Tempo Pistol Squat',

                  category:
                    'legs',

                  difficulty:
                    7,

                  sets:
                    3,

                  reps:
                    5,

                  restSeconds:
                    90,

                  estimatedKcal:
                    27,
                },
              ],
            },
          },
        },

        // ---------------------------------------------------
        // 12
        // ---------------------------------------------------

        {
          id:
            'l1-power-circuit',

          title:
            'Die Kraftprobe',

          description:
            'Mehrere Bewegungen folgen direkt aufeinander. Der Meister erhöht den Druck.',

          exercises: [
            {
              id:
                'l1-power-squat',

              name:
                'Squat',

              category:
                'legs',

              difficulty:
                1,

              sets:
                3,

              reps:
                15,

              restSeconds:
                45,

              estimatedKcal:
                21,
            },

            {
              id:
                'l1-power-push',

              name:
                'Knee Push-up',

              category:
                'push',

              difficulty:
                1,

              sets:
                3,

              reps:
                10,

              restSeconds:
                45,

              estimatedKcal:
                18,
            },

            {
              id:
                'l1-power-plank',

              name:
                'Plank',

              category:
                'core',

              difficulty:
                1,

              sets:
                3,

              durationSeconds:
                30,

              restSeconds:
                45,

              estimatedKcal:
                15,
            },
          ],

          profileVariants: {
            advanced: {
              exercises: [
                {
                  id:
                    'l1-power-advanced-pull',

                  name:
                    'Pull-up',

                  category:
                    'pull',

                  difficulty:
                    3,

                  sets:
                    4,

                  reps:
                    5,

                  restSeconds:
                    60,

                  estimatedKcal:
                    28,
                },

                {
                  id:
                    'l1-power-advanced-push',

                  name:
                    'Push-up',

                  category:
                    'push',

                  difficulty:
                    2,

                  sets:
                    4,

                  reps:
                    15,

                  restSeconds:
                    50,

                  estimatedKcal:
                    32,
                },

                {
                  id:
                    'l1-power-advanced-jump',

                  name:
                    'Jump Squat',

                  category:
                    'legs',

                  difficulty:
                    3,

                  sets:
                    4,

                  reps:
                    12,

                  restSeconds:
                    50,

                  estimatedKcal:
                    32,
                },

                {
                  id:
                    'l1-power-advanced-knee',

                  name:
                    'Hanging Knee Raise',

                  category:
                    'core',

                  difficulty:
                    3,

                  sets:
                    4,

                  reps:
                    10,

                  restSeconds:
                    50,

                  estimatedKcal:
                    28,
                },
              ],
            },

            athlete: {
              exercises: [
                {
                  id:
                    'l1-power-athlete-high',

                  name:
                    'High Pull-up',

                  category:
                    'pull',

                  difficulty:
                    6,

                  sets:
                    4,

                  reps:
                    5,

                  restSeconds:
                    70,

                  estimatedKcal:
                    32,
                },

                {
                  id:
                    'l1-power-athlete-archer',

                  name:
                    'Archer Push-up',

                  category:
                    'push',

                  difficulty:
                    5,

                  sets:
                    4,

                  reps:
                    7,

                  restSeconds:
                    60,

                  estimatedKcal:
                    32,
                },

                {
                  id:
                    'l1-power-athlete-pistol',

                  name:
                    'Pistol Squat',

                  category:
                    'legs',

                  difficulty:
                    6,

                  sets:
                    4,

                  reps:
                    6,

                  restSeconds:
                    60,

                  estimatedKcal:
                    32,
                },

                {
                  id:
                    'l1-power-athlete-legraise',

                  name:
                    'Hanging Leg Raise',

                  category:
                    'core',

                  difficulty:
                    5,

                  sets:
                    4,

                  reps:
                    10,

                  restSeconds:
                    60,

                  estimatedKcal:
                    32,
                },
              ],
            },
          },
        },

        // ---------------------------------------------------
        // 13
        // ---------------------------------------------------

        {
          id:
            'l1-endurance',

          title:
            'Die Ausdauerprüfung',

          description:
            'Der Meister will sehen, ob deine Technik auch unter Ermüdung bestehen bleibt.',

          exercises: [
            {
              id:
                'l1-endurance-squat',

              name:
                'Squat',

              category:
                'legs',

              difficulty:
                1,

              sets:
                4,

              reps:
                15,

              restSeconds:
                40,

              estimatedKcal:
                28,
            },

            {
              id:
                'l1-endurance-push',

              name:
                'Incline Push-up',

              category:
                'push',

              difficulty:
                1,

              sets:
                4,

              reps:
                12,

              restSeconds:
                40,

              estimatedKcal:
                24,
            },

            {
              id:
                'l1-endurance-plank',

              name:
                'Plank',

              category:
                'core',

              difficulty:
                1,

              sets:
                3,

              durationSeconds:
                35,

              restSeconds:
                40,

              estimatedKcal:
                18,
            },
          ],

          profileVariants: {
            advanced: {
              exercises: [
                {
                  id:
                    'l1-endurance-advanced-pull',

                  name:
                    'Pull-up',

                  category:
                    'pull',

                  difficulty:
                    3,

                  sets:
                    5,

                  reps:
                    4,

                  restSeconds:
                    60,

                  estimatedKcal:
                    35,
                },

                {
                  id:
                    'l1-endurance-advanced-push',

                  name:
                    'Push-up',

                  category:
                    'push',

                  difficulty:
                    2,

                  sets:
                    5,

                  reps:
                    12,

                  restSeconds:
                    45,

                  estimatedKcal:
                    35,
                },

                {
                  id:
                    'l1-endurance-advanced-squat',

                  name:
                    'Jump Squat',

                  category:
                    'legs',

                  difficulty:
                    3,

                  sets:
                    4,

                  reps:
                    12,

                  restSeconds:
                    45,

                  estimatedKcal:
                    32,
                },

                {
                  id:
                    'l1-endurance-advanced-hollow',

                  name:
                    'Hollow Hold',

                  category:
                    'core',

                  difficulty:
                    3,

                  sets:
                    4,

                  durationSeconds:
                    35,

                  restSeconds:
                    40,

                  estimatedKcal:
                    20,
                },
              ],
            },

            athlete: {
              exercises: [
                {
                  id:
                    'l1-endurance-athlete-high',

                  name:
                    'Chest-to-Bar Pull-up',

                  category:
                    'pull',

                  difficulty:
                    5,

                  sets:
                    5,

                  reps:
                    6,

                  restSeconds:
                    65,

                  estimatedKcal:
                    40,
                },

                {
                  id:
                    'l1-endurance-athlete-push',

                  name:
                    'Decline Push-up',

                  category:
                    'push',

                  difficulty:
                    4,

                  sets:
                    5,

                  reps:
                    15,

                  restSeconds:
                    50,

                  estimatedKcal:
                    40,
                },

                {
                  id:
                    'l1-endurance-athlete-jump',

                  name:
                    'Explosive Jump Squat',

                  category:
                    'legs',

                  difficulty:
                    5,

                  sets:
                    5,

                  reps:
                    12,

                  restSeconds:
                    50,

                  estimatedKcal:
                    40,
                },

                {
                  id:
                    'l1-endurance-athlete-lsit',

                  name:
                    'L-Sit',

                  category:
                    'core',

                  difficulty:
                    6,

                  sets:
                    4,

                  durationSeconds:
                    20,

                  restSeconds:
                    55,

                  estimatedKcal:
                    28,
                },
              ],
            },
          },
        },

        // ---------------------------------------------------
        // 14
        // ---------------------------------------------------

        {
          id:
            'l1-boss-prep',

          title:
            'Vor dem Meister',

          description:
            'Die letzte Trainingseinheit vor deiner Aufnahmeprüfung.',

          exercises: [
            {
              id:
                'l1-prep-squat',

              name:
                'Tempo Squat',

              category:
                'legs',

              difficulty:
                2,

              sets:
                3,

              reps:
                12,

              restSeconds:
                50,

              estimatedKcal:
                21,
            },

            {
              id:
                'l1-prep-push',

              name:
                'Knee Push-up',

              category:
                'push',

              difficulty:
                1,

              sets:
                3,

              reps:
                12,

              restSeconds:
                50,

              estimatedKcal:
                18,
            },

            {
              id:
                'l1-prep-negative',

              name:
                'Negative Pull-up',

              category:
                'pull',

              difficulty:
                2,

              sets:
                3,

              reps:
                3,

              restSeconds:
                70,

              estimatedKcal:
                18,
            },

            {
              id:
                'l1-prep-hollow',

              name:
                'Hollow Hold',

              category:
                'core',

              difficulty:
                2,

              sets:
                3,

              durationSeconds:
                30,

              restSeconds:
                45,

              estimatedKcal:
                15,
            },
          ],

          profileVariants: {
            advanced: {
              description:
                'Du stehst kurz vor dem Meister. Jetzt musst du alle Grundlagen unter Kontrolle zeigen.',

              exercises: [
                {
                  id:
                    'l1-prep-advanced-pull',

                  name:
                    'Pull-up',

                  category:
                    'pull',

                  difficulty:
                    3,

                  sets:
                    5,

                  reps:
                    5,

                  restSeconds:
                    85,

                  estimatedKcal:
                    35,
                },

                {
                  id:
                    'l1-prep-advanced-diamond',

                  name:
                    'Diamond Push-up',

                  category:
                    'push',

                  difficulty:
                    3,

                  sets:
                    4,

                  reps:
                    10,

                  restSeconds:
                    70,

                  estimatedKcal:
                    30,
                },

                {
                  id:
                    'l1-prep-advanced-split',

                  name:
                    'Bulgarian Split Squat',

                  category:
                    'legs',

                  difficulty:
                    3,

                  sets:
                    4,

                  reps:
                    10,

                  restSeconds:
                    70,

                  estimatedKcal:
                    32,
                },

                {
                  id:
                    'l1-prep-advanced-knee',

                  name:
                    'Hanging Knee Raise',

                  category:
                    'core',

                  difficulty:
                    3,

                  sets:
                    4,

                  reps:
                    12,

                  restSeconds:
                    60,

                  estimatedKcal:
                    32,
                },
              ],
            },

            athlete: {
              exercises: [
                {
                  id:
                    'l1-prep-athlete-high',

                  name:
                    'High Pull-up',

                  category:
                    'pull',

                  difficulty:
                    6,

                  sets:
                    5,

                  reps:
                    5,

                  restSeconds:
                    100,

                  estimatedKcal:
                    40,
                },

                {
                  id:
                    'l1-prep-athlete-archer',

                  name:
                    'Archer Push-up',

                  category:
                    'push',

                  difficulty:
                    5,

                  sets:
                    5,

                  reps:
                    6,

                  restSeconds:
                    85,

                  estimatedKcal:
                    38,
                },

                {
                  id:
                    'l1-prep-athlete-pistol',

                  name:
                    'Pistol Squat',

                  category:
                    'legs',

                  difficulty:
                    6,

                  sets:
                    4,

                  reps:
                    6,

                  restSeconds:
                    85,

                  estimatedKcal:
                    34,
                },

                {
                  id:
                    'l1-prep-athlete-lsit',

                  name:
                    'L-Sit',

                  category:
                    'core',

                  difficulty:
                    6,

                  sets:
                    4,

                  durationSeconds:
                    20,

                  restSeconds:
                    65,

                  estimatedKcal:
                    28,
                },
              ],
            },
          },
        },
      ],

      boss: {
        /*
          Die ID bleibt vorerst bestehen,
          damit dein bestehender Boss-Code
          und bosses.ts weiterhin funktionieren.
        */

        id:
          'gatekeeper',

        name:
          'Die Aufnahmeprüfung',

        level:
          1,

        requiredXP:
          850,

        description:
          'Die letzte Prüfung des Meisters. Beweise Kontrolle, Kraft und Ausdauer.',

        rewardXP:
          150,
      },
    },

    // =======================================================
    // LEVEL 2
    // POWER BUILD
    // =======================================================

    {
      id: 2,

      title:
        'Power Build',

      subtitle:
        'Du bist nun Schüler. Jetzt beginnt das eigentliche Training.',

      workouts: [
        {
          id:
            'l2-awakening',

          title:
            'Das erste Training',

          description:
            'Der Meister beginnt nun mit deinem echten Kraftaufbau.',

          exercises: [
            {
              id:
                'l2-first-push',

              name:
                'Push-up',

              category:
                'push',

              difficulty:
                2,

              sets:
                4,

              reps:
                10,

              restSeconds:
                60,

              estimatedKcal:
                28,
            },

            {
              id:
                'l2-first-pull',

              name:
                'Negative Pull-up',

              category:
                'pull',

              difficulty:
                2,

              sets:
                4,

              reps:
                4,

              restSeconds:
                75,

              estimatedKcal:
                24,
            },

            {
              id:
                'l2-first-core',

              name:
                'Hollow Hold',

              category:
                'core',

              difficulty:
                2,

              sets:
                3,

              durationSeconds:
                30,

              restSeconds:
                45,

              estimatedKcal:
                15,
            },
          ],

          profileVariants: {
            advanced: {
              exercises: [
                {
                  id:
                    'l2-first-advanced-pull',

                  name:
                    'Pull-up',

                  category:
                    'pull',

                  difficulty:
                    4,

                  sets:
                    5,

                  reps:
                    6,

                  restSeconds:
                    90,

                  estimatedKcal:
                    40,
                },

                {
                  id:
                    'l2-first-advanced-dip',

                  name:
                    'Dip',

                  category:
                    'push',

                  difficulty:
                    4,

                  sets:
                    4,

                  reps:
                    8,

                  restSeconds:
                    80,

                  estimatedKcal:
                    32,
                },

                {
                  id:
                    'l2-first-advanced-leg',

                  name:
                    'Hanging Leg Raise',

                  category:
                    'core',

                  difficulty:
                    5,

                  sets:
                    4,

                  reps:
                    8,

                  restSeconds:
                    65,

                  estimatedKcal:
                    28,
                },
              ],
            },
          },
        },

        {
          id:
            'l2-push-1',

          title:
            'Stärkerer Druck',

          description:
            'Mehr Kraft, mehr Kontrolle.',

          exercises: [
            {
              id:
                'l2-push1',

              name:
                'Push-up',

              category:
                'push',

              difficulty:
                2,

              sets:
                4,

              reps:
                12,

              restSeconds:
                60,

              estimatedKcal:
                28,
            },
          ],

          profileVariants: {
            advanced: {
              exercises: [
                {
                  id:
                    'l2-push1-advanced-diamond',

                  name:
                    'Diamond Push-up',

                  category:
                    'push',

                  difficulty:
                    4,

                  sets:
                    5,

                  reps:
                    10,

                  restSeconds:
                    75,

                  estimatedKcal:
                    38,
                },

                {
                  id:
                    'l2-push1-advanced-pike',

                  name:
                    'Pike Push-up',

                  category:
                    'push',

                  difficulty:
                    4,

                  sets:
                    4,

                  reps:
                    10,

                  restSeconds:
                    80,

                  estimatedKcal:
                    32,
                },
              ],
            },
          },
        },

        {
          id:
            'l2-pull-1',

          title:
            'Zugkraft',

          description:
            'Der Meister beginnt deine echte Zugkraft aufzubauen.',

          exercises: [
            {
              id:
                'l2-pull1-negative',

              name:
                'Negative Pull-up',

              category:
                'pull',

              difficulty:
                3,

              sets:
                4,

              reps:
                5,

              restSeconds:
                80,

              estimatedKcal:
                28,
            },
          ],

          profileVariants: {
            advanced: {
              exercises: [
                {
                  id:
                    'l2-pull1-advanced',

                  name:
                    'Pull-up',

                  category:
                    'pull',

                  difficulty:
                    4,

                  sets:
                    5,

                  reps:
                    6,

                  restSeconds:
                    90,

                  estimatedKcal:
                    40,
                },

                {
                  id:
                    'l2-pull1-advanced-chest',

                  name:
                    'Chest-to-Bar Pull-up',

                  category:
                    'pull',

                  difficulty:
                    5,

                  sets:
                    3,

                  reps:
                    4,

                  restSeconds:
                    100,

                  estimatedKcal:
                    27,
                },
              ],
            },
          },
        },

        {
          id:
            'l2-dip-1',

          title:
            'Stützkraft',

          description:
            'Kontrolle über Schultergürtel und Trizeps.',

          exercises: [
            {
              id:
                'l2-dip1-support',

              name:
                'Support Hold',

              category:
                'skill',

              difficulty:
                2,

              sets:
                4,

              durationSeconds:
                20,

              restSeconds:
                60,

              estimatedKcal:
                20,
            },
          ],

          profileVariants: {
            advanced: {
              exercises: [
                {
                  id:
                    'l2-dip1-advanced-dip',

                  name:
                    'Dip',

                  category:
                    'push',

                  difficulty:
                    4,

                  sets:
                    5,

                  reps:
                    8,

                  restSeconds:
                    90,

                  estimatedKcal:
                    40,
                },

                {
                  id:
                    'l2-dip1-advanced-support',

                  name:
                    'Support Hold',

                  category:
                    'skill',

                  difficulty:
                    3,

                  sets:
                    3,

                  durationSeconds:
                    30,

                  restSeconds:
                    60,

                  estimatedKcal:
                    18,
                },
              ],
            },
          },
        },

        {
          id:
            'l2-core-1',

          title:
            'Core Strength',

          description:
            'Eine stärkere Mitte für schwierigere Skills.',

          exercises: [
            {
              id:
                'l2-core1-knee',

              name:
                'Hanging Knee Raise',

              category:
                'core',

              difficulty:
                3,

              sets:
                4,

              reps:
                10,

              restSeconds:
                60,

              estimatedKcal:
                28,
            },
          ],

          profileVariants: {
            advanced: {
              exercises: [
                {
                  id:
                    'l2-core1-advanced-leg',

                  name:
                    'Hanging Leg Raise',

                  category:
                    'core',

                  difficulty:
                    5,

                  sets:
                    4,

                  reps:
                    10,

                  restSeconds:
                    70,

                  estimatedKcal:
                    32,
                },

                {
                  id:
                    'l2-core1-advanced-lsit',

                  name:
                    'Tuck L-Sit',

                  category:
                    'core',

                  difficulty:
                    4,

                  sets:
                    4,

                  durationSeconds:
                    20,

                  restSeconds:
                    65,

                  estimatedKcal:
                    24,
                },
              ],
            },
          },
        },

        {
          id:
            'l2-legs',

          title:
            'Einbeinige Kraft',

          description:
            'Stabilität und Kraft auf einem Bein.',

          exercises: [
            {
              id:
                'l2-legs-split',

              name:
                'Split Squat',

              category:
                'legs',

              difficulty:
                3,

              sets:
                4,

              reps:
                10,

              restSeconds:
                65,

              estimatedKcal:
                32,
            },
          ],

          profileVariants: {
            advanced: {
              exercises: [
                {
                  id:
                    'l2-legs-advanced-pistolprep',

                  name:
                    'Pistol Squat Preparation',

                  category:
                    'legs',

                  difficulty:
                    4,

                  sets:
                    5,

                  reps:
                    6,

                  restSeconds:
                    80,

                  estimatedKcal:
                    35,
                },

                {
                  id:
                    'l2-legs-advanced-bulgarian',

                  name:
                    'Bulgarian Split Squat',

                  category:
                    'legs',

                  difficulty:
                    4,

                  sets:
                    4,

                  reps:
                    12,

                  restSeconds:
                    75,

                  estimatedKcal:
                    36,
                },
              ],
            },
          },
        },

        {
          id:
            'l2-push-2',

          title:
            'Schulterkraft',

          description:
            'Der Weg führt in Richtung vertikaler Druckkraft.',

          exercises: [
            {
              id:
                'l2-push2-pike',

              name:
                'Pike Push-up',

              category:
                'push',

              difficulty:
                4,

              sets:
                4,

              reps:
                8,

              restSeconds:
                75,

              estimatedKcal:
                28,
            },
          ],

          profileVariants: {
            advanced: {
              exercises: [
                {
                  id:
                    'l2-push2-advanced-pike',

                  name:
                    'Elevated Pike Push-up',

                  category:
                    'push',

                  difficulty:
                    5,

                  sets:
                    5,

                  reps:
                    8,

                  restSeconds:
                    90,

                  estimatedKcal:
                    40,
                },

                {
                  id:
                    'l2-push2-advanced-wall',

                  name:
                    'Wall Handstand Hold',

                  category:
                    'skill',

                  difficulty:
                    4,

                  sets:
                    4,

                  durationSeconds:
                    30,

                  restSeconds:
                    70,

                  estimatedKcal:
                    24,
                },
              ],
            },
          },
        },

        {
          id:
            'l2-pull-2',

          title:
            'Explosiver Zug',

          description:
            'Mehr Höhe und Geschwindigkeit.',

          exercises: [
            {
              id:
                'l2-pull2-pull',

              name:
                'Pull-up',

              category:
                'pull',

              difficulty:
                4,

              sets:
                5,

              reps:
                5,

              restSeconds:
                90,

              estimatedKcal:
                35,
            },
          ],

          profileVariants: {
            advanced: {
              exercises: [
                {
                  id:
                    'l2-pull2-advanced-chest',

                  name:
                    'Chest-to-Bar Pull-up',

                  category:
                    'pull',

                  difficulty:
                    5,

                  sets:
                    5,

                  reps:
                    5,

                  restSeconds:
                    100,

                  estimatedKcal:
                    40,
                },

                {
                  id:
                    'l2-pull2-advanced-high',

                  name:
                    'High Pull-up',

                  category:
                    'pull',

                  difficulty:
                    6,

                  sets:
                    3,

                  reps:
                    4,

                  restSeconds:
                    105,

                  estimatedKcal:
                    27,
                },
              ],
            },
          },
        },

        {
          id:
            'l2-dip-2',

          title:
            'Starke Stütze',

          description:
            'Der Meister erhöht das Volumen bei Dips.',

          exercises: [
            {
              id:
                'l2-dip2-dip',

              name:
                'Dip',

              category:
                'push',

              difficulty:
                4,

              sets:
                4,

              reps:
                6,

              restSeconds:
                90,

              estimatedKcal:
                32,
            },
          ],
        },

        {
          id:
            'l2-core-2',

          title:
            'L-Sit Weg',

          description:
            'Deine Mitte wird zur Basis für echte Skills.',

          exercises: [
            {
              id:
                'l2-core2-tuck',

              name:
                'Tuck L-Sit',

              category:
                'core',

              difficulty:
                4,

              sets:
                4,

              durationSeconds:
                15,

              restSeconds:
                65,

              estimatedKcal:
                24,
            },
          ],
        },

        {
          id:
            'l2-skill-control',

          title:
            'Körperkontrolle',

          description:
            'Der Meister beginnt mit deinem ersten echten Balance-Skill.',

          exercises: [
            {
              id:
                'l2-skill-wallhandstand',

              name:
                'Wall Handstand',

              category:
                'skill',

              difficulty:
                4,

              sets:
                4,

              durationSeconds:
                25,

              restSeconds:
                75,

              estimatedKcal:
                24,
            },
          ],
        },

        {
          id:
            'l2-power-circuit',

          title:
            'Power Circuit',

          description:
            'Zug, Druck, Beine und Core in einer Einheit.',

          exercises: [
            {
              id:
                'l2-power-pull',

              name:
                'Pull-up',

              category:
                'pull',

              difficulty:
                4,

              sets:
                4,

              reps:
                5,

              restSeconds:
                60,

              estimatedKcal:
                28,
            },

            {
              id:
                'l2-power-push',

              name:
                'Push-up',

              category:
                'push',

              difficulty:
                3,

              sets:
                4,

              reps:
                15,

              restSeconds:
                50,

              estimatedKcal:
                32,
            },

            {
              id:
                'l2-power-leg',

              name:
                'Bulgarian Split Squat',

              category:
                'legs',

              difficulty:
                4,

              sets:
                4,

              reps:
                10,

              restSeconds:
                55,

              estimatedKcal:
                32,
            },
          ],
        },

        {
          id:
            'l2-endurance',

          title:
            'Kraftausdauer',

          description:
            'Halte deine Qualität auch bei wachsender Ermüdung.',

          exercises: [
            {
              id:
                'l2-endurance-pull',

              name:
                'Pull-up',

              category:
                'pull',

              difficulty:
                4,

              sets:
                5,

              reps:
                5,

              restSeconds:
                65,

              estimatedKcal:
                35,
            },

            {
              id:
                'l2-endurance-push',

              name:
                'Push-up',

              category:
                'push',

              difficulty:
                3,

              sets:
                5,

              reps:
                15,

              restSeconds:
                50,

              estimatedKcal:
                40,
            },
          ],
        },

        {
          id:
            'l2-boss-prep',

          title:
            'Die zweite Prüfung',

          description:
            'Zeige dem Meister, wie weit du dich entwickelt hast.',

          exercises: [
            {
              id:
                'l2-prep-pull',

              name:
                'Pull-up',

              category:
                'pull',

              difficulty:
                4,

              sets:
                5,

              reps:
                6,

              restSeconds:
                85,

              estimatedKcal:
                40,
            },

            {
              id:
                'l2-prep-dip',

              name:
                'Dip',

              category:
                'push',

              difficulty:
                4,

              sets:
                5,

              reps:
                8,

              restSeconds:
                85,

              estimatedKcal:
                40,
            },

            {
              id:
                'l2-prep-core',

              name:
                'Hanging Knee Raise',

              category:
                'core',

              difficulty:
                4,

              sets:
                4,

              reps:
                12,

              restSeconds:
                65,

              estimatedKcal:
                32,
            },
          ],
        },
      ],

      boss: {
        id:
          'breaker',

        name:
          'Der Brecher',

        level:
          2,

        requiredXP:
          1900,

        description:
          'Die erste große Kraftprüfung deiner Ausbildung.',

        rewardXP:
          250,
      },
    },
  ];