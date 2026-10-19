import Ionicons from '@expo/vector-icons/Ionicons';

import {
  router,
  useFocusEffect,
} from 'expo-router';

import {
  useCallback,
  useState,
} from 'react';

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import {
  levels as calisthenicsLevels,
} from '../../data/levels';

import {
  gluteLevels,
} from '../../data/gluteLevels';

import {
  neckLevels,
} from '../../data/neckLevels';

import {
  programCatalog,
} from '../../data/programCatalog';

import {
  loadProgramsState,
} from '../../storage/programProgress';

import type {
  ProgramId,
  ProgramProgress,
  ProgramsState,
} from '../../types/program';

import type {
  GameLevel,
  Workout,
} from '../../types/game';

import {
  uiTheme,
} from '../../theme/uiTheme';

export default function TrainingScreen() {
  const [
    state,
    setState,
  ] =
    useState<ProgramsState | null>(
      null
    );

  const refresh =
    useCallback(
      async () => {
        const saved =
          await loadProgramsState();

        setState(saved);
      },
      []
    );

  useFocusEffect(
    useCallback(() => {
      void refresh();
    }, [refresh])
  );

  if (!state) {
    return (
      <SafeAreaView
        style={
          styles.screen
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

  const mainProgress =
    state.programs
      .calisthenics;

  const additionalIds =
    state.activeProgramIds.filter(
      (id) =>
        id !==
        'calisthenics'
    );

  return (
    <SafeAreaView
      style={
        styles.screen
      }
      edges={[
        'top',
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.content
        }
      >
        {/* HEADER */}

        <View
          style={
            styles.header
          }
        >
          <View>
            <Text
              style={
                styles.eyebrow
              }
            >
              TRAINING
            </Text>

            <Text
              style={
                styles.title
              }
            >
              Deine Ziele
            </Text>

            <Text
              style={
                styles.subtitle
              }
            >
              Jeder Trainingspfad entwickelt sich unabhängig.
            </Text>
          </View>

          <Pressable
            style={
              styles.addHeaderButton
            }
            onPress={() =>
              router.push(
                '/goals'
              )
            }
          >
            <Ionicons
              name="add"
              size={25}
              color={
                uiTheme.colors.primary
              }
            />
          </Pressable>
        </View>

        {/* HAUPTPFAD */}

        <Text
          style={
            styles.sectionLabel
          }
        >
          HAUPTPFAD
        </Text>

        <ProgramCard
          programId="calisthenics"
          progress={
            mainProgress
          }
          levels={
            calisthenicsLevels
          }
          primary
        />

        {/* ZUSATZZIELE */}

        <View
          style={
            styles.additionalHeader
          }
        >
          <Text
            style={
              styles.sectionLabel
            }
          >
            ZUSÄTZLICHE ZIELE
          </Text>

          <Pressable
            onPress={() =>
              router.push(
                '/goals'
              )
            }
          >
            <Text
              style={
                styles.addText
              }
            >
              + Hinzufügen
            </Text>
          </Pressable>
        </View>

        {additionalIds.length >
        0 ? (
          <View
            style={
              styles.additionalList
            }
          >
            {additionalIds.map(
              (programId) => (
                <ProgramCard
                  key={
                    programId
                  }
                  programId={
                    programId
                  }
                  progress={
                    state.programs[
                      programId
                    ]
                  }
                  levels={
                    getLevelsForProgram(
                      programId
                    )
                  }
                />
              )
            )}
          </View>
        ) : (
          <Pressable
            style={
              styles.emptyCard
            }
            onPress={() =>
              router.push(
                '/goals'
              )
            }
          >
            <View
              style={
                styles.emptyIcon
              }
            >
              <Ionicons
                name="add"
                size={23}
                color={
                  uiTheme.colors.primary
                }
              />
            </View>

            <View
              style={
                styles.emptyTextArea
              }
            >
              <Text
                style={
                  styles.emptyTitle
                }
              >
                Trainingsziel hinzufügen
              </Text>

              <Text
                style={
                  styles.emptyText
                }
              >
                Po & Beine oder Hals & Nacken mit eigener Aura und eigenem Fortschritt starten.
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={19}
              color={
                uiTheme.colors
                  .textSecondary
              }
            />
          </Pressable>
        )}

        <View
          style={{
            height: 110,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function getLevelsForProgram(
  programId: ProgramId
): GameLevel[] {
  if (
    programId ===
    'glute-focus'
  ) {
    return Array.isArray(
      gluteLevels
    )
      ? gluteLevels
      : [];
  }

  if (
    programId ===
    'neck-training'
  ) {
    return Array.isArray(
      neckLevels
    )
      ? neckLevels
      : [];
  }

  return Array.isArray(
    calisthenicsLevels
  )
    ? calisthenicsLevels
    : [];
}

function getCurrentWorkout(
  levels: GameLevel[],
  progress: ProgramProgress
): {
  level:
    GameLevel | null;

  workout:
    Workout | null;

  workoutIndex:
    number;
} {
  const unlockedIds =
    Array.isArray(
      progress.unlockedLevelIds
    )
      ? progress.unlockedLevelIds
      : [1];

  const completedIds =
    Array.isArray(
      progress.completedWorkoutIds
    )
      ? progress.completedWorkoutIds
      : [];

  const unlockedLevels =
    levels.filter(
      (level) =>
        unlockedIds.includes(
          level.id
        )
    );

  const level =
    unlockedLevels.length >
    0
      ? unlockedLevels[
          unlockedLevels.length -
            1
        ]
      : levels[0] ??
        null;

  if (!level) {
    return {
      level: null,

      workout: null,

      workoutIndex: 0,
    };
  }

  const index =
    level.workouts.findIndex(
      (workout) =>
        !completedIds.includes(
          workout.id
        )
    );

  const safeIndex =
    index >= 0
      ? index
      : Math.max(
          0,
          level.workouts.length -
            1
        );

  return {
    level,

    workout:
      level.workouts[
        safeIndex
      ] ??
      null,

    workoutIndex:
      safeIndex,
  };
}

function ProgramCard({
  programId,
  progress,
  levels,
  primary = false,
}: {
  programId: ProgramId;

  progress: ProgramProgress;

  levels: GameLevel[];

  primary?: boolean;
}) {
  const definition =
    programCatalog[
      programId
    ];

  const {
    level,
    workout,
    workoutIndex,
  } =
    getCurrentWorkout(
      levels,
      progress
    );

  const completedIds =
    Array.isArray(
      progress.completedWorkoutIds
    )
      ? progress.completedWorkoutIds
      : [];

  const completed =
    level
      ? level.workouts.filter(
          (item) =>
            completedIds.includes(
              item.id
            )
        ).length
      : 0;

  const total =
    level?.workouts
      .length ??
    0;

  const percentage =
    total > 0
      ? Math.min(
          100,

          completed /
            total *
            100
        )
      : 0;

  return (
    <View
      style={[
        styles.programCard,

        primary &&
          styles.primaryCard,
      ]}
    >
      <View
        style={
          styles.programTop
        }
      >
        <View
          style={
            styles.programIcon
          }
        >
          <Ionicons
            name={
              definition.icon as keyof typeof Ionicons.glyphMap
            }
            size={24}
            color={
              uiTheme.colors.primary
            }
          />
        </View>

        <View
          style={
            styles.programInfo
          }
        >
          <View
            style={
              styles.programTitleRow
            }
          >
            <Text
              style={
                styles.programTitle
              }
            >
              {
                definition.title
              }
            </Text>

            {primary && (
              <View
                style={
                  styles.primaryBadge
                }
              >
                <Text
                  style={
                    styles.primaryBadgeText
                  }
                >
                  HAUPTPFAD
                </Text>
              </View>
            )}
          </View>

          <Text
            style={
              styles.programDescription
            }
          >
            {
              definition.description
            }
          </Text>
        </View>
      </View>

      {/* STATS */}

      <View
        style={
          styles.statsRow
        }
      >
        <View
          style={
            styles.programStat
          }
        >
          <Ionicons
            name="flame"
            size={18}
            color={
              uiTheme.colors.primary
            }
          />

          <View>
            <Text
              style={
                styles.statValue
              }
            >
              {
                progress.currentStreak
              }
            </Text>

            <Text
              style={
                styles.statLabel
              }
            >
              Aura
            </Text>
          </View>
        </View>

        <View
          style={
            styles.statDivider
          }
        />

        <View
          style={
            styles.programStat
          }
        >
          <Ionicons
            name="flash"
            size={18}
            color={
              uiTheme.colors.primary
            }
          />

          <View>
            <Text
              style={
                styles.statValue
              }
            >
              {
                progress.xp
              }
            </Text>

            <Text
              style={
                styles.statLabel
              }
            >
              XP
            </Text>
          </View>
        </View>

        <View
          style={
            styles.statDivider
          }
        />

        <View
          style={
            styles.programStat
          }
        >
          <Ionicons
            name="fitness-outline"
            size={18}
            color={
              uiTheme.colors.primary
            }
          />

          <View>
            <Text
              style={
                styles.statValue
              }
            >
              {
                progress.totalWorkouts
              }
            </Text>

            <Text
              style={
                styles.statLabel
              }
            >
              Einheiten
            </Text>
          </View>
        </View>
      </View>

      {/* LEVEL */}

      {level && (
        <>
          <View
            style={
              styles.levelRow
            }
          >
            <View>
              <Text
                style={
                  styles.levelLabel
                }
              >
                LEVEL{' '}
                {level.id}
              </Text>

              <Text
                style={
                  styles.levelTitle
                }
              >
                {
                  level.title
                }
              </Text>
            </View>

            <Text
              style={
                styles.levelProgress
              }
            >
              {completed}/
              {total}
            </Text>
          </View>

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
                    `${percentage}%`,
                },
              ]}
            />
          </View>
        </>
      )}

      {/* NEXT */}

      {workout && (
        <Pressable
          style={
            styles.nextWorkout
          }
          onPress={() =>
            router.push({
              pathname:
                '/workout/[workoutId]',

              params: {
                workoutId:
                  workout.id,
              },
            })
          }
        >
          <View
            style={
              styles.nextNumber
            }
          >
            <Text
              style={
                styles.nextNumberText
              }
            >
              {workoutIndex +
                1}
            </Text>
          </View>

          <View
            style={
              styles.nextInfo
            }
          >
            <Text
              style={
                styles.nextLabel
              }
            >
              NÄCHSTE EINHEIT
            </Text>

            <Text
              style={
                styles.nextTitle
              }
              numberOfLines={1}
            >
              {
                workout.title
              }
            </Text>
          </View>

          <View
            style={
              styles.startButton
            }
          >
            <Ionicons
              name="play"
              size={17}
              color="#FFFFFF"
            />
          </View>
        </Pressable>
      )}
    </View>
  );
}

const styles =
  StyleSheet.create({
    screen: {
      flex: 1,

      backgroundColor:
        uiTheme.colors.background,
    },

    center: {
      flex: 1,

      alignItems:
        'center',

      justifyContent:
        'center',
    },

    loading: {
      color:
        uiTheme.colors
          .textSecondary,
    },

    content: {
      paddingHorizontal: 15,

      paddingTop: 12,
    },

    header: {
      flexDirection:
        'row',

      alignItems:
        'flex-start',

      justifyContent:
        'space-between',
    },

    eyebrow: {
      color:
        uiTheme.colors.primary,

      fontSize: 7,

      fontWeight:
        '900',

      letterSpacing:
        2.3,
    },

    title: {
      color:
        uiTheme.colors.text,

      fontSize: 31,

      fontWeight:
        '900',

      marginTop: 4,
    },

    subtitle: {
      color:
        uiTheme.colors
          .textSecondary,

      fontSize: 9,

      marginTop: 4,
    },

    addHeaderButton: {
      width: 46,

      height: 46,

      borderRadius: 15,

      borderWidth: 1,

      borderColor:
        uiTheme.colors.border,

      backgroundColor:
        uiTheme.colors.surface,

      alignItems:
        'center',

      justifyContent:
        'center',
    },

    sectionLabel: {
      color:
        uiTheme.colors
          .textSecondary,

      fontSize: 7,

      fontWeight:
        '900',

      letterSpacing:
        1.5,

      marginTop: 24,

      marginBottom: 9,
    },

    additionalHeader: {
      flexDirection:
        'row',

      alignItems:
        'flex-end',

      justifyContent:
        'space-between',
    },

    addText: {
      color:
        uiTheme.colors.primary,

      fontSize: 8,

      fontWeight:
        '900',

      marginBottom: 9,
    },

    additionalList: {
      gap: 10,
    },

    programCard: {
      borderRadius:
        uiTheme.radius.large,

      borderWidth: 1,

      borderColor:
        uiTheme.colors.border,

      backgroundColor:
        uiTheme.colors.surface,

      padding: 14,
    },

    primaryCard: {
      borderColor:
        'rgba(39,182,237,0.27)',
    },

    programTop: {
      flexDirection:
        'row',

      alignItems:
        'center',
    },

    programIcon: {
      width: 48,

      height: 48,

      borderRadius: 15,

      backgroundColor:
        'rgba(39,182,237,0.10)',

      alignItems:
        'center',

      justifyContent:
        'center',
    },

    programInfo: {
      flex: 1,

      marginLeft: 11,
    },

    programTitleRow: {
      flexDirection:
        'row',

      alignItems:
        'center',

      gap: 7,
    },

    programTitle: {
      color:
        uiTheme.colors.text,

      fontSize: 16,

      fontWeight:
        '900',
    },

    primaryBadge: {
      paddingHorizontal: 6,

      paddingVertical: 3,

      borderRadius: 6,

      backgroundColor:
        'rgba(39,182,237,0.10)',
    },

    primaryBadgeText: {
      color:
        uiTheme.colors.primary,

      fontSize: 5,

      fontWeight:
        '900',

      letterSpacing:
        0.8,
    },

    programDescription: {
      color:
        uiTheme.colors
          .textSecondary,

      fontSize: 8,

      lineHeight: 12,

      marginTop: 3,
    },

    statsRow: {
      minHeight: 64,

      marginTop: 13,

      borderRadius: 15,

      backgroundColor:
        uiTheme.colors
          .surfaceElevated,

      flexDirection:
        'row',

      alignItems:
        'center',
    },

    programStat: {
      flex: 1,

      flexDirection:
        'row',

      alignItems:
        'center',

      justifyContent:
        'center',

      gap: 6,
    },

    statValue: {
      color:
        uiTheme.colors.text,

      fontSize: 12,

      fontWeight:
        '900',
    },

    statLabel: {
      color:
        uiTheme.colors
          .textMuted,

      fontSize: 6,

      marginTop: 1,
    },

    statDivider: {
      width: 1,

      height: 32,

      backgroundColor:
        uiTheme.colors.border,
    },

    levelRow: {
      flexDirection:
        'row',

      justifyContent:
        'space-between',

      alignItems:
        'flex-end',

      marginTop: 15,
    },

    levelLabel: {
      color:
        uiTheme.colors.primary,

      fontSize: 6,

      fontWeight:
        '900',

      letterSpacing:
        1.3,
    },

    levelTitle: {
      color:
        uiTheme.colors.text,

      fontSize: 13,

      fontWeight:
        '900',

      marginTop: 2,
    },

    levelProgress: {
      color:
        uiTheme.colors
          .textSecondary,

      fontSize: 9,

      fontWeight:
        '800',
    },

    progressTrack: {
      width: '100%',

      height: 5,

      marginTop: 8,

      borderRadius: 5,

      overflow:
        'hidden',

      backgroundColor:
        uiTheme.colors
          .surfaceElevated,
    },

    progressFill: {
      height: '100%',

      backgroundColor:
        uiTheme.colors.primary,
    },

    nextWorkout: {
      minHeight: 66,

      marginTop: 12,

      paddingHorizontal: 9,

      borderRadius: 16,

      borderWidth: 1,

      borderColor:
        uiTheme.colors.border,

      backgroundColor:
        '#0B1A22',

      flexDirection:
        'row',

      alignItems:
        'center',
    },

    nextNumber: {
      width: 43,

      height: 43,

      borderRadius: 13,

      backgroundColor:
        uiTheme.colors
          .primaryDark,

      alignItems:
        'center',

      justifyContent:
        'center',
    },

    nextNumberText: {
      color:
        '#FFFFFF',

      fontSize: 16,

      fontWeight:
        '900',
    },

    nextInfo: {
      flex: 1,

      marginLeft: 10,
    },

    nextLabel: {
      color:
        uiTheme.colors.primary,

      fontSize: 5,

      fontWeight:
        '900',

      letterSpacing:
        1,
    },

    nextTitle: {
      color:
        uiTheme.colors.text,

      fontSize: 12,

      fontWeight:
        '900',

      marginTop: 2,
    },

    startButton: {
      width: 38,

      height: 38,

      borderRadius: 12,

      backgroundColor:
        uiTheme.colors
          .primaryDark,

      alignItems:
        'center',

      justifyContent:
        'center',
    },

    emptyCard: {
      minHeight: 88,

      padding: 12,

      borderRadius:
        uiTheme.radius.large,

      borderWidth: 1,

      borderStyle:
        'dashed',

      borderColor:
        'rgba(39,182,237,0.28)',

      backgroundColor:
        'rgba(39,182,237,0.035)',

      flexDirection:
        'row',

      alignItems:
        'center',
    },

    emptyIcon: {
      width: 44,

      height: 44,

      borderRadius: 14,

      backgroundColor:
        'rgba(39,182,237,0.10)',

      alignItems:
        'center',

      justifyContent:
        'center',
    },

    emptyTextArea: {
      flex: 1,

      marginHorizontal: 10,
    },

    emptyTitle: {
      color:
        uiTheme.colors.text,

      fontSize: 12,

      fontWeight:
        '900',
    },

    emptyText: {
      color:
        uiTheme.colors
          .textSecondary,

      fontSize: 7,

      lineHeight: 11,

      marginTop: 3,
    },
  });