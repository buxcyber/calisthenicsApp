import Ionicons from '@expo/vector-icons/Ionicons';

import {
    Animated,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    useEffect,
    useRef,
} from 'react';

import {
    getHeroStage,
} from '../data/heroStages';

import {
    getAuraState,
} from '../data/trainingProfiles';

type Props = {
  unlockedLevelIds?: number[];

  auraDays?: number;

  size?: number;

  showInfo?: boolean;

  showStageBadge?: boolean;

  compact?: boolean;
};

export default function HeroAvatar({
  unlockedLevelIds = [
    1,
  ],

  auraDays = 0,

  size = 145,

  showInfo = false,

  showStageBadge = true,

  compact = false,
}: Props) {
  const safeLevels =
    Array.isArray(
      unlockedLevelIds
    ) &&
    unlockedLevelIds.length >
      0
      ? unlockedLevelIds
      : [1];

  const heroStage =
    getHeroStage(
      safeLevels
    );

  const aura =
    getAuraState(
      auraDays
    );

  const pulse =
    useRef(
      new Animated.Value(
        0
      )
    ).current;

  const float =
    useRef(
      new Animated.Value(
        0
      )
    ).current;

  useEffect(() => {
    const pulseAnimation =
      Animated.loop(
        Animated.sequence([
          Animated.timing(
            pulse,
            {
              toValue: 1,

              duration:
                1350,

              useNativeDriver:
                true,
            }
          ),

          Animated.timing(
            pulse,
            {
              toValue: 0,

              duration:
                1350,

              useNativeDriver:
                true,
            }
          ),
        ])
      );

    const floatAnimation =
      Animated.loop(
        Animated.sequence([
          Animated.timing(
            float,
            {
              toValue: 1,

              duration:
                1800,

              useNativeDriver:
                true,
            }
          ),

          Animated.timing(
            float,
            {
              toValue: 0,

              duration:
                1800,

              useNativeDriver:
                true,
            }
          ),
        ])
      );

    pulseAnimation.start();

    floatAnimation.start();

    return () => {
      pulseAnimation.stop();

      floatAnimation.stop();
    };
  }, [
    pulse,
    float,
  ]);

  const auraVisible =
    aura.level >
    0;

  const auraScale =
    pulse.interpolate({
      inputRange: [
        0,
        1,
      ],

      outputRange: [
        1,

        1 +
          aura.glowStrength *
            0.025,
      ],
    });

  const auraOpacity =
    pulse.interpolate({
      inputRange: [
        0,
        1,
      ],

      outputRange: [
        auraVisible
          ? 0.09 +
            aura.glowStrength *
              0.025
          : 0,

        auraVisible
          ? 0.16 +
            aura.glowStrength *
              0.04
          : 0,
      ],
    });

  const translateY =
    float.interpolate({
      inputRange: [
        0,
        1,
      ],

      outputRange: [
        2,
        -3,
      ],
    });

  const bodyHeight =
    size * 0.75;

  const bodyWidth =
    size * 0.48;

  return (
    <View
      style={
        styles.wrapper
      }
    >
      <View
        style={[
          styles.avatarArea,

          {
            width: size,

            height: size,
          },
        ]}
      >
        {auraVisible && (
          <>
            <Animated.View
              pointerEvents="none"
              style={[
                styles.auraOuter,

                {
                  width:
                    size *
                    (
                      0.78 +
                      aura.glowStrength *
                        0.04
                    ),

                  height:
                    size *
                    (
                      0.88 +
                      aura.glowStrength *
                        0.04
                    ),

                  borderRadius:
                    size,

                  backgroundColor:
                    aura.color,

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
                styles.auraCore,

                {
                  width:
                    size *
                    0.57,

                  height:
                    size *
                    0.78,

                  borderRadius:
                    size,

                  backgroundColor:
                    aura.color,

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

        <Animated.View
          style={[
            styles.character,

            {
              width:
                bodyWidth,

              height:
                bodyHeight,

              transform: [
                {
                  translateY,
                },
              ],
            },
          ]}
        >
          <View
            style={[
              styles.head,

              {
                width:
                  size *
                  0.19,

                height:
                  size *
                  0.19,

                borderRadius:
                  size *
                  0.095,
              },
            ]}
          />

          <View
            style={[
              styles.torso,

              {
                width:
                  bodyWidth *
                  (
                    0.56 +
                    heroStage.bodyStage *
                      0.035
                  ),

                height:
                  bodyHeight *
                  0.43,
              },
            ]}
          >
            {auraVisible && (
              <Ionicons
                name="flash"
                size={
                  Math.max(
                    8,

                    size *
                      0.085
                  )
                }
                color={
                  aura.color
                }
              />
            )}
          </View>

          <View
            style={
              styles.legs
            }
          >
            <View
              style={[
                styles.leg,

                {
                  height:
                    bodyHeight *
                    0.32,
                },
              ]}
            />

            <View
              style={[
                styles.leg,

                {
                  height:
                    bodyHeight *
                    0.32,
                },
              ]}
            />
          </View>
        </Animated.View>

        {auraVisible &&
          !compact && (
          <>
            <View
              style={[
                styles.particle,

                styles.particleOne,

                {
                  backgroundColor:
                    aura.color,
                },
              ]}
            />

            {aura.level >=
              2 && (
              <View
                style={[
                  styles.particle,

                  styles.particleTwo,

                  {
                    backgroundColor:
                      aura.color,
                  },
                ]}
              />
            )}

            {aura.level >=
              3 && (
              <View
                style={[
                  styles.particle,

                  styles.particleThree,

                  {
                    backgroundColor:
                      aura.color,
                  },
                ]}
              />
            )}
          </>
        )}

        {showStageBadge && (
          <View
            style={
              styles.stageBadge
            }
          >
            <Text
              style={
                styles.stageBadgeLabel
              }
            >
              LV
            </Text>

            <Text
              style={
                styles.stageBadgeText
              }
            >
              {
                heroStage.id
              }
            </Text>
          </View>
        )}
      </View>

      {showInfo && (
        <View
          style={
            styles.info
          }
        >
          <Text
            style={
              styles.stageLabel
            }
          >
            HELDENSTUFE{' '}
            {
              heroStage.id
            }
          </Text>

          <Text
            style={
              styles.stageTitle
            }
          >
            {
              heroStage.title
            }
          </Text>

          <View
            style={
              styles.auraInfo
            }
          >
            <View
              style={[
                styles.auraDot,

                {
                  backgroundColor:
                    aura.color,
                },
              ]}
            />

            <Text
              style={[
                styles.auraText,

                {
                  color:
                    aura.level >
                    0
                      ? aura.color
                      : '#687985',
                },
              ]}
            >
              Aura{' '}
              {auraDays}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles =
  StyleSheet.create({
    wrapper: {
      alignItems:
        'center',
    },

    avatarArea: {
      position:
        'relative',

      alignItems:
        'center',

      justifyContent:
        'center',
    },

    auraOuter: {
      position:
        'absolute',
    },

    auraCore: {
      position:
        'absolute',
    },

    character: {
      alignItems:
        'center',

      justifyContent:
        'flex-start',
    },

    head: {
      backgroundColor:
        '#17222B',

      borderWidth: 2,

      borderColor:
        '#556C7A',
    },

    torso: {
      marginTop: -1,

      backgroundColor:
        '#17222B',

      borderWidth: 2,

      borderColor:
        '#48606E',

      borderTopLeftRadius:
        18,

      borderTopRightRadius:
        18,

      borderBottomLeftRadius:
        8,

      borderBottomRightRadius:
        8,

      alignItems:
        'center',

      justifyContent:
        'center',
    },

    legs: {
      flexDirection:
        'row',

      gap: 5,

      marginTop: 1,
    },

    leg: {
      width: 8,

      borderRadius: 4,

      backgroundColor:
        '#17222B',

      borderWidth: 1,

      borderColor:
        '#48606E',
    },

    particle: {
      position:
        'absolute',

      width: 4,

      height: 4,

      borderRadius: 2,

      shadowColor:
        '#38B9FF',

      shadowOpacity:
        0.9,

      shadowRadius: 6,
    },

    particleOne: {
      left: '18%',

      top: '36%',
    },

    particleTwo: {
      right: '18%',

      top: '24%',
    },

    particleThree: {
      right: '22%',

      bottom: '23%',
    },

    stageBadge: {
      position:
        'absolute',

      right: 0,

      bottom: 5,

      width: 35,

      height: 35,

      borderRadius:
        18,

      backgroundColor:
        '#173141',

      borderWidth: 2,

      borderColor:
        '#A7C5D5',

      alignItems:
        'center',

      justifyContent:
        'center',
    },

    stageBadgeLabel: {
      color:
        '#6F91A3',

      fontSize: 5,

      fontWeight:
        '900',
    },

    stageBadgeText: {
      color:
        '#FFFFFF',

      fontSize: 11,

      fontWeight:
        '900',
    },

    info: {
      alignItems:
        'center',

      marginTop: 7,
    },

    stageLabel: {
      color:
        '#568EA9',

      fontSize: 7,

      fontWeight:
        '900',

      letterSpacing:
        1.6,
    },

    stageTitle: {
      color:
        '#FFFFFF',

      fontSize: 20,

      fontWeight:
        '900',

      marginTop: 2,
    },

    auraInfo: {
      flexDirection:
        'row',

      alignItems:
        'center',

      gap: 5,

      marginTop: 5,
    },

    auraDot: {
      width: 6,

      height: 6,

      borderRadius: 3,
    },

    auraText: {
      fontSize: 9,

      fontWeight:
        '900',
    },
  });