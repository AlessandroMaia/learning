import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { Switch } from "./ui/switch";

interface IControlledSwitchProps<T extends FieldValues> {
  control: Control<T>,
  name: FieldPath<T>;
}

export function ControlledSwitch<T extends FieldValues>({ control, name }: IControlledSwitchProps<T>) {
  return (
    <Controller
    control={control}
    name={name}
      render={({ field }) => (
        <Switch
          ref={field.ref}
          name={field.name}
          onBlur={field.onBlur}
          onCheckedChange={field.onChange}
          checked={field.value}
          disabled={field.disabled}
        />
      )}
    />
  );
}
