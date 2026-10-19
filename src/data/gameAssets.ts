import type {
    ImageSourcePropType,
} from 'react-native';

// ===========================================================
// LEVEL-HINTERGRÜNDE
// ===========================================================

export const levelBackgrounds: Record<
  number,
  ImageSourcePropType
> = {
  1: require('../../assets/images/backgrounds/level1-path.png'),

  2: require('../../assets/images/backgrounds/level2-path.png'),
};

export function getLevelBackground(
  levelId: number
): ImageSourcePropType {
  return (
    levelBackgrounds[levelId] ??
    levelBackgrounds[1]
  );
}

// ===========================================================
// CHARAKTERE
// ===========================================================

export const characterImages = {
  heroLevel1:
    require('../../assets/images/characters/hero-level1.png'),

  master:
    require('../../assets/images/characters/master.png'),

  gatekeeper:
    require('../../assets/images/characters/boss-gatekeeper.png'),

  breaker:
    require('../../assets/images/characters/boss-breaker.png'),
};

// ===========================================================
// BASIS-ÜBUNGSBILDER
// ===========================================================

const PUSH_UP =
  require('../../assets/images/exercises/push-up.png');

const PIKE_PUSH_UP =
  require('../../assets/images/exercises/pike-push-up.png');

const PULL_UP =
  require('../../assets/images/exercises/pull-up.png');

const ASSISTED_PULL_UP =
  require('../../assets/images/exercises/assisted-pull-up.png');

const BAND_ASSISTED_PULL_UP =
  require('../../assets/images/exercises/band-assisted-pull-up.png');

const SQUAT =
  require('../../assets/images/exercises/squat.png');

const REVERSE_LUNGE =
  require('../../assets/images/exercises/reverse-lunge.png');

const PLANK =
  require('../../assets/images/exercises/plank.png');

const HOLLOW_HOLD =
  require('../../assets/images/exercises/hollow-hold.png');

const GLUTE_BRIDGE =
  require('../../assets/images/exercises/glute-bridge.png');

const DIP =
  require('../../assets/images/exercises/dip.png');

const HANDSTAND =
  require('../../assets/images/exercises/handstand.png');

// ===========================================================
// ÜBUNGEN
// ===========================================================

export const exerciseImages: Record<
  string,
  ImageSourcePropType
> = {
  // ---------------------------------------------------------
  // PUSH
  // ---------------------------------------------------------

  'Incline Push-up':
    PUSH_UP,

  'Knee Push-up':
    PUSH_UP,

  'Push-up':
    PUSH_UP,

  'Slow Push-up Negative':
    PUSH_UP,

  'Slow Knee Push-up':
    PUSH_UP,

  'Slow Tempo Push-up':
    PUSH_UP,

  'Tempo Push-up':
    PUSH_UP,

  'Decline Push-up':
    PUSH_UP,

  'Diamond Push-up':
    PUSH_UP,

  'Archer Push-up':
    PUSH_UP,

  'Controlled Archer Push-up':
    PUSH_UP,

  'Pike Push-up':
    PIKE_PUSH_UP,

  'Elevated Pike Push-up':
    PIKE_PUSH_UP,

  'Wall Handstand Push-up Negative':
    HANDSTAND,

  // ---------------------------------------------------------
  // PULL
  // ---------------------------------------------------------

  'Dead Hang':
    PULL_UP,

  'Active Hang':
    PULL_UP,

  'Scapular Pull-up':
    PULL_UP,

  'Negative Pull-up':
    PULL_UP,

  'Slow Negative Pull-up':
    PULL_UP,

  'Pull-up':
    PULL_UP,

  'Tempo Pull-up':
    PULL_UP,

  'Chin-up':
    PULL_UP,

  'Chest-to-Bar Pull-up':
    PULL_UP,

  'Chest-to-Bar Tempo Pull-up':
    PULL_UP,

  'High Pull-up':
    PULL_UP,

  'Archer Pull-up Progression':
    PULL_UP,

  'L-Sit Pull-up':
    PULL_UP,

  'Band Assisted Pull-up':
    BAND_ASSISTED_PULL_UP,

  'Assisted Pull-up':
    ASSISTED_PULL_UP,

  // ---------------------------------------------------------
  // BEINE
  // ---------------------------------------------------------

  'Bodyweight Squat':
    SQUAT,

  'Squat':
    SQUAT,

  'Tempo Squat':
    SQUAT,

  'Jump Squat':
    SQUAT,

  'Explosive Jump Squat':
    SQUAT,

  'Calf Raise':
    SQUAT,

  'Reverse Lunge':
    REVERSE_LUNGE,

  'Split Squat':
    REVERSE_LUNGE,

  'Slow Split Squat':
    REVERSE_LUNGE,

  'Deep Split Squat':
    REVERSE_LUNGE,

  'Bulgarian Split Squat':
    REVERSE_LUNGE,

  'Pistol Squat Preparation':
    REVERSE_LUNGE,

  'Pistol Squat':
    REVERSE_LUNGE,

  'Tempo Pistol Squat':
    REVERSE_LUNGE,

  'Shrimp Squat':
    REVERSE_LUNGE,

  'Wall Sit':
    SQUAT,

  // ---------------------------------------------------------
  // CORE
  // ---------------------------------------------------------

  'Plank':
    PLANK,

  'High Plank':
    PLANK,

  'Side Plank':
    PLANK,

  'Plank Shoulder Tap':
    PLANK,

  'Dead Bug':
    HOLLOW_HOLD,

  'Hollow Hold':
    HOLLOW_HOLD,

  'Hollow Rocks':
    HOLLOW_HOLD,

  'Lying Knee Raise':
    HOLLOW_HOLD,

  'Hanging Knee Raise':
    HOLLOW_HOLD,

  'Hanging Leg Raise':
    HOLLOW_HOLD,

  'Tuck L-Sit':
    HOLLOW_HOLD,

  'L-Sit':
    HOLLOW_HOLD,

  'L-Sit Hang':
    HOLLOW_HOLD,

  'Toes-to-Bar':
    HOLLOW_HOLD,

  // ---------------------------------------------------------
  // GLUTES
  // ---------------------------------------------------------

  'Glute Bridge':
    GLUTE_BRIDGE,

  // ---------------------------------------------------------
  // DIPS / SUPPORT
  // ---------------------------------------------------------

  'Dip':
    DIP,

  'Support Hold':
    DIP,

  // ---------------------------------------------------------
  // HANDSTAND
  // ---------------------------------------------------------

  'Wall Handstand':
    HANDSTAND,

  'Wall Handstand Hold':
    HANDSTAND,

  'Handstand':
    HANDSTAND,
};

// ===========================================================
// HELPER
// ===========================================================

export function getExerciseImage(
  exerciseName: string
): ImageSourcePropType | null {
  return (
    exerciseImages[
      exerciseName
    ] ?? null
  );
}