import {
  ReactNode,
} from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import {
  LinearGradient,
} from 'expo-linear-gradient';

import {
  STORY_COLORS,
} from '../theme/storyTheme';

type Props = {
  children:
    ReactNode;

  levelId?: number;
};

export default function StoryWorldBackground({
  children,

  levelId = 1,
}: Props) {
  const levelTwo =
    levelId >= 2;

  return (
    <LinearGradient
      colors={
        levelTwo
          ? [
              '#81C8EA',
              '#BDDDEB',
              '#DCE5D2',
              '#AAB886',
            ]
          : [
              STORY_COLORS.skyTop,
              STORY_COLORS.skyMiddle,
              STORY_COLORS.skyBottom,
              '#B3C28C',
            ]
      }
      locations={[
        0,
        0.25,
        0.58,
        1,
      ]}
      style={
        styles.background
      }
    >
      {/* SONNE */}

      <View
        style={
          styles.sunGlow
        }
      />

      <View
        style={
          styles.sun
        }
      />

      {/* WOLKEN */}

      <Cloud
        top={80}
        left={20}
        scale={0.8}
      />

      <Cloud
        top={155}
        right={5}
        scale={0.55}
      />

      <Cloud
        top={340}
        left={-20}
        scale={0.5}
      />

      {/* FERNE BERGE */}

      <Mountain
        top={170}
        left={-115}
        size={330}
        color={
          STORY_COLORS.mountainFar
        }
        opacity={0.45}
      />

      <Mountain
        top={205}
        right={-120}
        size={360}
        color={
          STORY_COLORS.mountainFar
        }
        opacity={0.36}
      />

      <Mountain
        top={410}
        left={-130}
        size={390}
        color={
          STORY_COLORS.mountainMid
        }
        opacity={0.33}
      />

      <Mountain
        top={570}
        right={-180}
        size={430}
        color={
          STORY_COLORS.mountainNear
        }
        opacity={0.22}
      />

      {/* DOJO IN DER FERNE */}

      <View
        style={
          styles.temple
        }
      >
        <View
          style={
            styles.templeRoofBack
          }
        />

        <View
          style={
            styles.templeRoof
          }
        />

        <View
          style={
            styles.templeBody
          }
        >
          <View
            style={
              styles.templePost
            }
          />

          <View
            style={
              styles.templeDoor
            }
          />

          <View
            style={
              styles.templePost
            }
          />
        </View>

        <View
          style={
            styles.templePlatform
          }
        />
      </View>

      {/* BÄUME */}

      <Tree
        top={530}
        left={12}
        scale={0.8}
      />

      <Tree
        top={730}
        right={5}
        scale={0.65}
      />

      <Tree
        top={1010}
        left={-8}
        scale={0.72}
      />

      <Tree
        top={1300}
        right={0}
        scale={0.7}
      />

      <Tree
        top={1550}
        left={5}
        scale={0.62}
      />

      {/* LICHTFLECKEN */}

      <View
        style={[
          styles.lightPatch,

          styles.lightPatchOne,
        ]}
      />

      <View
        style={[
          styles.lightPatch,

          styles.lightPatchTwo,
        ]}
      />

      {/* INHALT */}

      <View
        style={
          styles.content
        }
      >
        {children}
      </View>
    </LinearGradient>
  );
}

function Mountain({
  top,
  left,
  right,
  size,
  color,
  opacity,
}: {
  top: number;

  left?: number;

  right?: number;

  size: number;

  color: string;

  opacity: number;
}) {
  return (
    <View
      style={[
        styles.mountain,

        {
          top,

          left,

          right,

          width: size,

          height: size,

          backgroundColor:
            color,

          opacity,
        },
      ]}
    />
  );
}

function Cloud({
  top,
  left,
  right,
  scale,
}: {
  top: number;

  left?: number;

  right?: number;

  scale: number;
}) {
  return (
    <View
      style={[
        styles.cloud,

        {
          top,

          left,

          right,

          transform: [
            {
              scale,
            },
          ],
        },
      ]}
    >
      <View
        style={[
          styles.cloudPiece,

          styles.cloudOne,
        ]}
      />

      <View
        style={[
          styles.cloudPiece,

          styles.cloudTwo,
        ]}
      />

      <View
        style={[
          styles.cloudPiece,

          styles.cloudThree,
        ]}
      />
    </View>
  );
}

