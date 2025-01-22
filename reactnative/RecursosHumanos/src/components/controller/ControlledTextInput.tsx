 
import Octions from '@expo/vector-icons/Octicons';
import { useState } from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import {
  TextInput as NativeTextInput,
  TextInputProps as NativeTextInputProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { theme } from 'src/constants/theme';

interface IControlledTextInputProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<NativeTextInputProps, 'defaultValue'> {
  label: string;
  errors?: string;
  isPassword?: boolean;
}

export function ControlledTextInput<T extends FieldValues>({
  name,
  control,
  label,
  isPassword,
  disabled,
  ...textInputProps
}: IControlledTextInputProps<T>) {
  const [hidePassword, setHidePassword] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Text>{label}</Text>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onBlur, onChange, value, ref },
          fieldState: { error },
        }) => (
          <View>
            <NativeTextInput
              ref={ref}
              style={[
                styles.input,
                { paddingRight: isPassword ? 50 : 16 },
                isFocused && { borderColor: theme.base.light.primary },
                error && { borderColor: theme.base.light.destructive },
              ]}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false);
                onBlur();
              }}
              onChangeText={onChange}
              value={value}
              editable={!disabled}
              {...textInputProps}
              secureTextEntry={isPassword && hidePassword}
            />
            {error && <Text style={{ color: theme.base.light.destructive }}>{error.message}</Text>}
          </View>
        )}
      />
      {isPassword && (
        <TouchableOpacity
          style={styles.rigthIcon}
          onPress={() => setHidePassword(!hidePassword)}
        >
          <Octions
            name={hidePassword ? 'eye-closed' : 'eye'}
            size={25}
            color={theme.base.light.foreground}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: theme.base.light.background,
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderRadius: theme.base.root.radius,
    borderColor: theme.base.light.border,
    marginVertical: 4,
    padding: 16,
    fontSize: 16,
  },
  rigthIcon: {
    position: 'absolute',
    right: 16,
    top: 40,
    zIndex: 1,
  },
});
