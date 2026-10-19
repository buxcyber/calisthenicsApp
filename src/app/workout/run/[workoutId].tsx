import Ionicons from '@expo/vector-icons/Ionicons';

import * as Haptics from 'expo-haptics';

import {
  router,
  useLocalSearchParams,
} from 'expo-router';

import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import type {
  PlayerProgress,
} from '../../../storage/progress';

import {
  DEFAULT_PROGRESS,
  addSetReward,
  completeExercise,
  completeWorkout,
  loadProgress,
} from '../../../storage/progress';

import {
  getProgramIdFromWorkoutId,
  loadProgramsState,
  recordProgramWorkout,
} from '../../../storage/programProgress';

import {
  programCatalog,
} from '../../../data/programCatalog';

import {
  gluteLevels,
} from '../../../data/gluteLevels';

import type {
  ProgramId,
} from '../../../types/program';

import {
  findResolvedWorkoutById,
} from '../../../utils/gameUtils';

import {
  getExerciseImage,
  getLevelBackground,
} from '../../../data/gameAssets';

type Phase =
  | 'ready'
  | 'countdown'
  | 'timed'
  | 'rest'
  | 'processing'
  | 'finished';

type NextAction =
  | 'next-set'
  | 'next-exercise'
  | null;

export default function WorkoutRunScreen() {
  const {
    workoutId,
  } =
    useLocalSearchParams<{
      workoutId: string;
    }>();

  const [
    progress,
    setProgress,
  ] =
    useState<PlayerProgress>({
      ...DEFAULT_PROGRESS,
    });

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  const [
    exerciseIndex,
    setExerciseIndex,
  ] =
    useState(0);

  const [
    currentSet,
    setCurrentSet,
  ] =
    useState(1);

  const [
    phase,
    setPhase,
  ] =
    useState<Phase>(
      'ready'
    );

  const [
    countdown,
    setCountdown,
  ] =
    useState(3);

  const [
    secondsLeft,
    setSecondsLeft,
  ] =
    useState(0);

  const [
    nextAction,
    setNextAction,
  ] =
    useState<NextAction>(
      null
    );

  const [
    sessionXP,
    setSessionXP,
  ] =
    useState(0);

  const [
    sessionKcal,
    setSessionKcal,
  ] =
    useState(0);

  const [
    sessionSets,
    setSessionSets,
  ] =
    useState(0);

  const [
    elapsedSeconds,
    setElapsedSeconds,
  ] =
    useState(0);

  const [
    started,
    setStarted,
  ] =
    useState(false);

  const [
    finishedProgramId,
    setFinishedProgramId,
  ] =
    useState<ProgramId>(
      'calisthenics'
    );

  const [
    finishedProgramStreak,
    setFinishedProgramStreak,
  ] =
    useState(0);

  const processingRef =
    useRef(false);

  // ============================================================
  // LOAD
  // ============================================================

  useEffect(() => {
    let active =
      true;

    async function load() {
      /*
       * Ganz wichtig:
       *
       * Der neue Programmspeicher wird VOR dem ersten
       * absolvierten Satz initialisiert.
       *
       * Dadurch wird dein bestehender Calisthenics-
       * Fortschritt sauber migriert, bevor neue XP
       * hinzukommen.
       */
      await loadProgramsState();

      const saved =
        await loadProgress();

      if (!active) {
        return;
      }

      setProgress(saved);

      setLoading(false);
    }

    void load();

    return () => {
      active =
        false;
    };
  }, []);

  // ============================================================
  // WORKOUT FINDEN
  // ============================================================

  const result =
    useMemo(
      () => {
        /*
         * Zuerst bestehende Calisthenics-Logik verwenden.
         */

        const resolved =
          findResolvedWorkoutById(
            workoutId,
            progress
          );

        if (resolved) {
          return resolved;
        }

        /*
         * Zusatzpfad:
         * Glute Workouts separat finden.
         */

        for (
          const candidateLevel
          of gluteLevels
        ) {
          const candidateWorkout =
            candidateLevel
              .workouts
              .find(
                (item) =>
                  item.id ===
                  workoutId
              );

          if (
            candidateWorkout
          ) {
            return {
              workout:
                candidateWorkout,

              level:
                candidateLevel,
            };
          }
        }

        return undefined;
      },
      [
        workoutId,
        progress,
      ]
    );

  const workout =
    result?.workout;

  const level =
    result?.level;

  const exercise =
    workout?.exercises[
      exerciseIndex
    ];

  const exerciseImage =
    exercise
      ? getExerciseImage(
          exercise.name
        )
      : null;

  // ============================================================
  // TRAININGSZEIT
  // ============================================================

  useEffect(() => {
    if (
      !started ||
      phase ===
        'finished'
    ) {
      return;
    }

    const interval =
      setInterval(
        () => {
          setElapsedSeconds(
            (previous) =>
              previous + 1
          );
        },
        1000
      );

    return () =>
      clearInterval(
        interval
      );
  }, [
    started,
    phase,
  ]);

  // ============================================================
  // COUNTDOWN
  // ============================================================

  useEffect(() => {
    if (
      phase !==
      'countdown'
    ) {
      return;
    }

    if (
      countdown <= 0
    ) {
      if (
        exercise
          ?.durationSeconds
      ) {
        setSecondsLeft(
          exercise
            .durationSeconds
        );

        setPhase(
          'timed'
        );

        void Haptics
          .notificationAsync(
            Haptics
              .NotificationFeedbackType
              .Success
          );
      }

      return;
    }

    void Haptics
      .impactAsync(
        Haptics
          .ImpactFeedbackStyle
          .Light
      );

    const timer =
      setTimeout(
        () => {
          setCountdown(
            (previous) =>
              previous - 1
          );
        },
        1000
      );

    return () =>
      clearTimeout(
        timer
      );
  }, [
    phase,
    countdown,
    exercise,
  ]);

  // ============================================================
  // TIMED EXERCISE
  // ============================================================

  useEffect(() => {
    if (
      phase !==
      'timed'
    ) {
      return;
    }

    if (
      secondsLeft <= 0
    ) {
      void finishSet();

      return;
    }

    if (
      secondsLeft <= 3
    ) {
      void Haptics
        .impactAsync(
          Haptics
            .ImpactFeedbackStyle
            .Medium
        );
    }

    const timer =
      setTimeout(
        () => {
          setSecondsLeft(
            (previous) =>
              previous - 1
          );
        },
        1000
      );

    return () =>
      clearTimeout(
        timer
      );
  }, [
    phase,
    secondsLeft,
  ]);

  // ============================================================
  // REST
  // ============================================================

  useEffect(() => {
    if (
      phase !==
      'rest'
    ) {
      return;
    }

    if (
      secondsLeft <= 0
    ) {
      finishRest();

      return;
    }

    if (
      secondsLeft <= 3
    ) {
      void Haptics
        .impactAsync(
          Haptics
            .ImpactFeedbackStyle
            .Light
        );
    }

    const timer =
      setTimeout(
        () => {
          setSecondsLeft(
            (previous) =>
              previous - 1
          );
        },
        1000
      );

    return () =>
      clearTimeout(
        timer
      );
  }, [
    phase,
    secondsLeft,
  ]);

  // ============================================================
  // SATZ ABSCHLIESSEN
  // ============================================================

  async function finishSet() {
    if (
      !exercise ||
      !workout ||
      processingRef.current
    ) {
      return;
    }

    processingRef.current =
      true;

    setPhase(
      'processing'
    );

    const kcal =
      Math.max(
        1,

        Math.round(
          exercise.estimatedKcal /
            Math.max(
              1,
              exercise.sets
            )
        )
      );

    const xp =
      kcal;

    /*
     * Globaler Spielerfortschritt.
     */
    await addSetReward(
      xp,
      kcal
    );

    const newXP =
      sessionXP +
      xp;

    const newKcal =
      sessionKcal +
      kcal;

    const newSets =
      sessionSets +
      1;

    setSessionXP(
      newXP
    );

    setSessionKcal(
      newKcal
    );

    setSessionSets(
      newSets
    );

    void Haptics
      .impactAsync(
        Haptics
          .ImpactFeedbackStyle
          .Heavy
      );

    const lastSet =
      currentSet >=
      exercise.sets;

    const lastExercise =
      exerciseIndex >=
      workout
        .exercises
        .length -
        1;

    // ------------------------------------------------------------
    // NÄCHSTER SATZ
    // ------------------------------------------------------------

    if (
      !lastSet
    ) {
      startRest(
        'next-set'
      );

      processingRef.current =
        false;

      return;
    }

    // ------------------------------------------------------------
    // ÜBUNG ABGESCHLOSSEN
    // ------------------------------------------------------------

    await completeExercise(
      exercise.id
    );

    // ------------------------------------------------------------
    // NÄCHSTE ÜBUNG
    // ------------------------------------------------------------

    if (
      !lastExercise
    ) {
      startRest(
        'next-exercise'
      );

      processingRef.current =
        false;

      return;
    }

    // ============================================================
    // GESAMTES WORKOUT ABGESCHLOSSEN
    // ============================================================

    const trainingDuration =
      Math.max(
        1,
        elapsedSeconds
      );

    /*
     * Workout-ID entscheidet automatisch:
     *
     * l1-push-1
     * → calisthenics
     *
     * glute-l1-04
     * → glute-focus
     *
     * neck-l1-02
     * → neck-training
     */

    const programId =
      getProgramIdFromWorkoutId(
        workout.id
      );

    /*
     * EIGENER PROGRAMMFORTSCHRITT
     */

    const updatedPrograms =
      await recordProgramWorkout(
        programId,

        workout.id,

        {
          xp:
            newXP,

          trainingSeconds:
            trainingDuration,

          setsCompleted:
            newSets,
        }
      );

    setFinishedProgramId(
      programId
    );

    setFinishedProgramStreak(
      updatedPrograms
        .programs[
          programId
        ]
        .currentStreak
    );

    /*
     * Bestehender globaler Fortschritt bleibt bestehen.
     *
     * Dadurch funktionieren:
     * - Gesamt-XP
     * - Achievements
     * - Gesamttrainingszeit
     * - Skills
     * - Daily Stats
     * weiterhin wie bisher.
     */

    await completeWorkout(
      workout.id,
      trainingDuration
    );

    void Haptics
      .notificationAsync(
        Haptics
          .NotificationFeedbackType
          .Success
      );

    setPhase(
      'finished'
    );

    processingRef.current =
      false;
  }

  // ============================================================
  // PAUSE STARTEN
  // ============================================================

  function startRest(
    action: NextAction
  ) {
    if (!exercise) {
      return;
    }

    setNextAction(
      action
    );

    if (
      exercise.restSeconds <=
      0
    ) {
      performNextAction(
        action
      );

      return;
    }

    setSecondsLeft(
      exercise.restSeconds
    );

    setPhase(
      'rest'
    );
  }

  // ============================================================
  // PAUSE BEENDEN
  // ============================================================

  function finishRest() {
    const action =
      nextAction;

    setNextAction(
      null
    );

    performNextAction(
      action
    );
  }

  // ============================================================
  // NÄCHSTE AKTION
  // ============================================================

  function performNextAction(
    action: NextAction
  ) {
    if (
      action ===
      'next-set'
    ) {
      setCurrentSet(
        (previous) =>
          previous + 1
      );
    }

    if (
      action ===
      'next-exercise'
    ) {
      setExerciseIndex(
        (previous) =>
          previous + 1
      );

      setCurrentSet(
        1
      );
    }

    setCountdown(
      3
    );

    setPhase(
      'ready'
    );

    processingRef.current =
      false;
  }

  // ============================================================
  // HAUPTBUTTON
  // ============================================================

  function pressMainButton() {
    if (!exercise) {
      return;
    }

    setStarted(
      true
    );

    if (
      exercise.durationSeconds
    ) {
      setCountdown(
        3
      );

      setPhase(
        'countdown'
      );

      return;
    }

    void finishSet();
  }

  // ============================================================
  // WORKOUT VERLASSEN
  // ============================================================

  function exitWorkout() {
    Alert.alert(
      'Training verlassen?',

      'Bereits abgeschlossene Sätze behalten ihre XP.',

      [
        {
          text:
            'Weitertrainieren',

          style:
            'cancel',
        },

        {
          text:
            'Verlassen',

          style:
            'destructive',

          onPress:
            () =>
              router.back(),
        },
      ]
    );
  }

  // ============================================================
  // LOADING
  // ============================================================

  if (
    loading
  ) {
    return (
      <SafeAreaView
        style={
          styles.container
        }
      >
        <View
          style={
            styles.center
          }
        >
          <Text
            style={
              styles.loading
            }
          >
            Training wird geladen...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (
    !workout ||
    !level ||
    !exercise
  ) {
    return (
      <SafeAreaView
        style={
          styles.container
        }
      >
        <View
          style={
            styles.center
          }
        >
          <Text
            style={
              styles.error
            }
          >
            Training konnte nicht geladen werden.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // ============================================================
  // FINISHED
  // ============================================================

  if (
    phase ===
    'finished'
  ) {
    return (
      <SafeAreaView
        style={
          styles.container
        }
      >
        <ImageBackground
          source={
            getLevelBackground(
              level.id
            )
          }
          resizeMode="cover"
          style={
            styles.fullScreen
          }
        >
          <View
            style={
              styles.darkOverlay
            }
          />

          <View
            style={
              styles.finishContent
            }
          >
            <View
              style={
                styles.finishCircle
              }
            >
              <Ionicons
                name="checkmark"
                size={53}
                color="#FFFFFF"
              />
            </View>

            <Text
              style={
                styles.finishEyebrow
              }
            >
              PRÜFUNG BESTANDEN
            </Text>

            <Text
              style={
                styles.finishTitle
              }
            >
              {
                workout.title
              }
            </Text>

            <Text
              style={
                styles.finishSub
              }
            >
              Dein Weg geht weiter.
            </Text>

            {/* PROGRAMM-AURA */}

            <View
              style={
                styles.programAuraBadge
              }
            >
              <Ionicons
                name="flame"
                size={18}
                color="#62C8F3"
              />

              <View>
                <Text
                  style={
                    styles.programAuraLabel
                  }
                >
                  {
                    programCatalog[
                      finishedProgramId
                    ].streakLabel
                  }
                </Text>

                <Text
                  style={
                    styles.programAuraValue
                  }
                >
                  {
                    finishedProgramStreak
                  }{' '}

                  {finishedProgramId ===
                  'neck-training'
                    ? 'Einheiten'
                    : 'Tage'}
                </Text>
              </View>
            </View>

            {/* REWARDS */}

            <View
              style={
                styles.rewards
              }
            >
              <Reward
                icon="flash"
                value={`+${sessionXP}`}
                label="XP"
              />

              <Reward
                icon="flame"
                value={
                  String(
                    sessionKcal
                  )
                }
                label="kcal"
              />

              <Reward
                icon="layers"
                value={
                  String(
                    sessionSets
                  )
                }
                label="Sätze"
              />
            </View>

            <Pressable
              style={
                styles.continueButton
              }
              onPress={() =>
                router.replace(
                  '/rewards'
                )
              }
            >
              <Text
                style={
                  styles.continueText
                }
              >
                WEITER
              </Text>

              <Ionicons
                name="arrow-forward"
                size={20}
                color="#FFFFFF"
              />
            </Pressable>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  // ============================================================
  // COUNTDOWN
  // ============================================================

  if (
    phase ===
    'countdown'
  ) {
    return (
      <SafeAreaView
        style={
          styles.container
        }
      >
        <ImageBackground
          source={
            exerciseImage ??
            getLevelBackground(
              level.id
            )
          }
          resizeMode="cover"
          style={
            styles.fullScreen
          }
        >
          <View
            style={
              styles.heavyOverlay
            }
          />

          <View
            style={
              styles.center
            }
          >
            <Text
              style={
                styles.countdownSmall
              }
            >
              BEREIT?
            </Text>

            <Text
              style={
                styles.countdown
              }
            >
              {countdown}
            </Text>

            <Text
              style={
                styles.countdownExercise
              }
            >
              {
                exercise.name
              }
            </Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  // ============================================================
  // REST
  // ============================================================

  if (
    phase ===
    'rest'
  ) {
    const nextExercise =
      nextAction ===
      'next-exercise'
        ? workout
            .exercises[
              exerciseIndex +
                1
            ]
        : exercise;

    const nextImage =
      nextExercise
        ? getExerciseImage(
            nextExercise.name
          )
        : null;

    return (
      <SafeAreaView
        style={
          styles.container
        }
      >
        <ImageBackground
          source={
            nextImage ??
            getLevelBackground(
              level.id
            )
          }
          resizeMode="cover"
          style={
            styles.fullScreen
          }
        >
          <View
            style={
              styles.heavyOverlay
            }
          />

          <View
            style={
              styles.restContent
            }
          >
            <Text
              style={
                styles.restSmall
              }
            >
              PAUSE
            </Text>

            <Text
              style={
                styles.restTitle
              }
            >
              Sammle dich.
            </Text>

            <View
              style={
                styles.timerCircle
              }
            >
              <Text
                style={
                  styles.timerValue
                }
              >
                {secondsLeft}
              </Text>

              <Text
                style={
                  styles.timerUnit
                }
              >
                SEKUNDEN
              </Text>
            </View>

            <Text
              style={
                styles.nextSmall
              }
            >
              ALS NÄCHSTES
            </Text>

            <Text
              style={
                styles.nextTitle
              }
            >
              {
                nextExercise?.name ??
                'Nächste Übung'
              }
            </Text>

            <Pressable
              style={
                styles.skipButton
              }
              onPress={
                finishRest
              }
            >
              <Text
                style={
                  styles.skipText
                }
              >
                PAUSE ÜBERSPRINGEN
              </Text>
            </Pressable>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  // ============================================================
  // TIMED
  // ============================================================

  if (
    phase ===
    'timed'
  ) {
    return (
      <SafeAreaView
        style={
          styles.container
        }
      >
        <ImageBackground
          source={
            exerciseImage ??
            getLevelBackground(
              level.id
            )
          }
          resizeMode="cover"
          style={
            styles.fullScreen
          }
        >
          <View
            style={
              styles.heavyOverlay
            }
          />

          <View
            style={
              styles.timedContent
            }
          >
            <Text
              style={
                styles.timedLabel
              }
            >
              HALTE DIE POSITION
            </Text>

            <Text
              style={
                styles.timedExercise
              }
            >
              {
                exercise.name
              }
            </Text>

            <View
              style={
                styles.timerCircle
              }
            >
              <Text
                style={
                  styles.timerValue
                }
              >
                {secondsLeft}
              </Text>

              <Text
                style={
                  styles.timerUnit
                }
              >
                SEKUNDEN
              </Text>
            </View>

            <Text
              style={
                styles.timedSet
              }
            >
              Satz{' '}
              {currentSet}{' '}
              von{' '}
              {exercise.sets}
            </Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  // ============================================================
  // MAIN
  // ============================================================

  const totalSets =
    workout.exercises
      .reduce(
        (
          total,
          item
        ) =>
          total +
          item.sets,
        0
      );

  const overallProgress =
    Math.min(
      100,

      (
        (
          exerciseIndex +
          currentSet /
            exercise.sets
        ) /
        workout
          .exercises
          .length
      ) *
        100
    );

  return (
    <SafeAreaView
      style={
        styles.container
      }
      edges={[
        'top',
      ]}
    >
      <View
        style={
          styles.mainScreen
        }
      >
        {/* HEADER */}

        <View
          style={
            styles.header
          }
        >
          <Pressable
            style={
              styles.closeButton
            }
            onPress={
              exitWorkout
            }
          >
            <Ionicons
              name="close"
              size={23}
              color="#FFFFFF"
            />
          </Pressable>

          <View
            style={
              styles.headerText
            }
          >
            <Text
              style={
                styles.headerSmall
              }
            >
              ÜBUNG{' '}
              {exerciseIndex +
                1}{' '}
              /{' '}
              {
                workout
                  .exercises
                  .length
              }
            </Text>

            <Text
              style={
                styles.headerTitle
              }
            >
              {
                workout.title
              }
            </Text>
          </View>

          <View
            style={
              styles.xpBadge
            }
          >
            <Ionicons
              name="flash"
              size={14}
              color="#62C8F3"
            />

            <Text
              style={
                styles.xpBadgeText
              }
            >
              {sessionXP}
            </Text>
          </View>
        </View>

        {/* PROGRESS */}

        <View
          style={
            styles.progressTrack
          }
        >
          <View
            style={[
              styles.progressFill,

              {
                width:
                  `${overallProgress}%`,
              },
            ]}
          />
        </View>

        {/* IMAGE */}

        <View
          style={
            styles.imageCard
          }
        >
          {exerciseImage ? (
            <Image
              source={
                exerciseImage
              }
              resizeMode="cover"
              style={
                styles.exerciseImage
              }
            />
          ) : (
            <ImageBackground
              source={
                getLevelBackground(
                  level.id
                )
              }
              resizeMode="cover"
              style={
                styles.exerciseImage
              }
            >
              <View
                style={
                  styles.placeholderCenter
                }
              >
                <Ionicons
                  name="body-outline"
                  size={75}
                  color="#FFFFFF"
                />
              </View>
            </ImageBackground>
          )}

          <View
            style={
              styles.imageShade
            }
          />

          <View
            style={
              styles.imageTop
            }
          >
            <View
              style={
                styles.categoryBadge
              }
            >
              <Text
                style={
                  styles.categoryText
                }
              >
                {
                  exercise.category
                    .toUpperCase()
                }
              </Text>
            </View>

            <View
              style={
                styles.setBadge
              }
            >
              <Text
                style={
                  styles.setBadgeText
                }
              >
                SATZ{' '}
                {currentSet}/
                {exercise.sets}
              </Text>
            </View>
          </View>

          <View
            style={
              styles.imageBottom
            }
          >
            <Text
              style={
                styles.exerciseName
              }
            >
              {
                exercise.name
              }
            </Text>

            <Text
              style={
                styles.exerciseGoal
              }
            >
              {exercise.reps
                ? `${exercise.reps} Wiederholungen`
                : `${exercise.durationSeconds} Sekunden`}
            </Text>
          </View>
        </View>

        {/* LIVE STATS */}

        <View
          style={
            styles.liveStats
          }
        >
          <LiveStat
            value={
              String(
                sessionSets
              )
            }
            label={`von ${totalSets} Sätzen`}
          />

          <View
            style={
              styles.liveDivider
            }
          />

          <LiveStat
            value={
              String(
                sessionKcal
              )
            }
            label="kcal"
          />

          <View
            style={
              styles.liveDivider
            }
          />

          <LiveStat
            value={
              `${Math.floor(
                elapsedSeconds /
                  60
              )}:${String(
                elapsedSeconds %
                  60
              ).padStart(
                2,
                '0'
              )}`
            }
            label="Zeit"
          />
        </View>

        {/* REST INFO */}

        <View
          style={
            styles.restInfo
          }
        >
          <Ionicons
            name="time-outline"
            size={15}
            color="#8C9EA5"
          />

          <Text
            style={
              styles.restInfoText
            }
          >
            Nach dem Satz:{' '}
            {
              exercise.restSeconds
            }{' '}
            Sek. Pause
          </Text>
        </View>

        {/* MAIN BUTTON */}

        <Pressable
          disabled={
            phase ===
            'processing'
          }
          style={[
            styles.mainButton,

            phase ===
              'processing' &&
              styles.disabledButton,
          ]}
          onPress={
            pressMainButton
          }
        >
          <Ionicons
            name={
              exercise.durationSeconds
                ? 'timer-outline'
                : 'checkmark-circle'
            }
            size={22}
            color="#FFFFFF"
          />

          <Text
            style={
              styles.mainButtonText
            }
          >
            {phase ===
            'processing'
              ? 'WIRD GESPEICHERT...'
              : exercise.durationSeconds
                ? 'TIMER STARTEN'
                : 'SATZ ABSCHLIESSEN'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// ============================================================
// LIVE STAT
// ============================================================

function LiveStat({
  value,
  label,
}: {
  value: string;

  label: string;
}) {
  return (
    <View
      style={
        styles.liveStat
      }
    >
      <Text
        style={
          styles.liveValue
        }
      >
        {value}
      </Text>

      <Text
        style={
          styles.liveLabel
        }
      >
        {label}
      </Text>
    </View>
  );
}

// ============================================================
// REWARD
// ============================================================

function Reward({
  icon,
  value,
  label,
}: {
  icon:
    | 'flash'
    | 'flame'
    | 'layers';

  value: string;

  label: string;
}) {
  return (
    <View
      style={
        styles.reward
      }
    >
      <Ionicons
        name={icon}
        size={21}
        color="#5DC6F2"
      />

      <Text
        style={
          styles.rewardValue
        }
      >
        {value}
      </Text>

      <Text
        style={
          styles.rewardLabel
        }
      >
        {label}
      </Text>
    </View>
  );
}

// ============================================================
// STYLES
// ============================================================

const styles =
  StyleSheet.create({
    container: {
      flex: 1,

      backgroundColor:
        '#071015',
    },

    mainScreen: {
      flex: 1,

      padding: 15,
    },

    center: {
      flex: 1,

      alignItems:
        'center',

      justifyContent:
        'center',

      padding: 24,
    },

    loading: {
      color:
        '#A6BAC3',
    },

    error: {
      color:
        '#FFFFFF',

      fontWeight:
        '900',
    },

    // HEADER

    header: {
      height: 57,

      flexDirection:
        'row',

      alignItems:
        'center',
    },

    closeButton: {
      width: 41,

      height: 41,

      borderRadius: 13,

      backgroundColor:
        '#122028',

      alignItems:
        'center',

      justifyContent:
        'center',
    },

    headerText: {
      flex: 1,

      alignItems:
        'center',

      paddingHorizontal: 5,
    },

    headerSmall: {
      color:
        '#5ABDE7',

      fontSize: 6,

      fontWeight:
        '900',

      letterSpacing:
        1.3,
    },

    headerTitle: {
      color:
        '#FFFFFF',

      fontSize: 13,

      fontWeight:
        '900',

      marginTop: 2,
    },

    xpBadge: {
      minWidth: 42,

      height: 41,

      paddingHorizontal:
        6,

      borderRadius: 13,

      backgroundColor:
        '#12232C',

      flexDirection:
        'row',

      gap: 3,

      alignItems:
        'center',

      justifyContent:
        'center',
    },

    xpBadgeText: {
      color:
        '#FFFFFF',

      fontSize: 10,

      fontWeight:
        '900',
    },

    // PROGRESS

    progressTrack: {
      height: 6,

      borderRadius: 6,

      backgroundColor:
        '#18272E',

      overflow:
        'hidden',

      marginTop: 3,
    },

    progressFill: {
      height: '100%',

      backgroundColor:
        '#24ADEC',
    },

    // IMAGE

    imageCard: {
      flex: 1,

      borderRadius: 24,

      overflow:
        'hidden',

      marginTop: 12,

      position:
        'relative',

      borderWidth: 1,

      borderColor:
        '#293E47',
    },

    exerciseImage: {
      width: '100%',

      height: '100%',
    },

    placeholderCenter: {
      flex: 1,

      alignItems:
        'center',

      justifyContent:
        'center',
    },

imageShade: {
  position: 'absolute',

  top: 0,
  right: 0,
  bottom: 0,
  left: 0,

  backgroundColor:
    'rgba(0,0,0,0.13)',
},
    imageTop: {
      position:
        'absolute',

      left: 12,

      right: 12,

      top: 12,

      flexDirection:
        'row',

      justifyContent:
        'space-between',
    },

    categoryBadge: {
      backgroundColor:
        'rgba(3,22,30,0.84)',

      borderRadius: 8,

      paddingHorizontal:
        8,

      paddingVertical:
        5,
    },

    categoryText: {
      color:
        '#8DDEFF',

      fontSize: 7,

      fontWeight:
        '900',

      letterSpacing:
        1.2,
    },

    setBadge: {
      backgroundColor:
        'rgba(3,22,30,0.84)',

      borderRadius: 8,

      paddingHorizontal:
        8,

      paddingVertical:
        5,
    },

    setBadgeText: {
      color:
        '#FFFFFF',

      fontSize: 7,

      fontWeight:
        '900',
    },

    imageBottom: {
      position:
        'absolute',

      left: 14,

      right: 14,

      bottom: 15,
    },

    exerciseName: {
      color:
        '#FFFFFF',

      fontSize: 29,

      fontWeight:
        '900',

      textShadowColor:
        'rgba(0,0,0,0.75)',

      textShadowRadius:
        7,
    },

    exerciseGoal: {
      color:
        '#BFEAFF',

      fontSize: 15,

      fontWeight:
        '900',

      marginTop: 3,

      textShadowColor:
        '#000000',

      textShadowRadius:
        5,
    },

    // LIVE STATS

    liveStats: {
      minHeight: 68,

      borderRadius: 18,

      borderWidth: 1,

      borderColor:
        '#263940',

      backgroundColor:
        '#101A20',

      flexDirection:
        'row',

      alignItems:
        'center',

      marginTop: 10,
    },

    liveStat: {
      flex: 1,

      alignItems:
        'center',
    },

    liveValue: {
      color:
        '#FFFFFF',

      fontSize: 15,

      fontWeight:
        '900',
    },

    liveLabel: {
      color:
        '#7F9299',

      fontSize: 7,

      marginTop: 2,
    },

    liveDivider: {
      width: 1,

      height: 30,

      backgroundColor:
        '#293A41',
    },

    // REST INFO

    restInfo: {
      flexDirection:
        'row',

      justifyContent:
        'center',

      alignItems:
        'center',

      gap: 5,

      marginTop: 10,
    },

    restInfoText: {
      color:
        '#83979F',

      fontSize: 8,
    },

    // BUTTON

    mainButton: {
      minHeight: 62,

      borderRadius: 18,

      backgroundColor:
        '#1685B6',

      flexDirection:
        'row',

      alignItems:
        'center',

      justifyContent:
        'center',

      gap: 8,

      marginTop: 10,
    },

    disabledButton: {
      opacity: 0.5,
    },

    mainButtonText: {
      color:
        '#FFFFFF',

      fontSize: 13,

      fontWeight:
        '900',
    },

    // FULLSCREEN

    fullScreen: {
      flex: 1,
    },

darkOverlay: {
  position: 'absolute',

  top: 0,
  right: 0,
  bottom: 0,
  left: 0,

  backgroundColor:
    'rgba(1,12,18,0.55)',
},
heavyOverlay: {
  position: 'absolute',

  top: 0,
  right: 0,
  bottom: 0,
  left: 0,

  backgroundColor:
    'rgba(1,9,14,0.68)',
},
    // FINISH

    finishContent: {
      flex: 1,

      alignItems:
        'center',

      justifyContent:
        'center',

      padding: 24,
    },

    finishCircle: {
      width: 108,

      height: 108,

      borderRadius: 54,

      backgroundColor:
        '#1684B5',

      alignItems:
        'center',

      justifyContent:
        'center',

      borderWidth: 4,

      borderColor:
        '#87DFFF',
    },

    finishEyebrow: {
      color:
        '#7BD6FA',

      fontSize: 8,

      fontWeight:
        '900',

      letterSpacing: 2,

      marginTop: 19,
    },

    finishTitle: {
      color:
        '#FFFFFF',

      fontSize: 31,

      fontWeight:
        '900',

      textAlign:
        'center',

      marginTop: 4,
    },

    finishSub: {
      color:
        '#C6D7DD',

      fontSize: 10,

      marginTop: 5,
    },

    // PROGRAM AURA

    programAuraBadge: {
      marginTop: 16,

      paddingHorizontal:
        14,

      paddingVertical:
        10,

      borderRadius:
        14,

      borderWidth:
        1,

      borderColor:
        'rgba(98,200,243,0.28)',

      backgroundColor:
        'rgba(6,25,33,0.82)',

      flexDirection:
        'row',

      alignItems:
        'center',

      gap: 9,
    },

    programAuraLabel: {
      color:
        '#93AAB3',

      fontSize: 7,

      fontWeight:
        '800',

      letterSpacing:
        0.8,
    },

    programAuraValue: {
      color:
        '#FFFFFF',

      fontSize: 13,

      fontWeight:
        '900',

      marginTop: 1,
    },

    // REWARDS

    rewards: {
      width: '100%',

      flexDirection:
        'row',

      gap: 8,

      marginTop: 23,
    },

    reward: {
      flex: 1,

      minHeight: 95,

      borderRadius: 17,

      borderWidth: 1,

      borderColor:
        'rgba(255,255,255,0.2)',

      backgroundColor:
        'rgba(6,25,33,0.8)',

      alignItems:
        'center',

      justifyContent:
        'center',
    },

    rewardValue: {
      color:
        '#FFFFFF',

      fontSize: 18,

      fontWeight:
        '900',

      marginTop: 4,
    },

    rewardLabel: {
      color:
        '#9BB0B8',

      fontSize: 7,

      marginTop: 2,
    },

    continueButton: {
      width: '100%',

      minHeight: 61,

      borderRadius: 18,

      backgroundColor:
        '#1684B5',

      flexDirection:
        'row',

      alignItems:
        'center',

      justifyContent:
        'center',

      gap: 8,

      marginTop: 20,
    },

    continueText: {
      color:
        '#FFFFFF',

      fontSize: 12,

      fontWeight:
        '900',
    },

    // COUNTDOWN

    countdownSmall: {
      color:
        '#85D9FA',

      fontSize: 8,

      fontWeight:
        '900',

      letterSpacing: 2,
    },

    countdown: {
      color:
        '#FFFFFF',

      fontSize: 120,

      fontWeight:
        '900',

      textShadowColor:
        'rgba(0,0,0,0.6)',

      textShadowRadius:
        10,
    },

    countdownExercise: {
      color:
        '#FFFFFF',

      fontSize: 22,

      fontWeight:
        '900',

      textAlign:
        'center',
    },

    // REST

    restContent: {
      flex: 1,

      alignItems:
        'center',

      justifyContent:
        'center',

      padding: 25,
    },

    restSmall: {
      color:
        '#7CD5F8',

      fontSize: 8,

      fontWeight:
        '900',

      letterSpacing: 2,
    },

    restTitle: {
      color:
        '#FFFFFF',

      fontSize: 30,

      fontWeight:
        '900',

      marginTop: 3,
    },

    timerCircle: {
      width: 205,

      height: 205,

      borderRadius: 103,

      borderWidth: 6,

      borderColor:
        '#49BDEC',

      backgroundColor:
        'rgba(4,24,32,0.78)',

      alignItems:
        'center',

      justifyContent:
        'center',

      marginVertical:
        30,
    },

    timerValue: {
      color:
        '#FFFFFF',

      fontSize: 66,

      fontWeight:
        '900',
    },

    timerUnit: {
      color:
        '#A3C3CE',

      fontSize: 7,

      fontWeight:
        '900',

      letterSpacing:
        1.4,
    },

    nextSmall: {
      color:
        '#A7BAC1',

      fontSize: 7,

      fontWeight:
        '900',

      letterSpacing:
        1.3,
    },

    nextTitle: {
      color:
        '#FFFFFF',

      fontSize: 24,

      fontWeight:
        '900',

      textAlign:
        'center',

      marginTop: 4,
    },

    skipButton: {
      borderWidth: 1,

      borderColor:
        'rgba(255,255,255,0.35)',

      borderRadius: 14,

      paddingHorizontal:
        18,

      paddingVertical:
        11,

      marginTop: 24,

      backgroundColor:
        'rgba(3,20,27,0.6)',
    },

    skipText: {
      color:
        '#FFFFFF',

      fontSize: 8,

      fontWeight:
        '900',
    },

    // TIMED

    timedContent: {
      flex: 1,

      alignItems:
        'center',

      justifyContent:
        'center',

      padding: 24,
    },

    timedLabel: {
      color:
        '#7DD8FB',

      fontSize: 8,

      fontWeight:
        '900',

      letterSpacing:
        1.7,
    },

    timedExercise: {
      color:
        '#FFFFFF',

      fontSize: 28,

      fontWeight:
        '900',

      textAlign:
        'center',

      marginTop: 5,
    },

    timedSet: {
      color:
        '#D3E0E4',

      fontSize: 10,

      fontWeight:
        '800',
    },
  });