function Tree({
  top,
  left,
  right,
  scale,
}: {
  top: number;

  left?: number;

  right?: number;

  scale: number;
}) {
  return (
    <View
      style={[
        styles.tree,

        {
          top,

          left,

          right,

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
          styles.treeCrownBack
        }
      />

      <View
        style={
          styles.treeCrown
        }
      />

      <View
        style={
          styles.treeTrunk
        }
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    background: {
      position:
        'relative',

      overflow:
        'hidden',
    },

    content: {
      position:
        'relative',

      zIndex: 20,
    },

    sunGlow: {
      position:
        'absolute',

      width: 170,

      height: 170,

      borderRadius:
        85,

      right: -25,

      top: 30,

      backgroundColor:
        '#FFF2B8',

      opacity: 0.24,
    },

    sun: {
      position:
        'absolute',

      width: 72,

      height: 72,

      borderRadius:
        36,

      right: 27,

      top: 72,

      backgroundColor:
        '#F7D477',

      opacity: 0.85,
    },

    cloud: {
      position:
        'absolute',

      width: 155,

      height: 55,
    },

    cloudPiece: {
      position:
        'absolute',

      backgroundColor:
        '#FFFFFF',

      opacity: 0.5,
    },

    cloudOne: {
      width: 75,

      height: 28,

      borderRadius:
        20,

      left: 0,

      top: 22,
    },

    cloudTwo: {
      width: 78,

      height: 42,

      borderRadius:
        30,

      left: 40,

      top: 8,
    },

    cloudThree: {
      width: 65,

      height: 27,

      borderRadius:
        20,

      left: 90,

      top: 23,
    },

    mountain: {
      position:
        'absolute',

      transform: [
        {
          rotate:
            '45deg',
        },
      ],

      borderRadius: 20,
    },

    temple: {
      position:
        'absolute',

      top: 305,

      alignSelf:
        'center',

      width: 175,

      height: 120,

      zIndex: 4,
    },

    templeRoofBack: {
      position:
        'absolute',

      width: 170,

      height: 34,

      top: 5,

      left: 2,

      backgroundColor:
        '#253D42',

      transform: [
        {
          skewX:
            '-18deg',
        },
      ],

      borderRadius: 5,

      opacity: 0.35,
    },

    templeRoof: {
      position:
        'absolute',

      width: 160,

      height: 30,

      top: 12,

      left: 7,

      backgroundColor:
        STORY_COLORS.roof,

      transform: [
        {
          skewX:
            '-15deg',
        },
      ],

      borderRadius: 4,
    },

    templeBody: {
      position:
        'absolute',

      width: 125,

      height: 66,

      top: 40,

      left: 25,

      backgroundColor:
        '#DDD1B5',

      borderWidth: 2,

      borderColor:
        STORY_COLORS.wood,

      flexDirection:
        'row',

      justifyContent:
        'space-around',

      alignItems:
        'flex-end',

      paddingBottom: 3,
    },

    templePost: {
      width: 8,

      height: 60,

      backgroundColor:
        STORY_COLORS.wood,
    },

    templeDoor: {
      width: 35,

      height: 50,

      backgroundColor:
        '#4F4436',

      borderWidth: 2,

      borderColor:
        STORY_COLORS.wood,
    },

    templePlatform: {
      position:
        'absolute',

      width: 160,

      height: 10,

      bottom: 1,

      left: 7,

      borderRadius: 4,

      backgroundColor:
        STORY_COLORS.stone,
    },

    tree: {
      position:
        'absolute',

      width: 95,

      height: 150,

      zIndex: 2,
    },

    treeCrownBack: {
      position:
        'absolute',

      width: 90,

      height: 90,

      borderRadius:
        45,

      top: 0,

      backgroundColor:
        STORY_COLORS.forestDark,

      opacity: 0.7,
    },

    treeCrown: {
      position:
        'absolute',

      width: 70,

      height: 80,

      borderRadius:
        40,

      top: 15,

      left: 12,

      backgroundColor:
        STORY_COLORS.forest,
    },

    treeTrunk: {
      position:
        'absolute',

      width: 13,

      height: 75,

      bottom: 0,

      left: 41,

      borderRadius: 5,

      backgroundColor:
        STORY_COLORS.wood,
    },

    lightPatch: {
      position:
        'absolute',

      borderRadius:
        200,

      backgroundColor:
        '#FFFBD7',

      opacity: 0.13,
    },

    lightPatchOne: {
      width: 240,

      height: 150,

      top: 850,

      right: -100,

      transform: [
        {
          rotate:
            '-20deg',
        },
      ],
    },

    lightPatchTwo: {
      width: 260,

      height: 160,

      top: 1450,

      left: -110,

      transform: [
        {
          rotate:
            '15deg',
        },
      ],
    },
  });