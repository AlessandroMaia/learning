import { AuthProvider } from '@hooks/AuthContext';
import { Slot } from 'expo-router';
import ToastManager from 'toastify-react-native';

export default function Root() {
  return (
    <AuthProvider>
      <Slot />
      <ToastManager width={'auto'} height={'auto'} showCloseIcon={false}/>
    </AuthProvider>
  );
}
