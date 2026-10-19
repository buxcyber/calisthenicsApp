export type HeroStage = {
  id: number;

  title: string;

  subtitle: string;

  requiredGameLevel: number;

  auraStrength: number;

  bodyStage: number;

  description: string;
};

export const heroStages: HeroStage[] = [
  {
    id: 1,

    title: 'Der Anfänger',

    subtitle: 'Das Erwachen beginnt.',

    requiredGameLevel: 1,

    auraStrength: 1,

    bodyStage: 1,

    description:
      'Schlanker Körperbau, einfache Kleidung und eine schwache blaue Aura.',
  },

  {
    id: 2,

    title: 'Der Erwachte',

    subtitle: 'Die erste Veränderung.',

    requiredGameLevel: 2,

    auraStrength: 2,

    bodyStage: 2,

    description:
      'Etwas mehr Definition und eine sichtbar stärkere Aura.',
  },

  {
    id: 3,

    title: 'Der Kämpfer',

    subtitle: 'Kraft wird sichtbar.',

    requiredGameLevel: 3,

    auraStrength: 3,

    bodyStage: 3,

    description:
      'Athletischer Körperbau und kontrollierte Energie.',
  },

  {
    id: 4,

    title: 'Der Elitekämpfer',

    subtitle: 'Die Grenzen verschieben sich.',

    requiredGameLevel: 5,

    auraStrength: 4,

    bodyStage: 4,

    description:
      'Deutlich athletischer, aber weiterhin realistische Entwicklung.',
  },

  {
    id: 5,

    title: 'Der Meister',

    subtitle: 'Körper und Kontrolle vereint.',

    requiredGameLevel: 8,

    auraStrength: 5,

    bodyStage: 5,

    description:
      'Starke Aura, fortgeschrittene Körperspannung und ausgeprägte Athletik.',
  },
];

export function getHeroStage(
  unlockedLevelIds?: number[]
): HeroStage {
  /*
    Schutz gegen:
    undefined
    leeres Array
    alte Spielstände
  */

  const safeLevelIds =
    Array.isArray(unlockedLevelIds) &&
    unlockedLevelIds.length > 0
      ? unlockedLevelIds
      : [1];

  const highestGameLevel =
    Math.max(
      1,
      ...safeLevelIds
    );

  const availableStages =
    heroStages.filter(
      (stage) =>
        stage.requiredGameLevel <=
        highestGameLevel
    );

  return (
    availableStages[
      availableStages.length - 1
    ] ?? heroStages[0]
  );
}