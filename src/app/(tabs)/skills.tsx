import Ionicons from '@expo/vector-icons/Ionicons';

import {
  useCallback,
  useState,
} from 'react';

import {
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

import {
  skillNodes,
} from '../../data/skills';

import type {
  SkillCategory,
} from '../../data/skills';

import {
  DEFAULT_PROGRESS,
  loadProgress,
} from '../../storage/progress';

import type {
  PlayerProgress,
} from '../../storage/progress';

const categories: {
  id: SkillCategory;

  title: string;

  icon:
    | 'barbell'
    | 'arrow-up'
    | 'shield'
    | 'walk'
    | 'flash';
}[] = [
  {
    id: 'push',
    title: 'Push',
    icon: 'barbell',
  },

  {
    id: 'pull',
    title: 'Pull',
    icon: 'arrow-up',
  },

  {
    id: 'core',
    title: 'Core',
    icon: 'shield',
  },

  {
    id: 'legs',
    title: 'Legs',
    icon: 'walk',
  },

  {
    id: 'skill',
    title: 'Skills',
    icon: 'flash',
  },
];

export default function SkillsScreen() {
  const [
    progress,
    setProgress,
  ] =
    useState<PlayerProgress>({
      ...DEFAULT_PROGRESS,
    });

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
          DEINE ENTWICKLUNG
        </Text>

        <Text
          style={
            styles.title
          }
        >
          Skill-Pfade
        </Text>

        <Text
          style={
            styles.subtitle
          }
        >
          Jede abgeschlossene
          Trainingsstufe bringt dich
          näher an fortgeschrittene
          Calisthenics-Skills.
        </Text>

        {categories.map(
          (category) => {
            const skills =
              skillNodes.filter(
                (skill) =>
                  skill.category ===
                  category.id
              );

            return (
              <View
                key={
                  category.id
                }
                style={
                  styles.category
                }
              >
                <View
                  style={
                    styles.categoryHeader
                  }
                >
                  <View
                    style={
                      styles.categoryIcon
                    }
                  >
                    <Ionicons
                      name={
                        category.icon
                      }
                      size={22}
                      color="#58BEFA"
                    />
                  </View>

                  <Text
                    style={
                      styles.categoryTitle
                    }
                  >
                    {
                      category.title
                    }
                  </Text>
                </View>

                {skills.map(
                  (
                    skill,
                    index
                  ) => {
                    const unlocked =
                      progress.unlockedSkillIds.includes(
                        skill.id
                      );

                    const nextUnlocked =
                      skills[
                        index + 1
                      ]
                        ? progress.unlockedSkillIds.includes(
                            skills[
                              index +
                                1
                            ].id
                          )
                        : false;

                    const current =
                      unlocked &&
                      !nextUnlocked;

                    return (
                      <View
                        key={
                          skill.id
                        }
                        style={
                          styles.nodeWrapper
                        }
                      >
                        {index >
                          0 && (
                          <View
                            style={[
                              styles.line,

                              unlocked &&
                                styles.lineActive,
                            ]}
                          />
                        )}

                        <View
                          style={
                            styles.nodeRow
                          }
                        >
                          <View
                            style={[
                              styles.node,

                              unlocked
                                ? styles.nodeUnlocked
                                : styles.nodeLocked,

                              current &&
                                styles.nodeCurrent,
                            ]}
                          >
                            <Ionicons
                              name={
                                unlocked
                                  ? current
                                    ? 'flash'
                                    : 'checkmark'
                                  : 'lock-closed'
                              }
                              size={24}
                              color={
                                unlocked
                                  ? '#FFFFFF'
                                  : '#596676'
                              }
                            />
                          </View>

                          <View
                            style={[
                              styles.skillCard,

                              !unlocked &&
                                styles.cardLocked,

                              current &&
                                styles.cardCurrent,
                            ]}
                          >
                            <Text
                              style={
                                styles.skillName
                              }
                            >
                              {skill.name}
                            </Text>

                            <Text
                              style={
                                styles.skillDescription
                              }
                            >
                              {
                                skill.description
                              }
                            </Text>

                            <Text
                              style={[
                                styles.status,

                                current &&
                                  styles.currentStatus,
                              ]}
                            >
                              {unlocked
                                ? current
                                  ? '● AKTUELL'
                                  : '✓ FREIGESCHALTET'
                                : '🔒 GESPERRT'}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  }
                )}
              </View>
            );
          }
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

      marginTop: 4,
    },

    subtitle: {
      color:
        '#748497',

      lineHeight: 20,

      marginTop: 7,
    },

    category: {
      backgroundColor:
        '#0D131A',

      borderWidth: 1,

      borderColor:
        '#192632',

      borderRadius:
        25,

      padding: 17,

      marginTop: 30,
    },

    categoryHeader: {
      flexDirection:
        'row',

      alignItems:
        'center',

      gap: 12,

      marginBottom: 15,
    },

    categoryIcon: {
      width: 47,

      height: 47,

      borderRadius:
        15,

      backgroundColor:
        '#102B40',

      alignItems:
        'center',

      justifyContent:
        'center',
    },

    categoryTitle: {
      color:
        '#FFFFFF',

      fontSize: 21,

      fontWeight:
        '900',
    },

    nodeWrapper: {
      alignItems:
        'flex-start',
    },

    line: {
      width: 4,

      height: 25,

      marginLeft: 28,

      backgroundColor:
        '#29333E',
    },

    lineActive: {
      backgroundColor:
        '#2799DF',
    },

    nodeRow: {
      flexDirection:
        'row',

      alignItems:
        'center',

      width:
        '100%',
    },

    node: {
      width: 60,

      height: 60,

      borderRadius:
        30,

      borderWidth: 3,

      alignItems:
        'center',

      justifyContent:
        'center',

      zIndex: 2,
    },

    nodeUnlocked: {
      backgroundColor:
        '#126F47',

      borderColor:
        '#49E69B',
    },

    nodeCurrent: {
      backgroundColor:
        '#17618F',

      borderColor:
        '#55BFFF',
    },

    nodeLocked: {
      backgroundColor:
        '#171D24',

      borderColor:
        '#303A45',
    },

    skillCard: {
      flex: 1,

      minHeight: 82,

      marginLeft: -6,

      borderRadius:
        18,

      backgroundColor:
        '#121A23',

      borderWidth: 1,

      borderColor:
        '#263747',

      paddingVertical:
        12,

      paddingLeft: 22,

      paddingRight: 12,

      justifyContent:
        'center',
    },

    cardCurrent: {
      borderColor:
        '#2D77A6',

      backgroundColor:
        '#102332',
    },

    cardLocked: {
      opacity: 0.4,
    },

    skillName: {
      color:
        '#FFFFFF',

      fontSize: 15,

      fontWeight:
        '900',
    },

    skillDescription: {
      color:
        '#718091',

      fontSize: 10,

      marginTop: 3,
    },

    status: {
      color:
        '#4CDD98',

      fontSize: 8,

      fontWeight:
        '900',

      letterSpacing:
        1,

      marginTop: 6,
    },

    currentStatus: {
      color:
        '#58BEFA',
    },
  });