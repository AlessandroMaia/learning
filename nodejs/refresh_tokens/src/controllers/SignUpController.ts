import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

import { AccountsRepository } from '../repositories/AccountsRepository';

export class SignUpController {
  static schema = z.object({
    name: z.string().min(2),
    email: z.string().email().min(1),
    password: z.string().min(8),
  });

  static handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const result = this.schema.safeParse(request.body);

    if(!result.success) {
      return reply
        .status(400)
        .send({ errors: result.error.issues });
    }

    const { name, email, password } = result.data;

    const emailAlreadyExists = await AccountsRepository.findByEmail(email);

    if(emailAlreadyExists) {
      return reply
        .status(401)
        .send({ error: 'Account already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await AccountsRepository.create({
      name,
      email,
      password: hashedPassword
    });

    return reply.code(200);
  };
}
