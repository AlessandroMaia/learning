/* eslint-disable no-restricted-imports */
import { useThemeColor } from '@hooks/useThemeColor';
import React from 'react';
import { Text as RNText, TextProps } from 'react-native';

const Text = React.forwardRef<RNText, TextProps>(({style, ...props}, ref) => {
  const color = useThemeColor({ color: 'foreground' });

  return <RNText ref={ref} style={[{ color }, style]} {...props}/>;
});

Text.displayName = 'Text';

export { Text };

