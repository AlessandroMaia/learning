import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { compare } from 'bcryptjs';

import { AccountsRepository } from '../repositories/AccountsRepository';

export class SignInController {
  static schema = z.object({
    email: z.string().email().min(1),
    password: z.string().min(8),
  });

  static handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const result = this.schema.safeParse(request.body);

    if (!result.success) {
      return reply.status(400).send({ errors: result.error.issues });
    }

    const { email, password } = result.data;

    const account = await AccountsRepository.findByEmail(email);

    if (!account) {
      return reply.status(401).send({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await compare(password, account.password);

    if (!isPasswordValid) {
      return reply.status(401).send({ error: 'Invalid credentials' });
    }

    const accessToken = await reply.jwtSign({ sub: account.id });

    const refreshToken = await reply.jwtSign(
      { sub: account.id },
      { sign: { expiresIn: '10d' } }
    );

    return reply.code(200).send({ accessToken, refreshToken });
  };
}
