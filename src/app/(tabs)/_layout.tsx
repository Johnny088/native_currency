import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Pressable } from 'react-native';

import { TabBarIcon } from '../../components/TabBarIcon';

export default function TabLayout() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDark ? '#a5b4fc' : '#4f46e5',
        tabBarInactiveTintColor: isDark ? '#9ca3af' : '#6b7280',
        tabBarStyle: { backgroundColor: isDark ? '#111827' : '#ffffff' },
        headerStyle: { backgroundColor: isDark ? '#111827' : '#ffffff' },
        headerTintColor: isDark ? '#f9fafb' : '#111827',
        headerRight: () => (
          <Pressable onPress={toggleColorScheme} className="mr-4 p-1">
            <FontAwesome
              name={isDark ? 'sun-o' : 'moon-o'}
              size={20}
              color={isDark ? '#f9fafb' : '#111827'}
            />
          </Pressable>
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Rates',
          tabBarIcon: ({ color }) => <TabBarIcon name="line-chart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="converter"
        options={{
          title: 'Converter',
          tabBarIcon: ({ color }) => <TabBarIcon name="exchange" color={color} />,
        }}
      />
    </Tabs>
  );
}
