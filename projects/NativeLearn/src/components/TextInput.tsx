/* eslint-disable no-restricted-imports */
import { theme } from '@constants/theme';
import { useThemeColor } from '@hooks/useThemeColor';
import * as React from 'react';
import {
  NativeSyntheticEvent,
  TextInput as RNTextInput,
  StyleSheet,
  TextInputFocusEventData,
  TextInputProps
} from 'react-native';

interface ITextInputProps
  extends TextInputProps {
    disabled?: boolean;
    error?: boolean;
}

const TextInput = React.forwardRef<RNTextInput, ITextInputProps>(
  ({ style, disabled = false, error = false, onFocus, onBlur, ...rest }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    function handleFocus(e: NativeSyntheticEvent<TextInputFocusEventData>){
      setIsFocused(true);

      if(onFocus)
        onFocus(e);
    }

    function handleBlur(e: NativeSyntheticEvent<TextInputFocusEventData>){
      setIsFocused(false);

      if(onBlur)
        onBlur(e);
    }

    const styleDynamic = {
      borderColor: useThemeColor({ color: error ? 'destructive' : 'input' }),
      backgroundColor: useThemeColor({ color: 'background' }),
      color: useThemeColor({ color: 'foreground' }),
    };

    const placeholderTextColor = useThemeColor({ color: 'muted-foreground' });
    const focusedBorderColor = useThemeColor({ color: error ? 'destructive' : 'foreground', opacity: 0.4 });

    return (
      <RNTextInput
        ref={ref}
        editable={!disabled}
        style={[
          { ...styles.input, ...styleDynamic },
          style,
          disabled && { opacity: 0.5 },
          isFocused && { borderColor: focusedBorderColor, borderWidth: 2 }
        ]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholderTextColor={placeholderTextColor}
        {...rest}
      />
    );
  }
);

TextInput.displayName = 'TextInput';

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '100%',
    borderRadius: theme.radius.md,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    ...theme.text.base
  }
});

export { TextInput };

