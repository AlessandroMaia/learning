import { theme } from '@constants/theme';
import { useThemeColor } from '@hooks/useThemeColor';
import {
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface IButtonProps extends TouchableOpacityProps {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  icon?: React.ReactNode;
  text?: string;
}

export function Button({
  variant = 'default',
  size = 'default',
  disabled,
  style,
  icon,
  text,
  ...rest
}: IButtonProps) {
  const boxShadowColor = useThemeColor({
    color: 'background',
    opacity: Platform.OS === 'android' ? 0.8 : 0.1,
  });

  const variantStyles = {
    default: {
      backgroundColor: useThemeColor({ color: 'primary' }),
      color: useThemeColor({ color: 'primary-foreground' }),
      borderWidth: 0,
      borderColor: '',
      textDecorationLine: 'none',
    },
    destructive: {
      backgroundColor: useThemeColor({ color: 'destructive' }),
      color: useThemeColor({ color: 'destructive-foreground' }),
      borderWidth: 0,
      borderColor: '',
      textDecorationLine: 'none',
    },
    outline: {
      backgroundColor: useThemeColor({ color: 'background' }),
      color: useThemeColor({ color: 'foreground' }),
      borderWidth: 1,
      borderColor: useThemeColor({ color: 'input' }),
      textDecorationLine: 'none',
    },
    secondary: {
      backgroundColor: useThemeColor({ color: 'destructive' }),
      color: useThemeColor({ color: 'destructive-foreground' }),
      borderWidth: 0,
      borderColor: '',
      textDecorationLine: 'none',
    },
    ghost: {
      backgroundColor: '',
      color: useThemeColor({ color: 'foreground' }),
      borderWidth: 0,
      borderColor: '',
      textDecorationLine: 'none',
    },
    link: {
      backgroundColor: '',
      color: useThemeColor({ color: 'primary' }),
      borderWidth: 0,
      borderColor: '',
      textDecorationLine: 'underline',
    },
  };

  const {
    backgroundColor,
    color,
    borderWidth,
    borderColor,
    textDecorationLine,
  } = variantStyles[variant];

  const sizeStyles = {
    default: {
      height: 40,
      paddingHorizontal: 16,
      paddingVertical: 8,
      width: 'auto',
    },
    sm: {
      height: 36,
      paddingHorizontal: 12,
      paddingVertical: 0,
      width: 'auto',
    },
    lg: {
      height: 44,
      paddingHorizontal: 32,
      paddingVertical: 0,
      width: 'auto',
    },
    icon: {
      height: 40,
      paddingHorizontal: 0,
      paddingVertical: 0,
      width: 40,
    },
  };

  const { width, height, paddingHorizontal, paddingVertical } =
    sizeStyles[size];

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          boxShadow: `0px 0px 1px ${boxShadowColor}`,
          backgroundColor,
          borderWidth,
          borderColor,
          width: width as TextStyle['width'],
          height,
          paddingHorizontal,
          paddingVertical,
        },
        disabled && { opacity: 0.5 },
        style,
      ]}
      {...rest}
    >
      {icon}
      {text && (
        <Text
          style={[
            styles.text,
            {
              color,
              textDecorationLine:
                textDecorationLine as TextStyle['textDecorationLine'],
            },
          ]}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: theme.radius.md,
    elevation: 2,
  },
  text: {
    ...theme.text.sm,
    fontWeight: theme.font.medium as TextStyle['fontWeight'],
  },
});
