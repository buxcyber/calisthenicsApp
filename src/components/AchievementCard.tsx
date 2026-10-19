import Ionicons from '@expo/vector-icons/Ionicons';

import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import type {
    Achievement,
} from '../data/achievements';

type Props = {
  achievement: Achievement;

  unlocked: boolean;

  current: number;

  target: number;
};

export default function AchievementCard({
  achievement,
  unlocked,
  current,
  target,
}: Props) {
  const rarity =
    getRarityStyle(
      achievement.rarity
    );

  const percentage =
    Math.min(
      100,

      (
        current /
        target
      ) * 100
    );

  return (
    <View
      style={[
        styles.card,

        unlocked && {
          borderColor:
            rarity.border,

          backgroundColor:
            rarity.background,
        },

        !unlocked &&
          styles.locked,
      ]}
    >
      <View
        style={[
          styles.icon,

          {
            backgroundColor:
              unlocked
                ? rarity.iconBackground
                : '#171E26',
          },
        ]}
      >
        <Ionicons
          name={
            unlocked
              ? achievement.icon
              : 'lock-closed'
          }
          size={25}
          color={
            unlocked
              ? rarity.color
              : '#596675'
          }
        />
      </View>

      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={
            styles.top
          }
        >
          <Text
            style={[
              styles.title,

              !unlocked &&
                styles.lockedTitle,
            ]}
          >
            {achievement.title}
          </Text>

          <Text
            style={[
              styles.rarity,

              {
                color:
                  unlocked
                    ? rarity.color
                    : '#586573',
              },
            ]}
          >
            {achievement.rarity.toUpperCase()}
          </Text>
        </View>

        <Text
          style={
            styles.description
          }
        >
          {
            achievement.description
          }
        </Text>

        {!unlocked && (
          <>
            <View
              style={
                styles.progressTrack
              }
            >
              <View
                style={[
                  styles.progressFill,

                  {
                    width: `${percentage}%`,
                  },
                ]}
              />
            </View>

            <Text
              style={
                styles.progressText
              }
            >
              {current} /{' '}
              {target}
            </Text>
          </>
        )}

        {unlocked && (
          <Text
            style={
              styles.unlockedText
            }
          >
            ✓ FREIGESCHALTET
          </Text>
        )}
      </View>
    </View>
  );
}

function getRarityStyle(
  rarity:
    | 'bronze'
    | 'silver'
    | 'gold'
    | 'legendary'
) {
  switch (rarity) {
    case 'bronze':
      return {
        color:
          '#D38A55',

        border:
          '#63432E',

        background:
          '#1C1714',

        iconBackground:
          '#3A291E',
      };

    case 'silver':
      return {
        color:
          '#BFD2E2',

        border:
          '#405566',

        background:
          '#141B21',

        iconBackground:
          '#263644',
      };

    case 'gold':
      return {
        color:
          '#FFD36A',

        border:
          '#68562A',

        background:
          '#201C12',

        iconBackground:
          '#40351A',
      };

    default:
      return {
        color:
          '#CE8CFF',

        border:
          '#633D7B',

        background:
          '#1D1423',

        iconBackground:
          '#382043',
      };
  }
}

const styles =
  StyleSheet.create({
    card: {
      flexDirection:
        'row',

      alignItems:
        'center',

      gap: 13,

      minHeight:
        105,

      borderRadius:
        20,

      borderWidth: 1,

      borderColor:
        '#283542',

      backgroundColor:
        '#111820',

      padding: 15,

      marginBottom:
        10,
    },

    locked: {
      opacity: 0.65,
    },

    icon: {
      width: 55,

      height: 55,

      borderRadius:
        18,

      alignItems:
        'center',

      justifyContent:
        'center',
    },

    top: {
      flexDirection:
        'row',

      alignItems:
        'center',

      justifyContent:
        'space-between',

      gap: 10,
    },

    title: {
      color:
        '#FFFFFF',

      fontWeight:
        '900',

      fontSize: 15,

      flex: 1,
    },

    lockedTitle: {
      color:
        '#84909D',
    },

    rarity: {
      fontSize: 8,

      fontWeight:
        '900',

      letterSpacing:
        1,
    },

    description: {
      color:
        '#728191',

      fontSize: 11,

      lineHeight: 15,

      marginTop: 3,
    },

    progressTrack: {
      height: 5,

      backgroundColor:
        '#262E37',

      borderRadius: 5,

      overflow:
        'hidden',

      marginTop: 9,
    },

    progressFill: {
      height:
        '100%',

      backgroundColor:
        '#3EA9EE',
    },

    progressText: {
      color:
        '#69798A',

      fontSize: 9,

      marginTop: 4,
    },

    unlockedText: {
      color:
        '#49E29B',

      fontSize: 9,

      fontWeight:
        '900',

      letterSpacing:
        1,

      marginTop: 7,
    },
  });