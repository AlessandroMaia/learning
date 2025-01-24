/* eslint-disable @typescript-eslint/no-require-imports */
import { FormControl, FormErrorMessage, FormField, FormLabel } from '@components/FormField';
import { TextInput } from '@components/TextInput';
import { View } from '@components/View';
import { zodResolver } from '@hookform/resolvers/zod';
import { useThemeColor } from '@hooks/useThemeColor';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { z } from 'zod';

const schema = z.object({
  username: z.string().min(1, 'O usuário é obrigatório!'),
  password: z.string().min(8, 'A senha deve conter no mínimo 8 caracteres!'),
});

type TSignin = z.infer<typeof schema>;

export default function SignIn() {
  const { control } = useForm<TSignin>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const backgroundColor = useThemeColor({ color: 'background' });

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
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
            render={({ field, fieldState: { invalid } }) => (
              <TextInput
                placeholder="place your username"
                keyboardType="ascii-capable"
                returnKeyType="next"
                error={invalid}
                {...field}
              />
            )}
          />
          <FormErrorMessage />
        </FormField>
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
    gap: 20,
    width: 300,
  },
});
