import { useAuth } from '@hooks/AuthContext';
import { Text, View } from 'react-native';


export default function Index() {
  const { onLogout, auth } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={onLogout}>
        {auth?.infos.token?.TokenAcesso}, {auth?.infos.user?.Nome}
      </Text>
    </View>
  );
}
