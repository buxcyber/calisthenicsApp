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
  characterImages,
} from '../data/gameAssets';

type Props = {
  size?: number;

  showLabel?: boolean;

  auraStrength?: number;
};

export default function MasterAvatar({
  size = 130,

  showLabel = false,

  auraStrength = 1,
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

              duration: 2300,

              useNativeDriver:
                true,
            }
          ),

          Animated.timing(
            idle,
            {
              toValue: 0,

              duration: 2300,

              useNativeDriver:
                true,
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

              duration: 1900,

              useNativeDriver:
                true,
            }
          ),

          Animated.timing(
            aura,
            {
              toValue: 0,

              duration: 1900,

              useNativeDriver:
                true,
            }
          ),
        ])
      );

    idleAnimation.start();

    auraAnimation.start();

    return () => {
      idleAnimation.stop();

      auraAnimation.stop();
    };
  }, [
    idle,
    aura,
  ]);

  const translateY =
    idle.interpolate({
      inputRange: [0, 1],

      outputRange: [
        1,
        -3,
      ],
    });

  const breatheScale =
    idle.interpolate({
      inputRange: [0, 1],

      outputRange: [
        1,
        1.012,
      ],
    });

  const auraScale =
    aura.interpolate({
      inputRange: [0, 1],

      outputRange: [
        0.92,
        1.07,
      ],
    });

  const auraOpacity =
    aura.interpolate({
      inputRange: [0, 1],

      outputRange: [
        0.07 *
          auraStrength,

        0.18 *
          auraStrength,
      ],
    });

  const imageHeight =
    size * 1.22;

  return (
    <View
      style={[
        styles.wrapper,

        {
          width:
            size * 1.15,

          height:
            imageHeight +
            (showLabel
              ? 25
              : 0),
        },
      ]}
    >
      {/* SEHR DEZENTE MEISTER-AURA */}

      <Animated.View
        pointerEvents="none"
        style={[
          styles.auraOuter,

          {
            width:
              size * 0.92,

            height:
              size * 0.92,

            borderRadius:
              size * 0.46,

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
          styles.auraInner,

          {
            width:
              size * 0.67,

            height:
              size * 0.82,

            borderRadius:
              size * 0.35,

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

      {/* ECHTES MEISTER-ARTWORK */}

      <Animated.Image
        source={
          characterImages.master
        }
        resizeMode="contain"
        style={{
          width: size,

          height:
            imageHeight,

          transform: [
            {
              translateY,
            },

            {
              scale:
                breatheScale,
            },
          ],
        }}
      />

      {/* LABEL */}

      {showLabel && (
        <View
          style={
            styles.label
          }
        >
          <View
            style={
              styles.labelDiamond
            }
          />

          <Text
            style={
              styles.labelText
            }
          >
            MEISTER
          </Text>

          <View
            style={
              styles.labelDiamond
            }
          />
        </View>
      )}
    </View>
  );
}

const styles =
  StyleSheet.create({
    wrapper: {
      position:
        'relative',

      alignItems:
        'center',

      justifyContent:
        'flex-end',
    },

    auraOuter: {
      position:
        'absolute',

      bottom: 12,

      backgroundColor:
        '#F0B94F',

      shadowColor:
        '#F2C566',

      shadowOpacity: 0.45,

      shadowRadius: 18,

      shadowOffset: {
        width: 0,

        height: 0,
      },
    },

    auraInner: {
      position:
        'absolute',

      bottom: 18,

      backgroundColor:
        '#FFE3A1',
    },

    label: {
      position:
        'absolute',

      bottom: 0,

      minWidth: 90,

      height: 24,

      paddingHorizontal: 11,

      borderRadius: 8,

      backgroundColor:
        'rgba(5,16,22,0.94)',

      borderWidth: 1,

      borderColor:
        '#D9B366',

      flexDirection:
        'row',

      alignItems:
        'center',

      justifyContent:
        'center',

      gap: 6,

      shadowColor:
        '#000',

      shadowOpacity: 0.4,

      shadowRadius: 7,

      shadowOffset: {
        width: 0,

        height: 3,
      },
    },

    labelText: {
      color:
        '#F0CC83',

      fontSize: 8,

      fontWeight:
        '900',

      letterSpacing: 1.5,
    },

    labelDiamond: {
      width: 4,

      height: 4,

      borderWidth: 1,

      borderColor:
        '#E5BC6B',

      transform: [
        {
          rotate:
            '45deg',
        },
      ],
    },
  });