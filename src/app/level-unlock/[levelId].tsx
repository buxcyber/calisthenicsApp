import Ionicons from '@expo/vector-icons/Ionicons';

import * as Haptics from 'expo-haptics';

import {
    router,
    useLocalSearchParams,
} from 'expo-router';

import {
    Animated,
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
    LinearGradient,
} from 'expo-linear-gradient';

import {
    SafeAreaView,
} from 'react-native-safe-area-context';

import HeroAvatar from '../../components/HeroAvatar';

import {
    levels,
} from '../../data/levels';

import {
    DEFAULT_PROGRESS,
    loadProgress,
} from '../../storage/progress';

import type {
    PlayerProgress,
} from '../../storage/progress';

export default function LevelUnlockScreen() {
  const {
    levelId,
  } =
    useLocalSearchParams<{
      levelId: string;
    }>();

  const numericLevelId =
    Number(levelId);

  const gameLevel =
    useMemo(
      () =>
        levels.find(
          (level) =>
            level.id ===
            numericLevelId
        ),

      [numericLevelId]
    );

  const [
    progress,
    setProgress,
  ] =
    useState<PlayerProgress>({
      ...DEFAULT_PROGRESS,
    });

  const scale =
    useRef(
      new Animated.Value(
        0.7
      )
    ).current;

  const opacity =
    useRef(
      new Animated.Value(
        0
      )
    ).current;

  const glow =
    useRef(
      new Animated.Value(
        0
      )
    ).current;

  useEffect(() => {
    const load =
      async () => {
        const saved =
          await loadProgress();

        setProgress(saved);
      };

    load();

    Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
    );

    Animated.parallel([
      Animated.spring(
        scale,
        {
          toValue: 1,

          friction: 5,

          tension: 55,

          useNativeDriver:
            true,
        }
      ),

      Animated.timing(
        opacity,
        {
          toValue: 1,

          duration: 600,

          useNativeDriver:
            true,
        }
      ),
    ]).start();

    const glowAnimation =
      Animated.loop(
        Animated.sequence([
          Animated.timing(
            glow,
            {
              toValue: 1,

              duration:
                1200,

              useNativeDriver:
                true,
            }
          ),

          Animated.timing(
            glow,
            {
              toValue: 0,

              duration:
                1200,

              useNativeDriver:
                true,
            }
          ),
        ])
      );

    glowAnimation.start();

    return () =>
      glowAnimation.stop();
  }, [
    glow,
    opacity,
    scale,
  ]);

  if (!gameLevel) {
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
            Level nicht gefunden.
          </Text>

          <Pressable
            style={
              styles.button
            }
            onPress={() =>
              router.replace(
                '/rewards'
              )
            }
          >
            <Text
              style={
                styles.buttonText
              }
            >
              WEITER
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const glowScale =
    glow.interpolate({
      inputRange:
        [0, 1],

      outputRange:
        [1, 1.12],
    });

  const glowOpacity =
    glow.interpolate({
      inputRange:
        [0, 1],

      outputRange:
        [0.12, 0.3],
    });

  return (
    <SafeAreaView
      style={
        styles.container
      }
    >
      <LinearGradient
        colors={[
          '#122F47',
          '#091722',
          '#070B11',
        ]}
        style={
          styles.content
        }
      >
        <Animated.View
          style={[
            styles.backgroundGlow,

            {
              opacity:
                glowOpacity,

              transform: [
                {
                  scale:
                    glowScale,
                },
              ],
            },
          ]}
        />

        <Animated.View
          style={[
            styles.unlockContent,

            {
              opacity,

              transform: [
                {
                  scale,
                },
              ],
            },
          ]}
        >
          <View
            style={
              styles.unlockIcon
            }
          >
            <Ionicons
              name="lock-open"
              size={32}
              color="#FFFFFF"
            />
          </View>

          <Text
            style={
              styles.eyebrow
            }
          >
            NEUES GEBIET FREIGESCHALTET
          </Text>

          <Text
            style={
              styles.levelNumber
            }
          >
            LEVEL{' '}
            {
              gameLevel.id
            }
          </Text>

          <Text
            style={
              styles.title
            }
          >
            {
              gameLevel.title
            }
          </Text>

          <Text
            style={
              styles.subtitle
            }
          >
            {
              gameLevel.subtitle
            }
          </Text>

          <View
            style={
              styles.divider
            }
          />

          <Text
            style={
              styles.evolutionLabel
            }
          >
            DEIN HELD ENTWICKELT SICH
          </Text>

          <HeroAvatar
            unlockedLevelIds={
              progress.unlockedLevelIds
            }
            size={150}
            showInfo
          />

          <View
            style={
              styles.infoBox
            }
          >
            <Ionicons
              name="flash"
              size={22}
              color="#62C7FF"
            />

            <Text
              style={
                styles.infoText
              }
            >
              Neue Trainings,
              stärkere Gegner und
              neue Skills warten auf
              dich.
            </Text>
          </View>

          <Pressable
            style={
              styles.button
            }
            onPress={() =>
              router.replace(
                '/rewards'
              )
            }
          >
            <Text
              style={
                styles.buttonText
              }
            >
              WEITER
            </Text>

            <Ionicons
              name="chevron-forward"
              size={21}
              color="#FFFFFF"
            />
          </Pressable>
        </Animated.View>
      </LinearGradient>
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
      flex: 1,

      alignItems:
        'center',

      justifyContent:
        'center',

      paddingHorizontal:
        25,

      overflow:
        'hidden',
    },

    center: {
      flex: 1,

      alignItems:
        'center',

      justifyContent:
        'center',

      padding: 30,
    },

    error: {
      color:
        '#FFFFFF',
    },

    backgroundGlow: {
      position:
        'absolute',

      width: 390,

      height: 390,

      borderRadius:
        195,

      backgroundColor:
        '#198DD5',
    },

    unlockContent: {
      width:
        '100%',

      alignItems:
        'center',
    },

    unlockIcon: {
      width: 70,

      height: 70,

      borderRadius:
        35,

      backgroundColor:
        '#168EF3',

      alignItems:
        'center',

      justifyContent:
        'center',

      borderWidth: 2,

      borderColor:
        '#7AD0FF',
    },

    eyebrow: {
      color:
        '#68C7FF',

      fontSize: 10,

      fontWeight:
        '900',

      letterSpacing:
        2.5,

      marginTop: 22,

      textAlign:
        'center',
    },

    levelNumber: {
      color:
        '#FFFFFF',

      fontSize: 42,

      fontWeight:
        '900',

      marginTop: 7,
    },

    title: {
      color:
        '#57BFFF',

      fontSize: 25,

      fontWeight:
        '900',

      letterSpacing:
        1.5,

      textTransform:
        'uppercase',
    },

    subtitle: {
      color:
        '#8598AA',

      textAlign:
        'center',

      lineHeight: 20,

      marginTop: 9,

      maxWidth: 300,
    },

    divider: {
      width: 80,

      height: 1,

      backgroundColor:
        '#28506A',

      marginVertical: 24,
    },

    evolutionLabel: {
      color:
        '#729AB5',

      fontSize: 9,

      fontWeight:
        '900',

      letterSpacing:
        1.8,

      marginBottom: 12,
    },

    infoBox: {
      width:
        '100%',

      flexDirection:
        'row',

      alignItems:
        'center',

      gap: 12,

      backgroundColor:
        '#102334',

      borderWidth: 1,

      borderColor:
        '#28536E',

      borderRadius:
        17,

      padding: 15,

      marginTop: 20,
    },

    infoText: {
      color:
        '#87A0B3',

      flex: 1,

      lineHeight: 18,

      fontSize: 12,
    },

    button: {
      width:
        '100%',

      minHeight: 62,

      backgroundColor:
        '#168EF3',

      borderRadius:
        19,

      flexDirection:
        'row',

      alignItems:
        'center',

      justifyContent:
        'center',

      gap: 8,

      marginTop: 25,
    },

    buttonText: {
      color:
        '#FFFFFF',

      fontSize: 15,

      fontWeight:
        '900',
    },
  });