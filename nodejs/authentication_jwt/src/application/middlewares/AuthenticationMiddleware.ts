import jsonwebtoken from 'jsonwebtoken';
import {
  IData,
  IMiddleware,
  IRequest,
  IRespose,
} from '../interfaces/IMiddleware';

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

      const payload = jsonwebtoken.verify(token, env.jswSecret);

      return {
        data: {
          userId: payload.sub,
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
