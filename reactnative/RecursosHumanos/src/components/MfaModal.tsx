import { theme } from '@constants/theme';
import Octions from '@expo/vector-icons/Octicons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@hooks/AuthContext';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';
import { Button } from './Button';
import { ControlledTextInput } from './controller/ControlledTextInput';

interface IMfaModalProps {
  username: string;
  visible: boolean;
  onClose(): void;
}

const schema = z.object({
  code: z.string({ message: 'Campo aceita apenas números.'}).min(1, 'O código é obirgatório!'),
});

type TMfa = z.infer<typeof schema>;

export function MfaModal({ username, visible, onClose }: IMfaModalProps) {
  const { onMfa } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit: handleSubmitForm, setError, reset } = useForm<TMfa>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  async function handleSubmit(data: TMfa) {
    try {
      setIsLoading(true);

      const res = await onMfa!(username, data.code);
  
      if (res.type === 'success') {
        handleClose();
      } else {
        setError('code', { message: 'Código inválido!' }, { shouldFocus: true });
      }
    } catch {
      setError('code', { message: 'Erro ao validar o código!' }, { shouldFocus: true });
    } finally {
      setIsLoading(false);
    }
  }

  function handleClose() {
    setIsLoading(false);
    onClose();
    reset();
  }

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Autenticação em dois fatores</Text>
            <TouchableOpacity onPress={handleClose}>
              <Octions name="x" size={20} color={theme.base.light.foreground} />
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>
            Por favor, forneça o código gerado pelo Microsoft Authenticator para
            concluir o login:
          </Text>
          <View style={styles.body}>
            <ControlledTextInput
              control={control}
              name="code"
              label="Código"
              keyboardType="number-pad"
              returnKeyType="done"
              submitBehavior="submit"
              onSubmitEditing={handleSubmitForm(handleSubmit)}
              disabled={isLoading}
            />
          </View>
          <Button isLoading={isLoading} onPress={handleSubmitForm(handleSubmit)}/>
        </View>
      </View>
      <StatusBar backgroundColor={'rgba(0, 0, 0, 0.6)'} barStyle={'light-content'}/>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: 24,
  },
  modal: {
    backgroundColor: theme.base.light.background,
    borderRadius: theme.base.root.radius,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '600',
  },
  subtitle: {
    marginTop: 10,
  },
  body: {
    marginVertical: 20,
  },
});
