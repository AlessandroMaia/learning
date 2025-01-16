import React, { forwardRef, useState } from "react";
import { TextInput, TextInputProps } from "react-native";
import { styles } from "./styles";


/**
 * @type {React.FC<TextInputProps>}
 */
export const Input = forwardRef((props, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      style={[styles.input, isFocused && styles.inputFocused]}
      placeholderTextColor="#aaa"
      //editable={false}
      //readOnly
      //maxLength={9}
      //caretHidden
      //cursorColor="#444" //android only
      //selectionColor="#444"
      //autoFocus
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      ref={ref}
      {...props}
    />
  );
});