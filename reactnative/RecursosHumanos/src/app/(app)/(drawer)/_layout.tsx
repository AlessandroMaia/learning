import { router } from 'expo-router';
import Drawer from 'expo-router/drawer';
import { Button } from 'react-native';

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: 'Home',
          headerTitle: 'Home',
          headerRight: () => <Button onPress={() => {router.push('(tabs)/settings');}} title="Contact" />
        }}
      />
      <Drawer.Screen name="favourites"  />
    </Drawer>
  );
}