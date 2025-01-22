import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Tabs } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

function CustomTabBar({ }: BottomTabBarProps){
  return (
    <View>
      <Text>teste</Text>
      <DrawerToggleButton />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }} tabBar={props => <CustomTabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
          headerShown: false
        }}
      />
    </Tabs>
  );
}
