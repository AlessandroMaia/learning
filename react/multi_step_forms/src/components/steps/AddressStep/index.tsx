import { StepperFooter, StepperPreviousButton } from '@/components/Stepper';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { useFormContext } from 'react-hook-form';
import type { FormData } from '@/App';
import { StepHeader } from '@/components/StepHeader';

export function AddressStep() {
  const form = useFormContext<FormData>();

  return (
    <div>
      <StepHeader title="Endereço" description="De onde você é?" />

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="state">Estado</Label>
          <Input id="state" {...form.register('addressStep.state')} />
          {form.formState.errors.addressStep?.state?.message && (
            <small className="text-destructive">
              {form.formState.errors.addressStep?.state?.message}
            </small>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">Cidade</Label>
          <Input id="city" {...form.register('addressStep.city')} />
          {form.formState.errors.addressStep?.city?.message && (
            <small className="text-destructive">
              {form.formState.errors.addressStep?.city?.message}
            </small>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="street">Endereço</Label>
          <Input id="street" {...form.register('addressStep.street')} />
          {form.formState.errors.addressStep?.street?.message && (
            <small className="text-destructive">
              {form.formState.errors.addressStep?.street?.message}
            </small>
          )}
        </div>
      </div>

      <StepperFooter>
        <StepperPreviousButton disabled={form.formState.isSubmitting} />
        <Button size="sm" disabled={form.formState.isSubmitting} type="submit">
          Finalizar
        </Button>
      </StepperFooter>
    </div>
  );
}
