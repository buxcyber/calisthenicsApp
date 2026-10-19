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
} from 'react';

import {
    LinearGradient,
} from 'expo-linear-gradient';

import {
    SafeAreaView,
} from 'react-native-safe-area-context';

import {
    skillNodes,
} from '../../data/skills';

import {
    markSkillUnlockSeen,
} from '../../storage/progress';

export default function SkillUnlockScreen() {
  const {
    skillId,
  } =
    useLocalSearchParams<{
      skillId: string;
    }>();

  const skill =
    useMemo(
      () =>
        skillNodes.find(
          (item) =>
            item.id ===
            skillId
        ),

      [skillId]
    );

  const scale =
    useRef(
      new Animated.Value(
        0.55
      )
    ).current;

  const opacity =
    useRef(
      new Animated.Value(
        0
      )
    ).current;

  const aura =
    useRef(
      new Animated.Value(
        0
      )
    ).current;

  useEffect(() => {
    Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
    );

    Animated.parallel([
      Animated.spring(
        scale,
        {
          toValue: 1,

          friction: 5,

          tension: 60,

          useNativeDriver:
            true,
        }
      ),

      Animated.timing(
        opacity,
        {
          toValue: 1,

          duration: 500,

          useNativeDriver:
            true,
        }
      ),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(
          aura,
          {
            toValue: 1,

            duration:
              900,

            useNativeDriver:
              true,
          }
        ),

        Animated.timing(
          aura,
          {
            toValue: 0,

            duration:
              900,

            useNativeDriver:
              true,
          }
        ),
      ])
    ).start();
  }, [
    aura,
    opacity,
    scale,
  ]);

  if (!skill) {
    return (
      <SafeAreaView
        style={
          styles.container
        }
      >
        <Text
          style={
            styles.error
          }
        >
          Skill nicht gefunden.
        </Text>
      </SafeAreaView>
    );
  }

  const auraScale =
    aura.interpolate({
      inputRange:
        [0, 1],

      outputRange:
        [1, 1.18],
    });

  const continueForward =
    async () => {
      await markSkillUnlockSeen(
        skill.id
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
          '#102B42',
          '#09131E',
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
          NEUER SKILL
        </Text>

        <Animated.View
          style={[
            styles.aura,

            {
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
          style={[
            styles.skillIcon,

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
          <Ionicons
            name="flash"
            size={65}
            color="#FFFFFF"
          />
        </Animated.View>

        <Animated.View
          style={{
            opacity,
          }}
        >
          <Text
            style={
              styles.title
            }
          >
            {skill.name}
          </Text>

          <Text
            style={
              styles.level
            }
          >
            SKILL LEVEL{' '}
            {skill.level}
          </Text>

          <Text
            style={
              styles.description
            }
          >
            {
              skill.unlockMessage ??
              skill.description
            }
          </Text>
        </Animated.View>

        <View
          style={
            styles.rewardBox
          }
        >
          <Ionicons
            name="lock-open"
            size={22}
            color="#52BCFF"
          />

          <Text
            style={
              styles.rewardText
            }
          >
            In deiner Skill-Sammlung freigeschaltet
          </Text>
        </View>

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
            WEITER
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
        '#64C5FF',

      fontSize: 11,

      fontWeight:
        '900',

      letterSpacing:
        3,
    },

    aura: {
      position:
        'absolute',

      width: 220,

      height: 220,

      borderRadius:
        110,

      backgroundColor:
        '#158DD6',

      opacity: 0.15,
    },

    skillIcon: {
      width: 140,

      height: 140,

      borderRadius:
        70,

      backgroundColor:
        '#1679B7',

      borderWidth: 4,

      borderColor:
        '#65C9FF',

      alignItems:
        'center',

      justifyContent:
        'center',

      marginTop: 30,

      shadowColor:
        '#35B6FF',

      shadowOpacity:
        1,

      shadowRadius:
        28,
    },

    title: {
      color:
        '#FFFFFF',

      fontSize: 38,

      fontWeight:
        '900',

      textAlign:
        'center',

      marginTop: 35,
    },

    level: {
      color:
        '#50B9F8',

      fontSize: 10,

      fontWeight:
        '900',

      letterSpacing:
        2,

      textAlign:
        'center',

      marginTop: 7,
    },

    description: {
      color:
        '#889AAC',

      textAlign:
        'center',

      lineHeight: 21,

      marginTop: 15,
    },

    rewardBox: {
      flexDirection:
        'row',

      alignItems:
        'center',

      gap: 10,

      backgroundColor:
        '#10273A',

      borderWidth: 1,

      borderColor:
        '#285C80',

      borderRadius:
        16,

      paddingHorizontal:
        17,

      paddingVertical:
        13,

      marginTop: 30,
    },

    rewardText: {
      color:
        '#71BDE8',

      fontSize: 11,

      fontWeight:
        '800',
    },

    button: {
      width:
        '100%',

      minHeight: 62,

      backgroundColor:
        '#168EF3',

      borderRadius:
        19,

      alignItems:
        'center',

      justifyContent:
        'center',

      marginTop: 35,
    },

    buttonText: {
      color:
        '#FFFFFF',

      fontWeight:
        '900',

      fontSize: 15,
    },

    error: {
      color:
        '#FFFFFF',

      textAlign:
        'center',

      marginTop: 100,
    },
  });