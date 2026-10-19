import Ionicons from '@expo/vector-icons/Ionicons';

import {
  router,
  useLocalSearchParams,
} from 'expo-router';

import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import type {
  PlayerProgress,
} from '../../storage/progress';

import {
  DEFAULT_PROGRESS,
  loadProgress,
} from '../../storage/progress';

import {
  findResolvedWorkoutById,
} from '../../utils/gameUtils';

import {
  getExerciseImage,
  getLevelBackground,
} from '../../data/gameAssets';

export default function WorkoutDetailsScreen() {
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

  useEffect(() => {
    let active = true;

    async function load() {
      const saved =
        await loadProgress();

      if (!active) {
        return;
      }

      setProgress(saved);
      setLoading(false);
    }

    load();

    return () => {
      active = false;
    };
  }, []);

  const result =
    useMemo(
      () =>
        findResolvedWorkoutById(
          workoutId,
          progress
        ),
      [
        workoutId,
        progress,
      ]
    );

  if (loading) {
    return (
      <SafeAreaView
        style={styles.container}
      >
        <View style={styles.center}>
          <Text style={styles.loading}>
            Training wird vorbereitet...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!result) {
    return (
      <SafeAreaView
        style={styles.container}
      >
        <View style={styles.center}>
          <Text style={styles.error}>
            Training nicht gefunden.
          </Text>

          <Pressable
            style={styles.backFallback}
            onPress={() =>
              router.back()
            }
          >
            <Text
              style={
                styles.backFallbackText
              }
            >
              ZURÜCK
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const {
    workout,
    level,
  } = result;

  const totalSets =
    workout.exercises.reduce(
      (
        sum,
        exercise
      ) =>
        sum +
        exercise.sets,
      0
    );

  const totalKcal =
    workout.exercises.reduce(
      (
        sum,
        exercise
      ) =>
        sum +
        exercise.estimatedKcal,
      0
    );

  const estimatedSeconds =
    workout.exercises.reduce(
      (
        total,
        exercise
      ) => {
        const activeTime =
          exercise.durationSeconds ??
          (
            exercise.reps ??
            8
          ) * 4;

        const work =
          activeTime *
          exercise.sets;

        const rest =
          Math.max(
            0,
            exercise.sets - 1
          ) *
          exercise.restSeconds;

        return (
          total +
          work +
          rest
        );
      },
      0
    );

  const minutes =
    Math.max(
      1,
      Math.round(
        estimatedSeconds /
          60
      )
    );

  const firstImage =
    getExerciseImage(
      workout.exercises[0]
        ?.name ?? ''
    );

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top']}
    >
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.content
        }
      >
        {/* HERO */}

        <ImageBackground
          source={
            getLevelBackground(
              level.id
            )
          }
          resizeMode="cover"
          style={styles.hero}
          imageStyle={
            styles.heroBackground
          }
        >
          <View
            style={
              styles.heroShade
            }
          />

          <View style={styles.header}>
            <Pressable
              style={styles.back}
              onPress={() =>
                router.back()
              }
            >
              <Ionicons
                name="chevron-back"
                size={23}
                color="#FFFFFF"
              />
            </Pressable>

            <View
              style={
                styles.headerCenter
              }
            >
              <Text
                style={
                  styles.headerChapter
                }
              >
                LEVEL {level.id}
              </Text>

              <Text
                style={
                  styles.headerSmall
                }
              >
                TRAINING
              </Text>
            </View>

            <View
              style={
                styles.backSpacer
              }
            />
          </View>

          <View
            style={
              styles.heroBottom
            }
          >
            <Text
              style={
                styles.eyebrow
              }
            >
              NÄCHSTE PRÜFUNG
            </Text>

            <Text
              style={
                styles.title
              }
            >
              {workout.title}
            </Text>

            <Text
              style={
                styles.description
              }
            >
              {workout.description}
            </Text>
          </View>
        </ImageBackground>

        {/* ERSTES ÜBUNGSBILD */}

        {firstImage && (
          <View
            style={
              styles.previewCard
            }
          >
            <Image
              source={firstImage}
              resizeMode="cover"
              style={
                styles.previewImage
              }
            />

            <View
              style={
                styles.previewShade
              }
            />

            <View
              style={
                styles.previewBottom
              }
            >
              <Text
                style={
                  styles.previewLabel
                }
              >
                HEUTIGE PRÜFUNG
              </Text>

              <Text
                style={
                  styles.previewTitle
                }
              >
                {
                  workout
                    .exercises[0]
                    .name
                }
              </Text>
            </View>
          </View>
        )}

        {/* INFOS */}

        <View style={styles.stats}>
          <Stat
            icon="time-outline"
            value={`${minutes}`}
            label="Min."
          />

          <View
            style={styles.divider}
          />

          <Stat
            icon="layers-outline"
            value={String(
              totalSets
            )}
            label="Sätze"
          />

          <View
            style={styles.divider}
          />

          <Stat
            icon="flame-outline"
            value={String(
              totalKcal
            )}
            label="kcal ca."
          />
        </View>

        {/* ÜBUNGEN */}

        <View
          style={
            styles.sectionHeader
          }
        >
          <Text
            style={
              styles.sectionTitle
            }
          >
            Aufgaben
          </Text>

          <Text
            style={
              styles.sectionCount
            }
          >
            {
              workout.exercises
                .length
            }{' '}
            Übungen
          </Text>
        </View>

        {workout.exercises.map(
          (
            exercise,
            index
          ) => {
            const image =
              getExerciseImage(
                exercise.name
              );

            return (
              <View
                key={
                  exercise.id
                }
                style={
                  styles.exerciseCard
                }
              >
                <View
                  style={
                    styles.exerciseImageBox
                  }
                >
                  {image ? (
                    <Image
                      source={image}
                      resizeMode="cover"
                      style={
                        styles.exerciseImage
                      }
                    />
                  ) : (
                    <View
                      style={
                        styles.placeholder
                      }
                    >
                      <Ionicons
                        name="body-outline"
                        size={35}
                        color="#5D8293"
                      />
                    </View>
                  )}

                  <View
                    style={
                      styles.indexBadge
                    }
                  >
                    <Text
                      style={
                        styles.indexText
                      }
                    >
                      {index + 1}
                    </Text>
                  </View>
                </View>

                <View
                  style={
                    styles.exerciseInfo
                  }
                >
                  <Text
                    style={
                      styles.exerciseCategory
                    }
                  >
                    {exercise.category.toUpperCase()}
                  </Text>

                  <Text
                    style={
                      styles.exerciseName
                    }
                  >
                    {exercise.name}
                  </Text>

                  <Text
                    style={
                      styles.exerciseTarget
                    }
                  >
                    {exercise.sets}{' '}
                    Sätze ·{' '}
                    {exercise.reps
                      ? `${exercise.reps} Wdh.`
                      : `${exercise.durationSeconds} Sek.`}
                  </Text>

                  <View
                    style={
                      styles.exerciseMeta
                    }
                  >
                    <Ionicons
                      name="time-outline"
                      size={12}
                      color="#84949A"
                    />

                    <Text
                      style={
                        styles.exerciseMetaText
                      }
                    >
                      {
                        exercise.restSeconds
                      }{' '}
                      Sek. Pause
                    </Text>
                  </View>
                </View>
              </View>
            );
          }
        )}

        {/* MEISTER */}

        {level.id === 1 && (
          <View
            style={
              styles.masterMessage
            }
          >
            <Ionicons
              name="eye-outline"
              size={24}
              color="#D3B274"
            />

            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={
                  styles.masterLabel
                }
              >
                DER MEISTER
              </Text>

              <Text
                style={
                  styles.masterText
                }
              >
                „Saubere Technik.
                Keine unnötige Eile.“
              </Text>
            </View>
          </View>
        )}

        {/* START */}

        <Pressable
          style={
            styles.startButton
          }
          onPress={() =>
            router.push({
              pathname:
                '/workout/run/[workoutId]',

              params: {
                workoutId:
                  workout.id,
              },
            })
          }
        >
          <Ionicons
            name="play"
            size={21}
            color="#FFFFFF"
          />

          <Text
            style={
              styles.startButtonText
            }
          >
            TRAINING STARTEN
          </Text>
        </Pressable>

        <View
          style={{
            height: 40,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon:
    | 'time-outline'
    | 'layers-outline'
    | 'flame-outline';

  value: string;

  label: string;
}) {
  return (
    <View style={styles.stat}>
      <Ionicons
        name={icon}
        size={20}
        color="#4BB8E7"
      />

      <Text
        style={
          styles.statValue
        }
      >
        {value}
      </Text>

      <Text
        style={
          styles.statLabel
        }
      >
        {label}
      </Text>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        '#081015',
    },

    content: {
      paddingHorizontal: 14,
    },

    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent:
        'center',
      padding: 25,
      backgroundColor:
        '#081015',
    },

    loading: {
      color: '#A5BCC6',
    },

    error: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '900',
    },

    backFallback: {
      marginTop: 20,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#41525A',
      paddingHorizontal: 20,
      paddingVertical: 11,
    },

    backFallbackText: {
      color: '#FFFFFF',
      fontWeight: '900',
    },

    hero: {
      height: 315,
      borderRadius: 25,
      overflow: 'hidden',
      marginTop: 4,
      padding: 15,
      justifyContent:
        'space-between',
    },

    heroBackground: {
      borderRadius: 25,
    },

    heroShade: {
      ...StyleSheet.absoluteFill,
      backgroundColor:
        'rgba(0,12,18,0.34)',
    },

    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:
        'space-between',
    },

    back: {
      width: 42,
      height: 42,
      borderRadius: 14,
      backgroundColor:
        'rgba(5,19,25,0.72)',
      borderWidth: 1,
      borderColor:
        'rgba(255,255,255,0.22)',
      alignItems: 'center',
      justifyContent:
        'center',
    },

    headerCenter: {
      alignItems: 'center',
    },

    headerChapter: {
      color: '#97DEFC',
      fontSize: 7,
      fontWeight: '900',
      letterSpacing: 1.7,
    },

    headerSmall: {
      color: '#FFFFFF',
      fontSize: 9,
      fontWeight: '900',
      letterSpacing: 1.5,
      marginTop: 2,
    },

    backSpacer: {
      width: 42,
    },

    heroBottom: {
      paddingBottom: 3,
    },

    eyebrow: {
      color: '#98E1FF',
      fontSize: 7,
      fontWeight: '900',
      letterSpacing: 1.5,
    },

    title: {
      color: '#FFFFFF',
      fontSize: 31,
      fontWeight: '900',
      marginTop: 3,
      textShadowColor:
        'rgba(0,0,0,0.7)',
      textShadowRadius: 6,
    },

    description: {
      color: '#EDF4F6',
      fontSize: 10,
      lineHeight: 15,
      maxWidth: 290,
      marginTop: 5,
      fontWeight: '600',
    },

    previewCard: {
      height: 205,
      borderRadius: 22,
      overflow: 'hidden',
      marginTop: 12,
      position: 'relative',
      borderWidth: 1,
      borderColor: '#263A43',
    },

    previewImage: {
      width: '100%',
      height: '100%',
    },

    previewShade: {
      ...StyleSheet.absoluteFill,
      backgroundColor:
        'rgba(0,0,0,0.12)',
    },

    previewBottom: {
      position: 'absolute',
      left: 14,
      right: 14,
      bottom: 13,
    },

    previewLabel: {
      color: '#A1E5FF',
      fontSize: 7,
      fontWeight: '900',
      letterSpacing: 1.3,
      textShadowColor:
        '#000000',
      textShadowRadius: 5,
    },

    previewTitle: {
      color: '#FFFFFF',
      fontSize: 20,
      fontWeight: '900',
      textShadowColor:
        '#000000',
      textShadowRadius: 5,
      marginTop: 2,
    },

    stats: {
      minHeight: 77,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor:
        '#101B21',
      borderRadius: 19,
      borderWidth: 1,
      borderColor: '#263A43',
      marginTop: 11,
    },

    stat: {
      flex: 1,
      alignItems: 'center',
    },

    statValue: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '900',
      marginTop: 3,
    },

    statLabel: {
      color: '#84969D',
      fontSize: 7,
      marginTop: 1,
    },

    divider: {
      width: 1,
      height: 31,
      backgroundColor:
        '#2A3C43',
    },

    sectionHeader: {
      flexDirection: 'row',
      justifyContent:
        'space-between',
      alignItems: 'center',
      marginTop: 24,
      marginBottom: 9,
    },

    sectionTitle: {
      color: '#FFFFFF',
      fontSize: 19,
      fontWeight: '900',
    },

    sectionCount: {
      color: '#81949B',
      fontSize: 8,
      fontWeight: '800',
    },

    exerciseCard: {
      minHeight: 112,
      backgroundColor:
        '#101A20',
      borderRadius: 18,
      borderWidth: 1,
      borderColor: '#26373E',
      padding: 9,
      flexDirection: 'row',
      gap: 11,
      marginBottom: 9,
    },

    exerciseImageBox: {
      width: 100,
      height: 94,
      borderRadius: 14,
      overflow: 'hidden',
      backgroundColor:
        '#17252C',
      position: 'relative',
    },

    exerciseImage: {
      width: '100%',
      height: '100%',
    },

    placeholder: {
      flex: 1,
      alignItems: 'center',
      justifyContent:
        'center',
    },

    indexBadge: {
      position: 'absolute',
      top: 5,
      left: 5,
      width: 24,
      height: 24,
      borderRadius: 8,
      backgroundColor:
        'rgba(2,17,25,0.8)',
      alignItems: 'center',
      justifyContent:
        'center',
    },

    indexText: {
      color: '#FFFFFF',
      fontSize: 8,
      fontWeight: '900',
    },

    exerciseInfo: {
      flex: 1,
      justifyContent:
        'center',
    },

    exerciseCategory: {
      color: '#52BCE8',
      fontSize: 6,
      fontWeight: '900',
      letterSpacing: 1.2,
    },

    exerciseName: {
      color: '#FFFFFF',
      fontSize: 15,
      fontWeight: '900',
      marginTop: 3,
    },

    exerciseTarget: {
      color: '#A9B8BE',
      fontSize: 9,
      marginTop: 4,
    },

    exerciseMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginTop: 6,
    },

    exerciseMetaText: {
      color: '#81939A',
      fontSize: 8,
    },

    masterMessage: {
      minHeight: 79,
      backgroundColor:
        '#1B1A16',
      borderRadius: 17,
      borderWidth: 1,
      borderColor: '#594A31',
      padding: 13,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 11,
      marginTop: 5,
    },

    masterLabel: {
      color: '#D2B06E',
      fontSize: 7,
      fontWeight: '900',
      letterSpacing: 1.3,
    },

    masterText: {
      color: '#E9E2D2',
      fontSize: 10,
      fontStyle: 'italic',
      marginTop: 3,
    },

    startButton: {
      minHeight: 63,
      borderRadius: 18,
      backgroundColor:
        '#1683B4',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:
        'center',
      gap: 8,
      marginTop: 14,
    },

    startButtonText: {
      color: '#FFFFFF',
      fontSize: 13,
      fontWeight: '900',
      letterSpacing: 0.5,
    },
  });