import { Button } from '@components/Button';
import { TextInput } from '@components/TextInput';
import Octions from '@expo/vector-icons/Octicons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button variant='default' icon={<Octions name={'eye-closed'} size={25} color={'white'} />} />
      <TextInput />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
