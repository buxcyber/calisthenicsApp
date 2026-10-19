import Ionicons from '@expo/vector-icons/Ionicons';

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
  useFocusEffect,
} from 'expo-router';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import AchievementCard from '../../components/AchievementCard';

import {
  achievements,
  getAchievementProgress,
} from '../../data/achievements';

import {
  levels,
} from '../../data/levels';

import {
  skillNodes,
} from '../../data/skills';

import {
  DEFAULT_PROGRESS,
  loadProgress,
} from '../../storage/progress';

import type {
  PlayerProgress,
} from '../../storage/progress';

type CollectionTab =
  | 'skills'
  | 'achievements'
  | 'bosses';

export default function CollectionScreen() {
  const [
    progress,
    setProgress,
  ] =
    useState<PlayerProgress>({
      ...DEFAULT_PROGRESS,
    });

  const [
    tab,
    setTab,
  ] =
    useState<CollectionTab>(
      'skills'
    );

  useFocusEffect(
    useCallback(() => {
      const refresh =
        async () => {
          setProgress(
            await loadProgress()
          );
        };

      refresh();
    }, [])
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
            styles.label
          }
        >
          DEINE REISE
        </Text>

        <Text
          style={
            styles.title
          }
        >
          Sammlung
        </Text>

        <View
          style={
            styles.tabs
          }
        >
          <TabButton
            text="Skills"
            active={
              tab ===
              'skills'
            }
            onPress={() =>
              setTab(
                'skills'
              )
            }
          />

          <TabButton
            text="Orden"
            active={
              tab ===
              'achievements'
            }
            onPress={() =>
              setTab(
                'achievements'
              )
            }
          />

          <TabButton
            text="Bosse"
            active={
              tab ===
              'bosses'
            }
            onPress={() =>
              setTab(
                'bosses'
              )
            }
          />
        </View>

        {tab ===
          'skills' && (
          <SkillCollection
            progress={
              progress
            }
          />
        )}

        {tab ===
          'achievements' && (
          <>
            {achievements.map(
              (
                achievement
              ) => {
                const info =
                  getAchievementProgress(
                    achievement,
                    progress
                  );

                return (
                  <AchievementCard
                    key={
                      achievement.id
                    }
                    achievement={
                      achievement
                    }
                    unlocked={
                      progress.earnedAchievementIds.includes(
                        achievement.id
                      )
                    }
                    current={
                      info.current
                    }
                    target={
                      info.target
                    }
                  />
                );
              }
            )}
          </>
        )}

        {tab ===
          'bosses' && (
          <BossCollection
            progress={
              progress
            }
          />
        )}

        <View
          style={{
            height: 120,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function SkillCollection({
  progress,
}: {
  progress: PlayerProgress;
}) {
  return (
    <View
      style={
        styles.collectionGrid
      }
    >
      {skillNodes.map(
        (skill) => {
          const unlocked =
            progress.unlockedSkillIds.includes(
              skill.id
            );

          return (
            <View
              key={
                skill.id
              }
              style={[
                styles.skillCard,

                !unlocked &&
                  styles.lockedCard,
              ]}
            >
              <View
                style={[
                  styles.skillIcon,

                  unlocked &&
                    styles.skillIconUnlocked,
                ]}
              >
                <Ionicons
                  name={
                    unlocked
                      ? 'flash'
                      : 'lock-closed'
                  }
                  size={25}
                  color={
                    unlocked
                      ? '#5DC3FF'
                      : '#596675'
                  }
                />
              </View>

              <Text
                style={
                  styles.skillName
                }
              >
                {unlocked
                  ? skill.name
                  : '???'}
              </Text>

              <Text
                style={
                  styles.skillCategory
                }
              >
                {
                  skill.category
                }{' '}
                · LV.
                {skill.level}
              </Text>

              <View
                style={
                  styles.rarityChip
                }
              >
                <Text
                  style={
                    styles.rarityText
                  }
                >
                  {(
                    skill.rarity ??
                    'basic'
                  ).toUpperCase()}
                </Text>
              </View>
            </View>
          );
        }
      )}
    </View>
  );
}

function BossCollection({
  progress,
}: {
  progress: PlayerProgress;
}) {
  return (
    <View>
      {levels.map(
        (level) => {
          const defeated =
            progress.defeatedBossIds.includes(
              level.boss.id
            );

          return (
            <View
              key={
                level.boss.id
              }
              style={[
                styles.bigBossCard,

                !defeated &&
                  styles.lockedCard,
              ]}
            >
              <View
                style={
                  styles.bigBossIcon
                }
              >
                <Ionicons
                  name={
                    defeated
                      ? 'skull'
                      : 'lock-closed'
                  }
                  size={42}
                  color={
                    defeated
                      ? '#FF646E'
                      : '#586574'
                  }
                />
              </View>

              <Text
                style={
                  styles.bigBossLabel
                }
              >
                LEVEL{' '}
                {level.id}{' '}
                BOSS
              </Text>

              <Text
                style={
                  styles.bigBossTitle
                }
              >
                {defeated
                  ? level.boss
                      .name
                  : 'Unbekannter Boss'}
              </Text>

              <Text
                style={
                  styles.bigBossInfo
                }
              >
                {defeated
                  ? `${progress.bossDefeats[level.boss.id] ?? 1}× besiegt`
                  : 'Besiege diesen Boss, um ihn der Sammlung hinzuzufügen.'}
              </Text>
            </View>
          );
        }
      )}
    </View>
  );
}

function TabButton({
  text,
  active,
  onPress,
}: {
  text: string;

  active: boolean;

  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={
        onPress
      }
      style={[
        styles.tabButton,

        active &&
          styles.tabActive,
      ]}
    >
      <Text
        style={[
          styles.tabText,

          active &&
            styles.tabTextActive,
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,

      backgroundColor:
        '#070B11',
    },

    content: {
      padding: 20,
    },

    label: {
      color:
        '#55BFFF',

      fontSize: 10,

      fontWeight:
        '900',

      letterSpacing:
        2,
    },

    title: {
      color:
        '#FFFFFF',

      fontSize: 36,

      fontWeight:
        '900',

      marginTop: 3,

      marginBottom: 20,
    },

    tabs: {
      flexDirection:
        'row',

      backgroundColor:
        '#111820',

      borderRadius:
        18,

      padding: 5,

      marginBottom: 20,
    },

    tabButton: {
      flex: 1,

      alignItems:
        'center',

      paddingVertical:
        11,

      borderRadius:
        14,
    },

    tabActive: {
      backgroundColor:
        '#16334A',
    },

    tabText: {
      color:
        '#667585',

      fontSize: 11,

      fontWeight:
        '900',
    },

    tabTextActive: {
      color:
        '#58BEFA',
    },

    collectionGrid: {
      flexDirection:
        'row',

      flexWrap:
        'wrap',

      gap: 10,
    },

    skillCard: {
      width:
        '48%',

      minHeight:
        155,

      borderRadius:
        21,

      backgroundColor:
        '#111A23',

      borderWidth: 1,

      borderColor:
        '#284056',

      padding: 15,
    },

    lockedCard: {
      opacity: 0.45,
    },

    skillIcon: {
      width: 50,

      height: 50,

      borderRadius:
        16,

      backgroundColor:
        '#18212B',

      alignItems:
        'center',

      justifyContent:
        'center',
    },

    skillIconUnlocked: {
      backgroundColor:
        '#11324A',

      borderWidth: 1,

      borderColor:
        '#286B98',
    },

    skillName: {
      color:
        '#FFFFFF',

      fontWeight:
        '900',

      marginTop: 12,
    },

    skillCategory: {
      color:
        '#718192',

      fontSize: 9,

      marginTop: 4,

      textTransform:
        'uppercase',
    },

    rarityChip: {
      alignSelf:
        'flex-start',

      backgroundColor:
        '#1A2631',

      borderRadius: 8,

      paddingHorizontal:
        7,

      paddingVertical:
        4,

      marginTop: 10,
    },

    rarityText: {
      color:
        '#5FA9D6',

      fontSize: 7,

      fontWeight:
        '900',
    },

    bigBossCard: {
      alignItems:
        'center',

      backgroundColor:
        '#211216',

      borderWidth: 1,

      borderColor:
        '#632A32',

      borderRadius:
        25,

      padding: 24,

      marginBottom: 12,
    },

    bigBossIcon: {
      width: 85,

      height: 85,

      borderRadius:
        43,

      backgroundColor:
        '#36171D',

      alignItems:
        'center',

      justifyContent:
        'center',
    },

    bigBossLabel: {
      color:
        '#B1545D',

      fontSize: 9,

      fontWeight:
        '900',

      letterSpacing:
        1.5,

      marginTop: 17,
    },

    bigBossTitle: {
      color:
        '#FFFFFF',

      fontSize: 24,

      fontWeight:
        '900',

      marginTop: 4,
    },

    bigBossInfo: {
      color:
        '#867378',

      fontSize: 11,

      textAlign:
        'center',

      marginTop: 7,
    },
  });