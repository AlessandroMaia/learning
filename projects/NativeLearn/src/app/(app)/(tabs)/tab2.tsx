import { Text } from '@components/Text';
import { View } from '@components/View';
import { useAuth } from '@contexts/AuthContext';


export default function Tab2() {
  const { onLogout } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>
        Tab2
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
