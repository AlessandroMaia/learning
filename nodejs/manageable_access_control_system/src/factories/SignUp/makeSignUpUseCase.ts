import { SignUpUseCase } from '../../application/useCases/SignUpUseCase';

import { env } from '../../application/config/env';

export function makeSignUpUseCase(){
  return new SignUpUseCase(Number(env.SALT));
}
