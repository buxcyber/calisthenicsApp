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
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  LinearGradient,
} from 'expo-linear-gradient';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import HeroAvatar from '../../components/HeroAvatar';

import {
  getAuraState,
  getTrainingProfile,
} from '../../data/trainingProfiles';

import {
  DEFAULT_PROGRESS,
  loadProgress,
} from '../../storage/progress';

import type {
  PlayerProgress,
} from '../../storage/progress';

import {
  formatTrainingTime,
  getPlayerLevel,
  getPlayerRank,
} from '../../utils/gameUtils';

export default function ProfileScreen() {
  const [
    progress,
    setProgress,
  ] =
    useState<PlayerProgress>({
      ...DEFAULT_PROGRESS,
    });

  useFocusEffect(
    useCallback(() => {
      let active =
        true;

      async function refresh() {
        const saved =
          await loadProgress();

        if (
          !saved.onboardingCompleted ||
          !saved.trainingProfile
        ) {
          router.replace(
            '/onboarding'
          );

          return;
        }

        if (
          active
        ) {
          setProgress(
            saved
          );
        }
      }

      refresh();

      return () => {
        active =
          false;
      };
    }, [])
  );

  const level =
    getPlayerLevel(
      progress.xp
    );

  const rank =
    getPlayerRank(
      progress.xp
    );

  const aura =
    getAuraState(
      progress.currentStreak
    );

  const profile =
    getTrainingProfile(
      progress.trainingProfile
    );

  return (
    <SafeAreaView
      style={
        styles.container
      }
    >
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.content
        }
      >
        <Text
          style={
            styles.eyebrow
          }
        >
          DEIN CHARAKTER
        </Text>

        <Text
          style={
            styles.title
          }
        >
          Held
        </Text>

        <LinearGradient
          colors={[
            '#DCEFFA',
            '#EEF4EC',
            '#F4F2E5',
          ]}
          style={
            styles.heroCard
          }
        >
          <HeroAvatar
            unlockedLevelIds={
              progress.unlockedLevelIds
            }
            auraDays={
              progress.currentStreak
            }
            size={165}
            showInfo
          />

          <View
            style={
              styles.rankBadge
            }
          >
            <Text
              style={
                styles.rankText
              }
            >
              {rank.toUpperCase()}
            </Text>
          </View>

          <Text
            style={
              styles.level
            }
          >
            Spielerlevel{' '}
            {level}
          </Text>

          <Text
            style={
              styles.xp
            }
          >
            {progress.xp}{' '}
            XP
          </Text>
        </LinearGradient>

        <Text
          style={
            styles.sectionTitle
          }
        >
          Trainingsniveau
        </Text>

        <View
          style={
            styles.profileCard
          }
        >
          <View
            style={[
              styles.profileIcon,

              {
                backgroundColor:
                  `${profile.color}18`,
              },
            ]}
          >
            <Ionicons
              name={
                profile.icon
              }
              size={27}
              color={
                profile.color
              }
            />
          </View>

          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={
                styles.profileLabel
              }
            >
              AKTUELLES NIVEAU
            </Text>

            <Text
              style={
                styles.profileName
              }
            >
              {
                profile.name
              }
            </Text>

            <Text
              style={
                styles.profileDescription
              }
            >
              {
                profile.subtitle
              }
            </Text>
          </View>
        </View>

        <Text
          style={
            styles.sectionTitle
          }
        >
          Aura
        </Text>

        <View
          style={
            styles.auraCard
          }
        >
          <View
            style={[
              styles.auraCircle,

              {
                borderColor:
                  aura.color,

                backgroundColor:
                  `${aura.color}18`,
              },
            ]}
          >
            <Ionicons
              name="flame"
              size={32}
              color={
                aura.color
              }
            />
          </View>

          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={
                styles.auraLabel
              }
            >
              AKTUELLE AURA
            </Text>

            <Text
              style={[
                styles.auraValue,

                {
                  color:
                    aura.color,
                },
              ]}
            >
              {
                progress.currentStreak
              }{' '}
              Tage
            </Text>

            <Text
              style={
                styles.auraTitle
              }
            >
              {
                aura.title
              }
            </Text>

            <Text
              style={
                styles.auraDescription
              }
            >
              {
                aura.description
              }
            </Text>

            <Text
              style={
                styles.bestAura
              }
            >
              Beste Aura:{' '}
              {
                progress.bestStreak
              }{' '}
              Tage
            </Text>
          </View>
        </View>

        <Text
          style={
            styles.sectionTitle
          }
        >
          Fortschritt
        </Text>

        <View
          style={
            styles.stats
          }
        >
          <Stat
            icon="barbell"
            value={
              progress.totalWorkouts
            }
            label="Trainings"
          />

          <Stat
            icon="layers"
            value={
              progress.totalSetsCompleted
            }
            label="Sätze"
          />

          <Stat
            icon="time"
            value={
              formatTrainingTime(
                progress.totalTrainingSeconds
              )
            }
            label="Zeit"
            small
          />

          <Stat
            icon="flash"
            value={
              progress.totalKcal
            }
            label="kcal"
          />
        </View>

        <View
          style={
            styles.storyCard
          }
        >
          <Ionicons
            name="book-outline"
            size={24}
            color="#378CB3"
          />

          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={
                styles.storyLabel
              }
            >
              STORY
            </Text>

            <Text
              style={
                styles.storyTitle
              }
            >
              Kapitel I · Die Aufnahme
            </Text>

            <Text
              style={
                styles.storyText
              }
            >
              Beweise dem Meister,
              dass du bereit bist,
              sein Schüler zu werden.
            </Text>
          </View>
        </View>

        <View
          style={{
            height: 120,
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
  small = false,
}: {
  icon:
    | 'barbell'
    | 'layers'
    | 'time'
    | 'flash';

  value:
    | number
    | string;

  label: string;

  small?: boolean;
}) {
  return (
    <View
      style={
        styles.stat
      }
    >
      <Ionicons
        name={icon}
        size={20}
        color="#398EBA"
      />

      <Text
        style={[
          styles.statValue,

          small &&
            styles.statValueSmall,
        ]}
        numberOfLines={
          1
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
        '#F0F3EC',
    },

    content: {
      padding: 20,
    },

    eyebrow: {
      color:
        '#278CC5',

      fontSize: 8,

      fontWeight:
        '900',

      letterSpacing:
        2,
    },

    title: {
      color:
        '#1B2A32',

      fontSize: 35,

      fontWeight:
        '900',

      marginTop: 2,

      marginBottom: 16,
    },

    heroCard: {
      minHeight: 310,

      borderRadius:
        27,

      borderWidth: 1,

      borderColor:
        '#BDD6DB',

      alignItems:
        'center',

      justifyContent:
        'center',

      padding: 20,
    },

    rankBadge: {
      backgroundColor:
        '#D9ECF4',

      borderRadius:
        10,

      paddingHorizontal:
        10,

      paddingVertical: 5,

      marginTop: 13,
    },

    rankText: {
      color:
        '#278CC5',

      fontSize: 8,

      fontWeight:
        '900',

      letterSpacing:
        1.3,
    },

    level: {
      color:
        '#30454F',

      fontSize: 15,

      fontWeight:
        '900',

      marginTop: 9,
    },

    xp: {
      color:
        '#70858E',

      fontSize: 10,

      marginTop: 2,
    },

    sectionTitle: {
      color:
        '#263840',

      fontSize: 19,

      fontWeight:
        '900',

      marginTop: 26,

      marginBottom: 10,
    },

    profileCard: {
      minHeight: 90,

      borderRadius:
        19,

      backgroundColor:
        '#FFFFFF',

      borderWidth: 1,

      borderColor:
        '#D5DFDF',

      flexDirection:
        'row',

      alignItems:
        'center',

      padding: 14,

      gap: 12,
    },

    profileIcon: {
      width: 53,

      height: 53,

      borderRadius:
        17,

      alignItems:
        'center',

      justifyContent:
        'center',
    },

    profileLabel: {
      color:
        '#78909B',

      fontSize: 7,

      fontWeight:
        '900',

      letterSpacing:
        1.3,
    },

    profileName: {
      color:
        '#273A43',

      fontSize: 18,

      fontWeight:
        '900',

      marginTop: 2,
    },

    profileDescription: {
      color:
        '#6F8189',

      fontSize: 9,

      marginTop: 2,
    },

    auraCard: {
      minHeight: 130,

      borderRadius:
        20,

      backgroundColor:
        '#FFFFFF',

      borderWidth: 1,

      borderColor:
        '#D5DFDF',

      flexDirection:
        'row',

      alignItems:
        'center',

      gap: 14,

      padding: 16,
    },

    auraCircle: {
      width: 68,

      height: 68,

      borderRadius:
        34,

      borderWidth: 2,

      alignItems:
        'center',

      justifyContent:
        'center',
    },

    auraLabel: {
      color:
        '#7A8D96',

      fontSize: 7,

      fontWeight:
        '900',

      letterSpacing:
        1.3,
    },

    auraValue: {
      fontSize: 23,

      fontWeight:
        '900',

      marginTop: 2,
    },

    auraTitle: {
      color:
        '#344951',

      fontSize: 11,

      fontWeight:
        '900',

      marginTop: 2,
    },

    auraDescription: {
      color:
        '#72848B',

      fontSize: 8,

      marginTop: 2,
    },

    bestAura: {
      color:
        '#87969C',

      fontSize: 7,

      marginTop: 5,
    },

    stats: {
      flexDirection:
        'row',

      flexWrap:
        'wrap',

      gap: 9,
    },

    stat: {
      width:
        '48.5%',

      minHeight: 100,

      backgroundColor:
        '#FFFFFF',

      borderWidth: 1,

      borderColor:
        '#D5DFDF',

      borderRadius:
        18,

      alignItems:
        'center',

      justifyContent:
        'center',
    },

    statValue: {
      color:
        '#293C45',

      fontSize: 20,

      fontWeight:
        '900',

      marginTop: 5,
    },

    statValueSmall: {
      fontSize: 13,
    },

    statLabel: {
      color:
        '#7E8E95',

      fontSize: 8,

      marginTop: 2,
    },

    storyCard: {
      minHeight: 95,

      backgroundColor:
        '#E2F0F3',

      borderWidth: 1,

      borderColor:
        '#C3DCE2',

      borderRadius:
        19,

      flexDirection:
        'row',

      alignItems:
        'center',

      gap: 12,

      padding: 15,

      marginTop: 25,
    },

    storyLabel: {
      color:
        '#378CB3',

      fontSize: 7,

      fontWeight:
        '900',

      letterSpacing:
        1.4,
    },

    storyTitle: {
      color:
        '#29434E',

      fontSize: 13,

      fontWeight:
        '900',

      marginTop: 2,
    },

    storyText: {
      color:
        '#68808A',

      fontSize: 9,

      lineHeight: 14,

      marginTop: 3,
    },
  });