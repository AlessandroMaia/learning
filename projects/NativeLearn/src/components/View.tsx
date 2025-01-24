/* eslint-disable no-restricted-imports */
import { useThemeColor } from '@hooks/useThemeColor';
import React from 'react';
import { View as RNView, ViewProps } from 'react-native';

const View = React.forwardRef<RNView, ViewProps>(({style, ...props}, ref) => {
  const backgroundColor = useThemeColor({ color: 'background' });

  return <RNView ref={ref} style={[{ backgroundColor }, style]} {...props}/>;
});

View.displayName = 'View';

export { View };

