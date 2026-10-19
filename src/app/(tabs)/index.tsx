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

import LevelPath from '../../components/LevelPath';

import {
  levels as calisthenicsLevels,
} from '../../data/levels';

import {
  gluteLevels,
} from '../../data/gluteLevels';

import {
  DEFAULT_PROGRESS,
  loadProgress,
} from '../../storage/progress';

import type {
  PlayerProgress,
} from '../../storage/progress';

import {
  getPlayerLevel,
} from '../../utils/gameUtils';

import {
  uiTheme,
} from '../../theme/uiTheme';

export default function HomeScreen() {
  const [
    progress,
    setProgress,
  ] = useState<PlayerProgress>({
    ...DEFAULT_PROGRESS,
  });

  const [
    loading,
    setLoading,
  ] = useState(true);

  const refresh =
    useCallback(
      async () => {
        const saved =
          await loadProgress();

        if (
          !saved.onboardingCompleted ||
          !saved.trainingProfile
        ) {
          setLoading(false);

          router.replace(
            '/onboarding'
          );

          return;
        }

        setProgress(saved);

        setLoading(false);
      },
      []
    );

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  if (loading) {
    return (
      <SafeAreaView
        style={
          styles.loadingScreen
        }
      >
        <Ionicons
          name="flash"
          size={26}
          color={
            uiTheme.colors.primary
          }
        />

        <Text
          style={
            styles.loadingText
          }
        >
          Dein Weg wird geladen
        </Text>
      </SafeAreaView>
    );
  }

  const gluteMode =
    progress.trainingProfile ===
    'glute-focus';

  const safeCalisthenicsLevels =
    Array.isArray(
      calisthenicsLevels
    )
      ? calisthenicsLevels
      : [];

  const safeGluteLevels =
    Array.isArray(
      gluteLevels
    )
      ? gluteLevels
      : [];

  const levels =
    gluteMode
      ? safeGluteLevels
      : safeCalisthenicsLevels;

  const playerLevel =
    getPlayerLevel(
      progress.xp
    );

  const xpInCurrentLevel =
    progress.xp % 500;

  const xpPercent =
    Math.min(
      100,
      (
        xpInCurrentLevel /
        500
      ) *
        100
    );

  const unlockedLevelIds =
    Array.isArray(
      progress.unlockedLevelIds
    )
      ? progress.unlockedLevelIds
      : [1];

  const unlockedLevels =
    levels.filter(
      (level) =>
        unlockedLevelIds.includes(
          level.id
        )
    );

  const visibleLevels =
    unlockedLevels.length > 0
      ? unlockedLevels
      : levels.length > 0
        ? [levels[0]]
        : [];

  return (
    <SafeAreaView
      style={
        styles.screen
      }
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
        {/* HEADER */}

        <View
          style={
            styles.topBar
          }
        >
          <View
            style={
              styles.playerArea
            }
          >
            <View
              style={
                styles.avatar
              }
            >
              <Ionicons
                name={
                  gluteMode
                    ? 'body-outline'
                    : 'person-outline'
                }
                size={21}
                color={
                  uiTheme.colors.text
                }
              />
            </View>

            <View
              style={
                styles.playerInfo
              }
            >
              <View
                style={
                  styles.levelRow
                }
              >
                <Text
                  style={
                    styles.level
                  }
                >
                  Level{' '}
                  {playerLevel}
                </Text>

                <Text
                  style={
                    styles.mode
                  }
                >
                  {gluteMode
                    ? 'GLUTE'
                    : 'CALISTHENICS'}
                </Text>
              </View>

              <View
                style={
                  styles.xpTrack
                }
              >
                <View
                  style={[
                    styles.xpFill,
                    {
                      width: `${xpPercent}%`,
                    },
                  ]}
                />
              </View>
            </View>
          </View>

          <View
            style={
              styles.topStats
            }
          >
            <View
              style={
                styles.stat
              }
            >
              <Ionicons
                name="flame"
                size={16}
                color={
                  uiTheme.colors.primary
                }
              />

              <Text
                style={
                  styles.statText
                }
              >
                {
                  progress.currentStreak
                }
              </Text>
            </View>

            <View
              style={
                styles.stat
              }
            >
              <Ionicons
                name="flash"
                size={16}
                color={
                  uiTheme.colors.primary
                }
              />

              <Text
                style={
                  styles.statText
                }
              >
                {progress.xp}
              </Text>
            </View>
          </View>
        </View>

        {/* PROGRAMM */}

        <View
          style={
            styles.program
          }
        >
          <View
            style={
              styles.programIcon
            }
          >
            <Ionicons
              name={
                gluteMode
                  ? 'body-outline'
                  : 'fitness-outline'
              }
              size={19}
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
            <Text
              style={
                styles.programLabel
              }
            >
              TRAININGSPLAN
            </Text>

            <Text
              style={
                styles.programTitle
              }
            >
              {gluteMode
                ? 'Po & Beine'
                : 'Calisthenics'}
            </Text>
          </View>

          <Pressable
            style={
              styles.changeButton
            }
            onPress={() =>
              router.push(
                '/onboarding'
              )
            }
          >
            <Text
              style={
                styles.changeText
              }
            >
              Ändern
            </Text>
          </Pressable>
        </View>

        {/* KEIN PROGRAMM */}

        {visibleLevels.length ===
          0 && (
          <View
            style={
              styles.errorCard
            }
          >
            <Ionicons
              name="alert-circle-outline"
              size={25}
              color={
                uiTheme.colors.primary
              }
            />

            <Text
              style={
                styles.errorTitle
              }
            >
              Trainingsplan konnte nicht geladen werden
            </Text>

            <Text
              style={
                styles.errorText
              }
            >
              Wähle dein Trainingsziel erneut aus.
            </Text>

            <Pressable
              style={
                styles.errorButton
              }
              onPress={() =>
                router.push(
                  '/onboarding'
                )
              }
            >
              <Text
                style={
                  styles.errorButtonText
                }
              >
                Trainingsziel wählen
              </Text>
            </Pressable>
          </View>
        )}

        {/* LEVELS */}

        {visibleLevels.map(
          (level) => (
            <LevelPath
              key={
                `${String(
                  progress.trainingProfile
                )}-${level.id}`
              }
              level={
                level
              }
              currentXP={
                progress.xp
              }
              completedWorkoutIds={
                Array.isArray(
                  progress.completedWorkoutIds
                )
                  ? progress.completedWorkoutIds
                  : []
              }
              unlockedLevelIds={
                unlockedLevelIds
              }
              auraDays={
                progress.currentStreak
              }
            />
          )
        )}

        <View
          style={{
            height: 100,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    screen: {
      flex: 1,

      backgroundColor:
        uiTheme.colors.background,
    },

    content: {
      width: '100%',
    },

    loadingScreen: {
      flex: 1,

      backgroundColor:
        uiTheme.colors.background,

      alignItems: 'center',

      justifyContent:
        'center',
    },

    loadingText: {
      color:
        uiTheme.colors
          .textSecondary,

      fontSize: 11,

      marginTop: 10,
    },

    topBar: {
      height: 75,

      paddingHorizontal: 15,

      flexDirection: 'row',

      alignItems: 'center',

      justifyContent:
        'space-between',
    },

    playerArea: {
      flex: 1,

      flexDirection: 'row',

      alignItems: 'center',
    },

    avatar: {
      width: 43,

      height: 43,

      borderRadius: 14,

      borderWidth: 1,

      borderColor:
        uiTheme.colors.border,

      backgroundColor:
        uiTheme.colors
          .surfaceElevated,

      alignItems: 'center',

      justifyContent:
        'center',
    },

    playerInfo: {
      width: 130,

      marginLeft: 9,
    },

    levelRow: {
      flexDirection: 'row',

      alignItems: 'center',

      gap: 6,
    },

    level: {
      color:
        uiTheme.colors.text,

      fontSize: 12,

      fontWeight: '900',
    },

    mode: {
      color:
        uiTheme.colors.primary,

      fontSize: 5,

      fontWeight: '900',

      letterSpacing: 0.7,
    },

    xpTrack: {
      height: 4,

      marginTop: 6,

      borderRadius: 4,

      overflow: 'hidden',

      backgroundColor:
        uiTheme.colors
          .surfaceElevated,
    },

    xpFill: {
      height: '100%',

      backgroundColor:
        uiTheme.colors.primary,
    },

    topStats: {
      flexDirection: 'row',

      gap: 6,
    },

    stat: {
      minWidth: 51,

      height: 36,

      borderRadius: 13,

      backgroundColor:
        uiTheme.colors.surface,

      borderWidth: 1,

      borderColor:
        uiTheme.colors.border,

      flexDirection: 'row',

      alignItems: 'center',

      justifyContent:
        'center',

      gap: 4,
    },

    statText: {
      color:
        uiTheme.colors.text,

      fontSize: 10,

      fontWeight: '900',
    },

    program: {
      marginHorizontal: 14,

      marginBottom: 10,

      minHeight: 65,

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

    programIcon: {
      width: 40,

      height: 40,

      borderRadius: 13,

      backgroundColor:
        'rgba(39,182,237,0.10)',

      alignItems: 'center',

      justifyContent:
        'center',
    },

    programInfo: {
      flex: 1,

      marginLeft: 10,
    },

    programLabel: {
      color:
        uiTheme.colors
          .textSecondary,

      fontSize: 6,

      fontWeight: '900',

      letterSpacing: 1.3,
    },

    programTitle: {
      color:
        uiTheme.colors.text,

      fontSize: 14,

      fontWeight: '900',

      marginTop: 2,
    },

    changeButton: {
      paddingHorizontal: 11,

      paddingVertical: 7,

      borderRadius: 10,

      backgroundColor:
        uiTheme.colors
          .surfaceElevated,
    },

    changeText: {
      color:
        uiTheme.colors.primary,

      fontSize: 8,

      fontWeight: '900',
    },

    errorCard: {
      margin: 14,

      padding: 20,

      borderRadius:
        uiTheme.radius.large,

      backgroundColor:
        uiTheme.colors.surface,

      borderWidth: 1,

      borderColor:
        uiTheme.colors.border,

      alignItems: 'center',
    },

    errorTitle: {
      color:
        uiTheme.colors.text,

      fontSize: 14,

      fontWeight: '900',

      marginTop: 10,

      textAlign: 'center',
    },

    errorText: {
      color:
        uiTheme.colors
          .textSecondary,

      fontSize: 9,

      marginTop: 5,
    },

    errorButton: {
      marginTop: 15,

      paddingHorizontal: 15,

      paddingVertical: 10,

      borderRadius: 12,

      backgroundColor:
        uiTheme.colors
          .primaryDark,
    },

    errorButtonText: {
      color: '#FFFFFF',

      fontSize: 9,

      fontWeight: '900',
    },
  });