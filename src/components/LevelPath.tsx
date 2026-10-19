import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  useEffect,
  useRef,
} from 'react';

import type {
  GameLevel,
} from '../types/game';

import {
  characterImages,
} from '../data/gameAssets';

import {
  uiTheme,
} from '../theme/uiTheme';

type Props = {
  level: GameLevel;
  currentXP: number;
  completedWorkoutIds: string[];
  unlockedLevelIds: number[];
  auraDays?: number;
};

// ============================================================
// ACTIVE NODE
// ============================================================

function ActiveNode({
  number,
}: {
  number: number;
}) {
  const pulse =
    useRef(
      new Animated.Value(0)
    ).current;

  useEffect(() => {
    const animation =
      Animated.loop(
        Animated.sequence([
          Animated.timing(
            pulse,
            {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }
          ),

          Animated.timing(
            pulse,
            {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }
          ),
        ])
      );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [pulse]);

  const scale =
    pulse.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.06],
    });

  const glowScale =
    pulse.interpolate({
      inputRange: [0, 1],
      outputRange: [0.95, 1.22],
    });

  const glowOpacity =
    pulse.interpolate({
      inputRange: [0, 1],
      outputRange: [0.12, 0.34],
    });

  return (
    <View style={styles.activeWrapper}>
      <Animated.View
        style={[
          styles.activeGlow,
          {
            opacity: glowOpacity,
            transform: [
              {
                scale: glowScale,
              },
            ],
          },
        ]}
      />

      <Animated.View
        style={[
          styles.activeNode,
          {
            transform: [
              {
                scale,
              },
            ],
          },
        ]}
      >
        <Text style={styles.activeNumber}>
          {number}
        </Text>
      </Animated.View>
    </View>
  );
}

// ============================================================
// STANDARD NODE
// ============================================================

function PathNode({
  number,
  completed,
  locked,
}: {
  number: number;
  completed: boolean;
  locked: boolean;
}) {
  if (completed) {
    return (
      <View
        style={[
          styles.node,
          styles.completedNode,
        ]}
      >
        <Ionicons
          name="checkmark"
          size={22}
          color="#FFFFFF"
        />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.node,
        locked
          ? styles.lockedNode
          : styles.availableNode,
      ]}
    >
      <Text
        style={[
          styles.nodeNumber,
          locked &&
            styles.lockedNumber,
        ]}
      >
        {number}
      </Text>

      {locked && (
        <View style={styles.lockBadge}>
          <Ionicons
            name="lock-closed"
            size={8}
            color={
              uiTheme.colors
                .textSecondary
            }
          />
        </View>
      )}
    </View>
  );
}

// ============================================================
// HERO
// ============================================================

function PathHero({
  auraDays,
}: {
  auraDays: number;
}) {
  const idle =
    useRef(
      new Animated.Value(0)
    ).current;

  const aura =
    useRef(
      new Animated.Value(0)
    ).current;

  useEffect(() => {
    const animation =
      Animated.loop(
        Animated.sequence([
          Animated.timing(
            idle,
            {
              toValue: 1,
              duration: 1500,
              useNativeDriver: true,
            }
          ),

          Animated.timing(
            idle,
            {
              toValue: 0,
              duration: 1500,
              useNativeDriver: true,
            }
          ),
        ])
      );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [idle]);

  useEffect(() => {
    if (auraDays <= 0) {
      return;
    }

    const animation =
      Animated.loop(
        Animated.sequence([
          Animated.timing(
            aura,
            {
              toValue: 1,
              duration: 1300,
              useNativeDriver: true,
            }
          ),

          Animated.timing(
            aura,
            {
              toValue: 0,
              duration: 1300,
              useNativeDriver: true,
            }
          ),
        ])
      );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [
    aura,
    auraDays,
  ]);

  const translateY =
    idle.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -4],
    });

  const auraScale =
    aura.interpolate({
      inputRange: [0, 1],
      outputRange: [0.92, 1.1],
    });

  const auraOpacity =
    aura.interpolate({
      inputRange: [0, 1],
      outputRange: [
        Math.min(
          0.03 +
            auraDays * 0.01,
          0.13
        ),
        Math.min(
          0.08 +
            auraDays * 0.013,
          0.25
        ),
      ],
    });

  return (
    <Animated.View
      style={[
        styles.heroWrapper,
        {
          transform: [
            {
              translateY,
            },
          ],
        },
      ]}
    >
      {auraDays > 0 && (
        <Animated.View
          style={[
            styles.heroAura,
            {
              opacity:
                auraOpacity,

              transform: [
                {
                  scale:
                    auraScale,
                },
              ],
            },
          ]}
        />
      )}

      <Image
        source={
          characterImages.heroLevel1
        }
        resizeMode="contain"
        style={styles.heroImage}
      />
    </Animated.View>
  );
}

