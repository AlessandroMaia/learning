import { Account } from '@prisma/client';
import { prismaClient } from '../lib/prismaClient';

interface ICreateDTO {
  email: string;
  password: string;
  name: string;
}

export class AccountsRepository {
  static async findByEmail(email: string) : Promise<Account | null> {
    const account = await prismaClient.account.findUnique({
      where: {
        email
      }
    });

    return account;
  }

  static async create({ email, password, name }: ICreateDTO) : Promise<Account> {
    return prismaClient.account.create({
      data: {
        email,
        password,
        name
      }
    });
  }
}
