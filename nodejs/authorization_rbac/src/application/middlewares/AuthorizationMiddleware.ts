import { IData, IMiddleware } from '../interfaces/IMiddleware';
import { IRespose } from '../interfaces/IRespose';
import { IRequest } from '../interfaces/IRequest';

export class AuthorizationMiddleware implements IMiddleware {
  constructor(private readonly allowedRoles: string[]){}

  async handle(request: IRequest): Promise<IRespose | IData> {
    if(!request.account)
      return {
        statusCode: 403,
        body: {
          error: 'Access denied!'
        }
      };

    if (!this.allowedRoles.includes(request.account.role))
      return {
        statusCode: 403,
        body: {
          error: 'Access denied!'
        }
      };

    return {
      data: {}
    };
  }
}
