import bcrypt from 'bcryptjs';
import { prismaClient } from '../libs/prismaClient';
import { InvalidCredentials } from '../errors/InvalidCredentials';
import jsonwebtoken from 'jsonwebtoken';
import { env } from '../config/env';

interface IInput {
  email: string;
  password: string;
}

interface IOutput {
  accessToken: string;
};

export class SignInUseCase {
  async execute({ email, password }: IInput): Promise<IOutput> {
    const account = await prismaClient.account.findUnique({
      where: { email }
    });

    if (!account)
      throw new InvalidCredentials();

    const isPasswordValid = await bcrypt.compare(password, account.password);

    if (!isPasswordValid)
      throw new InvalidCredentials();

    const accessToken = jsonwebtoken.sign(
      { sub: account.id },
      env.jswSecret,
      { expiresIn: '1d' }
    );

    return {
      accessToken
    };
  }
}
