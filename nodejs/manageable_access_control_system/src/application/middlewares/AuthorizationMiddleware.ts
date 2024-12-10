import { IData, IMiddleware } from '../interfaces/IMiddleware';
import { IRespose } from '../interfaces/IRespose';
import { IRequest } from '../interfaces/IRequest';
import { GetRolePermissonsUseCase } from '../useCases/GetRolePermissonsUseCase';

export class AuthorizationMiddleware implements IMiddleware {
  constructor(
    private readonly requiredPermissions: string[],
    private readonly getRolePermissonsUseCase: GetRolePermissonsUseCase
  ) {}

  async handle(request: IRequest): Promise<IRespose | IData> {
    if (!request.account)
      return {
        statusCode: 403,
        body: {
          error: 'Access denied!',
        },
      };

    const { permissionsCodes } = await this.getRolePermissonsUseCase.execute({ roleId: request.account.role});

    const isAllowed = this.requiredPermissions.some(code => permissionsCodes.includes(code));

    if (!isAllowed)
      return {
        statusCode: 403,
        body: {
          error: 'Access denied!',
        },
      };

    return {
      data: {},
    };
  }
}
