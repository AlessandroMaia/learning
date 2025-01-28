import { Text } from '@components/Text';
import { View } from '@components/View';
import { useAuth } from '@contexts/AuthContext';


export default function Home() {
  const { onLogout } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>
        Home
      </Text>
      <Text
        onPress={async () => {
          await onLogout!();
        }}>
        Sign Out
      </Text>
    </View>
  );
}
