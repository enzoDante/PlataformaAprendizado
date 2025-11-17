import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: 'Courses',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="book.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="pythonWorld"
        options={{
          title: 'Python World',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="book.pages.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="javaWorld"
        options={{
          title: 'Java World',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="book.pages.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cWorld"
        options={{
          title: 'C World',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="book.pages.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="logicWorld"
        options={{
          title: 'Logic World',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="book.pages.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: 'Register',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.crop.circle.fill.badge.plus" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.crop.circle.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: 'Register',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.crop.circle.fill.badge.plus" color={color} />,
        }}
      />
      
    </Tabs>
  );
}
