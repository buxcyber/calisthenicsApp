import Ionicons from '@expo/vector-icons/Ionicons';

import * as Haptics from 'expo-haptics';

import {
    router,
    useLocalSearchParams,
} from 'expo-router';

import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    useEffect,
    useMemo,
    useState,
} from 'react';

import {
    LinearGradient,
} from 'expo-linear-gradient';

import {
    SafeAreaView,
} from 'react-native-safe-area-context';

import MasterAvatar from '../../components/MasterAvatar';

import {
    bossBattles,
} from '../../data/bosses';

import {
    levels,
} from '../../data/levels';

import {
    completeBoss,
    loadProgress,
    recordBossVictory,
} from '../../storage/progress';

type ScreenState =
  | 'trial'
  | 'rest'
  | 'phase-cleared'
  | 'victory';

type NextAction =
  | 'next-set'
  | 'next-exercise'
  | null;

export default function FinalTrialScreen() {
  const {
    bossId,
  } =
    useLocalSearchParams<{
      bossId: string;
    }>();

  const level =
    useMemo(
      () =>
        levels.find(
          (item) =>
            item.boss.id ===
            bossId
        ),

      [bossId]
    );

  const battle =
    useMemo(
      () =>
        bossBattles.find(
          (item) =>
            item.bossId ===
            bossId
        ),

      [bossId]
    );

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  const [
    allowed,
    setAllowed,
  ] =
    useState(false);

  const [
    screen,
    setScreen,
  ] =
    useState<ScreenState>(
      'trial'
    );

  const [
    phaseIndex,
    setPhaseIndex,
  ] =
    useState(0);

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
    firstDefeat,
    setFirstDefeat,
  ] =
    useState(false);

  const [
    nextLevelUnlocked,
    setNextLevelUnlocked,
  ] =
    useState<
      number | null
    >(null);

  useEffect(() => {
    async function check() {
      if (
        !level
      ) {
        setLoading(
          false
        );

        return;
      }

      const progress =
        await loadProgress();

      const alreadyDone =
        progress.defeatedBossIds.includes(
          level.boss.id
        );

      const workoutsDone =
        level.workouts.every(
          (workout) =>
            progress.completedWorkoutIds.includes(
              workout.id
            )
        );

      const enoughXP =
        progress.xp >=
        level.boss.requiredXP;

      setAllowed(
        alreadyDone ||
          (
            workoutsDone &&
            enoughXP
          )
      );

      setLoading(
        false
      );
    }

    check();
  }, [level]);

  useEffect(() => {
    if (
      screen !==
      'rest'
    ) {
      return;
    }

    if (
      secondsLeft <=
      0
    ) {
      finishRest();

      return;
    }

    if (
      secondsLeft <=
      3
    ) {
      Haptics.impactAsync(
        Haptics.ImpactFeedbackStyle.Light
      );
    }

    const timer =
      setTimeout(() => {
        setSecondsLeft(
          (
            previous
          ) =>
            previous -
            1
        );
      }, 1000);

    return () =>
      clearTimeout(
        timer
      );
  }, [
    screen,
    secondsLeft,
  ]);

  if (
    !level ||
    !battle
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
            Prüfung nicht gefunden.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const activeLevel =
    level;

  const activeBattle =
    battle;

  const currentPhase =
    activeBattle.phases[
      phaseIndex
    ];

  const exercise =
    currentPhase?.exercises[
      exerciseIndex
    ];

  if (
    !currentPhase ||
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
            Prüfungsdaten konnten
            nicht geladen werden.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const admissionTrial =
    activeLevel.id ===
    1;

  function startRest(
    action: NextAction
  ) {
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

    setScreen(
      'rest'
    );
  }

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

  function performNextAction(
    action: NextAction
  ) {
    if (
      action ===
      'next-set'
    ) {
      setCurrentSet(
        (
          previous
        ) =>
          previous +
          1
      );
    }

    if (
      action ===
      'next-exercise'
    ) {
      setExerciseIndex(
        (
          previous
        ) =>
          previous +
          1
      );

      setCurrentSet(
        1
      );
    }

    setScreen(
      'trial'
    );
  }

  async function completeSet() {
    await Haptics.impactAsync(
      Haptics.ImpactFeedbackStyle.Heavy
    );

    const lastSet =
      currentSet >=
      exercise.sets;

    const lastExercise =
      exerciseIndex >=
      currentPhase.exercises.length -
        1;

    if (
      !lastSet
    ) {
      startRest(
        'next-set'
      );

      return;
    }

    if (
      !lastExercise
    ) {
      startRest(
        'next-exercise'
      );

      return;
    }

    const finalPhase =
      phaseIndex >=
      activeBattle.phases.length -
        1;

    if (
      finalPhase
    ) {
      await finishTrial();

      return;
    }

    await Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
    );

    setScreen(
      'phase-cleared'
    );
  }

  async function finishTrial() {
    const possibleNextLevel =
      activeLevel.id + 1;

    const nextExists =
      levels.some(
        (item) =>
          item.id ===
          possibleNextLevel
      );

    const result =
      await completeBoss(
        activeLevel.boss.id,

        activeLevel.boss.rewardXP,

        nextExists
          ? possibleNextLevel
          : 0
      );

    await recordBossVictory(
      activeLevel.boss.id,

      activeLevel.boss.name,

      activeLevel.id
    );

    setFirstDefeat(
      result.firstDefeat
    );

    setNextLevelUnlocked(
      result.firstDefeat &&
        nextExists
        ? possibleNextLevel
        : null
    );

    setScreen(
      'victory'
    );

    await Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
    );
  }

  function nextPhase() {
    setPhaseIndex(
      (
        previous
      ) =>
        previous + 1
    );

    setExerciseIndex(
      0
    );

    setCurrentSet(
      1
    );

    setScreen(
      'trial'
    );
  }

  function exitTrial() {
    Alert.alert(
      admissionTrial
        ? 'Aufnahmeprüfung verlassen?'
        : 'Prüfung verlassen?',

      'Der aktuelle Prüfungsfortschritt wird nicht gespeichert.',

      [
        {
          text:
            'Weiter',

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
            Der Meister wartet...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (
    !allowed
  ) {
    return (
      <SafeAreaView
        style={
          styles.container
        }
      >
        <LinearGradient
          colors={[
            '#BCE5F3',
            '#E7EFE2',
            '#F2EBD6',
          ]}
          style={
            styles.center
          }
        >
          <Ionicons
            name="lock-closed"
            size={47}
            color="#7B8584"
          />

          <Text
            style={
              styles.lockedTitle
            }
          >
            Noch nicht bereit
          </Text>

          <Text
            style={
              styles.lockedText
            }
          >
            Der Meister wird deine
            Abschlussprüfung erst
            beginnen, wenn du alle
            vorherigen Prüfungen
            abgeschlossen hast.
          </Text>

          <Pressable
            style={
              styles.outlineButton
            }
            onPress={() =>
              router.back()
            }
          >
            <Text
              style={
                styles.outlineButtonText
              }
            >
              ZURÜCK ZUM PFAD
            </Text>
          </Pressable>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  // =========================================================
  // VICTORY
  // =========================================================

  if (
    screen ===
    'victory'
  ) {
    return (
      <SafeAreaView
        style={
          styles.container
        }
      >
        <LinearGradient
          colors={[
            '#9FD7EC',
            '#E4F0E4',
            '#F6EED4',
          ]}
          style={
            styles.victory
          }
        >
          {admissionTrial && (
            <MasterAvatar
              size={128}
            />
          )}

          <Text
            style={
              styles.victoryEyebrow
            }
          >
            {admissionTrial
              ? 'PRÜFUNG BESTANDEN'
              : 'PRÜFUNG BESTANDEN'}
          </Text>

          <Text
            style={
              styles.victoryTitle
            }
          >
            {admissionTrial
              ? 'Der Meister nimmt dich auf'
              : activeLevel.boss.name}
          </Text>

          <Text
            style={
              styles.victoryQuote
            }
          >
            {admissionTrial
              ? '„Du besitzt noch viel zu lernen. Aber du hast mir gezeigt, dass du bereit bist. Von heute an bist du mein Schüler.“'
              : 'Du hast die Prüfung bestanden.'}
          </Text>

          {firstDefeat && (
            <View
              style={
                styles.rewardCard
              }
            >
              <Ionicons
                name="ribbon"
                size={26}
                color="#A47438"
              />

              <View
                style={{
                  flex: 1,
                }}
              >
                <Text
                  style={
                    styles.rewardLabel
                  }
                >
                  BELOHNUNG
                </Text>

                <Text
                  style={
                    styles.rewardValue
                  }
                >
                  +
                  {
                    activeLevel
                      .boss
                      .rewardXP
                  }{' '}
                  XP
                </Text>
              </View>
            </View>
          )}

          {nextLevelUnlocked && (
            <View
              style={
                styles.unlockCard
              }
            >
              <Ionicons
                name="lock-open"
                size={24}
                color="#2A82AA"
              />

              <View>
                <Text
                  style={
                    styles.unlockLabel
                  }
                >
                  NEUES KAPITEL
                </Text>

                <Text
                  style={
                    styles.unlockTitle
                  }
                >
                  LEVEL{' '}
                  {
                    nextLevelUnlocked
                  }{' '}
                  FREIGESCHALTET
                </Text>
              </View>
            </View>
          )}

          <Pressable
            style={
              styles.primaryButton
            }
            onPress={() =>
              router.replace(
                '/rewards'
              )
            }
          >
            <Text
              style={
                styles.primaryButtonText
              }
            >
              WEITER
            </Text>

            <Ionicons
              name="arrow-forward"
              size={19}
              color="#FFFFFF"
            />
          </Pressable>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  // =========================================================
  // PHASE CLEARED
  // =========================================================

  if (
    screen ===
    'phase-cleared'
  ) {
    return (
      <SafeAreaView
        style={
          styles.container
        }
      >
        <LinearGradient
          colors={[
            '#B4DFEF',
            '#E9F0DF',
            '#F4EAD1',
          ]}
          style={
            styles.center
          }
        >
          <View
            style={
              styles.phaseCheck
            }
          >
            <Ionicons
              name="checkmark"
              size={42}
              color="#FFFFFF"
            />
          </View>

          <Text
            style={
              styles.phaseClearSmall
            }
          >
            TEILPRÜFUNG{' '}
            {phaseIndex + 1}{' '}
            BESTANDEN
          </Text>

          <Text
            style={
              styles.phaseClearTitle
            }
          >
            Der Meister nickt.
          </Text>

          <Text
            style={
              styles.phaseClearText
            }
          >
            „Gut. Doch verliere
            jetzt nicht deine
            Konzentration.“
          </Text>

          <Pressable
            style={
              styles.primaryButton
            }
            onPress={
              nextPhase
            }
          >
            <Text
              style={
                styles.primaryButtonText
              }
            >
              NÄCHSTE PRÜFUNG
            </Text>

            <Ionicons
              name="arrow-forward"
              size={19}
              color="#FFFFFF"
            />
          </Pressable>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  // =========================================================
  // REST
  // =========================================================

  if (
    screen ===
    'rest'
  ) {
    return (
      <SafeAreaView
        style={
          styles.container
        }
      >
        <LinearGradient
          colors={[
            '#B9E3F1',
            '#E9F0E1',
            '#F1E9D1',
          ]}
          style={
            styles.center
          }
        >
          <Text
            style={
              styles.restSmall
            }
          >
            SAMMLE DICH
          </Text>

          <View
            style={
              styles.timerCircle
            }
          >
            <Text
              style={
                styles.timer
              }
            >
              {
                secondsLeft
              }
            </Text>

            <Text
              style={
                styles.timerUnit
              }
            >
              SEK
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
            {nextAction ===
            'next-set'
              ? exercise.name
              : currentPhase
                  .exercises[
                    exerciseIndex +
                      1
                  ]
                  ?.name ??
                'Nächste Aufgabe'}
          </Text>

          <Pressable
            style={
              styles.outlineButton
            }
            onPress={
              finishRest
            }
          >
            <Text
              style={
                styles.outlineButtonText
              }
            >
              PAUSE ÜBERSPRINGEN
            </Text>
          </Pressable>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  // =========================================================
  // ACTIVE TRIAL
  // =========================================================

  return (
    <SafeAreaView
      style={
        styles.container
      }
    >
      <LinearGradient
        colors={[
          '#A8DAED',
          '#DAE9E1',
          '#EFE9D2',
        ]}
        style={
          styles.trial
        }
      >
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
              exitTrial
            }
          >
            <Ionicons
              name="close"
              size={25}
              color="#3B5058"
            />
          </Pressable>

          <View
            style={
              styles.headerCenter
            }
          >
            <Text
              style={
                styles.headerSmall
              }
            >
              ABSCHLUSSPRÜFUNG
            </Text>

            <Text
              style={
                styles.headerTitle
              }
            >
              Die Aufnahme
            </Text>
          </View>

          <View
            style={
              styles.phaseCounter
            }
          >
            <Text
              style={
                styles.phaseCounterText
              }
            >
              {phaseIndex +
                1}
              /
              {
                activeBattle
                  .phases
                  .length
              }
            </Text>
          </View>
        </View>

        {/* MASTER */}

        <View
          style={
            styles.masterSection
          }
        >
          {admissionTrial ? (
            <MasterAvatar
              size={100}
            />
          ) : (
            <View
              style={
                styles.bossFallback
              }
            >
              <Ionicons
                name="flash"
                size={50}
                color="#B36250"
              />
            </View>
          )}

          <View
            style={
              styles.masterBubble
            }
          >
            <Text
              style={
                styles.masterBubbleLabel
              }
            >
              {admissionTrial
                ? 'DER MEISTER'
                : 'DIE PRÜFUNG'}
            </Text>

            <Text
              style={
                styles.masterBubbleText
              }
            >
              {admissionTrial
                ? '„Zeige mir keine Hektik. Jede Bewegung muss unter deiner Kontrolle bleiben.“'
                : currentPhase.subtitle}
            </Text>
          </View>
        </View>

        {/* PHASE */}

        <View
          style={
            styles.phaseCard
          }
        >
          <Text
            style={
              styles.phaseLabel
            }
          >
            TEILPRÜFUNG{' '}
            {phaseIndex +
              1}
          </Text>

          <Text
            style={
              styles.phaseTitle
            }
          >
            {
              currentPhase.title
            }
          </Text>

          <Text
            style={
              styles.phaseSubtitle
            }
          >
            {
              currentPhase.subtitle
            }
          </Text>
        </View>

        {/* EXERCISE */}

        <View
          style={
            styles.exerciseSection
          }
        >
          <Text
            style={
              styles.exerciseCount
            }
          >
            AUFGABE{' '}
            {exerciseIndex +
              1}{' '}
            VON{' '}
            {
              currentPhase
                .exercises
                .length
            }
          </Text>

          <Text
            style={
              styles.exerciseName
            }
          >
            {
              exercise.name
            }
          </Text>

          <View
            style={
              styles.exerciseVisual
            }
          >
            <View
              style={
                styles.exerciseCircle
              }
            >
              <Ionicons
                name="body-outline"
                size={60}
                color="#43849C"
              />
            </View>
          </View>

          <Text
            style={
              styles.setText
            }
          >
            Satz{' '}
            {currentSet} von{' '}
            {
              exercise.sets
            }
          </Text>

          <Text
            style={
              styles.target
            }
          >
            {exercise.reps
              ? `${exercise.reps} Wiederholungen`
              : `${exercise.durationSeconds} Sekunden`}
          </Text>
        </View>

        <Pressable
          style={
            styles.primaryButton
          }
          onPress={
            completeSet
          }
        >
          <Ionicons
            name="checkmark-circle"
            size={21}
            color="#FFFFFF"
          />

          <Text
            style={
              styles.primaryButtonText
            }
          >
            SATZ ABSCHLIESSEN
          </Text>
        </Pressable>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,

      backgroundColor:
        '#EDF1E8',
    },

    center: {
      flex: 1,

      alignItems:
        'center',

      justifyContent:
        'center',

      paddingHorizontal:
        28,
    },

    loading: {
      color:
        '#597079',

      fontWeight:
        '700',
    },

    error: {
      color:
        '#2E4148',

      fontWeight:
        '900',
    },

    lockedTitle: {
      color:
        '#263940',

      fontSize: 29,

      fontWeight:
        '900',

      marginTop: 17,
    },

    lockedText: {
      color:
        '#64787E',

      fontSize: 11,

      lineHeight: 17,

      textAlign:
        'center',

      maxWidth: 290,

      marginTop: 7,
    },

    outlineButton: {
      borderWidth: 1,

      borderColor:
        '#9AAEAC',

      borderRadius: 14,

      paddingHorizontal:
        20,

      paddingVertical:
        12,

      marginTop: 25,
    },

    outlineButtonText: {
      color:
        '#51686E',

      fontSize: 9,

      fontWeight:
        '900',
    },

    victory: {
      flex: 1,

      alignItems:
        'center',

      justifyContent:
        'center',

      paddingHorizontal:
        25,
    },

    victoryEyebrow: {
      color:
        '#9B713C',

      fontSize: 8,

      fontWeight:
        '900',

      letterSpacing:
        2,

      marginTop: 9,
    },

    victoryTitle: {
      color:
        '#24363D',

      fontSize: 30,

      lineHeight: 35,

      fontWeight:
        '900',

      textAlign:
        'center',

      marginTop: 4,

      maxWidth: 330,
    },

    victoryQuote: {
      color:
        '#5D625B',

      fontSize: 11,

      fontStyle:
        'italic',

      lineHeight: 18,

      textAlign:
        'center',

      marginTop: 10,

      maxWidth: 310,
    },

    rewardCard: {
      width:
        '100%',

      minHeight: 73,

      flexDirection:
        'row',

      alignItems:
        'center',

      gap: 12,

      backgroundColor:
        'rgba(255,249,228,0.76)',

      borderWidth: 1,

      borderColor:
        '#D3BB86',

      borderRadius: 17,

      padding: 14,

      marginTop: 20,
    },

    rewardLabel: {
      color:
        '#876B45',

      fontSize: 7,

      fontWeight:
        '900',

      letterSpacing:
        1.2,
    },

    rewardValue: {
      color:
        '#3D4B45',

      fontSize: 20,

      fontWeight:
        '900',

      marginTop: 2,
    },

    unlockCard: {
      width:
        '100%',

      minHeight: 68,

      flexDirection:
        'row',

      alignItems:
        'center',

      gap: 11,

      backgroundColor:
        'rgba(224,242,246,0.8)',

      borderWidth: 1,

      borderColor:
        '#B4D5DC',

      borderRadius: 17,

      padding: 13,

      marginTop: 9,
    },

    unlockLabel: {
      color:
        '#2C82A7',

      fontSize: 7,

      fontWeight:
        '900',

      letterSpacing:
        1.2,
    },

    unlockTitle: {
      color:
        '#2C4149',

      fontSize: 13,

      fontWeight:
        '900',

      marginTop: 1,
    },

    phaseCheck: {
      width: 94,

      height: 94,

      borderRadius:
        47,

      backgroundColor:
        '#4E9369',

      alignItems:
        'center',

      justifyContent:
        'center',
    },

    phaseClearSmall: {
      color:
        '#4C8B67',

      fontSize: 8,

      fontWeight:
        '900',

      letterSpacing:
        1.6,

      marginTop: 20,
    },

    phaseClearTitle: {
      color:
        '#263A41',

      fontSize: 29,

      fontWeight:
        '900',

      marginTop: 3,
    },

    phaseClearText: {
      color:
        '#63747A',

      fontSize: 11,

      fontStyle:
        'italic',

      textAlign:
        'center',

      marginTop: 7,
    },

    restSmall: {
      color:
        '#367F9B',

      fontSize: 8,

      fontWeight:
        '900',

      letterSpacing:
        1.8,
    },

    timerCircle: {
      width: 205,

      height: 205,

      borderRadius:
        103,

      borderWidth: 6,

      borderColor:
        '#3F8CA6',

      backgroundColor:
        'rgba(255,255,255,0.55)',

      alignItems:
        'center',

      justifyContent:
        'center',

      marginVertical:
        30,
    },

    timer: {
      color:
        '#263C44',

      fontSize: 65,

      fontWeight:
        '900',
    },

    timerUnit: {
      color:
        '#71848A',

      fontSize: 7,

      fontWeight:
        '900',

      letterSpacing:
        1.3,
    },

    nextSmall: {
      color:
        '#748489',

      fontSize: 7,

      fontWeight:
        '900',

      letterSpacing:
        1.4,
    },

    nextTitle: {
      color:
        '#2A3F46',

      fontSize: 23,

      fontWeight:
        '900',

      textAlign:
        'center',

      marginTop: 4,
    },

    trial: {
      flex: 1,

      paddingHorizontal:
        18,

      paddingBottom: 20,
    },

    header: {
      height: 60,

      flexDirection:
        'row',

      alignItems:
        'center',

      justifyContent:
        'space-between',
    },

    closeButton: {
      width: 41,

      height: 41,

      borderRadius:
        13,

      backgroundColor:
        'rgba(255,255,255,0.65)',

      alignItems:
        'center',

      justifyContent:
        'center',
    },

    headerCenter: {
      flex: 1,

      alignItems:
        'center',
    },

    headerSmall: {
      color:
        '#8A6C45',

      fontSize: 6,

      fontWeight:
        '900',

      letterSpacing:
        1.5,
    },

    headerTitle: {
      color:
        '#283E46',

      fontSize: 15,

      fontWeight:
        '900',

      marginTop: 2,
    },

    phaseCounter: {
      width: 41,

      height: 41,

      borderRadius:
        13,

      backgroundColor:
        'rgba(255,255,255,0.65)',

      alignItems:
        'center',

      justifyContent:
        'center',
    },

    phaseCounterText: {
      color:
        '#5C7178',

      fontSize: 10,

      fontWeight:
        '900',
    },

    masterSection: {
      flexDirection:
        'row',

      alignItems:
        'center',

      gap: 8,

      minHeight: 132,
    },

    masterBubble: {
      flex: 1,

      backgroundColor:
        'rgba(255,251,236,0.82)',

      borderWidth: 1,

      borderColor:
        '#DAC69B',

      borderRadius: 17,

      padding: 12,
    },

    masterBubbleLabel: {
      color:
        '#98703D',

      fontSize: 6,

      fontWeight:
        '900',

      letterSpacing:
        1.3,
    },

    masterBubbleText: {
      color:
        '#63584A',

      fontSize: 9,

      lineHeight: 14,

      fontStyle:
        'italic',

      marginTop: 3,
    },

    bossFallback: {
      width: 90,

      height: 90,

      borderRadius:
        45,

      backgroundColor:
        '#E5D5CC',

      alignItems:
        'center',

      justifyContent:
        'center',
    },

    phaseCard: {
      backgroundColor:
        'rgba(255,255,255,0.7)',

      borderWidth: 1,

      borderColor:
        '#C8D7D4',

      borderRadius: 18,

      padding: 13,
    },

    phaseLabel: {
      color:
        '#39809A',

      fontSize: 6,

      fontWeight:
        '900',

      letterSpacing:
        1.3,
    },

    phaseTitle: {
      color:
        '#253A42',

      fontSize: 18,

      fontWeight:
        '900',

      marginTop: 2,
    },

    phaseSubtitle: {
      color:
        '#687B80',

      fontSize: 9,

      marginTop: 3,
    },

    exerciseSection: {
      flex: 1,

      alignItems:
        'center',

      paddingTop: 14,
    },

    exerciseCount: {
      color:
        '#6C8086',

      fontSize: 7,

      fontWeight:
        '900',

      letterSpacing:
        1.4,
    },

    exerciseName: {
      color:
        '#21363F',

      fontSize: 27,

      fontWeight:
        '900',

      textAlign:
        'center',

      marginTop: 4,
    },

    exerciseVisual: {
      flex: 1,

      width:
        '100%',

      maxHeight: 165,

      borderRadius: 21,

      backgroundColor:
        'rgba(255,255,255,0.48)',

      borderWidth: 1,

      borderColor:
        '#BED1D0',

      alignItems:
        'center',

      justifyContent:
        'center',

      marginVertical:
        13,
    },

    exerciseCircle: {
      width: 101,

      height: 101,

      borderRadius:
        51,

      backgroundColor:
        '#D8EAEB',

      alignItems:
        'center',

      justifyContent:
        'center',
    },

    setText: {
      color:
        '#687C82',

      fontSize: 9,

      fontWeight:
        '900',
    },

    target: {
      color:
        '#2E7E9F',

      fontSize: 22,

      fontWeight:
        '900',

      marginTop: 3,
    },

    primaryButton: {
      width:
        '100%',

      minHeight: 60,

      borderRadius: 18,

      backgroundColor:
        '#3E7D70',

      flexDirection:
        'row',

      alignItems:
        'center',

      justifyContent:
        'center',

      gap: 7,

      marginTop: 17,
    },

    primaryButtonText: {
      color:
        '#FFFFFF',

      fontSize: 12,

      fontWeight:
        '900',

      letterSpacing:
        0.5,
    },
  });