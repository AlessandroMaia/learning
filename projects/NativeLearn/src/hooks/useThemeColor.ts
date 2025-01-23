import { theme } from '@constants/theme';
import { useColorScheme } from 'react-native';

type TThemeColorProps =
  | {
      props: { light?: string; dark?: string };
      color?: never;
      opacity?: never;
    }
  | {
      props?: never;
      color: keyof typeof theme.light & keyof typeof theme.dark;
      opacity?: number;
    };

export function useThemeColor({ props, color, opacity = 1 }: TThemeColorProps) {
  const currentTheme = useColorScheme() ?? 'light';
  if (props) {
    const colorFromProps = props[currentTheme];

    if (colorFromProps) return colorFromProps;
  }

  return `rgba(${theme[currentTheme][color!]}, ${opacity})`;
}