// ============================================================
// MASTER
// ============================================================

function MasterCharacter() {
  const idle =
    useRef(
      new Animated.Value(0)
    ).current;

  useEffect(() => {
    const animation =
      Animated.loop(
        Animated.sequence([
          Animated.timing(
            idle,
            {
              toValue: 1,
              duration: 2400,
              useNativeDriver: true,
            }
          ),

          Animated.timing(
            idle,
            {
              toValue: 0,
              duration: 2400,
              useNativeDriver: true,
            }
          ),
        ])
      );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [idle]);

  const translateY =
    idle.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -2],
    });

  return (
    <Animated.View
      style={{
        transform: [
          {
            translateY,
          },
        ],
      }}
    >
      <Image
        source={
          characterImages.master
        }
        resizeMode="contain"
        style={styles.masterImage}
      />
    </Animated.View>
  );
}

// ============================================================
// MAIN
// ============================================================

export default function LevelPath({
  level,
  currentXP,
  completedWorkoutIds,
  auraDays = 0,
}: Props) {
  const completedCount =
    level.workouts.filter(
      (workout) =>
        completedWorkoutIds.includes(
          workout.id
        )
    ).length;

  const firstIncomplete =
    level.workouts.findIndex(
      (workout) =>
        !completedWorkoutIds.includes(
          workout.id
        )
    );

  const activeIndex =
    firstIncomplete >= 0
      ? firstIncomplete
      : Math.max(
          0,
          level.workouts.length - 1
        );

  const activeWorkout =
    level.workouts[
      activeIndex
    ];

  const allCompleted =
    completedCount ===
    level.workouts.length;

  const enoughXP =
    currentXP >=
    level.boss.requiredXP;

  const finalUnlocked =
    allCompleted &&
    enoughXP;

  const progress =
    completedCount /
    Math.max(
      1,
      level.workouts.length
    );

  return (
    <LinearGradient
      colors={[
        '#08141B',
        '#0A1820',
        '#071117',
      ]}
      locations={[
        0,
        0.5,
        1,
      ]}
      style={styles.world}
    >
      {/* =================================================
          KAPITEL
      ================================================= */}

      <View style={styles.header}>
        <View style={styles.chapterRow}>
          <View
            style={
              styles.chapterIcon
            }
          >
            <Ionicons
              name="flash"
              size={13}
              color={
                uiTheme.colors
                  .primary
              }
            />
          </View>

          <Text style={styles.chapter}>
            KAPITEL {level.id}
          </Text>
        </View>

        <Text style={styles.title}>
          {level.title}
        </Text>

        <Text style={styles.subtitle}>
          {level.id === 1
            ? 'Der Weg zum Meister beginnt.'
            : level.subtitle}
        </Text>

        {/* =============================================
            PROGRESS
        ============================================= */}

        <View style={styles.progressCard}>
          <View style={styles.progressTop}>
            <View>
              <Text
                style={
                  styles.progressLabel
                }
              >
                FORTSCHRITT
              </Text>

              <Text
                style={
                  styles.progressValue
                }
              >
                {completedCount}
                <Text
                  style={
                    styles.progressTotal
                  }
                >
                  {' '}
                  /{' '}
                  {
                    level.workouts
                      .length
                  }
                </Text>
              </Text>
            </View>

            <View
              style={
                styles.xpContainer
              }
            >
              <Ionicons
                name="flash"
                size={14}
                color={
                  uiTheme.colors
                    .primary
                }
              />

              <Text style={styles.xp}>
                {currentXP}
              </Text>

              <Text
                style={
                  styles.xpRequired
                }
              >
                /{' '}
                {
                  level.boss
                    .requiredXP
                }
              </Text>
            </View>
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
                  width: `${Math.min(
                    100,
                    progress * 100
                  )}%`,
                },
              ]}
            />
          </View>
        </View>

        {/* =============================================
            NEXT
        ============================================= */}

        {activeWorkout && (
          <Pressable
            style={
              styles.nextCard
            }
            onPress={() =>
              router.push({
                pathname:
                  '/workout/[workoutId]',

                params: {
                  workoutId:
                    activeWorkout.id,
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
                {activeIndex + 1}
              </Text>
            </View>

            <View style={styles.nextInfo}>
              <Text style={styles.nextLabel}>
                NÄCHSTE PRÜFUNG
              </Text>

              <Text
                style={
                  styles.nextTitle
                }
                numberOfLines={1}
              >
                {activeWorkout.title}
              </Text>

              <Text style={styles.nextSub}>
                Bereit für die nächste Station.
              </Text>
            </View>

            <View
              style={
                styles.nextArrow
              }
            >
              <Ionicons
                name="arrow-forward"
                size={19}
                color="#FFFFFF"
              />
            </View>
          </Pressable>
        )}
      </View>

      {/* =================================================
          PATH TITLE
      ================================================= */}

      <View style={styles.pathTitle}>
        <View
          style={
            styles.pathTitleLine
          }
        />

        <Text
          style={
            styles.pathTitleText
          }
        >
          DEIN WEG
        </Text>

        <View
          style={
            styles.pathTitleLine
          }
        />
      </View>

      {/* =================================================
          PATH
      ================================================= */}

      <View style={styles.path}>
        {level.workouts.map(
          (
            workout,
            index
          ) => {
            const completed =
              completedWorkoutIds.includes(
                workout.id
              );

            const previousDone =
              index === 0 ||
              completedWorkoutIds.includes(
                level.workouts[
                  index - 1
                ].id
              );

            const unlocked =
              completed ||
              previousDone;

            const active =
              unlocked &&
              !completed;

            const locked =
              !unlocked;

            const left =
              index % 2 === 0;

            const showHero =
              index ===
              activeIndex;

            return (
              <View
                key={workout.id}
                style={styles.station}
              >
                {index > 0 && (
                  <View
                    style={[
                      styles.connector,

                      (
                        completed ||
                        active
                      ) &&
                        styles.connectorActive,
                    ]}
                  />
                )}

                <View
                  style={[
                    styles.stationRow,

                    left
                      ? styles.stationLeft
                      : styles.stationRight,
                  ]}
                >
                  <Pressable
                    disabled={locked}
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
                    {active ? (
                      <ActiveNode
                        number={
                          index + 1
                        }
                      />
                    ) : (
                      <PathNode
                        number={
                          index + 1
                        }
                        completed={
                          completed
                        }
                        locked={
                          locked
                        }
                      />
                    )}
                  </Pressable>

                  {showHero && (
                    <View
                      pointerEvents="none"
                      style={[
                        styles.heroPosition,

                        left
                          ? styles.heroRight
                          : styles.heroLeft,
                      ]}
                    >
                      <PathHero
                        auraDays={
                          auraDays
                        }
                      />
                    </View>
                  )}
                </View>
              </View>
            );
          }
        )}

        {/* =================================================
            MEISTER
        ================================================= */}

        <View style={styles.connector} />

        {level.id === 1 && (
          <View style={styles.masterSection}>
            <View
              style={
                styles.masterCharacterArea
              }
            >
              <MasterCharacter />
            </View>

            <View
              style={
                styles.masterMessage
              }
            >
              <Text
                style={
                  styles.masterEyebrow
                }
              >
                DER MEISTER
              </Text>

              <Text
                style={
                  styles.masterTitle
                }
              >
                Das Ziel deines ersten Weges
              </Text>

              <Text
                style={
                  styles.masterSub
                }
              >
                Bestehe alle Prüfungen, um dich ihm zu stellen.
              </Text>
            </View>
          </View>
        )}

        {/* =================================================
            FINAL
        ================================================= */}

        <Pressable
          disabled={!finalUnlocked}
          onPress={() =>
            router.push({
              pathname:
                '/boss/[bossId]',

              params: {
                bossId:
                  level.boss.id,
              },
            })
          }
          style={[
            styles.finalCard,

            finalUnlocked &&
              styles.finalCardReady,
          ]}
        >
          <View style={styles.finalIcon}>
            <Ionicons
              name={
                finalUnlocked
                  ? 'trophy'
                  : 'lock-closed'
              }
              size={22}
              color={
                finalUnlocked
                  ? uiTheme.colors
                      .gold
                  : uiTheme.colors
                      .textMuted
              }
            />
          </View>

          <View style={styles.finalInfo}>
            <Text
              style={
                styles.finalLabel
              }
            >
              ABSCHLUSSPRÜFUNG
            </Text>

            <Text
              style={
                styles.finalTitle
              }
            >
              {level.id === 1
                ? 'Die Aufnahme'
                : level.boss.name}
            </Text>

            <Text style={styles.finalSub}>
              {!allCompleted
                ? `${level.workouts.length - completedCount} Stationen fehlen`
                : !enoughXP
                  ? `${level.boss.requiredXP - currentXP} XP fehlen`
                  : 'Bereit'}
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={21}
            color={
              finalUnlocked
                ? uiTheme.colors.gold
                : uiTheme.colors
                    .textMuted
            }
          />
        </Pressable>
      </View>
    </LinearGradient>
  );
}

// ============================================================
// STYLES
// ============================================================

const styles =
  StyleSheet.create({
    world: {
      width: '100%',
      minHeight: 1460,
    },

    // ======================================================
    // HEADER
    // ======================================================

    header: {
      paddingHorizontal: 16,
      paddingTop: 28,
    },

    chapterRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
    },

    chapterIcon: {
      width: 27,
      height: 27,
      borderRadius: 9,
      backgroundColor:
        'rgba(39,182,237,0.12)',
      alignItems: 'center',
      justifyContent: 'center',
    },

    chapter: {
      color:
        uiTheme.colors.primary,

      fontSize: 7,
      fontWeight: '900',
      letterSpacing: 2,
    },

    title: {
      color:
        uiTheme.colors.text,

      fontSize: 33,
      fontWeight: '900',
      lineHeight: 39,
      marginTop: 10,
    },

    subtitle: {
      color:
        uiTheme.colors
          .textSecondary,

      fontSize: 11,
      marginTop: 2,
    },

    // ======================================================
    // PROGRESS
    // ======================================================

    progressCard: {
      marginTop: 18,

      backgroundColor:
        uiTheme.colors.surface,

      borderRadius:
        uiTheme.radius.large,

      borderWidth: 1,

      borderColor:
        uiTheme.colors.border,

      padding: 14,
    },

    progressTop: {
      flexDirection: 'row',

      alignItems: 'center',

      justifyContent:
        'space-between',
    },

    progressLabel: {
      color:
        uiTheme.colors
          .textSecondary,

      fontSize: 6,

      fontWeight: '900',

      letterSpacing: 1.5,
    },

    progressValue: {
      color:
        uiTheme.colors.text,

      fontSize: 22,

      fontWeight: '900',

      marginTop: 3,
    },

    progressTotal: {
      color:
        uiTheme.colors.textMuted,

      fontSize: 12,
    },

    xpContainer: {
      flexDirection: 'row',

      alignItems: 'center',

      gap: 3,
    },

    xp: {
      color:
        uiTheme.colors.text,

      fontSize: 13,

      fontWeight: '900',
    },

    xpRequired: {
      color:
        uiTheme.colors
          .textSecondary,

      fontSize: 9,
    },

    progressTrack: {
      height: 6,

      marginTop: 11,

      borderRadius: 6,

      overflow: 'hidden',

      backgroundColor:
        uiTheme.colors
          .surfaceElevated,
    },

    progressFill: {
      height: '100%',

      borderRadius: 6,

      backgroundColor:
        uiTheme.colors.primary,
    },

    // ======================================================
    // NEXT
    // ======================================================

    nextCard: {
      minHeight: 82,

      marginTop: 10,

      padding: 11,

      borderRadius:
        uiTheme.radius.large,

      backgroundColor:
        uiTheme.colors.surface,

      borderWidth: 1,

      borderColor:
        uiTheme.colors.border,

      flexDirection: 'row',

      alignItems: 'center',
    },

    nextNumber: {
      width: 51,

      height: 51,

      borderRadius: 16,

      backgroundColor:
        uiTheme.colors.primaryDark,

      alignItems: 'center',

      justifyContent:
        'center',
    },

    nextNumberText: {
      color: '#FFFFFF',

      fontSize: 21,

      fontWeight: '900',
    },

    nextInfo: {
      flex: 1,

      marginLeft: 11,
    },

    nextLabel: {
      color:
        uiTheme.colors
          .primaryLight,

      fontSize: 6,

      fontWeight: '900',

      letterSpacing: 1.4,
    },

    nextTitle: {
      color:
        uiTheme.colors.text,

      fontSize: 16,

      fontWeight: '900',

      marginTop: 2,
    },

    nextSub: {
      color:
        uiTheme.colors
          .textSecondary,

      fontSize: 7,

      marginTop: 2,
    },

    nextArrow: {
      width: 37,

      height: 37,

      borderRadius: 13,

      backgroundColor:
        uiTheme.colors.primaryDark,

      alignItems: 'center',

      justifyContent:
        'center',
    },

    // ======================================================
    // PATH TITLE
    // ======================================================

    pathTitle: {
      flexDirection: 'row',

      alignItems: 'center',

      gap: 10,

      marginTop: 26,

      paddingHorizontal: 17,
    },

    pathTitleLine: {
      flex: 1,

      height: 1,

      backgroundColor:
        uiTheme.colors.border,
    },

    pathTitleText: {
      color:
        uiTheme.colors
          .textSecondary,

      fontSize: 6,

      fontWeight: '900',

      letterSpacing: 2,
    },

    // ======================================================
    // PATH
    // ======================================================

    path: {
      paddingHorizontal: 14,

      alignItems: 'center',

      paddingTop: 12,
    },

    station: {
      width: '100%',

      alignItems: 'center',
    },

    connector: {
      width: 3,

      height: 26,

      borderRadius: 2,

      backgroundColor:
        '#20333C',
    },

    connectorActive: {
      backgroundColor:
        uiTheme.colors.primary,
    },

    stationRow: {
      width: '100%',

      height: 59,

      flexDirection: 'row',

      alignItems: 'center',

      position: 'relative',
    },

    stationLeft: {
      justifyContent:
        'flex-start',

      paddingLeft: 56,
    },

    stationRight: {
      justifyContent:
        'flex-end',

      paddingRight: 56,
    },

    // ======================================================
    // NODE
    // ======================================================

    node: {
      width: 50,

      height: 50,

      borderRadius: 17,

      alignItems: 'center',

      justifyContent:
        'center',

      borderWidth: 1,
    },

    completedNode: {
      backgroundColor:
        uiTheme.colors.success,

      borderColor:
        uiTheme.colors
          .successLight,
    },

    availableNode: {
      backgroundColor:
        uiTheme.colors
          .surfaceElevated,

      borderColor:
        uiTheme.colors.primary,
    },

    lockedNode: {
      backgroundColor:
        '#0D1B22',

      borderColor:
        uiTheme.colors.borderStrong,
    },

    nodeNumber: {
      color:
        uiTheme.colors.text,

      fontSize: 17,

      fontWeight: '900',
    },

    lockedNumber: {
      color:
        uiTheme.colors.textMuted,
    },

    lockBadge: {
      position: 'absolute',

      right: 3,

      bottom: 3,

      width: 15,

      height: 15,

      borderRadius: 8,

      backgroundColor:
        uiTheme.colors.background,

      alignItems: 'center',

      justifyContent:
        'center',
    },

    // ======================================================
    // ACTIVE
    // ======================================================

    activeWrapper: {
      width: 60,

      height: 60,

      alignItems: 'center',

      justifyContent:
        'center',
    },

    activeGlow: {
      position: 'absolute',

      width: 58,

      height: 58,

      borderRadius: 19,

      backgroundColor:
        uiTheme.colors.primary,
    },

    activeNode: {
      width: 50,

      height: 50,

      borderRadius: 17,

      borderWidth: 2,

      borderColor:
        uiTheme.colors
          .primaryLight,

      backgroundColor:
        uiTheme.colors
          .primaryDark,

      alignItems: 'center',

      justifyContent:
        'center',
    },

    activeNumber: {
      color: '#FFFFFF',

      fontSize: 18,

      fontWeight: '900',
    },

    // ======================================================
    // HERO
    // ======================================================

    heroPosition: {
      position: 'absolute',

      bottom: -11,

      zIndex: 5,
    },

    heroRight: {
      right: 7,
    },

    heroLeft: {
      left: 7,
    },

    heroWrapper: {
      width: 69,

      height: 90,

      position: 'relative',

      alignItems: 'center',

      justifyContent:
        'flex-end',
    },

    heroAura: {
      position: 'absolute',

      width: 55,

      height: 69,

      bottom: 3,

      borderRadius: 29,

      backgroundColor:
        uiTheme.colors.primary,
    },

    heroImage: {
      width: 69,

      height: 90,
    },

    // ======================================================
    // MASTER
    // ======================================================

    masterSection: {
      width: '100%',

      minHeight: 165,

      marginTop: 8,

      flexDirection: 'row',

      alignItems: 'center',

      justifyContent:
        'center',
    },

    masterCharacterArea: {
      width: 105,

      alignItems: 'center',

      justifyContent:
        'center',
    },

    masterImage: {
      width: 112,

      height: 150,
    },

    masterMessage: {
      width: 175,

      padding: 13,

      marginLeft: 1,

      borderRadius:
        uiTheme.radius.large,

      backgroundColor:
        uiTheme.colors.surface,

      borderWidth: 1,

      borderColor:
        uiTheme.colors.border,
    },

    masterEyebrow: {
      color:
        uiTheme.colors.gold,

      fontSize: 6,

      fontWeight: '900',

      letterSpacing: 1.4,
    },

    masterTitle: {
      color:
        uiTheme.colors.text,

      fontSize: 14,

      fontWeight: '900',

      marginTop: 4,
    },

    masterSub: {
      color:
        uiTheme.colors
          .textSecondary,

      fontSize: 8,

      lineHeight: 12,

      marginTop: 4,
    },

    // ======================================================
    // FINAL
    // ======================================================

    finalCard: {
      width: '100%',

      minHeight: 88,

      marginTop: 6,

      marginBottom: 26,

      paddingHorizontal: 12,

      borderRadius:
        uiTheme.radius.large,

      borderWidth: 1,

      borderColor:
        uiTheme.colors.border,

      backgroundColor:
        uiTheme.colors.surface,

      flexDirection: 'row',

      alignItems: 'center',
    },

    finalCardReady: {
      borderColor:
        uiTheme.colors.gold,
    },

    finalIcon: {
      width: 46,

      height: 46,

      borderRadius: 15,

      backgroundColor:
        uiTheme.colors
          .surfaceElevated,

      alignItems: 'center',

      justifyContent:
        'center',
    },

    finalInfo: {
      flex: 1,

      marginLeft: 10,
    },

    finalLabel: {
      color:
        uiTheme.colors.gold,

      fontSize: 6,

      fontWeight: '900',

      letterSpacing: 1.3,
    },

    finalTitle: {
      color:
        uiTheme.colors.text,

      fontSize: 17,

      fontWeight: '900',

      marginTop: 2,
    },

    finalSub: {
      color:
        uiTheme.colors
          .textSecondary,

      fontSize: 7,

      marginTop: 3,
    },
  });