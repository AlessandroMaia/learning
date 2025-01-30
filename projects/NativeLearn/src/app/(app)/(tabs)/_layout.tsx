import { CustomBottomTabBar } from '@components/CustomBottomTabBar';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <CustomBottomTabBar {...props}/>} screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: false }} >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <FontAwesome5  size={size} name="home" color={color} />
        }}
      />
      <Tabs.Screen
        name="tab1"
        options={{
          title: 'Tab1',
          tabBarIcon: ({ color, size }) => <FontAwesome5  size={size} name="table" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tab2"
        options={{
          title: 'Tab2',
          tabBarIcon: ({ color, size }) => <FontAwesome5  size={size} name="table" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tab3"
        options={{
          title: 'Tab3',
          tabBarIcon: ({ color, size }) => <FontAwesome5  size={size} name="table" color={color} />,
        }}
      />
    </Tabs>
  );
}
