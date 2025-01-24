import { SessionProvider } from '@contexts/AuthContext';
import { Slot } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  return (
    <SessionProvider>
      <StatusBar translucent backgroundColor="transparent" barStyle="default" />
      <Slot />
    </SessionProvider>
  );
}
