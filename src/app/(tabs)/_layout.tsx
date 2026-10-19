import Ionicons from '@expo/vector-icons/Ionicons';

import {
  Tabs,
} from 'expo-router';

import {
  uiTheme,
} from '../../theme/uiTheme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown:
          false,

        tabBarShowLabel:
          true,

        tabBarActiveTintColor:
          uiTheme.colors.primary,

        tabBarInactiveTintColor:
          '#647A84',

        tabBarStyle: {
          position:
            'absolute',

          height: 76,

          paddingTop: 8,

          paddingBottom: 8,

          backgroundColor:
            '#09151C',

          borderTopWidth: 1,

          borderTopColor:
            uiTheme.colors.border,
        },

        tabBarLabelStyle: {
          fontSize: 9,

          fontWeight: '800',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Pfad',

          tabBarIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="map-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="training"
        options={{
          title:
            'Training',

          tabBarIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="barbell-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="skills"
        options={{
          title: 'Skills',

          tabBarIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="git-branch-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="exercises"
        options={{
          title:
            'Sammlung',

          tabBarIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="grid-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Held',

          tabBarIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="person-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}