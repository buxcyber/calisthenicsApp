import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useEffect, useState } from 'react';

import { levels } from '../data/levels';

import {
    DEFAULT_PROGRESS,
    loadProgress,
    saveProgress,
} from '../storage/progress';

import type {
    PlayerProgress,
} from '../storage/progress';

export default function DeveloperScreen() {
  const [progress, setProgress] =
    useState<PlayerProgress>({
      ...DEFAULT_PROGRESS,
    });

  const refresh = async () => {
    const saved =
      await loadProgress();

    setProgress(saved);
  };

  useEffect(() => {
    refresh();
  }, []);

  const updateProgress = async (
    newProgress: PlayerProgress
  ) => {
    await saveProgress(newProgress);

    setProgress(newProgress);
  };

  // =========================================================
  // XP
  // =========================================================

  const addXP = async (
    amount: number
  ) => {
    const current =
      await loadProgress();

    const updated: PlayerProgress = {
      ...current,

      xp:
        current.xp +
        amount,
    };

    await updateProgress(updated);
  };

  // =========================================================
  // LEVEL TRAININGS ABSCHLIESSEN
  // =========================================================

  const completeLevelWorkouts =
    async (levelId: number) => {
      const level =
        levels.find(
          (item) =>
            item.id === levelId
        );

      if (!level) {
        return;
      }

      const current =
        await loadProgress();

      const workoutIds =
        level.workouts.map(
          (workout) =>
            workout.id
        );

      const newCompletedIds =
        Array.from(
          new Set([
            ...current.completedWorkoutIds,
            ...workoutIds,
          ])
        );

      const updated: PlayerProgress = {
        ...current,

        completedWorkoutIds:
          newCompletedIds,

        unlockedLevelIds:
          Array.from(
            new Set([
              ...current.unlockedLevelIds,
              levelId,
            ])
          ),
      };

      await updateProgress(updated);
    };

  // =========================================================
  // BOSS FREISCHALTEN
  // =========================================================

  const unlockBoss =
    async (levelId: number) => {
      const level =
        levels.find(
          (item) =>
            item.id === levelId
        );

      if (!level) {
        return;
      }

      const current =
        await loadProgress();

      const workoutIds =
        level.workouts.map(
          (workout) =>
            workout.id
        );

      const updated: PlayerProgress = {
        ...current,

        xp: Math.max(
          current.xp,
          level.boss.requiredXP
        ),

        completedWorkoutIds:
          Array.from(
            new Set([
              ...current.completedWorkoutIds,
              ...workoutIds,
            ])
          ),

        unlockedLevelIds:
          Array.from(
            new Set([
              ...current.unlockedLevelIds,
              levelId,
            ])
          ),
      };

      await updateProgress(updated);
    };

  // =========================================================
  // BOSS DIREKT ALS BESIEGT MARKIEREN
  // =========================================================

  const defeatBoss =
    async (levelId: number) => {
      const level =
        levels.find(
          (item) =>
            item.id === levelId
        );

      if (!level) {
        return;
      }

      const current =
        await loadProgress();

      const alreadyDefeated =
        current.defeatedBossIds.includes(
          level.boss.id
        );

      const nextLevelId =
        levelId + 1;

      const updated: PlayerProgress = {
        ...current,

        defeatedBossIds:
          Array.from(
            new Set([
              ...current.defeatedBossIds,
              level.boss.id,
            ])
          ),

        bossDefeats: {
          ...current.bossDefeats,

          [level.boss.id]:
            Math.max(
              current.bossDefeats[
                level.boss.id
              ] ?? 0,
              1
            ),
        },

        xp: alreadyDefeated
          ? current.xp
          : current.xp +
            level.boss.rewardXP,

        unlockedLevelIds:
          Array.from(
            new Set([
              ...current.unlockedLevelIds,
              nextLevelId,
            ])
          ),
      };

      await updateProgress(updated);
    };

  // =========================================================
  // ALLE LEVEL FREISCHALTEN
  // =========================================================

  const unlockAllLevels =
    async () => {
      const current =
        await loadProgress();

      const allLevelIds =
        levels.map(
          (level) =>
            level.id
        );

      const updated: PlayerProgress = {
        ...current,

        unlockedLevelIds:
          Array.from(
            new Set([
              ...current.unlockedLevelIds,
              ...allLevelIds,
            ])
          ),
      };

      await updateProgress(updated);
    };

  // =========================================================
  // ALLES ABSCHLIESSEN
  // =========================================================

  const completeEverything =
    async () => {
      const current =
        await loadProgress();

      const allWorkoutIds =
        levels.flatMap(
          (level) =>
            level.workouts.map(
              (workout) =>
                workout.id
            )
        );

      const allBossIds =
        levels.map(
          (level) =>
            level.boss.id
        );

      const allLevelIds =
        levels.map(
          (level) =>
            level.id
        );

      const bossDefeats: Record<
        string,
        number
      > = {};

      allBossIds.forEach(
        (bossId) => {
          bossDefeats[bossId] =
            1;
        }
      );

      const highestRequiredXP =
        Math.max(
          ...levels.map(
            (level) =>
              level.boss
                .requiredXP
          )
        );

      const updated: PlayerProgress = {
        ...current,

        xp: Math.max(
          current.xp,
          highestRequiredXP +
            500
        ),

        completedWorkoutIds:
          allWorkoutIds,

        defeatedBossIds:
          allBossIds,

        bossDefeats,

        unlockedLevelIds:
          allLevelIds,
      };

      await updateProgress(updated);
    };

  // =========================================================
  // RESET
  // =========================================================

  const resetProgress = () => {
    Alert.alert(
      'Fortschritt zurücksetzen?',
      'Alle XP, Trainings und Boss-Siege werden gelöscht.',
      [
        {
          text: 'Abbrechen',

          style: 'cancel',
        },

        {
          text: 'Zurücksetzen',

          style:
            'destructive',

          onPress:
            async () => {
              const reset: PlayerProgress = {
                ...DEFAULT_PROGRESS,

                completedWorkoutIds:
                  [],

                completedExerciseIds:
                  [],

                defeatedBossIds:
                  [],

                bossDefeats:
                  {},

                unlockedLevelIds:
                  [1],
              };

              await updateProgress(
                reset
              );
            },
        },
      ]
    );
  };

  return (
    <SafeAreaView
      style={styles.container}
    >
      {/* HEADER */}

      <View style={styles.header}>
        <Pressable
          style={
            styles.backButton
          }
          onPress={() =>
            router.back()
          }
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color="#FFFFFF"
          />
        </Pressable>

        <View>
          <Text
            style={
              styles.headerLabel
            }
          >
            DEVELOPMENT
          </Text>

          <Text
            style={
              styles.headerTitle
            }
          >
            Testmenü
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.content
        }
      >
        {/* STATUS */}

        <View
          style={styles.statusCard}
        >
          <Text
            style={
              styles.sectionLabel
            }
          >
            AKTUELLER SPIELSTAND
          </Text>

          <View
            style={
              styles.statusGrid
            }
          >
            <View
              style={
                styles.statusItem
              }
            >
              <Text
                style={
                  styles.statusValue
                }
              >
                {progress.xp}
              </Text>

              <Text
                style={
                  styles.statusName
                }
              >
                XP
              </Text>
            </View>

            <View
              style={
                styles.statusItem
              }
            >
              <Text
                style={
                  styles.statusValue
                }
              >
                {
                  progress
                    .completedWorkoutIds
                    .length
                }
              </Text>

              <Text
                style={
                  styles.statusName
                }
              >
                Workouts
              </Text>
            </View>

            <View
              style={
                styles.statusItem
              }
            >
              <Text
                style={
                  styles.statusValue
                }
              >
                {
                  progress
                    .defeatedBossIds
                    .length
                }
              </Text>

              <Text
                style={
                  styles.statusName
                }
              >
                Bosse
              </Text>
            </View>

            <View
              style={
                styles.statusItem
              }
            >
              <Text
                style={
                  styles.statusValue
                }
              >
                {progress.unlockedLevelIds.join(
                  ', '
                )}
              </Text>

              <Text
                style={
                  styles.statusName
                }
              >
                Level
              </Text>
            </View>
          </View>
        </View>

        {/* XP */}

        <Text style={styles.title}>
          XP
        </Text>

        <View
          style={styles.buttonRow}
        >
          <DevButton
            title="+100 XP"
            icon="flash"
            onPress={() =>
              addXP(100)
            }
          />

          <DevButton
            title="+500 XP"
            icon="flash"
            onPress={() =>
              addXP(500)
            }
          />
        </View>

        {/* LEVEL 1 */}

        <Text style={styles.title}>
          Level 1 · Awakening
        </Text>

        <DevButton
          title="Alle Level-1-Trainings abschließen"
          subtitle="Markiert die 14 Stationen als erledigt"
          icon="checkmark-circle"
          onPress={() =>
            completeLevelWorkouts(
              1
            )
          }
        />

        <DevButton
          title="Torwächter freischalten"
          subtitle="Alle Trainings + benötigte XP"
          icon="lock-open"
          onPress={() =>
            unlockBoss(1)
          }
        />

        <DevButton
          title="Torwächter besiegen"
          subtitle="Überspringt den Bosskampf und öffnet Level 2"
          icon="skull"
          onPress={() =>
            defeatBoss(1)
          }
        />

        {/* LEVEL 2 */}

        <Text style={styles.title}>
          Level 2 · Power Build
        </Text>

        <DevButton
          title="Alle Level-2-Trainings abschließen"
          subtitle="Markiert den kompletten Power-Build-Pfad"
          icon="checkmark-circle"
          onPress={() =>
            completeLevelWorkouts(
              2
            )
          }
        />

        <DevButton
          title="Brecher freischalten"
          subtitle="Alle Level-2-Trainings + benötigte XP"
          icon="lock-open"
          onPress={() =>
            unlockBoss(2)
          }
        />

        <DevButton
          title="Brecher besiegen"
          subtitle="Boss wird direkt als besiegt gespeichert"
          icon="skull"
          onPress={() =>
            defeatBoss(2)
          }
        />

        {/* GLOBAL */}

        <Text style={styles.title}>
          Global
        </Text>

        <DevButton
          title="Alle Level freischalten"
          subtitle="Zeigt alle vorhandenen Weltabschnitte"
          icon="map"
          onPress={
            unlockAllLevels
          }
        />

        <DevButton
          title="Alles abschließen"
          subtitle="Workouts, XP, Bosse und Level"
          icon="trophy"
          onPress={
            completeEverything
          }
        />

        <Pressable
          style={
            styles.resetButton
          }
          onPress={
            resetProgress
          }
        >
          <Ionicons
            name="trash-outline"
            size={21}
            color="#FF6B74"
          />

          <View style={{ flex: 1 }}>
            <Text
              style={
                styles.resetTitle
              }
            >
              Fortschritt zurücksetzen
            </Text>

            <Text
              style={
                styles.resetSubtitle
              }
            >
              Zurück auf den ersten
              Spielstart
            </Text>
          </View>
        </Pressable>

        <View
          style={{
            height: 80,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// ===========================================================
// DEV BUTTON
// ===========================================================

type DevButtonProps = {
  title: string;

  subtitle?: string;

  icon:
    | 'flash'
    | 'checkmark-circle'
    | 'lock-open'
    | 'skull'
    | 'map'
    | 'trophy';

  onPress: () => void;
};

function DevButton({
  title,
  subtitle,
  icon,
  onPress,
}: DevButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.devButton,

        pressed && {
          opacity: 0.7,

          transform: [
            {
              scale: 0.98,
            },
          ],
        },
      ]}
      onPress={onPress}
    >
      <View
        style={
          styles.devIcon
        }
      >
        <Ionicons
          name={icon}
          size={21}
          color="#55BFFF"
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={
            styles.devButtonTitle
          }
        >
          {title}
        </Text>

        {subtitle && (
          <Text
            style={
              styles.devButtonSubtitle
            }
          >
            {subtitle}
          </Text>
        )}
      </View>

      <Ionicons
        name="chevron-forward"
        size={19}
        color="#53677D"
      />
    </Pressable>
  );
}

