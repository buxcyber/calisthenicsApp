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

import {
    characterImages,
} from '../data/gameAssets';

type Props = {
  size?: number;
  streak?: number;
  showStreak?: boolean;
};

export default function AnimatedHero({
  size = 100,
  streak = 0,
  showStreak = false,
}: Props) {
  const idle =
    useRef(
      new Animated.Value(0)
    ).current;

  const aura =
    useRef(
      new Animated.Value(0)
    ).current;

  useEffect(() => {
    const idleAnimation =
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

    const auraAnimation =
      Animated.loop(
        Animated.sequence([
          Animated.timing(
            aura,
            {
              toValue: 1,
              duration: 1250,
              useNativeDriver: true,
            }
          ),

          Animated.timing(
            aura,
            {
              toValue: 0,
              duration: 1250,
              useNativeDriver: true,
            }
          ),
        ])
      );

    idleAnimation.start();

    if (streak > 0) {
      auraAnimation.start();
    }

    return () => {
      idleAnimation.stop();
      auraAnimation.stop();
    };
  }, [
    idle,
    aura,
    streak,
  ]);

  const translateY =
    idle.interpolate({
      inputRange: [0, 1],
      outputRange: [
        1,
        -4,
      ],
    });

  const breathingScale =
    idle.interpolate({
      inputRange: [0, 1],
      outputRange: [
        1,
        1.015,
      ],
    });

  const auraScale =
    aura.interpolate({
      inputRange: [0, 1],
      outputRange: [
        0.9,
        1.08,
      ],
    });

  const auraOpacity =
    aura.interpolate({
      inputRange: [0, 1],
      outputRange: [
        Math.min(
          0.05 +
            streak * 0.008,
          0.16
        ),

        Math.min(
          0.12 +
            streak * 0.012,
          0.32
        ),
      ],
    });

  const imageHeight =
    size * 1.35;

  return (
    <View
      style={[
        styles.wrapper,
        {
          width: size,
          height: imageHeight,
        },
      ]}
    >
      {/* AURA */}

      {streak > 0 && (
        <>
          <Animated.View
            pointerEvents="none"
            style={[
              styles.outerAura,

              {
                width:
                  size * 0.9,

                height:
                  imageHeight * 0.78,

                borderRadius:
                  size * 0.5,

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

          <Animated.View
            pointerEvents="none"
            style={[
              styles.innerAura,

              {
                width:
                  size * 0.63,

                height:
                  imageHeight * 0.68,

                borderRadius:
                  size * 0.4,

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
        </>
      )}

      {/* CHARACTER */}

      <Animated.View
        style={[
          styles.characterLayer,

          {
            transform: [
              {
                translateY,
              },

              {
                scale:
                  breathingScale,
              },
            ],
          },
        ]}
      >
        <Image
          source={
            characterImages.heroLevel1
          }
          resizeMode="contain"
          style={{
            width: size,
            height: imageHeight,
          }}
        />
      </Animated.View>

      {/* STREAK */}

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
              color="#58CCFF"
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
    wrapper: {
      position: 'relative',

      alignItems: 'center',

      justifyContent:
        'flex-end',
    },

    characterLayer: {
      width: '100%',

      height: '100%',

      alignItems: 'center',

      justifyContent:
        'flex-end',

      zIndex: 5,
    },

    outerAura: {
      position: 'absolute',

      bottom: 1,

      backgroundColor:
        '#1BAEFF',

      shadowColor:
        '#21B5FF',

      shadowOpacity: 0.5,

      shadowRadius: 15,

      shadowOffset: {
        width: 0,
        height: 0,
      },
    },

    innerAura: {
      position: 'absolute',

      bottom: 3,

      backgroundColor:
        '#87E5FF',
    },

    streakBadge: {
      position: 'absolute',

      right: -4,

      top: 5,

      minWidth: 28,

      height: 21,

      borderRadius: 10,

      paddingHorizontal: 5,

      backgroundColor:
        'rgba(5,19,29,0.92)',

      borderWidth: 1,

      borderColor:
        'rgba(94,207,255,0.55)',

      flexDirection: 'row',

      alignItems: 'center',

      justifyContent:
        'center',

      gap: 2,

      zIndex: 20,
    },

    streakText: {
      color: '#FFFFFF',

      fontSize: 8,

      fontWeight: '900',
    },
  });