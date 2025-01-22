import { theme } from '@constants/theme';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface IButtonProps extends TouchableOpacityProps {
  isLoading: boolean;
}

export function Button({ isLoading, ...rest }: IButtonProps) {
  return (
    <TouchableOpacity
      {...rest}
      style={[
        styles.button,
        {
          backgroundColor: isLoading
            ? theme.base.light.muted
            : theme.base.light.primary,
        },
      ]}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color={theme.base.light['muted-foreground']} />
      ) : (
        <Text style={styles.textButton}>Entrar</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  textButton: {
    fontSize: 16,
    color: theme.base.light['primary-foreground'],
    fontWeight: '500',
  },
});
