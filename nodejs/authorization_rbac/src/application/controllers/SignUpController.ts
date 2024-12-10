import { z, ZodError } from 'zod';

import { IController } from '../interfaces/IController';
import { IRespose } from '../interfaces/IRespose';
import { IRequest } from '../interfaces/IRequest';

import { SignUpUseCase } from '../useCases/SignUpUseCase';
import { AccountsAlreadyExists } from '../errors/AccountsAlreadyExists';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email().min(1),
  password: z.string().min(8),
});

export class SignUpController implements IController {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  async handle({ body }: IRequest): Promise<IRespose> {
    try {
      const { name, email, password } = schema.parse(body);

      await this.signUpUseCase.execute({ name, email, password });

      return {
        statusCode: 204,
        body: null
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues
        };
      }

      if (error instanceof AccountsAlreadyExists) {
        return {
          statusCode: 409,
          body: {
            error: 'This email is already in use!'
          }
        };
      }

      throw error;
    }
  }
}
