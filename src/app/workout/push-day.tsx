import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

const exercises = [
  {
    name: 'Push-ups',
    sets: 3,
    target: '12 Wiederholungen',
    rest: 45,
  },
  {
    name: 'Dips',
    sets: 3,
    target: '8 Wiederholungen',
    rest: 60,
  },
  {
    name: 'Pike Push-ups',
    sets: 3,
    target: '10 Wiederholungen',
    rest: 60,
  },
  {
    name: 'Diamond Push-ups',
    sets: 3,
    target: '10 Wiederholungen',
    rest: 45,
  },
  {
    name: 'Plank',
    sets: 3,
    target: '45 Sekunden',
    rest: 45,
  },
];

export default function PushDayScreen() {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);

  const [isResting, setIsResting] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(45);

  const [finished, setFinished] = useState(false);

  const exercise = exercises[exerciseIndex];

  useEffect(() => {
    if (!isResting) return;

    if (secondsLeft <= 0) {
      setIsResting(false);

      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      );

      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft((previous) => previous - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft, isResting]);

  const handleSetComplete = async () => {
    await Haptics.impactAsync(
      Haptics.ImpactFeedbackStyle.Medium
    );

    const isLastSet = currentSet === exercise.sets;

    const isLastExercise =
      exerciseIndex === exercises.length - 1;

    if (isLastSet && isLastExercise) {
      setFinished(true);

      await Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      );

      return;
    }

    if (isLastSet) {
      setExerciseIndex((previous) => previous + 1);
      setCurrentSet(1);
    } else {
      setCurrentSet((previous) => previous + 1);
    }

    setSecondsLeft(exercise.rest);
    setIsResting(true);
  };

  const skipRest = async () => {
    setIsResting(false);

    await Haptics.impactAsync(
      Haptics.ImpactFeedbackStyle.Light
    );
  };

  if (finished) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.finishedContainer}>
          <Text style={styles.finishedIcon}>✓</Text>

          <Text style={styles.finishedTitle}>
            TRAINING ABGESCHLOSSEN
          </Text>

          <Text style={styles.finishedSubtitle}>
            Push Day erfolgreich beendet
          </Text>

          <View style={styles.rewardCard}>
            <Text style={styles.reward}>+120 XP</Text>

            <Text style={styles.streak}>
              🔥 Streak gehalten
            </Text>
          </View>

          <Pressable
            style={styles.button}
            onPress={() => router.replace('/')}
          >
            <Text style={styles.buttonText}>
              ZURÜCK ZUM HOME
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  if (isResting) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.restContainer}>
          <Text style={styles.smallLabel}>PAUSE</Text>

          <Text style={styles.timer}>
            00:{secondsLeft.toString().padStart(2, '0')}
          </Text>

          <Text style={styles.nextLabel}>
            ALS NÄCHSTES
          </Text>

          <Text style={styles.nextExercise}>
            {exercise.name}
          </Text>

          <Text style={styles.target}>
            Satz {currentSet} von {exercise.sets}
          </Text>

          <Pressable
            style={styles.secondaryButton}
            onPress={skipRest}
          >
            <Text style={styles.secondaryButtonText}>
              PAUSE ÜBERSPRINGEN
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const progress =
    ((exerciseIndex + (currentSet - 1) / exercise.sets) /
      exercises.length) *
    100;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.close}>×</Text>
        </Pressable>

        <Text style={styles.headerTitle}>PUSH DAY</Text>

        <Text style={styles.exerciseCounter}>
          {exerciseIndex + 1}/{exercises.length}
        </Text>
      </View>

      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progress,
            {
              width: `${progress}%`,
            },
          ]}
        />
      </View>

      <View style={styles.main}>
        <Text style={styles.smallLabel}>
          AKTUELLE ÜBUNG
        </Text>

        <Text style={styles.exerciseName}>
          {exercise.name}
        </Text>

        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>
            ÜBUNGSGRAFIK
          </Text>
        </View>

        <Text style={styles.setText}>
          Satz {currentSet} von {exercise.sets}
        </Text>

        <Text style={styles.target}>
          {exercise.target}
        </Text>
      </View>

      <View style={styles.bottom}>
        <Pressable
          style={styles.button}
          onPress={handleSetComplete}
        >
          <Text style={styles.buttonText}>
            SATZ ABGESCHLOSSEN
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D10',
  },

  header: {
    height: 70,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  close: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '300',
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1.5,
  },

  exerciseCounter: {
    color: '#7F8793',
    fontSize: 15,
    fontWeight: '700',
  },

  progressBackground: {
    height: 5,
    backgroundColor: '#242932',
    marginHorizontal: 24,
    borderRadius: 20,
    overflow: 'hidden',
  },

  progress: {
    height: '100%',
    backgroundColor: '#3DA5FF',
  },

  main: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 45,
  },

  smallLabel: {
    color: '#7F8793',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
    textAlign: 'center',
  },

  exerciseName: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 10,
  },

  imagePlaceholder: {
    flex: 1,
    maxHeight: 360,
    backgroundColor: '#171A20',
    borderRadius: 28,
    marginVertical: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imagePlaceholderText: {
    color: '#444B56',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 2,
  },

  setText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
  },

  target: {
    color: '#8D949F',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 8,
  },

  bottom: {
    padding: 24,
    paddingBottom: 35,
  },

  button: {
    backgroundColor: '#3DA5FF',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 18,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  restContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  timer: {
    color: '#FFFFFF',
    fontSize: 96,
    fontWeight: '900',
    marginVertical: 35,
  },

  nextLabel: {
    color: '#3DA5FF',
    fontWeight: '900',
    letterSpacing: 2,
    fontSize: 13,
  },

  nextExercise: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    marginTop: 10,
  },

  secondaryButton: {
    marginTop: 50,
    borderWidth: 2,
    borderColor: '#2C323B',
    paddingHorizontal: 35,
    paddingVertical: 17,
    borderRadius: 16,
  },

  secondaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  finishedContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  finishedIcon: {
    color: '#3DA5FF',
    fontSize: 80,
    fontWeight: '900',
    textAlign: 'center',
  },

  finishedTitle: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 20,
  },

  finishedSubtitle: {
    color: '#8D949F',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },

  rewardCard: {
    backgroundColor: '#171A20',
    borderRadius: 24,
    padding: 28,
    marginVertical: 45,
    alignItems: 'center',
  },

  reward: {
    color: '#3DA5FF',
    fontSize: 40,
    fontWeight: '900',
  },

  streak: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '800',
    marginTop: 14,
  },
});