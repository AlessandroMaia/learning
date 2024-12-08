import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';
import { IData, IMiddleware } from '../interfaces/IMiddleware';
import { IRespose } from '../interfaces/IRespose';
import { IRequest } from '../interfaces/IRequest';

import { env } from '../config/env';

export class AuthenticationMiddleware implements IMiddleware {
  async handle({ headers }: IRequest): Promise<IRespose | IData> {
    const { authorization } = headers;

    if (!authorization) {
      return {
        statusCode: 401,
        body: {
          error: 'Invalid access token.',
        },
      };
    }

    try {
      const [bearer, token] = authorization.split(' ');

      if (bearer !== 'Bearer') throw new Error();

      const payload = jsonwebtoken.verify(token, env.jswSecret) as JwtPayload;

      return {
        data: {
          account: {
            id: payload.sub,
            role: payload.role,
          },
        },
      };
    } catch {
      return {
        statusCode: 401,
        body: {
          error: 'Invalid access token.',
        },
      };
    }
  }
}
