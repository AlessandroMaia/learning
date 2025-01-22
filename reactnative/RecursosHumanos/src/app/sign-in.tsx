/* eslint-disable @typescript-eslint/no-require-imports */
import { Button } from '@components/Button';
import { ControlledTextInput } from '@components/controller/ControlledTextInput';
import { MfaModal } from '@components/MfaModal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@hooks/AuthContext';
import { router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Toast } from 'toastify-react-native';
import { z } from 'zod';

const schema = z.object({
  username: z.string().min(1, 'O usuário é obrigatório!'),
  password: z.string().min(8, 'A senha deve conter no mínimo 8 caracteres!'),
});

type TSignin = z.infer<typeof schema>;

export default function SignIn() {
  const { onLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isMfaModalVisible, setIsMfaModalVisible] = useState(false);
  const { control, handleSubmit, setFocus, setError, getValues } =
    useForm<TSignin>({
      resolver: zodResolver(schema),
      mode: 'onBlur',
      defaultValues: {
        username: '',
        password: '',
      },
    });
    
  function handleError(message: string) {
    setError('username', { message }, { shouldFocus: true });
    setError('password', { message });
    Toast.error(message);
  }

  async function onSubmit(data: TSignin) {
    const encodedPassword = btoa(
      encodeURIComponent(data.password).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      )
    );

    setIsLoading(true);
    try {
      const result = await onLogin!(data.username, encodedPassword);

      if (result.type === 'success') {
        if (result.resultado.Usuario.SituacaoMFA === 3) {
          handleError('Para primeiro login, favor efetuar pelo computador');
          return;
        }

        if (result.resultado.Usuario.SituacaoMFA === 4) {
          setIsMfaModalVisible(true);
        } else {
          router.replace('/');
        }
      } else {
        handleError(result.mensagem || 'Credenciais inválidas!');
      }
    } catch {
      handleError('Erro inesperado. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleModalClose() {
    setIsMfaModalVisible(false);
  }

  return (
    <View style={styles.wrapper}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.iconContainer}>
          <Image source={require('../assets/icon.png')} style={styles.icon} />
        </View>
        <Text style={styles.title}>Bem vindo(a)!</Text>
        <View style={styles.form}>
          <ControlledTextInput
            control={control}
            name="username"
            label="Usuário"
            placeholder="usuário"
            keyboardType="ascii-capable"
            returnKeyType="next"
            submitBehavior="submit"
            onSubmitEditing={() => setFocus('password')}
            disabled={isLoading}
          />
          <View>
            <ControlledTextInput
              control={control}
              name="password"
              label="Senha"
              placeholder="Senha"
              returnKeyType="done"
              keyboardType="ascii-capable"
              isPassword
              onSubmitEditing={handleSubmit(onSubmit)}
              disabled={isLoading}
            />
            <Text>Esqueceu a senha?</Text>
          </View>
          <Button onPress={handleSubmit(onSubmit)} isLoading={isLoading} />
        </View>
      </KeyboardAvoidingView>
      <MfaModal
        username={getValues().username}
        onClose={handleModalClose}
        visible={isMfaModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: 25,
    flex: 1,
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
  },
  icon: { width: 150, height: 150 },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 28,
    fontWeight: '500',
    marginVertical: 30,
  },
  form: {
    gap: 20,
  },
});
