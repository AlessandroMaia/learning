import { theme } from '@constants/theme';

type TColorProps = {
  color: keyof typeof theme.colors;
  step?: keyof (typeof theme.colors)[keyof typeof theme.colors];
  opacity?: number;
};

export function useColor({ color, step = 500, opacity = 1 }: TColorProps) {
  return `rgba(${theme.colors[color][step]}, ${opacity})`;
}
