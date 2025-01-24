/* eslint-disable no-restricted-imports */
import { theme } from '@constants/theme';
import { useThemeColor } from '@hooks/useThemeColor';
import React, { ReactElement, useContext, useState } from 'react';
import { Controller, ControllerProps, FieldValues } from 'react-hook-form';
import {
  Text as RNText,
  View as RNView,
  StyleSheet,
  TextProps,
  TextStyle,
  ViewProps,
} from 'react-native';
import { Text } from './Text';
import { View } from './View';

type TFormFieldProps = {
  error?: string | null;
  setError?: (message: string | null) => void;
};
const FormFieldContext = React.createContext<TFormFieldProps>({});
const useFormField = () => {
  return useContext(FormFieldContext);
};

type AllowedChildren =
  | ReactElement<typeof FormLabel>
  | ReactElement<typeof FormControl>
  | ReactElement<typeof FormDescription>
  | ReactElement<typeof FormErrorMessage>;

interface IFormFieldProps extends ViewProps {
  children: AllowedChildren | AllowedChildren[];
}

const FormField = React.forwardRef<RNView, IFormFieldProps>(
  ({ children, style, ...props }, ref) => {
    const [error, setError] = useState<string | null>(null);

    return (
      <FormFieldContext.Provider value={{ error, setError }}>
        <View ref={ref} style={[styles.field, style]} {...props}>
          {children}
        </View>
      </FormFieldContext.Provider>
    );
  }
);

interface IFormLabelProps extends TextProps {
  children: string;
}

const FormLabel = React.forwardRef<RNText, IFormLabelProps>(
  ({ children, style, ...props }, ref) => {
    const { error } = useFormField();
    const colorError = useThemeColor({ color: 'destructive' });

    return (
      <Text
        ref={ref}
        style={[
          styles.label,
          error && {
            color: colorError,
            fontWeight: theme.font.medium as TextStyle['fontWeight'],
          },
          style,
        ]}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

interface IFormControlProps<T extends FieldValues> extends ControllerProps<T> {
  teste?: string;
}

const FormControl = <T extends FieldValues>({
  render,
  ...props
}: IFormControlProps<T>) => {
  const { setError } = useFormField();

  return (
    <Controller
      {...props}
      render={({
        formState,
        field,
        fieldState: { error, invalid, isDirty, isTouched, isValidating },
      }) => {
        React.useEffect(() => {
          if (setError) {
            setError(error?.message || null);
          }
        }, [error, setError]);

        return render({
          field,
          fieldState: { error, invalid, isDirty, isTouched, isValidating },
          formState,
        });
      }}
    />
  );
};

interface IFormDescriptionProps extends TextProps {
  children: string;
}

const FormDescription = React.forwardRef<RNText, IFormDescriptionProps>(
  ({ children, style, ...props }, ref) => {
    const color = useThemeColor({ color: 'muted-foreground' });
    return (
      <Text
        ref={ref}
        style={[{ ...styles.description, color }, style]}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

const FormErrorMessage = React.forwardRef<RNView, ViewProps>(
  ({ ...props }, ref) => {
    const { error } = useFormField();
    const color = useThemeColor({ color: 'destructive' });

    if (!error) return null;

    return (
      <View ref={ref} {...props}>
        <Text style={{ ...styles.errorText, color }}>{error}</Text>
      </View>
    );
  }
);

FormField.displayName = 'FormField';
FormLabel.displayName = 'FormLabel';
FormControl.displayName = 'FormControl';
FormDescription.displayName = 'FormDescription';
FormErrorMessage.displayName = 'FormErrorMessage';

const styles = StyleSheet.create({
  field: {
    gap: 4,
    width: '100%',
    height: 'auto',
  },
  label: {
    ...theme.text.base,
    fontWeight: theme.font.medium as TextStyle['fontWeight'],
  },
  description: {
    ...theme.text.sm,
  },
  errorText: {
    ...theme.text.sm,
    fontWeight: theme.font.medium as TextStyle['fontWeight'],
  },
});

export { FormControl, FormDescription, FormErrorMessage, FormField, FormLabel };

