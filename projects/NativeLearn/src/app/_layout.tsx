import { AuthProvider } from '@contexts/AuthContext';
import { Slot } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <Slot />
    </AuthProvider>
  );
}
