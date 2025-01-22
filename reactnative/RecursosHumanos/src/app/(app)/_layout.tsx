import { useAuth } from '@hooks/AuthContext';
import { Stack } from 'expo-router';

export default function AppLayout() {
  const { auth } = useAuth();

  // if (!auth?.authenticated) {
  //   return <Redirect href="/sign-in" />;
  // }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
    </Stack>
  );
}
