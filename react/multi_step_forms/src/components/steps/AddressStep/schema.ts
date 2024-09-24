import { z } from 'zod';

export const addressSchema = z.object({
  state: z.string().email('Informe o estado'),
  city: z.string().min(1, 'Informe a cidade.'),
  street: z.string().min(1, 'Informe o endereço.'),
});