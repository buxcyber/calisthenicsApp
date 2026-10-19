import {
  Animated,
  StyleSheet,
  View,
} from 'react-native';

import {
  useEffect,
  useRef,
} from 'react';

type Props = {
  progress: number;

  height?: number;

  trackColor?: string;

  fillColor?: string;

  duration?: number;
};

export default function AnimatedProgressBar({
  progress,

  height = 6,

  trackColor =
    'rgba(255,255,255,0.20)',

  fillColor =
    '#2EB4EE',

  duration = 650,
}: Props) {
  const animated =
    useRef(
      new Animated.Value(0)
    ).current;

  const normalized =
    Math.max(
      0,
      Math.min(
        1,
        progress
      )
    );

  useEffect(() => {
    Animated.timing(
      animated,
      {
        toValue:
          normalized,

        duration,

        useNativeDriver:
          false,
      }
    ).start();
  }, [
    animated,
    normalized,
    duration,
  ]);

  const width =
    animated.interpolate({
      inputRange: [0, 1],

      outputRange: [
        '0%',
        '100%',
      ],
    });

  return (
    <View
      style={[
        styles.track,

        {
          height,

          borderRadius:
            height,

          backgroundColor:
            trackColor,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.fill,

          {
            width,

            borderRadius:
              height,

            backgroundColor:
              fillColor,
          },
        ]}
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    track: {
      width: '100%',

      overflow:
        'hidden',
    },

    fill: {
      height: '100%',
    },
  });