// ===========================================================
// STYLES
// ===========================================================

const styles =
  StyleSheet.create({
    container: {
      flex: 1,

      backgroundColor: '#070B11',
    },

    header: {
      flexDirection: 'row',

      alignItems: 'center',

      gap: 15,

      paddingHorizontal: 20,

      paddingVertical: 15,

      borderBottomWidth: 1,

      borderBottomColor:
        '#17212C',
    },

    backButton: {
      width: 45,

      height: 45,

      borderRadius: 15,

      backgroundColor:
        '#121A24',

      alignItems: 'center',

      justifyContent:
        'center',
    },

    headerLabel: {
      color: '#3DA5FF',

      fontSize: 9,

      fontWeight: '900',

      letterSpacing: 1.8,
    },

    headerTitle: {
      color: '#FFFFFF',

      fontSize: 25,

      fontWeight: '900',
    },

    content: {
      padding: 20,
    },

    statusCard: {
      backgroundColor:
        '#111923',

      borderRadius: 24,

      borderWidth: 1,

      borderColor:
        '#26394B',

      padding: 20,
    },

    sectionLabel: {
      color: '#62788E',

      fontSize: 10,

      fontWeight: '900',

      letterSpacing: 1.5,
    },

    statusGrid: {
      flexDirection: 'row',

      marginTop: 18,
    },

    statusItem: {
      flex: 1,

      alignItems: 'center',
    },

    statusValue: {
      color: '#FFFFFF',

      fontSize: 20,

      fontWeight: '900',
    },

    statusName: {
      color: '#66788B',

      fontSize: 10,

      marginTop: 3,
    },

    title: {
      color: '#FFFFFF',

      fontSize: 17,

      fontWeight: '900',

      marginTop: 30,

      marginBottom: 11,
    },

    buttonRow: {
      flexDirection: 'row',

      gap: 10,
    },

    devButton: {
      flex: 1,

      minHeight: 70,

      backgroundColor:
        '#111923',

      borderRadius: 18,

      borderWidth: 1,

      borderColor:
        '#26394B',

      paddingHorizontal: 15,

      paddingVertical: 14,

      flexDirection: 'row',

      alignItems: 'center',

      gap: 12,

      marginBottom: 10,
    },

    devIcon: {
      width: 40,

      height: 40,

      borderRadius: 13,

      backgroundColor:
        '#102B41',

      alignItems: 'center',

      justifyContent:
        'center',
    },

    devButtonTitle: {
      color: '#FFFFFF',

      fontWeight: '800',

      fontSize: 13,
    },

    devButtonSubtitle: {
      color: '#68798B',

      fontSize: 10,

      lineHeight: 14,

      marginTop: 4,
    },

    resetButton: {
      minHeight: 75,

      backgroundColor:
        '#241418',

      borderRadius: 18,

      borderWidth: 1,

      borderColor:
        '#622E35',

      padding: 16,

      flexDirection: 'row',

      alignItems: 'center',

      gap: 13,

      marginTop: 10,
    },

    resetTitle: {
      color: '#FF7A82',

      fontWeight: '900',
    },

    resetSubtitle: {
      color: '#93676B',

      fontSize: 11,

      marginTop: 4,
    },
  });