import { useForm, FormProvider } from 'react-hook-form';
import { Stepper } from './components/Stepper';
import { AccountStep } from './components/steps/AccountStep';
import { AddressStep } from './components/steps/AddressStep';
import { PersonalDataStep } from './components/steps/PersonalDataStep';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { accountSchema } from './components/steps/AccountStep/schema';
import { addressSchema } from './components/steps/AddressStep/schema';
import { personalDataSchema } from './components/steps/PersonalDataStep/schema';

const schema = z.object({
  accountStep: accountSchema,
  addressStep: addressSchema,
  personalDataStep: personalDataSchema,
});

export type FormData = z.infer<typeof schema>;

export function App() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      accountStep: {
        email: '',
        password: '',
      },
      personalDataStep: {
        firstName: '',
        lastName: '',
        document: '',
      },
      addressStep: {
        state: '',
        city: '',
        street: '',
      },
    },
  });

  const handleSubmit = form.handleSubmit(async (formData) => {
    console.log('🚀 ~ handleSubmit ~ formData:', formData);
    await new Promise((res) => setTimeout(res, 1000));
  });

  useEffect(() => {
    if (form.formState.isDirty) {
      window.onbeforeunload = () => {
        return 'teste';
      };
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [form.formState.isDirty]);

  return (
    <div className="min-h-screen flex justify-center py-10">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit}>
          <Stepper
            steps={[
              {
                label: 'Conta',
                content: <AccountStep />,
              },
              {
                label: 'Dados pessoais',
                content: <PersonalDataStep />,
              },
              {
                label: 'Endereço',
                content: <AddressStep />,
              },
            ]}
          />
        </form>
      </FormProvider>
    </div>
  );
}
