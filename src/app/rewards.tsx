import Ionicons from '@expo/vector-icons/Ionicons';

import {
    router,
} from 'expo-router';

import {
    useEffect,
    useState,
} from 'react';

import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    SafeAreaView,
} from 'react-native-safe-area-context';

import {
    getNextPendingAchievement,
    getNextPendingSkillUnlock,
} from '../storage/progress';

export default function RewardsScreen() {
  const [
    message,
    setMessage,
  ] =
    useState(
      'Belohnungen werden geprüft...'
    );

  useEffect(() => {
    let active =
      true;

    const checkRewards =
      async () => {
        setMessage(
          'Neue Skills werden geprüft...'
        );

        const skillId =
          await getNextPendingSkillUnlock();

        if (
          !active
        ) {
          return;
        }

        if (
          skillId
        ) {
          router.replace({
            pathname:
              '/skill-unlock/[skillId]',

            params: {
              skillId,
            },
          });

          return;
        }

        setMessage(
          'Orden werden geprüft...'
        );

        const achievementId =
          await getNextPendingAchievement();

        if (
          !active
        ) {
          return;
        }

        if (
          achievementId
        ) {
          router.replace({
            pathname:
              '/achievement-unlock/[achievementId]',

            params: {
              achievementId,
            },
          });

          return;
        }

        setMessage(
          'Zurück zum Pfad...'
        );

        setTimeout(
          () => {
            if (
              active
            ) {
              router.replace(
                '/'
              );
            }
          },

          350
        );
      };

    checkRewards();

    return () => {
      active =
        false;
    };
  }, []);

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
        <View
          style={
            styles.icon
          }
        >
          <Ionicons
            name="sparkles"
            size={35}
            color="#60C5FF"
          />
        </View>

        <Text
          style={
            styles.title
          }
        >
          {message}
        </Text>
      </View>
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

    center: {
      flex: 1,

      alignItems:
        'center',

      justifyContent:
        'center',

      paddingHorizontal:
        30,
    },

    icon: {
      width: 78,

      height: 78,

      borderRadius:
        39,

      backgroundColor:
        '#102C42',

      borderWidth: 1,

      borderColor:
        '#285B7A',

      alignItems:
        'center',

      justifyContent:
        'center',
    },

    title: {
      color:
        '#7D91A5',

      textAlign:
        'center',

      fontWeight:
        '800',

      marginTop: 18,
    },
  });