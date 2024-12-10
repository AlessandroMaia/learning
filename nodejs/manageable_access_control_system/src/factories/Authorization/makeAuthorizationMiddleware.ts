import { AuthorizationMiddleware } from '../../application/middlewares/AuthorizationMiddleware';
import { GetRolePermissonsUseCase } from '../../application/useCases/GetRolePermissonsUseCase';

export function makeAuthorizationMiddleware(allowedRoles: string[]) {
  return new AuthorizationMiddleware(allowedRoles, new GetRolePermissonsUseCase());
}
