/* eslint-disable @typescript-eslint/no-require-imports */
import { Button } from '@components/Button';
import {
  FormControl,
  FormErrorMessage,
  FormField,
  FormLabel,
} from '@components/FormField';
import { TextInput } from '@components/TextInput';
import { View } from '@components/View';
import { useAuth } from '@contexts/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useThemeColor } from '@hooks/useThemeColor';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Image, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { z } from 'zod';

const schema = z.object({
  username: z.string().min(1, 'O usuário é obrigatório!'),
  password: z.string().min(8, 'A senha deve conter no mínimo 8 caracteres!'),
});

type TSignin = z.infer<typeof schema>;

export default function SignIn() {
  const backgroundColor = useThemeColor({ color: 'background' });
  const { control, setFocus, handleSubmit } = useForm<TSignin>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const { onLogin } = useAuth();

  async function onSubmit(data: TSignin) {
    await onLogin!(data.username, data.password);
  }

  return (
    <KeyboardAvoidingView style={[styles.container, { backgroundColor }]}>
      <Image
        source={require('../assets/images/icon.png')}
        style={styles.icon}
      />
      <View style={styles.form}>
        <FormField>
          <FormLabel>Username</FormLabel>
          <FormControl
            control={control}
            name="username"
            render={({
              field: { onBlur, onChange, value },
              fieldState: { invalid },
            }) => (
              <TextInput
                placeholder="place your username"
                keyboardType="ascii-capable"
                returnKeyType="next"
                onSubmitEditing={() => setFocus('password')}
                error={invalid}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <FormErrorMessage />
        </FormField>
        <FormField>
          <FormLabel>Password</FormLabel>
          <FormControl
            control={control}
            name="password"
            render={({
              field: { onBlur, onChange, value },
              fieldState: { invalid },
            }) => (
              <TextInput
                placeholder="place your password"
                keyboardType="ascii-capable"
                returnKeyType="done"
                error={invalid}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <FormErrorMessage />
        </FormField>
        <Button text="SignIn" onPress={handleSubmit(onSubmit)} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: { width: 150, height: 150 },
  form: {
    marginTop: 20,
    gap: 15,
    width: 330,
  },
});
