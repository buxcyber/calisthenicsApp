import Ionicons from '@expo/vector-icons/Ionicons';

import {
  router,
} from 'expo-router';

import {
  useState,
} from 'react';

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import {
  loadProgress,
  saveProgress,
} from '../storage/progress';

import {
  trainingProfiles,
} from '../data/trainingProfiles';

import type {
  TrainingProfileId,
} from '../data/trainingProfiles';

import {
  uiTheme,
} from '../theme/uiTheme';

export default function OnboardingScreen() {
  const [
    selected,
    setSelected,
  ] =
    useState<TrainingProfileId>(
      'beginner'
    );

  const [
    saving,
    setSaving,
  ] =
    useState(false);

  async function finish() {
    if (saving) {
      return;
    }

    setSaving(true);

    try {
      const currentProgress =
        await loadProgress();

      await saveProgress({
        ...currentProgress,

        onboardingCompleted:
          true,

        trainingProfile:
          selected as any,
      });

      router.replace(
        '/(tabs)'
      );
    } catch (error) {
      console.error(
        'Fehler beim Speichern des Trainingsprofils:',
        error
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <SafeAreaView
      style={
        styles.screen
      }
      edges={[
        'top',
        'bottom',
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.content
        }
      >
        {/* HEADER */}

        <View
          style={
            styles.headerIcon
          }
        >
          <Ionicons
            name="fitness"
            size={27}
            color={
              uiTheme.colors.primary
            }
          />
        </View>

        <Text
          style={
            styles.eyebrow
          }
        >
          DEIN TRAININGSWEG
        </Text>

        <Text
          style={
            styles.title
          }
        >
          Was möchtest du erreichen?
        </Text>

        <Text
          style={
            styles.subtitle
          }
        >
          Wähle deinen Trainingsschwerpunkt. Du kannst ihn später jederzeit ändern.
        </Text>

        {/* PROFILE CARDS */}

        <View
          style={
            styles.options
          }
        >
          {trainingProfiles.map(
            (profile) => {
              const active =
                selected ===
                profile.id;

              const glute =
                profile.id ===
                'glute-focus';

              const safeFocus =
                Array.isArray(
                  profile.focus
                )
                  ? profile.focus
                  : [];

              return (
                <Pressable
                  key={
                    profile.id
                  }
                  onPress={() =>
                    setSelected(
                      profile.id
                    )
                  }
                  style={[
                    styles.option,

                    active &&
                      styles.optionActive,
                  ]}
                >
                  {/* ICON */}

                  <View
                    style={[
                      styles.optionIcon,

                      active &&
                        styles.optionIconActive,
                    ]}
                  >
                    <Ionicons
                      name={
                        getProfileIcon(
                          profile.id
                        )
                      }
                      size={24}
                      color={
                        active
                          ? '#FFFFFF'
                          : uiTheme.colors
                              .textSecondary
                      }
                    />
                  </View>

                  {/* TEXT */}

                  <View
                    style={
                      styles.optionInfo
                    }
                  >
                    <View
                      style={
                        styles.optionTitleRow
                      }
                    >
                      <Text
                        style={
                          styles.optionTitle
                        }
                      >
                        {
                          profile.title
                        }
                      </Text>

                      {glute && (
                        <View
                          style={
                            styles.gluteBadge
                          }
                        >
                          <Text
                            style={
                              styles.gluteBadgeText
                            }
                          >
                            GLUTE
                          </Text>
                        </View>
                      )}
                    </View>

                    <Text
                      style={
                        styles.optionSubtitle
                      }
                    >
                      {
                        profile.subtitle
                      }
                    </Text>

                    <Text
                      style={
                        styles.optionDescription
                      }
                    >
                      {
                        profile.description
                      }
                    </Text>

                    {/* FOCUS TAGS */}

                    {safeFocus.length >
                      0 && (
                      <View
                        style={
                          styles.tags
                        }
                      >
                        {safeFocus.map(
                          (
                            focus
                          ) => (
                            <View
                              key={
                                focus
                              }
                              style={
                                styles.tag
                              }
                            >
                              <Text
                                style={
                                  styles.tagText
                                }
                              >
                                {
                                  focus
                                }
                              </Text>
                            </View>
                          )
                        )}
                      </View>
                    )}

                    {/* META */}

                    <View
                      style={
                        styles.metaRow
                      }
                    >
                      <View
                        style={
                          styles.metaItem
                        }
                      >
                        <Ionicons
                          name="calendar-outline"
                          size={12}
                          color={
                            uiTheme.colors
                              .textSecondary
                          }
                        />

                        <Text
                          style={
                            styles.metaText
                          }
                        >
                          {
                            profile.weeklySessions
                          }
                          × pro Woche
                        </Text>
                      </View>

                      <View
                        style={
                          styles.metaDot
                        }
                      />

                      <Text
                        style={
                          styles.metaText
                        }
                      >
                        {
                          profile.difficulty
                        }
                      </Text>
                    </View>
                  </View>

                  {/* RADIO */}

                  <View
                    style={[
                      styles.radio,

                      active &&
                        styles.radioActive,
                    ]}
                  >
                    {active && (
                      <View
                        style={
                          styles.radioDot
                        }
                      />
                    )}
                  </View>
                </Pressable>
              );
            }
          )}
        </View>

        {/* GLUTE EXPLANATION */}

        {selected ===
          'glute-focus' && (
          <View
            style={
              styles.gluteInfo
            }
          >
            <View
              style={
                styles.gluteInfoIcon
              }
            >
              <Ionicons
                name="body-outline"
                size={21}
                color={
                  uiTheme.colors
                    .primary
                }
              />
            </View>

            <View
              style={
                styles.gluteInfoContent
              }
            >
              <Text
                style={
                  styles.gluteInfoTitle
                }
              >
                Glute Focus
              </Text>

              <Text
                style={
                  styles.gluteInfoText
                }
              >
                Dein erster Pfad enthält 14 progressive Einheiten für Gesäß und Beine.
              </Text>

              <Text
                style={
                  styles.gluteInfoText
                }
              >
                Schwerpunkt: Glute Bridges, Split Squats, Lunges, Abduktion und einbeinige Übungen.
              </Text>
            </View>
          </View>
        )}

        {/* BUTTON */}

        <Pressable
          disabled={saving}
          onPress={finish}
          style={[
            styles.button,

            saving &&
              styles.buttonDisabled,
          ]}
        >
          <View>
            <Text
              style={
                styles.buttonSmall
              }
            >
              AUSGEWÄHLTER PFAD
            </Text>

            <Text
              style={
                styles.buttonText
              }
            >
              {saving
                ? 'Wird gespeichert...'
                : getSelectedTitle(
                    selected
                  )}
            </Text>
          </View>

          <View
            style={
              styles.buttonArrow
            }
          >
            <Ionicons
              name="arrow-forward"
              size={20}
              color="#FFFFFF"
            />
          </View>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function getSelectedTitle(
  id: TrainingProfileId
) {
  const profile =
    trainingProfiles.find(
      (item) =>
        item.id === id
    );

  return (
    profile?.title ??
    'Training starten'
  );
}

function getProfileIcon(
  id: TrainingProfileId
): keyof typeof Ionicons.glyphMap {
  switch (id) {
    case 'glute-focus':
      return 'body-outline';

    case 'advanced':
      return 'flash-outline';

    case 'intermediate':
      return 'barbell-outline';

    case 'beginner':
    default:
      return 'walk-outline';
  }
}

const styles =
  StyleSheet.create({
    screen: {
      flex: 1,

      backgroundColor:
        uiTheme.colors.background,
    },

    content: {
      paddingHorizontal: 17,

      paddingTop: 24,

      paddingBottom: 40,
    },

    // HEADER

    headerIcon: {
      width: 52,

      height: 52,

      borderRadius: 17,

      backgroundColor:
        'rgba(39,182,237,0.10)',

      borderWidth: 1,

      borderColor:
        'rgba(39,182,237,0.12)',

      alignItems: 'center',

      justifyContent:
        'center',
    },

    eyebrow: {
      color:
        uiTheme.colors.primary,

      fontSize: 7,

      fontWeight: '900',

      letterSpacing: 2.3,

      marginTop: 22,
    },

    title: {
      color:
        uiTheme.colors.text,

      fontSize: 31,

      lineHeight: 37,

      fontWeight: '900',

      marginTop: 6,
    },

    subtitle: {
      color:
        uiTheme.colors
          .textSecondary,

      fontSize: 10,

      lineHeight: 16,

      marginTop: 7,

      maxWidth: 340,
    },

    // OPTIONS

    options: {
      marginTop: 23,

      gap: 9,
    },

    option: {
      minHeight: 145,

      padding: 13,

      borderRadius:
        uiTheme.radius.large,

      backgroundColor:
        uiTheme.colors.surface,

      borderWidth: 1,

      borderColor:
        uiTheme.colors.border,

      flexDirection: 'row',

      alignItems:
        'flex-start',
    },

    optionActive: {
      borderColor:
        uiTheme.colors.primary,

      backgroundColor:
        '#102630',
    },

    optionIcon: {
      width: 47,

      height: 47,

      borderRadius: 15,

      backgroundColor:
        uiTheme.colors
          .surfaceElevated,

      alignItems: 'center',

      justifyContent:
        'center',
    },

    optionIconActive: {
      backgroundColor:
        uiTheme.colors
          .primaryDark,
    },

    optionInfo: {
      flex: 1,

      marginLeft: 11,

      paddingRight: 7,
    },

    optionTitleRow: {
      flexDirection: 'row',

      alignItems: 'center',

      flexWrap: 'wrap',

      gap: 7,
    },

    optionTitle: {
      color:
        uiTheme.colors.text,

      fontSize: 16,

      fontWeight: '900',
    },

    optionSubtitle: {
      color:
        uiTheme.colors.primary,

      fontSize: 8,

      fontWeight: '800',

      marginTop: 2,
    },

    optionDescription: {
      color:
        uiTheme.colors
          .textSecondary,

      fontSize: 8,

      lineHeight: 12,

      marginTop: 5,
    },

    gluteBadge: {
      paddingHorizontal: 6,

      paddingVertical: 3,

      borderRadius: 6,

      backgroundColor:
        'rgba(39,182,237,0.12)',
    },

    gluteBadgeText: {
      color:
        uiTheme.colors.primary,

      fontSize: 5,

      fontWeight: '900',

      letterSpacing: 1,
    },

    // TAGS

    tags: {
      flexDirection: 'row',

      flexWrap: 'wrap',

      gap: 4,

      marginTop: 8,
    },

    tag: {
      paddingHorizontal: 7,

      paddingVertical: 4,

      borderRadius: 7,

      backgroundColor:
        uiTheme.colors
          .surfaceElevated,
    },

    tagText: {
      color:
        uiTheme.colors
          .textSecondary,

      fontSize: 6,

      fontWeight: '700',
    },

    // META

    metaRow: {
      flexDirection: 'row',

      alignItems: 'center',

      flexWrap: 'wrap',

      marginTop: 8,

      gap: 6,
    },

    metaItem: {
      flexDirection: 'row',

      alignItems: 'center',

      gap: 4,
    },

    metaText: {
      color:
        uiTheme.colors.textMuted,

      fontSize: 7,
    },

    metaDot: {
      width: 3,

      height: 3,

      borderRadius: 2,

      backgroundColor:
        uiTheme.colors.textMuted,
    },

    // RADIO

    radio: {
      width: 21,

      height: 21,

      borderRadius: 11,

      borderWidth: 2,

      borderColor:
        uiTheme.colors.textMuted,

      alignItems: 'center',

      justifyContent:
        'center',

      marginTop: 2,
    },

    radioActive: {
      borderColor:
        uiTheme.colors.primary,
    },

    radioDot: {
      width: 9,

      height: 9,

      borderRadius: 5,

      backgroundColor:
        uiTheme.colors.primary,
    },

    // GLUTE INFO

    gluteInfo: {
      marginTop: 12,

      padding: 13,

      borderRadius:
        uiTheme.radius.medium,

      borderWidth: 1,

      borderColor:
        'rgba(39,182,237,0.15)',

      backgroundColor:
        'rgba(39,182,237,0.06)',

      flexDirection: 'row',

      alignItems:
        'flex-start',
    },

    gluteInfoIcon: {
      width: 40,

      height: 40,

      borderRadius: 13,

      backgroundColor:
        'rgba(39,182,237,0.10)',

      alignItems: 'center',

      justifyContent:
        'center',
    },

    gluteInfoContent: {
      flex: 1,

      marginLeft: 10,
    },

    gluteInfoTitle: {
      color:
        uiTheme.colors.text,

      fontSize: 11,

      fontWeight: '900',
    },

    gluteInfoText: {
      color:
        uiTheme.colors
          .textSecondary,

      fontSize: 8,

      lineHeight: 13,

      marginTop: 4,
    },

    // BUTTON

    button: {
      minHeight: 64,

      marginTop: 20,

      paddingHorizontal: 16,

      borderRadius: 19,

      backgroundColor:
        uiTheme.colors
          .primaryDark,

      flexDirection: 'row',

      alignItems: 'center',

      justifyContent:
        'space-between',
    },

    buttonDisabled: {
      opacity: 0.65,
    },

    buttonSmall: {
      color:
        'rgba(255,255,255,0.65)',

      fontSize: 6,

      fontWeight: '900',

      letterSpacing: 1.3,
    },

    buttonText: {
      color: '#FFFFFF',

      fontSize: 14,

      fontWeight: '900',

      marginTop: 3,
    },

    buttonArrow: {
      width: 38,

      height: 38,

      borderRadius: 13,

      backgroundColor:
        'rgba(255,255,255,0.10)',

      alignItems: 'center',

      justifyContent:
        'center',
    },
  });