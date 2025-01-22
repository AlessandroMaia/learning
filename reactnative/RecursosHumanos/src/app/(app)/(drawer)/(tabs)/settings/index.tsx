import { useAuth } from '@hooks/AuthContext';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Text, View } from 'react-native';


export default function Index() {
  const { onLogout } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={onLogout}>
        settings
      </Text>
      <DrawerToggleButton />
    </View>
  );
}
