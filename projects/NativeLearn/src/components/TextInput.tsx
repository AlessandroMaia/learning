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

const TextInput = React.forwardRef<RNTextInput, TextInputProps>(
  ({ style, editable, onFocus, onBlur, ...rest }, ref) => {
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
      borderColor: useThemeColor({ color: 'input' }),
      backgroundColor: useThemeColor({ color: 'background' }),
    };

    const placeholderTextColor = useThemeColor({ color: 'muted-foreground' });
    const focusedBorderColor = useThemeColor({ color: 'foreground' });

    return (
      <RNTextInput
        ref={ref}
        editable={editable}
        style={[
          { ...styles.input, ...styleDynamic },
          style,
          !editable && { opacity: 0.5 },
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
    ...theme.text.base,
    elevation: 2
  }
});

export { TextInput };



// import * as React from "react"

// import { cn } from "@/lib/utils"

// const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
//   ({ className, type, ...props }, ref) => {
//     return (
//       <input
//         type={type}
//         className={cn(
//           "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
//           className
//         )}
//         ref={ref}
//         {...props}
//       />
//     )
//   }
// )
// Input.displayName = "Input"

// export { Input }
