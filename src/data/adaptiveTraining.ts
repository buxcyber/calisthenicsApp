import type {
    Exercise,
    Workout,
} from '../types/game';

import type {
    TrainingProfileId,
} from './trainingProfiles';

export type WorkoutProfileVariant = {
  description?: string;

  exercises: Exercise[];
};

export type AdaptiveWorkout =
  Workout & {
    profileVariants?: Partial<
      Record<
        TrainingProfileId,
        WorkoutProfileVariant
      >
    >;
  };

export function resolveWorkout(
  workout: Workout,
  profile?: TrainingProfileId | null
): Workout {
  const adaptiveWorkout =
    workout as AdaptiveWorkout;

  const selectedProfile =
    profile ?? 'beginner';

  const variant =
    adaptiveWorkout.profileVariants?.[
      selectedProfile
    ];

  if (!variant) {
    return workout;
  }

  return {
    ...workout,

    description:
      variant.description ??
      workout.description,

    exercises:
      variant.exercises,
  };
}