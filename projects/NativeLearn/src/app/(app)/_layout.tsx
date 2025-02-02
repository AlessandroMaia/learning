import { CustomDrawerContent } from '@components/CustomDrawerContent';
import { useAuth } from '@contexts/AuthContext';
import { Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function AppLayout() {
  const { authState } = useAuth();

  if (!authState?.authenticated) return <Redirect href="/sign-in" />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={CustomDrawerContent} screenOptions={{ headerShown: false }}>
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: 'Home',
            title: '',
          }}
        />
        <Drawer.Screen
          name="user"
          options={{
            drawerLabel: 'User',
            title: 'User',
            headerShown: true
          }}

        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
