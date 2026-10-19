import {
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  useEffect,
  useRef,
} from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';

import AnimatedAura from './AnimatedAura';

import {
  characterImages,
} from '../data/gameAssets';

type Props = {
  size?: number;

  streak?: number;

  showStreak?: boolean;
};

export default function AnimatedHero({
  size = 120,

  streak = 0,

  showStreak = false,
}: Props) {
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

              duration: 1500,

              useNativeDriver:
                true,
            }
          ),

          Animated.timing(
            idle,
            {
              toValue: 0,

              duration: 1500,

              useNativeDriver:
                true,
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

      outputRange: [
        1,
        -4,
      ],
    });

  const scale =
    idle.interpolate({
      inputRange: [0, 1],

      outputRange: [
        1,
        1.012,
      ],
    });

  return (
    <View
      style={[
        styles.container,

        {
          width: size,

          height:
            size * 1.35,
        },
      ]}
    >
      <View
        style={
          styles.auraPosition
        }
      >
        <AnimatedAura
          size={
            size * 0.9
          }
          streak={
            streak
          }
        />
      </View>

      <Animated.View
        style={{
          transform: [
            {
              translateY,
            },

            {
              scale,
            },
          ],
        }}
      >
        <Image
          source={
            characterImages.heroLevel1
          }
          resizeMode="contain"
          style={{
            width: size,

            height:
              size * 1.35,
          }}
        />
      </Animated.View>

      {showStreak &&
        streak > 0 && (
          <View
            style={
              styles.streakBadge
            }
          >
            <Ionicons
              name="flame"
              size={10}
              color="#7FDDFF"
            />

            <Text
              style={
                styles.streakText
              }
            >
              {streak}
            </Text>
          </View>
        )}
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      position:
        'relative',

      alignItems:
        'center',

      justifyContent:
        'flex-end',
    },

    auraPosition: {
      position:
        'absolute',

      left: 0,

      right: 0,

      top: '22%',

      alignItems:
        'center',
    },

    streakBadge: {
      position:
        'absolute',

      top: 7,

      right: 0,

      flexDirection:
        'row',

      alignItems:
        'center',

      gap: 2,

      paddingHorizontal:
        5,

      paddingVertical: 3,

      borderRadius: 8,

      backgroundColor:
        'rgba(4,27,39,0.88)',
    },

    streakText: {
      color:
        '#D3F5FF',

      fontSize: 7,

      fontWeight:
        '900',
    },
  });