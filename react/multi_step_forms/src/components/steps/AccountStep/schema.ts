import { z } from 'zod';

export const accountSchema = z.object({
  email: z.string().email('Informe um e-mail válido'),
  password: z.string().min(1, 'Informe uma senha.'),
});
