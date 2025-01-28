import { BottomTabBar } from '@components/BottomTabBar';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <BottomTabBar {...props}/>} screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <FontAwesome size={size} name="home" color={color} />
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <FontAwesome size={size} name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
