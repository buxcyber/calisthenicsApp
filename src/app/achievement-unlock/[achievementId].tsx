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
} from 'react-native';

import {
    useEffect,
    useMemo,
    useRef,
} from 'react';

import {
    LinearGradient,
} from 'expo-linear-gradient';

import {
    SafeAreaView,
} from 'react-native-safe-area-context';

import {
    achievements,
} from '../../data/achievements';

import {
    markAchievementSeen,
} from '../../storage/progress';

export default function AchievementUnlockScreen() {
  const {
    achievementId,
  } =
    useLocalSearchParams<{
      achievementId: string;
    }>();

  const achievement =
    useMemo(
      () =>
        achievements.find(
          (item) =>
            item.id ===
            achievementId
        ),

      [achievementId]
    );

  const scale =
    useRef(
      new Animated.Value(
        0.4
      )
    ).current;

  const rotation =
    useRef(
      new Animated.Value(
        0
      )
    ).current;

  useEffect(() => {
    Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
    );

    Animated.spring(
      scale,
      {
        toValue: 1,

        friction: 4,

        tension: 55,

        useNativeDriver:
          true,
      }
    ).start();

    Animated.timing(
      rotation,
      {
        toValue: 1,

        duration:
          650,

        useNativeDriver:
          true,
      }
    ).start();
  }, [
    rotation,
    scale,
  ]);

  if (
    !achievement
  ) {
    return null;
  }

  const rotate =
    rotation.interpolate({
      inputRange:
        [0, 1],

      outputRange:
        [
          '-15deg',
          '0deg',
        ],
    });

  const continueForward =
    async () => {
      await markAchievementSeen(
        achievement.id
      );

      router.replace(
        '/rewards'
      );
    };

  return (
    <SafeAreaView
      style={
        styles.container
      }
    >
      <LinearGradient
        colors={[
          '#2C2413',
          '#14130D',
          '#070B11',
        ]}
        style={
          styles.content
        }
      >
        <Text
          style={
            styles.eyebrow
          }
        >
          NEUER ORDEN
        </Text>

        <Animated.View
          style={[
            styles.medal,

            {
              transform: [
                {
                  scale,
                },

                {
                  rotate,
                },
              ],
            },
          ]}
        >
          <Ionicons
            name={
              achievement.icon
            }
            size={63}
            color="#FFD56B"
          />
        </Animated.View>

        <Text
          style={
            styles.title
          }
        >
          {achievement.title}
        </Text>

        <Text
          style={
            styles.rarity
          }
        >
          {achievement.rarity.toUpperCase()}
        </Text>

        <Text
          style={
            styles.description
          }
        >
          {
            achievement.description
          }
        </Text>

        <Pressable
          style={
            styles.button
          }
          onPress={
            continueForward
          }
        >
          <Text
            style={
              styles.buttonText
            }
          >
            ORDEN ANNEHMEN
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
        '#070B11',
    },

    content: {
      flex: 1,

      alignItems:
        'center',

      justifyContent:
        'center',

      paddingHorizontal:
        28,
    },

    eyebrow: {
      color:
        '#FFD56B',

      fontSize: 11,

      fontWeight:
        '900',

      letterSpacing:
        3,
    },

    medal: {
      width: 145,

      height: 145,

      borderRadius:
        73,

      backgroundColor:
        '#4A3817',

      borderWidth: 4,

      borderColor:
        '#FFD56A',

      alignItems:
        'center',

      justifyContent:
        'center',

      marginTop: 30,

      shadowColor:
        '#FFD45A',

      shadowOpacity:
        0.7,

      shadowRadius: 25,
    },

    title: {
      color:
        '#FFFFFF',

      fontSize: 36,

      fontWeight:
        '900',

      textAlign:
        'center',

      marginTop: 33,
    },

    rarity: {
      color:
        '#FFD56B',

      fontSize: 10,

      fontWeight:
        '900',

      letterSpacing:
        2,

      marginTop: 7,
    },

    description: {
      color:
        '#948E7A',

      lineHeight: 21,

      textAlign:
        'center',

      marginTop: 15,
    },

    button: {
      width:
        '100%',

      minHeight: 62,

      borderRadius:
        19,

      backgroundColor:
        '#C4922F',

      alignItems:
        'center',

      justifyContent:
        'center',

      marginTop: 40,
    },

    buttonText: {
      color:
        '#FFFFFF',

      fontSize: 14,

      fontWeight:
        '900',
    },
  });