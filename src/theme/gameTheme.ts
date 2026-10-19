export const COLORS = {
  // =========================================================
  // BASIS
  // =========================================================

  background: '#05080D',

  backgroundSoft: '#080D14',

  surface: '#0B1119',

  surfaceHigh: '#111B26',

  surfaceLight: '#172331',

  border: '#1D2C3B',

  borderBright: '#294B66',

  // =========================================================
  // SPIELER / AURA
  // =========================================================

  aura: '#31AFFF',

  auraLight: '#8AD8FF',

  auraDark: '#0D5689',

  auraDeep: '#082C47',

  // =========================================================
  // STATUS
  // =========================================================

  success: '#44D992',

  successDark: '#123C2C',

  gold: '#E8C66A',

  goldDark: '#473A16',

  danger: '#FF5A62',

  dangerDark: '#40181D',

  // =========================================================
  // LEVEL 1
  // =========================================================

  gatekeeper: '#66C7FF',

  gatekeeperDark: '#0A2234',

  // =========================================================
  // LEVEL 2
  // =========================================================

  breaker: '#FF624D',

  breakerDark: '#35130D',

  // =========================================================
  // TEXT
  // =========================================================

  text: '#F5F8FC',

  textSoft: '#A3B0BE',

  textMuted: '#718397',

  textDark: '#455667',

  black: '#000000',

  white: '#FFFFFF',
};

export const RADII = {
  small: 10,

  medium: 16,

  large: 22,

  xl: 28,

  round: 999,
};

export const SPACING = {
  xs: 6,

  sm: 10,

  md: 16,

  lg: 22,

  xl: 30,
};

// ===========================================================
// LEVEL-WELT
// ===========================================================

export function getLevelWorldTheme(
  levelId: number
) {
  if (levelId === 1) {
    return {
      title: 'DIE AUFNAHME',

      eyebrow:
        'DER WEG ZUM MEISTER',

      primary: '#278FBE',

      secondary:
        '#74C4DF',

      dark: '#DDEDE4',

      fog: '#B8D8D3',

      node: '#3D8EA8',

      nodeBorder:
        '#9DE2FF',

      description:
        'Du erreichst das Trainingsgelände des Meisters. Beweise ihm, dass du bereit bist, sein Schüler zu werden.',
    };
  }

  if (levelId === 2) {
    return {
      title:
        'POWER BUILD',

      eyebrow:
        'DAS TRAINING BEGINNT',

      primary: '#318FC0',

      secondary:
        '#7FCBE7',

      dark: '#CFDFD4',

      fog: '#A9C8C0',

      node: '#397E94',

      nodeBorder:
        '#8DD7F2',

      description:
        'Der Meister hat dich aufgenommen. Jetzt beginnt dein eigentliches Training.',
    };
  }

  return {
    title:
      `LEVEL ${levelId}`,

    eyebrow:
      'NEUER ABSCHNITT',

    primary:
      '#508FAB',

    secondary:
      '#8AC4DA',

    dark: '#D7E2DC',

    fog: '#B8CBC4',

    node: '#497C89',

    nodeBorder:
      '#9FD0DF',

    description:
      'Ein neuer Abschnitt deiner Reise beginnt.',
  };
}

// ===========================================================
// BOSS / ABSCHLUSSPRÜFUNG
// ===========================================================

export function getBossVisualTheme(
  bossId: string
) {
  /*
    Technisch heißt die alte Level-1-ID weiterhin
    "gatekeeper".

    Sichtbar in der App ist das aber jetzt
    DIE AUFNAHMEPRÜFUNG DES MEISTERS.
  */

  if (
    bossId ===
    'gatekeeper'
  ) {
    return {
      primary:
        '#B98543',

      secondary:
        '#D7B578',

      dark:
        '#EFE6CF',

      glow:
        '#E7C98C',

      title:
        'DIE AUFNAHME',

      symbol:
        'ribbon' as const,
    };
  }

  if (
    bossId ===
    'breaker'
  ) {
    return {
      primary:
        COLORS.breaker,

      secondary:
        '#FF9A7B',

      dark:
        COLORS.breakerDark,

      glow:
        '#C83E29',

      title:
        'DER BRECHER',

      symbol:
        'flame' as const,
    };
  }

  return {
    primary:
      '#9B79CE',

    secondary:
      '#CBB3EC',

    dark:
      '#24182E',

    glow:
      '#714A96',

    title:
      'PRÜFUNG',

    symbol:
      'shield' as const,
  };
}